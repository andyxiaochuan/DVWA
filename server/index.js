const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'insecure_secret_key_for_dvma';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting (disabled for testing vulnerabilities)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// SQLite database connection
const dbPath = path.join(__dirname, 'dvma.db');
let db;

// Initialize database connection
function initDB() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
        reject(err);
      } else {
        console.log('Connected to SQLite database');
        createTables().then(resolve).catch(reject);
      }
    });
  });
}

async function createTables() {
  return new Promise((resolve, reject) => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        role TEXT CHECK(role IN ('admin', 'user')) DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        reject(err);
        return;
      }

      // Products table
      db.run(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          price DECIMAL(10,2),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          reject(err);
          return;
        }

        // Messages table (for XSS testing)
        db.run(`
          CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
          )
        `, async (err) => {
          if (err) {
            reject(err);
            return;
          }

          try {
            await insertSampleData();
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      });
    });
  });
}

async function insertSampleData() {
  return new Promise((resolve, reject) => {
    // Check if users already exist
    db.get('SELECT COUNT(*) as count FROM users', async (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      if (row.count === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        db.run(
          'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
          ['admin', hashedPassword, 'admin@dvma.com', 'admin']
        );
        
        const userPassword = await bcrypt.hash('user123', 10);
        db.run(
          'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
          ['user', userPassword, 'user@dvma.com', 'user']
        );
      }

      // Check if products already exist
      db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        if (row.count === 0) {
          db.run(
            'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
            ['Laptop', 'High-performance laptop for developers', 999.99]
          );
          db.run(
            'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
            ['Smartphone', 'Latest smartphone with advanced features', 699.99]
          );
          db.run(
            'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
            ['Tablet', 'Portable tablet for work and entertainment', 399.99]
          );
        }
        resolve();
      });
    });
  });
}

// Helper function for database queries
function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// VULNERABLE ENDPOINTS

// 1. SQL Injection vulnerability
app.get('/api/products/search', async (req, res) => {
  const { query } = req.query;
  
  // VULNERABLE: Direct string concatenation - SQL Injection
  try {
    const rows = await dbAll(
      `SELECT * FROM products WHERE name LIKE '%${query}%' OR description LIKE '%${query}%'`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. XSS vulnerability
app.post('/api/messages', async (req, res) => {
  const { content, user_id = 1 } = req.body;
  
  // VULNERABLE: No input sanitization - XSS
  try {
    await dbRun(
      'INSERT INTO messages (user_id, content) VALUES (?, ?)',
      [user_id, content]
    );
    res.json({ message: 'Message posted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const rows = await dbAll(`
      SELECT m.*, u.username 
      FROM messages m 
      LEFT JOIN users u ON m.user_id = u.id 
      ORDER BY m.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Authentication bypass vulnerability
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  // VULNERABLE: Weak authentication logic
  try {
    const user = await dbGet(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (validPassword) {
      // VULNERABLE: Using weak JWT secret
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Insecure Direct Object Reference (IDOR)
app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  
  // VULNERABLE: No authorization check - IDOR
  try {
    const user = await dbGet(
      'SELECT id, username, email, role FROM users WHERE id = ?',
      [userId]
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Command Injection vulnerability
app.post('/api/ping', async (req, res) => {
  const { host } = req.body;
  
  // VULNERABLE: Command injection
  const { exec } = require('child_process');
  
  // Use appropriate ping command based on OS
  const isWindows = process.platform === 'win32';
  const pingCommand = isWindows ? `ping -n 4 ${host}` : `ping -c 4 ${host}`;
  
  exec(pingCommand, (error, stdout, stderr) => {
    if (error) {
      // If ping fails, try to execute the command anyway (for command injection testing)
      // This allows us to test command injection even if ping fails
      const fullCommand = isWindows ? `cmd /c "${host}"` : host;
      
      exec(fullCommand, (error2, stdout2, stderr2) => {
        if (error2) {
          // If both commands fail, return the original ping error
          return res.status(500).json({ 
            error: `Ping failed: ${error.message}`,
            stderr: stderr || stderr2
          });
        }
        res.json({ 
          output: stdout2 || stderr2,
          note: 'Command executed successfully (command injection detected)'
        });
      });
    } else {
      res.json({ output: stdout });
    }
  });
});

// Secure endpoints (for comparison)
app.get('/api/products/secure-search', async (req, res) => {
  const { query } = req.query;
  
  // SECURE: Using parameterized queries
  try {
    const rows = await dbAll(
      'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?',
      [`%${query}%`, `%${query}%`]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DVMA Server is running' });
});

// Start server
async function startServer() {
  try {
    await initDB();
    
    app.listen(PORT, () => {
      console.log(`DVMA Server running on port ${PORT}`);
      console.log('Vulnerable endpoints available for security testing');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;

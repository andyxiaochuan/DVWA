# DVMA Database Setup Guide

## MySQL Database Configuration

The DVMA application requires a MySQL database to function. Follow these steps to set up the database:

### 1. Install MySQL
If you don't have MySQL installed, download and install it from:
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- Or use XAMPP/WAMP for easier setup

### 2. Create Database and User

Connect to MySQL and run the following commands:

```sql
-- Create database
CREATE DATABASE dvma;

-- Create user (adjust password as needed)
CREATE USER 'dvma_user'@'localhost' IDENTIFIED BY 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON dvma.* TO 'dvma_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
```

### 3. Alternative: Use Default MySQL Root User

If you prefer to use the default MySQL root user, update the database configuration in `server/index.js`:

```javascript
const dbConfig = {
  host: 'localhost',
  user: 'root',           // Change to 'root'
  password: 'your_mysql_root_password',  // Your MySQL root password
  database: 'dvma',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
```

### 4. Database Tables

The application will automatically create the following tables when it starts:

- **users**: User accounts and authentication
- **products**: Sample products for SQL injection testing
- **messages**: Message board for XSS testing

### 5. Sample Data

The application automatically inserts sample data:
- Users: `admin` (password: `admin123`) and `user` (password: `user123`)
- Sample products for testing search functionality

## Database Connection Troubleshooting

### Common Issues:

1. **Connection Refused**
   - Ensure MySQL service is running
   - Check if MySQL is listening on port 3306
   - Verify hostname and port in connection settings

2. **Access Denied**
   - Verify username and password
   - Check if user has proper privileges
   - Ensure user can connect from localhost

3. **Database Not Found**
   - Create the database manually if auto-creation fails
   - Check database name spelling

### Testing Connection:

You can test your MySQL connection with:

```bash
mysql -u root -p
```

Then check if the database exists:

```sql
SHOW DATABASES;
```

## Security Considerations

⚠️ **IMPORTANT**: This is a vulnerable application for educational purposes only.

- Do not use these database credentials in production
- The application uses weak passwords and insecure configurations
- Always use strong, unique passwords in production environments
- Consider using environment variables for sensitive configuration

## Environment Variables (Optional)

For better security in development, you can use environment variables:

Create a `.env` file in the server directory:

```env
DB_HOST=localhost
DB_USER=dvma_user
DB_PASSWORD=your_secure_password
DB_NAME=dvma
JWT_SECRET=your_secure_jwt_secret
```

Then update the server configuration to use these variables.

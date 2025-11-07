import React, { useState } from 'react';
import axios from 'axios';

function SecureSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.get(`/api/products/secure-search?query=${encodeURIComponent(searchQuery)}`);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const sqlInjectionAttempts = [
    {
      name: 'Basic SQL Injection',
      payload: "' OR '1'='1",
      description: 'Will NOT work - parameterized query prevents injection'
    },
    {
      name: 'Union-based Injection',
      payload: "' UNION SELECT 1,username,password,4 FROM users-- ",
      description: 'Will NOT work - treated as literal search string'
    },
    {
      name: 'Drop Table',
      payload: "'; DROP TABLE products-- ",
      description: 'Will NOT work - no SQL injection possible'
    },
    {
      name: 'Normal Search',
      payload: "laptop",
      description: 'Normal search that will work correctly'
    }
  ];

  return (
    <div className="component">
      <h2>Secure Search (SQL Injection Protected)</h2>
      
      <div className="vulnerability-info" style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb' }}>
        <h4 style={{ color: '#155724' }}>Secure Implementation</h4>
        <p>
          This search functionality is protected against SQL injection attacks using parameterized queries.
        </p>
        <ul>
          <li>Secure endpoint: <code>/api/products/secure-search</code></li>
          <li>Uses parameterized queries (prepared statements)</li>
          <li>Input is treated as data, not executable code</li>
          <li>Database driver handles proper escaping</li>
        </ul>
      </div>

      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="search">Search Products (Secure):</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Searching...' : 'Search Securely'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {results.length > 0 && (
        <div className="results">
          <h4>Search Results ({results.length} items):</h4>
          {results.map((product, index) => (
            <div key={index} className="result-item">
              <h5>{product.name}</h5>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ${product.price}</p>
            </div>
          ))}
        </div>
      )}

      <div className="example-payloads" style={{ marginTop: '30px' }}>
        <h4>SQL Injection Attempts (Will Fail):</h4>
        <div className="vulnerability-list">
          {sqlInjectionAttempts.map((example, index) => (
            <div key={index} className="vulnerability-card" style={{ borderColor: '#28a745' }}>
              <h5>{example.name}</h5>
              <code>{example.payload}</code>
              <p style={{ color: '#28a745' }}>{example.description}</p>
              <button
                className="btn"
                onClick={() => {
                  setSearchQuery(example.payload);
                  document.getElementById('search').focus();
                }}
                style={{ marginTop: '10px' }}
              >
                Test This Payload
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="secure-implementation" style={{ marginTop: '30px' }}>
        <h4>Secure Implementation Details:</h4>
        
        <div className="vulnerability-card" style={{ borderColor: '#28a745' }}>
          <h5>Parameterized Queries</h5>
          <p>
            Instead of concatenating user input directly into SQL strings, we use parameterized queries
            where user input is passed as parameters to the database driver.
          </p>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '5px',
            border: '1px solid #dee2e6',
            textAlign: 'left',
            fontSize: '14px'
          }}>
{`// VULNERABLE (Don't do this):
const query = \`SELECT * FROM products WHERE name LIKE '%\${userInput}%'\`;

// SECURE (Parameterized query):
const [rows] = await db.execute(
  'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?',
  [\`%\${userInput}%\`, \`%\${userInput}%\`]
);`}
          </pre>
        </div>

        <div className="vulnerability-card" style={{ borderColor: '#28a745' }}>
          <h5>How Parameterized Queries Work</h5>
          <ul>
            <li>SQL query structure is predefined and compiled</li>
            <li>User input is treated as data, not executable code</li>
            <li>Database driver handles proper escaping automatically</li>
            <li>Prevents SQL injection regardless of input content</li>
            <li>Improves performance through query plan caching</li>
          </ul>
        </div>

        <div className="vulnerability-card" style={{ borderColor: '#28a745' }}>
          <h5>Additional Security Measures</h5>
          <ul>
            <li><strong>Input Validation:</strong> Validate and sanitize user input</li>
            <li><strong>Least Privilege:</strong> Database user has minimal required permissions</li>
            <li><strong>Error Handling:</strong> Don't expose database errors to users</li>
            <li><strong>ORM Usage:</strong> Use Object-Relational Mapping libraries</li>
            <li><strong>Security Headers:</strong> Implement proper HTTP security headers</li>
          </ul>
        </div>
      </div>

      <div className="comparison" style={{ marginTop: '30px' }}>
        <h4>Vulnerable vs Secure Comparison:</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #dee2e6', padding: '8px', backgroundColor: '#343a40', color: 'white' }}>Aspect</th>
              <th style={{ border: '1px solid #dee2e6', padding: '8px', backgroundColor: '#dc3545', color: 'white' }}>Vulnerable</th>
              <th style={{ border: '1px solid #dee2e6', padding: '8px', backgroundColor: '#28a745', color: 'white' }}>Secure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>Query Construction</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px', backgroundColor: '#f8d7da' }}>String concatenation</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px', backgroundColor: '#d4edda' }}>Parameterized queries</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>Input Handling</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px', backgroundColor: '#f8d7da' }}>Direct execution</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px', backgroundColor: '#d4edda' }}>Data parameters</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>SQL Injection Risk</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px', backgroundColor: '#f8d7da' }}>High</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px', backgroundColor: '#d4edda' }}>None</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>Performance</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px', backgroundColor: '#f8d7da' }}>Poor (no caching)</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px', backgroundColor: '#d4edda' }}>Better (query plan caching)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SecureSearch;

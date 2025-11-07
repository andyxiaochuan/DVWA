import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/login', formData);
      const { user, token } = response.data;
      
      onLogin(user, token);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component">
      <h2>Login</h2>
      
      <div className="vulnerability-info">
        <h4>Authentication Bypass Vulnerability</h4>
        <p>
          This login form demonstrates weak authentication mechanisms including:
        </p>
        <ul>
          <li>Weak JWT secret key</li>
          <li>No rate limiting on login attempts</li>
          <li>No account lockout mechanism</li>
          <li>Weak password requirements</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="credentials" style={{ marginTop: '30px' }}>
        <h4>Test Credentials:</h4>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>admin</td>
              <td>admin123</td>
              <td>admin</td>
            </tr>
            <tr>
              <td>user</td>
              <td>user123</td>
              <td>user</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Login;

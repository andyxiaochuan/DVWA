import React, { useState } from 'react';
import axios from 'axios';

function IDOR() {
  const [userId, setUserId] = useState('1');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = async (id) => {
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const response = await axios.get(`/api/user/${id}`);
      setUserData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser(userId);
  };

  const exampleIds = [
    { id: '1', description: 'Current user (you)' },
    { id: '2', description: 'Another user' },
    { id: '3', description: 'Non-existent user' },
    { id: 'admin', description: 'Try string ID' },
    { id: "' OR '1'='1", description: 'SQL Injection attempt' }
  ];

  return (
    <div className="component">
      <h2>Insecure Direct Object Reference (IDOR)</h2>
      
      <div className="vulnerability-info">
        <h4>IDOR Vulnerability</h4>
        <p>
          This user profile viewer is vulnerable to Insecure Direct Object Reference attacks due to lack of authorization checks.
        </p>
        <ul>
          <li>Vulnerable endpoint: <code>/api/user/:id</code></li>
          <li>No authorization checks</li>
          <li>Direct object references exposed</li>
          <li>No access control validation</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Loading...' : 'Get User Info'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {userData && (
        <div className="results">
          <h4>User Information:</h4>
          <div className="result-item">
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
          </div>
        </div>
      )}

      <div className="example-ids" style={{ marginTop: '30px' }}>
        <h4>Example User IDs to Try:</h4>
        <div className="vulnerability-list">
          {exampleIds.map((example, index) => (
            <div key={index} className="vulnerability-card">
              <h5>ID: {example.id}</h5>
              <p>{example.description}</p>
              <button
                className="btn"
                onClick={() => {
                  setUserId(example.id);
                  fetchUser(example.id);
                }}
                style={{ marginTop: '10px' }}
              >
                Fetch This User
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="attack-scenarios" style={{ marginTop: '30px' }}>
        <h4>Attack Scenarios:</h4>
        
        <div className="vulnerability-card">
          <h5>Scenario 1: Horizontal Privilege Escalation</h5>
          <p>
            A regular user can access other users' profiles by simply changing the user ID in the URL.
            For example, user with ID 1 can access user with ID 2's profile without any authorization check.
          </p>
        </div>

        <div className="vulnerability-card">
          <h5>Scenario 2: Vertical Privilege Escalation</h5>
          <p>
            A regular user might be able to access admin user profiles if they can guess the admin's user ID,
            potentially exposing sensitive admin information.
          </p>
        </div>

        <div className="vulnerability-card">
          <h5>Scenario 3: Information Disclosure</h5>
          <p>
            By enumerating user IDs (1, 2, 3, etc.), an attacker can discover all registered users in the system
            and gather information about them.
          </p>
        </div>
      </div>

      <div className="mitigation-info" style={{ marginTop: '30px' }}>
        <h4>Mitigation Strategies:</h4>
        <ul>
          <li>Implement proper access control checks</li>
          <li>Use indirect object references (mapping)</li>
          <li>Validate user permissions for each request</li>
          <li>Use session-based or token-based authorization</li>
          <li>Implement role-based access control (RBAC)</li>
          <li>Log and monitor access attempts</li>
          <li>Use UUIDs instead of sequential IDs</li>
        </ul>
      </div>

      <div className="secure-example" style={{ marginTop: '30px' }}>
        <h4>Secure Implementation Example:</h4>
        <pre style={{ 
          background: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '5px',
          border: '1px solid #dee2e6',
          textAlign: 'left'
        }}>
{`// Secure endpoint with authorization check
app.get('/api/user/:id', authenticateToken, async (req, res) => {
  const requestedUserId = req.params.id;
  const currentUserId = req.user.id;
  
  // Check if user is accessing their own profile or has admin role
  if (requestedUserId != currentUserId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  // Fetch user data...
});`}
        </pre>
      </div>
    </div>
  );
}

export default IDOR;

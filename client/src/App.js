import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Internationalization
import { t, setLanguage, getLanguage } from './i18n';

// Components
import Login from './components/Login';
import SQLInjection from './components/SQLInjection';
import XSS from './components/XSS';
import IDOR from './components/IDOR';
import CommandInjection from './components/CommandInjection';
import SecureSearch from './components/SecureSearch';
import KnowledgeGuide from './components/KnowledgeGuide';
import PracticeChallenges from './components/PracticeChallenges';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentLang, setCurrentLang] = useState(getLanguage());

  useEffect(() => {
    if (token) {
      // Verify token and get user info
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // For demo purposes, we'll just set a mock user
      setUser({ username: 'demo', role: 'user' });
    }
  }, [token]);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCurrentLang(lang);
    // Force re-render
    window.location.reload();
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <div className="header-title">
              <h1>Damn Vulnerable Modern Application (DVMA)</h1>
              <p>Security Training Platform - Intentionally Vulnerable</p>
            </div>
            
            <div className="header-controls">
              <div className="language-selector">
                <select 
                  value={currentLang} 
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="language-dropdown"
                >
                  <option value="zh">中文</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              {user ? (
                <div className="user-info">
                  <span>{t('welcome')}, {user.username}!</span>
                  <button onClick={handleLogout} className="logout-btn">{t('logout')}</button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <nav className="App-nav">
          <Link to="/">{t('home')}</Link>
          {!user ? (
            <Link to="/login">{t('login')}</Link>
          ) : (
            <>
              <Link to="/sql-injection">{t('sqlInjection')}</Link>
              <Link to="/xss">{t('xss')}</Link>
              <Link to="/idor">{t('idor')}</Link>
              <Link to="/command-injection">{t('commandInjection')}</Link>
              <Link to="/secure-search">{t('secureSearch')}</Link>
              <Link to="/knowledge-guide">知识库</Link>
              <Link to="/practice-challenges">实战挑战</Link>
            </>
          )}
        </nav>

        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/sql-injection" element={<SQLInjection />} />
            <Route path="/xss" element={<XSS />} />
            <Route path="/idor" element={<IDOR />} />
            <Route path="/command-injection" element={<CommandInjection />} />
            <Route path="/secure-search" element={<SecureSearch />} />
            <Route path="/knowledge-guide" element={<KnowledgeGuide />} />
            <Route path="/practice-challenges" element={<PracticeChallenges />} />
          </Routes>
        </main>

        <footer className="App-footer">
          <p>
            <strong>{t('warning')}:</strong> {t('footerWarning')}
          </p>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  const learningPaths = [
    {
      title: t('sqlLearningPath.title'),
      description: t('sqlLearningPath.description'),
      features: t('sqlLearningPath.features'),
      difficulty: t('sqlLearningPath.difficulty'),
      path: "/sql-injection"
    },
    {
      title: t('xssLearningPath.title'),
      description: t('xssLearningPath.description'),
      features: t('xssLearningPath.features'),
      difficulty: t('xssLearningPath.difficulty'),
      path: "/xss"
    },
    {
      title: t('idorLearningPath.title'),
      description: t('idorLearningPath.description'),
      features: t('idorLearningPath.features'),
      difficulty: t('idorLearningPath.difficulty'),
      path: "/idor"
    },
    {
      title: t('commandInjectionLearningPath.title'),
      description: t('commandInjectionLearningPath.description'),
      features: t('commandInjectionLearningPath.features'),
      difficulty: t('commandInjectionLearningPath.difficulty'),
      path: "/command-injection"
    },
    {
      title: t('authLearningPath.title'),
      description: t('authLearningPath.description'),
      features: t('authLearningPath.features'),
      difficulty: t('authLearningPath.difficulty'),
      path: "/login"
    }
  ];

  return (
    <div className="home">
      <div className="welcome-section">
        <h2>{t('welcomeTitle')}</h2>
        <p className="welcome-description">
          {t('welcomeDescription')}
        </p>
        
        <div className="platform-features">
          <div className="feature">
            <h3>{t('feature1Title')}</h3>
            <p>{t('feature1Desc')}</p>
          </div>
          <div className="feature">
            <h3>{t('feature2Title')}</h3>
            <p>{t('feature2Desc')}</p>
          </div>
          <div className="feature">
            <h3>{t('feature3Title')}</h3>
            <p>{t('feature3Desc')}</p>
          </div>
        </div>
      </div>

      <div className="learning-paths">
        <h3>{t('learningPaths')}</h3>
        <div className="path-grid">
          {learningPaths.map((path, index) => (
            <div key={index} className="path-card">
              <div className="path-header">
                <h4>{path.title}</h4>
                <span className="difficulty-badge">{path.difficulty}</span>
              </div>
              <p>{path.description}</p>
              <ul>
                {path.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <Link to={path.path} className="btn btn-primary">
                {t('startLearning')}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="getting-started">
        <h3>{t('gettingStarted')}</h3>
        <div className="start-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>{t('step1Title')}</h4>
              <p>{t('step1Description')}</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>{t('step2Title')}</h4>
              <p>{t('step2Description')}</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>{t('step3Title')}</h4>
              <p>{t('step3Description')}</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>{t('step4Title')}</h4>
              <p>{t('step4Description')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="credentials">
        <h3>{t('testAccounts')}</h3>
        <p>{t('testAccountsDescription')}</p>
        <table>
          <thead>
            <tr>
              <th>{t('username')}</th>
              <th>{t('password')}</th>
              <th>{t('role')}</th>
              <th>{t('description')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>admin</td>
              <td>admin123</td>
              <td>{t('admin')}</td>
              <td>{t('adminDescription')}</td>
            </tr>
            <tr>
              <td>user</td>
              <td>user123</td>
              <td>{t('user')}</td>
              <td>{t('userDescription')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="safety-notice">
        <h3>{t('safetyNotice')}</h3>
        <div className="notice-content">
          <p>
            <strong>{t('safetyWarningTitle')}:</strong> {t('safetyWarning')}
          </p>
          <ul>
            {t('safetyRules').map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

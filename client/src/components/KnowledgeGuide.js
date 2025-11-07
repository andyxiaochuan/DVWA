import React, { useState } from 'react';
import { t } from '../i18n';

function KnowledgeGuide() {
  const [selectedVulnerability, setSelectedVulnerability] = useState('sql-injection');

  const vulnerabilities = {
    'sql-injection': {
      name: t('sqlInjection'),
      description: t('sqlVulnerability.description'),
      attackPrinciple: t('sqlVulnerability.attackPrinciple'),
      impact: t('sqlVulnerability.impact'),
      protections: t('sqlVulnerability.protections'),
      learningObjectives: t('sqlLearningObjectives'),
      steps: t('sqlSteps'),
      practiceTasks: t('sqlPracticeTasks'),
      examplePayloads: t('sqlExamplePayloads'),
      realWorldExamples: [
        {
          title: 'Sony Pictures Hack (2014)',
          description: 'Attackers used SQL injection to access Sony\'s internal databases, leading to massive data breach and leaked employee information.',
          impact: '100+ terabytes of data stolen, including unreleased movies and executive emails'
        },
        {
          title: 'Heartland Payment Systems (2008)',
          description: 'SQL injection vulnerability allowed attackers to install malware that captured 130 million credit card numbers.',
          impact: 'Largest credit card data breach at the time, $140 million in fines'
        },
        {
          title: 'TalkTalk (2015)',
          description: 'Simple SQL injection attack exposed personal data of 157,000 customers.',
          impact: '£400,000 fine and significant reputational damage'
        }
      ],
      detectionTechniques: [
        'Error-based detection: Look for database error messages in application responses',
        'Boolean-based blind injection: Test with true/false conditions',
        'Time-based blind injection: Use time delays to detect injection',
        'Union-based injection: Extract data using UNION queries'
      ],
      advancedTechniques: [
        'Out-of-band data exfiltration: Use DNS or HTTP requests to extract data',
        'Second-order SQL injection: Store malicious input for later execution',
        'NoSQL injection: Target NoSQL databases like MongoDB',
        'ORM injection: Exploit Object-Relational Mapping vulnerabilities'
      ]
    },
    'xss': {
      name: t('xss'),
      description: 'Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web pages viewed by other users.',
      attackPrinciple: 'When applications don\'t properly validate and escape user input, attackers can inject scripts that execute in victims\' browsers.',
      impact: 'Session hijacking, credential theft, defacement, malware distribution',
      protections: [
        'Input validation and sanitization',
        'Output encoding',
        'Content Security Policy (CSP)',
        'HTTPOnly cookies',
        'SameSite cookie attribute'
      ],
      learningObjectives: [
        'Understand different types of XSS (Reflected, Stored, DOM-based)',
        'Learn to identify XSS vulnerabilities',
        'Master payload construction techniques',
        'Understand browser security mechanisms',
        'Learn XSS prevention best practices'
      ],
      realWorldExamples: [
        {
          title: 'MySpace XSS Worm (2005)',
          description: 'Samy worm spread through XSS vulnerability, adding over 1 million friends in 20 hours.',
          impact: 'Massive service disruption, forced MySpace to temporarily shut down'
        },
        {
          title: 'eBay XSS (2014-2016)',
          description: 'Multiple XSS vulnerabilities allowed attackers to steal user credentials and session tokens.',
          impact: 'User account compromise, financial fraud'
        }
      ],
      detectionTechniques: [
        'Manual testing with common XSS payloads',
        'Automated scanning tools',
        'DOM-based XSS detection',
        'Input validation bypass testing'
      ]
    },
    'idor': {
      name: t('idor'),
      description: 'Insecure Direct Object Reference occurs when applications expose references to internal implementation objects.',
      attackPrinciple: 'Applications that use predictable object references without proper authorization checks allow attackers to access unauthorized resources.',
      impact: 'Data leakage, privilege escalation, unauthorized data modification',
      protections: [
        'Implement proper access control checks',
        'Use indirect object references',
        'Validate user permissions for each request',
        'Use UUIDs instead of sequential IDs',
        'Implement proper session management'
      ],
      learningObjectives: [
        'Understand IDOR vulnerability patterns',
        'Learn to identify object reference exposure',
        'Master enumeration techniques',
        'Understand access control mechanisms',
        'Learn secure object reference implementation'
      ]
    },
    'command-injection': {
      name: t('commandInjection'),
      description: 'Command injection allows attackers to execute arbitrary operating system commands on the server.',
      attackPrinciple: 'Applications that construct system commands using unsanitized user input can be manipulated to execute malicious commands.',
      impact: 'Complete server compromise, data theft, system damage, backdoor installation',
      protections: [
        'Avoid shell command execution with user input',
        'Use built-in libraries instead of system commands',
        'Implement strict input validation',
        'Use parameterized command execution',
        'Run applications with least privilege'
      ],
      learningObjectives: [
        'Understand command injection vectors',
        'Learn payload construction for different OS',
        'Master command separator bypass techniques',
        'Understand privilege escalation methods',
        'Learn secure command execution practices'
      ]
    }
  };

  const currentVuln = vulnerabilities[selectedVulnerability];

  return (
    <div className="knowledge-guide">
      <h2>{t('knowledgeGuideTitle')}</h2>
      
      <div className="vulnerability-selector">
        <h3>{t('selectVulnerability')}</h3>
        <div className="vuln-buttons">
          {Object.keys(vulnerabilities).map(key => (
            <button
              key={key}
              className={`vuln-btn ${selectedVulnerability === key ? 'active' : ''}`}
              onClick={() => setSelectedVulnerability(key)}
            >
              {vulnerabilities[key].name}
            </button>
          ))}
        </div>
      </div>

      <div className="knowledge-content">
        <div className="vuln-overview">
          <h3>{t('vulnerabilityOverview')}</h3>
          <div className="overview-card">
            <h4>{t('vulnerabilityDescription')}</h4>
            <p>{currentVuln.description}</p>
            
            <h4>{t('attackPrinciple')}</h4>
            <p>{currentVuln.attackPrinciple}</p>
            
            <h4>{t('impact')}</h4>
            <p>{currentVuln.impact}</p>
          </div>
        </div>

        <div className="learning-objectives">
          <h3>{t('learningObjectives')}</h3>
          <ul>
            {currentVuln.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>

        <div className="protection-measures">
          <h3>{t('protectionMeasures')}</h3>
          <ul>
            {currentVuln.protections.map((protection, index) => (
              <li key={index}>{protection}</li>
            ))}
          </ul>
        </div>

        {currentVuln.realWorldExamples && (
          <div className="real-world-examples">
            <h3>{t('realWorldExamples')}</h3>
            <div className="examples-grid">
              {currentVuln.realWorldExamples.map((example, index) => (
                <div key={index} className="example-card">
                  <h4>{example.title}</h4>
                  <p>{example.description}</p>
                  <div className="impact">
                    <strong>{t('impact')}：</strong> {example.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentVuln.detectionTechniques && (
          <div className="detection-techniques">
            <h3>{t('detectionTechniques')}</h3>
            <ul>
              {currentVuln.detectionTechniques.map((technique, index) => (
                <li key={index}>{technique}</li>
              ))}
            </ul>
          </div>
        )}

        {currentVuln.advancedTechniques && (
          <div className="advanced-techniques">
            <h3>{t('advancedTechniques')}</h3>
            <ul>
              {currentVuln.advancedTechniques.map((technique, index) => (
                <li key={index}>{technique}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="practice-recommendations">
          <h3>{t('practiceRecommendations')}</h3>
          <div className="recommendations">
            <div className="recommendation">
              <h4>{t('beginnerLevel')}</h4>
              <ul>
                <li>从简单的注入测试开始</li>
                <li>理解基本的攻击原理</li>
                <li>学习常见的防护措施</li>
                <li>使用提供的示例载荷</li>
              </ul>
            </div>
            <div className="recommendation">
              <h4>{t('intermediateLevel')}</h4>
              <ul>
                <li>尝试绕过基本的防护机制</li>
                <li>学习自动化检测工具</li>
                <li>理解漏洞的深层原理</li>
                <li>练习手动漏洞挖掘</li>
              </ul>
            </div>
            <div className="recommendation">
              <h4>{t('advancedLevel')}</h4>
              <ul>
                <li>研究高级绕过技术</li>
                <li>学习漏洞利用开发</li>
                <li>理解底层安全机制</li>
                <li>参与CTF比赛和漏洞赏金</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="resources">
          <h3>{t('learningResources')}</h3>
          <ul>
            <li><a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer">OWASP Top 10</a></li>
            <li><a href="https://portswigger.net/web-security" target="_blank" rel="noopener noreferrer">PortSwigger Web Security Academy</a></li>
            <li><a href="https://www.hacksplaining.com/" target="_blank" rel="noopener noreferrer">Hacksplaining</a></li>
            <li><a href="https://github.com/swisskyrepo/PayloadsAllTheThings" target="_blank" rel="noopener noreferrer">PayloadsAllTheThings</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeGuide;

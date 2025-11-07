import React, { useState, useEffect } from 'react';

function PracticeChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    // 初始化挑战数据
    const initialChallenges = [
      {
        id: 'sql-basic-1',
        title: 'SQL注入基础挑战',
        description: '使用SQL注入绕过登录验证',
        difficulty: '初级',
        category: 'sql-injection',
        points: 100,
        objective: '使用SQL注入绕过登录页面，成功登录系统',
        hints: [
          '尝试在用户名字段中使用SQL注释符',
          '使用逻辑运算符绕过密码验证',
          '常见的绕过载荷: admin\' --'
        ],
        solution: 'admin\' --',
        validation: (input) => input.includes('--') || input.includes('#'),
        prerequisites: []
      },
      {
        id: 'sql-union-1',
        title: 'UNION查询数据提取',
        description: '使用UNION查询从数据库中提取敏感信息',
        difficulty: '中级',
        category: 'sql-injection',
        points: 200,
        objective: '使用UNION查询从users表中提取用户名和密码',
        hints: [
          '首先确定查询返回的列数',
          '使用ORDER BY或UNION SELECT确定列数',
          '确保UNION查询的列数匹配',
          '尝试: \' UNION SELECT 1,username,password,4 FROM users--'
        ],
        solution: '\' UNION SELECT 1,username,password,4 FROM users--',
        validation: (input) => input.toLowerCase().includes('union') && input.toLowerCase().includes('users'),
        prerequisites: ['sql-basic-1']
      },
      {
        id: 'xss-reflected-1',
        title: '反射型XSS攻击',
        description: '在搜索功能中执行反射型XSS攻击',
        difficulty: '初级',
        category: 'xss',
        points: 100,
        objective: '在搜索功能中注入XSS载荷，触发弹窗',
        hints: [
          '尝试基本的script标签',
          '使用: <script>alert(\'XSS\')</script>',
          '注意输入过滤机制'
        ],
        solution: '<script>alert(\'XSS\')</script>',
        validation: (input) => input.includes('<script>') && input.includes('alert'),
        prerequisites: []
      },
      {
        id: 'xss-stored-1',
        title: '存储型XSS攻击',
        description: '在留言板中执行存储型XSS攻击',
        difficulty: '中级',
        category: 'xss',
        points: 150,
        objective: '在留言板中注入XSS载荷，使其在其他用户访问时执行',
        hints: [
          '尝试注入恶意脚本到留言内容',
          '载荷会被存储并在其他用户访问时执行',
          '使用: <img src=x onerror=alert(1)>'
        ],
        solution: '<img src=x onerror=alert(1)>',
        validation: (input) => input.includes('onerror') || input.includes('onload'),
        prerequisites: ['xss-reflected-1']
      },
      {
        id: 'idor-basic-1',
        title: 'IDOR权限绕过',
        description: '通过修改URL参数访问未授权资源',
        difficulty: '初级',
        category: 'idor',
        points: 100,
        objective: '通过修改用户ID参数访问其他用户的信息',
        hints: [
          '尝试修改URL中的用户ID参数',
          '从ID 1开始枚举其他用户',
          '观察是否有访问控制检查'
        ],
        solution: '修改URL中的用户ID参数',
        validation: (input) => true, // 这个挑战需要手动验证
        prerequisites: []
      },
      {
        id: 'command-injection-1',
        title: '命令注入基础',
        description: '在ping功能中执行系统命令',
        difficulty: '初级',
        category: 'command-injection',
        points: 100,
        objective: '通过ping功能执行系统命令列出目录内容',
        hints: [
          '使用命令分隔符连接多个命令',
          'Windows: 127.0.0.1 && dir',
          'Linux: 127.0.0.1 && ls -la'
        ],
        solution: '127.0.0.1 && dir',
        validation: (input) => input.includes('&&') && (input.includes('dir') || input.includes('ls')),
        prerequisites: []
      }
    ];

    setChallenges(initialChallenges);
    
    // 从localStorage加载用户进度
    const savedProgress = localStorage.getItem('dvma-challenge-progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const completeChallenge = (challengeId, userInput) => {
    const challenge = challenges.find(c => c.id === challengeId);
    
    if (challenge && challenge.validation(userInput)) {
      const newProgress = {
        ...userProgress,
        [challengeId]: {
          completed: true,
          completedAt: new Date().toISOString(),
          userInput: userInput
        }
      };
      
      setUserProgress(newProgress);
      localStorage.setItem('dvma-challenge-progress', JSON.stringify(newProgress));
      alert('🎉 挑战完成！');
    } else {
      alert('❌ 挑战未完成，请检查你的解决方案');
    }
  };

  const getCompletedCount = () => {
    return Object.values(userProgress).filter(p => p.completed).length;
  };

  const getTotalPoints = () => {
    return challenges.reduce((total, challenge) => {
      return userProgress[challenge.id]?.completed ? total + challenge.points : total;
    }, 0);
  };

  const isChallengeAvailable = (challenge) => {
    if (challenge.prerequisites.length === 0) return true;
    return challenge.prerequisites.every(prereq => userProgress[prereq]?.completed);
  };

  const getProgressPercentage = () => {
    return Math.round((getCompletedCount() / challenges.length) * 100);
  };

  return (
    <div className="practice-challenges">
      <h2>🏆 实战挑战</h2>
      
      <div className="progress-overview">
        <div className="progress-card">
          <h3>学习进度</h3>
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-value">{getCompletedCount()}</span>
              <span className="stat-label">已完成挑战</span>
            </div>
            <div className="stat">
              <span className="stat-value">{getTotalPoints()}</span>
              <span className="stat-label">总积分</span>
            </div>
            <div className="stat">
              <span className="stat-value">{getProgressPercentage()}%</span>
              <span className="stat-label">完成度</span>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="challenges-grid">
        {challenges.map(challenge => {
          const isCompleted = userProgress[challenge.id]?.completed;
          const isAvailable = isChallengeAvailable(challenge);
          
          return (
            <div 
              key={challenge.id} 
              className={`challenge-card ${isCompleted ? 'completed' : ''} ${!isAvailable ? 'locked' : ''}`}
            >
              <div className="challenge-header">
                <h3>{challenge.title}</h3>
                <div className="challenge-meta">
                  <span className={`difficulty ${challenge.difficulty}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="points">+{challenge.points}分</span>
                </div>
              </div>
              
              <p className="challenge-description">{challenge.description}</p>
              
              <div className="challenge-objective">
                <strong>目标：</strong> {challenge.objective}
              </div>

              {!isAvailable && (
                <div className="prerequisites">
                  <strong>前置要求：</strong>
                  {challenge.prerequisites.map(prereq => (
                    <span key={prereq} className="prereq">
                      {challenges.find(c => c.id === prereq)?.title}
                    </span>
                  ))}
                </div>
              )}

              {isAvailable && !isCompleted && (
                <div className="challenge-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setSelectedChallenge(challenge)}
                  >
                    开始挑战
                  </button>
                </div>
              )}

              {isCompleted && (
                <div className="challenge-completed">
                  <span className="completed-badge">✅ 已完成</span>
                  <div className="completion-time">
                    完成时间: {new Date(userProgress[challenge.id].completedAt).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedChallenge && (
        <div className="challenge-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedChallenge.title}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedChallenge(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="challenge-info">
                <p><strong>描述：</strong> {selectedChallenge.description}</p>
                <p><strong>目标：</strong> {selectedChallenge.objective}</p>
                <p><strong>难度：</strong> <span className={`difficulty ${selectedChallenge.difficulty}`}>
                  {selectedChallenge.difficulty}
                </span></p>
                <p><strong>积分：</strong> +{selectedChallenge.points}分</p>
              </div>

              <div className="hints-section">
                <h4>💡 提示</h4>
                <ul>
                  {selectedChallenge.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>

              <div className="solution-input">
                <h4>输入你的解决方案</h4>
                <input
                  type="text"
                  placeholder="在这里输入你的攻击载荷..."
                  className="solution-field"
                  id={`solution-${selectedChallenge.id}`}
                />
                <button 
                  className="btn btn-success"
                  onClick={() => {
                    const userInput = document.getElementById(`solution-${selectedChallenge.id}`).value;
                    completeChallenge(selectedChallenge.id, userInput);
                    setSelectedChallenge(null);
                  }}
                >
                  提交解决方案
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="achievements">
        <h3>🏅 成就系统</h3>
        <div className="achievements-grid">
          <div className={`achievement ${getCompletedCount() >= 1 ? 'unlocked' : 'locked'}`}>
            <span className="achievement-icon">🥉</span>
            <div className="achievement-info">
              <h4>初出茅庐</h4>
              <p>完成第一个挑战</p>
            </div>
          </div>
          <div className={`achievement ${getCompletedCount() >= 3 ? 'unlocked' : 'locked'}`}>
            <span className="achievement-icon">🥈</span>
            <div className="achievement-info">
              <h4>渐入佳境</h4>
              <p>完成3个挑战</p>
            </div>
          </div>
          <div className={`achievement ${getCompletedCount() >= 6 ? 'unlocked' : 'locked'}`}>
            <span className="achievement-icon">🥇</span>
            <div className="achievement-info">
              <h4>安全专家</h4>
              <p>完成所有挑战</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeChallenges;

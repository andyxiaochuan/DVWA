import React, { useState, useRef } from 'react';
import { t } from '../i18n';
import './DDoS.css';

const DDoS = () => {
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackType, setAttackType] = useState('volumetric');
  const [trafficRate, setTrafficRate] = useState(100);
  const [serverStatus, setServerStatus] = useState('normal');
  const [attackStats, setAttackStats] = useState({
    requestsPerSecond: 0,
    totalRequests: 0,
    bandwidth: 0,
    serverLoad: 0
  });
  const [animationData, setAnimationData] = useState([]);
  const [explanationStep, setExplanationStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const attackIntervalRef = useRef(null);

  const attackTypes = [
    {
      id: 'volumetric',
      name: '容量攻击',
      description: '用大量流量淹没网络带宽',
      color: '#ff6b6b',
      icon: '🌊'
    },
    {
      id: 'protocol',
      name: '协议攻击',
      description: '利用协议弱点耗尽服务器资源',
      color: '#4ecdc4',
      icon: '🔧'
    },
    {
      id: 'application',
      name: '应用层攻击',
      description: '针对应用层使用复杂请求',
      color: '#45b7d1',
      icon: '🎯'
    }
  ];

  const startAttack = () => {
    setIsAttacking(true);
    setServerStatus('under_attack');
    setAttackStats({
      requestsPerSecond: 0,
      totalRequests: 0,
      bandwidth: 0,
      serverLoad: 0
    });
    setAnimationData([]);

    attackIntervalRef.current = setInterval(() => {
      setAttackStats(prev => {
        const rps = Math.floor(Math.random() * trafficRate * 10) + trafficRate * 5;
        const bandwidth = Math.floor(rps * 1024 * Math.random());
        const serverLoad = Math.min(100, prev.serverLoad + Math.random() * 10);
        
        // Add animation data
        const newData = {
          id: Date.now() + Math.random(),
          type: attackType,
          size: Math.random() * 30 + 10,
          speed: Math.random() * 2 + 1,
          x: Math.random() * 100,
          color: attackTypes.find(at => at.id === attackType)?.color || '#ff6b6b'
        };
        
        setAnimationData(prevData => [...prevData.slice(-50), newData]);

        return {
          requestsPerSecond: rps,
          totalRequests: prev.totalRequests + rps,
          bandwidth: bandwidth,
          serverLoad: serverLoad
        };
      });
    }, 100);
  };

  const stopAttack = () => {
    setIsAttacking(false);
    setServerStatus('recovering');
    if (attackIntervalRef.current) {
      clearInterval(attackIntervalRef.current);
    }

    // Simulate recovery
    setTimeout(() => {
      setServerStatus('normal');
      setAttackStats({
        requestsPerSecond: 0,
        totalRequests: 0,
        bandwidth: 0,
        serverLoad: 0
      });
      setAnimationData([]);
    }, 2000);
  };

  const getServerStatusText = () => {
    switch (serverStatus) {
      case 'normal':
        return { text: t('normalOperation'), color: '#28a745' };
      case 'under_attack':
        return { text: t('underDDoSAttack'), color: '#dc3545' };
      case 'recovering':
        return { text: t('recovering'), color: '#ffc107' };
      default:
        return { text: t('normalOperation'), color: '#28a745' };
    }
  };

  const getAttackTypeInfo = () => {
    return attackTypes.find(at => at.id === attackType);
  };

  const startExplanation = () => {
    setShowExplanation(true);
    setExplanationStep(0);
  };

  const nextExplanationStep = () => {
    setExplanationStep(prev => prev + 1);
  };

  const prevExplanationStep = () => {
    setExplanationStep(prev => Math.max(0, prev - 1));
  };

  const closeExplanation = () => {
    setShowExplanation(false);
    setExplanationStep(0);
  };

  const explanationSteps = [
    {
      title: t('normalTrafficFlow'),
      description: "在正常情况下，合法用户以可管理的速率向服务器发送请求。",
      animation: "normal",
      stats: { rps: 50, load: 20 }
    },
    {
      title: t('botnetActivation'),
      description: "攻击者激活数千台受感染的设备（僵尸网络）来生成大量流量。",
      animation: "botnet",
      stats: { rps: 500, load: 60 }
    },
    {
      title: t('trafficFlood'),
      description: "服务器被请求洪水淹没，消耗所有可用资源。",
      animation: "flood",
      stats: { rps: 5000, load: 95 }
    },
    {
      title: t('serviceDegradation'),
      description: "合法用户经历响应时间变慢或完全服务不可用。",
      animation: "degradation",
      stats: { rps: 8000, load: 100 }
    }
  ];


  return (
    <div className="ddos-container">
      <div className="ddos-header">
        <h1>🌪️ {t('ddosLearningPath.title')}</h1>
        <p>{t('ddosLearningPath.description')}</p>
        <button 
          className="btn btn-info"
          onClick={startExplanation}
          style={{ marginTop: '15px' }}
        >
          {t('interactiveTutorial')}
        </button>
      </div>

      <div className="ddos-content">
        <div className="attack-controls">
          <h2>{t('ddosAttackControls')}</h2>
          
          <div className="control-group">
            <label>{t('attackType')}:</label>
            <select 
              value={attackType} 
              onChange={(e) => setAttackType(e.target.value)}
              disabled={isAttacking}
            >
              {attackTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.icon} {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>{t('trafficRate')}: {trafficRate} {t('requestsPerSec')}</label>
            <input
              type="range"
              min="10"
              max="1000"
              value={trafficRate}
              onChange={(e) => setTrafficRate(parseInt(e.target.value))}
              disabled={isAttacking}
            />
          </div>

          <div className="attack-buttons">
            {!isAttacking ? (
              <button className="btn btn-danger" onClick={startAttack}>
                {t('startDDoSAttack')}
              </button>
            ) : (
              <button className="btn btn-success" onClick={stopAttack}>
                {t('stopAttack')}
              </button>
            )}
          </div>
        </div>

        <div className="visualization-area">
          <div className="server-status">
            <h3>{t('serverStatus')}</h3>
            <div 
              className="status-indicator"
              style={{ backgroundColor: getServerStatusText().color }}
            >
              {getServerStatusText().text}
            </div>
          </div>

          <div className="attack-animation">
            <div className="server-icon">🖥️</div>
            <div className="traffic-flow">
              {animationData.map(data => (
                <div
                  key={data.id}
                  className="traffic-particle"
                  style={{
                    left: `${data.x}%`,
                    width: `${data.size}px`,
                    height: `${data.size}px`,
                    backgroundColor: data.color,
                    animationDuration: `${data.speed}s`
                  }}
                />
              ))}
            </div>
          </div>

          <div className="attack-stats">
            <h3>{t('attackStatistics')}</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">{t('requestsPerSecond')}:</span>
                <span className="stat-value">{attackStats.requestsPerSecond.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">{t('totalRequests')}:</span>
                <span className="stat-value">{attackStats.totalRequests.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">{t('bandwidth')}:</span>
                <span className="stat-value">{Math.floor(attackStats.bandwidth / 1024)} MB/s</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">{t('serverLoad')}:</span>
                <span className="stat-value">{Math.floor(attackStats.serverLoad)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="educational-content">
          <div className="attack-info">
            <h3>{t('aboutAttack')} {getAttackTypeInfo()?.name}</h3>
            <p>{getAttackTypeInfo()?.description}</p>
            
            <div className="attack-details">
              <h4>{t('howItWorks')}:</h4>
              <ul>
                {attackType === 'volumetric' && (
                  <>
                    <li>用大量流量淹没网络</li>
                    <li>消耗所有可用带宽</li>
                    <li>使用僵尸网络生成流量</li>
                    <li>针对网络基础设施</li>
                  </>
                )}
                {attackType === 'protocol' && (
                  <>
                    <li>利用协议实现缺陷</li>
                    <li>创建不完整的连接请求</li>
                    <li>耗尽服务器资源（CPU、内存）</li>
                    <li>针对特定协议（TCP、UDP、ICMP）</li>
                  </>
                )}
                {attackType === 'application' && (
                  <>
                    <li>针对应用层（第7层）</li>
                    <li>使用看似合法的请求</li>
                    <li>更难检测和缓解</li>
                    <li>专注于特定应用程序/服务</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="protection-info">
            <h3>{t('ddosProtectionMeasures')}</h3>
            <div className="protection-list">
              <div className="protection-item">
                <h4>{t('rateLimiting')}</h4>
                <p>限制每个IP地址的请求以防止滥用</p>
              </div>
              <div className="protection-item">
                <h4>{t('trafficFiltering')}</h4>
                <p>使用防火墙和WAF过滤恶意流量</p>
              </div>
              <div className="protection-item">
                <h4>{t('cdnServices')}</h4>
                <p>将流量分发到多个服务器</p>
              </div>
              <div className="protection-item">
                <h4>{t('ddosProtectionServices')}</h4>
                <p>使用专业服务如Cloudflare、Akamai</p>
              </div>
            </div>
          </div>
        </div>

        <div className="practice-tasks">
          <h3>{t('ddosPracticeTasks')}</h3>
          <div className="tasks-list">
            <div className="task">
              <h4>{t('understandAttackPatterns')}</h4>
              <p>运行不同的攻击类型并观察它们如何影响服务器性能</p>
              <div className="task-hint">
                <strong>{t('hint')}:</strong> 比较不同攻击类型的带宽消耗和服务器负载
              </div>
            </div>
            <div className="task">
              <h4>{t('identifyAttackSignatures')}</h4>
              <p>学习识别指示DDoS攻击的模式</p>
              <div className="task-hint">
                <strong>{t('hint')}:</strong> 寻找流量突然激增和异常请求模式
              </div>
            </div>
            <div className="task">
              <h4>{t('testMitigationStrategies')}</h4>
              <p>试验不同的保护机制</p>
              <div className="task-hint">
                <strong>{t('hint')}:</strong> 尝试实施速率限制并观察其对攻击效果的影响
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tutorial Modal */}
        {showExplanation && (
          <div className="tutorial-modal">
            <div className="tutorial-content">
              <div className="tutorial-header">
                <h3>{t('ddosAttackTutorial')}</h3>
                <button className="close-btn" onClick={closeExplanation}>×</button>
              </div>
              
              <div className="tutorial-body">
                <div className="tutorial-animation">
                  <div className="tutorial-server">🖥️</div>
                  <div className="tutorial-traffic">
                    {explanationStep >= 0 && (
                      <div className="tutorial-particle normal" style={{ animationDelay: '0s' }} />
                    )}
                    {explanationStep >= 0 && (
                      <div className="tutorial-particle normal" style={{ animationDelay: '0.5s' }} />
                    )}
                    {explanationStep >= 1 && (
                      <>
                        <div className="tutorial-particle botnet" style={{ animationDelay: '0.2s' }} />
                        <div className="tutorial-particle botnet" style={{ animationDelay: '0.4s' }} />
                        <div className="tutorial-particle botnet" style={{ animationDelay: '0.6s' }} />
                      </>
                    )}
                    {explanationStep >= 2 && (
                      <>
                        <div className="tutorial-particle flood" style={{ animationDelay: '0.1s' }} />
                        <div className="tutorial-particle flood" style={{ animationDelay: '0.3s' }} />
                        <div className="tutorial-particle flood" style={{ animationDelay: '0.5s' }} />
                        <div className="tutorial-particle flood" style={{ animationDelay: '0.7s' }} />
                      </>
                    )}
                    {explanationStep >= 3 && (
                      <>
                        <div className="tutorial-particle degradation" style={{ animationDelay: '0s' }} />
                        <div className="tutorial-particle degradation" style={{ animationDelay: '0.1s' }} />
                        <div className="tutorial-particle degradation" style={{ animationDelay: '0.2s' }} />
                        <div className="tutorial-particle degradation" style={{ animationDelay: '0.3s' }} />
                      </>
                    )}
                  </div>
                </div>
                
                <div className="tutorial-text">
                  <h4>{explanationSteps[explanationStep].title}</h4>
                  <p>{explanationSteps[explanationStep].description}</p>
                  
                  <div className="tutorial-stats">
                    <div className="tutorial-stat">
                      <span>{t('requestsPerSecond')}:</span>
                      <strong>{explanationSteps[explanationStep].stats.rps.toLocaleString()}</strong>
                    </div>
                    <div className="tutorial-stat">
                      <span>{t('serverLoad')}:</span>
                      <strong>{explanationSteps[explanationStep].stats.load}%</strong>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="tutorial-footer">
                <div className="tutorial-progress">
                  {t('step')} {explanationStep + 1} / {explanationSteps.length}
                </div>
                <div className="tutorial-buttons">
                  <button 
                    className="btn btn-secondary" 
                    onClick={prevExplanationStep}
                    disabled={explanationStep === 0}
                  >
                    {t('previous')}
                  </button>
                  {explanationStep < explanationSteps.length - 1 ? (
                    <button className="btn btn-primary" onClick={nextExplanationStep}>
                      {t('next')}
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={closeExplanation}>
                      {t('startSimulation')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DDoS;

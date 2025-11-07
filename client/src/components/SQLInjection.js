import React, { useState } from 'react';
import axios from 'axios';
import TeachingGuide from './TeachingGuide';
import { t } from '../i18n';

function SQLInjection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPayload, setSelectedPayload] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
    vulnerability: t('sqlVulnerability'),
    learningObjectives: t('sqlLearningObjectives'),
    steps: t('sqlSteps'),
    practiceTasks: t('sqlPracticeTasks')
  };

  // Example payloads with i18n
  const examplePayloads = t('sqlExamplePayloads');

  // Define categories with i18n
  const categories = {
    all: t('all'),
    basic: t('basic'),
    blind: t('blind'),
    data_extraction: t('data_extraction'),
    error_based: t('error_based'),
    advanced: t('advanced')
  };

  // Filter payloads
  const filteredPayloads = examplePayloads.filter(payload => {
    const matchesCategory = selectedCategory === 'all' || payload.category === selectedCategory;
    const matchesSearch = payload.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         payload.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payload.payload.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredPayloads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayloads = filteredPayloads.slice(startIndex, endIndex);

  // Reset page when filter conditions change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="component">
      <div className="teaching-header">
        <h2>🔓 SQL注入攻击教学</h2>
        <div className="progress-indicator">
          <span>学习进度: {currentStep + 1}/{teachingData.steps.length}</span>
        </div>
      </div>

      <div className="teaching-layout" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 4fr',
        gap: '25px',
        alignItems: 'start'
      }}>
        <div className="learning-objectives-area" style={{ 
          background: 'white', 
          padding: '25px', 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <TeachingGuide 
            vulnerability={teachingData.vulnerability}
            steps={teachingData.steps}
            learningObjectives={teachingData.learningObjectives}
            practiceTasks={teachingData.practiceTasks}
          />
        </div>
        <div className="practice-area" style={{ width: '100%' }}>
          <div style={{ 
            background: 'white', 
            padding: '25px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '25px'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#2c3e50' }}>💻 实践操作区</h3>
            
            <div className="current-step" style={{ 
              background: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <h4 style={{ marginTop: 0, color: '#495057' }}>当前步骤: {teachingData.steps[currentStep].title}</h4>
              <p style={{ marginBottom: '15px', color: '#6c757d' }}>{teachingData.steps[currentStep].description}</p>
              {teachingData.steps[currentStep].example && (
                <div className="step-example">
                  <strong style={{ color: '#495057' }}>示例代码:</strong>
                  <pre style={{ 
                    background: '#1e1e1e', 
                    color: '#00ff00',
                    padding: '15px',
                    borderRadius: '6px',
                    overflow: 'auto',
                    fontSize: '13px',
                    marginTop: '10px'
                  }}>{teachingData.steps[currentStep].example}</pre>
                </div>
              )}
            </div>

            <form onSubmit={handleSearch} className="practice-form">
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="search" style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#495057'
                }}>产品搜索 (测试SQL注入):</label>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="输入产品名称或SQL注入载荷"
                  style={{ 
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '14px',
                    transition: 'border-color 0.3s'
                  }}
                />
              </div>

              <div className="form-actions" style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '15px'
              }}>
                <button type="submit" className="btn" disabled={loading} style={{ 
                  padding: '12px 25px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  flex: 1
                }}>
                  {loading ? '搜索中...' : '执行搜索'}
                </button>
                
                <div className="step-navigation" style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    style={{ 
                      padding: '12px 20px',
                      background: currentStep === 0 ? '#f8f9fa' : '#6c757d',
                      color: currentStep === 0 ? '#adb5bd' : 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    上一步
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => setCurrentStep(Math.min(teachingData.steps.length - 1, currentStep + 1))}
                    disabled={currentStep === teachingData.steps.length - 1}
                    style={{ 
                      padding: '12px 20px',
                      background: currentStep === teachingData.steps.length - 1 ? '#f8f9fa' : '#007bff',
                      color: currentStep === teachingData.steps.length - 1 ? '#adb5bd' : 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: currentStep === teachingData.steps.length - 1 ? 'not-allowed' : 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    下一步
                  </button>
                </div>
              </div>
            </form>

            {error && <div className="error" style={{ 
              background: '#f8d7da', 
              color: '#721c24', 
              padding: '12px 15px', 
              borderRadius: '6px',
              marginTop: '15px',
              border: '1px solid #f5c6cb'
            }}>{error}</div>}

            {results.length > 0 && (
              <div className="results" style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '8px',
                marginTop: '20px'
              }}>
                <h4 style={{ marginTop: 0, color: '#495057' }}>搜索结果 ({results.length} 条记录):</h4>
                {results.map((product, index) => (
                  <div key={index} className="result-item" style={{ 
                    background: 'white', 
                    padding: '15px', 
                    borderRadius: '6px',
                    marginBottom: '10px',
                    border: '1px solid #e9ecef'
                  }}>
                    <h5 style={{ margin: '0 0 8px 0', color: '#343a40' }}>{product.name}</h5>
                    <p style={{ margin: '0 0 8px 0', color: '#6c757d' }}>{product.description}</p>
                    <p style={{ margin: 0, color: '#495057' }}><strong>价格:</strong> ${product.price}</p>
                    {product.username && (
                      <p style={{ margin: '8px 0 0 0', color: '#dc3545' }}><strong>额外数据:</strong> {product.username} - {product.password}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="example-payloads" style={{ 
            background: 'white', 
            padding: '25px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div className="library-header" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <h4>📋 SQL注入载荷库</h4>
              
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <input
                    type="text"
                    placeholder="搜索载荷..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ 
                      padding: '8px 12px',
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      fontSize: '14px',
                      width: '200px'
                    }}
                  />
                </div>
                
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ 
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '14px',
                    background: 'white'
                  }}
                >
                  <option value="all">所有分类 ({examplePayloads.length})</option>
                  {Object.entries(categories).filter(([key]) => key !== 'all').map(([key, name]) => (
                    <option key={key} value={key}>
                      {name} ({examplePayloads.filter(p => p.category === key).length})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="category-stats" style={{ 
              background: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div>
                  <strong>当前显示:</strong> {filteredPayloads.length} 个载荷
                </div>
                <div>
                  <strong>搜索:</strong> {searchTerm || '无'}
                </div>
                <div>
                  <strong>分类:</strong> {categories[selectedCategory]}
                </div>
                <div>
                  <strong>页码:</strong> {currentPage} / {totalPages}
                </div>
              </div>
            </div>

            {currentPayloads.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <h5>没有找到匹配的载荷</h5>
                <p>请尝试其他搜索词或选择不同的分类</p>
              </div>
            ) : (
              <>
                <div className="payloads-grid" style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                  gap: '20px',
                  marginBottom: '30px'
                }}>
                  {currentPayloads.map((example, index) => (
                    <div key={index} className="payload-card" style={{ 
                      background: 'white',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      padding: '20px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}>
                      <div className="payload-header" style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: '12px'
                      }}>
                        <h6 style={{ 
                          margin: 0, 
                          color: '#343a40',
                          fontSize: '16px',
                          fontWeight: '600'
                        }}>
                          {example.name}
                        </h6>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span className={`difficulty ${example.difficulty}`} style={{ 
                            padding: '2px 6px', 
                            borderRadius: '3px',
                            fontSize: '10px',
                            fontWeight: 'bold'
                          }}>
                            {example.difficulty}
                          </span>
                          <span style={{ 
                            background: '#6c757d', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '3px',
                            fontSize: '10px'
                          }}>
                            {categories[example.category]}
                          </span>
                        </div>
                      </div>
                      
                      <code style={{ 
                        display: 'block', 
                        background: '#1e1e1e', 
                        color: '#00ff00',
                        padding: '12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        margin: '12px 0',
                        overflow: 'auto',
                        maxHeight: '120px',
                        fontFamily: 'Courier New, monospace',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all'
                      }}>
                        {example.payload}
                      </code>
                      
                      <p style={{ 
                        margin: 0, 
                        fontSize: '14px', 
                        color: '#6c757d',
                        lineHeight: '1.5',
                        marginBottom: '15px'
                      }}>
                        {example.description}
                      </p>
                      
                      <div className="payload-actions" style={{ display: 'flex', gap: '10px' }}>
                        <button
                          className="btn btn-small"
                          onClick={() => {
                            setSearchQuery(example.payload);
                            document.getElementById('search').focus();
                          }}
                          style={{ 
                            padding: '6px 12px',
                            fontSize: '12px'
                          }}
                        >
                          使用此载荷
                        </button>
                        <button
                          className="btn btn-small btn-info"
                          onClick={() => setSelectedPayload(example)}
                          style={{ 
                            padding: '6px 12px',
                            fontSize: '12px'
                          }}
                        >
                          查看原理
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 分页控件 */}
                {totalPages > 1 && (
                  <div className="pagination" style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '20px'
                  }}>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: '8px 16px',
                        border: '1px solid #dee2e6',
                        background: currentPage === 1 ? '#f8f9fa' : 'white',
                        color: currentPage === 1 ? '#6c757d' : '#007bff',
                        borderRadius: '4px',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      上一页
                    </button>
                    
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            style={{
                              padding: '8px 12px',
                              border: '1px solid #dee2e6',
                              background: currentPage === pageNum ? '#007bff' : 'white',
                              color: currentPage === pageNum ? 'white' : '#007bff',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: currentPage === pageNum ? 'bold' : 'normal'
                            }}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '8px 16px',
                        border: '1px solid #dee2e6',
                        background: currentPage === totalPages ? '#f8f9fa' : 'white',
                        color: currentPage === totalPages ? '#6c757d' : '#007bff',
                        borderRadius: '4px',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                      }}
                    >
                      下一页
                    </button>
                    
                    <span style={{ color: '#6c757d', fontSize: '14px' }}>
                      第 {currentPage} 页，共 {totalPages} 页
                    </span>
                  </div>
                )}
              </>
            )}
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

      </div>
    </div>
  );
}

export default SQLInjection;

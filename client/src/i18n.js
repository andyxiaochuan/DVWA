// Internationalization support
const translations = {
  en: {
    // Navigation
    home: "Home",
    login: "Login",
    logout: "Logout",
    sqlInjection: "SQL Injection",
    xss: "XSS",
    idor: "IDOR",
    commandInjection: "Command Injection",
    ddos: "DDoS",
    secureSearch: "Secure Search",
    welcome: "Welcome",
    warning: "Warning",
    footerWarning: "This application contains intentional security vulnerabilities for educational purposes only. Do not deploy in production environments.",

    // Home page
    welcomeTitle: "🎓 DVMA - Cybersecurity Learning Platform",
    welcomeDescription: "A practical platform designed for cybersecurity learning. Through hands-on practice, you will learn common web application vulnerabilities, attack techniques, and corresponding protection measures.",
    platformFeatures: "Platform Features",
    feature1Title: "📚 Systematic Learning",
    feature1Desc: "From basic principles to advanced attack techniques, progressive learning path",
    feature2Title: "💻 Hands-on Practice",
    feature2Desc: "Practical operation in a safe environment to deepen understanding",
    feature3Title: "🛡️ Protection Comparison",
    feature3Desc: "Compare vulnerabilities and protection implementations, learn best practices",
    learningPaths: "🎯 Learning Paths",
    gettingStarted: "🚀 Quick Start",
    testAccounts: "🔑 Test Accounts",
    safetyNotice: "⚠️ Safety Notice",
    safetyWarning: "Important Reminder: This platform is only for legitimate cybersecurity education and research purposes. Do not use these techniques for illegal activities. Before testing security vulnerabilities in real environments, ensure you have explicit authorization.",
    safetyRules: [
      "✅ Use only in learning environments",
      "✅ Test only with explicit authorization",
      "❌ Do not attack production systems",
      "❌ Do not use for illegal purposes"
    ],
    startLearning: "Start Learning",
    step1Title: "Choose Learning Path",
    step1Description: "Select the vulnerability type you're interested in from the learning paths above",
    step2Title: "Learn Theory",
    step2Description: "Read about vulnerability principles, attack techniques, and protection measures",
    step3Title: "Hands-on Practice",
    step3Description: "Follow guided steps for practical operation",
    step4Title: "Complete Practice Tasks",
    step4Description: "Complete practice tasks in each module to consolidate learning",
    username: "Username",
    password: "Password",
    role: "Role",
    admin: "Administrator",
    user: "Regular User",
    adminDescription: "Has all permissions, used for testing privilege escalation",
    userDescription: "Limited permissions, used for testing horizontal privilege escalation",
    testAccountsDescription: "Use the following accounts to log in and start learning:",
    safetyWarningTitle: "Important Reminder",

    // Learning paths
    sqlLearningPath: {
      title: "🔓 SQL Injection Attack",
      description: "Learn how to manipulate database queries through malicious SQL code",
      features: [
        "Understand SQL injection principles",
        "Master UNION query attacks",
        "Learn database information gathering",
        "Practice parameterized query protection"
      ],
      difficulty: "Beginner → Advanced"
    },
    xssLearningPath: {
      title: "🌐 XSS Cross-Site Scripting",
      description: "Learn how to attack other users through malicious scripts",
      features: [
        "Understand XSS attack types",
        "Master script injection techniques",
        "Learn cookie theft",
        "Practice input filtering protection"
      ],
      difficulty: "Beginner → Intermediate"
    },
    idorLearningPath: {
      title: "🔑 IDOR Insecure Direct Object Reference",
      description: "Learn how to bypass access controls to access unauthorized resources",
      features: [
        "Understand IDOR vulnerability principles",
        "Master object reference enumeration",
        "Learn privilege bypass techniques",
        "Practice access control protection"
      ],
      difficulty: "Beginner"
    },
    commandInjectionLearningPath: {
      title: "💻 Command Injection Attack",
      description: "Learn how to attack servers through system command execution",
      features: [
        "Understand command injection principles",
        "Master system command execution",
        "Learn reverse shell techniques",
        "Practice input validation protection"
      ],
      difficulty: "Intermediate → Advanced"
    },
    authLearningPath: {
      title: "🔐 Authentication Bypass Attack",
      description: "Learn how to bypass authentication mechanisms",
      features: [
        "Understand weak authentication mechanisms",
        "Master JWT token attacks",
        "Learn session hijacking",
        "Practice strong authentication protection"
      ],
      difficulty: "Beginner → Intermediate"
    },
    ddosLearningPath: {
      title: "🌪️ DDoS Attack",
      description: "Learn how distributed denial of service attacks overload servers",
      features: [
        "Understand DDoS attack principles",
        "Learn different types of DDoS attacks",
        "Master traffic simulation techniques",
        "Practice DDoS mitigation strategies"
      ],
      difficulty: "Intermediate → Advanced"
    },

    // SQL Injection
    sqlInjectionTitle: "🔓 SQL Injection Attack",
    practiceArea: "💻 Practice Area",
    currentStep: "Current Step",
    examplePayloads: "📋 Example Payload Library",
    useThisPayload: "Use this payload",
    searchProducts: "Product Search (Test SQL Injection)",
    executeSearch: "Execute Search",
    searching: "Searching...",
    previousStep: "Previous",
    nextStep: "Next",
    results: "Search Results",
    records: "records",
    additionalData: "Additional Data",

    // Teaching guide
    vulnerabilityPrinciples: "🔍 Vulnerability Principles",
    practiceSteps: "🎯 Practice Steps",
    practiceTasks: "💪 Practice Tasks",
    task: "Task",
    hint: "Hint",

    // Difficulty levels
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",

    // SQL Injection specific
    sqlVulnerability: {
      name: "SQL Injection Attack",
      description: "SQL injection is an attack technique that manipulates database queries by inserting malicious SQL code into user input. Attackers can use this vulnerability to read, modify, or delete data in the database.",
      attackPrinciple: "When an application directly concatenates user input into SQL queries without proper validation and escaping, attackers can insert special SQL statements to change the original intent of the query.",
      impact: "May lead to data leakage, data tampering, privilege escalation, and even complete control of the database server.",
      protections: [
        "Use parameterized queries (prepared statements)",
        "Implement input validation and filtering",
        "Use ORM frameworks",
        "Principle of least privilege",
        "Error messages should not expose database structure"
      ]
    },
    sqlLearningObjectives: [
      "Understand the basic principles of SQL injection attacks",
      "Master common SQL injection attack techniques",
      "Learn to identify and exploit SQL injection vulnerabilities",
      "Understand best practices for preventing SQL injection",
      "Be able to write secure database query code"
    ],
    sqlSteps: [
      {
        title: "Understand Vulnerability Principles",
        description: "Learn how SQL injection affects database queries through user input",
        example: 'Normal query: SELECT * FROM products WHERE name LIKE "%laptop%"\nMalicious query: SELECT * FROM products WHERE name LIKE "%\' OR \'1\'=\'1%"'
      },
      {
        title: "Test Basic Injection",
        description: "Try using simple SQL injection payloads to verify the vulnerability",
        example: "' OR '1'='1"
      },
      {
        title: "Extract Data",
        description: "Use UNION queries to extract data from other tables",
        example: "' UNION SELECT 1,username,password,4 FROM users-- "
      },
      {
        title: "Get Database Information",
        description: "Use SQL injection to obtain database structure and metadata",
        example: "' UNION SELECT 1,table_name,column_name,4 FROM information_schema.columns-- "
      }
    ],
    sqlPracticeTasks: [
      {
        title: "Basic Injection",
        description: "Use simple SQL injection payloads to return all products",
        hint: "Try using logical operators to bypass query conditions"
      },
      {
        title: "Data Extraction",
        description: "Extract usernames and passwords from the users table",
        hint: "Use UNION SELECT statements, pay attention to column count matching"
      },
      {
        title: "Database Exploration",
        description: "Get all table names in the database",
        hint: "Query the information_schema.tables table"
      },
      {
        title: "Security Comparison",
        description: "Test the same payloads on the secure search endpoint",
        hint: "Observe how parameterized queries prevent injection"
      }
    ],
    sqlExamplePayloads: [
      {
        name: "Basic SQL Injection",
        payload: "' OR '1'='1",
        description: "Return all products - verify vulnerability exists",
        difficulty: "beginner"
      },
      {
        name: "UNION Data Extraction",
        payload: "' UNION SELECT 1,username,password,4 FROM users-- ",
        description: "Extract user credentials - learn data leakage",
        difficulty: "intermediate"
      },
      {
        name: "Database Information",
        payload: "' UNION SELECT 1,table_name,column_name,4 FROM information_schema.columns-- ",
        description: "Get database structure - learn information gathering",
        difficulty: "advanced"
      },
      {
        name: "Comment Bypass",
        payload: "laptop' -- ",
        description: "Use comments to bypass subsequent conditions",
        difficulty: "beginner"
      }
    ],

    // Knowledge Guide
    knowledgeGuide: "Knowledge Guide",
    knowledgeGuideTitle: "📚 Cybersecurity Knowledge Base",
    selectVulnerability: "Select Vulnerability Type:",
    vulnerabilityOverview: "Vulnerability Overview",
    vulnerabilityDescription: "Vulnerability Description",
    attackPrinciple: "Attack Principle",
    impact: "Impact",
    learningObjectives: "🎯 Learning Objectives",
    protectionMeasures: "🛡️ Protection Measures",
    realWorldExamples: "🌍 Real World Examples",
    detectionTechniques: "🔍 Detection Techniques",
    advancedTechniques: "⚡ Advanced Attack Techniques",
    practiceRecommendations: "💪 Practice Recommendations",
    beginnerLevel: "Beginner",
    intermediateLevel: "Intermediate",
    advancedLevel: "Advanced",
    learningResources: "📖 Learning Resources",

    // Practice Challenges
    practiceChallenges: "Practice Challenges",
    practiceChallengesTitle: "🏆 Practice Challenges",
    learningProgress: "Learning Progress",
    completedChallenges: "Completed Challenges",
    totalPoints: "Total Points",
    completionRate: "Completion Rate",
    startChallenge: "Start Challenge",
    challengeCompleted: "✅ Completed",
    completionTime: "Completion Time",
    description: "Description",
    objective: "Objective",
    hints: "💡 Hints",
    enterSolution: "Enter your solution",
    submitSolution: "Submit Solution",
    prerequisites: "Prerequisites",
    achievements: "🏅 Achievements",
    firstChallenge: "First Steps",
    threeChallenges: "Getting Better",
    allChallenges: "Security Expert",
    challengeComplete: "🎉 Challenge completed!",
    challengeFailed: "❌ Challenge not completed, please check your solution"
  },

  zh: {
    // Navigation
    home: "首页",
    login: "登录",
    logout: "退出",
    sqlInjection: "SQL注入",
    xss: "XSS",
    idor: "IDOR",
    commandInjection: "命令注入",
    ddos: "DDoS",
    secureSearch: "安全搜索",
    welcome: "欢迎",
    warning: "警告",
    footerWarning: "本应用程序包含故意设计的安全漏洞，仅用于教育目的。请勿在生产环境中部署。",

    // Home page
    welcomeTitle: "🎓 DVMA - 网络安全教学平台",
    welcomeDescription: "这是一个专门为网络安全学习设计的实践平台。通过动手实践，您将学习常见的Web应用漏洞、攻击技术以及相应的防护措施。",
    platformFeatures: "平台特色",
    feature1Title: "📚 系统化学习",
    feature1Desc: "从基础原理到高级攻击技术，循序渐进的学习路径",
    feature2Title: "💻 动手实践",
    feature2Desc: "在安全环境中实际操作，加深理解",
    feature3Title: "🛡️ 防护对比",
    feature3Desc: "对比漏洞和防护实现，学习最佳实践",
    learningPaths: "🎯 学习路径",
    gettingStarted: "🚀 快速开始",
    testAccounts: "🔑 测试账户",
    safetyNotice: "⚠️ 安全声明",
    safetyWarning: "重要提醒：本平台仅用于合法的网络安全教育和研究目的。请勿将这些技术用于非法活动。在实际环境中测试安全漏洞前，请确保您有明确的授权。",
    safetyRules: [
      "✅ 仅在学习环境中使用",
      "✅ 获得明确授权后进行测试",
      "❌ 不要攻击生产系统",
      "❌ 不要用于非法目的"
    ],
    startLearning: "开始学习",
    step1Title: "选择学习路径",
    step1Description: "从上面的学习路径中选择您感兴趣的漏洞类型",
    step2Title: "学习理论知识",
    step2Description: "阅读漏洞原理、攻击技术和防护措施",
    step3Title: "动手实践",
    step3Description: "按照指导步骤进行实际操作",
    step4Title: "完成实践任务",
    step4Description: "完成每个模块的实践任务来巩固学习",
    username: "用户名",
    password: "密码",
    role: "角色",
    admin: "管理员",
    user: "普通用户",
    adminDescription: "拥有所有权限，用于测试权限提升",
    userDescription: "受限权限，用于测试水平权限提升",
    testAccountsDescription: "使用以下账户登录系统进行学习：",
    safetyWarningTitle: "重要提醒",

    // Learning paths
    sqlLearningPath: {
      title: "🔓 SQL注入攻击",
      description: "学习如何通过恶意SQL代码操纵数据库查询",
      features: [
        "理解SQL注入原理",
        "掌握UNION查询攻击",
        "学习数据库信息收集",
        "实践参数化查询防护"
      ],
      difficulty: "初级 → 高级"
    },
    xssLearningPath: {
      title: "🌐 XSS跨站脚本攻击",
      description: "学习如何通过恶意脚本攻击其他用户",
      features: [
        "理解XSS攻击类型",
        "掌握脚本注入技术",
        "学习Cookie窃取",
        "实践输入过滤防护"
      ],
      difficulty: "初级 → 中级"
    },
    idorLearningPath: {
      title: "🔑 IDOR不安全对象引用",
      description: "学习如何绕过访问控制访问未授权资源",
      features: [
        "理解IDOR漏洞原理",
        "掌握对象引用枚举",
        "学习权限绕过技术",
        "实践访问控制防护"
      ],
      difficulty: "初级"
    },
    commandInjectionLearningPath: {
      title: "💻 命令注入攻击",
      description: "学习如何通过系统命令执行攻击服务器",
      features: [
        "理解命令注入原理",
        "掌握系统命令执行",
        "学习反向Shell技术",
        "实践输入验证防护"
      ],
      difficulty: "中级 → 高级"
    },
    authLearningPath: {
      title: "🔐 认证绕过攻击",
      description: "学习如何绕过身份验证机制",
      features: [
        "理解弱认证机制",
        "掌握JWT令牌攻击",
        "学习会话劫持",
        "实践强认证防护"
      ],
      difficulty: "初级 → 中级"
    },
    ddosLearningPath: {
      title: "🌪️ DDoS攻击",
      description: "学习分布式拒绝服务攻击如何使服务器过载",
      features: [
        "理解DDoS攻击原理",
        "学习不同类型的DDoS攻击",
        "掌握流量模拟技术",
        "实践DDoS缓解策略"
      ],
      difficulty: "中级 → 高级"
    },

    // SQL Injection
    sqlInjectionTitle: "🔓 SQL注入攻击教学",
    practiceArea: "💻 实践操作区",
    currentStep: "当前步骤",
    examplePayloads: "📋 示例载荷库",
    useThisPayload: "使用此载荷",
    searchProducts: "产品搜索 (测试SQL注入)",
    executeSearch: "执行搜索",
    searching: "搜索中...",
    previousStep: "上一步",
    nextStep: "下一步",
    results: "搜索结果",
    records: "条记录",
    additionalData: "额外数据",

    // Teaching guide
    vulnerabilityPrinciples: "🔍 漏洞原理",
    practiceSteps: "🎯 实践步骤",
    practiceTasks: "💪 实践任务",
    task: "任务",
    hint: "提示",

    // Difficulty levels
    beginner: "初级",
    intermediate: "中级",
    advanced: "高级",

    // SQL Injection specific
    sqlVulnerability: {
      name: "SQL注入攻击",
      description: "SQL注入是一种通过在用户输入中插入恶意SQL代码来操纵数据库查询的攻击技术。攻击者可以利用此漏洞读取、修改或删除数据库中的数据。",
      attackPrinciple: "当应用程序直接将用户输入拼接到SQL查询中，而没有进行适当的验证和转义时，攻击者可以插入特殊的SQL语句来改变查询的原始意图。",
      impact: "可能导致数据泄露、数据篡改、权限提升，甚至完全控制数据库服务器。",
      protections: [
        "使用参数化查询（预编译语句）",
        "实施输入验证和过滤",
        "使用ORM框架",
        "最小权限原则",
        "错误信息不暴露数据库结构"
      ]
    },
    sqlLearningObjectives: [
      "理解SQL注入攻击的基本原理",
      "掌握常见的SQL注入攻击手法",
      "学会识别和利用SQL注入漏洞",
      "了解防护SQL注入的最佳实践",
      "能够编写安全的数据库查询代码"
    ],
    sqlSteps: [
      {
        title: "理解漏洞原理",
        description: "学习SQL注入是如何通过用户输入影响数据库查询的",
        example: '正常查询: SELECT * FROM products WHERE name LIKE "%laptop%"\n恶意查询: SELECT * FROM products WHERE name LIKE "%\' OR \'1\'=\'1%"'
      },
      {
        title: "测试基本注入",
        description: "尝试使用简单的SQL注入载荷来验证漏洞",
        example: "' OR '1'='1"
      },
      {
        title: "提取数据",
        description: "使用UNION查询从其他表中提取数据",
        example: "' UNION SELECT 1,username,password,4 FROM users-- "
      },
      {
        title: "获取数据库信息",
        description: "利用SQL注入获取数据库结构和元数据",
        example: "' UNION SELECT 1,table_name,column_name,4 FROM information_schema.columns-- "
      }
    ],
    sqlPracticeTasks: [
      {
        title: "基础注入",
        description: "使用简单的SQL注入载荷返回所有产品",
        hint: "尝试使用逻辑运算符绕过查询条件"
      },
      {
        title: "数据提取",
        description: "从users表中提取用户名和密码",
        hint: "使用UNION SELECT语句，注意列数匹配"
      },
      {
        title: "数据库探测",
        description: "获取数据库中的所有表名",
        hint: "查询information_schema.tables表"
      },
      {
        title: "安全对比",
        description: "在安全搜索端点测试相同的载荷",
        hint: "观察参数化查询如何防止注入"
      }
    ],
    sqlExamplePayloads: [
      {
        name: "基础SQL注入",
        payload: "' OR '1'='1",
        description: "返回所有产品 - 验证漏洞存在",
        difficulty: "beginner"
      },
      {
        name: "UNION数据提取",
        payload: "' UNION SELECT 1,username,password,4 FROM users-- ",
        description: "提取用户凭据 - 学习数据泄露",
        difficulty: "intermediate"
      },
      {
        name: "数据库信息",
        payload: "' UNION SELECT 1,table_name,column_name,4 FROM information_schema.columns-- ",
        description: "获取数据库结构 - 学习信息收集",
        difficulty: "advanced"
      },
      {
        name: "注释绕过",
        payload: "laptop' -- ",
        description: "使用注释绕过后续条件",
        difficulty: "beginner"
      }
    ],

    // Knowledge Guide
    knowledgeGuide: "知识库",
    knowledgeGuideTitle: "📚 网络安全知识库",
    selectVulnerability: "选择漏洞类型：",
    vulnerabilityOverview: "漏洞概述",
    vulnerabilityDescription: "漏洞描述",
    attackPrinciple: "攻击原理",
    impact: "危害影响",
    learningObjectives: "🎯 学习目标",
    protectionMeasures: "🛡️ 防护措施",
    realWorldExamples: "🌍 真实案例",
    detectionTechniques: "🔍 检测技术",
    advancedTechniques: "⚡ 高级攻击技术",
    practiceRecommendations: "💪 实践建议",
    beginnerLevel: "初学者",
    intermediateLevel: "中级",
    advancedLevel: "高级",
    learningResources: "📖 学习资源",

    // Practice Challenges
    practiceChallenges: "实战挑战",
    practiceChallengesTitle: "🏆 实战挑战",
    learningProgress: "学习进度",
    completedChallenges: "已完成挑战",
    totalPoints: "总积分",
    completionRate: "完成度",
    startChallenge: "开始挑战",
    challengeCompleted: "✅ 已完成",
    completionTime: "完成时间",
    description: "描述",
    objective: "目标",
    hints: "💡 提示",
    enterSolution: "输入你的解决方案",
    submitSolution: "提交解决方案",
    prerequisites: "前置要求",
    achievements: "🏅 成就系统",
    firstChallenge: "初出茅庐",
    threeChallenges: "渐入佳境",
    allChallenges: "安全专家",
    challengeComplete: "🎉 挑战完成！",
    challengeFailed: "❌ 挑战未完成，请检查你的解决方案",

    // DDoS specific translations
    ddosAttackControls: "攻击模拟控制",
    attackType: "攻击类型",
    trafficRate: "流量速率",
    requestsPerSec: "请求/秒",
    startDDoSAttack: "🚀 开始DDoS攻击",
    stopAttack: "🛑 停止攻击",
    serverStatus: "服务器状态",
    attackStatistics: "攻击统计",
    requestsPerSecond: "请求/秒",
    totalRequests: "总请求数",
    bandwidth: "带宽",
    serverLoad: "服务器负载",
    normalOperation: "🟢 正常运行",
    underDDoSAttack: "🔴 遭受DDoS攻击",
    recovering: "🟡 恢复中",
    aboutAttack: "关于",
    howItWorks: "工作原理",
    ddosProtectionMeasures: "🛡️ 防护措施",
    rateLimiting: "速率限制",
    trafficFiltering: "流量过滤",
    cdnServices: "CDN服务",
    ddosProtectionServices: "DDoS防护服务",
    ddosPracticeTasks: "💪 实践任务",
    understandAttackPatterns: "理解攻击模式",
    identifyAttackSignatures: "识别攻击特征",
    testMitigationStrategies: "测试缓解策略",
    interactiveTutorial: "📚 交互式教程",
    ddosAttackTutorial: "DDoS攻击教程",
    normalTrafficFlow: "正常流量",
    botnetActivation: "僵尸网络激活",
    trafficFlood: "流量洪水",
    serviceDegradation: "服务降级",
    step: "步骤",
    previous: "← 上一步",
    next: "下一步 →",
    startSimulation: "开始模拟"
  }
};

// Language context
let currentLanguage = 'en';

export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang;
    // Save to localStorage
    localStorage.setItem('dvma-language', lang);
  }
};

export const getLanguage = () => currentLanguage;

export const t = (key, params = {}) => {
  const keys = key.split('.');
  let value = translations[currentLanguage];
  
  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      let enValue = translations.en;
      for (const k of keys) {
        if (enValue && enValue[k] !== undefined) {
          enValue = enValue[k];
        } else {
          return key; // Return key if not found in any language
        }
      }
      return enValue;
    }
  }
  
  // Replace parameters if any
  if (typeof value === 'string' && Object.keys(params).length > 0) {
    return value.replace(/\{(\w+)\}/g, (match, param) => params[param] || match);
  }
  
  return value;
};

// Initialize language from localStorage
const savedLanguage = localStorage.getItem('dvma-language');
if (savedLanguage && translations[savedLanguage]) {
  currentLanguage = savedLanguage;
}

export default translations;

import React from 'react';

function TeachingGuide({ vulnerability, steps, learningObjectives, practiceTasks }) {
  return (
    <div className="teaching-guide">
      <div className="guide-section">
        <h3>📚 学习目标</h3>
        <ul>
          {learningObjectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </div>

      <div className="guide-section">
        <h3>🔍 漏洞原理</h3>
        <p>{vulnerability.description}</p>
        <div className="vulnerability-details">
          <h4>攻击原理：</h4>
          <p>{vulnerability.attackPrinciple}</p>
          <h4>危害影响：</h4>
          <p>{vulnerability.impact}</p>
        </div>
      </div>

      <div className="guide-section">
        <h3>🎯 实践步骤</h3>
        <div className="steps">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
                {step.example && (
                  <div className="example">
                    <strong>示例：</strong>
                    <code>{step.example}</code>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="guide-section">
        <h3>🛡️ 防护措施</h3>
        <ul>
          {vulnerability.protections.map((protection, index) => (
            <li key={index}>{protection}</li>
          ))}
        </ul>
      </div>

      <div className="guide-section">
        <h3>💪 实践任务</h3>
        <div className="practice-tasks">
          {practiceTasks.map((task, index) => (
            <div key={index} className="task">
              <h4>任务 {index + 1}: {task.title}</h4>
              <p>{task.description}</p>
              <div className="task-hint">
                <strong>提示：</strong> {task.hint}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeachingGuide;

import React from 'react'
import { FiTrendingUp, FiCheckCircle, FiTarget } from 'react-icons/fi'
import '../assets/css/results.css'

function Results() {
  const results = [
    {
      id: 1,
      date: '2024-05-25',
      category: 'Data Structures',
      score: 8,
      total: 10,
      time: '12:45',
      accuracy: 80
    },
    {
      id: 2,
      date: '2024-05-24',
      category: 'Algorithms',
      score: 9,
      total: 10,
      time: '15:30',
      accuracy: 90
    },
    {
      id: 3,
      date: '2024-05-23',
      category: 'System Design',
      score: 6,
      total: 10,
      time: '20:15',
      accuracy: 60
    },
    {
      id: 4,
      date: '2024-05-22',
      category: 'Behavioral',
      score: 7,
      total: 10,
      time: '18:00',
      accuracy: 70
    }
  ]

  const stats = [
    { label: 'Total Tests', value: 24, icon: <FiCheckCircle /> },
    { label: 'Average Score', value: '78%', icon: <FiTarget /> },
    { label: 'Improvement', value: '+12%', icon: <FiTrendingUp /> }
  ]

  const getScoreColor = (accuracy) => {
    if (accuracy >= 80) return 'high'
    if (accuracy >= 60) return 'medium'
    return 'low'
  }

  return (
    <div className="results">
      <div className="results-header">
        <h1>Your Results & Progress</h1>
        <p>Track your performance and improvement over time</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-result">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Results Table */}
      <div className="results-section">
        <div className="section-header">
          <h2>Recent Test Results</h2>
          <span className="results-count">{results.length} tests</span>
        </div>

        <div className="results-container">
          <div className="table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Score</th>
                  <th>Time</th>
                  <th>Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id}>
                    <td>{new Date(result.date).toLocaleDateString()}</td>
                    <td>
                      <span className="category-tag">{result.category}</span>
                    </td>
                    <td>
                      <span className="score-badge">
                        {result.score}/{result.total}
                      </span>
                    </td>
                    <td>{result.time}</td>
                    <td>
                      <div className="accuracy-cell">
                        <span className={`accuracy-badge ${getScoreColor(result.accuracy)}`}>
                          {result.accuracy}%
                        </span>
                        <div className="accuracy-bar">
                          <div 
                            className={`accuracy-fill ${getScoreColor(result.accuracy)}`}
                            style={{ width: `${result.accuracy}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="mobile-results">
            {results.map((result) => (
              <div key={result.id} className="result-card">
                <div className="result-card-header">
                  <h3>{result.category}</h3>
                  <span className="result-date">{new Date(result.date).toLocaleDateString()}</span>
                </div>
                <div className="result-card-body">
                  <div className="result-row">
                    <span className="label">Score</span>
                    <span className="score-badge">{result.score}/{result.total}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Time</span>
                    <span>{result.time}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Accuracy</span>
                    <span className={`accuracy-badge ${getScoreColor(result.accuracy)}`}>
                      {result.accuracy}%
                    </span>
                  </div>
                  <div className="accuracy-bar">
                    <div 
                      className={`accuracy-fill ${getScoreColor(result.accuracy)}`}
                      style={{ width: `${result.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart Section */}
      <div className="performance-section">
        <h2>Performance by Category</h2>
        <div className="performance-grid">
          <div className="performance-card">
            <h4>Data Structures</h4>
            <div className="performance-bar">
              <div className="performance-fill" style={{ width: '80%' }}></div>
            </div>
            <span className="performance-text">80% Average</span>
          </div>
          <div className="performance-card">
            <h4>Algorithms</h4>
            <div className="performance-bar">
              <div className="performance-fill" style={{ width: '90%' }}></div>
            </div>
            <span className="performance-text">90% Average</span>
          </div>
          <div className="performance-card">
            <h4>System Design</h4>
            <div className="performance-bar">
              <div className="performance-fill" style={{ width: '60%' }}></div>
            </div>
            <span className="performance-text">60% Average</span>
          </div>
          <div className="performance-card">
            <h4>Behavioral</h4>
            <div className="performance-bar">
              <div className="performance-fill" style={{ width: '70%' }}></div>
            </div>
            <span className="performance-text">70% Average</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results

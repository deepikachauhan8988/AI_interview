import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import '../assets/css/style.css'

function Dashboard() {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState({
    questionsPracticed: 0,
    accuracy: 0,
    dailyStreak: 0,
    weeklyGoal: 0
  })
  const [recentSessions, setRecentSessions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const categoriesResponse = await fetch('http://127.0.0.1:8000/management/question/categories/')
        const categoriesData = await categoriesResponse.json()
        
        if (categoriesData.status) {
          const icons = ['📊', '🔍', '⚙️', '💾', '🏗️', '🌐']
          setCategories(
            categoriesData.data.map((name, index) => ({
              id: index + 1,
              name: name,
              progress: Math.floor(Math.random() * 50) + 30,
              icon: icons[index % icons.length]
            }))
          )
        }
        
        setStats({
          questionsPracticed: 127,
          accuracy: 87,
          dailyStreak: 5,
          weeklyGoal: 75
        })
        
        setRecentSessions([
          { id: 1, topic: 'Data Structures', score: 92, date: 'Today, 10:30 AM' },
          { id: 2, topic: 'System Design', score: 78, date: 'Yesterday, 3:15 PM' },
          { id: 3, topic: 'Algorithms', score: 85, date: 'May 27, 9:00 AM' },
          { id: 4, topic: 'Database', score: 91, date: 'May 26, 2:45 PM' }
        ])
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleLogout = () => {
    logout()
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>AI Interview Dashboard</h1>
            <p>Loading your interview preparation data...</p>
          </div>
          <div className="dashboard-loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Top Header Navigation */}
      <header className="top-header">
        <div className="header-left">
          <div className="header-logo">
            <h2>AI Interview</h2>
          </div>
          <nav className="header-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span>📊</span>
              <span>Overview</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'practice' ? 'active' : ''}`}
              onClick={() => setActiveTab('practice')}
            >
              <span>💪</span>
              <span>Practice</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('progress')}
            >
              <span>📈</span>
              <span>Progress</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span>⚙️</span>
              <span>Settings</span>
            </button>
          </nav>
        </div>
        <div className="header-right">
          <div className="header-user">
            <img 
              src="https://via.placeholder.com/40" 
              alt="User Avatar" 
              className="header-avatar"
            />
            <div className="header-user-info">
              <h3>{user?.name || 'User'}</h3>
              <p className="user-status">Online</p>
            </div>
          </div>
          <button 
            className="header-logout-btn"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <span>🚪</span>
          </button>
          {/* Mobile toggle button */}
          <button 
            className="mobile-header-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
          >
            <span>☰</span>
          </button>
        </div>
      </header>

      {/* Left Sidebar - Mobile */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <h2>AI Interview</h2>
          </div>
          <button 
            className="sidebar-close-btn"
            onClick={toggleSidebar}
            aria-label="Close navigation"
          >
            <span>✕</span>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
          >
            <span>📊</span>
            <span>Overview</span>
          </button>
          <button 
            className={`sidebar-nav-item ${activeTab === 'practice' ? 'active' : ''}`}
            onClick={() => { setActiveTab('practice'); setIsSidebarOpen(false); }}
          >
            <span>💪</span>
            <span>Practice</span>
          </button>
          <button 
            className={`sidebar-nav-item ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => { setActiveTab('progress'); setIsSidebarOpen(false); }}
          >
            <span>📈</span>
            <span>Progress</span>
          </button>
          <button 
            className={`sidebar-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
          >
            <span>⚙️</span>
            <span>Settings</span>
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button 
            className="sidebar-logout-btn"
            onClick={handleLogout}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`dashboard-main ${isSidebarOpen ? 'main-shifted' : ''}`}>
        <div className="dashboard-header">
          <h1>AI Interview Dashboard</h1>
          <p>Welcome back, {user?.name || 'User'}! Ready to ace your interviews?</p>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Categories - Moved to top as requested */}
            <section className="dashboard-section">
              <h2 className="section-title">Skill Categories</h2>
              <div className="categories-container">
                {categories.map(category => (
                  <div key={category.id} className="category-card">
                    <div className="category-header">
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-name">{category.name}</span>
                    </div>
                    <div className="category-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${category.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{category.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Stats Cards */}
            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <span>📝</span>
                </div>
                <div className="stat-content">
                  <h3>Questions Practiced</h3>
                  <p className="stat-value">{stats.questionsPracticed}</p>
                  <p className="stat-label">Total questions attempted</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <span>🎯</span>
                </div>
                <div className="stat-content">
                  <h3>Accuracy Rate</h3>
                  <p className="stat-value">{stats.accuracy}%</p>
                  <p className="stat-label">Overall performance</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <span>🔥</span>
                </div>
                <div className="stat-content">
                  <h3>Daily Streak</h3>
                  <p className="stat-value">{stats.dailyStreak}</p>
                  <p className="stat-label">Consecutive days</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <span>📅</span>
                </div>
                <div className="stat-content">
                  <h3>Weekly Goal</h3>
                  <p className="stat-value">{stats.weeklyGoal}%</p>
                  <p className="stat-label">Target achievement</p>
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <section className="dashboard-section">
              <h2 className="section-title">Recent Sessions</h2>
              <div className="sessions-container">
                {recentSessions.map(session => (
                  <div key={session.id} className="session-card">
                    <div className="session-header">
                      <span className="session-topic">{session.topic}</span>
                      <span className="session-date">{session.date}</span>
                    </div>
                    <div className="session-score">
                      <span>Score:</span>
                      <span className="score-value">{session.score}%</span>
                    </div>
                    <div className="session-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${session.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'practice' && (
          <div className="dashboard-section">
            <h2 className="section-title">Practice Interview</h2>
            <div className="practice-container">
              <div className="practice-card">
                <h3>Ready to practice?</h3>
                <p>Start your interview preparation session with AI-powered feedback</p>
                <button className="practice-btn">
                  <span>▶️</span>
                  <span>Start Practice Session</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="dashboard-section">
            <h2 className="section-title">Progress Analytics</h2>
            <div className="progress-container">
              <div className="progress-card">
                <h3>Weekly Performance</h3>
                <div className="chart-placeholder">
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '40%' }}></div>
                  <div className="chart-bar" style={{ height: '80%' }}></div>
                  <div className="chart-bar" style={{ height: '50%' }}></div>
                  <div className="chart-bar" style={{ height: '70%' }}></div>
                  <div className="chart-bar" style={{ height: '30%' }}></div>
                  <div className="chart-bar" style={{ height: '90%' }}></div>
                </div>
                <p className="chart-label">Last 7 days performance</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="dashboard-section">
            <h2 className="section-title">Settings</h2>
            <div className="settings-container">
              <div className="settings-card">
                <h3>Account Preferences</h3>
                <div className="setting-item">
                  <label>Email Notifications</label>
                  <div className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
                <div className="setting-item">
                  <label>Practice Reminders</label>
                  <div className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
                <div className="setting-item">
                  <label>Difficulty Level</label>
                  <select>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate" selected>Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard
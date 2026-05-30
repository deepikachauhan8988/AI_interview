import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import '../assets/css/style.css';

function Dashboard() {
  const { user, logout } = useAuth();
  
  // --- Dashboard States ---
  const [stats, setStats] = useState({
    questionsPracticed: 0,
    accuracy: 0,
    dailyStreak: 0,
    weeklyGoal: 0
  });
  const [recentSessions, setRecentSessions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Modal States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  
  // --- Interview Interaction States ---
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'voice'
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { status, score, message }
  const [recognition, setRecognition] = useState(null);

  // --- Speech Recognition Setup ---
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true; // Keep listening
      recognitionInstance.interimResults = true; // Show text as you speak
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsRecording(true);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        // Append final transcript to existing answer
        if (finalTranscript) {
          setUserAnswer(prev => prev + (prev ? ' ' : '') + finalTranscript);
        }
        // You could display interimTranscript in a separate span if desired
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }
  }, []);

  // --- Fetch Dashboard Data ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const categoriesResponse = await fetch('http://127.0.0.1:8000/management/question/categories/');
        const categoriesData = await categoriesResponse.json();
        
        if (categoriesData.status) {
          const icons = ['📊', '🔍', '⚙️', '💾', '🏗️', '🌐'];
          setCategories(
            categoriesData.data.map((name, index) => ({
              id: index + 1,
              name: name,
              progress: Math.floor(Math.random() * 50) + 30,
              icon: icons[index % icons.length]
            }))
          );
        }
        
        setStats({
          questionsPracticed: 127,
          accuracy: 87,
          dailyStreak: 5,
          weeklyGoal: 75
        });
        
        setRecentSessions([
          { id: 1, topic: 'Data Structures', score: 92, date: 'Today, 10:30 AM' },
          { id: 2, topic: 'System Design', score: 78, date: 'Yesterday, 3:15 PM' },
          { id: 3, topic: 'Algorithms', score: 85, date: 'May 27, 9:00 AM' },
          { id: 4, topic: 'Database', score: 91, date: 'May 26, 2:45 PM' }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // --- Modal Functions ---

   const openModal = async (categoryName = null) => {
     setIsModalOpen(true);
     setModalCategory(categoryName);
     setModalLoading(true);
     setCurrentQuestion(null);
     setUserAnswer('');
     setFeedback(null);
     setInputMode('text'); // Reset to text mode on open
     setSelectedQuestionIndex(0);

     try {
       // API Call: Fetch ALL questions from category
       const response = await fetch(`http://127.0.0.1:8000/management/question/category/${encodeURIComponent(categoryName || '')}/`, {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' }
       });
       
       const data = await response.json();
       
       if (data.status && data.data && data.data.length > 0) {
         setAllQuestions(data.data);
         setCurrentQuestion({
           id: data.data[0].id,
           category: data.data[0].category,
           question: data.data[0].question
         });
       } else {
         console.error("Failed to fetch questions:", data.message);
         // Fallback for demo if API fails
         const demoQuestions = [
           { id: 99, category: categoryName || "General", question: "What is the Virtual DOM in React?" },
           { id: 100, category: categoryName || "General", question: "Explain the difference between let, const, and var in JavaScript." },
           { id: 101, category: categoryName || "General", question: "What are React hooks and why are they useful?" }
         ];
         setAllQuestions(demoQuestions);
         setCurrentQuestion(demoQuestions[0]);
       }
     } catch (error) {
       console.error("API Error:", error);
       // Fallback for demo if API fails
       const demoQuestions = [
         { id: 99, category: categoryName || "General", question: "What is the Virtual DOM in React?" },
         { id: 100, category: categoryName || "General", question: "Explain the difference between let, const, and var in JavaScript." },
         { id: 101, category: categoryName || "General", question: "What are React hooks and why are they useful?" }
       ];
       setAllQuestions(demoQuestions);
       setCurrentQuestion(demoQuestions[0]);
     } finally {
       setModalLoading(false);
     }
   };

  const handleSelectQuestion = (index) => {
    setSelectedQuestionIndex(index);
    setCurrentQuestion({
      id: allQuestions[index].id,
      category: allQuestions[index].category,
      question: allQuestions[index].question
    });
    setUserAnswer('');
    setFeedback(null);
    setInputMode('text');
  };

  const closeModal = () => {
    if (isRecording && recognition) {
      recognition.stop();
    }
    setIsModalOpen(false);
    setUserAnswer('');
    setFeedback(null);
    setQuestionsAnswered(0);
    setAllQuestions([]);
    setSelectedQuestionIndex(0);
  };

   const handleNextQuestion = async () => {
     setModalLoading(true);
     setUserAnswer('');
     setFeedback(null);
     setInputMode('text');

     try {
       const queryParams = modalCategory 
         ? `?category=${encodeURIComponent(modalCategory)}` 
         : '';
       
       const response = await fetch(`http://127.0.0.1:8000/management/question/random/${queryParams}`, {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' }
       });
       
       const data = await response.json();
       
       if (data.status && data.data) {
         const newQuestion = data.data;
         
         // Check if this question already exists in allQuestions
         const existingIndex = allQuestions.findIndex(q => q.id === newQuestion.id);
         
         if (existingIndex !== -1) {
           // Question already exists, select it
           setSelectedQuestionIndex(existingIndex);
         } else {
           // Question is new, add it to the end and select it
           setAllQuestions(prev => [...prev, newQuestion]);
           setSelectedQuestionIndex(prev => prev.length); // New index at end
         }
         
         setCurrentQuestion({
           id: newQuestion.id,
           category: newQuestion.category,
           question: newQuestion.question
         });
         
         setQuestionsAnswered(prev => prev + 1);
       }
     } catch (error) {
       console.error("API Error fetching next question:", error);
     } finally {
       setModalLoading(false);
     }
   };

  const toggleRecording = () => {
    if (!recognition) {
      alert("Voice input is not supported in this browser (Use Chrome/Edge).");
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      // API Call: Check Answer
      const response = await fetch('http://127.0.0.1:8000/management/question/check-answer/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: currentQuestion.id,
          answer: userAnswer
        })
      });

      const result = await response.json();
      
      // Handle API response: { status: true/false, message: "...", details: "..." }
      const isCorrect = result.status === true;
      
      setFeedback({
        success: isCorrect,
        message: result.message || (isCorrect ? "Great job!" : "Try again!"),
        details: result.details || ""
      });

    } catch (error) {
      console.error("Check Answer Error:", error);
      setFeedback({
        success: false,
        message: "Error checking answer. Please try again.",
        details: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    );
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
            {/* Categories - Clickable to open modal */}
            <section className="dashboard-section">
              <h2 className="section-title">Skill Categories</h2>
              <div className="categories-container">
                {categories.map(category => (
                  <div 
                    key={category.id} 
                    className="category-card"
                    onClick={() => openModal(category.name)} // Open Modal here
                    style={{ cursor: 'pointer' }}
                  >
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
                <button className="practice-btn" onClick={() => openModal()}>
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

      {/* --- INTERVIEW MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalCategory ? `${modalCategory} Practice` : 'Random Practice'}</h3>
              <button className="modal-close-btn" onClick={closeModal}>✕</button>
            </div>

            {modalLoading ? (
              <div className="modal-body text-center">
                <div className="spinner"></div>
                <p>Loading question...</p>
              </div>
            ) : (
              <div className="modal-body">
                {/* Mode Selection */}
                <div className="mode-selector">
                  <button 
                    className={`mode-btn ${inputMode === 'text' ? 'active' : ''}`}
                    onClick={() => setInputMode('text')}
                  >
                    ⌨️ Text Answer
                  </button>
                  <button 
                    className={`mode-btn ${inputMode === 'voice' ? 'active' : ''}`}
                    onClick={() => setInputMode('voice')}
                  >
                    🎤 Voice Speak
                  </button>
                </div>

                {/* Question Selector */}
                {allQuestions.length > 0 && (
                  <div className="question-selector">
                    <label htmlFor="question-select">Select a Question:</label>
                    <select
                      id="question-select"
                      className="question-select-dropdown"
                      value={selectedQuestionIndex}
                      onChange={(e) => handleSelectQuestion(parseInt(e.target.value))}
                    >
                      {allQuestions.map((q, index) => (
                        <option key={q.id} value={index}>
                          Question {index + 1}: {q.question.substring(0, 50)}...
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Question Display */}
                {currentQuestion && (
                  <div className="question-display">
                    <div className="question-meta">
                      {currentQuestion.category && (
                        <span className="question-category">📁 {currentQuestion.category}</span>
                      )}
                    </div>
                    <strong>Question:</strong>
                    <p>{currentQuestion.question}</p>
                  </div>
                )}

                {/* Answer Input Area */}
                <div className="answer-area">
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder={
                      inputMode === 'voice' 
                        ? "Click microphone and speak..." 
                        : "Type your answer here..."
                    }
                    disabled={isSubmitting}
                  ></textarea>

                  {/* Voice Controls (Only visible in Voice Mode) */}
                  {inputMode === 'voice' && (
                    <div className="voice-controls">
                      <button 
                        className={`mic-btn ${isRecording ? 'recording' : ''}`}
                        onClick={toggleRecording}
                        disabled={isSubmitting}
                      >
                        {isRecording ? '⏹' : '🎤'}
                      </button>
                      {isRecording && <span className="recording-indicator">Listening...</span>}
                    </div>
                  )}
                </div>

                {/* Feedback / Result */}
                {feedback && (
                  <div className={`feedback-box ${feedback.success ? 'success' : 'error'}`}>
                    <div className="feedback-header">
                      <strong>
                        {feedback.success ? '✓ Correct!' : '✗ Incorrect'}
                      </strong>
                    </div>
                    <p className="feedback-message">{feedback.message}</p>
                    {feedback.details && (
                      <p className="feedback-details">{feedback.details}</p>
                    )}
                  </div>
                )}

                {/* Submit/Next Button Area */}
                {!feedback ? (
                  <button 
                    className="submit-modal-btn"
                    onClick={handleSubmitAnswer}
                    disabled={!userAnswer.trim() || isSubmitting}
                  >
                    {isSubmitting ? 'Checking...' : 'Submit Answer'}
                  </button>
                ) : (
                  <button 
                    className="submit-modal-btn next-btn"
                    onClick={handleNextQuestion}
                    disabled={modalLoading}
                  >
                    {modalLoading ? 'Loading next...' : '→ Next Question'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
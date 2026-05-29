import React from 'react'
import { Link } from 'react-router-dom'
import { FaRocket, FaCode, FaBrain, FaChartLine, FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import '../assets/css/home.css'

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Master Your Technical Interviews</h1>
          <p className="hero-subtitle">
            Practice real interview questions, get AI-powered feedback, and boost your confidence with our comprehensive platform.
          </p>
          <div className="hero-buttons">
            <Link to="/practice" className="btn btn-primary btn-large">
              Start Practicing
            </Link>
            <Link to="/about" className="btn btn-secondary btn-large">
              Learn More <FaArrowRight />
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-graphic">
            <div className="graphic-circle circle-1"></div>
            <div className="graphic-circle circle-2"></div>
            <div className="graphic-circle circle-3"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaBrain />
            </div>
            <h3>AI-Powered Analysis</h3>
            <p>
              Get intelligent feedback on your answers with AI analysis that identifies strengths and areas for improvement.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaCode />
            </div>
            <h3>Real Interview Questions</h3>
            <p>
              Practice with questions from top tech companies including FAANG and other industry leaders.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaChartLine />
            </div>
            <h3>Track Your Progress</h3>
            <p>
              Monitor your performance over time with detailed analytics and improvement metrics.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaRocket />
            </div>
            <h3>Comprehensive Coverage</h3>
            <p>
              Access questions across multiple domains: DSA, System Design, Behavioral, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Popular Interview Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <h3>Data Structures & Algorithms</h3>
            <div className="category-info">
              <span className="question-count">120+ Questions</span>
              <span className="difficulty difficulty-hard">Hard</span>
            </div>
            <p>Master arrays, linked lists, trees, graphs, sorting, and more.</p>
            <Link to="/practice" className="explore-btn">
              Start Practicing <FaArrowRight />
            </Link>
          </div>

          <div className="category-card">
            <h3>System Design</h3>
            <div className="category-info">
              <span className="question-count">45+ Questions</span>
              <span className="difficulty difficulty-hard">Hard</span>
            </div>
            <p>Learn to design scalable systems, databases, and distributed architectures.</p>
            <Link to="/practice" className="explore-btn">
              Start Practicing <FaArrowRight />
            </Link>
          </div>

          <div className="category-card">
            <h3>Behavioral Interview</h3>
            <div className="category-info">
              <span className="question-count">60+ Questions</span>
              <span className="difficulty difficulty-medium">Medium</span>
            </div>
            <p>Prepare for behavioral rounds with STAR method guidance and examples.</p>
            <Link to="/practice" className="explore-btn">
              Start Practicing <FaArrowRight />
            </Link>
          </div>

          <div className="category-card">
            <h3>Web Development</h3>
            <div className="category-info">
              <span className="question-count">80+ Questions</span>
              <span className="difficulty difficulty-mixed">Mixed</span>
            </div>
            <p>Frontend, backend, and full-stack development questions for web engineers.</p>
            <Link to="/practice" className="explore-btn">
              Start Practicing <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="features">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span style={{ fontSize: '2.5rem' }}>1</span>
            </div>
            <h3>Select a Category</h3>
            <p>
              Choose from multiple interview categories and difficulty levels that match your target role.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span style={{ fontSize: '2.5rem' }}>2</span>
            </div>
            <h3>Answer Questions</h3>
            <p>
              Write your code or provide answers to interview questions in our interactive editor.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span style={{ fontSize: '2.5rem' }}>3</span>
            </div>
            <h3>Get Feedback</h3>
            <p>
              Receive detailed AI-powered feedback on correctness, efficiency, and best practices.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span style={{ fontSize: '2.5rem' }}>4</span>
            </div>
            <h3>Improve & Track</h3>
            <p>
              Learn from mistakes and track your progress as you improve over time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="categories">
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          borderRadius: '12px', 
          padding: '40px 20px', 
          textAlign: 'center',
          color: 'white',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{ color: 'white', marginBottom: '15px' }}>Ready to Ace Your Next Interview?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: 0.95 }}>
            Join thousands of engineers who've successfully prepared for their dream roles. Start practicing today!
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/practice" className="btn btn-primary btn-large">
              <FaRocket /> Start Practicing Now
            </Link>
            <Link to="/about" className="btn btn-secondary btn-large">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
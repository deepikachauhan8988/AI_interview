import React from 'react'
import { FiUsers, FiAward, FiTarget } from 'react-icons/fi'
import '../assets/css/about.css'

function About() {
  const team = [
    { name: 'John Doe', role: 'Founder & CEO', icon: '👨‍💼' },
    { name: 'Jane Smith', role: 'Lead Developer', icon: '👩‍💻' },
    { name: 'Mike Johnson', role: 'AI Specialist', icon: '🤖' },
  ]

  return (
    <div className="about">
      {/* Header */}
      <div className="about-header">
        <h1>About AI Interview Prep</h1>
        <p>Empowering candidates to ace their technical interviews</p>
      </div>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At AI Interview Prep, we believe that everyone deserves an equal opportunity to succeed in their career. 
            Our mission is to democratize interview preparation by providing cutting-edge AI-powered tools and resources 
            that help candidates practice, learn, and ultimately excel in their technical interviews.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-about">
        <h2>Why Choose Us?</h2>
        <div className="features-grid-about">
          <div className="feature-about">
            <div className="feature-icon-about">
              <FiTarget size={32} />
            </div>
            <h3>Targeted Practice</h3>
            <p>Practice questions specifically designed to prepare you for real interviews</p>
          </div>
          <div className="feature-about">
            <div className="feature-icon-about">
              <FiAward size={32} />
            </div>
            <h3>Expert Content</h3>
            <p>Curated by industry experts and experienced interviewers</p>
          </div>
          <div className="feature-about">
            <div className="feature-icon-about">
              <FiUsers size={32} />
            </div>
            <h3>Community Support</h3>
            <p>Join thousands of candidates on their journey to success</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-avatar">{member.icon}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="stat">
          <h3>500+</h3>
          <p>Questions</p>
        </div>
        <div className="stat">
          <h3>10K+</h3>
          <p>Active Users</p>
        </div>
        <div className="stat">
          <h3>95%</h3>
          <p>Success Rate</p>
        </div>
        <div className="stat">
          <h3>24/7</h3>
          <p>Support</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Ready to Get Started?</h2>
        <p>Join our community and start preparing for your next interview</p>
        <a href="/practice" className="cta-button">Start Practicing Now</a>
      </section>
    </div>
  )
}

export default About

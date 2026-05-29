import React from 'react'
import '../../assets/css/footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3>AI Interview Prep</h3>
          <p>Master your technical interviews with our AI-powered platform. Practice, learn, and succeed together.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/practice">Practice</a></li>
            <li><a href="/questions">Questions</a></li>
            <li><a href="/results">Results</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h4>Topics</h4>
          <ul>
            <li><a href="/">Data Structures</a></li>
            <li><a href="/">Algorithms</a></li>
            <li><a href="/">System Design</a></li>
            <li><a href="/">Behavioral</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <a href="mailto:info@aiinterviewprep.com">
              📧 info@aiinterviewprep.com
            </a>
            <a href="tel:+1234567890">
              📱 +1 (234) 567-890
            </a>
            <a href="#location">
              📍 Online Platform
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; 2024 AI Interview Prep. All rights reserved.</p>
        <div className="footer-links">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
          <a href="/">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
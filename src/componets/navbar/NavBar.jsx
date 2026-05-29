import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import '../../assets/css/navbar.css'

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎯</span>
          <span className="logo-text">AI Interview Prep</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/practice" className="nav-links" onClick={() => setIsOpen(false)}>
              Practice
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/questions" className="nav-links" onClick={() => setIsOpen(false)}>
              Questions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/results" className="nav-links" onClick={() => setIsOpen(false)}>
              Results
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
        </ul>
        <div className="auth-buttons">
          <Link to="/login" className="auth-link">Sign In</Link>
          <Link to="/register" className="auth-link auth-link-primary">Sign Up</Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
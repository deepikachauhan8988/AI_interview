import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import NavBar from "./componets/navbar/NavBar"
import Footer from "./componets/footer/Footer"
import Home from "./componets/Home"
import InterviewPractice from "./componets/InterviewPractice"
import Questions from "./componets/Questions"
import Results from "./componets/Results"
import About from "./componets/About"
import Login from "./componets/Login"
import Register from "./componets/Register"
import Dashboard from "./componets/Dashboard"

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppContent() {
  const { isAuthenticated } = useAuth()
  
  return (
    <>
      {!isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<InterviewPractice />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
      {!isAuthenticated && <Footer />}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
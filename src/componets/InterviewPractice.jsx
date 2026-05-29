import React, { useState, useEffect } from 'react'
import { FiClock, FiCheckCircle, FiAlertCircle, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import '../assets/css/practice.css'

function InterviewPractice() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answer, setAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300)
  const [isActive, setIsActive] = useState(false)

  const categories = [
    { id: 1, name: 'Data Structures', questions: 50 },
    { id: 2, name: 'Algorithms', questions: 60 },
    { id: 3, name: 'System Design', questions: 30 },
    { id: 4, name: 'Behavioral', questions: 25 },
  ]

  const sampleQuestions = {
    1: [
      {
        question: 'What is a binary search tree?',
        options: ['A tree where left child < parent < right child', 'A tree with only two children', 'A tree that is always balanced', 'None of the above'],
        correct: 0
      },
      {
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correct: 1
      }
    ],
    2: [
      {
        question: 'What is a greedy algorithm?',
        options: ['Algorithm that uses recursion', 'Algorithm that makes locally optimal choices', 'Algorithm that uses dynamic programming', 'Algorithm with O(1) complexity'],
        correct: 1
      }
    ],
    3: [
      {
        question: 'What are the key components of system design?',
        options: ['Database and Server', 'Scalability, Reliability, Maintainability', 'Frontend and Backend', 'None'],
        correct: 1
      }
    ],
    4: [
      {
        question: 'Tell me about your greatest achievement.',
        options: ['Not applicable', 'Open-ended question', 'Choose the best answer', 'All are wrong'],
        correct: 1
      }
    ]
  }

  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  const startPractice = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentQuestion(0)
    setScore(0)
    setAnswer('')
    setTimeLeft(300)
    setShowFeedback(false)
    setIsActive(true)
    const questions = sampleQuestions[categoryId] || []
    setTotalQuestions(questions.length)
  }

  const handleAnswer = (selectedIndex) => {
    const questions = sampleQuestions[selectedCategory]
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    const questions = sampleQuestions[selectedCategory]
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswer('')
      setShowFeedback(false)
    } else {
      finishPractice()
    }
  }

  const finishPractice = () => {
    setIsActive(false)
    setSelectedCategory(null)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!selectedCategory) {
    return (
      <div className="practice">
        <div className="practice-header">
          <h1>Interview Practice</h1>
          <p>Select a category and test your knowledge</p>
        </div>

        <div className="categories-container">
          <div className="categories-list">
            {categories.map((category) => (
              <div key={category.id} className="category-practice-card">
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.questions} Questions</p>
                </div>
                <button 
                  className="start-btn"
                  onClick={() => startPractice(category.id)}
                >
                  Start Practice
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const questions = sampleQuestions[selectedCategory]
  if (!questions || questions.length === 0) {
    return <div className="practice">No questions available</div>
  }

  const currentQ = questions[currentQuestion]
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="practice">
      <div className="practice-quiz">
        {/* Header */}
        <div className="quiz-header">
          <button className="back-btn" onClick={() => setSelectedCategory(null)}>
            <FiArrowLeft /> Back
          </button>
          <div className="quiz-progress">
            <span className="progress-text">Question {currentQuestion + 1} of {questions.length}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
          <div className="quiz-timer">
            <FiClock />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Question */}
        <div className="quiz-content">
          <div className="question-container">
            <h2>{currentQ.question}</h2>
          </div>

          {/* Options */}
          <div className="options-container">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  showFeedback
                    ? index === currentQ.correct
                      ? 'correct'
                      : index === answer
                      ? 'incorrect'
                      : ''
                    : ''
                }`}
                onClick={() => {
                  if (!showFeedback) {
                    setAnswer(index)
                    handleAnswer(index)
                  }
                }}
                disabled={showFeedback}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
                {showFeedback && index === currentQ.correct && (
                  <FiCheckCircle className="option-icon" />
                )}
                {showFeedback && index === answer && index !== currentQ.correct && (
                  <FiAlertCircle className="option-icon" />
                )}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`feedback ${answer === currentQ.correct ? 'success' : 'error'}`}>
              <h4>{answer === currentQ.correct ? '✓ Correct!' : '✗ Incorrect'}</h4>
              <p>
                {answer === currentQ.correct
                  ? 'Great job! You got it right.'
                  : 'The correct answer is: ' + currentQ.options[currentQ.correct]}
              </p>
            </div>
          )}

          {/* Next Button */}
          {showFeedback && (
            <button 
              className="next-btn"
              onClick={nextQuestion}
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next Question'}
            </button>
          )}
        </div>

        {/* Score */}
        <div className="quiz-footer">
          <span className="current-score">Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}</span>
        </div>
      </div>
    </div>
  )
}

export default InterviewPractice

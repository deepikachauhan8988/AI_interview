import React, { useState } from 'react'
import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi'
import '../assets/css/questions.css'

function Questions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const categories = ['All', 'Data Structures', 'Algorithms', 'System Design', 'Behavioral', 'Database']
  const difficulties = ['All', 'Easy', 'Medium', 'Hard']

  const allQuestions = [
    {
      id: 1,
      title: 'What is a Binary Search Tree?',
      category: 'Data Structures',
      difficulty: 'Easy',
      answer: 'A BST is a binary tree where nodes are ordered: left child < parent < right child. This ordering allows efficient searching, insertion, and deletion.'
    },
    {
      id: 2,
      title: 'Explain Quick Sort Algorithm',
      category: 'Algorithms',
      difficulty: 'Medium',
      answer: 'Quick sort is a divide-and-conquer algorithm that selects a pivot element and partitions the array around it. Average time complexity is O(n log n).'
    },
    {
      id: 3,
      title: 'Design a URL Shortening Service',
      category: 'System Design',
      difficulty: 'Hard',
      answer: 'Consider a distributed system with load balancers, cache layers (Redis), primary database, and replica databases. Use a hash function to generate short URLs.'
    },
    {
      id: 4,
      title: 'Tell me about a challenging project',
      category: 'Behavioral',
      difficulty: 'Medium',
      answer: 'Structure your answer using the STAR method: Situation, Task, Action, Result. Highlight your problem-solving skills and team collaboration.'
    },
    {
      id: 5,
      title: 'What is Database Indexing?',
      category: 'Database',
      difficulty: 'Medium',
      answer: 'Indexing creates data structures (like B-trees) to enable faster data retrieval. Trade-off: faster reads but slower writes and more storage.'
    },
    {
      id: 6,
      title: 'Implement Two Sum Problem',
      category: 'Algorithms',
      difficulty: 'Easy',
      answer: 'Use a hash map to store elements and their indices. For each element, check if its complement exists in the map. Time complexity: O(n).'
    },
    {
      id: 7,
      title: 'Explain ACID Properties',
      category: 'Database',
      difficulty: 'Hard',
      answer: 'Atomicity, Consistency, Isolation, Durability. These properties ensure reliable database transactions even during failures.'
    },
    {
      id: 8,
      title: 'How do you handle conflicts in a team?',
      category: 'Behavioral',
      difficulty: 'Medium',
      answer: 'Listen actively, understand different perspectives, focus on shared goals, and find collaborative solutions. Always maintain professionalism.'
    },
  ]

  const filteredQuestions = allQuestions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || q.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy':
        return 'easy'
      case 'medium':
        return 'medium'
      case 'hard':
        return 'hard'
      default:
        return ''
    }
  }

  return (
    <div className="questions">
      <div className="questions-header">
        <h1>Interview Questions</h1>
        <p>Browse and search through our comprehensive question database</p>
      </div>

      <div className="questions-container">
        {/* Filters */}
        <div className="filters-section">
          {/* Search */}
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Filter Controls */}
          <div className="filter-controls">
            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-label">
                <FiFilter /> Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="filter-group">
              <label className="filter-label">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="filter-select"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff.toLowerCase()}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="results-info">
            <p>Found <strong>{filteredQuestions.length}</strong> question{filteredQuestions.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Questions List */}
        <div className="questions-list">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <div key={question.id} className="question-item">
                <div
                  className="question-header"
                  onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                >
                  <div className="question-info">
                    <h3>{question.title}</h3>
                    <div className="question-meta">
                      <span className="category-badge">{question.category}</span>
                      <span className={`difficulty-badge ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </div>
                  </div>
                  <FiChevronDown
                    className={`expand-icon ${expandedQuestion === question.id ? 'expanded' : ''}`}
                  />
                </div>

                {expandedQuestion === question.id && (
                  <div className="question-body">
                    <div className="answer-section">
                      <h4>Answer</h4>
                      <p>{question.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No questions found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Questions

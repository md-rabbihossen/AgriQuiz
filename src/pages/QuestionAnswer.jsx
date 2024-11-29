import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

function QuestionAnswer() {
  const { courseName, chapterName } = useParams()
  const navigate = useNavigate()
  const [showAnswer, setShowAnswer] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState([])

  // Sample Q&A data - later this can be moved to a separate data file or fetched from Supabase
  const questions = {
    'pollination': [
      {
        question: "What is pollination?",
        answer: "Pollination is the process by which pollen from the male part of a flower (anther) is transferred to the female part of a flower (stigma). This process is essential for the reproduction of flowering plants."
      },
      {
        question: "What are the two main types of pollination?",
        answer: "The two main types are self-pollination and cross-pollination. In self-pollination, pollen from a flower's anther lands on the same flower's stigma. In cross-pollination, pollen is transferred from one flower to another."
      },
      {
        question: "What happens after pollen reaches the stigma?",
        answer: "After pollen reaches the stigma, it travels down to the ovary, where it fertilizes the ovule and helps form seeds."
      },
      {
        question: "What are the different agents of pollination?",
        answer: "Pollination can occur through various agents: wind pollination (in grasses and wheat), water pollination (in aquatic plants), and animal pollination (through insects like bees, butterflies, birds, and bats)."
      },
      {
        question: "Why is pollination important for ecosystems?",
        answer: "Pollination is crucial for food production because many fruits, vegetables, and crops rely on it. It's essential for maintaining biodiversity and ensuring ecosystem health. Without pollination, plants cannot produce seeds or fruit, which would disrupt the balance of nature and food chains."
      }
    ]
  }

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Initialize shuffled questions when component mounts or chapter changes
  useEffect(() => {
    const currentQuestions = questions[chapterName.toLowerCase()] || []
    setShuffledQuestions(shuffleArray(currentQuestions))
    setCurrentQuestionIndex(0)
    setShowAnswer(false)
  }, [chapterName])

  const currentQuestion = shuffledQuestions[currentQuestionIndex]

  const handleNextQuestion = () => {
    setShowAnswer(false)
    setCurrentQuestionIndex((prev) => 
      prev < shuffledQuestions.length - 1 ? prev + 1 : prev
    )
  }

  const handlePrevQuestion = () => {
    setShowAnswer(false)
    setCurrentQuestionIndex((prev) => 
      prev > 0 ? prev - 1 : prev
    )
  }

  return (
    <div className="question-page">
      <Navbar />
      <div className="question-container">
        <h2>{decodeURIComponent(chapterName)}</h2>
        <h3>Question & Answer</h3>
        
        {currentQuestion ? (
          <div className="flashcard">
            <div className="card" onClick={() => setShowAnswer(!showAnswer)}>
              <div className="card-content">
                {showAnswer ? (
                  <p className="answer">{currentQuestion.answer}</p>
                ) : (
                  <p className="question">{currentQuestion.question}</p>
                )}
              </div>
              <p className="card-hint">Click to {showAnswer ? 'see question' : 'reveal answer'}</p>
            </div>
            
            <div className="navigation-buttons">
              <button 
                className="nav-button"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <span className="question-counter">
                {currentQuestionIndex + 1} / {shuffledQuestions.length}
              </span>
              {currentQuestionIndex === shuffledQuestions.length - 1 ? (
                <button 
                  className="nav-button finish-button"
                  onClick={() => navigate(`/course/${courseName}/chapter/${chapterName}`)}
                >
                  Finish
                </button>
              ) : (
                <button 
                  className="nav-button"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="no-questions">No questions available for this chapter yet.</p>
        )}
      </div>
    </div>
  )
}

export default QuestionAnswer 
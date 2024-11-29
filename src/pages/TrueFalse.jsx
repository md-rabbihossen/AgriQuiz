import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

function TrueFalse() {
  const { courseName, chapterName } = useParams()
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  // Sample True/False questions
  const questions = {
    'pollination': [
      {
        question: "Pollination is the transfer of pollen from the anther to the stigma.",
        answer: true,
        explanation: "This is the correct definition of pollination, which involves transferring pollen from the male part (anther) to the female part (stigma)."
      },
      {
        question: "Water pollination is the most common type of pollination.",
        answer: false,
        explanation: "Animal pollination is the most common type of pollination, not water pollination."
      },
      {
        question: "Self-pollination occurs between different flowers of the same species.",
        answer: false,
        explanation: "Self-pollination occurs within the same flower, while cross-pollination occurs between different flowers."
      },
      {
        question: "Bees and butterflies are examples of animal pollinators.",
        answer: true,
        explanation: "Yes, bees and butterflies are common examples of animal pollinators that help transfer pollen between flowers."
      },
      {
        question: "Pollination is only important for food production.",
        answer: false,
        explanation: "Pollination is important for food production, maintaining biodiversity, and ensuring healthy ecosystems. It's crucial for the entire natural world, not just food production."
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

  // Initialize shuffled questions
  useEffect(() => {
    const currentQuestions = questions[chapterName.toLowerCase()] || []
    setShuffledQuestions(shuffleArray(currentQuestions))
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
  }, [chapterName])

  const currentQuestion = shuffledQuestions[currentQuestionIndex]

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return // Prevent changing answer
    
    setSelectedAnswer(answer)
    if (answer === currentQuestion.answer) {
      setScore(prev => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
    }
  }

  return (
    <div className="question-page">
      <Navbar />
      <div className="question-container">
        <h2>{decodeURIComponent(chapterName)}</h2>
        <h3>True or False</h3>

        {showResult ? (
          <div className="result-container">
            <h2>Quiz Complete!</h2>
            <p className="score">Your Score: {score} out of {shuffledQuestions.length}</p>
            <button 
              className="nav-button"
              onClick={() => navigate(`/course/${courseName}/chapter/${chapterName}`)}
            >
              Finish
            </button>
          </div>
        ) : currentQuestion ? (
          <div className="true-false-container">
            <div className="question-box">
              <p className="question">{currentQuestion.question}</p>
            </div>

            <div className="true-false-buttons">
              <button
                className={`tf-button ${selectedAnswer === true ? (currentQuestion.answer === true ? 'correct' : 'incorrect') : ''}`}
                onClick={() => handleAnswer(true)}
                disabled={selectedAnswer !== null}
              >
                True
              </button>
              <button
                className={`tf-button ${selectedAnswer === false ? (currentQuestion.answer === false ? 'correct' : 'incorrect') : ''}`}
                onClick={() => handleAnswer(false)}
                disabled={selectedAnswer !== null}
              >
                False
              </button>
            </div>

            {selectedAnswer !== null && (
              <div className="answer-feedback">
                <p className={selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect'}>
                  {selectedAnswer === currentQuestion.answer ? 'Correct!' : 'Incorrect!'}
                </p>
                <p className="explanation">{currentQuestion.explanation}</p>
                <button 
                  className="nav-button"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Show Results' : 'Next Question'}
                </button>
              </div>
            )}

            <div className="question-counter">
              Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
            </div>
          </div>
        ) : (
          <p className="no-questions">No questions available for this chapter yet.</p>
        )}
      </div>
    </div>
  )
}

export default TrueFalse 
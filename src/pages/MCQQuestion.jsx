import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

function MCQQuestion() {
  const { courseName, chapterName } = useParams()
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [wrongAnswers, setWrongAnswers] = useState([])

  // Sample MCQ data
  const questions = {
    'pollination': [
      {
        question: "Which part of the flower receives pollen during pollination?",
        options: ["Stigma", "Anther", "Stem", "Leaf"],
        correctAnswer: "Stigma"
      },
      {
        question: "What type of pollination occurs when pollen transfers between different flowers?",
        options: ["Cross-pollination", "Self-pollination", "Wind pollination", "Water pollination"],
        correctAnswer: "Cross-pollination"
      },
      {
        question: "Which of the following is NOT an animal pollinator?",
        options: ["Wind", "Bees", "Butterflies", "Bats"],
        correctAnswer: "Wind"
      },
      {
        question: "In which type of pollination does pollen from a flower's anther land on the same flower's stigma?",
        options: ["Self-pollination", "Cross-pollination", "Water pollination", "Animal pollination"],
        correctAnswer: "Self-pollination"
      },
      {
        question: "Which plants typically rely on wind pollination?",
        options: ["Grasses and wheat", "Roses and lilies", "Apple trees and pears", "Water lilies and lotus"],
        correctAnswer: "Grasses and wheat"
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

  // Initialize shuffled questions and randomize options
  useEffect(() => {
    const currentQuestions = questions[chapterName.toLowerCase()] || []
    const questionsWithShuffledOptions = currentQuestions.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }))
    setShuffledQuestions(shuffleArray(questionsWithShuffledOptions))
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
  }, [chapterName])

  const currentQuestion = shuffledQuestions[currentQuestionIndex]

  const handleOptionClick = (option) => {
    if (selectedAnswer) return
    
    setSelectedAnswer(option)
    if (option === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1)
    } else {
      // Store wrong answers
      setWrongAnswers(prev => [...prev, {
        question: currentQuestion.question,
        yourAnswer: option,
        correctAnswer: currentQuestion.correctAnswer
      }])
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

  const getOptionClassName = (option) => {
    if (!selectedAnswer) return "mcq-option"
    if (option === currentQuestion.correctAnswer) {
      return "mcq-option correct"
    }
    if (option === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
      return "mcq-option incorrect"
    }
    return "mcq-option"
  }

  return (
    <div className="question-page">
      <Navbar />
      <div className="question-container">
        <h2>{decodeURIComponent(chapterName)}</h2>
        <h3>Multiple Choice Questions</h3>

        {showResult ? (
          <div className="result-container">
            <h2>Quiz Complete!</h2>
            <p className="score">Your Score: {score} out of {shuffledQuestions.length}</p>
            
            {wrongAnswers.length > 0 && (
              <div className="wrong-answers-review">
                <h3>Review Wrong Answers:</h3>
                {wrongAnswers.map((item, index) => (
                  <div key={index} className="wrong-answer-item">
                    <p className="review-question">{item.question}</p>
                    <p className="your-answer">Your Answer: <span className="incorrect">{item.yourAnswer}</span></p>
                    <p className="correct-answer">Correct Answer: <span className="correct">{item.correctAnswer}</span></p>
                  </div>
                ))}
              </div>
            )}

            <button 
              className="nav-button"
              onClick={() => navigate(`/course/${courseName}/chapter/${chapterName}`)}
            >
              Finish
            </button>
          </div>
        ) : currentQuestion ? (
          <div className="mcq-container">
            <div className="question-box">
              <p className="question">{currentQuestion.question}</p>
            </div>
            
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={getOptionClassName(option)}
                  onClick={() => handleOptionClick(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="navigation-buttons">
              {selectedAnswer && (
                <button 
                  className="nav-button"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Show Results' : 'Next Question'}
                </button>
              )}
            </div>

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

export default MCQQuestion 
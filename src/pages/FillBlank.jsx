import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

function FillBlank() {
  const { courseName, chapterName } = useParams()
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [userAnswer, setUserAnswer] = useState('')
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  // Sample Fill in the Blank questions
  const questions = {
    'pollination': [
      {
        question: "The male part of a flower is called the _______.",
        answer: "anther",
        acceptableAnswers: ["anther", "Anther", "ANTHER"]
      },
      {
        question: "Pollen travels down to the _______ where it fertilizes the ovule.",
        answer: "ovary",
        acceptableAnswers: ["ovary", "Ovary", "OVARY"]
      },
      {
        question: "In _______ pollination, pollen from a flower's anther lands on the same flower's stigma.",
        answer: "self",
        acceptableAnswers: ["self", "Self", "SELF"]
      },
      {
        question: "The most common type of pollination is _______ pollination.",
        answer: "animal",
        acceptableAnswers: ["animal", "Animal", "ANIMAL"]
      },
      {
        question: "Without pollination, plants cannot produce _______ or fruit.",
        answer: "seeds",
        acceptableAnswers: ["seeds", "Seeds", "SEEDS", "seed", "Seed", "SEED"]
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
    setUserAnswer('')
    setIsAnswered(false)
    setScore(0)
    setShowResult(false)
  }, [chapterName])

  const currentQuestion = shuffledQuestions[currentQuestionIndex]

  const checkAnswer = () => {
    if (!userAnswer.trim()) return // Don't accept empty answers
    
    const isCorrect = currentQuestion.acceptableAnswers.includes(userAnswer.trim())
    if (isCorrect) {
      setScore(prev => prev + 1)
    }
    setIsAnswered(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setUserAnswer('')
      setIsAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer.trim() && !isAnswered) {
      checkAnswer()
    }
  }

  return (
    <div className="question-page">
      <Navbar />
      <div className="question-container">
        <h2>{decodeURIComponent(chapterName)}</h2>
        <h3>Fill in the Blank</h3>

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
          <div className="fill-blank-container">
            <div className="question-box">
              <p className="question">{currentQuestion.question}</p>
            </div>

            <div className="answer-container">
              <input
                type="text"
                className="answer-input"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer here"
                disabled={isAnswered}
              />
              {!isAnswered ? (
                <button 
                  className="nav-button submit-button"
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                >
                  Submit
                </button>
              ) : (
                <div className="answer-feedback">
                  <p className={currentQuestion.acceptableAnswers.includes(userAnswer.trim()) ? 'correct' : 'incorrect'}>
                    {currentQuestion.acceptableAnswers.includes(userAnswer.trim()) 
                      ? 'Correct!' 
                      : `Incorrect. The correct answer is: ${currentQuestion.answer}`}
                  </p>
                  <button 
                    className="nav-button"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Show Results' : 'Next Question'}
                  </button>
                </div>
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

export default FillBlank 
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
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

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
    ],
    'land evaluation': [
      {
        question: "What percentage of total land is classified as Medium high land?",
        options: ["29%", "35%", "12%", "8%"],
        correctAnswer: "35%"
      },
      {
        question: "Which land type has a flooding depth of 90-180 cm in rainy season?",
        options: ["High land", "Medium high land", "Medium low land", "Low land"],
        correctAnswer: "Medium low land"
      },
      {
        question: "What is the slope percentage range for 'Gently sloping' land?",
        options: ["0-3%", "3-8%", "8-16%", "16-30%"],
        correctAnswer: "3-8%"
      },
      {
        question: "Which slope category has 'very very high' erosion risk?",
        options: ["Moderately steep", "Steep", "Very steep", "Gently sloping"],
        correctAnswer: "Very steep"
      },
      {
        question: "What is the equivalent slope percentage when land slopeness is 45°?",
        options: ["45%", "90%", "100%", "180%"],
        correctAnswer: "100%"
      },
      {
        question: "What is the range of organic matter content for medium soil classification?",
        options: ["< 1.72%", "1.72 - 3.44%", "> 3.44%", "2.5 - 4%"],
        correctAnswer: "1.72 - 3.44%"
      },
      {
        question: "Which pH range is considered neutral for soil?",
        options: ["4.5-5.5", "5.5-6.5", "6.6-7.3", "7.4-8.4"],
        correctAnswer: "6.6-7.3"
      },
      {
        question: "What is the EDSP range for moderately deep soil?",
        options: ["< 25 cm", "25-50 cm", "51-90 cm", "> 90 cm"],
        correctAnswer: "51-90 cm"
      },
      {
        question: "How long is soil moisture available in 'High' classification during Rabi season?",
        options: ["Up to November", "Up to December", "Up to February", "Up to March"],
        correctAnswer: "Up to February"
      },
      {
        question: "Which soil pH range is classified as very highly alkaline?",
        options: ["> 9.0", "8.5-9.0", "7.4-8.4", "6.6-7.3"],
        correctAnswer: "> 9.0"
      },
      {
        question: "Which salinity class allows most field crops to be grown?",
        options: ["Non saline (<2 dSm-1)", "Slightly saline (2-4 dSm-1)", "Moderately saline (4-8 dSm-1)", "Strongly saline (8-15 dSm-1)"],
        correctAnswer: "Non saline (<2 dSm-1)"
      },
      {
        question: "What is the EC range for moderately saline soil?",
        options: ["<2 dSm-1", "2-4 dSm-1", "4-8 dSm-1", "8-15 dSm-1"],
        correctAnswer: "4-8 dSm-1"
      },
      {
        question: "Which months are considered the rainy season?",
        options: ["April-May", "June-September", "October-November", "December-March"],
        correctAnswer: "June-September"
      },
      {
        question: "What Productivity Index (PI) range is classified as 'Good'?",
        options: ["65-100", "35-64", "20-34", "8-19"],
        correctAnswer: "35-64"
      },
      {
        question: "Which crops are suitable for strongly saline soils (EC 8-15 dSm-1)?",
        options: ["Wheat and potato", "Rice and pulses", "Barley and cotton", "Most field crops"],
        correctAnswer: "Barley and cotton"
      },
      {
        question: "According to USDA's LCC, which class is suitable for cultivation with no limitations?",
        options: ["Class I", "Class II", "Class III", "Class IV"],
        correctAnswer: "Class I"
      },
      {
        question: "Which LCC classes are suitable for pasture and grazing but not cultivation?",
        options: ["Classes I-III", "Classes II-IV", "Classes V-VII", "Classes VI-VIII"],
        correctAnswer: "Classes V-VII"
      },
      {
        question: "How many levels of generalization does Bangladesh's LCC system have?",
        options: ["Two", "Three", "Four", "Five"],
        correctAnswer: "Three"
      },
      {
        question: "Which subclass in Bangladesh's LCC system indicates soils with erosion hazards?",
        options: ["d", "e", "r", "s"],
        correctAnswer: "e"
      },
      {
        question: "What does subclass 'W' represent in Bangladesh's LCC system?",
        options: ["Well-drained soils", "Waterlogged soils", "Soils subject to flooding", "Watershed areas"],
        correctAnswer: "Soils subject to flooding"
      },
      {
        question: "Which characteristic is NOT associated with Class-I agricultural land?",
        options: [
          "Easy to cultivate",
          "Level and very gently undulating",
          "Moderate limitations throughout the year",
          "Widest range of agricultural use"
        ],
        correctAnswer: "Moderate limitations throughout the year"
      },
      {
        question: "What is a key limitation of Class-III agricultural land?",
        options: [
          "Permanent flooding",
          "Very steep slopes",
          "Low water holding capacity",
          "No limitations"
        ],
        correctAnswer: "Low water holding capacity"
      },
      {
        question: "Which class of land may be productively used for forestry and wildlife reserve?",
        options: ["Class-I", "Class-II", "Class-IV", "Class-V"],
        correctAnswer: "Class-V"
      },
      {
        question: "What type of limitations does Class-II land have for most of the year?",
        options: [
          "Severe limitations",
          "No to slight limitations",
          "Moderate limitations",
          "Very severe limitations"
        ],
        correctAnswer: "No to slight limitations"
      },
      {
        question: "Which of these is a characteristic of Class-IV land?",
        options: [
          "Easy to cultivate",
          "High potential for improvement",
          "Severe salinity or toxicity hazards",
          "Slight limitations throughout the year"
        ],
        correctAnswer: "Severe salinity or toxicity hazards"
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

  // Add new function to handle early submission
  const handleEarlySubmit = () => {
    setIsSubmitModalOpen(true)
  }

  const confirmSubmit = () => {
    setShowResult(true)
    setIsSubmitModalOpen(false)
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
              {currentQuestionIndex > 0 && (
                <button 
                  className="nav-button submit-early"
                  onClick={handleEarlySubmit}
                >
                  Submit Quiz
                </button>
              )}
            </div>

            <div className="question-counter">
              Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
            </div>

            {isSubmitModalOpen && (
              <div className="modal-overlay">
                <div className="submit-modal">
                  <h3>Submit Quiz Early?</h3>
                  <p>You have answered {currentQuestionIndex + 1} out of {shuffledQuestions.length} questions.</p>
                  <p>Are you sure you want to submit now?</p>
                  <div className="modal-buttons">
                    <button onClick={() => setIsSubmitModalOpen(false)}>Continue Quiz</button>
                    <button onClick={confirmSubmit}>Submit Now</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="no-questions">No questions available for this chapter yet.</p>
        )}
      </div>
    </div>
  )
}

export default MCQQuestion 
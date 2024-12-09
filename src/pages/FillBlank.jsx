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
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [skippedQuestions, setSkippedQuestions] = useState([])
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

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
    ],
    'land evaluation': [
      {
        question: "Land is defined as the physical environment consisting of relief, soil, hydrology, _______ and vegetation.",
        answer: "climate",
        acceptableAnswers: ["climate", "Climate", "CLIMATE"]
      },
      {
        question: "_______ land has a usual depth of flooding up to 90 cm in rainy season.",
        answer: "Medium high",
        acceptableAnswers: ["Medium high", "medium high", "MEDIUM HIGH"]
      },
      {
        question: "45° of land slopeness is considered _______ % slope.",
        answer: "100",
        acceptableAnswers: ["100", "100%", "hundred"]
      },
      {
        question: "Very low land comprises _______ % of total land area.",
        answer: "1",
        acceptableAnswers: ["1", "1%", "one"]
      },
      {
        question: "For slope 16-30%, the erosion risk is _______ to very high.",
        answer: "high",
        acceptableAnswers: ["high", "High", "HIGH"]
      },
      {
        question: "Soil texture is the relative proportion of sand, _______ and clay.",
        answer: "silt",
        acceptableAnswers: ["silt", "Silt", "SILT"]
      },
      {
        question: "For deep soil classification, EDSP should be greater than _______ cm.",
        answer: "90",
        acceptableAnswers: ["90", "90cm", "ninety"]
      },
      {
        question: "Medium soil moisture availability in Rabi season lasts for _______ months.",
        answer: "1-2",
        acceptableAnswers: ["1-2", "1 to 2", "one to two"]
      },
      {
        question: "Soil with organic matter content less than _______ % is classified as low.",
        answer: "1.72",
        acceptableAnswers: ["1.72", "1.72%"]
      },
      {
        question: "The pH range _______ to 7.3 is considered neutral for soil.",
        answer: "6.6",
        acceptableAnswers: ["6.6", "6.6-7.3"]
      },
      {
        question: "Soil salinity is measured in _______ Conductivity (EC).",
        answer: "Electrical",
        acceptableAnswers: ["Electrical", "electrical", "ELECTRICAL"]
      },
      {
        question: "The dry season spans from December to _______.",
        answer: "March",
        acceptableAnswers: ["March", "march", "MARCH"]
      },
      {
        question: "In the Parametric system, PI rating of _______ to 100 is considered excellent.",
        answer: "65",
        acceptableAnswers: ["65", "65-100", "sixty-five"]
      },
      {
        question: "Soil with EC greater than _______ dSm-1 is classified as very strongly saline.",
        answer: "15",
        acceptableAnswers: ["15", "15 dSm-1", "fifteen"]
      },
      {
        question: "The post rainy season occurs in _______ and November.",
        answer: "October",
        acceptableAnswers: ["October", "october", "OCTOBER"]
      },
      {
        question: "Land Capability Classification was developed by _______ (abbreviation).",
        answer: "USDA",
        acceptableAnswers: ["USDA", "usda", "U.S.D.A"]
      },
      {
        question: "Class _______ land is suitable for wildlife and watershed but not for pasture and grazing.",
        answer: "VIII",
        acceptableAnswers: ["VIII", "8", "eight"]
      },
      {
        question: "In Bangladesh's LCC system, subclass 't' indicates soils having _______ or potentially toxic chemicals to plants.",
        answer: "toxic",
        acceptableAnswers: ["toxic", "Toxic", "TOXIC"]
      },
      {
        question: "Subclass 'D' refers to soils lying above normal _______ level.",
        answer: "flood",
        acceptableAnswers: ["flood", "Flood", "FLOOD"]
      },
      {
        question: "The symbol '_______' represents fresh alluvium or very young alluvial soils in Bangladesh's LCC subclasses.",
        answer: "x",
        acceptableAnswers: ["x", "X"]
      },
      {
        question: "Class-I land remains ready for cultivation for most or all of the _______ season.",
        answer: "dry",
        acceptableAnswers: ["dry", "Dry", "DRY"]
      },
      {
        question: "Class-III land has _______ limitations throughout the year.",
        answer: "moderate",
        acceptableAnswers: ["moderate", "Moderate", "MODERATE"]
      },
      {
        question: "Class-V land may be of productive use for forestry, watershed protection, _______ reserve or recreation.",
        answer: "wildlife",
        acceptableAnswers: ["wildlife", "Wildlife", "WILDLIFE", "wild life"]
      },
      {
        question: "Class-IV land has _______ potential for improvement.",
        answer: "little",
        acceptableAnswers: ["little", "Little", "LITTLE"]
      },
      {
        question: "Class-II land is _______ and gently undulating.",
        answer: "level",
        acceptableAnswers: ["level", "Level", "LEVEL"]
      }
    ],
    'introduction to agroforestry': [
      {
        question: "Agroforestry combines agriculture and _______ technologies to create integrated land-use systems.",
        answer: "forestry",
        acceptableAnswers: ["forestry", "Forestry", "FORESTRY"]
      },
      {
        question: "The term 'Agroforestry' was coined in the early _______.",
        answer: "seventies",
        acceptableAnswers: ["seventies", "Seventies", "SEVENTIES"]
      },
      {
        question: "The concept of Agroforestry originated from the realization that trees play an important role in protecting the long-range interests of _______.",
        answer: "land",
        acceptableAnswers: ["land", "Land", "LAND"]
      },
      {
        question: "The first definition of Agroforestry was proposed by _______ in 1977.",
        answer: "Bene et al.",
        acceptableAnswers: ["Bene et al.", "Bene et al", "BENE ET AL."]
      },
      {
        question: "Agroforestry systems aim to maintain or increase __________ (of preferred commodities) as well as productivity (of the land).",
        answer: "production",
        acceptableAnswers: ["production", "Production", "PRODUCTION"]
      },
      {
        question: "The three attributes of Agroforestry systems are productivity, sustainability, and __________.",
        answer: "adoptability",
        acceptableAnswers: ["adoptability", "Adoptability", "ADOPTABILITY"]
      },
      {
        question: "Agroforestry practices are __________ managed to maintain their productive and protective functions.",
        answer: "intensively",
        acceptableAnswers: ["intensively", "Intensively", "INTENSIVELY"]
      },
      {
        question: "To be called Agroforestry, a land-use practice must satisfy certain criteria, including being __________.",
        answer: "intentional",
        acceptableAnswers: ["intentional", "Intentional", "INTENTIONAL"]
      },
      {
        question: "One of the main objectives of Agroforestry is to maximize __________ of land.",
        answer: "utilization",
        acceptableAnswers: ["utilization", "Utilization", "UTILIZATION"]
      }
    ],
    'benefits and limitations of agroforestry': [
      {
        question: "Agroforestry can provide better protection of crops and lives from environmental hazards such as __________, drought, and cyclone.",
        answer: "flood",
        acceptableAnswers: ["flood", "Flood", "FLOOD"]
      },
      {
        question: "One of the economic benefits of Agroforestry is that it reduces the incidence of total crop __________ compared to mono-cropping systems.",
        answer: "failure",
        acceptableAnswers: ["failure", "Failure", "FAILURE"]
      },
      {
        question: "Agroforestry improves rural living standards and enhances __________ and health.",
        answer: "nutrition",
        acceptableAnswers: ["nutrition", "Nutrition", "NUTRITION"]
      },
      {
        question: "Agroforestry systems help in the __________ of soil by reducing surface run-off.",
        answer: "protection",
        acceptableAnswers: ["protection", "Protection", "PROTECTION"]
      },
      {
        question: "Agroforestry can increase soil nutrients through __________ of litter fall.",
        answer: "decomposition",
        acceptableAnswers: ["decomposition", "Decomposition", "DECOMPOSITION"]
      }
    ],
    'history of agroforestry': [
      {
        question: "The Taungya method, used in Myanmar, involves growing annual agricultural crops along with __________ species during the early years of forest plantation establishment.",
        answer: "forest",
        acceptableAnswers: ["forest", "Forest", "FOREST"]
      },
      {
        question: "The establishment of the forest department in Bangladesh began in __________.",
        answer: "1862",
        acceptableAnswers: ["1862"]
      },
      {
        question: "The first Agroforestry program in Bangladesh was initiated in __________.",
        answer: "1979",
        acceptableAnswers: ["1979"]
      },
      {
        question: "The __________ was established in 1994 to offer an MS course in Agroforestry.",
        answer: "Department of Agroforestry and Environment",
        acceptableAnswers: ["Department of Agroforestry and Environment"]
      }
    ],
    'scope of agroforestry': [
      {
        question: "Agroforestry is recognized as the best productive system from which rural poor people can meet their requirement of food, fuel, fodder, and other __________.",
        answer: "necessities",
        acceptableAnswers: ["necessities"]
      },
      {
        question: "The estimated number of homesteads in Bangladesh is __________ million, occupying about 0.3 million hectares of land.",
        answer: "16.7",
        acceptableAnswers: ["16.7"]
      },
      {
        question: "Agroforestry can help in maintaining __________ balance.",
        answer: "ecological",
        acceptableAnswers: ["ecological", "Ecological"]
      },
      {
        question: "The system has the potential to generate __________.",
        answer: "employment",
        acceptableAnswers: ["employment"]
      }
    ],
    'prospective areas of agroforestry in bangladesh': [
      {
        question: "The total number of ponds in Bangladesh is __________ million, covering an area of 0.92 million hectares.",
        answer: "1.77",
        acceptableAnswers: ["1.77"]
      },
      {
        question: "The length of total roads in Bangladesh is __________ km.",
        answer: "14,759",
        acceptableAnswers: ["14,759"]
      },
      {
        question: "The best trees to grow in Agroforestry systems are those with __________ roots to avoid competition with crops.",
        answer: "deep",
        acceptableAnswers: ["deep"]
      },
      {
        question: "Agroforestry systems support the production of a wide range of products, including __________, fuel, fodder, and timber.",
        answer: "food",
        acceptableAnswers: ["food"]
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
    if (!userAnswer.trim()) return
    
    const isCorrect = currentQuestion.acceptableAnswers.includes(userAnswer.trim())
    if (isCorrect) {
      setScore(prev => prev + 1)
    } else {
      // Store wrong answers
      setWrongAnswers(prev => [...prev, {
        question: currentQuestion.question || currentQuestion.statement,
        yourAnswer: userAnswer.trim(),
        correctAnswer: currentQuestion.answer
      }])
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

  const handleSkipQuestion = () => {
    // Store skipped question
    setSkippedQuestions(prev => [...prev, {
      question: currentQuestion.question || currentQuestion.statement,
      correctAnswer: currentQuestion.answer
    }])
    
    // Move to next question
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setUserAnswer('')
      setIsAnswered(false)
    } else {
      setShowResult(true)
    }
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
        <h3>Fill in the Blank</h3>

        {showResult ? (
          <div className="result-container">
            <h2>Quiz Complete!</h2>
            <p className="score">Your Score: {score} out of {shuffledQuestions.length}</p>
            
            {/* Wrong answers section */}
            {wrongAnswers.length > 0 && (
              <div className="wrong-answers-review">
                <h3>Review Wrong Answers:</h3>
                {wrongAnswers.map((item, index) => (
                  <div key={`wrong-${index}`} className="review-item">
                    <p className="review-question">{item.question}</p>
                    <p className="your-answer">Your Answer: <span className="incorrect">{item.yourAnswer}</span></p>
                    <p className="correct-answer">Correct Answer: <span className="correct">{item.correctAnswer}</span></p>
                  </div>
                ))}
              </div>
            )}

            {/* Add skipped questions section */}
            {skippedQuestions.length > 0 && (
              <div className="skipped-answers-review">
                <h3>Skipped Questions:</h3>
                {skippedQuestions.map((item, index) => (
                  <div key={`skipped-${index}`} className="review-item">
                    <p className="review-question">{item.question}</p>
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
          <div className="fill-blank-container">
            <div className="question-box">
              <p className="question">{currentQuestion.question || currentQuestion.statement}</p>
            </div>

            <div className="answer-section">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer here"
                disabled={isAnswered}
              />
              {!isAnswered ? (
                <div className="button-group">
                  <button 
                    className="nav-button submit-button"
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim()}
                  >
                    Submit
                  </button>
                  <button 
                    className="nav-button skip-button"
                    onClick={handleSkipQuestion}
                  >
                    Skip
                  </button>
                  {/* Add Submit Quiz button */}
                  {currentQuestionIndex > 0 && (
                    <button 
                      className="nav-button submit-early"
                      onClick={handleEarlySubmit}
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
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

            {/* Add Submit Modal */}
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

export default FillBlank
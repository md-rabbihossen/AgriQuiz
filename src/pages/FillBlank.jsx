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
        question: "Agroforestry integrates trees, crops, and _______ in a single land management unit.",
        answer: "animals",
        acceptableAnswers: ["animals", "Animals", "ANIMALS"]
      },
      {
        question: "Kenneth King coined the term _______ in 1968.",
        answer: "Agrisilviculture",
        acceptableAnswers: ["Agrisilviculture", "agrisilviculture", "AGRISILVICULTURE"]
      },
      {
        question: "Agroforestry systems aim to achieve _______ productivity on a sustainable basis.",
        answer: "enhanced",
        acceptableAnswers: ["enhanced", "Enhanced", "ENHANCED"]
      },
      {
        question: "Bene et al. proposed the first _______ of agroforestry in 1977.",
        answer: "definition",
        acceptableAnswers: ["definition", "Definition", "DEFINITION"]
      },
      {
        question: "The practice of agroforestry combines agriculture and _______ technologies.",
        answer: "forestry",
        acceptableAnswers: ["forestry", "Forestry", "FORESTRY"]
      },
      {
        question: "Natural vegetation is replaced by _______ systems in agroforestry.",
        answer: "integrated",
        acceptableAnswers: ["integrated", "Integrated", "INTEGRATED"]
      },
      {
        question: "Nair defined agroforestry as a land-use system that is _______ acceptable to farmers.",
        answer: "socially",
        acceptableAnswers: ["socially", "Socially", "SOCIALLY"]
      },
      {
        question: "ICRAF refined the definitions of agroforestry through _______ discussions.",
        answer: "in-house",
        acceptableAnswers: ["in-house", "In-house", "IN-HOUSE"]
      },
      {
        question: "In agroforestry, woody perennials like trees and _______ are deliberately grown with crops.",
        answer: "shrubs",
        acceptableAnswers: ["shrubs", "Shrubs", "SHRUBS"]
      },
      {
        question: "The primary focus of agroforestry is on sustainable land-use _______.",
        answer: "systems",
        acceptableAnswers: ["systems", "Systems", "SYSTEMS"]
      },
        {
          question: "Agroforestry must include at least one _______ perennial component.",
          answer: "woody",
          acceptableAnswers: ["woody", "Woody", "WOODY"]
        },
        {
          question: "The cycle of agroforestry systems is generally more than _______ year.",
          answer: "one",
          acceptableAnswers: ["one", "One", "ONE"]
        },
        {
          question: "The _______ of agroforestry ensures that trees, crops, and animals interact in a beneficial manner.",
          answer: "intensiveness",
          acceptableAnswers: ["intensiveness", "Intensiveness", "INTENSIVENESS"]
        },
        {
          question: "Reduction of _______ run-off is a major benefit of agroforestry.",
          answer: "surface",
          acceptableAnswers: ["surface", "Surface", "SURFACE"]
        },
        {
          question: "Agroforestry improves _______ recycling in soils.",
          answer: "nutrient",
          acceptableAnswers: ["nutrient", "Nutrient", "NUTRIENT"]
        },
        {
          question: "Better soil management is a way agroforestry improves land _______.",
          answer: "productivity",
          acceptableAnswers: ["productivity", "Productivity", "PRODUCTIVITY"]
        },
        {
          question: "Agroforestry helps protect lands by reducing soil _______.",
          answer: "erosion",
          acceptableAnswers: ["erosion", "Erosion", "EROSION"]
        },
        {
          question: "Agroforestry integrates _______ diversity into farming systems.",
          answer: "biological",
          acceptableAnswers: ["biological", "Biological", "BIOLOGICAL"]
        },
        {
          question: "One of the social benefits of agroforestry is improved _______ standards in rural areas.",
          answer: "living",
          acceptableAnswers: ["living", "Living", "LIVING"]
        },
        {
          question: "The _______ of agroforestry technologies depends on their acceptance by local farmers.",
          answer: "adoptability",
          acceptableAnswers: ["adoptability", "Adoptability", "ADOPTABILITY"]
        },    
        {
          question: "Agroforestry is widely recognized as the best _______ system for rural areas.",
          answer: "productive",
          acceptableAnswers: ["productive"]
        },
        {
          question: "Bangladesh's net cropper area is approximately _______ million hectares.",
          answer: "8.0",
          acceptableAnswers: ["8.0", "8"]
        },
          {
            question: "The length of embankments suitable for agroforestry in Bangladesh is approximately _______ km.",
            answer: "80,000",
            acceptableAnswers: ["80,000", "80000"]
          },
          {
            question: "The preferred trees for agroforestry should have _______ roots to avoid competition with crops.",
            answer: "deep",
            acceptableAnswers: ["deep"]
          },
          {
            question: "The coastal length of Bangladesh is _______ km.",
            answer: "710",
            acceptableAnswers: ["710"]
          },
          {
            question: "Trees in agroforestry systems should allow light to pass through their _______.",
            answer: "leaves",
            acceptableAnswers: ["leaves"]
          },
          {
            question: "The homestead area in Bangladesh under agroforestry covers about _______ million hectares.",
            answer: "0.3",
            acceptableAnswers: ["0.3"]
          },
          {
            question: "Agroforestry can help in maintaining _______ balance.",
            answer: "ecological",
            acceptableAnswers: ["ecological"]
          },
          {
            question: "The total number of ponds in Bangladesh is about _______ million.",
            answer: "1.77",
            acceptableAnswers: ["1.77"]
          },
          {
            question: "Agroforestry supports the production of _______ materials for cottage industries.",
            answer: "raw",
        acceptableAnswers: ["raw"]
      },
      {
        question: "The _______ method, also called hill cultivation, was first used by the British in Myanmar.",
        answer: "Taungya",
        acceptableAnswers: ["Taungya", "taungya", "TAUNGYA"]
      },
      {
        question: "The first Forest Department in Bangladesh was established in _______.",
        answer: "1862",
        acceptableAnswers: ["1862"]
      },
        {
          question: "ICRAF was renamed the International Centre for Research in Agroforestry in _______.",
          answer: "1991",
          acceptableAnswers: ["1991"]
        },
        {
          question: "The Betagi-Pomora Community Forestry Project started in the year _______.",
          answer: "1979",
          acceptableAnswers: ["1979"]
        },
        {
          question: "Village and Farm Forestry Program (VFFP) was initiated under the guidance of Prof. _______.",
          answer: "Abdul Haque",
          acceptableAnswers: ["Abdul Haque", "ABDUL HAQUE", "abdul haque"]
        },
        {
          question: "Bangladesh Forest Research Institute conducted agroforestry research in areas like _______ of Rangunia.",
          answer: "Ichamoti",
          acceptableAnswers: ["Ichamoti", "ICHAMOTI", "ichamoti"]
        },
        {
          question: "The National Agroforestry Working Group (NAWG) was formed in _______.",
          answer: "1997",
          acceptableAnswers: ["1997"]
        },
        {
          question: "The Department of Agroforestry and Environment at BSMRAU was established to offer _______ courses.",
          answer: "MS",
          acceptableAnswers: ["MS", "ms", "M.S."]
        },
        {
          question: "Shifting cultivation in the Philippines involved clearing forests for _______ use.",
          answer: "agricultural",
          acceptableAnswers: ["agricultural", "AGRICULTURAL", "Agricultural"]
        },
        {
          question: "Sir _______ Brandis was the first Inspector General of Forests in Bangladesh.",
          answer: "Dietrich",
        acceptableAnswers: ["Dietrich", "DIETRICH", "dietrich"]
      }    
    ],
    'concept of seed': [
      {
        "question": "The embryo in Recurrent Apomixis originates from the _______.",
        "answer": "egg mother cell",
        "acceptableAnswers": ["egg mother cell", "Egg mother cell"]
      },
      {
        "question": "In Adventitious Embryony, the embryo originates from the _______.",
        "answer": "nucellus",
        "acceptableAnswers": ["nucellus", "Nucellus"]
      },
      {
        "question": "Botanical seeds are fertilized and mature _______.",
        "answer": "ovules",
        "acceptableAnswers": ["ovules", "Ovules"]
      },
      {
        "question": "Agricultural seeds can be _______ parts of a plant.",
        "answer": "vegetative",
        "acceptableAnswers": ["vegetative", "Vegetative"]
      },
      {
        "question": "High-yielding varieties are abbreviated as _______.",
        "answer": "HYV",
        "acceptableAnswers": ["HYV", "hyv", "Hyv"]
      },
      {
        "question": "Seeds used in industries produce _______ and beverages.",
        "answer": "chemicals",
        "acceptableAnswers": ["chemicals", "Chemicals"]
      },
      {
        "question": "Seeds can spread _______ and diseases.",
        "answer": "insects",
        "acceptableAnswers": ["insects", "Insects"]
      },
      {
        "question": "The seed protects the _______ during germination.",
        "answer": "embryo",
        "acceptableAnswers": ["embryo", "Embryo"]
      },
      {
        "question": "Botanical seeds are a _______ method of propagation.",
        "answer": "reproductive",
        "acceptableAnswers": ["reproductive", "Reproductive"]
      },
      {
        "question": "Seeds provide _______ to food items like curry and polaw.",
        "answer": "flavor",
        "acceptableAnswers": ["flavor", "Flavor"]
      },
      {
        "question": "The fertilized and mature ovule containing an embryo in a dormant state is called _______.",
        "answer": "botanical seed",
        "acceptableAnswers": ["botanical seed", "Botanical seed"]
      },
      {
        "question": "Seeds that lack a seed coat are called _______.",
        "answer": "naked seeds",
        "acceptableAnswers": ["naked seeds", "Naked seeds"]
      },
      {
        "question": "Endospermic seeds contain _______ or albumin.",
        "answer": "endosperm",
        "acceptableAnswers": ["endosperm", "Endosperm"]
      },
      {
        "question": "Polycot seeds contain more than two _______.",
        "answer": "cotyledons",
        "acceptableAnswers": ["cotyledons", "Cotyledons"]
      },
      {
        "question": "Non-fertilized seeds are produced through _______ propagation.",
        "answer": "asexual",
        "acceptableAnswers": ["asexual", "Asexual"]
      },
      {
        "question": "Monoembryonic seeds contain only one _______.",
        "answer": "embryo",
        "acceptableAnswers": ["embryo", "Embryo"]
      },
      {
        "question": "Seeds that are produced without fertilization are _______ seeds.",
        "answer": "non-fertilized",
        "acceptableAnswers": ["non-fertilized", "Non-fertilized"]
      },
      {
        "question": "On the basis of cotyledon, rice seed is classified as a _______ seed.",
        "answer": "monocot",
        "acceptableAnswers": ["monocot", "Monocot"]
      },
      {
        "question": "A naked seed lacks a _______.",
        "answer": "seed coat",
        "acceptableAnswers": ["seed coat", "Seed coat"]
      },
      {
        "question": "Rice, wheat, and maize seeds are classified as _______ seeds based on the seed coat.",
        "answer": "covered",
        "acceptableAnswers": ["covered", "Covered"]
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
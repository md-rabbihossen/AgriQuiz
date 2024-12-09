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
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

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
    ],
    'land evaluation': [
      {
        question: "High land is completely free of flooding in rainy season.",
        answer: true,
        explanation: "High land is defined as land that is free of flooding in rainy season (29% of total land)."
      },
      {
        question: "Medium high land represents the largest percentage of total land types.",
        answer: true,
        explanation: "Medium high land comprises 35% of total land, which is the largest percentage among all land types."
      },
      {
        question: "A slope of 3-8% is considered moderately steep.",
        answer: false,
        explanation: "A slope of 3-8% is classified as 'Gently sloping'. Moderately steep refers to slopes of 16-30%."
      },
      {
        question: "Very low land has a flooding depth of more than 270 cm in rainy season.",
        answer: true,
        explanation: "Very low land is defined as having a flooding depth greater than 270 cm in rainy season."
      },
      {
        question: "Soil erosion is slight to moderate in sloping land (8-16%).",
        answer: false,
        explanation: "In sloping land (8-16%), soil erosion is moderate to high, not slight to moderate."
      },
      {
        question: "EDSP (Effective Depth of Soil Profile) less than 25 cm is classified as very shallow.",
        answer: true,
        explanation: "According to the classification, EDSP < 25 cm is indeed categorized as very shallow soil."
      },
      {
        question: "High organic matter content in soil is defined as less than 3.44%.",
        answer: false,
        explanation: "High organic matter content is defined as greater than 3.44%, not less than it."
      },
      {
        question: "Soil with pH 7.5 is considered neutral.",
        answer: false,
        explanation: "pH 7.5 falls in the moderately alkaline range (7.4-8.4). Neutral pH range is 6.6-7.3."
      },
      {
        question: "Very high soil moisture in Rabi season is available for more than 3 months.",
        answer: true,
        explanation: "Very high soil moisture classification means moisture is available up to March, for more than 3 months."
      },
      {
        question: "Soil with pH less than 4.5 is classified as highly acidic.",
        answer: false,
        explanation: "Soil with pH less than 4.5 is classified as very highly acidic, not highly acidic."
      },
      {
        question: "Crops cannot be grown in soil with EC greater than 15 dSm-1.",
        answer: true,
        explanation: "Soil with EC >15 dSm-1 is classified as very strongly saline, where it's not possible to grow crops."
      },
      {
        question: "The rainy season in Bangladesh lasts for three months.",
        answer: false,
        explanation: "The rainy season spans four months, from June to September."
      },
      {
        question: "Wheat and potato are examples of crops suitable for moderately saline soils.",
        answer: true,
        explanation: "Moderately saline soils (EC 4-8 dSm-1) are suitable for salt tolerant crops like wheat, potato, and tomato."
      },
      {
        question: "A Productivity Index (PI) of 30 is considered 'Good' in the Parametric system.",
        answer: false,
        explanation: "A PI of 30 falls in the 'Average' category (20-34). 'Good' is classified as 35-64."
      },
      {
        question: "The pre-rainy season occurs immediately after the dry season.",
        answer: true,
        explanation: "The dry season (December-March) is followed by the pre-rainy season (April-May)."
      },
      {
        question: "USDA's Land Capability Classification system is perfectly suitable for Bangladesh's monsoon and deltaic environment.",
        answer: false,
        explanation: "The USDA classification is not suitable for Bangladesh's monsoon and deltaic environment, which is why Bangladesh developed its own LCC system."
      },
      {
        question: "In USDA's LCC, Class IV land is suitable for occasional cultivation.",
        answer: true,
        explanation: "Class IV is classified as fairly good land with major limitations, suitable for occasional cultivation."
      },
      {
        question: "Bangladesh's LCC system has more land capability classes than subclasses.",
        answer: false,
        explanation: "Bangladesh's LCC has 5 main classes but multiple subclasses including both major (D, W) and ordinary subclasses (d, e, r, s, t, w, x, z)."
      },
      {
        question: "Subclass 'w' in Bangladesh's LCC indicates excess water in both dry season and monsoon.",
        answer: true,
        explanation: "Subclass 'w' indicates soils restricted in use due to excess water (in dry season in W soils, in monsoon in D soils)."
      },
      {
        question: "Class I land in Bangladesh's LCC system has no limitations for crop production.",
        answer: false,
        explanation: "Class I in Bangladesh's system is described as having 'least limitations' rather than 'no limitations'."
      },
      {
        question: "Class-I land has no ordinary subclasses in Bangladesh's LCC system.",
        answer: true,
        explanation: "Class-I land only has major subclasses (I-D and I-W) and no ordinary subclasses."
      },
      {
        question: "Class-III land is easy to improve through agricultural practices.",
        answer: false,
        explanation: "Class-III land is specifically noted as being difficult to improve."
      },
      {
        question: "Class-II land has moderate limitations throughout the year.",
        answer: false,
        explanation: "Class-II land has no to slight limitations for most of the year, with moderate limitations only for the rest of the year."
      },
      {
        question: "Class-IV land can have severe salinity hazards.",
        answer: true,
        explanation: "One of the limitations of Class-IV land is severe salinity or toxicity hazards."
      },
      {
        question: "Class-V land is completely unsuitable for any productive use.",
        answer: false,
        explanation: "While unsuitable for agriculture, Class-V land may be productively used for forestry, watershed protection, wildlife reserve, or recreation."
      },
      {
        question: "Class-I land is characterized by being level and very gently undulating.",
        answer: true,
        explanation: "One of the key characteristics of Class-I land is that it is level and very gently undulating."
      },
      {
        question: "Class-III land has severe limitations throughout the entire year.",
        answer: false,
        explanation: "Class-III land has moderate limitations throughout the year, with severe limitations during only one season."
      },
      {
        question: "Class-IV land has good potential for improvement.",
        answer: false,
        explanation: "Class-IV land is characterized as having little potential for improvement."
      },
      {
        question: "Permanent flooding is a characteristic limitation of Class-V land.",
        answer: true,
        explanation: "One of the limitations of Class-V land is permanent flooding."
      },
      {
        question: "Class-II land is difficult to cultivate.",
        answer: false,
        explanation: "Class-II land is specifically described as being easy to cultivate."
      }
    ],
    'introduction to agroforestry': [
      {
        question: "Agroforestry is a new concept that was invented in the 21st century.",
        answer: false,
        explanation: "Agroforestry is an ancient practice that has been used for centuries, long before the 21st century."
      },
      {
        question: "Agroforestry systems only include agricultural crops and do not involve trees or animals.",
        answer: false,
        explanation: "Agroforestry systems integrate trees, crops, and/or animals to create a diverse and sustainable farming system."
      },
      {
        question: "The integration of trees into agricultural systems is known as Agroforestry.",
        answer: true,
        explanation: "Agroforestry is a farming practice that intentionally integrates trees into agricultural landscapes to promote ecological interactions and synergies."
      },
      {
        question: "Agroforestry practices are not influenced by local cultural patterns.",
        answer: false,
        explanation: "Agroforestry practices are often shaped by local cultural patterns, traditions, and knowledge systems, which play a crucial role in their adoption and success."
      },
      {
        question: "Agroforestry systems are less complex than mono-cropping.",
        answer: false,
        explanation: "Agroforestry systems are more complex than mono-cropping as they involve multiple components and interactions."
      },
      {
        question: "All components of Agroforestry must be in the same unit of land.",
        answer: true,
        explanation: "Agroforestry involves the integration of multiple components, such as trees, crops, and animals, within the same unit of land."
      },
      {
        question: "Agroforestry can help in soil and water conservation.",
        answer: true,
        explanation: "Agroforestry practices can help conserve soil and water by reducing erosion, increasing soil organic matter, and promoting efficient water use."
      },
      {
        question: "The main objective of Agroforestry is to maximize land wastage.",
        answer: false,
        explanation: "The main objective of Agroforestry is to promote sustainable land use, increase biodiversity, and improve ecosystem services, not to maximize land wastage."
      },
      {
        question: "Agroforestry practices are only focused on tree planting.",
        answer: false,
        explanation: "Agroforestry practices involve the integration of multiple components, including trees, crops, and animals, to create a diverse and sustainable farming system."
      },
      {
        question: "Agroforestry systems can lead to increased soil nutrients through the decomposition of litter fall.",
        answer: true,
        explanation: "Agroforestry systems can lead to increased soil nutrients through the decomposition of litter fall."
      },
      {
        question: "One limitation of Agroforestry is that it can lead to increased competition between trees and food crops.",
        answer: true,
        explanation: "One limitation of Agroforestry is that it can lead to increased competition between trees and food crops."
      },
      {
        question: "Agroforestry only provides environmental benefits and does not contribute to economic or social improvements.",
        answer: false,
        explanation: "Agroforestry provides environmental, economic, and social benefits."
      },
      {
        question: "The use of Agroforestry can lead to a reduction in the pressure on forests.",
        answer: true,
        explanation: "The use of Agroforestry can lead to a reduction in the pressure on forests."
      },
      {
        question: "Agroforestry practices are only focused on tree planting.",
        answer: false,
        explanation: "Agroforestry practices involve the integration of multiple components, including trees, crops, and animals, to create a diverse and sustainable farming system."
      }
    ],
    'scope of agroforestry': [
      {
        question: "Agroforestry is only applicable to urban areas.",
        answer: false,
        explanation: "Agroforestry can be applied to both rural and urban areas."
      },
      {
        question: "Agroforestry practices can help meet the needs of a growing population.",
        answer: true,
        explanation: "Agroforestry can help increase food production, improve livelihoods, and promote sustainable land use, which can help meet the needs of a growing population."
      },
      {
        question: "Agroforestry is not effective on economically marginal lands.",
        answer: false,
        explanation: "Agroforestry can be particularly effective on economically marginal lands, as it can help improve soil fertility, increase biodiversity, and promote sustainable land use."
      },
      {
        question: "The homesteads in Bangladesh are solely for agricultural crops and do not include any trees or livestock.",
        answer: false,
        explanation: "Homesteads in Bangladesh often include a mix of agricultural crops, trees, and livestock, which is a form of agroforestry."
      },
      {
        question: "Homesteads in rural areas of Bangladesh typically include a combination of trees, shrubs, and livestock.",
        answer: true,
        explanation: "Homesteads in rural areas of Bangladesh often include a mix of trees, shrubs, and livestock, which is a form of agroforestry."
      },
      {
        question: "Agroforestry is only applicable to rural areas.",
        answer: false,
        explanation: "Agroforestry can be applied to both rural and urban areas."
      },
      {
        question: "Agroforestry practices can help meet the needs of a growing population.",
        answer: true,
        explanation: "Agroforestry can help increase food production, improve livelihoods, and promote sustainable land use, which can help meet the needs of a growing population."
      },
      {
        question: "Agroforestry is not effective on economically marginal lands.",
        answer: false,
        explanation: "Agroforestry can be particularly effective on economically marginal lands, as it can help improve soil fertility, increase biodiversity, and promote sustainable land use."
      },
      {
        question: "The homesteads in Bangladesh are solely for agricultural crops and do not include any trees or livestock.",
        answer: false,
        explanation: "Homesteads in Bangladesh often include a mix of agricultural crops, trees, and livestock, which is a form of agroforestry."
      }
    ],
    'history of agroforestry': [
      {
        question: "The practice of clearing and burning forests for agriculture was common in Europe until the end of the 19th century.",
        answer: true,
        explanation: "This practice was indeed common in Europe until the end of the 19th century."
      },
      {
        question: "The National Agroforestry Working Group (NAWG) was formed in 1990.",
        answer: false,
        explanation: "The National Agroforestry Working Group (NAWG) was formed in 1991."
      },
      {
        question: "The German Forester Sir Dietrich Brandis was the first inspector general of forests in Bangladesh.",
        answer: true,
        explanation: "Sir Dietrich Brandis was indeed the first inspector general of forests in Bangladesh."
      },
      {
        question: "Agroforestry has only been practiced in Bangladesh since the 1990s.",
        answer: false,
        explanation: "Agroforestry has been practiced in Bangladesh for centuries, long before the 1990s."
      }
    ],
    'prospective areas of agroforestry in bangladesh': [
      {
        question: "Agroforestry is only applicable to urban areas.",
        answer: false,
        explanation: "Agroforestry can be applied to both rural and urban areas."
      },
      {
        question: "Agroforestry practices can help meet the needs of a growing population.",
        answer: true,
        explanation: "Agroforestry can help increase food production, improve livelihoods, and promote sustainable land use, which can help meet the needs of a growing population."
      },
      {
        question: "Agroforestry is not effective on economically marginal lands.",
        answer: false,
        explanation: "Agroforestry can be particularly effective on economically marginal lands, as it can help improve soil fertility, increase biodiversity, and promote sustainable land use."
      },
      {
        question: "The homesteads in Bangladesh are solely for agricultural crops and do not include any trees or livestock.",
        answer: false,
        explanation: "Homesteads in Bangladesh often include a mix of agricultural crops, trees, and livestock, which is a form of agroforestry."
      },
      {
        question: "Homesteads in rural areas of Bangladesh typically include a combination of trees, shrubs, and livestock.",
        answer: true,
        explanation: "Homesteads in rural areas of Bangladesh often include a mix of trees, shrubs, and livestock, which is a form of agroforestry."
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
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(answer)
    if (answer === currentQuestion.answer) {
      setScore(prev => prev + 1)
    } else {
      // Store wrong answers
      setWrongAnswers(prev => [...prev, {
        question: currentQuestion.question || currentQuestion.statement,
        yourAnswer: answer ? 'True' : 'False',
        correctAnswer: currentQuestion.answer ? 'True' : 'False',
        explanation: currentQuestion.explanation
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
        <h3>True or False</h3>

        {showResult ? (
          <div className="result-container">
            <h2>Quiz Complete!</h2>
            <p className="score">Your Score: {score} out of {shuffledQuestions.length}</p>
            
            {/* Add wrong answers review section */}
            {wrongAnswers.length > 0 && (
              <div className="wrong-answers-review">
                <h3>Review Wrong Answers:</h3>
                {wrongAnswers.map((item, index) => (
                  <div key={index} className="wrong-answer-item">
                    <p className="review-question">{item.question}</p>
                    <p className="your-answer">Your Answer: <span className="incorrect">{item.yourAnswer}</span></p>
                    <p className="correct-answer">Correct Answer: <span className="correct">{item.correctAnswer}</span></p>
                    <p className="explanation">{item.explanation}</p>
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
          <div className="true-false-container">
            <div className="question-box">
              <p className="question">{currentQuestion.question || currentQuestion.statement}</p>
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
                <div className="navigation-buttons">
                  <button 
                    className="nav-button"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Show Results' : 'Next Question'}
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
              </div>
            )}

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

export default TrueFalse 
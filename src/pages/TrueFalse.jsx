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
        question: "Agroforestry originated as a modern concept in tropical developed countries.",
        answer: false,
        explanation: "Agroforestry originated in the temperate zone and is crucial in tropical developing countries."
      },
      {
        question: "The term agroforestry was coined in the 1970s.",
        answer: true,
        explanation: "The term was introduced in the early 1970s."
      },
      {
        question: "Kenneth King coined the term Agrisilviculture in 1968.",
        answer: true,
        explanation: "Kenneth King introduced the term to describe the integration of agriculture and forestry."
      },
      {
        question: "Agroforestry excludes the use of animals.",
        answer: false,
        explanation: "Agroforestry integrates trees, crops, and animals in a sustainable manner."
      },
      {
        question: "Bene et al. gave the first definition of agroforestry in 1983.",
        answer: false,
        explanation: "Bene et al. proposed the first definition in 1977."
      },
      {
        question: "Agroforestry helps in sustainable management of land resources.",
        answer: true,
        explanation: "The primary aim of agroforestry is sustainable land use."
      },
      {
        question: "Agroforestry is based on the integration of forestry and agricultural technologies.",
        answer: true,
        explanation: "It combines agriculture and forestry for sustainable land-use systems."
      },
      {
        question: "Agroforestry practices are scientifically sound and socially acceptable.",
        answer: true,
        explanation: "This is one of the core principles as defined by Nair."
      },
      {
        question: "Agroforestry is a new invention in land management.",
        answer: false,
        explanation: "Agroforestry is a modern name for a set of traditional practices."
      },
      {
        question: "ICRAF refined the definitions of agroforestry through discussions.",
        answer: true,
        explanation: "ICRAF refined and suggested definitions of agroforestry."
      },
        {
          question: "Agroforestry includes at least one woody perennial component.",
          answer: true,
          explanation: "One of the defining characteristics of agroforestry is the inclusion of a woody perennial component."
        },
        {
          question: "The cycle of agroforestry systems is less than a year.",
          answer: false,
          explanation: "The cycle of agroforestry systems is typically more than one year."
        },
        {
          question: "Trees in agroforestry systems improve soil nutrients through litter decomposition.",
          answer: true,
          explanation: "Decomposition of litterfall enriches soil nutrients."
        },
        {
          question: "Agroforestry decreases weed infestation.",
          answer: true,
          explanation: "Agroforestry reduces weed competition due to integrated management practices."
        },
        {
          question: "Agroforestry systems cannot reduce crop failure risks.",
          answer: false,
          explanation: "Agroforestry diversifies outputs, reducing the risk of total crop failure."
        },
        {
          question: "In agroforestry, components are managed independently.",
          answer: false,
          explanation: "Agroforestry components are managed as an integrated unit."
        },
        {
          question: "Agroforestry enhances soil physical properties like water holding capacity.",
          answer: true,
          explanation: "It improves soil structure and water retention through organic matter."
        },
        {
          question: "Agroforestry always guarantees immediate economic value.",
          answer: false,
          explanation: "Economic benefits from agroforestry often take time, particularly for tree growth."
        },
        {
          question: "Agroforestry is more complex than mono-cropping.",
          answer: true,
          explanation: "The integration of multiple components adds complexity to agroforestry systems."
        },
        {
          question: "Agroforestry contributes to biodiversity conservation.",
          answer: true,
        explanation: "By integrating diverse species, agroforestry conserves biodiversity."
      }, 
      {
        question: "The Taungya method involves growing annual agricultural crops alongside forest species.",
            answer: true,
            explanation: "Taungya is a system combining forest species and agricultural crops during the early years of plantation establishment."
          },
          {
            question: "ICRAF was established in Ottawa, Canada, in 1977.",
            answer: false,
            explanation: "ICRAF was established in Nairobi, Kenya, in 1977."
          },
          {
            question: "The Betagi-Pomora Community Forestry Project rehabilitated families by allotting land for tree planting and crops.",
            answer: true,
            explanation: "Families were given land to plant trees and cultivate crops as part of the rehabilitation program."
          },
          {
            question: "Agroforestry research in Bangladesh began with the establishment of the Forest Department in 1862.",
            answer: false,
            explanation: "Forest management started in 1862, but agroforestry research began later, particularly in the 1980s."
          },
          {
            question: "The Village and Farm Forestry Program was funded by the World Bank.",
            answer: false,
            explanation: "The program was funded by the Swiss Agency for Development and Cooperation (SDC)."
          },
          {
            question: "The University of Chittagong introduced Agroforestry courses in 1988.",
            answer: true,
            explanation: "Agroforestry became part of the B.Sc. (Hons) Forestry curriculum at the University of Chittagong in 1988."
          },
          {
            question: "The National Agroforestry Working Group (NAWG) was formed in 1990.",
            answer: false,
            explanation: "NAWG was formed in 1997."
          },
          {
            question: "The Jhoomia Rehabilitation Program in 1980 focused on afforestation.",
            answer: true,
            explanation: "The program aimed to rehabilitate Jhoomia families with afforestation and crop integration."
          },
          {
            question: "The mid-1980s saw the establishment of the On-Farm Research Division in BARI for evaluating agroforestry systems.",
            answer: true,
            explanation: "The On-Farm Research Division (OFRD) was established during this period for agroforestry evaluation."
          },
          {
            question: "Agroforestry in Bangladesh has been shaped primarily by socio-economic and ecological considerations.",
            answer: true,
        explanation: "Local environments, farmer resources, and social needs have strongly influenced agroforestry practices in Bangladesh."
      },
      {
        question: "Agroforestry focuses on integrating trees with crops and livestock.",
        answer: true,
        explanation: "Agroforestry systems combine trees, crops, and livestock for sustainable land use."
      },
        {
          question: "Homesteads in Bangladesh play a significant role in bio-fuel production.",
          answer: true,
          explanation: "Rural homesteads provide a substantial share of the country's bio-fuel needs."
        },
        {
          question: "Trees in agroforestry systems should have wide and dense canopies.",
          answer: false,
          explanation: "Trees with small and narrow canopies are preferred to allow sunlight for crops."
        },
        {
          question: "Bangladesh has no cultivable fallow land suitable for agroforestry.",
          answer: false,
          explanation: "Bangladesh has 0.27 million ha of cultivable fallow land suitable for agroforestry."
        },
        {
          question: "Agroforestry contributes to soil improvement and water conservation.",
          answer: true,
          explanation: "The system supports ecological benefits, including soil and water conservation."
        },
        {
          question: "Agroforestry systems can support agritourism and recreation.",
          answer: true,
          explanation: "Agroforestry offers recreational opportunities such as agritourism and hunting."
        },
        {
          question: "Agroforestry products include both food and non-food items.",
          answer: true,
          explanation: "Agroforestry systems produce a wide range of products, from food to timber and craft materials."
        },
        {
          question: "Agroforestry has no role in employment generation.",
          answer: false,
          explanation: "Agroforestry has significant potential to generate employment opportunities."
        },
        {
          question: "Agroforestry can be practiced on railway embankments and roadside lands.",
          answer: true,
          explanation: "Roads, railways, and embankments are identified as prospective areas for agroforestry."
        },
        {
          question: "Agroforestry trees should compete with crops for water and nutrients.",
          answer: false,
          explanation: "Preferred agroforestry trees have deep roots to avoid competition with crops."
        }      
    ],
    'concept of seed': [
      {
        "question": "Recurrent Apomixis is a process where the embryo originates without meiosis.",
        "answer": true,
        "explanation": "Recurrent Apomixis involves embryo development without meiosis."
      },
      {
        "question": "Vegetative apomixis is a sexual reproduction method.",
        "answer": false,
        "explanation": "Vegetative apomixis is an asexual reproduction method involving vegetative buds or bulbils."
      },
      {
        "question": "All agricultural seeds are botanical seeds.",
        "answer": false,
        "explanation": "Not all agricultural seeds are botanical seeds; some involve vegetative parts."
      },
      {
        "question": "Botanical seeds include rice and wheat.",
        "answer": true,
        "explanation": "Rice and wheat are examples of botanical seeds."
      },
      {
        "question": "Seeds are vehicles for spreading life.",
        "answer": true,
        "explanation": "Seeds help spread plant species by being carried by animals, wind, or humans."
      },
      {
        "question": "Non-recurrent Apomixis involves embryo formation directly from the egg nucleolus.",
        "answer": true,
        "explanation": "Non-recurrent Apomixis results in embryos forming from the egg nucleolus without fertilization."
      },
      {
        "question": "Seeds provide food for animals and humans.",
        "answer": true,
        "explanation": "Seeds are a primary source of food, including cereals and pulses."
      },
      {
        "question": "Adventitious Embryony occurs in sugarcane.",
        "answer": false,
        "explanation": "Adventitious Embryony typically occurs in Citrus and Opuntia."
      },
      {
        "question": "HYV seeds are used for increasing crop yield.",
        "answer": true,
        "explanation": "High-Yielding Varieties (HYV) are developed for higher agricultural productivity."
      },
      {
        "question": "Seeds contribute to plant improvement through hybridization.",
        "answer": true,
        "explanation": "Seeds play a crucial role in plant improvement by enabling hybridization and genetic diversity."
      },
      {
        "question": "Seeds are the media used to sustain and multiply plant species.",
        "answer": true,
        "explanation": "This is the fundamental definition of seeds in plant propagation."
      },
      {
        "question": "Agricultural seeds can include vegetative parts of a plant.",
        "answer": true,
        "explanation": "Agricultural seeds include parts like banana suckers and pineapple crowns capable of propagation."
      },
      {
        "question": "Naked seeds are found in higher classes of plants.",
        "answer": false,
        "explanation": "Naked seeds are not found in higher plants; they are typical of gymnosperms like pine."
      },
      {
        "question": "Polycot seeds contain more than two cotyledons.",
        "answer": true,
        "explanation": "Polycot seeds, such as pine seeds, have more than two cotyledons."
      },
      {
        "question": "Non-endospermic seeds contain endosperm or albumin.",
        "answer": false,
        "explanation": "Non-endospermic seeds lack endosperm or albumin."
      },
      {
        "question": "Monoembryonic seeds contain only one embryo.",
        "answer": true,
        "explanation": "Monoembryonic seeds, such as rice and wheat, contain a single embryo."
      },
      {
        "question": "Non-fertilized seeds are produced through meiosis and fertilization.",
        "answer": false,
        "explanation": "Non-fertilized seeds are produced through asexual propagation, bypassing meiosis and fertilization."
      },
      {
        "question": "Rice and wheat seeds are classified as monocots.",
        "answer": true,
        "explanation": "Rice and wheat are monocot seeds because they contain a single cotyledon."
      },
      {
        "question": "Endospermic seeds are also called albuminous seeds.",
        "answer": true,
        "explanation": "Endospermic seeds contain endosperm or albumin, hence the name albuminous."
      },
      {
        "question": "Covered seeds have no seed coat.",
        "answer": false,
        "explanation": "Covered seeds, like rice and maize, have a seed coat, distinguishing them from naked seeds."
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
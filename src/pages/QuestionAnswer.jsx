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
    ],
    'land evaluation': [
      {
        question: "What is the definition of land in the context of land evaluation?",
        answer: "Land is defined as the physical environment consisting of relief, soil, hydrology, climate and vegetation as far as they determine the land use."
      },
      {
        question: "Define land evaluation.",
        answer: "Land evaluation is a process to determine the potentiality of a land for a particular use or management system."
      },
      {
        question: "What are the five main objectives of land evaluation?",
        answer: "The five main objectives of land evaluation are:\n\n1. To determine the uses of land which are physically possible.\n2. To determine the uses of land which are economically and socially relevant.\n3. To determine the changes of land use which are desirable and feasible.\n4. To determine the advantages and disadvantages of the present and potential land uses.\n5. To make a comparison between alternative land uses and to established a set of priorities of land use."
      },
      {
        question: "Describe the different land types based on flooding depth during rainy season.",
        answer: "The different land types based on flooding depth are:\n\n1. High land (29% of total land): Free of flooding in rainy season\n2. Medium high land (35% of total land): Flooding depth up to 90 cm\n3. Medium low land (12% of total land): Flooding depth 90-180 cm\n4. Low land (8% of total land): Flooding depth 180-270 cm\n5. Very low land (1% of total land): Flooding depth > 270 cm"
      },
      {
        question: "What is the relationship between degree and percentage in land slope measurement?",
        answer: "45° of land slopeness is considered 100% slope."
      },
      {
        question: "Classify and explain different land slopes and their associated erosion risks.",
        answer: "Land slopes are classified as follows:\n\n1. Flat or almost flat:\n- Slope: 0-3%\n- Erosion: Nonsignificant/slight\n\n2. Gently sloping:\n- Slope: 3-8%\n- Erosion: Slight to moderate\n\n3. Sloping:\n- Slope: 8-16%\n- Erosion: Moderate to high\n\n4. Moderately steep:\n- Slope: 16-30%\n- Erosion: High to very high\n\n5. Steep:\n- Slope: 30-45%\n- Erosion: Very high\n\n6. Very steep:\n- Slope: >45%\n- Erosion: Very very high"
      },
      {
        question: "Which land type represents the largest percentage of total land area?",
        answer: "Medium high land represents the largest percentage at 35% of total land area, with usual flooding depth up to 90 cm in rainy season."
      },
      {
        question: "What percentage of total land is classified as very low land, and what are its characteristics?",
        answer: "Very low land comprises 1% of total land area, and it is characterized by flooding depth greater than 270 cm during the rainy season."
      },
      {
        question: "What is soil texture and what are the textural groups according to SRDI?",
        answer: "Soil texture is the relative proportion of sand, silt and clay in soil. According to Soil Resources Development Institute (SRDI), the textural groups are:\n\n- Sandy\n- Sandy loam\n- Loam\n- Clay loam\n- Clay"
      },
      {
        question: "Define Effective Depth of Soil Profile (EDSP) and explain its classifications.",
        answer: "Effective Depth of Soil Profile (EDSP) is the depth up to which plant roots reaches. Classifications are:\n\n1. Deep: > 90 cm\n2. Moderately deep: 51-90 cm\n3. Shallow: 25-50 cm\n4. Very shallow: < 25 cm"
      },
      {
        question: "How is available soil moisture classified in dry season (Rabi season)?",
        answer: "Available soil moisture in dry season (Rabi season) is classified as:\n\n1. Very high: Moisture available up to March (> 3 months)\n2. High: Moisture available up to February (2-3 months)\n3. Medium: Moisture available up to January (1-2 months)\n4. Low: Moisture available up to December (< 1 month)\n5. Very low: Moisture available up to November (few days)"
      },
      {
        question: "What are the classifications of organic matter content in soil?",
        answer: "Organic matter content in soil is classified as:\n\n1. High: > 3.44%\n2. Medium: 1.72 - 3.44%\n3. Low: < 1.72%"
      },
      {
        question: "Explain the different pH ranges and their classifications in soil.",
        answer: "Soil pH classifications:\n\n1. Very highly acidic: < 4.5\n2. Highly acidic: 4.5-5.5\n3. Moderately acidic: 5.5-6.5\n4. Neutral: 6.6-7.3\n5. Moderately alkaline: 7.4-8.4\n6. Highly alkaline: 8.5-9.0\n7. Very highly alkaline: > 9.0"
      },
      {
        question: "List and explain the different types of soil drainage.",
        answer: "The types of soil drainage are:\n\n1. Well drained\n2. Moderately well drained\n3. Imperfectly drained\n4. Poorly drained\n5. Very poorly drained"
      },
      {
        question: "What is considered a neutral pH range in soil?",
        answer: "A soil pH range of 6.6-7.3 is considered neutral."
      },
      {
        question: "What is the minimum organic matter content for soil to be classified as having high organic matter?",
        answer: "Soil is classified as having high organic matter content when the organic matter content is greater than 3.44%."
      },
      {
        question: "How long is moisture available in soil classified as 'High' during the dry season?",
        answer: "In soil classified as 'High' for available moisture during dry season (Rabi season), moisture is available up to February, for 2-3 months."
      },
      {
        question: "How is soil salinity measured and what are its different classes with their crop suitability?",
        answer: "Soil salinity is measured in Electrical Conductivity (EC). The classes are:\n\n1. Non saline (EC <2 dSm-1):\n- Most field crops can be grown\n\n2. Slightly saline (EC 2-4 dSm-1):\n- Seedling in Kharif season and pulses are affected\n\n3. Moderately saline (EC 4-8 dSm-1):\n- Salt tolerant crops e.g. wheat, potato, tomato\n\n4. Strongly saline (EC 8-15 dSm-1):\n- High salt tolerant crops like barley, cotton, sugarbeet\n\n5. Very strongly saline (EC >15 dSm-1):\n- Not possible to grow crops"
      },
      {
        question: "What are the four main climatic seasons and their corresponding months?",
        answer: "The four main climatic seasons are:\n\n1. Pre rainy season: April – May\n2. Rainy season: June – September\n3. Post rainy season: October- November\n4. Dry season: December – March"
      },
      {
        question: "List the methods of land evaluation for rainfed agriculture.",
        answer: "Methods for rainfed agriculture evaluation are:\n\n1. Climatic evaluation according to Papadakis\n2. USDA land capability classification\n3. Parametric system for general evaluation\n4. Land capability classification for the humid tropics\n5. Crop specific FAO- land suitability classification"
      },
      {
        question: "What are the methods of land evaluation for irrigated agriculture?",
        answer: "Methods for irrigated agriculture evaluation are:\n\n1. Evaluation for irrigation developed by FAO in Iran\n2. Parametric evaluation system for irrigation purposes\n3. USBR evaluation method for irrigation correlated with the FAO land classification\n4. Specific evaluation methods for irrigation:\n   - Surface irrigation\n   - Sprinkler irrigation"
      },
      {
        question: "Explain the Parametric system for general evaluation and its factors.",
        answer: "The Parametric system expresses land capability in terms of productivity through a Productivity Index (PI). It considers nine factors:\n\n- Moisture (H)\n- Drainage (D)\n- Effective depth (P)\n- Texture/structure (T)\n- Base saturation/salt concentration (N)\n- Organic matter content (O)\n- Mineral exchange capacity/nature of clay (A)\n- Mineral reserve (M)\n\nThe formula used is:\nPI = H × (D/100) × (P/100) × (T/100) × (N/100) × (O/100) × (A/100) × (M/100)\n\nEach parameter has ratings from 0-100, with increasing suitability."
      },
      {
        question: "What are the different Productivity Index (PI) classes and their ratings?",
        answer: "The Productivity Index classes and their ratings are:\n\n1. Excellent: 65-100\n2. Good: 35-64\n3. Average: 20-34\n4. Poor: 8-19\n5. Extremely poor: 0-7"
      },
      {
        question: "What crops can be grown in moderately saline soils (EC 4-8 dSm-1)?",
        answer: "In moderately saline soils (EC 4-8 dSm-1), salt tolerant crops such as wheat, potato, and tomato can be grown."
      },
      {
        question: "Which season is considered the main rainy season and how long does it last?",
        answer: "The rainy season occurs from June to September, lasting for four months."
      },
      {
        question: "What is Land Capability Classification (LCC) and what is its main purpose?",
        answer: "Land Capability Classification is a method of grouping soils to show their relative suitability for sustained production of common agricultural crops. It is based on limitations imposed by soil characteristics, climate, landscape features, erodibility, and other natural hazards."
      },
      {
        question: "Explain the USDA Land Capability Classification system and its main categories.",
        answer: "USDA Land Capability Classification system has three main categories:\n\nA. Land suitable for cultivation:\n1. Class I – Very good land (no limitations)\n2. Class II – Good land (minor limitations)\n3. Class III – Moderately good land (major limitations)\n4. Class IV – Fairly good land (major limitations, occasional cultivation)\n\nB. Land not suitable for cultivation, but suitable for pasture and grazing:\n5. Class V – with no limitations\n6. Class VI – with minor limitations\n7. Class VII – with major limitations\n\nC. Land not suitable for pasture and grazing:\n8. Class VIII – Suitable only for wildlife and watershed"
      },
      {
        question: "Why was a different LCC system developed for Bangladesh, and what are its levels of generalization?",
        answer: "The USDA classification was not suitable for Bangladesh's monsoon and deltaic environment. The Soil Survey Department of Bangladesh developed an LCC with three levels of generalization:\n\n1. Land capability classes\n2. Land capability sub classes\n3. Land capability units"
      },
      {
        question: "Describe the land capability classes in Bangladesh's LCC system.",
        answer: "Bangladesh's Land Capability Classes are:\n\nClass I - Very good agricultural land (with least limitations)\nClass II, III, IV, V - Lands with increasingly severe limitations for crop production"
      },
      {
        question: "What are the major and ordinary subclasses in Bangladesh's LCC system?",
        answer: "Bangladesh's LCC Subclasses:\n\nMajor Subclasses (based on flooding):\n1. D - soils lying above normal flood level\n2. W - soils subject to flooding for part or all the year\n\nOrdinary Subclasses:\n- d: restricted use due to droughtiness in dry season\n- e: restricted use due to erosion hazards\n- r: irregular relief hindering irrigation, drainage and tillage\n- s: excess soluble salts\n- t: toxic or potentially toxic chemicals to plants\n- w: restricted use due to excess water\n- x: fresh alluvium or very young alluvial soils\n- z: hazards of crop loss due to rapid rise or flow of flood water"
      },
      {
        question: "What are the main differences between USDA's LCC and Bangladesh's LCC systems?",
        answer: "Key differences:\n\n1. USDA system has 8 classes while Bangladesh's system has 5 classes\n2. USDA system focuses on general land use capabilities, while Bangladesh's system is specifically adapted for monsoon and deltaic environments\n3. Bangladesh's system includes specific subclasses for flooding (D and W) which are particularly relevant to the country's geography\n4. Bangladesh's system has more detailed subclasses for water-related issues (w, z) reflecting the importance of water management in the region"
      },
      {
        question: "What are the two major subclasses in Bangladesh's LCC system and how do they differ?",
        answer: "The two major subclasses in Bangladesh's LCC system are:\n\n1. D - soils lying above normal flood level\n2. W - soils subject to flooding for part or all the year\n\nThe main difference is their relationship to flooding, with D soils being naturally protected from normal flooding while W soils experience regular flooding."
      },
      {
        question: "What are the key characteristics of Class-I (Very good agricultural land) in Bangladesh's LCC system?",
        answer: "Class-I characteristics:\n\n1. No to slight limitations for crop production\n2. Has the widest range of agricultural use\n3. Level and very gently undulating\n4. Easy to cultivate\n5. Remains ready for cultivation for most or all of the dry season\n\nSubclasses:\n- I-D\n- I-W\n(No ordinary subclasses in Class-I)"
      },
      {
        question: "Describe the characteristics of Class-II (Good agricultural land) in Bangladesh's LCC system.",
        answer: "Class-II characteristics:\n\n1. No to slight limitations for most of the year\n2. Moderate limitations for rest of the year\n3. Level and gently undulating\n4. Easy to cultivate\n\nSubclasses:\n- II Dd\n- II Dw\n- II W"
      },
      {
        question: "What are the characteristics and limitations of Class-III (Moderate agricultural land)?",
        answer: "Class-III characteristics:\n\n1. Moderate limitations throughout the year\n2. Severe limitations during one season\n3. Slight to moderate limitations during remainder of the year\n\nMain limitations:\n- Low water holding capacity\n- Seasonal deep flooding\n- Irregular or sloping relief difficult to irrigate or till\n- Moderate erosion hazards\n- Moderate salinity hazards\n- Moderate crops only one season per year\n\nNote: Improvement of land is difficult\n\nSubclasses:\nIII Dd, III Dr, III Dw, III Dx, III Wd, III Wr, III Ws, III Ww, III Wx, III Wz"
      },
      {
        question: "Explain the characteristics and limitations of Class-IV (Poor agricultural land).",
        answer: "Class-IV characteristics:\n\n1. Severe limitations for crop production throughout the year\n\nMain limitations:\n- Seasonal deep flooding combined with poor soil structure\n- Severe erosion hazards\n- Severe salinity or toxicity hazards\n- Very low water and nutrient holding capacity\n- Severe risk of crop loss due to rapid rise of flood water\n\nNote: Little potential for improvement\n\nSubclasses:\nIV Dd, IV De, IV Dw, IV Dx, IV Wd, IV Wr, IV Ws, IV Ww, IV Wx, IV Wz"
      },
      {
        question: "What are the characteristics and potential uses of Class-V (Very poor and non-agricultural land)?",
        answer: "Class-V characteristics:\n\n1. Very severe limitations making crop production impossible or very hazardous\n2. Causes very low yield\n\nMain limitations:\n- Very steep slopes\n- Very shallow depth of soil\n- Permanent flooding\n- Too much salinity or toxicity for economical reclamation\n- Raw or infertile state of new alluvial deposits with annual hazard of new deposition or river erosion\n\nPotential uses:\n- Forestry\n- Watershed protection\n- Wildlife reserve\n- Recreation\n\nSubclasses:\nV De, V Ws, V Wt, V Ww, V Wx"
      },
      {
        question: "Compare the subclasses present in Class-III and Class-IV lands.",
        answer: "Comparison of subclasses:\n\nClass-III subclasses:\nIII Dd, III Dr, III Dw, III Dx, III Wd, III Wr, III Ws, III Ww, III Wx, III Wz\n\nClass-IV subclasses:\nIV Dd, IV De, IV Dw, IV Dx, IV Wd, IV Wr, IV Ws, IV Ww, IV Wx, IV Wz\n\nKey difference: Class-IV has similar subclasses but with more severe limitations compared to Class-III"
      },
      {
        question: "What are the main differences between Class-I and Class-II agricultural lands?",
        answer: "Main differences between Class-I and Class-II:\n\nClass-I:\n- No to slight limitations throughout the year\n- Widest range of agricultural use\n- Only two subclasses (I-D, I-W)\n- No ordinary subclasses\n\nClass-II:\n- No to slight limitations for most of the year but moderate limitations for rest of the year\n- More restricted range of use\n- Has both major and ordinary subclasses (II Dd, II Dw, II W)"
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
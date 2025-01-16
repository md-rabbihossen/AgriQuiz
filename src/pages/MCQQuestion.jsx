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

  //MCQ data
  const questions = {
    
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
    ],
    'introduction to agroforestry': [
      {
        question: "Who coined the term 'Agrisilviculture'?",
        options: ["Kenneth King", "Nair", "Bene", "Lundgren and Raintree"],
        correctAnswer: "Kenneth King"
      },
      {
        question: "Which organization proposed the first definition of agroforestry?",
        options: ["PCARRD", "ICRAF", "FAO", "Bene et al."],
        correctAnswer: "Bene et al."
      },
      {
        question: "What is the main goal of agroforestry?",
        options: [
          "Maximize monocrop yield",
          "Sustain natural vegetation",
          "Create integrated, productive, and sustainable land-use systems",
          "Eliminate the need for forestry"
        ],
        correctAnswer: "Create integrated, productive, and sustainable land-use systems"
      },
      {
        question: "Which term best describes the relationship between forestry and agriculture in agroforestry?",
        options: ["Invention", "Integration", "Separation", "Domination"],
        correctAnswer: "Integration"
      },
      {
        question: "Agroforestry is most crucial in which type of countries?",
        options: [
          "Temperate developed countries",
          "Tropical developing countries",
          "Arctic countries",
          "Urbanized countries"
        ],
        correctAnswer: "Tropical developing countries"
      },
      {
        question: "What is a key feature of agroforestry as defined by Lundgren and Raintree?",
        options: [
          "Only includes herbaceous crops",
          "Woody perennials are deliberately grown with crops and/or animals",
          "Animals are excluded",
          "It is only applicable in urban areas"
        ],
        correctAnswer: "Woody perennials are deliberately grown with crops and/or animals"
      },
      {
        question: "What triggered the emergence of agroforestry?",
        options: [
          "Decreasing urban population",
          "Need to maximize soil resource utilization",
          "Overuse of agricultural chemicals",
          "Elimination of forests for agriculture"
        ],
        correctAnswer: "Need to maximize soil resource utilization"
      },
      {
        question: "Which of the following is NOT a component of agroforestry?",
        options: ["Crops", "Trees", "Animals", "Pure forestry"],
        correctAnswer: "Pure forestry"
      },
      {
        question: "Which word is part of the etymology of 'agroforestry'?",
        options: ["Ecology", "Agriculture", "Zoology", "Botany"],
        correctAnswer: "Agriculture"
      },
      {
        question: "According to Nair (1979), agroforestry is:",
        options: [
          "Scientifically unsound",
          "Practically feasible and socially acceptable",
          "Exclusive to forestry systems",
          "Only applied to crops"
        ],
        correctAnswer: "Practically feasible and socially acceptable"
      },
      {
          question: "Which of the following is NOT a characteristic of agroforestry?",
          options: [
            "Multiple components, including a woody perennial",
            "All components exist in different land units",
            "High interaction between woody and non-woody components",
            "A cycle of more than one year"
          ],
          correctAnswer: "All components exist in different land units"
        },
        {
          question: "Which component is NOT part of the agroforestry system?",
          options: ["Crops", "Animals", "Woody perennials", "Herbaceous-only plants"],
          correctAnswer: "Herbaceous-only plants"
        },
        {
          question: "Which feature ensures agroforestry systems are intentionally managed as a unit?",
          options: ["Intensive", "Integrated", "Intentional", "Interactive"],
          correctAnswer: "Intentional"
        },
        {
          question: "What is a key attribute of agroforestry related to resource-based conservation?",
          options: ["Productivity", "Adoptability", "Sustainability", "Diversity"],
          correctAnswer: "Sustainability"
        },
        {
          question: "Which of the following is an environmental benefit of agroforestry?",
          options: [
            "Diversified outputs",
            "Improved nutrition and health",
            "Reduction in soil erosion",
            "Stabilization of upland communities"
          ],
          correctAnswer: "Reduction in soil erosion"
        },
        {
          question: "Which agroforestry system is crop-dominant?",
          options: ["Silvopasture", "Agrosilviculture", "Silvoagriculture", "Agrosilvipasture"],
          correctAnswer: "Agrosilviculture"
        },
        {
          question: "Which of the following is an economic benefit of agroforestry?",
          options: [
            "Improved microclimate",
            "Diversified land outputs",
            "Reduction of soil surface run-off",
            "Reduction in weed infestation"
          ],
          correctAnswer: "Diversified land outputs"
        },
        {
          question: "What type of interaction does agroforestry emphasize?",
          options: [
            "Competition between components",
            "Separation of components",
            "Active manipulation between components",
            "Avoidance of physical interaction"
          ],
          correctAnswer: "Active manipulation between components"
        },
        {
          question: "What is a limitation of agroforestry related to trees?",
          options: [
            "Increased soil fertility",
            "Competition with food crops",
            "Reduction in evaporation",
            "Improved biodiversity"
          ],
          correctAnswer: "Competition with food crops"
        },
        {
          question: "Which term describes the structural and functional combination of components in agroforestry?",
          options: ["Intensive", "Interactive", "Integrated", "Intentional"],
          correctAnswer: "Integrated"
        },
        {
          question: "What agroforestry system was widely practiced in Finland until the late 19th century?",
          options: [
            "Slash-and-burn cultivation with tree planting",
            "Taungya system",
            "Shifting cultivation",
            "Village forestry"
            ],
          correctAnswer: "Slash-and-burn cultivation with tree planting"
        },
        {
          question: "Which country used the Taungya system first for forest plantations?",
          options: ["India", "Myanmar", "Bangladesh", "Philippines"],
          correctAnswer: "Myanmar"
        },
          {
            question: "What organization was established in Nairobi, Kenya, in 1977 to lead agroforestry research?",
            options: [
              "International Development Research Centre (IDRC)",
              "International Council for Research in Agroforestry (ICRAF)",
              "World Agroforestry Centre",
              "Bangladesh Forest Research Institute (BFRI)"
            ],
            correctAnswer: "International Council for Research in Agroforestry (ICRAF)"
          },
          {
            question: "When was the Taungya system first introduced in Bangladesh?",
            options: ["1862", "1912", "1979", "1988"],
            correctAnswer: "1912"
          },
          {
            question: "What was the first agroforestry program started by the Bangladesh Forest Department?",
            options: [
              "Jhoomia Rehabilitation Program",
              "Betagi-Pomora Community Forestry Project",
              "Village and Farm Forestry Program (VFFP)",
              "On-Farm Research Division (OFRD)"
            ],
            correctAnswer: "Betagi-Pomora Community Forestry Project"
          },
          {
            question: "Which year saw the introduction of Agroforestry as a degree course in the University of Chittagong?",
            options: ["1987", "1988", "1990", "1994"],
            correctAnswer: "1988"
          },
          {
            question: "Which organization provided financial assistance to establish the Village and Farm Forestry Program (VFFP)?",
            options: [
              "World Bank",
              "Swiss Agency for Development and Cooperation (SDC)",
              "International Development Research Centre (IDRC)",
              "UNESCO"
            ],
            correctAnswer: "Swiss Agency for Development and Cooperation (SDC)"
          },
          {
            question: "What year was the Department of Agroforestry and Environment established at BSMRAU?",
            options: ["1990", "1994", "1996", "1997"],
            correctAnswer: "1994"
          },
          {
            question: "Who led the establishment of the Department of Agroforestry at SAU?",
            options: [
              "Sir Dietrich Brandis",
              "Professor M.A. Haque",
              "Professor Abdul Haque",
              "Professor Abdul Karim"
            ],
            correctAnswer: "Professor M.A. Haque"
          },
          {
            question: "What was the primary focus of the Jhoomia Rehabilitation Program in 1980?",
            options: [
              "Afforestation with crop integration",
              "Introduction of Taungya system",
              "Wildlife conservation",
              "Shifting cultivation practices"
            ],
        correctAnswer: "Afforestation with crop integration"
      },
      {
        question: "What is the primary focus of agroforestry in rural homesteads in Bangladesh?",
        options: [
            "Industrial development",
            "Providing food, fuel, fodder, and shelter",
            "Urban afforestation",
            "Export-oriented timber production"
          ],
          correctAnswer: "Providing food, fuel, fodder, and shelter"
        },
        {
          question: "What percentage of Bangladesh's land area is estimated to be hilly?",
          options: ["5-10%", "10-15%", "20-25%", "30-35%"],
          correctAnswer: "10-15%"
        },
        {
          question: "Which type of area is **NOT** mentioned as a prospective area for agroforestry in Bangladesh?",
          options: [
            "Crop land",
            "Deserts",
            "Coastal areas",
            "Road and railway embankments"
          ],
          correctAnswer: "Deserts"
        },
        {
          question: "Which tree quality is NOT preferred for agroforestry?",
          options: [
            "Deep-rooted trees",
            "Trees with dense and wide canopies",
            "Trees that survive pruning",
            "Trees that provide nutrients to soil"
          ],
          correctAnswer: "Trees with dense and wide canopies"
        },
        {
          question: "What is the length of Bangladesh's coastal area?",
          options: ["500 km", "710 km", "1000 km", "1500 km"],
          correctAnswer: "710 km"
        },
        {
          question: "Which product is NOT commonly produced through agroforestry systems?",
          options: [
            "Medicinal plants",
            "Charcoal",
            "Fossil fuels",
            "Craft materials"
          ],
          correctAnswer: "Fossil fuels"
        },
        {
          question: "Which ecological benefit is associated with agroforestry?",
          options: [
            "Reduction of unemployment",
            "Soil and water conservation",
            "Reduction of export costs",
            "Expansion of urban areas"
          ],
          correctAnswer: "Soil and water conservation"
        },
        {
          question: "What is the approximate net cropper area in Bangladesh?",
          options: ["5.5 million ha", "6.5 million ha", "8.0 million ha", "8.5 million ha"],
          correctAnswer: "8.0 million ha"
        },
        {
          question: "How much current fallow land is cultivable in Bangladesh?",
          options: ["0.12 million ha", "0.27 million ha", "0.39 million ha", "0.45 million ha"],
          correctAnswer: "0.27 million ha"
        },
        {
          question: "Which of the following is a key feature of agroforestry in rural homesteads?",
          options: [
            "Large-scale monoculture farming",
            "Combination of trees, crops, and livestock",
            "Heavy industrial machinery",
            "Use of inorganic fertilizers only"
          ],
          correctAnswer: "Combination of trees, crops, and livestock"
        }                  
    ],
    'concept of seed': [
      {
        "question": "What is a key feature of Recurrent Apomixis?",
        "options": [
          "Embryo originates directly from the egg nucleolus",
          "Embryo originates from the nucellus or integument",
          "Embryo originates from the egg mother cell without meiosis",
          "Embryo forms in vegetative buds"
        ],
        "correctAnswer": "Embryo originates from the egg mother cell without meiosis"
      },
      {
        "question": "Which type of seed originates from the nucellus or integument?",
        "options": [
          "Recurrent Apomixis",
          "Adventitious Embryony",
          "Non-recurrent Apomixis",
          "Vegetative Apomixis"
        ],
        "correctAnswer": "Adventitious Embryony"
      },
      {
        "question": "What is the key distinction of Non-recurrent Apomixis?",
        "options": [
          "Embryo forms from vegetative buds",
          "Embryo originates from egg nucleolus directly",
          "Embryo originates from the nucellus",
          "Embryo is fertilized through meiosis"
        ],
        "correctAnswer": "Embryo originates from egg nucleolus directly"
      },
      {
        "question": "Which is NOT an example of a botanical seed?",
        "options": [
          "Rice",
          "Jute",
          "Wheat",
          "Tuber of Potato"
        ],
        "correctAnswer": "Tuber of Potato"
      },
      {
        "question": "Which of the following is an agricultural seed?",
        "options": [
          "Sett of Sugarcane",
          "Rice",
          "Wheat",
          "Jute"
        ],
        "correctAnswer": "Sett of Sugarcane"
      },
      {
        "question": "What is one role of seeds in plant improvement?",
        "options": [
          "As a source of flavor and odor",
          "As an aid in hybridization",
          "For earning foreign currency",
          "For beautification"
        ],
        "correctAnswer": "As an aid in hybridization"
      },
      {
        "question": "Which of the following industries uses seeds?",
        "options": [
          "Construction",
          "Automotive",
          "Chemical",
          "Real Estate"
        ],
        "correctAnswer": "Chemical"
      },
      {
        "question": "Which apomixis method involves vegetative buds or bulbils?",
        "options": [
          "Recurrent Apomixis",
          "Adventitious Embryony",
          "Non-recurrent Apomixis",
          "Vegetative Apomixis"
        ],
        "correctAnswer": "Vegetative Apomixis"
      },
      {
        "question": "What is an example of a seed used for beautification?",
        "options": [
          "Curry",
          "Polaw",
          "Citrus",
          "Onion"
        ],
        "correctAnswer": "Citrus"
      },
      {
        "question": "Which is a benefit of using high-quality seeds in agriculture?",
        "options": [
          "Produces good food",
          "Reduces foreign currency",
          "Increases weeds",
          "Decreases genetic diversity"
        ],
        "correctAnswer": "Produces good food"
      },
      {
        "question": "What is the primary function of a seed?",
        "options": [
          "Sustain and multiply plant species",
          "Serve as a food source for animals",
          "Provide aesthetic value",
          "Facilitate photosynthesis"
        ],
        "correctAnswer": "Sustain and multiply plant species"
      },
      {
        "question": "What is a botanical seed?",
        "options": [
          "A fertilized ovule containing a dormant embryo",
          "A seed without a seed coat",
          "Any plant part capable of propagation",
          "A seed produced without fertilization"
        ],
        "correctAnswer": "A fertilized ovule containing a dormant embryo"
      },
      {
        "question": "Which of the following is an example of an agricultural seed?",
        "options": [
          "Rice seed",
          "Banana sucker",
          "Wheat seed",
          "Jute seed"
        ],
        "correctAnswer": "Banana sucker"
      },
      {
        "question": "What distinguishes naked seeds from covered seeds?",
        "options": [
          "Naked seeds lack a seed coat; covered seeds have one",
          "Naked seeds are always monocots",
          "Covered seeds are found in gymnosperms",
          "Covered seeds lack endosperm"
        ],
        "correctAnswer": "Naked seeds lack a seed coat; covered seeds have one"
      },
      {
        "question": "Which type of seed contains two cotyledons?",
        "options": [
          "Monocot seed",
          "Dicot seed",
          "Polycot seed",
          "Endospermic seed"
        ],
        "correctAnswer": "Dicot seed"
      },
      {
        "question": "What is a characteristic of endospermic seeds?",
        "options": [
          "They lack albumin",
          "They contain more than one embryo",
          "They contain endosperm",
          "They are always non-fertilized"
        ],
        "correctAnswer": "They contain endosperm"
      },
      {
        "question": "Which seeds are produced without fertilization?",
        "options": [
          "Fertilized seeds",
          "Endospermic seeds",
          "Non-fertilized seeds",
          "Polycot seeds"
        ],
        "correctAnswer": "Non-fertilized seeds"
      },
      {
        "question": "What type of seed is found in plants that do not produce fruit?",
        "options": [
          "Monocot seed",
          "Naked seed",
          "Polycot seed",
          "Covered seed"
        ],
        "correctAnswer": "Naked seed"
      },
      {
        "question": "What distinguishes monoembryonic seeds from polyembryonic seeds?",
        "options": [
          "Monoembryonic seeds have only one cotyledon",
          "Monoembryonic seeds contain a single embryo",
          "Polyembryonic seeds lack endosperm",
          "Polyembryonic seeds are always non-fertilized"
        ],
        "correctAnswer": "Monoembryonic seeds contain a single embryo"
      },
      {
        "question": "Which of the following is an example of a polycot seed?",
        "options": [
          "Rice seed",
          "Pine seed",
          "Wheat seed",
          "Jute seed"
        ],
        "correctAnswer": "Pine seed"
      }
    ],
    'soil classification': [
      {
        question: "What is the primary basis of early soil classification systems?",
        options: [
          "Multiple characteristics",
          "Single characteristic",
          "Complex algorithms",
          "Random sampling"
        ],
        correctAnswer: "Single characteristic"
      },
      {
        question: "Which classification system groups soils based on their texture?",
        options: [
          "Economic Classification",
          "Physical Classification",
          "Chemical Classification",
          "Geological Classification"
        ],
        correctAnswer: "Physical Classification"
      },
      {
        question: "What is the main purpose of economic classification of soils?",
        options: [
          "Research purposes",
          "Taxation",
          "Crop selection",
          "Water management"
        ],
        correctAnswer: "Taxation"
      },
      {
        question: "Which type of soil classification considers parent rock material?",
        options: [
          "Physical Classification",
          "Chemical Classification",
          "Geological Classification",
          "Physiographic Classification"
        ],
        correctAnswer: "Geological Classification"
      },
      {
        question: "What characteristic defines soil as a natural body?",
        options: [
          "Its color",
          "Its formation through soil-forming factors",
          "Its location",
          "Its temperature"
        ],
        correctAnswer: "Its formation through soil-forming factors"
      },
      {
        question: "Which is NOT a purpose of soil classification?",
        options: [
          "Organizing knowledge",
          "Recognizing properties",
          "Weather forecasting",
          "Technology transfer"
        ],
        correctAnswer: "Weather forecasting"
      },
      {
        question: "What type of system is modern soil classification?",
        options: [
          "Single categorical",
          "Binary",
          "Multi categorical",
          "Random"
        ],
        correctAnswer: "Multi categorical"
      },
      {
        question: "Which classification system uses landscape characteristics?",
        options: [
          "Economic Classification",
          "Physical Classification",
          "Chemical Classification",
          "Physiographic Classification"
        ],
        correctAnswer: "Physiographic Classification"
      },
      {
        question: "What is a key limitation of early classification systems?",
        options: [
          "Too complex",
          "Too expensive",
          "Based on single character",
          "Too time-consuming"
        ],
        correctAnswer: "Based on single character"
      },
      {
        question: "Which soil classification helps in transferring agro-technology?",
        options: [
          "Economic Classification",
          "Modern comprehensive system",
          "Physical Classification",
          "Chemical Classification"
        ],
        correctAnswer: "Modern comprehensive system"
      },
      {
        question: "Who developed the first genetic system of soil classification?",
        options: [
          "Marbut",
          "Baldwin",
          "Dokuchaiev",
          "Kellog"
        ],
        correctAnswer: "Dokuchaiev"
      },
      {
        question: "Which soils show accumulation of iron and aluminum in Marbut's system?",
        options: [
          "Pedocals",
          "Pedalfers",
          "Azonal",
          "Intrazonal"
        ],
        correctAnswer: "Pedalfers"
      },
      {
        question: "In which year was Baldwin's genetic system introduced?",
        options: [
          "1900",
          "1927",
          "1938",
          "1949"
        ],
        correctAnswer: "1938"
      },
      {
        question: "Which soil type is an example of Azonal soils?",
        options: [
          "Podzol",
          "Chestnut",
          "Alluvial",
          "Calcimorphic"
        ],
        correctAnswer: "Alluvial"
      },
      {
        question: "Which factor limits the development of Azonal soils?",
        options: [
          "Climate",
          "Time",
          "Vegetation",
          "Parent material"
        ],
        correctAnswer: "Time"
      },
      {
        question: "Which system introduced the concept of Pedalfers and Pedocals?",
        options: [
          "Dokuchaiev's System",
          "Marbut's System",
          "Baldwin's System",
          "Russian System"
        ],
        correctAnswer: "Marbut's System"
      },
      {
        question: "How many suborders were included in Baldwin's system?",
        options: [
          "Three",
          "Five",
          "Seven",
          "Nine"
        ],
        correctAnswer: "Nine"
      },
      {
        question: "Which soil type shows the influence of local conditions like topography?",
        options: [
          "Zonal",
          "Intrazonal",
          "Azonal",
          "Normal"
        ],
        correctAnswer: "Intrazonal"
      },
      {
        question: "What is a characteristic feature of Pedocals?",
        options: [
          "Iron accumulation",
          "Aluminum accumulation",
          "Calcium carbonate accumulation",
          "Salt accumulation"
        ],
        correctAnswer: "Calcium carbonate accumulation"
      },
      {
        question: "Which scientist was from Russia?",
        options: [
          "Baldwin",
          "Marbut",
          "Dokuchaiev",
          "Kellog"
        ],
        correctAnswer: "Dokuchaiev"
      }
    ],
    'soil taxonomy- a comprehensive system': [
      {
        question: "When was the comprehensive System of Soil Classification (7th approximation) published?",
        options: [
          "1950",
          "1960",
          "1970",
          "1980"
        ],
        correctAnswer: "1960"
      },
      {
        question: "What is the usual surface area of a soil pedon?",
        options: [
          "0.5 m²",
          "1 m²",
          "1.5 m²",
          "2 m²"
        ],
        correctAnswer: "1 m²"
      },
      {
        question: "Which epipedon contains more than 250 ppm of available phosphorus?",
        options: [
          "Mollic",
          "Anthropic",
          "Umbric",
          "Ochric"
        ],
        correctAnswer: "Anthropic"
      },
      {
        question: "What is the base saturation percentage in Mollic epipedon?",
        options: [
          "> 50%",
          "< 50%",
          "= 50%",
          "No specific requirement"
        ],
        correctAnswer: "> 50%"
      },
      {
        question: "Which epipedon is characterized by low bulk density (<0.9 gcc-1)?",
        options: [
          "Histic",
          "Plaggen",
          "Folistic",
          "Melanic"
        ],
        correctAnswer: "Melanic"
      },
      {
        question: "What is the minimum thickness requirement for Plaggen epipedon?",
        options: [
          "30 cm",
          "40 cm",
          "50 cm",
          "60 cm"
        ],
        correctAnswer: "50 cm"
      },
      {
        question: "Which epipedon remains saturated with water for 30 days or more during some season?",
        options: [
          "Folistic",
          "Histic",
          "Melanic",
          "Ochric"
        ],
        correctAnswer: "Histic"
      },
      {
        question: "What is the organic matter content requirement for Ochric epipedon?",
        options: [
          "More than 1%",
          "Less than 1%",
          "Equal to 1%",
          "No requirement"
        ],
        correctAnswer: "Less than 1%"
      },
      {
        question: "Which epipedon is formed through decomposition of grass vegetation?",
        options: [
          "Anthropic",
          "Mollic",
          "Melanic",
          "Umbric"
        ],
        correctAnswer: "Melanic"
      },
      {
        question: "What type of structure does Ochric epipedon have when dry?",
        options: [
          "Granular",
          "Prismatic",
          "Massive",
          "Columnar"
        ],
        correctAnswer: "Massive"
      },
      {
        question: "What is the minimum clay content increase required in an Argillic horizon if the eluvial layer contains <15% clay?",
        options: [
          "1%",
          "3%",
          "5%",
          "8%"
        ],
        correctAnswer: "3%"
      },
      {
        question: "What is the minimum ESP (Exchangeable Sodium Percent) required for a Natric horizon?",
        options: [
          "5%",
          "10%",
          "15%",
          "20%"
        ],
        correctAnswer: "15%"
      },
      {
        question: "Which horizon is characterized by being brittle when moist and very hard when dry?",
        options: [
          "Duripan",
          "Fragipan",
          "Calcic",
          "Oxic"
        ],
        correctAnswer: "Fragipan"
      },
      {
        question: "What is the minimum thickness requirement for a Gypsic horizon?",
        options: [
          "10 cm",
          "15 cm",
          "20 cm",
          "25 cm"
        ],
        correctAnswer: "15 cm"
      },
      {
        question: "Which horizon is enriched with Fe and Al oxides?",
        options: [
          "Albic",
          "Spodic",
          "Oxic",
          "Cambic"
        ],
        correctAnswer: "Oxic"
      },
      {
        question: "What is the minimum soluble salt content required in a Salic horizon?",
        options: [
          "1%",
          "2%",
          "3%",
          "4%"
        ],
        correctAnswer: "2%"
      },
      {
        question: "Which horizon is formed directly under the plough layer?",
        options: [
          "Agric",
          "Argillic",
          "Albic",
          "Calcic"
        ],
        correctAnswer: "Agric"
      },
      {
        question: "Which horizon is also known as the bleached E horizon?",
        options: [
          "Spodic",
          "Albic",
          "Cambic",
          "Natric"
        ],
        correctAnswer: "Albic"
      },
      {
        question: "What type of structure is characteristic of a Natric horizon?",
        options: [
          "Granular",
          "Blocky",
          "Prismatic or columnar",
          "Platy"
        ],
        correctAnswer: "Prismatic or columnar"
      },
      {
        question: "Which horizon does not slake in water or HCl?",
        options: [
          "Fragipan",
          "Duripan",
          "Calcic",
          "Gypsic"
        ],
        correctAnswer: "Duripan"
      }
    ],
    'soil moisture and temperature regimes': [
      {
        question: "At what moisture tension is soil considered dry?",
        options: [
          "5 bar or more",
          "10 bar or more",
          "15 bar or more",
          "20 bar or more"
        ],
        correctAnswer: "15 bar or more"
      },
      {
        question: "Which moisture regime is characterized by poorly drained soils?",
        options: [
          "Udic",
          "Aquic",
          "Xeric",
          "Ustic"
        ],
        correctAnswer: "Aquic"
      },
      {
        question: "In Udic regime, the SMCS is not dry for how many cumulative days?",
        options: [
          "45 days",
          "60 days",
          "75 days",
          "90 days"
        ],
        correctAnswer: "90 days"
      },
      {
        question: "What is the MAST requirement for Xeric moisture regime?",
        options: [
          "< 22°C",
          "> 22°C",
          "= 22°C",
          "No specific requirement"
        ],
        correctAnswer: "< 22°C"
      },
      {
        question: "In Aridic regime, SMCS is dry throughout for more than how many cumulative days?",
        options: [
          "90 days",
          "120 days",
          "150 days",
          "180 days"
        ],
        correctAnswer: "180 days"
      },
      {
        question: "When does the summer solstice begin?",
        options: [
          "21st June",
          "22nd June",
          "23rd June",
          "24th June"
        ],
        correctAnswer: "22nd June"
      },
      {
        question: "What is the minimum temperature requirement for soil moisture consideration in Aridic regime?",
        options: [
          "> 5°C",
          "> 6°C",
          "> 7°C",
          "> 8°C"
        ],
        correctAnswer: "> 5°C"
      },
      {
        question: "In Ustic regime with MAST > 22°C, what is the difference between MSST and MWST?",
        options: [
          "< 3°C",
          "< 4°C",
          "< 5°C",
          "> 5°C"
        ],
        correctAnswer: "< 5°C"
      },
      {
        question: "When does the winter solstice begin?",
        options: [
          "21st December",
          "22nd December",
          "23rd December",
          "24th December"
        ],
        correctAnswer: "23rd December"
      },
      {
        question: "Which moisture regime is characterized by negligible moisture?",
        options: [
          "Udic",
          "Ustic",
          "Xeric",
          "Aridic and torric"
        ],
        correctAnswer: "Aridic and torric"
      },
      {
        question: "What is the mean annual soil temperature range for Mesic regime?",
        options: [
          "0 to < 8°C",
          "8 to < 15°C",
          "15 to < 22°C",
          "22 to < 28°C"
        ],
        correctAnswer: "8 to < 15°C"
      },
      {
        question: "Which temperature regime is characterized by permanent frost?",
        options: [
          "Cryic",
          "Frigid",
          "Pergelic",
          "Mesic"
        ],
        correctAnswer: "Pergelic"
      },
      {
        question: "What is the minimum temperature requirement for Hyperthermic regime?",
        options: [
          "15°C",
          "22°C",
          "28°C",
          "8°C"
        ],
        correctAnswer: "22°C"
      },
      {
        question: "When is the 'iso' prefix used in STRs?",
        options: [
          "When MSST-MWST > 5°C",
          "When MSST-MWST < 5°C",
          "When MSST-MWST = 5°C",
          "When MSST-MWST = 0°C"
        ],
        correctAnswer: "When MSST-MWST < 5°C"
      },
      {
        question: "What is the maximum temperature for Cryic regime?",
        options: [
          "0°C",
          "8°C",
          "15°C",
          "22°C"
        ],
        correctAnswer: "8°C"
      },
      {
        question: "Which regime has a mean annual soil temperature of 28°C or higher?",
        options: [
          "Thermic",
          "Hyperthermic",
          "Megathermic",
          "Isothermic"
        ],
        correctAnswer: "Megathermic"
      },
      {
        question: "At which classification level are STRs primarily used?",
        options: [
          "Order level",
          "Family and suborder levels",
          "Series level",
          "Great group level"
        ],
        correctAnswer: "Family and suborder levels"
      },
      {
        question: "What is the temperature range for Thermic regime?",
        options: [
          "8 to < 15°C",
          "15 to < 22°C",
          "22 to < 28°C",
          "≥ 28°C"
        ],
        correctAnswer: "15 to < 22°C"
      },
      {
        question: "Which depth zone is considered for STR measurement?",
        options: [
          "0 to 50 cm",
          "5 to 100 cm",
          "0 to 100 cm",
          "10 to 150 cm"
        ],
        correctAnswer: "5 to 100 cm"
      },
      {
        question: "What distinguishes Frigid from Cryic regime?",
        options: [
          "Lower temperatures",
          "Higher temperatures",
          "Warmer summers",
          "Colder winters"
        ],
        correctAnswer: "Warmer summers"
      }
    ],
    'categories in soil taxonomy': [
      {
        question: "How many soil orders are there in the Soil Taxonomy system?",
        options: [
          "6",
          "10",
          "12",
          "15"
        ],
        correctAnswer: "12"
      },
      {
        question: "What is the formative element for Vertisols derived from?",
        options: [
          "Greek word for 'black'",
          "Latin word for 'turn'",
          "Japanese word for 'soil'",
          "French word for 'green'"
        ],
        correctAnswer: "Latin word for 'turn'"
      },
      {
        question: "What is the minimum clay content required for Vertisols?",
        options: [
          "10 percent",
          "20 percent",
          "30 percent",
          "40 percent"
        ],
        correctAnswer: "30 percent"
      },
      {
        question: "Which soil order represents the beginning stage of soil formation?",
        options: [
          "Entisol",
          "Inceptisol",
          "Vertisol",
          "Alfisol"
        ],
        correctAnswer: "Inceptisol"
      },
      {
        question: "How many suborders are recognized in Soil Taxonomy?",
        options: [
          "43",
          "53",
          "63",
          "73"
        ],
        correctAnswer: "63"
      },
      {
        question: "Which formative element is a nonsense symbol?",
        options: [
          "ert",
          "ept",
          "ent",
          "od"
        ],
        correctAnswer: "ent"
      },
      {
        question: "Approximately how many soil series are identified in Bangladesh?",
        options: [
          "300+",
          "400+",
          "500+",
          "600+"
        ],
        correctAnswer: "500+"
      },
      {
        question: "What is the minimum depth of cracks required in Vertisols?",
        options: [
          "30 cm",
          "40 cm",
          "50 cm",
          "60 cm"
        ],
        correctAnswer: "50 cm"
      },
      {
        question: "Which of these is a suborder of Entisols?",
        options: [
          "Aquepts",
          "Aquents",
          "Uderts",
          "Ustepts"
        ],
        correctAnswer: "Aquents"
      },
      {
        question: "The formative element 'el' in Gelisols comes from which language?",
        options: [
          "Latin",
          "French",
          "Greek",
          "Japanese"
        ],
        correctAnswer: "Greek"
      },
      {
        question: "What is the minimum base saturation requirement for Mollisols?",
        options: [
          "30 percent",
          "35 percent",
          "40 percent",
          "50 percent"
        ],
        correctAnswer: "50 percent"
      },
      {
        question: "What is the maximum bulk density for Andisols?",
        options: [
          "0.07 g/cc",
          "0.08 g/cc",
          "0.09 g/cc",
          "0.10 g/cc"
        ],
        correctAnswer: "0.09 g/cc"
      },
      {
        question: "What is the minimum thickness requirement for the peaty horizon in Histosols?",
        options: [
          "60 cm",
          "70 cm",
          "80 cm",
          "90 cm"
        ],
        correctAnswer: "80 cm"
      },
      {
        question: "Which soil order requires a minimum of 60% volcanic ash within 60 cm of mineral soil?",
        options: [
          "Oxisols",
          "Andisols",
          "Histosols",
          "Gelisols"
        ],
        correctAnswer: "Andisols"
      },
      {
        question: "What is the base saturation requirement for Ultisols?",
        options: [
          "< 25%",
          "< 30%",
          "< 35%",
          "< 40%"
        ],
        correctAnswer: "< 35%"
      }
    ],
    'concept of seed technology': [
      {
        question: "What is Seed Technology primarily concerned with?",
        options: [
          "Seed production and processing",
          "Soil management",
          "Crop rotation",
          "Pest control"
        ],
        correctAnswer: "Seed production and processing"
      },
      {
        question: "According to Feistritzer (1975), what is one role of improved seed?",
        options: [
          "A carrier of new technologies",
          "A source of pollution",
          "A method of irrigation",
          "A type of fertilizer"
        ],
        correctAnswer: "A carrier of new technologies"
      },
      {
        question: "What percentage increase in wheat production was observed in India due to high yielding varieties?",
        options: [
          "10 million tons",
          "12 million tons",
          "31.3 million tons",
          "20 million tons"
        ],
        correctAnswer: "31.3 million tons"
      },
      {
        question: "What is the significance of seed certification?",
        options: [
          "To ensure seed quality",
          "To increase soil fertility",
          "To reduce pest infestations",
          "To improve irrigation methods"
        ],
        correctAnswer: "To ensure seed quality"
      },
      {
        question: "What is the main benefit of seed testing?",
        options: [
          "Assessing seed viability",
          "Increasing crop yield",
          "Reducing water usage",
          "Improving soil health"
        ],
        correctAnswer: "Assessing seed viability"
      },
      {
        question: "What is the role of improved seed in less favorable production areas?",
        options: [
          "To decrease crop yields",
          "To secure higher crop yields",
          "To eliminate pests",
          "To reduce soil erosion"
        ],
        correctAnswer: "To secure higher crop yields"
      },
      {
        question: "What is the primary focus of seed technology in a narrow sense?",
        options: [
          "Seed marketing",
          "Seed production techniques",
          "Soil conservation",
          "Crop rotation"
        ],
        correctAnswer: "Seed production techniques"
      },
      {
        question: "What is the impact of improved seeds on traditional agricultural inputs?",
        options: [
          "They decrease their effectiveness",
          "They have no impact",
          "They enhance their effectiveness",
          "They replace them"
        ],
        correctAnswer: "They enhance their effectiveness"
      },
      {
        question: "What is the relationship between seed technology and food security?",
        options: [
          "Seed technology has no impact on food security",
          "Seed technology decreases food security",
          "Seed technology ensures food security",
          "Seed technology complicates food security"
        ],
        correctAnswer: "Seed technology ensures food security"
      },
      {
        question: "What is the main goal of seed technology?",
        options: [
          "To produce more pests",
          "To improve seed quality and yield",
          "To reduce crop diversity",
          "To eliminate traditional farming methods"
        ],
        correctAnswer: "To improve seed quality and yield"
      },
      {
        question: "What is the primary goal of Seed Technology?",
        options: [
          "Increase agricultural production",
          "Reduce seed prices",
          "Eliminate pests",
          "Improve soil quality"
        ],
        correctAnswer: "Increase agricultural production"
      },
      {
        question: "What does timely supply in Seed Technology ensure?",
        options: [
          "Seeds are available at any time",
          "Seeds are available when needed for planting",
          "Seeds are only available in the off-season",
          "Seeds are only available for large farms"
        ],
        correctAnswer: "Seeds are available when needed for planting"
      },
      {
        question: "Why is assured high quality of seeds important?",
        options: [
          "To ensure expected dividends from improved varieties",
          "To reduce the cost of seeds",
          "To increase the number of seed varieties",
          "To eliminate the need for fertilizers"
        ],
        correctAnswer: "To ensure expected dividends from improved varieties"
      },
      {
        question: "What is a key aspect of rapid multiplication in Seed Technology?",
        options: [
          "Slow spread of new varieties",
          "Quick spread of new varieties developed by plant breeders",
          "No focus on seed quality",
          "Limited access to seeds"
        ],
        correctAnswer: "Quick spread of new varieties developed by plant breeders"
      },
      {
        question: "What significant event occurred in 1869 in Britain?",
        options: [
          "Seed Act passed",
          "First seed testing station established",
          "American Seed Association established",
          "Green Revolution started"
        ],
        correctAnswer: "Seed Act passed"
      },
      {
        question: "What does the acronym OECD stand for?",
        options: [
          "Organization for Economic Cooperation and Development",
          "Office of Environmental Conservation and Development",
          "Organization for Education and Cultural Development",
          "Office of Economic Cooperation and Development"
        ],
        correctAnswer: "Organization for Economic Cooperation and Development"
      },
      {
        question: "What was established in 1924?",
        options: [
          "American Seed Association",
          "International Seed Testing Association",
          "Green Revolution",
          "Seed Act in Britain"
        ],
        correctAnswer: "International Seed Testing Association"
      },
      {
        question: "What is the significance of the Green Revolution?",
        options: [
          "It decreased agricultural production",
          "It led to significant increases in agricultural production",
          "It focused solely on livestock",
          "It eliminated the need for seeds"
        ],
        correctAnswer: "It led to significant increases in agricultural production"
      },
      {
        question: "What is a reasonable price for high-quality seeds important for?",
        options: [
          "Accessibility for average farmers",
          "Increasing seed prices",
          "Limiting seed availability",
          "Reducing agricultural production"
        ],
        correctAnswer: "Accessibility for average farmers"
      },
      {
        question: "What is the role of National Seed Sticks in disaster situations?",
        options: [
          "To provide immediate access to improved seeds",
          "To eliminate the need for seeds",
          "To increase seed prices",
          "To reduce crop yields"
        ],
        correctAnswer: "To provide immediate access to improved seeds"
      },
      {
        question: "What significant event occurred in 1908 in Bangladesh related to seed technology?",
        options: [
          "Establishment of Agricultural Research Institute",
          "First seed multiplication farm established",
          "Seed Act passed",
          "National Seed Board established"
        ],
        correctAnswer: "Establishment of Agricultural Research Institute"
      },
      {
        question: "In what year were seed multiplication farms established in Bangladesh?",
        options: [
          "1954",
          "1961",
          "1974",
          "1980"
        ],
        correctAnswer: "1954"
      },
      {
        question: "What was the purpose of the East Pakistan Agricultural Development Corporation established in 1961?",
        options: [
          "To improve soil quality",
          "To undertake seed supply",
          "To regulate seed prices",
          "To promote organic farming"
        ],
        correctAnswer: "To undertake seed supply"
      },
      {
        question: "What major development occurred in 1974 in the seed sector?",
        options: [
          "Seed multiplication farms established",
          "National Seed Board and Seed Certification Agency established",
          "First organized seed supply of wheat",
          "Green Revolution started"
        ],
        correctAnswer: "National Seed Board and Seed Certification Agency established"
      },
      {
        question: "What was the significance of the Seeds Ordinance promulgated in 1977?",
        options: [
          "To promote organic farming",
          "To provide a legal framework for seed regulation",
          "To eliminate seed imports",
          "To increase seed prices"
        ],
        correctAnswer: "To provide a legal framework for seed regulation"
      },
      {
        question: "What was established in 1993 to enhance the seed supply system?",
        options: [
          "National Seed Policy",
          "Seed Certification Agency",
          "Agricultural Research Institute",
          "Seed Multiplication Farms"
        ],
        correctAnswer: "National Seed Policy"
      },
      {
        question: "What was the first organized supply of wheat seed in Bangladesh?",
        options: [
          "576 tons in 1976",
          "1000 tons in 1980",
          "500 tons in 1990",
          "200 tons in 1995"
        ],
        correctAnswer: "576 tons in 1976"
      },
      {
        question: "What significant agricultural movement started in the 1960s?",
        options: [
          "Green Revolution",
          "Seed Ordinance",
          "Seed Policy",
          "Seed Certification"
        ],
        correctAnswer: "Green Revolution"
      },
      {
        question: "What is the role of the OECD scheme established in 1958?",
        options: [
          "To promote seed quality",
          "To regulate seed prices",
          "To eliminate seed imports",
          "To increase crop yields"
        ],
        correctAnswer: "To promote seed quality"
      },
      {
        question: "What is a key component of the seed legislation in Bangladesh?",
        options: [
          "The Seeds Ordinance, 1977",
          "The Seed Act, 2018",
          "The Seeds Policy, 1993",
          "All of the above"
        ],
        correctAnswer: "All of the above"
      }
    ],
    'mouth parts_mizan sir': [
      {
        question: "What are mouthparts in insects?",
        options: [
          "Structures for locomotion",
          "Structures for feeding",
          "Structures for reproduction",
          "Structures for respiration"
        ],
        correctAnswer: "Structures for feeding"
      },
      {
        question: "Which type of mouthparts is adapted for cutting and grinding solid food?",
        options: [
          "Piercing-sucking",
          "Chewing",
          "Siphoning",
          "Sponging"
        ],
        correctAnswer: "Chewing"
      },
      {
        question: "What is the function of the labium in chewing mouthparts?",
        options: [
          "To protect the mandibles",
          "To push food into the esophagus",
          "To cut food",
          "To hold the food"
        ],
        correctAnswer: "To push food into the esophagus"
      },
      {
        question: "Which insects possess chewing mouthparts?",
        options: [
          "Mosquitoes and fleas",
          "Cockroaches and grasshoppers",
          "Butterflies and moths",
          "Bees and wasps"
        ],
        correctAnswer: "Cockroaches and grasshoppers"
      },
      {
        question: "What is unique about the mouthparts of thrips?",
        options: [
          "They are symmetrical",
          "They have a long proboscis",
          "They are asymmetrical",
          "They are absent"
        ],
        correctAnswer: "They are asymmetrical"
      },
      {
        question: "What do piercing-sucking mouthparts allow insects to do?",
        options: [
          "Cut solid food",
          "Suck sap or blood",
          "Rasp host tissues",
          "Siphon nectar"
        ],
        correctAnswer: "Suck sap or blood"
      },
      {
        question: "Which type of mouthparts is used by mosquitoes?",
        options: [
          "Chewing",
          "Piercing-sucking",
          "Sponging",
          "Rasping-sucking"
        ],
        correctAnswer: "Piercing-sucking"
      },
      {
        question: "What do the outer stylets in piercing-sucking mouthparts derive from?",
        options: [
          "Maxillae",
          "Mandibles",
          "Labium",
          "Hypopharynx"
        ],
        correctAnswer: "Mandibles"
      },
      {
        question: "What is the primary function of rasping-sucking mouthparts?",
        options: [
          "To cut food",
          "To suck nectar",
          "To rasp host tissues",
          "To grind food"
        ],
        correctAnswer: "To rasp host tissues"
      },
      {
        question: "What type of mouthparts do bugs possess?",
        options: [
          "Chewing",
          "Piercing-sucking",
          "Siphoning",
          "Sponging"
        ],
        correctAnswer: "Piercing-sucking"
      },
      {
        question: "What are siphoning mouthparts specialized for?",
        options: [
          "Cutting solid food",
          "Uptake of flower nectar",
          "Rasping host tissues",
          "Sucking blood"
        ],
        correctAnswer: "Uptake of flower nectar"
      },
      {
        question: "Which part is much reduced in siphoning mouthparts?",
        options: [
          "Mandibles",
          "Maxillae",
          "Upper lip",
          "Labium"
        ],
        correctAnswer: "Upper lip"
      },
      {
        question: "What is the function of the proboscis in siphoning mouthparts?",
        options: [
          "To cut food",
          "To form a protective sheath",
          "To suck up liquids",
          "To grind food"
        ],
        correctAnswer: "To suck up liquids"
      },
      {
        question: "Which insects possess sponging mouthparts?",
        options: [
          "Butterflies",
          "House flies",
          "Grasshoppers",
          "Bees"
        ],
        correctAnswer: "House flies"
      },
      {
        question: "What do sponging mouthparts consist of?",
        options: [
          "A long proboscis",
          "A soft fleshy and retractile proboscis",
          "A pair of mandibles",
          "A pair of maxillae"
        ],
        correctAnswer: "A soft fleshy and retractile proboscis"
      },
      {
        question: "What is unique about chewing-lapping mouthparts?",
        options: [
          "They are used for cutting",
          "They are used for sucking nectar",
          "They have a combination of chewing mandibles and a specialized proboscis",
          "They are absent in insects"
        ],
        correctAnswer: "They have a combination of chewing mandibles and a specialized proboscis"
      },
      {
        question: "What is the role of the galea in chewing-lapping mouthparts?",
        options: [
          "To cut food",
          "To form a food channel",
          "To protect the mandibles",
          "To suck nectar"
        ],
        correctAnswer: "To form a food channel"
      },
      {
        question: "What do the labella in sponging mouthparts do?",
        options: [
          "Cut solid food",
          "Suck nectar",
          "Mop up liquid food",
          "Pierce skin"
        ],
        correctAnswer: "Mop up liquid food"
      },
      {
        question: "Which type of mouthparts do bees possess?",
        options: [
          "Chewing",
          "Sponging",
          "Siphoning",
          "Chewing-lapping"
        ],
        correctAnswer: "Chewing-lapping"
      },
      {
        question: "What is the primary function of the labium in sponging mouthparts?",
        options: [
          "To protect the mandibles",
          "To form a food channel",
          "To suck up nectar",
          "To hold food"
        ],
        correctAnswer: "To form a food channel"
      }
    ],
    'arthropoda_shakhawat sir': [
      {
        question: "What is the primary focus of entomology?",
        options: [
          "Study of mammals",
          "Study of birds",
          "Study of insects",
          "Study of plants"
        ],
        correctAnswer: "Study of insects",
        explanation: "<b>Entomology:</b> Entomology is the scientific study of insects, which includes their behavior, ecology, and physiology."
      },
      {
        question: "Which of the following is a characteristic of arthropods?",
        options: [
          "Presence of backbone",
          "Exoskeleton made of chitin",
          "Warm-blooded",
          "Hairy skin"
        ],
        correctAnswer: "Exoskeleton made of chitin",
        explanation: "<b>Characteristics of Arthropods:</b><br><br><table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Description</th></tr></thead><tbody><tr><td>Exoskeleton</td><td>Made of chitin, providing support and protection.</td></tr><tr><td>Jointed Appendages</td><td>Allows for movement and manipulation of the environment.</td></tr></tbody></table>"
      },
      {
        question: "How many pairs of walking legs do arachnids have?",
        options: [
          "Two pairs",
          "Four pairs",
          "Six pairs",
          "Eight pairs"
        ],
        correctAnswer: "Four pairs",
        explanation: "<b>Legs of Arachnids:</b><br><br>Arachnids, such as spiders and scorpions, have four pairs of walking legs, totaling eight legs."
      },
      {
        question: "What type of body division do arachnids have?",
        options: [
          "Head and thorax",
          "Cephalothorax and abdomen",
          "Head, thorax, and abdomen",
          "None of the above"
        ],
        correctAnswer: "Cephalothorax and abdomen",
        explanation: "<b>Body Structure of Arachnids:</b><br><br>Arachnids have a body divided into two main parts: the cephalothorax and the abdomen."
      },
      {
        question: "What is the main function of the exoskeleton in arthropods?",
        options: [
          "Support and protection",
          "Movement",
          "Digestion",
          "Respiration"
        ],
        correctAnswer: "Support and protection",
        explanation: "<b>Function of Exoskeleton:</b><br><br>The exoskeleton provides structural support, protects against predators, and prevents water loss."
      },
      {
        question: "Which of the following is NOT a class of arthropods?",
        options: [
          "Insecta",
          "Arachnida",
          "Mollusca",
          "Crustacea"
        ],
        correctAnswer: "Mollusca",
        explanation: "<b>Classes of Arthropoda:</b><br><br>Arthropoda includes classes such as Insecta, Arachnida, and Crustacea, but Mollusca is a separate phylum."
      },
      {
        question: "What is the heart structure in arthropods?",
        options: [
          "Tubular",
          "Spherical",
          "Flat",
          "None of the above"
        ],
        correctAnswer: "Tubular",
        explanation: "<b>Heart Structure:</b><br><br>The heart in arthropods is tubular and functions to circulate hemolymph throughout the body."
      },
      {
        question: "Which respiratory structure is found in some arthropods?",
        options: [
          "Gills",
          "Lungs",
          "Trachea",
          "All of the above"
        ],
        correctAnswer: "All of the above",
        explanation: "<b>Respiratory Structures:</b><br><br>Arthropods can have gills, trachea, or book lungs depending on their habitat and class."
      },
      {
        question: "What is the significance of sexual dimorphism in arthropods?",
        options: [
          "It helps in reproduction",
          "It aids in camouflage",
          "It is a sign of health",
          "None of the above"
        ],
        correctAnswer: "It helps in reproduction",
        explanation: "<b>Sexual Dimorphism:</b><br><br>Sexual dimorphism refers to the differences in appearance between male and female arthropods, which can aid in mating."
      },
      {
        question: "Which of the following is an example of an arachnid?",
        options: [
          "Butterfly",
          "Spider",
          "Ant",
          "Beetle"
        ],
        correctAnswer: "Spider",
        explanation: "<b>Examples of Arachnids:</b><br><br>Arachnids include spiders, scorpions, ticks, and mites, while butterflies and ants belong to different classes."
      },
      {
        question: "What is the primary body division of insects?",
        options: [
          "Head, thorax, and abdomen",
          "Head and thorax",
          "Thorax and abdomen",
          "None of the above"
        ],
        correctAnswer: "Head, thorax, and abdomen",
        explanation: "<b>Body Structure of Insects:</b><br><br>Insects have their bodies divided into three main parts: head, thorax, and abdomen."
      },
      {
        question: "How many pairs of legs do insects have?",
        options: [
          "Two pairs",
          "Three pairs",
          "Four pairs",
          "Five pairs"
        ],
        correctAnswer: "Three pairs",
        explanation: "<b>Legs of Insects:</b><br><br>Insects possess three pairs of thoracic legs."
      },
      {
        question: "What type of eyes do insects typically have?",
        options: [
          "Simple eyes only",
          "Compound eyes only",
          "One pair of compound eyes and simple eyes",
          "No eyes"
        ],
        correctAnswer: "One pair of compound eyes and simple eyes",
        explanation: "<b>Insect Eyes:</b><br><br>Insects usually have one pair of compound eyes and one to three simple eyes (ocelli)."
      },
      {
        question: "What is the primary method of respiration in insects?",
        options: [
          "Gills",
          "Lungs",
          "Trachea",
          "Skin diffusion"
        ],
        correctAnswer: "Trachea",
        explanation: "<b>Respiration in Insects:</b><br><br>Insects respire primarily through a system of tracheae."
      },
      {
        question: "Which of the following is an example of an insect with incomplete metamorphosis?",
        options: [
          "Butterfly",
          "House fly",
          "Dragonfly",
          "Honey bee"
        ],
        correctAnswer: "Dragonfly",
        explanation: "<b>Metamorphosis Types:</b><br><br>Dragonflies undergo incomplete metamorphosis, which includes the stages: Egg → Naiad → Adult."
      },
      {
        question: "What is the economic value of insect pollination worldwide?",
        options: [
          "$57 billion",
          "$217 billion",
          "$153 billion",
          "$190 billion"
        ],
        correctAnswer: "$217 billion",
        explanation: "<b>Economic Importance of Insect Pollination:</b><br><br>The economic value of insect pollination worldwide is estimated at U.S. $217 billion."
      },
      {
        question: "Which insects are known as important pollinators?",
        options: [
          "Bees and butterflies",
          "Flies and beetles",
          "Wasps and ants",
          "All of the above"
        ],
        correctAnswer: "All of the above",
        explanation: "<b>Pollinators:</b><br><br>Many insects, including bees, butterflies, flies, and beetles, play crucial roles in pollination."
      },
      {
        question: "What is the estimated annual value of ecological services provided by insects in the United States?",
        options: [
          "$57 billion",
          "$100 billion",
          "$150 billion",
          "$200 billion"
        ],
        correctAnswer: "$57 billion",
        explanation: "<b>Ecological Services:</b><br><br>The estimated annual value of ecological services provided by insects in the U.S. is at least $57 billion."
      },
      {
        question: "What type of metamorphosis do house flies undergo?",
        options: [
          "Complete metamorphosis",
          "Incomplete metamorphosis",
          "No metamorphosis",
          "All of the above"
        ],
        correctAnswer: "Complete metamorphosis",
        explanation: "<b>Metamorphosis Types:</b><br><br>House flies undergo complete metamorphosis, which includes the stages: Egg → Larva → Pupa → Adult."
      },
      {
        question: "Which of the following insects is wingless?",
        options: [
          "House fly",
          "Honey bee",
          "Silverfish",
          "Dragonfly"
        ],
        correctAnswer: "Silverfish",
        explanation: "<b>Examples of Insects:</b><br><br>Silverfish are an example of wingless insects."
      },
      {
        question: "Which of the following is a characteristic of arthropod predators?",
        options: [
          "They are always specialists.",
          "They are generally smaller than their prey.",
          "They kill or consume many preys.",
          "They only attack adult prey."
        ],
        correctAnswer: "They kill or consume many preys.",
        explanation: "<b>Characteristics of Arthropod Predators:</b><br><br>Arthropod predators are known to kill or consume many preys."
      },
      {
        question: "What is the role of parasitoids in pest control?",
        options: [
          "They feed on plants.",
          "They develop on or in a host insect and kill it.",
          "They are always free-living.",
          "They only attack adult insects."
        ],
        correctAnswer: "They develop on or in a host insect and kill it.",
        explanation: "<b>Role of Parasitoids:</b><br><br>Parasitoids develop on or in a host insect and ultimately kill the host."
      },
      {
        question: "What is sericulture primarily concerned with?",
        options: [
          "Rearing of honey bees",
          "Rearing of silkworms",
          "Cultivating lac insects",
          "Growing crops"
        ],
        correctAnswer: "Rearing of silkworms",
        explanation: "<b>Sericulture:</b><br><br>Sericulture is the agro-based industry involving the rearing of silkworms for silk production."
      },
      {
        question: "Which insect is known for its resinous exudation?",
        options: [
          "Honey bee",
          "Lac insect",
          "Silkworm",
          "Lady beetle"
        ],
        correctAnswer: "Lac insect",
        explanation: "<b>Lac Insects:</b><br><br>Lac insects are known for their resinous exudation from the bodies of females."
      },
      {
        question: "What is the primary purpose of apiculture?",
        options: [
          "To rear silkworms",
          "To collect honey and beeswax",
          "To cultivate lac insects",
          "To control pests"
        ],
        correctAnswer: "To collect honey and beeswax",
        explanation: "<b>Apiculture:</b><br><br>Apiculture is the maintenance of honey bee colonies for collecting honey and beeswax."
      },
      {
        question: "Which of the following is considered a major agricultural pest?",
        options: [
          "Lady beetle",
          "Locust",
          "Honey bee",
          "Silkworm"
        ],
        correctAnswer: "Locust",
        explanation: "<b>Agricultural Pests:</b><br><br>Locusts are among the most destructive agricultural pests."
      },
      {
        question: "What type of pests are carpet beetles classified as?",
        options: [
          "Agricultural pests",
          "Household pests",
          "Medical pests",
          "Beneficial insects"
        ],
        correctAnswer: "Household pests",
        explanation: "<b>Household Pests:</b><br><br>Carpet beetles are common household pests."
      },
      {
        question: "Which disease is spread by mosquitoes?",
        options: [
          "Malaria",
          "Bubonic plague",
          "Dengue fever",
          "Both A and C"
        ],
        correctAnswer: "Both A and C",
        explanation: "<b>Diseases Spread by Mosquitoes:</b><br><br>Mosquitoes can spread diseases such as malaria and dengue fever."
      },
      {
        question: "What is the most common insect pest of stored grains?",
        options: [
          "Rice Weevil",
          "Lady beetle",
          "Honey bee",
          "Dragonfly"
        ],
        correctAnswer: "Rice Weevil",
        explanation: "<b>Pests of Stored Grains:</b><br><br>The Rice Weevil is one of the most common insect pests of stored grains."
      },
      {
        question: "What is a recommended practice for managing stored grains?",
        options: [
          "Keep grains moist",
          "Maintain clean storage areas",
          "Store grains at room temperature",
          "Ignore pest presence"
        ],
        correctAnswer: "Maintain clean storage areas",
        explanation: "<b>Insect Management:</b><br><br>Maintaining clean storage areas is crucial for managing stored grains."
      },
      {
        question: "What is the common name for the order Diplura?",
        options: [
          "Coneheads",
          "Two-pronged bristle tails",
          "Springtails",
          "Silverfish"
        ],
        correctAnswer: "Two-pronged bristle tails",
        explanation: "<b>Order Diplura:</b><br><br>Diplura is commonly known as Two-pronged bristle tails."
      },
      {
        question: "Which order is known for the common name 'Jumping bristletails'?",
        options: [
          "Zygentoma",
          "Archaeognatha",
          "Ephemeroptera",
          "Odonata"
        ],
        correctAnswer: "Archaeognatha",
        explanation: "<b>Order Archaeognatha:</b><br><br>Archaeognatha is commonly known as Jumping bristletails."
      },
      {
        question: "What does the order Plecoptera mean?",
        options: [
          "Folded wings",
          "Two wings",
          "Hairy wings",
          "Straight wings"
        ],
        correctAnswer: "Folded wings",
        explanation: "<b>Order Plecoptera:</b><br><br>Plecopteran insects are known as Stoneflies, meaning 'folded wings'."
      },
      {
        question: "Which of the following orders includes Grasshoppers?",
        options: [
          "Orthoptera",
          "Hemiptera",
          "Coleoptera",
          "Lepidoptera"
        ],
        correctAnswer: "Orthoptera",
        explanation: "<b>Order Orthoptera:</b><br><br>Grasshoppers belong to the order Orthoptera."
      },
      {
        question: "What is the common name for insects in the order Coleoptera?",
        options: [
          "Butterflies",
          "Beetles",
          "Flies",
          "Moths"
        ],
        correctAnswer: "Beetles",
        explanation: "<b>Order Coleoptera:</b><br><br>Coleoptera is commonly known as Beetles."
      },
      {
        question: "Which order is known for the common name 'Caddisflies'?",
        options: [
          "Trichoptera",
          "Diptera",
          "Neuroptera",
          "Mecoptera"
        ],
        correctAnswer: "Trichoptera",
        explanation: "<b>Order Trichoptera:</b><br><br>Trichoptera is commonly known as Caddisflies."
      },
      {
        question: "What does the order Siphonaptera mean?",
        options: [
          "Winged",
          "Two wings",
          "Tube or pipe and wingless",
          "Hairy wings"
        ],
        correctAnswer: "Tube or pipe and wingless",
        explanation: "<b>Order Siphonaptera:</b><br><br>Siphonaptera means 'tube or pipe and wingless', commonly known as Fleas."
      },
      {
        question: "Which order includes Lacewings?",
        options: [
          "Neuroptera",
          "Megaloptera",
          "Raphidioptera",
          "Diptera"
        ],
        correctAnswer: "Neuroptera",
        explanation: "<b>Order Neuroptera:</b><br><br>Lacewings belong to the order Neuroptera."
      },
      {
        question: "What is the meaning of the order Thysanoptera?",
        options: [
          "Half wing",
          "Fringe wing",
          "Two wings",
          "Straight wing"
        ],
        correctAnswer: "Fringe wing",
        explanation: "<b>Order Thysanoptera:</b><br><br>Thysanoptera means 'fringe wing', commonly known as Thrips."
      },
      {
        question: "Which order is known for the common name 'Scorpionflies'?",
        options: [
          "Mecoptera",
          "Diptera",
          "Hymenoptera",
          "Coleoptera"
        ],
        correctAnswer: "Mecoptera",
        explanation: "<b>Order Mecoptera:</b><br><br>Mecoptera is commonly known as Scorpionflies."
      },
      {
        question: "What type of metamorphosis do Endopterygota undergo?",
        options: [
          "Incomplete metamorphosis",
          "Complete metamorphosis",
          "No metamorphosis",
          "Gradual metamorphosis"
        ],
        correctAnswer: "Complete metamorphosis",
        explanation: "<b>Metamorphosis Type:</b><br><br>Endopterygota undergo complete metamorphosis (Holometabola)."
      },
      {
        question: "Which of the following is a characteristic of Exopterygota?",
        options: [
          "Pupal stage present",
          "Naiad or Nymph as immature stage",
          "Internal wing development",
          "Complete metamorphosis"
        ],
        correctAnswer: "Naiad or Nymph as immature stage",
        explanation: "<b>Exopterygota Characteristics:</b><br><br>Exopterygota have Naiad or Nymph as their immature stage."
      },
      {
        question: "What is the common name for insects in the order Ephemeroptera?",
        options: [
          "Mayfly",
          "Dragonfly",
          "Silverfish",
          "Grasshopper"
        ],
        correctAnswer: "Mayfly",
        explanation: "<b>Order Ephemeroptera:</b><br><br>Ephemeroptera is commonly known as Mayflies."
      },
      {
        question: "Which order is known for the common name 'Dragonfly'?",
        options: [
          "Odonata",
          "Zygentoma",
          "Orthoptera",
          "Hymenoptera"
        ],
        correctAnswer: "Odonata",
        explanation: "<b>Order Odonata:</b><br><br>Odonata includes Dragonflies and Damselflies."
      },
      {
        question: "What is the main function of antennae in insects?",
        options: [
          "Locomotion",
          "Sensing the environment",
          "Feeding",
          "Reproduction"
        ],
        correctAnswer: "Sensing the environment",
        explanation: "<b>Function of Antennae:</b><br><br>Antennae are used for sensing the environment."
      },
      {
        question: "What is the basal segment of an insect's antenna called?",
        options: [
          "Flagellum",
          "Pedicel",
          "Scape",
          "Johnston's organ"
        ],
        correctAnswer: "Scape",
        explanation: "<b>Antennal Structure:</b><br><br>The basal segment of an insect's antenna is called the scape."
      },
      {
        question: "What type of metamorphosis do Exopterygota undergo?",
        options: [
          "Complete metamorphosis",
          "Incomplete metamorphosis",
          "No metamorphosis",
          "Gradual metamorphosis"
        ],
        correctAnswer: "Incomplete metamorphosis",
        explanation: "<b>Metamorphosis Type:</b><br><br>Exopterygota undergo incomplete metamorphosis (Hemimetabola)."
      },
      {
        question: "Which of the following orders includes Lacewings?",
        options: [
          "Neuroptera",
          "Megaloptera",
          "Raphidioptera",
          "Diptera"
        ],
        correctAnswer: "Neuroptera",
        explanation: "<b>Order Neuroptera:</b><br><br>Neuroptera includes Lacewings and Antlions."
      },
      {
        question: "What is the function of Johnston's organ?",
        options: [
          "Sensing vibrations",
          "Feeding",
          "Locomotion",
          "Reproduction"
        ],
        correctAnswer: "Sensing vibrations",
        explanation: "<b>Function of Johnston's Organ:</b><br><br>Johnston's organ is used for sensing vibrations and movement."
      },
      {
        question: "What is the common name for insects in the order Zygentoma?",
        options: [
          "Silverfish",
          "Mayfly",
          "Dragonfly",
          "Grasshopper"
        ],
        correctAnswer: "Silverfish",
        explanation: "<b>Order Zygentoma:</b><br><br>Zygentoma is commonly known as Silverfish."
      },
      {
        question: "What is a primary function of antennae in insects?",
        options: [
          "Locomotion",
          "Detecting chemicals",
          "Feeding",
          "Reproduction"
        ],
        correctAnswer: "Detecting chemicals",
        explanation: "<b>Function of Antennae:</b><br><br>Antennae are useful to detect chemicals including food and pheromones."
      },
      {
        question: "Which type of antennae are described as bristle-like?",
        options: [
          "Filiform",
          "Setaceous",
          "Moniliform",
          "Clavate"
        ],
        correctAnswer: "Setaceous",
        explanation: "<b>Setaceous Antennae:</b><br><br>Setaceous antennae are bristle-like, with size of the segments decreasing from base to apex."
      },
      {
        question: "What type of antennae do termites have?",
        options: [
          "Filiform",
          "Moniliform",
          "Serrate",
          "Clavate"
        ],
        correctAnswer: "Moniliform",
        explanation: "<b>Moniliform Antennae:</b><br><br>Moniliform antennae are bead-like, with segments that are either globular or spherical."
      },
      {
        question: "Which type of antennae is characterized by segments that are usually cylindrical?",
        options: [
          "Filiform",
          "Serrate",
          "Setaceous",
          "Capitate"
        ],
        correctAnswer: "Filiform",
        explanation: "<b>Filiform Antennae:</b><br><br>Filiform antennae are thread-like, with cylindrical segments."
      },
      {
        question: "What is the defining feature of bipectinate antennae?",
        options: [
          "Segments with long slender processes on one side",
          "Segments with long slender lateral processes on both sides",
          "Segments that are bead-like",
          "Segments that are thread-like"
        ],
        correctAnswer: "Segments with long slender lateral processes on both sides",
        explanation: "<b>Bipectinate Antennae:</b><br><br>Bipectinate antennae have segments with long slender lateral processes on both sides."
      },
      {
        question: "What type of antennae do house flies possess?",
        options: [
          "Stylate",
          "Capitate",
          "Aristate",
          "Plumose"
        ],
        correctAnswer: "Aristate",
        explanation: "<b>Aristate Antennae:</b><br><br>House flies have aristate antennae, which have a conspicuous dorsal bristle called arista."
      },
      {
        question: "Which type of antennae is described as feathery?",
        options: [
          "Stylate",
          "Plumose",
          "Geniculate",
          "Capitate"
        ],
        correctAnswer: "Plumose",
        explanation: "<b>Plumose Antennae:</b><br><br>Plumose antennae are feathery, with long whorls of hairs."
      },
      {
        question: "What is the function of Johnston's organ?",
        options: [
          "Sensing vibrations",
          "Feeding",
          "Locomotion",
          "Reproduction"
        ],
        correctAnswer: "Sensing vibrations",
        explanation: "<b>Function of Johnston's Organ:</b><br><br>Johnston's organ is used for sensing vibrations and movement."
      },
      {
        question: "What type of antennae do weevils possess?",
        options: [
          "Geniculate",
          "Stylate",
          "Capitate",
          "Filiform"
        ],
        correctAnswer: "Geniculate",
        explanation: "<b>Geniculate Antennae:</b><br><br>Weevils have geniculate antennae, which are elbowed."
      },
      {
        question: "What is the primary function of antennae in communication?",
        options: [
          "Detecting food",
          "Hearing",
          "Detecting danger",
          "All of the above"
        ],
        correctAnswer: "All of the above",
        explanation: "<b>Function of Antennae:</b><br><br>Antennae are useful for detecting food, hearing, and detecting danger."
      }
    ],
    'tree crop interaction_nazmun nahar': [
      {
        question: "What is the primary definition of agroforestry according to ICRAF?",
        options: [
          "Integration of crops only",
          "Integration of animals only",
          "Integration of woody components with agricultural and pastoral operations",
          "Integration of only fruit trees"
        ],
        correctAnswer: "Integration of woody components with agricultural and pastoral operations",
        explanation: "<b>Agroforestry Definition:</b><br><br>Agroforestry is defined as the deliberate integration of woody components with agricultural and pastoral operations on the same piece of land."
      },
      {
        question: "Which of the following is NOT a component of agroforestry?",
        options: [
          "Crops",
          "Animals",
          "Trees",
          "Fertilizers"
        ],
        correctAnswer: "Fertilizers",
        explanation: "<b>Components of Agroforestry:</b><br><br>The components of agroforestry include trees, crops, and animals, but not fertilizers."
      },
      {
        question: "What type of interactions occur in agroforestry systems?",
        options: [
          "Only ecological interactions",
          "Only economic interactions",
          "Both ecological and economic interactions",
          "No interactions"
        ],
        correctAnswer: "Both ecological and economic interactions",
        explanation: "<b>Interactions in Agroforestry:</b><br><br>Agroforestry systems involve both ecological and economic interactions between components."
      },
      {
        question: "What resources do components in agroforestry compete for?",
        options: [
          "Light, water, and nutrients",
          "Only water",
          "Only light",
          "Only nutrients"
        ],
        correctAnswer: "Light, water, and nutrients",
        explanation: "<b>Resource Competition:</b><br><br>Components in agroforestry compete for common growth resources, which include light, water, and nutrients."
      },
      {
        question: "What is the role of competition in agroforestry?",
        options: [
          "To enhance growth",
          "To reduce biodiversity",
          "To share resources equally",
          "To affect growth negatively"
        ],
        correctAnswer: "To affect growth negatively",
        explanation: "<b>Role of Competition:</b><br><br>Competition occurs when components share common growth resources, which can negatively affect their growth."
      },
      {
        question: "What is the significance of ecological interactions in agroforestry?",
        options: [
          "They have no significance",
          "They enable balance of life in a community",
          "They only benefit one species",
          "They are harmful"
        ],
        correctAnswer: "They enable balance of life in a community",
        explanation: "<b>Ecological Interactions:</b><br><br>Ecological interactions enable a balance of life in a specific community."
      },
      {
        question: "What is the definition of interaction in agroforestry?",
        options: [
          "The effect of one component on another",
          "The competition between species",
          "The growth of trees only",
          "The economic benefits only"
        ],
        correctAnswer: "The effect of one component on another",
        explanation: "<b>Definition of Interaction:</b><br><br>Interaction is defined as the effect of one component of a system on the performance of another component."
      },
      {
        question: "Which of the following is a type of agroforestry?",
        options: [
          "Agrisilviculture",
          "Aquaculture",
          "Hydroponics",
          "Monoculture"
        ],
        correctAnswer: "Agrisilviculture",
        explanation: "<b>Types of Agroforestry:</b><br><br>Agrisilviculture is a type of agroforestry where crops are dominant."
      },
      {
        question: "What is the primary benefit of incorporating trees in agroforestry?",
        options: [
          "Increased competition",
          "Decreased biodiversity",
          "Ecological and economic benefits",
          "No benefits"
        ],
        correctAnswer: "Ecological and economic benefits",
        explanation: "<b>Benefits of Trees in Agroforestry:</b><br><br>Incorporating trees offers ecological and economic benefits under low input sustainable agriculture."
      },
      {
        question: "What is the main focus of low input sustainable agriculture?",
        options: [
          "High chemical use",
          "Maximizing profit",
          "Sustainable practices with minimal inputs",
          "Monoculture farming"
        ],
        correctAnswer: "Sustainable practices with minimal inputs",
        explanation: "<b>Focus of Low Input Sustainable Agriculture:</b><br><br>The focus is on sustainable practices that require minimal inputs."
      },
      {
        question: "What type of interaction occurs when both species benefit?",
        options: [
          "Neutralism",
          "Competition",
          "Mutualism",
          "Commensalism"
        ],
        correctAnswer: "Mutualism",
        explanation: "<b>Mutualism:</b><br><br>Mutualism is an interaction where both species benefit from the relationship."
      },
      {
        question: "Which of the following is an example of negative interaction?",
        options: [
          "Shading trees",
          "Allelopathy",
          "Mycorrhizae",
          "Support trees for vines"
        ],
        correctAnswer: "Allelopathy",
        explanation: "<b>Negative Interaction:</b><br><br>Allelopathy is a negative interaction where one plant inhibits the growth of another."
      },
      {
        question: "What is the primary focus of tree-crop interactions?",
        options: [
          "To reduce competition",
          "To enhance productivity",
          "To eliminate pests",
          "To increase water usage"
        ],
        correctAnswer: "To enhance productivity",
        explanation: "<b>Tree-Crop Interactions:</b><br><br>The primary focus is to enhance productivity through beneficial interactions."
      },
      {
        question: "Which type of interaction is characterized by competition for resources?",
        options: [
          "Complementary",
          "Supplementary",
          "Competitive",
          "Neutral"
        ],
        correctAnswer: "Competitive",
        explanation: "<b>Competitive Interaction:</b><br><br>Competitive interactions occur when species compete for limited resources."
      },
      {
        question: "What is the effect of shading trees on crops?",
        options: [
          "Increases light competition",
          "Reduces stress",
          "Decreases biomass",
          "Increases water usage"
        ],
        correctAnswer: "Reduces stress",
        explanation: "<b>Shading Trees:</b><br><br>Shading trees help reduce stress on crops, improving their growth."
      },
      {
        question: "What is the role of complementary interactions?",
        options: [
          "To inhibit growth",
          "To enhance mutual benefits",
          "To compete for resources",
          "To create allelopathic effects"
        ],
        correctAnswer: "To enhance mutual benefits",
        explanation: "<b>Complementary Interactions:</b><br><brComplementary interactions enhance mutual benefits between species."
      },
      {
        question: "Which of the following describes indirect interactions?",
        options: [
          "Direct competition",
          "Environmental alteration",
          "Mutual benefits",
          "Neutral effects"
        ],
        correctAnswer: "Environmental alteration",
        explanation: "<b>Indirect Interactions:</b><br><br>Indirect interactions occur when species affect each other by altering their environment."
      },
      {
        question: "What is the significance of understanding tree-animal interactions?",
        options: [
          "To eliminate animals",
          "To enhance crop yield",
          "To reduce biodiversity",
          "To increase competition"
        ],
        correctAnswer: "To enhance crop yield",
        explanation: "<b>Tree-Animal Interactions:</b><br><br>Understanding these interactions can enhance crop yield through beneficial relationships."
      },
      {
        question: "What type of interaction is characterized by one species being inhibited while the other is unaffected?",
        options: [
          "Commensalism",
          "Mutualism",
          "Competition",
          "Neutralism"
        ],
        correctAnswer: "Commensalism",
        explanation: "<b>Commensalism:</b><br><br>In commensalism, one species benefits while the other is neither helped nor harmed."
      },
      {
        question: "What is the effect of trampling in tree-animal interactions?",
        options: [
          "Positive for crops",
          "Negative for crops",
          "Neutral for crops",
          "Beneficial for trees"
        ],
        correctAnswer: "Negative for crops",
        explanation: "<b>Trampling:</b><br><br>Trampling can have negative effects on crops by damaging them."
      },
      {
        question: "What is a benefit of shading trees for crops?",
        options: [
          "Increased temperature",
          "Reduction of VPD",
          "Increased transpiration",
          "Decreased light availability"
        ],
        correctAnswer: "Reduction of VPD",
        explanation: "<b>Shading Trees:</b><br><br>Shading trees can reduce Vapor Pressure Deficit (VPD), leading to decreased transpiration."
      },
      {
        question: "How does agroforestry utilize light efficiently?",
        options: [
          "Only direct sunlight",
          "Only reflected light",
          "Sunbeam, reflected, and diffuse light",
          "No light utilization"
        ],
        correctAnswer: "Sunbeam, reflected, and diffuse light",
        explanation: "<b>Efficient Light Use:</b><br><br>Agroforestry systems utilize sunbeam, reflected, and diffuse light for better growth."
      },
      {
        question: "What is the photosynthetic efficiency in agroforestry systems?",
        options: [
          "Less than 1%",
          "1.7% to 2.38%",
          "2-2.5%",
          "3-4%"
        ],
        correctAnswer: "1.7% to 2.38%",
        explanation: "<b>Photosynthetic Efficiency:</b><br><br>In agroforestry systems, photosynthetic efficiencies range from 1.7% to 2.38%."
      },
      {
        question: "What contributes to biomass in agroforestry?",
        options: [
          "Only crop residues",
          "Only litter fall",
          "Pruning materials, litter fall, and crop root residues",
          "No biomass contribution"
        ],
        correctAnswer: "Pruning materials, litter fall, and crop root residues",
        explanation: "<b>Biomass Contribution:</b><br><br>Biomass can be added by pruning materials, litter fall, and crop root residues."
      },
      {
        question: "What is the role of deep-rooted trees in nutrient utilization?",
        options: [
          "They compete for nutrients",
          "They access larger soil volumes for water and nutrients",
          "They inhibit crop growth",
          "They have no role"
        ],
        correctAnswer: "They access larger soil volumes for water and nutrients",
        explanation: "<b>Deep-Rooted Trees:</b><br><br>Deep-rooted trees act as a safety net by accessing larger soil volumes for water and nutrients."
      },
      {
        question: "What is the significance of balanced nutrient utilization in agroforestry?",
        options: [
          "It reduces productivity",
          "It ensures effective sharing and recycling of nutrients",
          "It has no significance",
          "It only benefits trees"
        ],
        correctAnswer: "It ensures effective sharing and recycling of nutrients",
        explanation: "<b>Balanced Nutrient Utilization:</b><br><br>Balanced nutrient utilization enhances overall productivity and sustainability."
      },
      {
        question: "What is the impact of shading on temperature in agroforestry?",
        options: [
          "Increases average maximum temperature",
          "Decreases average maximum temperature",
          "No impact on temperature",
          "Increases minimum temperature only"
        ],
        correctAnswer: "Decreases average maximum temperature",
        explanation: "<b>Impact of Shading:</b><br><br>Shading can reduce average maximum temperatures by 5.4°C."
      },
      {
        question: "What is the effect of efficient light use in agroforestry systems?",
        options: [
          "Decreased crop yield",
          "Better growth of understorey crops",
          "Increased waste of light resources",
          "No effect"
        ],
        correctAnswer: "Better growth of understorey crops",
        explanation: "<b>Efficient Light Use:</b><br><br>Efficient light use allows for better growth of understorey crops."
      },
      {
        question: "What is the role of biodiversity in agroforestry?",
        options: [
          "Decreases resource use efficiency",
          "Increases resilience to environmental stresses",
          "Has no impact",
          "Only benefits trees"
        ],
        correctAnswer: "Increases resilience to environmental stresses",
        explanation: "<b>Biodiversity:</b><br><br>Biodiverse ecosystems are generally more resilient to diverse environmental stresses."
      },
      {
        question: "What is the primary benefit of shading trees for shade-loving crops?",
        options: [
          "Increased competition",
          "Reduced temperature",
          "Decreased biomass",
          "Increased light competition"
        ],
        correctAnswer: "Reduced temperature",
        explanation: "<b>Shading Trees:</b><br><br>Shading trees are beneficial for shade-loving crops by reducing temperature."
      },
      {
        question: "What is a benefit of microclimate amelioration in agroforestry?",
        options: [
          "Decreasing soil moisture",
          "Increasing soil temperature",
          "Adding organic matter through litter fall",
          "Reducing nutrient recycling"
        ],
        correctAnswer: "Adding organic matter through litter fall",
        explanation: "<b>Microclimate Amelioration:</b><br><br>Microclimate amelioration adds organic matter and nutrients through litter fall and root decomposition."
      },
      {
        question: "How does agroforestry optimize aerial space utilization?",
        options: [
          "Only horizontally",
          "Only vertically",
          "Both horizontally and vertically",
          "Not at all"
        ],
        correctAnswer: "Both horizontally and vertically",
        explanation: "<b>Utilization of Aerial Space:</b><br><br>Agroforestry optimizes aerial space utilization both horizontally and vertically."
      },
      {
        question: "What is the role of agroforestry in water conservation?",
        options: [
          "Increases evaporation",
          "Reduces evaporation",
          "Has no effect on water",
          "Increases runoff"
        ],
        correctAnswer: "Reduces evaporation",
        explanation: "<b>Water Conservation:</b><br><br>Agroforestry systems reduce evaporation, acting as 'bioirrigators' for adjacent plants."
      },
      {
        question: "Which of the following is a method of weed suppression in agroforestry?",
        options: [
          "Increased sunlight",
          "Shade from trees",
          "More water",
          "Less biodiversity"
        ],
        correctAnswer: "Shade from trees",
        explanation: "<b>Weed Suppression:</b><br><br>Shade from trees is more severe for light-demanding weeds, reducing their infestation."
      },
      {
        question: "What is a benefit of soil conservation in agroforestry?",
        options: [
          "Increased soil erosion",
          "Improved water holding capacity",
          "Decreased soil fertility",
          "Increased runoff"
        ],
        correctAnswer: "Improved water holding capacity",
        explanation: "<b>Soil Conservation:</b><br><br>Agroforestry improves water holding capacity and reduces soil erosion."
      },
      {
        question: "What factor influences tree-crop interactions?",
        options: [
          "Only soil type",
          "Only tree age",
          "Root architecture and canopy type",
          "None of the above"
        ],
        correctAnswer: "Root architecture and canopy type",
        explanation: "<b>Factors Influencing Interactions:</b><br><br>Factors such as root architecture and canopy type influence tree-crop interactions."
      },
      {
        question: "How do deep-rooted trees assist in nutrient cycling?",
        options: [
          "By competing for nutrients",
          "By accessing deeper soil layers",
          "By reducing soil moisture",
          "By increasing evaporation"
        ],
        correctAnswer: "By accessing deeper soil layers",
        explanation: "<b>Deep-Rooted Trees:</b><br><br>Deep-rooted trees access nutrients released from weathering in lower soil horizons."
      },
      {
        question: "What is the significance of seasonal changes in tree-crop interactions?",
        options: [
          "They have no significance",
          "They affect resource availability",
          "They only affect trees",
          "They only affect crops"
        ],
        correctAnswer: "They affect resource availability",
        explanation: "<b>Seasonal Changes:</b><br><br>Seasonal changes can significantly affect tree-crop interactions by altering resource availability."
      },
      {
        question: "How does silvicultural management influence tree-crop interactions?",
        options: [
          "By increasing competition",
          "By optimizing light availability",
          "By reducing biodiversity",
          "By eliminating trees"
        ],
        correctAnswer: "By optimizing light availability",
        explanation: "<b>Silvicultural Management:</b><br><br>Silvicultural management practices can optimize tree-crop interactions by enhancing light availability."
      },
      {
        question: "What is the role of closely planted shrub hedges in agroforestry?",
        options: [
          "Increase soil erosion",
          "Control soil erosion",
          "Decrease water holding capacity",
          "Reduce biodiversity"
        ],
        correctAnswer: "Control soil erosion",
        explanation: "<b>Hedge Planting:</b><br><br>Closely planted shrub hedges can efficiently control soil erosion."
      },
      {
        question: "What is a consequence of light competition in agroforestry?",
        options: [
          "Increased photosynthesis",
          "Reduced growth and development of plants",
          "Increased transpiration",
          "Improved light quality"
        ],
        correctAnswer: "Reduced growth and development of plants",
        explanation: "<b>Light Competition:</b><br><br>Light competition can reduce the growth and development of plants."
      },
      {
        question: "How does nutrient competition affect tree-crop interactions?",
        options: [
          "Increases nutrient availability",
          "Reduces growth and development of plants",
          "Has no effect",
          "Increases crop yield"
        ],
        correctAnswer: "Reduces growth and development of plants",
        explanation: "<b>Nutrient Competition:</b><br><br>Nutrient competition can reduce the growth and development of both trees and crops."
      },
      {
        question: "What is the impact of water competition in agroforestry?",
        options: [
          "Increases crop production",
          "Competes with crops for moisture",
          "Has no impact",
          "Improves rainfall availability"
        ],
        correctAnswer: "Competes with crops for moisture",
        explanation: "<b>Water Competition:</b><br><br>Water competition can depress crop production by competing for moisture."
      },
      {
        question: "How can allelopathy affect neighboring plants?",
        options: [
          "By enhancing growth",
          "By suppressing growth",
          "By increasing photosynthesis",
          "By improving nutrient uptake"
        ],
        correctAnswer: "By suppressing growth",
        explanation: "<b>Allelopathy:</b><br><br>Allelopathy can suppress the growth of neighboring plants through the release of phytotoxic substances."
      },
      {
        question: "Which tree species is known for its allelopathic effects on soybean?",
        options: [
          "Eucalyptus",
          "Alnus nepalensis",
          "Gliricidia sepium",
          "Leucaena leucocephala"
        ],
        correctAnswer: "Alnus nepalensis",
        explanation: "<b>Allelopathic Effects:</b><br><br>Alnus nepalensis is known to inhibit the growth of soybean."
      },
      {
        question: "What compound is found in Acacia that can be toxic?",
        options: [
          "Mimosine",
          "Tannins",
          "Cyanoglucosides",
          "HCN"
        ],
        correctAnswer: "Cyanoglucosides",
        explanation: "<b>Toxic Compounds:</b><br><br>Acacia contains cyanoglucosides, which can be toxic."
      },
      {
        question: "What is the first documented case of allelopathy?",
        options: [
          "Eucalyptus",
          "Black walnut",
          "Leucaena",
          "Gliricidia"
        ],
        correctAnswer: "Black walnut",
        explanation: "<b>First Documented Case:</b><br><br>The first documented case of allelopathy was observed in black walnut (Juglans regia)."
      },
      {
        question: "How can allelopathy limit the adoption of agroforestry?",
        options: [
          "By enhancing crop growth",
          "By causing detrimental effects on crops",
          "By increasing biodiversity",
          "By improving soil health"
        ],
        correctAnswer: "By causing detrimental effects on crops",
        explanation: "<b>Limitations of Allelopathy:</b><br><br>Allelopathy can limit the adoption of agroforestry due to its detrimental effects on crop growth."
      },
      {
        question: "What is the effect of shade on weed growth in agroforestry?",
        options: [
          "Encourages growth of light-demanding weeds",
          "Reduces weed growth",
          "Has no effect",
          "Increases crop yield"
        ],
        correctAnswer: "Encourages growth of light-demanding weeds",
        explanation: "<b>Weed Growth:</b><br><br>Shade can sometimes encourage the growth of light-demanding weeds."
      },
      {
        question: "What is the primary effect of allelochemicals on neighboring plants?",
        options: [
          "Enhances growth",
          "Interferes with metabolic pathways",
          "Increases nutrient uptake",
          "Has no effect"
        ],
        correctAnswer: "Interferes with metabolic pathways",
        explanation: "<b>Allelochemicals:</b><br><br>Allelochemicals can interfere with the metabolic pathways of neighboring plants, causing suppression of growth."
      },
      {
        question: "What management option can lead to increased growth in tree-crop interfaces?",
        options: [
          "Excessive shading",
          "Herbicides",
          "Irrigation",
          "Grazing"
        ],
        correctAnswer: "Irrigation",
        explanation: "<b>Increased Growth:</b><br><br>Irrigation can provide adequate water supply, promoting growth."
      },
      {
        question: "What is a negative interaction between trees and animals?",
        options: [
          "Seed dispersal",
          "Low quality of tree fodder",
          "Microclimate modification",
          "Improvement in carrying capacity"
        ],
        correctAnswer: "Low quality of tree fodder",
        explanation: "<b>Negative Interactions:</b><br><br>Low quality of tree fodder can adversely affect livestock production."
      },
      {
        question: "How do animals affect vegetation in agroforestry?",
        options: [
          "By increasing soil erosion",
          "By seed dispersal",
          "By reducing biodiversity",
          "By increasing competition"
        ],
        correctAnswer: "By seed dispersal",
        explanation: "<b>Effects of Animals:</b><br><br>Animals can help in seed dispersal, enhancing plant diversity."
      },
      {
        question: "What is the effect of mechanical damage from animals on trees?",
        options: [
          "Improves tree health",
          "Has no effect",
          "Can harm trees",
          "Increases growth"
        ],
        correctAnswer: "Can harm trees",
        explanation: "<b>Mechanical Damage:</b><br><br>Mechanical damage from browsing and trampling can negatively impact tree health."
      },
      {
        question: "What is a benefit of shelterbelts in agroforestry?",
        options: [
          "Increase soil erosion",
          "Provide protection from wind",
          "Decrease biodiversity",
          "Reduce water availability"
        ],
        correctAnswer: "Provide protection from wind",
        explanation: "<b>Shelterbelts:</b><br><br>Shelterbelts protect both pasture and animals from strong winds."
      },
      {
        question: "What compound found in Leucaena fodder can be toxic?",
        options: [
          "Tannins",
          "Mimosine",
          "Cyanogenic glucosides",
          "Phenolic compounds"
        ],
        correctAnswer: "Mimosine",
        explanation: "<b>Toxic Compounds:</b><br><br>Mimosine found in Leucaena fodder can be toxic to livestock."
      },
      {
        question: "What is the role of microclimate amelioration in agroforestry?",
        options: [
          "Decreases soil moisture",
          "Increases soil temperature",
          "Improves local climate conditions",
          "Reduces biodiversity"
        ],
        correctAnswer: "Improves local climate conditions",
        explanation: "<b>Microclimate Amelioration:</b><br><br>Microclimate amelioration improves local climate conditions for better growth."
      },
      {
        question: "What is the impact of phenolic compounds in tree fodder?",
        options: [
          "Enhances digestibility",
          "Reduces feed value",
          "Increases growth",
          "Has no effect"
        ],
        correctAnswer: "Reduces feed value",
        explanation: "<b>Phenolic Compounds:</b><br><br>Phenolic compounds can reduce the feed value of tree fodder."
      },
      {
        question: "How can livestock affect soil properties?",
        options: [
          "Improve soil structure",
          "Cause compaction",
          "Increase nutrient availability",
          "Enhance biodiversity"
        ],
        correctAnswer: "Cause compaction",
        explanation: "<b>Soil Properties:</b><br><br>Livestock can cause soil compaction, negatively impacting tree growth."
      },
      {
        question: "What is the significance of understanding negative interactions in agroforestry?",
        options: [
          "It has no significance",
          "It helps in optimizing benefits",
          "It only affects trees",
          "It only affects crops"
        ],
        correctAnswer: "It helps in optimizing benefits",
        explanation: "<b>Understanding Interactions:</b><br><br>Understanding negative interactions is essential for managing agroforestry systems effectively."
      },
      {
        question: "What is the Land Equivalent Ratio (LER)?",
        options: [
          "A measure of soil fertility",
          "A ratio of intercrop yields to monoculture yields",
          "A method for planting trees",
          "A type of crop rotation"
        ],
        correctAnswer: "A ratio of intercrop yields to monoculture yields",
        explanation: "<b>Land Equivalent Ratio:</b><br><br>LER indicates the relative land requirements for intercrops versus monocultures."
      },
      {
        question: "What does a positive interaction (F > C) indicate in tree-crop interactions?",
        options: [
          "Negative effects of trees",
          "Positive effects of trees",
          "No interaction",
          "Increased competition"
        ],
        correctAnswer: "Positive effects of trees",
        explanation: "<b>Positive Interaction:</b><br><br>F > C indicates that the benefits of trees outweigh the competition effects on crops."
      },
      {
        question: "Which model is used for water, nutrient, and light capture in agroforestry systems?",
        options: [
          "HyPAR",
          "WaNuLCAS",
          "STICS",
          "Modelo"
        ],
        correctAnswer: "WaNuLCAS",
        explanation: "<b>WaNuLCAS:</b><br><br>WaNuLCAS is a model for water, nutrient, and light capture in agroforestry systems."
      },
      {
        question: "What is the significance of the choice of species in agroforestry?",
        options: [
          "It has no significance",
          "It affects compatibility and productivity",
          "It only affects trees",
          "It only affects crops"
        ],
        correctAnswer: "It affects compatibility and productivity",
        explanation: "<b>Choice of Species:</b><br><br>The choice of species is crucial as it affects the compatibility and productivity of both trees and crops."
      },
      {
        question: "What is the formula for calculating LER?",
        options: [
          "LER = Ci + Ti",
          "LER = Ci/CS + Ti/TS",
          "LER = Ytree + Ycrop",
          "LER = F - C"
        ],
        correctAnswer: "LER = Ci/CS + Ti/TS",
        explanation: "<b>LER Formula:</b><br><br>LER is calculated as LER = Ci/CS + Ti/TS, where Ci is crop yield under intercropping and CS is crop yield under sole cropping."
      },
      {
        question: "What does F represent in the equation Ysystem = Ytree + Ycrop = Ytree + Ycrop,0 + F - C?",
        options: [
          "Negative effects of trees",
          "Positive effects of trees",
          "Total yield",
          "Competition for resources"
        ],
        correctAnswer: "Positive effects of trees",
        explanation: "<b>F in the Equation:</b><br><br>F represents the positive effects of trees on crop growth via soil fertility improvement."
      },
      {
        question: "What is the impact of the design of an agroforestry system?",
        options: [
          "It has no impact",
          "It influences resource use efficiency",
          "It only affects trees",
          "It only affects crops"
        ],
        correctAnswer: "It influences resource use efficiency",
        explanation: "<b>Design Impact:</b><br><br>The design of an agroforestry system influences resource use efficiency and overall productivity."
      },
      {
        question: "What is the role of management in agroforestry systems?",
        options: [
          "It is irrelevant",
          "It determines the degree and timing of interventions",
          "It only affects trees",
          "It only affects crops"
        ],
        correctAnswer: "It determines the degree and timing of interventions",
        explanation: "<b>Management Role:</b><br><br>Management determines the degree and timing of interventions in agroforestry systems."
      },
      {
        question: "What is the yield of a tree-crop system represented by in the equation Ysystem = Ytree + Ycrop?",
        options: [
          "Total yield of trees",
          "Total yield of crops",
          "Combined yield of trees and crops",
          "Yield of monoculture"
        ],
        correctAnswer: "Combined yield of trees and crops",
        explanation: "<b>Yield Representation:</b><br><br>Ysystem represents the combined yield of trees and crops in the agroforestry system."
      },
      {
        question: "What does it mean if F < C in tree-crop interactions?",
        options: [
          "Positive interaction",
          "Negative interaction",
          "No interaction",
          "Increased growth"
        ],
        correctAnswer: "Negative interaction",
        explanation: "<b>Negative Interaction:</b><br><br>If F < C, it indicates a negative interaction where competition outweighs the benefits of trees."
      }
    ],
    'concept and classification by nasrin sultana mam': [
      {
        "question": "What is the main characteristic of a system in the context of agriculture?",
        "options": [
          "It is an isolated group of elements.",
          "The elements work independently.",
          "The elements are interrelated and affect each other.",
          "It only includes crops."
        ],
        "correctAnswer": "The elements are interrelated and affect each other.",
        "explanation": "A system is characterized by interrelated elements where a change in one affects others, forming a unified whole working towards a common goal."
      },
      {
        "question": "What is the difference between an agroforestry system and agroforestry practice?",
        "options": [
          "There is no difference.",
          "Systems focus on management, practices focus on socio-economic functions.",
          "Systems are specific groups of practices, practices are distinctive arrangements of components.",
          "Practices include global inventories, systems do not."
        ],
        "correctAnswer": "Systems are specific groups of practices, practices are distinctive arrangements of components.",
        "explanation": "An agroforestry system is a group of practices, while a practice refers to specific spatial and temporal arrangements of components."
      },
      {
        "question": "What does agroforestry technology primarily aim to achieve?",
        "options": [
          "Replace existing practices with identical systems.",
          "Modify or develop systems or practices through innovation.",
          "Focus solely on economic benefits.",
          "Combine forestry and fishing industries."
        ],
        "correctAnswer": "Modify or develop systems or practices through innovation.",
        "explanation": "Agroforestry technology introduces innovations to improve or create systems or practices through scientific methods."
      },
      {
        "question": "Which organization undertook a global inventory of agroforestry systems?",
        "options": [
          "FAO",
          "ICRAF",
          "UNESCO",
          "WWF"
        ],
        "correctAnswer": "ICRAF",
        "explanation": "ICRAF conducted a global inventory of agroforestry systems from 1982 to 1987 to collect, collate, and evaluate data systematically."
      },
      {
        "question": "What is a fundamental criterion for classifying agroforestry systems?",
        "options": [
          "Independence of components.",
          "Inclusion of arbitrary criteria.",
          "Logical grouping of major production factors.",
          "Exclusion of socio-economic factors."
        ],
        "correctAnswer": "Logical grouping of major production factors.",
        "explanation": "Classification should logically group factors like production dependencies, management methods, and system structures."
      },
      {
        question: "What are the four bases for classifying agroforestry systems according to Nair (1987)?",
        options: [
            "Structure, Function, Socio-economic Scale, Ecological Spread",
            "Structure, Function, Land Use, History",
            "Function, Physiognomic, Floristic, Ecological",
            "Structure, Physiognomic, Function, History"
        ],
        correctAnswer: "Structure, Function, Socio-economic Scale, Ecological Spread",
        explanation: "<b>Nair's Classification Bases:</b><br><br>Nair identified four bases: Structure, Function, Socio-economic Scale, and Ecological Spread for classifying agroforestry systems."
    },
    {
        question: "How did Dwivedi (1992) expand the classification bases for agroforestry systems?",
        options: [
            "Into four categories",
            "Into six categories",
            "Into seven categories",
            "Into eight categories"
        ],
        correctAnswer: "Into seven categories",
        explanation: "<b>Dwivedi's Reorganization:</b><br><br>Dwivedi expanded the classification into seven categories: Structure, Physiognomic, Function, Floristic, Socio-economic, History, and Ecological."
    },
    {
        question: "What does the socio-economic basis of agroforestry classification refer to?",
        options: [
            "The level of input management",
            "The types of crops used",
            "The historical development of systems",
            "The ecological conditions"
        ],
        correctAnswer: "The level of input management",
        explanation: "<b>Socio-economic Basis:</b><br><br>This basis considers management intensity and commercial goals, such as subsistence or commercial."
    },
    {
        question: "What is the significance of the ecological basis in agroforestry classification?",
        options: [
            "It refers to the historical context",
            "It considers environmental conditions and suitability",
            "It focuses on species composition",
            "It is irrelevant to agroforestry"
        ],
        correctAnswer: "It considers environmental conditions and suitability",
        explanation: "<b>Ecological Basis:</b><br><br>This basis is based on the assumption that different ecological conditions require distinct agroforestry systems."
    },
    {
        question: "The structural basis of agroforestry classification refers to the ______ and arrangement of components.",
        options: [
            "composition",
            "function",
            "history",
            "ecology"
        ],
        correctAnswer: "composition",
        explanation: "<b>Structural Basis:</b><br><br>This basis includes both spatial and temporal arrangements of different components within the agroforestry system."
    },
    {
        question: "What does the historical classification of agroforestry systems refer to?",
        options: [
            "The evolution of systems over time",
            "The current management practices",
            "The ecological conditions",
            "The species composition"
        ],
        correctAnswer: "The evolution of systems over time",
        explanation: "<b>Historical Classification:</b><br><br>This basis helps in understanding how traditional practices have shaped current agroforestry systems."
    },
    {
        question: "What is the physiognomic basis in agroforestry classification?",
        options: [
            "It refers to the economic aspects",
            "It refers to the characters of vegetation",
            "It is about the historical context",
            "It is irrelevant to agroforestry"
        ],
        correctAnswer: "It refers to the characters of vegetation",
        explanation: "<b>Physiognomic Basis:</b><br><br>This classification helps in understanding how different vegetation types adapt to their environments."
    },
    {
        question: "The floristic basis considers the ______ composition widely adopted in different regions.",
        options: [
            "species",
            "economic",
            "historical",
            "ecological"
        ],
        correctAnswer: "species",
        explanation: "<b>Floristic Basis:</b><br><br>This basis is important for understanding the diversity and ecological interactions within agroforestry systems."
    },
    {
        question: "In Bangladesh, 'land utilization' is included as a basis for classifying agroforestry systems, which emphasizes ______.",
        options: [
            "land use patterns",
            "historical development",
            "species composition",
            "ecological conditions"
        ],
        correctAnswer: "land use patterns",
        explanation: "<b>Land Utilization:</b><br><br>This basis focuses on how agroforestry systems are adapted to specific land use patterns in Bangladesh."
    },
    {
        question: "What does the functional basis of agroforestry systems refer to?",
        options: [
            "The historical context",
            "The major functions or roles of components",
            "The ecological conditions",
            "The species composition"
        ],
        correctAnswer: "The major functions or roles of components",
        explanation: "<b>Functional Basis:</b><br><br>This basis highlights the contributions of woody components to the overall productivity of the system."
    },
    {
      question: "What does the structural basis of agroforestry classification refer to?",
      options: [
          "The composition of components",
          "The historical context",
          "The economic aspects",
          "The ecological conditions"
      ],
      correctAnswer: "The composition of components",
      explanation: "<b>Structural Basis:</b><br><br>This basis includes spatial and temporal arrangements of different components and vertical stratification."
  },
  {
      question: "What is the agrisilviculture system?",
      options: [
          "A system for producing only agricultural crops",
          "A system for producing only woody perennials",
          "A system for producing agricultural crops and woody perennials",
          "A system for producing only livestock"
      ],
      correctAnswer: "A system for producing agricultural crops and woody perennials",
      explanation: "<b>Agrisilviculture System:</b><br><br>This system refers to the use of land for the production of agricultural crops and woody perennials, either simultaneously or alternately."
  },
  {
      question: "Which of the following is NOT an example of the agrisilviculture system?",
      options: [
          "Improved fallow",
          "Shifting cultivation",
          "Silvipasture",
          "Alley cropping"
      ],
      correctAnswer: "Silvipasture",
      explanation: "<b>Examples of Agrisilviculture Practices:</b><br><br>Silvipasture is a different system focused on integrating trees with pasture."
  },
  {
      question: "What does the silvipasture system refer to?",
      options: [
          "A system for producing only agricultural crops",
          "A land management system for wood production and rearing domestic animals",
          "A system for producing only livestock",
          "A system for producing only fish"
      ],
      correctAnswer: "A land management system for wood production and rearing domestic animals",
      explanation: "<b>Silvipasture System:</b><br><br>This system integrates trees with grasses and is a prominent agroforestry practice."
  },
  {
      question: "What is the agrisilvipasture system?",
      options: [
          "A combination of agrisilviculture and silvipasture systems",
          "A system for producing only agricultural crops",
          "A system for producing only woody perennials",
          "A system for producing only livestock"
      ],
      correctAnswer: "A combination of agrisilviculture and silvipasture systems",
      explanation: "<b>Agrisilvipasture System:</b><br><br>This system integrates agricultural crops, grazing lands, and home gardens involving animals."
  },
  {
      question: "What is apiculture with trees?",
      options: [
          "A system for producing honey using tree species",
          "A system for producing only agricultural crops",
          "A system for producing only livestock",
          "A system for producing only fish"
      ],
      correctAnswer: "A system for producing honey using tree species",
      explanation: "<b>Apiculture System:</b><br><br>This system involves planting honey-producing tree species that are frequently visited by honeybees."
  },
  {
      question: "What is aquaforestry?",
      options: [
          "A system for producing only agricultural crops",
          "A system for producing fish using trees and shrubs",
          "A system for producing only livestock",
          "A system for producing only honey"
      ],
      correctAnswer: "A system for producing fish using trees and shrubs",
      explanation: "<b>Aquaforestry:</b><br><br>This system focuses on fish production and bund stabilization around ponds."
  },
  {
      question: "How is agroforestry classified based on the dominance of components?",
      options: [
          "Into two categories",
          "Into four categories",
          "Into six categories",
          "Into multiple categories"
      ],
      correctAnswer: "Into multiple categories",
      explanation: "<b>Classification Based on Dominance:</b><br><br>Agroforestry systems can be classified based on the dominance of components into several categories."
  },
  {
      question: "What is silvoagriculture?",
      options: [
          "A system where agriculture is the primary aim",
          "A system where silviculture is the primary aim",
          "A system where livestock is the primary aim",
          "A system where fish is the primary aim"
      ],
      correctAnswer: "A system where silviculture is the primary aim",
      explanation: "<b>Silvoagriculture:</b><br><br>This system integrates trees as the major component while agricultural crops are secondary."
  },
  {
      question: "What is the agrisilvopastural system?",
      options: [
          "A combination of crops, trees, and pastures",
          "A system for producing only agricultural crops",
          "A system for producing only woody perennials",
          "A system for producing only livestock"
      ],
      correctAnswer: "A combination of crops, trees, and pastures",
      explanation: "<b>Agrisilvopastural System:</b><br><br>This system has agricultural crops dominant over trees and pasture."
  },
  {
    question: "How can agroforestry systems be classified based on the arrangement of components?",
    options: [
        "In space, in time, and vertical stratification",
        "By species composition",
        "By economic value",
        "By historical context"
    ],
    correctAnswer: "In space, in time, and vertical stratification",
    explanation: "<b>Arrangement of Components:</b><br><br>This classification helps in understanding how different elements interact within the agroforestry system."
},
{
    question: "What is a mixed dense agroforestry system?",
    options: [
        "Components arranged together with high density",
        "Components arranged together with low density",
        "Components arranged in strips",
        "Components arranged separately"
    ],
    correctAnswer: "Components arranged together with high density",
    explanation: "<b>Mixed Dense System:</b><br><br>This arrangement is exemplified by home gardens."
},
{
    question: "What does a coincident system in agroforestry refer to?",
    options: [
        "Different crops occupying the land together",
        "Different crops occupying the land at different times",
        "Crops grown separately",
        "Crops grown in layers"
    ],
    correctAnswer: "Different crops occupying the land together",
    explanation: "<b>Coincident System:</b><br><br>Examples include tea/coffee grown under trees."
},
{
    question: "What is the primary focus of a productive agroforestry system?",
    options: [
        "To protect the land",
        "To produce essential commodities",
        "To optimize land use",
        "To enhance biodiversity"
    ],
    correctAnswer: "To produce essential commodities",
    explanation: "<b>Productive Agroforestry System:</b><br><br>This system includes intercropping of trees and home gardens."
},
{
    question: "What is a protective agroforestry system designed to do?",
    options: [
        "Produce food",
        "Protect the land and improve climate",
        "Maximize profit",
        "Increase crop yield"
    ],
    correctAnswer: "Protect the land and improve climate",
    explanation: "<b>Protective Agroforestry System:</b><br><br>Examples include windbreaks and shelterbelts."
},
{
    question: "What is a multipurpose agroforestry system?",
    options: [
        "A system focused on a single product",
        "A system that ensures production through optimizing both productive and protective functions",
        "A system that only produces timber",
        "A system that only focuses on livestock"
    ],
    correctAnswer: "A system that ensures production through optimizing both productive and protective functions",
    explanation: "<b>Multipurpose Agroforestry System:</b><br><br>Examples include hedgerow intercropping and home gardens."
},
{
    question: "What does vertical stratification in agroforestry refer to?",
    options: [
        "The arrangement of components in a single layer",
        "The layering of components in different vertical levels",
        "The economic value of components",
        "The historical context of components"
    ],
    correctAnswer: "The layering of components in different vertical levels",
    explanation: "<b>Vertical Stratification:</b><br><br>This classification helps in understanding how different components occupy space."
},
{
    question: "What is the difference between a coincident and a concomitant system?",
    options: [
        "Coincident systems have crops together, while concomitant systems have them for a certain period",
        "Coincident systems are only for trees, while concomitant systems are for crops",
        "Coincident systems are for livestock, while concomitant systems are for crops",
        "There is no difference"
    ],
    correctAnswer: "Coincident systems have crops together, while concomitant systems have them for a certain period",
    explanation: "<b>Coincident vs. Concomitant:</b><br><br>Coincident systems involve crops occupying the land together, while concomitant systems have different components staying together for a certain period."
},
{
    question: "What is a multilayered agroforestry system?",
    options: [
        "A system with components in one layer",
        "A system with components in two layers",
        "A system with components in more than two layers",
        "A system with no layers"
    ],
    correctAnswer: "A system with components in more than two layers",
    explanation: "<b>Multilayered System:</b><br><br>This system is exemplified by homestead agroforestry."
},
{
    question: "What is the primary aim of a silvoagriculture system?",
    options: [
        "To produce only crops",
        "To produce only trees",
        "To integrate trees as the major component while including crops",
        "To focus on livestock"
    ],
    correctAnswer: "To integrate trees as the major component while including crops",
    explanation: "<b>Silvoagriculture:</b><br><br>This system has silviculture as the primary aim of land use."
},
{
  question: "How can agroforestry systems be classified based on ecological parameters?",
  options: [
      "By species composition",
      "By climatic, edaphic, and physiographic factors",
      "By historical context",
      "By economic value"
  ],
  correctAnswer: "By climatic, edaphic, and physiographic factors",
  explanation: "<b>Ecological Classification:</b><br><br>This classification is based on important ecological parameters."
},
{
  question: "What does the tropical classification of agroforestry refer to?",
  options: [
      "Vegetation in extreme climates with high temperature and low humidity",
      "Vegetation in moderate climates",
      "Vegetation in cold climates",
      "Vegetation in mountainous regions"
  ],
  correctAnswer: "Vegetation in extreme climates with high temperature and low humidity",
  explanation: "<b>Tropical Classification:</b><br><br>Examples include tropical silvipasture."
},
{
  question: "What is the hydromorphic agroforestry system?",
  options: [
      "Agroforestry in dry areas",
      "Agroforestry in wetlands or waterlogged areas",
      "Agroforestry in temperate regions",
      "Agroforestry in mountainous regions"
  ],
  correctAnswer: "Agroforestry in wetlands or waterlogged areas",
  explanation: "<b>Hydromorphic System:</b><br><br>Examples include aquasilviculture."
},
{
  question: "What is a subsistence agroforestry system?",
  options: [
      "A system focused on large-scale production for sale",
      "A system aimed at meeting the basic needs of small families",
      "A system that uses modern technology",
      "A system that only produces timber"
  ],
  correctAnswer: "A system aimed at meeting the basic needs of small families",
  explanation: "<b>Subsistence Agroforestry System:</b><br><br>Examples include shifting cultivation and homestead agroforestry."
},
{
  question: "What is a commercial agroforestry system?",
  options: [
      "A system focused on small-scale production",
      "A system that aims for large-scale production for sale",
      "A system that only produces food",
      "A system that uses low technology"
  ],
  correctAnswer: "A system that aims for large-scale production for sale",
  explanation: "<b>Commercial Agroforestry System:</b><br><br>Examples include tea/coffee grown under shade trees."
},
{
  question: "What is an intensively managed agroforestry system?",
  options: [
      "A system with low production",
      "A system managed for more production per unit area",
      "A system that only produces livestock",
      "A system that uses primitive technology"
  ],
  correctAnswer: "A system managed for more production per unit area",
  explanation: "<b>Intensively Managed System:</b><br><br>Examples include home gardens and tea gardens."
},
{
  question: "What is integrated-farm-forestry?",
  options: [
      "A system that only produces crops",
      "A system that integrates crops, animals, fishes, and trees",
      "A system that only focuses on livestock",
      "A system that only produces timber"
  ],
  correctAnswer: "A system that integrates crops, animals, fishes, and trees",
  explanation: "<b>Integrated-farm-forestry:</b><br><br>This system promotes diverse production in a single area."
},
{
  question: "What is roadside agroforestry?",
  options: [
      "Production of crops in urban areas",
      "Production of deep-rooted tall trees along roads",
      "Production of only livestock",
      "Production of timber in forests"
  ],
  correctAnswer: "Production of deep-rooted tall trees along roads",
  explanation: "<b>Roadside Agroforestry:</b><br><br>This system involves planting trees and crops along roads, highways, and railways."
},
{
  question: "What is a low technology agroforestry system?",
  options: [
      "A system that uses modern technology",
      "A system that uses primitive technology",
      "A system that focuses on large-scale production",
      "A system that only produces food"
  ],
  correctAnswer: "A system that uses primitive technology",
  explanation: "<b>Low Technology System:</b><br><br>Examples include shifting cultivation."
},
{
  question: "What is a high technology agroforestry system?",
  options: [
      "A system that uses modern technology for production",
      "A system that uses primitive technology",
      "A system that focuses on small-scale production",
      "A system that only produces livestock"
  ],
  correctAnswer: "A system that uses modern technology for production",
  explanation: "<b>High Technology System:</b><br><br>Examples include tea gardens."
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
      // Store wrong answers with explanation
      setWrongAnswers(prev => [...prev, {
        question: currentQuestion.question,
        yourAnswer: option,
        correctAnswer: currentQuestion.correctAnswer,
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
                  <div key={`wrong-${index}`} className="review-item">
                    <p className="review-question">{item.question}</p>
                    <p className="your-answer">Your Answer: <span className="incorrect">{item.yourAnswer}</span></p>
                    <p className="correct-answer">Correct Answer: <span className="correct">{item.correctAnswer}</span></p>
                    {item.explanation && (
                      <div 
                        className="explanation-content"
                        dangerouslySetInnerHTML={{ __html: item.explanation }}
                      />
                    )}
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

            {selectedAnswer && currentQuestion.explanation && (
              <div 
                className="explanation-content"
                dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }}
              />
            )}

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
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
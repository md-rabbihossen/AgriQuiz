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
    ],
    'soil classification': [
      {
        question: "Soil classification is a _______ categorical system.",
        answer: "multi",
        acceptableAnswers: ["multi", "Multi", "MULTI"]
      },
      {
        question: "Early soil classification systems were based on a _______ characteristic.",
        answer: "single",
        acceptableAnswers: ["single", "Single", "SINGLE"]
      },
      {
        question: "_______ classification groups soils based on their productivity for taxation.",
        answer: "Economic",
        acceptableAnswers: ["Economic", "economic", "ECONOMIC"]
      },
      {
        question: "Soil is made up of particles of different _______.",
        answer: "sizes",
        acceptableAnswers: ["sizes", "Sizes", "SIZES"]
      },
      {
        question: "_______ classification groups soils based on their texture.",
        answer: "Physical",
        acceptableAnswers: ["Physical", "physical", "PHYSICAL"]
      },
      {
        question: "Soil is formed through _______ processes.",
        answer: "pedogenic",
        acceptableAnswers: ["pedogenic", "Pedogenic", "PEDOGENIC"]
      },
      {
        question: "_______ classification is based on parent rock material.",
        answer: "Geological",
        acceptableAnswers: ["Geological", "geological", "GEOLOGICAL"]
      },
      {
        question: "Soil classification helps in transferring _______ from research to fields.",
        answer: "agro-technology",
        acceptableAnswers: ["agro-technology", "Agro-technology", "AGRO-TECHNOLOGY"]
      },
      {
        question: "Soil is a _______ body formed by various factors.",
        answer: "natural",
        acceptableAnswers: ["natural", "Natural", "NATURAL"]
      },
      {
        question: "_______ classification groups soils based on landscape characteristics.",
        answer: "Physiographic",
        acceptableAnswers: ["Physiographic", "physiographic", "PHYSIOGRAPHIC"]
      },
      {
        question: "Dokuchaiev divided soils into _______ categories.",
        answer: "three",
        acceptableAnswers: ["three", "Three", "THREE", "3"]
      },
      {
        question: "_______ soils show accumulation of calcium carbonate in Marbut's system.",
        answer: "Pedocals",
        acceptableAnswers: ["Pedocals", "pedocals", "PEDOCALS"]
      },
      {
        question: "Normal soils are also called _______ soils in Dokuchaiev's system.",
        answer: "Zonal",
        acceptableAnswers: ["Zonal", "zonal", "ZONAL"]
      },
      {
        question: "Pedalfers occur in areas of high _______.",
        answer: "rainfall",
        acceptableAnswers: ["rainfall", "Rainfall", "RAINFALL"]
      },
      {
        question: "Baldwin's system was a revision of _______ system.",
        answer: "Marbut's",
        acceptableAnswers: ["Marbut's", "Marbuts", "marbut's", "MARBUT'S"]
      },
      {
        question: "_______ soils have fully developed soil profiles reflecting climate influence.",
        answer: "Normal",
        acceptableAnswers: ["Normal", "normal", "NORMAL", "Zonal", "zonal"]
      },
      {
        question: "Marbut's system was developed in _______.",
        answer: "1927",
        acceptableAnswers: ["1927"]
      },
      {
        question: "The Russian zonality concept was incorporated into _______ system.",
        answer: "Baldwin's",
        acceptableAnswers: ["Baldwin's", "Baldwins", "BALDWIN'S"]
      },
      {
        question: "Intrazonal soils show the influence of _______ conditions.",
        answer: "local",
        acceptableAnswers: ["local", "Local", "LOCAL"]
      },
      {
        question: "Great Soil Groups are subdivided into soil _______ and types.",
        answer: "families",
        acceptableAnswers: ["families", "Families", "FAMILIES"]
      }
    ],
    'soil taxonomy- a comprehensive system': [
      {
        question: "The comprehensive System of Soil Classification is popularly known as _______ approximation.",
        answer: "7th",
        acceptableAnswers: ["7th", "seventh", "SEVENTH", "7", "Seven", "seven"]
      },
      {
        question: "A diagnostic horizon is formed through _______ processes.",
        answer: "pedogenetic",
        acceptableAnswers: ["pedogenetic", "Pedogenetic", "PEDOGENETIC"]
      },
      {
        question: "The diagnostic surface horizons are called _______.",
        answer: "epipedons",
        acceptableAnswers: ["epipedons", "Epipedons", "EPIPEDONS"]
      },
      {
        question: "Mollic epipedon has _______ base saturation.",
        answer: "high",
        acceptableAnswers: ["high", "High", "HIGH"]
      },
      {
        question: "_______ epipedon is man-made or artificial.",
        answer: "Plaggen",
        acceptableAnswers: ["Plaggen", "plaggen", "PLAGGEN"]
      },
      {
        question: "The word 'epi' in epipedon means _______.",
        answer: "over",
        acceptableAnswers: ["over", "Over", "OVER"]
      },
      {
        question: "Endopedons includes the _______ part of the soil where materials accumulate.",
        answer: "lower",
        acceptableAnswers: ["lower", "Lower", "LOWER"]
      },
      {
        question: "Melanic epipedon contains _______ % or more volcanic ash.",
        answer: "60",
        acceptableAnswers: ["60", "sixty", "SIXTY"]
      },
      {
        question: "Umbric epipedon has _______ base saturation.",
        answer: "low",
        acceptableAnswers: ["low", "Low", "LOW"]
      },
      {
        question: "The word 'anthrops' in Anthropic epipedon means _______.",
        answer: "man",
        acceptableAnswers: ["man", "Man", "MAN"]
      },
      {
        question: "The _______ horizon is cemented by silica and doesn't slake in water or HCl.",
        answer: "Duripan",
        acceptableAnswers: ["Duripan", "duripan", "DURIPAN"]
      },
      {
        question: "A Natric horizon must have an ESP of more than _______ percent.",
        answer: "15",
        acceptableAnswers: ["15", "fifteen", "FIFTEEN"]
      },
      {
        question: "The _______ horizon is formed due to alteration by physical and chemical weathering.",
        answer: "Cambic",
        acceptableAnswers: ["Cambic", "cambic", "CAMBIC"]
      },
      {
        question: "An Oxic horizon must be at least _______ cm thick.",
        answer: "30",
        acceptableAnswers: ["30", "thirty", "THIRTY"]
      },
      {
        question: "The _______ horizon is a special type of argillic horizon high in sodium.",
        answer: "Natric",
        acceptableAnswers: ["Natric", "natric", "NATRIC"]
      },
      {
        question: "The _______ horizon is formed directly under the plough layer.",
        answer: "Agric",
        acceptableAnswers: ["Agric", "agric", "AGRIC"]
      },
      {
        question: "A Gypsic horizon must have at least _______ % more gypsum than the underlying stratum.",
        answer: "5",
        acceptableAnswers: ["5", "five", "FIVE"]
      },
      {
        question: "The _______ horizon is the bleached E horizon of podzols and planosols.",
        answer: "Albic",
        acceptableAnswers: ["Albic", "albic", "ALBIC"]
      },
      {
        question: "A Salic horizon must be at least _______ cm thick.",
        answer: "15",
        acceptableAnswers: ["15", "fifteen", "FIFTEEN"]
      },
      {
        question: "The _______ horizon is enriched with Fe and Al oxides.",
        answer: "Oxic",
        acceptableAnswers: ["Oxic", "oxic", "OXIC"]
      }
    ],
    'soil moisture and temperature regimes': [
      {
        question: "Soil is considered moist when it is at moisture tension of less than _______ bar.",
        answer: "15",
        acceptableAnswers: ["15", "fifteen", "FIFTEEN"]
      },
      {
        question: "_______ moisture regime is characterized by poorly drained soils.",
        answer: "Aquic",
        acceptableAnswers: ["Aquic", "aquic", "AQUIC"]
      },
      {
        question: "The winter solstice begins from _______ December onwards.",
        answer: "23rd",
        acceptableAnswers: ["23rd", "23", "twenty-third", "TWENTY-THIRD"]
      },
      {
        question: "In Xeric regime, MAST must be less than _______ °C.",
        answer: "22",
        acceptableAnswers: ["22", "twenty-two", "TWENTY-TWO"]
      },
      {
        question: "_______ regime has soils that are moist throughout.",
        answer: "Udic",
        acceptableAnswers: ["Udic", "udic", "UDIC"]
      },
      {
        question: "The summer solstice begins from _______ June onwards.",
        answer: "22nd",
        acceptableAnswers: ["22nd", "22", "twenty-second", "TWENTY-SECOND"]
      },
      {
        question: "SMCS stands for Soil Moisture _______ Section.",
        answer: "Control",
        acceptableAnswers: ["Control", "control", "CONTROL"]
      },
      {
        question: "_______ and torric regimes have soils with negligible moisture.",
        answer: "Aridic",
        acceptableAnswers: ["Aridic", "aridic", "ARIDIC"]
      },
      {
        question: "In Ustic regime, SMCS is moist in some parts for _______ cumulative days.",
        answer: "180",
        acceptableAnswers: ["180", "one hundred eighty", "ONE HUNDRED EIGHTY"]
      },
      {
        question: "MAST stands for Mean _______ Soil Temperature.",
        answer: "Annual",
        acceptableAnswers: ["Annual", "annual", "ANNUAL"]
      },
      {
        question: "The _______ temperature regime has a mean annual soil temperature lower than 0°C.",
        answer: "Pergelic",
        acceptableAnswers: ["Pergelic", "pergelic", "PERGELIC"]
      },
      {
        question: "STRs play an important role in classifying soils at the _______ and suborder levels.",
        answer: "family",
        acceptableAnswers: ["family", "Family", "FAMILY"]
      },
      {
        question: "The prefix _______ is used when the difference between mean summer and winter temperature is less than 5°C.",
        answer: "iso",
        acceptableAnswers: ["iso", "Iso", "ISO"]
      },
      {
        question: "_______ regime has a mean annual soil temperature of 28°C or higher.",
        answer: "Megathermic",
        acceptableAnswers: ["Megathermic", "megathermic", "MEGATHERMIC"]
      },
      {
        question: "The _______ regime is warmer in summer than the cryic regime.",
        answer: "Frigid",
        acceptableAnswers: ["Frigid", "frigid", "FRIGID"]
      },
      {
        question: "STRs are measured within the _______ to 100 cm root zone.",
        answer: "5",
        acceptableAnswers: ["5", "five", "FIVE"]
      },
      {
        question: "_______ regime has a mean annual soil temperature between 15°C and 22°C.",
        answer: "Thermic",
        acceptableAnswers: ["Thermic", "thermic", "THERMIC"]
      },
      {
        question: "The _______ regime represents very cold soils with temperature between 0°C and 8°C.",
        answer: "Cryic",
        acceptableAnswers: ["Cryic", "cryic", "CRYIC"]
      },
      {
        question: "_______ regime has a mean annual soil temperature between 8°C and 15°C.",
        answer: "Mesic",
        acceptableAnswers: ["Mesic", "mesic", "MESIC"]
      },
      {
        question: "_______ regime has a mean annual soil temperature between 22°C and 28°C.",
        answer: "Hyperthermic",
        acceptableAnswers: ["Hyperthermic", "hyperthermic", "HYPERTHERMIC"]
      }
    ],
    'categories in soil taxonomy': [
      {
        question: "Soil Taxonomy has _______ categories of classification from highest to lowest levels.",
        answer: "six",
        acceptableAnswers: ["six", "Six", "SIX", "6"]
      },
      {
        question: "The formative element 'ept' is derived from Latin word _______, meaning beginning.",
        answer: "inceptum",
        acceptableAnswers: ["inceptum", "Inceptum", "INCEPTUM"]
      },
      {
        question: "Vertisols must have cracks at least _______ cm wide when dry.",
        answer: "1",
        acceptableAnswers: ["1", "one", "ONE"]
      },
      {
        question: "The USA has approximately _______ soil series.",
        answer: "19000",
        acceptableAnswers: ["19000", "19,000", "nineteen thousand"]
      },
      {
        question: "The formative element 'and' comes from _______ word meaning black soil.",
        answer: "Japanese",
        acceptableAnswers: ["Japanese", "japanese", "JAPANESE"]
      },
      {
        question: "_______ are very recently developed mineral soils with no diagnostic horizon.",
        answer: "Entisols",
        acceptableAnswers: ["Entisols", "entisols", "ENTISOLS"]
      },
      {
        question: "There are approximately _______ great groups in Soil Taxonomy.",
        answer: "240",
        acceptableAnswers: ["240", "240+", "two hundred forty"]
      },
      {
        question: "The formative element 'ox' is derived from _______ word oxide.",
        answer: "French",
        acceptableAnswers: ["French", "french", "FRENCH"]
      },
      {
        question: "Vertisols contain at least _______ percent clay.",
        answer: "30",
        acceptableAnswers: ["30", "thirty", "THIRTY"]
      },
      {
        question: "_______ soils represent the beginning stage in soil formation.",
        answer: "Inceptisols",
        acceptableAnswers: ["Inceptisols", "inceptisols", "INCEPTISOLS"]
      },
      {
        question: "Mollisols are soils of _______ vegetation under sub humid to humid environment.",
        answer: "grassland",
        acceptableAnswers: ["grassland", "Grassland", "GRASSLAND"]
      },
      {
        question: "Spodosols develop under _______ climate and coarse-textured silicious parent material.",
        answer: "cool humid",
        acceptableAnswers: ["cool humid", "Cool humid", "COOL HUMID"]
      },
      {
        question: "Histosols are commonly known as bogs, _______ and mucks.",
        answer: "peat",
        acceptableAnswers: ["peat", "Peat", "PEAT"]
      },
      {
        question: "Most Oxisols have _______ colour, but some are yellow or gray.",
        answer: "brick red",
        acceptableAnswers: ["brick red", "Brick red", "BRICK RED"]
      },
      {
        question: "Gelisols show evidence of _______, which means frost churning or mixing.",
        answer: "cryoturbation",
        acceptableAnswers: ["cryoturbation", "Cryoturbation", "CRYOTURBATION"]
      }
    ],
    'concept of seed technology': [
      {
        question: "Seed Technology is defined as the discipline of study related to seed ________, maintenance, quality, and preservation.",
        answer: "production",
        acceptableAnswers: ["production", "Production", "PRODUCTION"]
      },
      {
        question: "According to Feistritzer (1975), improved seed is a basic tool for ________ food supply.",
        answer: "secured",
        acceptableAnswers: ["secured", "Secured", "SECURED"]
      },
      {
        question: "The introduction of improved seeds can lead to yield increases of up to ________ percent in cereals.",
        answer: "112",
        acceptableAnswers: ["112", "one hundred twelve"]
      },
      {
        question: "In disaster situations, seed technology provides immediate access to ________ seeds for farmers.",
        answer: "improved",
        acceptableAnswers: ["improved", "Improved", "IMPROVED"]
      },
      {
        question: "Seed certification ensures that seeds meet specific standards of ________ and purity.",
        answer: "quality",
        acceptableAnswers: ["quality", "Quality", "QUALITY"]
      },
      {
        question: "The major goal of Seed Technology is to increase agricultural production through the spread of good quality seeds of ________ varieties.",
        answer: "high yielding",
        acceptableAnswers: ["high yielding", "High yielding", "HIGH YIELDING"]
      },
      {
        question: "Rapid multiplication in Seed Technology refers to the quickest possible spread of new varieties developed by ________.",
        answer: "plant breeders",
        acceptableAnswers: ["plant breeders", "Plant breeders", "PLANT BREEDERS"]
      },
      {
        question: "Timely supply ensures that improved seeds are available when needed, preventing disruption in farmers' ________ schedules.",
        answer: "planting",
        acceptableAnswers: ["planting", "Planting", "PLANTING"]
      },
      {
        question: "Assured high quality of seeds is necessary to obtain the expected ________ from the use of improved varieties.",
        answer: "dividends",
        acceptableAnswers: ["dividends", "Dividends", "DIVIDENDS"]
      },
      {
        question: "The price of high-quality seeds should be within reach of the average ________.",
        answer: "farmer",
        acceptableAnswers: ["farmer", "Farmer", "FARMER"]
      },
      {
        question: "In 1908, the ________ was established in Dhaka to improve seed varieties.",
        answer: "Agricultural Research Institute",
        acceptableAnswers: ["Agricultural Research Institute", "agricultural research institute"]
      },
      {
        question: "Seed multiplication farms were established in the public sector in ________ places in 1954.",
        answer: "23",
        acceptableAnswers: ["23"]
      },
      {
        question: "The East Pakistan Agricultural Development Corporation was established in ________ to undertake seed supply.",
        answer: "1961",
        acceptableAnswers: ["1961"]
      },
      {
        question: "The National Seed Board and Seed Certification Agency were established in ________.",
        answer: "1974",
        acceptableAnswers: ["1974"]
      },
      {
        question: "The Seeds Ordinance ________ was promulgated to regulate seed quality.",
        answer: "1977",
        acceptableAnswers: ["1977"]
      }
    ],
    'mouth parts_mizan sir': [
      {
        question: "The group of structures on the lower part of the head is known as ________.",
        answer: "mouthparts",
        acceptableAnswers: ["mouthparts", "Mouthparts", "MOUTHPARTS"]
      },
      {
        question: "The types of mouthparts include chewing, piercing-sucking, ________, siphoning, sponging, cutting-sponging, and chewing-lapping.",
        answer: "rasping-sucking",
        acceptableAnswers: ["rasping-sucking", "Rasping-sucking", "RASPING-SUCKING"]
      },
      {
        question: "Chewing mouthparts consist of a labrum, a pair of mandibles, a pair of maxillae, and a ________.",
        answer: "labium",
        acceptableAnswers: ["labium", "Labium", "LABIUM"]
      },
      {
        question: "Insects like silverfish and cockroaches possess ________ mouthparts.",
        answer: "chewing",
        acceptableAnswers: ["chewing", "Chewing", "CHEWING"]
      },
      {
        question: "Piercing-sucking mouthparts are modified to pierce the epidermis of plants or the skin of ________.",
        answer: "animals",
        acceptableAnswers: ["animals", "Animals", "ANIMALS"]
      },
      {
        question: "The labium in piercing-sucking mouthparts forms a protective ________ for the stylets.",
        answer: "sheath",
        acceptableAnswers: ["sheath", "Sheath", "SHEATH"]
      },
      {
        question: "Thrips have a cone-shaped very short beak or ________.",
        answer: "proboscis",
        acceptableAnswers: ["proboscis", "Proboscis", "PROBOSCIS"]
      },
      {
        question: "The left mandible in thrips is ________.",
        answer: "reduced",
        acceptableAnswers: ["reduced", "Reduced", "REDUCED"]
      },
      {
        question: "Bugs, leafhoppers, and mosquitoes possess ________ mouthparts.",
        answer: "piercing-sucking",
        acceptableAnswers: ["piercing-sucking", "Piercing-sucking", "PIERCING-SUCKING"]
      },
      {
        question: "The mandibles in chewing mouthparts are used to ________ solid food.",
        answer: "cut",
        acceptableAnswers: ["cut", "Cut", "CUT"]
      },
      {
        question: "Siphoning mouthparts are modified for the uptake of ________ and other liquids.",
        answer: "flower nectar",
        acceptableAnswers: ["flower nectar", "Flower nectar", "FLOWER NECTAR"]
      },
      {
        question: "In siphoning mouthparts, the upper lip is much ________.",
        answer: "reduced",
        acceptableAnswers: ["reduced", "Reduced", "REDUCED"]
      },
      {
        question: "The proboscis in siphoning mouthparts is composed of maxillary elements called ________.",
        answer: "galea",
        acceptableAnswers: ["galea", "Galea", "GALEA"]
      },
      {
        question: "Sponging mouthparts consist of a soft fleshy and retractile proboscis formed by fusion of ________ and maxillae.",
        answer: "labium",
        acceptableAnswers: ["labium", "Labium", "LABIUM"]
      },
      {
        question: "House flies and blow flies exhibit ________ mouthparts.",
        answer: "sponging",
        acceptableAnswers: ["sponging", "Sponging", "SPONGING"]
      },
      {
        question: "Chewing-lapping mouthparts are used by insects like ________.",
        answer: "bees",
        acceptableAnswers: ["bees", "Bees", "BEES"]
      },
      {
        question: "The nectar is sucked up by the capillary action of the ________ in chewing-lapping mouthparts.",
        answer: "glossa",
        acceptableAnswers: ["glossa", "Glossa", "GLOSSA"]
      },
      {
        question: "The labella in sponging mouthparts are traversed by a series of fine tubes called ________.",
        answer: "pseudotracheae",
        acceptableAnswers: ["pseudotracheae", "Pseudotracheae", "PSEUDOTRACHEAE"]
      },
      {
        question: "The lower lip in siphoning mouthparts consists of a broad plate and ________ segmented labial palps.",
        answer: "three",
        acceptableAnswers: ["three", "Three", "THREE"]
      },
      {
        question: "Mandibles are ________ in sponging mouthparts.",
        answer: "absent",
        acceptableAnswers: ["absent", "Absent", "ABSENT"]
      }
    ],
    'arthropoda_shakhawat sir': [
      {
        question: "The study of insects is known as _______.",
        answer: "entomology",
        acceptableAnswers: ["entomology"],
        explanation: "<b>Definition of Entomology:</b><br><br>Entomology is the scientific study of insects, their behavior, ecology, and physiology."
      },
      {
        question: "Arthropoda is characterized by the presence of _______ appendages.",
        answer: "jointed",
        acceptableAnswers: ["jointed"],
        explanation: "<b>Characteristics of Arthropoda:</b><br><br>Arthropods have jointed appendages that allow for movement and manipulation of their environment."
      },
      {
        question: "The body of arthropods is covered by an exoskeleton made of _______.",
        answer: "chitin",
        acceptableAnswers: ["chitin"],
        explanation: "<b>Exoskeleton Composition:</b><br><br>The exoskeleton of arthropods is made of chitin, providing support and protection."
      },
      {
        question: "Arachnids have _______ pairs of walking legs.",
        answer: "four",
        acceptableAnswers: ["four"],
        explanation: "<b>Legs of Arachnids:</b><br><br>Arachnids, such as spiders and scorpions, have four pairs of walking legs."
      },
      {
        question: "The heart of arthropods is represented by a _______ vessel.",
        answer: "tubular",
        acceptableAnswers: ["tubular"],
        explanation: "<b>Heart Structure:</b><br><br>The heart in arthropods is tubular and functions to circulate hemolymph."
      },
      {
        question: "The life cycle of arachnids includes stages such as egg, larva, _______ and adult.",
        answer: "nymph",
        acceptableAnswers: ["nymph"],
        explanation: "<b>Life Cycle of Arachnids:</b><br><br>The life cycle includes stages: Egg → Larva (3 pairs of legs) → Nymph (4 pairs of legs) → Adult (4 pairs of legs)."
      },
      {
        question: "The term 'arthropod' means _______ legs.",
        answer: "jointed",
        acceptableAnswers: ["jointed"],
        explanation: "<b>Meaning of Arthropod:</b><br><br>The term 'arthropod' comes from Greek, meaning 'jointed legs'."
      },
      {
        question: "The respiratory structures in arthropods can include gills, trachea, and _______.",
        answer: "book lungs",
        acceptableAnswers: ["book lungs"],
        explanation: "<b>Respiratory Structures:</b><br><br>Some arthropods have book lungs, which are specialized for gas exchange."
      },
      {
        question: "The body of arthropods is bilaterally _______.",
        answer: "symmetrical",
        acceptableAnswers: ["symmetrical"],
        explanation: "<b>Body Symmetry:</b><br><br>Arthropods exhibit bilateral symmetry, meaning their body can be divided into two mirror-image halves."
      },
      {
        question: "The phylum Arthropoda originated in the _______ period.",
        answer: "Cambrian",
        acceptableAnswers: ["Cambrian"],
        explanation: "<b>Origin of Arthropoda:</b><br><br>The phylum Arthropoda is believed to have originated during the Cambrian period, over 500 million years ago."
      },
      {
        question: "Insects have their bodies divided into ______, thorax, and abdomen.",
        answer: "head",
        acceptableAnswers: ["head"],
        explanation: "<b>Body Structure of Insects:</b><br><br>Insects are characterized by a body divided into head, thorax, and abdomen."
      },
      {
        question: "Insects possess ______ pairs of thoracic legs.",
        answer: "three",
        acceptableAnswers: ["three"],
        explanation: "<b>Legs of Insects:</b><br><br>Insects have three pairs of thoracic legs."
      },
      {
        question: "Insects typically have one pair of ______ eyes and one to three simple eyes.",
        answer: "compound",
        acceptableAnswers: ["compound"],
        explanation: "<b>Insect Eyes:</b><br><br>Insects usually have one pair of compound eyes and one to three simple eyes (ocelli)."
      },
      {
        question: "Insects respire primarily through a system of ______.",
        answer: "trachea",
        acceptableAnswers: ["trachea"],
        explanation: "<b>Respiration in Insects:</b><br><br>Insects use a tracheal system for respiration."
      },
      {
        question: "The life cycle of insects can include stages such as egg, ______, and adult.",
        answer: "nymph",
        acceptableAnswers: ["nymph"],
        explanation: "<b>Life Cycle of Insects:</b><br><br>Some insects undergo incomplete metamorphosis, which includes the stages: Egg → Nymph → Adult."
      },
      {
        question: "The economic value of insect pollination worldwide is estimated at ______ billion.",
        answer: "217",
        acceptableAnswers: ["217"],
        explanation: "<b>Economic Importance of Insect Pollination:</b><br><br>The economic value of insect pollination worldwide is estimated at U.S. $217 billion."
      },
      {
        question: "Insects such as bees and butterflies are known as ______.",
        answer: "pollinators",
        acceptableAnswers: ["pollinators"],
        explanation: "<b>Pollinators:</b><br><br>Bees, butterflies, and other insects are crucial for pollination."
      },
      {
        question: "The estimated annual value of ecological services provided by insects in the U.S. is at least ______ billion.",
        answer: "57",
        acceptableAnswers: ["57"],
        explanation: "<b>Ecological Services:</b><br><br>The estimated annual value of ecological services provided by insects in the U.S. is at least $57 billion."
      },
      {
        question: "House flies undergo ______ metamorphosis.",
        answer: "complete",
        acceptableAnswers: ["complete"],
        explanation: "<b>Metamorphosis Type:</b><br><br>House flies undergo complete metamorphosis, which includes the stages: Egg → Larva → Pupa → Adult."
      },
      {
        question: "Silverfish are an example of ______ insects.",
        answer: "wingless",
        acceptableAnswers: ["wingless"],
        explanation: "<b>Examples of Insects:</b><br><br>Silverfish are an example of wingless insects."
      },
      {
        question: "Arthropod predators include insects such as ______, beetles, and wasps.",
        answer: "dragonflies",
        acceptableAnswers: ["dragonflies"],
        explanation: "<b>Examples of Predators:</b><br><br>Dragonflies, beetles, and wasps are examples of arthropod predators."
      },
      {
        question: "Parasitoids are insects that develop on or in a host insect and ultimately ______ the host.",
        answer: "kill",
        acceptableAnswers: ["kill"],
        explanation: "<b>Role of Parasitoids:</b><br><br>Parasitoids develop on or in a host insect and ultimately kill the host."
      },
      {
        question: "Sericulture involves the rearing of ______ for silk production.",
        answer: "silkworms",
        acceptableAnswers: ["silkworms"],
        explanation: "<b>Sericulture:</b><br><br>Sericulture is the agro-based industry involving the rearing of silkworms."
      },
      {
        question: "The Indian lac insect Laccifer lacca is important for ______ production.",
        answer: "lac",
        acceptableAnswers: ["lac"],
        explanation: "<b>Lac Insects:</b><br><br>Laccifer lacca is important for lac production."
      },
      {
        question: "Apiculture is the maintenance of ______ colonies.",
        answer: "honey bee",
        acceptableAnswers: ["honey bee"],
        explanation: "<b>Apiculture:</b><br><br>Apiculture involves the maintenance of honey bee colonies."
      },
      {
        question: "Less than ______% of insects are regarded as pests.",
        answer: "1",
        acceptableAnswers: ["1"],
        explanation: "<b>Pest Classification:</b><br><br>Less than 1% of insects are regarded as pests."
      },
      {
        question: "Common household pests include ants, termites, and ______.",
        answer: "bed bugs",
        acceptableAnswers: ["bed bugs"],
        explanation: "<b>Household Pests:</b><br><br>Common household pests include ants, termites, and bed bugs."
      },
      {
        question: "Mosquitoes can spread diseases such as ______ and dengue fever.",
        answer: "malaria",
        acceptableAnswers: ["malaria"],
        explanation: "<b>Diseases Spread by Mosquitoes:</b><br><br>Mosquitoes can spread diseases such as malaria and dengue fever."
      },
      {
        question: "The most common insect pest of stored grains is the ______ Weevil.",
        answer: "Rice",
        acceptableAnswers: ["Rice"],
        explanation: "<b>Pests of Stored Grains:</b><br><br>The Rice Weevil is one of the most common insect pests of stored grains."
      },
      {
        question: "Insect management for stored grains depends upon good ______ and grain storage practices.",
        answer: "sanitation",
        acceptableAnswers: ["sanitation"],
        explanation: "<b>Insect Management:</b><br><br>Insect management for stored grains depends upon good sanitation and grain storage practices."
      },
      {
        question: "The order _______ is commonly known as Silverfish.",
        answer: "Zygentoma",
        acceptableAnswers: ["Zygentoma"],
        explanation: "<b>Order Zygentoma:</b><br><br>Zygentoma is commonly known as Silverfish."
      },
      {
        question: "The order _______ includes insects known as Dragonflies and Damselflies.",
        answer: "Odonata",
        acceptableAnswers: ["Odonata"],
        explanation: "<b>Order Odonata:</b><br><br>Odonata includes Dragonflies and Damselflies."
      },
      {
        question: "The order _______ is known for its members called Earwigs.",
        answer: "Dermaptera",
        acceptableAnswers: ["Dermaptera"],
        explanation: "<b>Order Dermaptera:</b><br><br>Dermaptera is known for its members called Earwigs."
      },
      {
        question: "The order _______ includes Grasshoppers, Katydids, and Crickets.",
        answer: "Orthoptera",
        acceptableAnswers: ["Orthoptera"],
        explanation: "<b>Order Orthoptera:</b><br><br>Orthoptera includes Grasshoppers, Katydids, and Crickets."
      },
      {
        question: "The order _______ is known for its members called Beetles.",
        answer: "Coleoptera",
        acceptableAnswers: ["Coleoptera"],
        explanation: "<b>Order Coleoptera:</b><br><br>Coleoptera is known for its members called Beetles."
      },
      {
        question: "The order _______ is commonly known as Butterflies and Moths.",
        answer: "Lepidoptera",
        acceptableAnswers: ["Lepidoptera"],
        explanation: "<b>Order Lepidoptera:</b><br><br>Lepidoptera is commonly known as Butterflies and Moths."
      },
      {
        question: "The order _______ includes insects known as Thrips.",
        answer: "Thysanoptera",
        acceptableAnswers: ["Thysanoptera"],
        explanation: "<b>Order Thysanoptera:</b><br><br>Thysanoptera includes insects known as Thrips."
      },
      {
        question: "The order _______ is known for its members called Lacewings.",
        answer: "Neuroptera",
        acceptableAnswers: ["Neuroptera"],
        explanation: "<b>Order Neuroptera:</b><br><br>Neuroptera is known for its members called Lacewings."
      },
      {
        question: "The order _______ is commonly known as Flies.",
        answer: "Diptera",
        acceptableAnswers: ["Diptera"],
        explanation: "<b>Order Diptera:</b><br><br>Diptera is commonly known as Flies."
      },
      {
        question: "The order _______ includes insects known as Caddisflies.",
        answer: "Trichoptera",
        acceptableAnswers: ["Trichoptera"],
        explanation: "<b>Order Trichoptera:</b><br><br>Trichoptera includes insects known as Caddisflies."
      },
      {
        question: "Exopterygota undergo ______ metamorphosis.",
        answer: "incomplete",
        acceptableAnswers: ["incomplete"],
        explanation: "<b>Metamorphosis Type:</b><br><br>Exopterygota undergo incomplete metamorphosis (Hemimetabola)."
      },
      {
        question: "Endopterygota undergo ______ metamorphosis.",
        answer: "complete",
        acceptableAnswers: ["complete"],
        explanation: "<b>Metamorphosis Type:</b><br><br>Endopterygota undergo complete metamorphosis (Holometabola)."
      },
      {
        question: "The immature stage of Exopterygota is called ______ or Nymph.",
        answer: "Naiad",
        acceptableAnswers: ["Naiad"],
        explanation: "<b>Immature Stage:</b><br><br>The immature stage of Exopterygota is called Naiad or Nymph."
      },
      {
        question: "The immature stage of Endopterygota is called ______.",
        answer: "Larva",
        acceptableAnswers: ["Larva"],
        explanation: "<b>Immature Stage:</b><br><br>The immature stage of Endopterygota is called Larva."
      },
      {
        question: "Antennae are also called ______.",
        answer: "feelers",
        acceptableAnswers: ["feelers"],
        explanation: "<b>Antennae:</b><br><br>Antennae are also referred to as feelers."
      },
      {
        question: "The basal segment of an insect's antenna is called ______.",
        answer: "scape",
        acceptableAnswers: ["scape"],
        explanation: "<b>Antennal Structure:</b><br><br>The basal segment of an insect's antenna is called the scape."
      },
      {
        question: "The second antennal segment is called ______.",
        answer: "pedicel",
        acceptableAnswers: ["pedicel"],
        explanation: "<b>Antennal Structure:</b><br><br>The second antennal segment is called the pedicel."
      },
      {
        question: "Johnston's organ is present in the ______ segment of the antenna.",
        answer: "pedicel",
        acceptableAnswers: ["pedicel"],
        explanation: "<b>Johnston's Organ:</b><br><br>Johnston's organ is present in the pedicel segment of the antenna."
      },
      {
        question: "The flagellum of the antenna contains many ______ receptors.",
        answer: "sensory",
        acceptableAnswers: ["sensory"],
        explanation: "<b>Flagellum Function:</b><br><br>The flagellum contains many sensory receptors."
      },
      {
        question: "Antennae are located between or behind the ______ eyes.",
        answer: "compound",
        acceptableAnswers: ["compound"],
        explanation: "<b>Antennae Location:</b><br><br>Antennae are located between or behind the compound eyes."
      },
      {
        question: "Antennae are useful to detect ______ including food and pheromones.",
        answer: "chemicals",
        acceptableAnswers: ["chemicals"],
        explanation: "<b>Function of Antennae:</b><br><br>Antennae are useful to detect chemicals including food and pheromones."
      },
      {
        question: "Antennae perceive smell, humidity changes, variation in ______, vibration, wind velocity, and direction.",
        answer: "temperature",
        acceptableAnswers: ["temperature"],
        explanation: "<b>Function of Antennae:</b><br><br>Antennae perceive smell, humidity changes, variation in temperature, vibration, wind velocity, and direction."
      },
      {
        question: "The type of antennae that are bristle-like is called ______.",
        answer: "setaceous",
        acceptableAnswers: ["setaceous"],
        explanation: "<b>Setaceous Antennae:</b><br><br>Setaceous antennae are bristle-like."
      },
      {
        question: "The second antennal segment is called ______.",
        answer: "pedicel",
        acceptableAnswers: ["pedicel"],
        explanation: "<b>Antennal Structure:</b><br><br>The second antennal segment is called the pedicel."
      },
      {
        question: "The basal segment of an insect's antenna is called ______.",
        answer: "scape",
        acceptableAnswers: ["scape"],
        explanation: "<b>Antennal Structure:</b><br><br>The basal segment of an insect's antenna is called the scape."
      },
      {
        question: "The terminal segment of aristate antennae bears a conspicuous dorsal bristle called ______.",
        answer: "arista",
        acceptableAnswers: ["arista"],
        explanation: "<b>Aristate Antennae:</b><br><br>The terminal segment of aristate antennae bears a conspicuous dorsal bristle called arista."
      },
      {
        question: "The type of antennae that are described as comb-like with long slender processes on one side is called ______.",
        answer: "unipectinate",
        acceptableAnswers: ["unipectinate"],
        explanation: "<b>Unipectinate Antennae:</b><br><br>Unipectinate antennae are comb-like with long slender processes on one side."
      },
      {
        question: "The type of antennae that are described as feathery is called ______.",
        answer: "plumose",
        acceptableAnswers: ["plumose"],
        explanation: "<b>Plumose Antennae:</b><br><br>Plumose antennae are feathery."
      },
      {
        question: "The type of antennae that enlarges gradually towards the tip is called ______.",
        answer: "clavate",
        acceptableAnswers: ["clavate"],
        explanation: "<b>Clavate Antennae:</b><br><br>Clavate antennae enlarge gradually towards the tip."
      },
      {
        question: "The type of antennae that is described as elbowed is called ______.",
        answer: "geniculate",
        acceptableAnswers: ["geniculate"],
        explanation: "<b>Geniculate Antennae:</b><br><br>Geniculate antennae are elbowed."
      }
    ],
    'tree crop interaction_nazmun nahar': [
      {
        question: "Agroforestry is defined as the deliberate integration of ______ components with agricultural and pastoral operations.",
        answer: "woody",
        acceptableAnswers: ["woody"],
        explanation: "<b>Agroforestry Definition:</b><br><br>Agroforestry involves the integration of woody components with agricultural and pastoral operations."
      },
      {
        question: "The components of agroforestry include trees, crops, and ______.",
        answer: "animals",
        acceptableAnswers: ["animals"],
        explanation: "<b>Components of Agroforestry:</b><br><br>The components of agroforestry include trees, crops, and animals."
      },
      {
        question: "Ecological interactions enable the balance of life in a specific ______.",
        answer: "community",
        acceptableAnswers: ["community"],
        explanation: "<b>Ecological Interactions:</b><br><br>Ecological interactions enable a balance of life in a specific community."
      },
      {
        question: "Competition occurs because the components have common growth ______.",
        answer: "resources",
        acceptableAnswers: ["resources"],
        explanation: "<b>Resource Competition:</b><br><br>Competition occurs due to common growth resources such as light, water, and nutrients."
      },
      {
        question: "The primary definition of interaction in agroforestry is the effect of one component on the performance of another ______.",
        answer: "component",
        acceptableAnswers: ["component"],
        explanation: "<b>Definition of Interaction:</b><br><br>Interaction is defined as the effect of one component on the performance of another component."
      },
      {
        question: "The type of agroforestry where crops are dominant is called ______.",
        answer: "Agrisilviculture",
        acceptableAnswers: ["Agrisilviculture"],
        explanation: "<b>Agrisilviculture:</b><br><br>Agrisilviculture is a type of agroforestry where crops are dominant."
      },
      {
        question: "Economic interactions are conducted between economic agents through the exchange of goods, services, and ______.",
        answer: "money",
        acceptableAnswers: ["money"],
        explanation: "<b>Economic Interactions:</b><br><br>Economic interactions involve the exchange of goods, services, and money."
      },
      {
        question: "The growth resources in agroforestry are light, water, and ______.",
        answer: "nutrients",
        acceptableAnswers: ["nutrients"],
        explanation: "<b>Growth Resources:</b><br><br>The growth resources in agroforestry include light, water, and nutrients."
      },
      {
        question: "Agroforestry contributes to ______ input sustainable agriculture.",
        answer: "low",
        acceptableAnswers: ["low"],
        explanation: "<b>Contribution to Sustainable Agriculture:</b><br><br>Agroforestry contributes to low input sustainable agriculture."
      },
      {
        question: "Interactions in agroforestry occur both above ground and ______.",
        answer: "below ground",
        acceptableAnswers: ["below ground"],
        explanation: "<b>Types of Interactions:</b><br><br>Interactions in agroforestry occur both above ground and below ground."
      },
      {
        question: "Agroforestry interactions can be classified into ______ and negative interactions.",
        answer: "positive",
        acceptableAnswers: ["positive"],
        explanation: "<b>Types of Interactions:</b><br><br>Agroforestry interactions can be classified into positive and negative interactions."
      },
      {
        question: "The interaction where one species inhibits another is called ______.",
        answer: "competition",
        acceptableAnswers: ["competition"],
        explanation: "<b>Competition:</b><br><br>Competition occurs when one species inhibits the growth of another."
      },
      {
        question: "In agroforestry, the type of interaction where both species benefit is known as ______.",
        answer: "mutualism",
        acceptableAnswers: ["mutualism"],
        explanation: "<b>Mutualism:</b><br><br>Mutualism is an interaction where both species benefit from the relationship."
      },
      {
        question: "The type of interaction characterized by shading trees is an example of ______ interaction.",
        answer: "positive",
        acceptableAnswers: ["positive"],
        explanation: "<b>Positive Interaction:</b><br><br>Shading trees provide benefits to crops, reducing stress."
      },
      {
        question: "The interaction where one species is inhibited while the other is unaffected is called ______.",
        answer: "commensalism",
        acceptableAnswers: ["commensalism"],
        explanation: "<b>Commensalism:</b><br><br>Commensalism occurs when one species benefits while the other is neither helped nor harmed."
      },
      {
        question: "The type of interaction where species compete for light, water, and nutrients is called ______.",
        answer: "competition",
        acceptableAnswers: ["competition"],
        explanation: "<b>Competition:</b><br><br>Competition occurs when species compete for limited resources."
      },
      {
        question: "The effect of trampling in tree-animal interactions is ______ for crops.",
        answer: "negative",
        acceptableAnswers: ["negative"],
        explanation: "<b>Trampling:</b><br><br>Trampling can have negative effects on crops by damaging them."
      },
      {
        question: "The interaction where one species directly affects another is called ______ interaction.",
        answer: "direct",
        acceptableAnswers: ["direct"],
        explanation: "<b>Direct Interaction:</b><br><br>Direct interaction occurs when one species directly affects another."
      },
      {
        question: "The type of interaction characterized by environmental alteration is called ______ interaction.",
        answer: "indirect",
        acceptableAnswers: ["indirect"],
        explanation: "<b>Indirect Interaction:</b><br><br>Indirect interaction occurs when species affect each other by altering their environment."
      },
      {
        question: "The interaction where both species are negatively affected is called ______.",
        answer: "inhibition",
        acceptableAnswers: ["inhibition"],
        explanation: "<b>Inhibition:</b><br><br>Inhibition occurs when both species are negatively affected by their interaction."
      },
      {
        question: "Shading trees are beneficial for shade-loving crops like ______ and ginger.",
        answer: "turmeric",
        acceptableAnswers: ["turmeric"],
        explanation: "<b>Benefits of Shading Trees:</b><br><br>Shading trees are beneficial for shade-loving crops like turmeric and ginger."
      },
      {
        question: "In agroforestry systems, photosynthetic efficiencies range from ______ to 2.38%.",
        answer: "1.7%",
        acceptableAnswers: ["1.7%"],
        explanation: "<b>Photosynthetic Efficiency:</b><br><br>In agroforestry systems, photosynthetic efficiencies range from 1.7% to 2.38%."
      },
      {
        question: "Biomass can be added by pruning materials, litter fall, and ______.",
        answer: "crop root residues",
        acceptableAnswers: ["crop root residues"],
        explanation: "<b>Biomass Contribution:</b><br><br>Biomass can be added by pruning materials, litter fall, and crop root residues."
      },
      {
        question: "The interaction where both species benefit is called ______.",
        answer: "mutualism",
        acceptableAnswers: ["mutualism"],
        explanation: "<b>Mutualism:</b><br><br>Mutualism is an interaction where both species benefit from the relationship."
      },
      {
        question: "Trees can access larger soil volumes for water and nutrients due to their ______ root systems.",
        answer: "deep",
        acceptableAnswers: ["deep"],
        explanation: "<b>Deep Root Systems:</b><br><br>Deep-rooted trees can access larger soil volumes for water and nutrients."
      },
      {
        question: "The reduction of temperature in shaded environments can be as much as ______°C.",
        answer: "5.4",
        acceptableAnswers: ["5.4"],
        explanation: "<b>Temperature Reduction:</b><br><br>Shading can reduce average maximum temperatures by 5.4°C."
      },
      {
        question: "Agroforestry systems utilize three types of light: sunbeam, reflected, and ______ light.",
        answer: "diffuse",
        acceptableAnswers: ["diffuse"],
        explanation: "<b>Efficient Light Use:</b><br><br>Agroforestry systems utilize sunbeam, reflected, and diffuse light."
      },
      {
        question: "Biodiverse ecosystems are generally more efficient in terms of resource use (water, nutrients) and more ______ to environmental stresses.",
        answer: "resilient",
        acceptableAnswers: ["resilient"],
        explanation: "<b>Biodiversity:</b><br><br>Biodiverse ecosystems are generally more resilient to environmental stresses."
      },
      {
        question: "Balanced nutrient utilization ensures effective sharing and ______ of nutrients.",
        answer: "recycling",
        acceptableAnswers: ["recycling"],
        explanation: "<b>Balanced Nutrient Utilization:</b><br><br>Balanced nutrient utilization ensures effective sharing and recycling of nutrients."
      },
      {
        question: "The interaction characterized by shading trees is an example of ______ interaction.",
        answer: "positive",
        acceptableAnswers: ["positive"],
        explanation: "<b>Positive Interaction:</b><br><br>Shading trees provide benefits to crops, reducing stress."
      },
      {
        question: "Microclimate amelioration helps in increasing soil ______.",
        answer: "moisture",
        acceptableAnswers: ["moisture"],
        explanation: "<b>Microclimate Amelioration:</b><br><br>Microclimate amelioration helps in increasing soil moisture."
      },
      {
        question: "Agroforestry optimizes aerial space utilization both ______ and vertically.",
        answer: "horizontally",
        acceptableAnswers: ["horizontally"],
        explanation: "<b>Utilization of Aerial Space:</b><br><br>Agroforestry optimizes aerial space utilization both horizontally and vertically."
      },
      {
        question: "Agroforestry systems reduce evaporation by acting as ______ for adjacent plants.",
        answer: "bioirrigators",
        acceptableAnswers: ["bioirrigators"],
        explanation: "<b>Water Conservation:</b><br><br>Agroforestry systems reduce evaporation by acting as 'bioirrigators' for adjacent plants."
      },
      {
        question: "The effect of shade is more severe for ______ demanding weeds.",
        answer: "light",
        acceptableAnswers: ["light"],
        explanation: "<b>Weed Suppression:</b><br><br>The effect of shade is more severe for light-demanding weeds."
      },
      {
        question: "Soil conservation in agroforestry improves water holding capacity and reduces soil ______.",
        answer: "erosion",
        acceptableAnswers: ["erosion"],
        explanation: "<b>Soil Conservation:</b><br><br>Soil conservation improves water holding capacity and reduces soil erosion."
      },
      {
        question: "Factors influencing tree-crop interactions include tree functional characteristics and ______ type.",
        answer: "canopy",
        acceptableAnswers: ["canopy"],
        explanation: "<b>Factors Influencing Interactions:</b><br><br>Factors influencing tree-crop interactions include tree functional characteristics and canopy type."
      },
      {
        question: "Deep-rooted trees can access nutrients released from ______ in lower soil horizons.",
        answer: "weathering",
        acceptableAnswers: ["weathering"],
        explanation: "<b>Nutrient Cycling:</b><br><br>Deep-rooted trees can access nutrients released from weathering in lower soil horizons."
      },
      {
        question: "Seasonal changes can significantly affect tree-crop interactions by altering resource ______.",
        answer: "availability",
        acceptableAnswers: ["availability"],
        explanation: "<b>Seasonal Changes:</b><br><br>Seasonal changes can significantly affect tree-crop interactions by altering resource availability."
      },
      {
        question: "Silvicultural management practices can optimize tree-crop interactions by enhancing ______ availability.",
        answer: "light",
        acceptableAnswers: ["light"],
        explanation: "<b>Silvicultural Management:</b><br><br>Silvicultural management practices can optimize tree-crop interactions by enhancing light availability."
      },
      {
        question: "Closely planted shrub hedges can efficiently control soil ______.",
        answer: "erosion",
        acceptableAnswers: ["erosion"],
        explanation: "<b>Hedge Planting:</b><br><br>Closely planted shrub hedges can efficiently control soil erosion."
      },
      {
        question: "Light competition can reduce ______ and development of plants.",
        answer: "growth",
        acceptableAnswers: ["growth"],
        explanation: "<b>Light Competition:</b><br><br>Light competition can reduce the growth and development of plants."
      },
      {
        question: "Nutrient competition occurs when both components are taking nutrients from a limited ______ pool.",
        answer: "nutrient",
        acceptableAnswers: ["nutrient"],
        explanation: "<b>Nutrient Competition:</b><br><br>Nutrient competition occurs when both components are taking nutrients from a limited nutrient pool."
      },
      {
        question: "Water competition can depress crop production by competing for ______.",
        answer: "moisture",
        acceptableAnswers: ["moisture"],
        explanation: "<b>Water Competition:</b><br><br>Water competition can depress crop production by competing for moisture."
      },
      {
        question: "Allelopathy refers to the phenomenon where one plant has a detrimental effect on another through the production of ______ compounds.",
        answer: "toxic",
        acceptableAnswers: ["toxic"],
        explanation: "<b>Allelopathy:</b><br><br>Allelopathy refers to the phenomenon where one plant has a detrimental effect on another through the production of toxic chemical compounds."
      },
      {
        question: "The first documented case of allelopathy was observed in ______.",
        answer: "black walnut",
        acceptableAnswers: ["black walnut"],
        explanation: "<b>First Documented Case:</b><br><br>The first documented case of allelopathy was observed in black walnut (Juglans regia)."
      },
      {
        question: "Allelochemicals can interfere with the ______ pathways of neighboring plants.",
        answer: "metabolic",
        acceptableAnswers: ["metabolic"],
        explanation: "<b>Allelochemicals:</b><br><br>Allelochemicals can interfere with the metabolic pathways of neighboring plants."
      },
      {
        question: "Shade cast by upperstory perennials can encourage the growth of some ______.",
        answer: "weeds",
        acceptableAnswers: ["weeds"],
        explanation: "<b>Weed Growth:</b><br><br>Shade cast by upperstory perennials can encourage the growth of some weeds."
      },
      {
        question: "Toxic compounds in Acacia include ______ and tannins.",
        answer: "cyanoglucosides",
        acceptableAnswers: ["cyanoglucosides"],
        explanation: "<b>Toxic Compounds:</b><br><br>Toxic compounds in Acacia include cyanoglucosides and tannins."
      },
      {
        question: "The phenomenon of one plant negatively affecting another through allelochemicals is called ______.",
        answer: "allelopathy",
        acceptableAnswers: ["allelopathy"],
        explanation: "<b>Allelopathy:</b><br><br>The phenomenon of one plant negatively affecting another through allelochemicals is called allelopathy."
      },
      {
        question: "Weed growth can be increased by the shade cast by ______ trees.",
        answer: "upperstory",
        acceptableAnswers: ["upperstory"],
        explanation: "<b>Weed Growth:</b><br><br>Weed growth can be increased by the shade cast by upperstory trees."
      },
      {
        question: "Management options for increased growth include microclimate amelioration and ______.",
        answer: "fertilization",
        acceptableAnswers: ["fertilization"],
        explanation: "<b>Management Options:</b><br><br>Management options for increased growth include microclimate amelioration and fertilization."
      },
      {
        question: "Excessive shading can lead to ______ growth in tree-crop interfaces.",
        answer: "decreased",
        acceptableAnswers: ["decreased"],
        explanation: "<b>Decreased Growth:</b><br><br>Excessive shading can lead to decreased growth in tree-crop interfaces."
      },
      {
        question: "Animals can help in ______ dispersal, enhancing plant diversity.",
        answer: "seed",
        acceptableAnswers: ["seed"],
        explanation: "<b>Seed Dispersal:</b><br><br>Animals can help in seed dispersal, enhancing plant diversity."
      },
      {
        question: "Low quality of tree fodder can adversely affect ______ production.",
        answer: "livestock",
        acceptableAnswers: ["livestock"],
        explanation: "<b>Negative Interactions:</b><br><br>Low quality of tree fodder can adversely affect livestock production."
      },
      {
        question: "Mimosine is a toxic compound found in ______ fodder.",
        answer: "Leucaena",
        acceptableAnswers: ["Leucaena"],
        explanation: "<b>Toxic Compounds:</b><br><br>Mimosine is a toxic compound found in Leucaena fodder."
      },
      {
        question: "Mechanical damage from browsing can harm ______.",
        answer: "trees",
        acceptableAnswers: ["trees"],
        explanation: "<b>Mechanical Damage:</b><br><br>Mechanical damage from browsing can harm trees."
      },
      {
        question: "Shelterbelts provide protection from ______.",
        answer: "wind",
        acceptableAnswers: ["wind"],
        explanation: "<b>Shelterbelts:</b><br><br>Shelterbelts provide protection from wind."
      },
      {
        question: "Phenolic compounds can reduce the ______ value of tree fodder.",
        answer: "feed",
        acceptableAnswers: ["feed"],
        explanation: "<b>Phenolic Compounds:</b><br><br>Phenolic compounds can reduce the feed value of tree fodder."
      },
      {
        question: "Livestock can cause soil ______, negatively impacting tree growth.",
        answer: "compaction",
        acceptableAnswers: ["compaction"],
        explanation: "<b>Soil Compaction:</b><br><br>Livestock can cause soil compaction, negatively impacting tree growth."
      },
      {
        question: "Understanding negative interactions is essential for managing ______ systems effectively.",
        answer: "agroforestry",
        acceptableAnswers: ["agroforestry"],
        explanation: "<b>Understanding Interactions:</b><br><br>Understanding negative interactions is essential for managing agroforestry systems effectively."
      },
      {
        question: "The Land Equivalent Ratio (LER) helps to judge the relative performance of a component of a crop combination compared to ______ stands.",
        answer: "sole",
        acceptableAnswers: ["sole"],
        explanation: "<b>Land Equivalent Ratio:</b><br><br>LER helps to judge the relative performance of a component of a crop combination compared to sole stands."
      },
      {
        question: "The formula for calculating LER is LER = Ci/CS + Ti/______.",
        answer: "TS",
        acceptableAnswers: ["TS"],
        explanation: "<b>LER Formula:</b><br><br>The formula for calculating LER is LER = Ci/CS + Ti/TS."
      },
      {
        question: "In the equation Ysystem = Ytree + Ycrop, F represents the ______ effects of trees.",
        answer: "positive",
        acceptableAnswers: ["positive"],
        explanation: "<b>Positive Effects:</b><br><br>F represents the positive effects of trees on crop growth."
      },
      {
        question: "If F > C, it indicates a ______ interaction.",
        answer: "positive",
        acceptableAnswers: ["positive"],
        explanation: "<b>Positive Interaction:</b><br><br>If F > C, it indicates a positive interaction."
      },
      {
        question: "The choice of species affects the ______ and productivity of both trees and crops.",
        answer: "compatibility",
        acceptableAnswers: ["compatibility"],
        explanation: "<b>Choice of Species:</b><br><br>The choice of species affects the compatibility and productivity of both trees and crops."
      },
      {
        question: "The design of an agroforestry system can be either parallel rows of trees and crops or ______ rows of crops around the tree.",
        answer: "concentric",
        acceptableAnswers: ["concentric"],
        explanation: "<b>Design of Agroforestry System:</b><br><br>The design can be either parallel rows or concentric rows."
      },
      {
        question: "Quantifying tree-crop interaction can be expressed as Ysystem = Ytree + Ycrop + F - ______.",
        answer: "C",
        acceptableAnswers: ["C"],
        explanation: "<b>Quantifying Interaction:</b><br><br>Quantifying tree-crop interaction can be expressed as Ysystem = Ytree + Ycrop + F - C."
      },
      {
        question: "The yield of tree products is represented by ______ in the equation Ysystem = Ytree + Ycrop.",
        answer: "Ytree",
        acceptableAnswers: ["Ytree"],
        explanation: "<b>Yield Representation:</b><br><br>The yield of tree products is represented by Ytree."
      },
      {
        question: "The term LER is derived from its indication of relative land requirements for ______ versus monocultures.",
        answer: "intercrops",
        acceptableAnswers: ["intercrops"],
        explanation: "<b>Land Equivalent Ratio:</b><br><br>LER indicates relative land requirements for intercrops versus monocultures."
      },
      {
        question: "The six tree-crop interaction modes include models like WaNuLCAS and ______.",
        answer: "HyPAR",
        acceptableAnswers: ["HyPAR"],
        explanation: "<b>Tree-Crop Interaction Models:</b><br><br>The six tree-crop interaction modes include models like WaNuLCAS and HyPAR."
      }
    ],
    'concept and classification by nasrin sultana mam': [
      {
        "question": "The term ‘system’ is defined as a group of associated elements forming a _______ whole.",
        "answer": "unified",
        "acceptableAnswers": ["unified"],
        "explanation": "A system involves associated elements working together as a unified entity towards a common goal."
      },
      {
        "question": "An important characteristic of a system is that the elements are _______ and affect each other.",
        "answer": "interrelated",
        "acceptableAnswers": ["interrelated"],
        "explanation": "The interrelation among system elements means changes in one element lead to changes in others."
      },
      {
        "question": "Agroforestry technology often introduces _______ to modify or develop systems and practices.",
        "answer": "innovation",
        "acceptableAnswers": ["innovation"],
        "explanation": "Innovation, typically through scientific intervention, is key to advancing agroforestry systems and practices."
      },
      {
        "question": "ICRAF conducted a global inventory of agroforestry systems between _______ and _______.",
        "answer": "1982 and 1987",
        "acceptableAnswers": ["1982 and 1987"],
        "explanation": "This inventory systematically collected data on agroforestry systems worldwide during this period."
      },
      {
        "question": "Agroforestry systems combine agriculture, forestry, and _______ uses of land.",
        "answer": "pastures",
        "acceptableAnswers": ["pastures", "animals"],
        "explanation": "Agroforestry systems integrate land use involving crops, trees, and animals or pastures."
      },
      {
        question: "According to Nair (1987), the four bases for classifying agroforestry systems are ______, function, socio-economic scale, and ecological spread.",
        answer: "structure",
        acceptableAnswers: ["structure"],
        explanation: "<b>Classification Bases:</b><br><br>Nair identified structure, function, socio-economic scale, and ecological spread as key bases for classifying agroforestry systems."
    },
    {
        question: "Dwivedi (1992) reorganized the classification bases into ______ categories.",
        answer: "seven",
        acceptableAnswers: ["seven"],
        explanation: "<b>Reorganization of Bases:</b><br><br>Dwivedi expanded the classification into seven categories: Structure, Physiognomic, Function, Floristic, Socio-economic, History, and Ecological."
    },
    {
        question: "In Bangladesh, 'land utilization' is included as a basis for classifying agroforestry systems, which emphasizes ______.",
        answer: "land use patterns",
        acceptableAnswers: ["land use patterns"],
        explanation: "<b>Land Utilization:</b><br><br>This basis focuses on how agroforestry systems are adapted to specific land use patterns in Bangladesh."
    },
    {
        question: "The structural basis of agroforestry classification refers to the ______ and arrangement of components.",
        answer: "composition",
        acceptableAnswers: ["composition"],
        explanation: "<b>Structural Basis:</b><br><br>This basis includes both spatial and temporal arrangements of different components within the agroforestry system."
    },
    {
        question: "The functional basis of agroforestry systems refers to the major ______ or role of the components.",
        answer: "function",
        acceptableAnswers: ["function"],
        explanation: "<b>Functional Basis:</b><br><br>This basis highlights the contributions of woody components to the overall productivity of the system."
    },
    {
        question: "The socio-economic basis refers to the level of ______ management in agroforestry systems.",
        answer: "input",
        acceptableAnswers: ["input"],
        explanation: "<b>Socio-economic Basis:</b><br><br>This basis considers management intensity and commercial goals, such as subsistence or commercial."
    },
    {
        question: "The ecological basis refers to the environmental conditions and ______ suitability of agroforestry systems.",
        answer: "ecological",
        acceptableAnswers: ["ecological"],
        explanation: "<b>Ecological Basis:</b><br><br>This basis is based on the assumption that different ecological conditions require distinct agroforestry systems."
    },
    {
        question: "The physiognomic basis refers to the characters of vegetation, such as ______, mesomorphic, and hydromorphic.",
        answer: "xeromorphic",
        acceptableAnswers: ["xeromorphic"],
        explanation: "<b>Physiognomic Basis:</b><br><br>This classification helps in understanding how different vegetation types adapt to their environments."
    },
    {
        question: "The floristic basis considers the ______ composition widely adopted in different regions.",
        answer: "species",
        acceptableAnswers: ["species"],
        explanation: "<b>Floristic Basis:</b><br><br>This basis is important for understanding the diversity and ecological interactions within agroforestry systems."
    },
    {
        question: "Historical classification refers to agroforestry systems that evolved over time due to the spread of ______.",
        answer: "knowledge",
        acceptableAnswers: ["knowledge"],
        explanation: "<b>Historical Classification:</b><br><br>This basis helps in understanding how traditional practices have shaped current agroforestry systems."
    },
    {
      question: "The structural basis refers to the ______ of the components, including spatial and temporal arrangement.",
      answer: "composition",
      acceptableAnswers: ["composition"],
      explanation: "<b>Structural Basis:</b><br><br>This basis helps in understanding how various elements interact within the agroforestry system."
  },
  {
      question: "The agrisilviculture system refers to the use of land for the production of agricultural crops and ______ perennials.",
      answer: "woody",
      acceptableAnswers: ["woody"],
      explanation: "<b>Agrisilviculture System:</b><br><br>This system can involve intercropping of woody perennials with agricultural crops."
  },
  {
      question: "Examples of practices within the agrisilviculture system include improved fallow, shifting cultivation, and ______ cropping.",
      answer: "alley",
      acceptableAnswers: ["alley"],
      explanation: "<b>Examples of Agrisilviculture Practices:</b><br><br>These practices help in optimizing land use and enhancing productivity."
  },
  {
      question: "The silvipasture system refers to a land management system where forests are managed for the production of wood and for ______ animals.",
      answer: "domestic",
      acceptableAnswers: ["domestic"],
      explanation: "<b>Silvipasture System:</b><br><br>This system integrates trees with grasses and is a prominent agroforestry practice."
  },
  {
      question: "The agrisilvipasture system is a combination of agrisilviculture and ______ systems.",
      answer: "silvipasture",
      acceptableAnswers: ["silvipasture"],
      explanation: "<b>Agrisilvipasture System:</b><br><br>This system integrates agricultural crops, grazing lands, and home gardens involving animals."
  },
  {
      question: "Apiculture with trees involves planting honey-producing tree species on the ______.",
      answer: "boundary",
      acceptableAnswers: ["boundary"],
      explanation: "<b>Apiculture System:</b><br><br>This system aims for honey production by integrating trees with agricultural crops."
  },
  {
      question: "Aquaforestry involves planting trees and shrubs preferred by fish around ______.",
      answer: "fish ponds",
      acceptableAnswers: ["fish ponds"],
      explanation: "<b>Aquaforestry:</b><br><br>This system focuses on fish production and bund stabilization around ponds."
  },
  {
      question: "Agroforestry systems can be classified based on the dominance of components into categories such as silvoagriculture, agrosilviculture, and ______.",
      answer: "silvopasture",
      acceptableAnswers: ["silvopasture"],
      explanation: "<b>Classification Based on Dominance:</b><br><br>This classification helps in understanding the primary aims of land use."
  },
  {
      question: "In silvoagriculture, ______ is the primary aim of land use.",
      answer: "silviculture",
      acceptableAnswers: ["silviculture"],
      explanation: "<b>Silvoagriculture:</b><br><br>This system integrates trees as the major component while agricultural crops are secondary."
  },
  {
      question: "In agrosilviculture, agriculture is the primary component while trees are ______.",
      answer: "secondary",
      acceptableAnswers: ["secondary"],
      explanation: "<b>Agrosilviculture:</b><br><br>This system includes practices like multipurpose trees on farmland and alley cropping."
  },
  {
      question: "In silvopasture, trees constitute the primary component of land use with ______ as secondary.",
      answer: "pastures",
      acceptableAnswers: ["pastures"],
      explanation: "<b>Silvopasture:</b><br><br>This system is commonly found in grazing lands within forests."
  },
  {
      question: "The agrisilvopastural system is a combination of crops, trees, and ______.",
      answer: "pastures",
      acceptableAnswers: ["pastures"],
      explanation: "<b>Agrisilvopastural System:</b><br><br>This system has agricultural crops dominant over trees and pasture."
  },
  {
      question: "Silvoagropasture is a combination of trees, crops, and ______.",
      answer: "pastures",
      acceptableAnswers: ["pastures"],
      explanation: "<b>Silvoagropasture:</b><br><br>This system has silviculture dominant over other components."
  },
  {
    question: "Agroforestry systems can be classified based on the arrangement of components in three ways: in space, in time, and ______.",
    answer: "vertical stratification",
    acceptableAnswers: ["vertical stratification"],
    explanation: "<b>Arrangement of Components:</b><br><br>This classification helps in understanding how different elements interact within the agroforestry system."
},
{
    question: "In spatial arrangement, a mixed dense system refers to different components arranged together with ______ density.",
    answer: "high",
    acceptableAnswers: ["high"],
    explanation: "<b>Mixed Dense System:</b><br><br>This arrangement is exemplified by home gardens."
},
{
    question: "In spatial arrangement, a mixed sparse system refers to different components arranged together with ______ density.",
    answer: "low",
    acceptableAnswers: ["low"],
    explanation: "<b>Mixed Sparse System:</b><br><br>This arrangement is often seen in systems of trees in pastures."
},
{
    question: "In temporal sequence, a coincident system occurs when different crops occupy the land ______.",
    answer: "together",
    acceptableAnswers: ["together"],
    explanation: "<b>Coincident System:</b><br><br>Examples include tea/coffee grown under trees."
},
{
    question: "In temporal sequence, an intermittent system occurs when annual crops are grown with ______ crops.",
    answer: "perennial",
    acceptableAnswers: ["perennial"],
    explanation: "<b>Intermittent System:</b><br><br>Examples include paddy grown with coconut."
},
{
    question: "Vertical stratification refers to the layering of components in agroforestry systems, which can be classified into single layered, double layered, and ______.",
    answer: "multilayered",
    acceptableAnswers: ["multilayered"],
    explanation: "<b>Vertical Stratification:</b><br><br>This classification helps in understanding how different components occupy space."
},
{
    question: "Functional classification refers to the major function or role of the components, usually furnished by ______ components.",
    answer: "woody",
    acceptableAnswers: ["woody"],
    explanation: "<b>Functional Classification:</b><br><br>This classification emphasizes productivity and sustainability."
},
{
    question: "A productive agroforestry system refers to the production of essential ______ required to meet the basic needs of society.",
    answer: "commodities",
    acceptableAnswers: ["commodities"],
    explanation: "<b>Productive Agroforestry System:</b><br><br>This includes intercropping of trees and home gardens."
},
{
    question: "A protective agroforestry system aims to protect the land and improve ______.",
    answer: "climate",
    acceptableAnswers: ["climate"],
    explanation: "<b>Protective Agroforestry System:</b><br><br>Examples include windbreaks and shelterbelts."
},
{
    question: "A multipurpose agroforestry system ensures production through optimizing both productive and ______ functions.",
    answer: "protective",
    acceptableAnswers: ["protective"],
    explanation: "<b>Multipurpose Agroforestry System:</b><br><br>Examples include hedgerow intercropping and home gardens."
},
{
  question: "Agroforestry systems can be classified based on ecological parameters into categories such as tropical, sub-tropical, and ______.",
  answer: "temperate",
  acceptableAnswers: ["temperate"],
  explanation: "<b>Ecological Classification:</b><br><br>This classification is based on important ecological parameters like climatic, edaphic, and physiographic factors."
},
{
  question: "The hydromorphic agroforestry system refers to agroforestry in ______ or waterlogged areas.",
  answer: "wetlands",
  acceptableAnswers: ["wetlands"],
  explanation: "<b>Hydromorphic System:</b><br><br>Examples include aquasilviculture and scattered trees on paddy fields."
},
{
  question: "The xeromorphic agroforestry system refers to dryland agroforestry in ______ and semi-arid areas.",
  answer: "arid",
  acceptableAnswers: ["arid"],
  explanation: "<b>Xeromorphic System:</b><br><br>Examples include agroforestry practices in Africa."
},
{
  question: "The mesomorphic agroforestry system refers to systems where water is available in ______ quantities.",
  answer: "optimal",
  acceptableAnswers: ["optimal"],
  explanation: "<b>Mesomorphic System:</b><br><br>Examples include agroforestry practices followed in Bangladesh."
},
{
  question: "On the basis of level of production, a subsistence agroforestry system aims at meeting the basic needs of small families with very little ______ for investment.",
  answer: "capacity",
  acceptableAnswers: ["capacity"],
  explanation: "<b>Subsistence Agroforestry System:</b><br><br>Examples include shifting cultivation and homestead agroforestry."
},
{
  question: "A commercial agroforestry system refers to large-scale production on a ______ basis.",
  answer: "commercial",
  acceptableAnswers: ["commercial"],
  explanation: "<b>Commercial Agroforestry System:</b><br><br>Examples include tea/coffee grown under shade trees."
},
{
  question: "An intensively managed agroforestry system is managed for more production per unit ______.",
  answer: "area",
  acceptableAnswers: ["area"],
  explanation: "<b>Intensively Managed System:</b><br><br>Examples include home gardens and tea gardens."
},
{
  question: "A low technology agroforestry system uses ______ technology.",
  answer: "primitive",
  acceptableAnswers: ["primitive"],
  explanation: "<b>Low Technology System:</b><br><br>Examples include shifting cultivation."
},
{
  question: "Homestead agroforestry involves the production of ______ in homestead areas.",
  answer: "multipurpose trees",
  acceptableAnswers: ["multipurpose trees"],
  explanation: "<b>Homestead Agroforestry:</b><br><br>This system focuses on integrating trees into household farming."
},
{
  question: "Integrated-farm-forestry refers to the production of crops, animals, fishes, and ______ together.",
  answer: "trees",
  acceptableAnswers: ["trees"],
  explanation: "<b>Integrated-farm-forestry:</b><br><br>This system promotes diverse production in a single area."
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
      // Store wrong answers with explanation
      setWrongAnswers(prev => [...prev, {
        question: currentQuestion.question || currentQuestion.statement,
        yourAnswer: userAnswer.trim(),
        correctAnswer: currentQuestion.answer,
        explanation: currentQuestion.explanation
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
                  <div 
                    className="explanation-content"
                    dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }}
                  />
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
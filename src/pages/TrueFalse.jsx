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
    ],
    'soil classification': [
      {
        question: "Soil classification is based on multiple characteristics in modern systems.",
        answer: true,
        explanation: "Modern soil classification uses a multi-categorical or hierarchical system that considers multiple soil characteristics."
      },
      {
        question: "Early classification systems were more comprehensive than modern systems.",
        answer: false,
        explanation: "Early classification systems were limited as they were based on single characteristics, while modern systems are more comprehensive."
      },
      {
        question: "Physical classification of soil is based on soil texture.",
        answer: true,
        explanation: "Physical classification groups soils based on their texture, such as loamy, sandy, and clayey soils."
      },
      {
        question: "Economic classification of soil is primarily used for research purposes.",
        answer: false,
        explanation: "Economic classification was primarily used for taxation purposes based on soil productivity."
      },
      {
        question: "Soil is formed only through physical processes.",
        answer: false,
        explanation: "Soil is formed through the interaction of various soil-forming factors and pedogenic processes."
      },
      {
        question: "Geological classification is based on parent rock material.",
        answer: true,
        explanation: "Geological classification groups soils based on the nature of underlying parent rock or parent material."
      },
      {
        question: "Physiographic classification considers only soil depth.",
        answer: false,
        explanation: "Physiographic classification is based on landscape characteristics, not just soil depth."
      },
      {
        question: "Soil classification helps in transferring agricultural technology to farmers' fields.",
        answer: true,
        explanation: "One of the main purposes of soil classification is to facilitate the transfer of agro-technology from research to cultivators' fields."
      },
      {
        question: "Early classification systems were based on multiple characteristics.",
        answer: false,
        explanation: "Early classification systems were limited as they were based on single characteristics."
      },
      {
        question: "Soil classification has no role in agricultural research.",
        answer: false,
        explanation: "Soil classification plays a crucial role in agricultural research by providing objects for research and facilitating technology transfer."
      },
      {
        question: "Dokuchaiev's genetic system was developed in 1900.",
        answer: true,
        explanation: "Dokuchaiev, a Russian scientist, developed his genetic system of soil classification in 1900."
      },
      {
        question: "Pedalfers occur in areas of high evaporation.",
        answer: false,
        explanation: "Pedalfers occur in areas of high rainfall, not high evaporation."
      },
      {
        question: "Intrazonal soils reflect the influence of local conditions.",
        answer: true,
        explanation: "Intrazonal soils occur within zones and reflect the influence of local conditions like topography and parent material."
      },
      {
        question: "Azonal soils have fully developed soil horizons.",
        answer: false,
        explanation: "Azonal soils lack fully developed horizons due to time being a limiting factor."
      },
      {
        question: "Baldwin's system divided soils into two orders.",
        answer: false,
        explanation: "Baldwin's system divided soils into three orders: Zonal, Intrazonal, and Azonal."
      },
      {
        question: "Marbut's system was developed before Dokuchaiev's system.",
        answer: false,
        explanation: "Dokuchaiev's system was developed in 1900, while Marbut's system came later in 1927."
      },
      {
        question: "Baldwin's system retained the three orders from the Russian zonality concept.",
        answer: true,
        explanation: "Baldwin's system kept the three orders (Zonal, Intrazonal, and Azonal) following the Russian zonality concept."
      },
      {
        question: "Pedocals are found in areas with high rainfall.",
        answer: false,
        explanation: "Pedocals are found in areas of high evaporation with water deficit, not high rainfall."
      },
      {
        question: "Great Soil Groups are the highest level of classification in Baldwin's system.",
        answer: false,
        explanation: "Great Soil Groups are subdivisions of suborders in Baldwin's system, not the highest level."
      },
      {
        question: "Local conditions like topography primarily influence Zonal soils.",
        answer: false,
        explanation: "Local conditions primarily influence Intrazonal soils, while Zonal soils are mainly influenced by climate and vegetation."
      }
    ],
    'soil taxonomy- a comprehensive system': [
      {
        question: "The Comprehensive System of Soil Classification was published in 1960.",
        answer: true,
        explanation: "The system, known as '7th approximation', was indeed published in 1960 by US Soil Survey Staff."
      },
      {
        question: "A soil pedon is smaller than the root system of an average-sized plant.",
        answer: false,
        explanation: "A soil pedon is large enough to contain the entire root system of an average-sized plant."
      },
      {
        question: "Epipedons are diagnostic subsurface horizons.",
        answer: false,
        explanation: "Epipedons are diagnostic surface horizons, while endopedons are subsurface horizons."
      },
      {
        question: "Mollic epipedon contains less than 1% organic matter.",
        answer: false,
        explanation: "Mollic epipedon contains 1% or more organic matter."
      },
      {
        question: "Anthropic epipedon contains high concentration of available phosphorus.",
        answer: true,
        explanation: "Anthropic epipedon contains more than 250 ppm of available phosphorus."
      },
      {
        question: "Folistic epipedon is saturated with water for more than 30 days per year.",
        answer: false,
        explanation: "Folistic epipedon is never saturated with water for more than 30 days per year."
      },
      {
        question: "Plaggen epipedon must be at least 50 cm thick.",
        answer: true,
        explanation: "Plaggen epipedon is a man-made epipedon that must be at least 50 cm thick."
      },
      {
        question: "Melanic epipedon has high bulk density.",
        answer: false,
        explanation: "Melanic epipedon has low bulk density (<0.9 gcc-1)."
      },
      {
        question: "Ochric epipedon is dark in color.",
        answer: false,
        explanation: "Ochric epipedon is light in color and contains less than 1% organic matter."
      },
      {
        question: "The Comprehensive System is based on soil properties as they exist today.",
        answer: true,
        explanation: "The system is based on current soil properties rather than historical or genetic factors."
      },
      {
        question: "An Argillic horizon is formed by the migration of clay from A to B horizon.",
        answer: true,
        explanation: "The Argillic horizon is formed due to the migration of clay carried by water from A to B horizon."
      },
      {
        question: "The Fragipan horizon does not slake in water.",
        answer: false,
        explanation: "The air-dry fragments of Fragipan horizon do slake in water."
      },
      {
        question: "A Spodic horizon is composed of organic matter and aluminum, with or without iron.",
        answer: true,
        explanation: "Spodic horizon contains organic matter (humus) and aluminum, with or without iron."
      },
      {
        question: "The Calcic horizon contains only calcium carbonate.",
        answer: false,
        explanation: "The Calcic horizon can contain both calcium carbonate and magnesium carbonate."
      },
      {
        question: "An Agric horizon is formed due to long and continued cultivation.",
        answer: true,
        explanation: "The Agric horizon is formed directly under the plough layer due to long and continued cultivation."
      },
      {
        question: "The Albic horizon is enriched with oxides.",
        answer: false,
        explanation: "The Albic horizon is one from which oxides have been removed or segregated."
      },
      {
        question: "A Salic horizon must have more than 2% soluble salt enrichment.",
        answer: true,
        explanation: "A Salic horizon requires secondary soluble salt enrichment of over 2%."
      },
      {
        question: "The Duripan horizon slakes in HCl.",
        answer: false,
        explanation: "The Duripan horizon does not slake either in water or in HCl."
      },
      {
        question: "An Oxic horizon must be sandy loam or finer in texture.",
        answer: true,
        explanation: "The Oxic horizon is sandy loam or finer in texture with variable amounts of 1:1 clay."
      },
      {
        question: "The Gypsic horizon must be strongly cemented.",
        answer: false,
        explanation: "The Gypsic horizon is non-cemented or weakly cemented."
      }
    ],
    'soil moisture and temperature regimes': [
      {
        question: "Soil moisture tension of 15 bar or more indicates dry soil.",
        answer: true,
        explanation: "According to the text, soil is considered dry when the tension is 15 bar or more."
      },
      {
        question: "Aquic moisture regime is characterized by well-drained soils.",
        answer: false,
        explanation: "Aquic moisture regime is characterized by poorly drained soils that are saturated for some time of a year."
      },
      {
        question: "In Udic regime, SMCS can be dry for more than 90 cumulative days.",
        answer: false,
        explanation: "In Udic regime, SMCS is not dry in any part for as long as 90 cumulative days."
      },
      {
        question: "Xeric moisture regime requires MAST less than 22°C.",
        answer: true,
        explanation: "For Xeric moisture regime, MAST must be less than 22°C."
      },
      {
        question: "The summer solstice begins from June 21st.",
        answer: false,
        explanation: "The summer solstice begins from June 22nd onwards."
      },
      {
        question: "Aridic and torric regimes have similar moisture characteristics.",
        answer: true,
        explanation: "Both Aridic and torric regimes are characterized by soils with negligible moisture."
      },
      {
        question: "In Ustic regime, SMCS must be moist for exactly 90 consecutive days.",
        answer: false,
        explanation: "In Ustic regime, SMCS must be continuously moist for at least 90 consecutive days."
      },
      {
        question: "The winter solstice begins from December 23rd onwards.",
        answer: true,
        explanation: "According to the text, the winter solstice begins from December 23rd onwards."
      },
      {
        question: "SMCS moisture content is independent of soil texture.",
        answer: false,
        explanation: "The Soil Moisture Control Section (SMCS) depends on soil texture."
      },
      {
        question: "In Aridic regime, soil temperature must be above 5°C for moisture consideration.",
        answer: true,
        explanation: "In Aridic regime, SMCS is dry throughout for more than 180 days when soil temperature is >5°C."
      },
      {
        question: "Pergelic regime is characterized by permanent frost conditions.",
        answer: true,
        explanation: "Pergelic regime has a mean annual soil temperature lower than 0°C, indicating permanent frost conditions."
      },
      {
        question: "The difference between mean summer and winter temperature must be more than 5°C for iso-prefix regimes.",
        answer: false,
        explanation: "The iso-prefix is used when the difference between mean summer and winter temperature is less than 5°C."
      },
      {
        question: "Cryic regime is warmer in summer than Frigid regime.",
        answer: false,
        explanation: "Frigid regime is warmer in summer than the Cryic regime."
      },
      {
        question: "Megathermic regime has the highest temperature requirement among all STRs.",
        answer: true,
        explanation: "Megathermic regime requires mean annual soil temperature of 28°C or higher, which is the highest among all STRs."
      },
      {
        question: "STRs are measured only in the top 5 cm of soil.",
        answer: false,
        explanation: "STRs are measured within the 5 to 100 cm root zone."
      },
      {
        question: "Thermic regime requires a temperature difference of more than 5°C between seasons.",
        answer: true,
        explanation: "Thermic regime requires the difference between mean summer and mean winter soil temperature to be more than 5°C."
      },
      {
        question: "Isomesic regime has a seasonal temperature difference of more than 5°C.",
        answer: false,
        explanation: "Isomesic, like all iso-prefix regimes, has a seasonal temperature difference of less than 5°C."
      },
      {
        question: "STRs are used only at the order level of soil classification.",
        answer: false,
        explanation: "STRs play an important role in classifying soils at the family and suborder levels."
      },
      {
        question: "Hyperthermic regime requires temperatures between 22°C and 28°C.",
        answer: true,
        explanation: "Hyperthermic regime requires mean annual soil temperature between 22°C and 28°C."
      },
      {
        question: "All temperature regimes require a seasonal difference of more than 5°C.",
        answer: false,
        explanation: "Iso-prefix regimes have seasonal temperature differences of less than 5°C."
      }
    ],
    'categories in soil taxonomy': [
      {
        question: "There are more soil series identified in Bangladesh than in the USA.",
        answer: false,
        explanation: "The USA has approximately 19,000 soil series while Bangladesh has about 500+ soil series."
      },
      {
        question: "Entisols are very recently developed soils with no diagnostic horizon.",
        answer: true,
        explanation: "Entisols are indeed very recently developed mineral soils with no diagnostic horizon."
      },
      {
        question: "The formative element 'ent' has a specific meaning in Latin or Greek.",
        answer: false,
        explanation: "'ent' is a nonsense symbol and doesn't have a specific meaning in Latin or Greek."
      },
      {
        question: "Vertisols must contain at least 30 percent clay content.",
        answer: true,
        explanation: "Vertisols require at least 30 percent clay content to enable swelling and shrinking properties."
      },
      {
        question: "Inceptisols are found only in Bangladesh.",
        answer: false,
        explanation: "Inceptisols occur almost throughout the world, not just in Bangladesh."
      },
      {
        question: "The Soil Taxonomy system has six hierarchical categories.",
        answer: true,
        explanation: "The system has six categories of classification from the highest to the lowest levels of generalization."
      },
      {
        question: "All formative elements in soil orders are derived from Latin.",
        answer: false,
        explanation: "Formative elements come from various languages including Latin, Greek, French, and Japanese."
      },
      {
        question: "Vertisols develop deep cracks when dry.",
        answer: true,
        explanation: "Vertisols develop at least 1 cm wide and 50 cm deep cracks when dry."
      },
      {
        question: "There are more than 1000 soil families identified globally.",
        answer: true,
        explanation: "There are approximately 8000 soil families identified in the classification system."
      },
      {
        question: "The formative element 'and' in Andisols comes from Greek.",
        answer: false,
        explanation: "The formative element 'and' comes from Japanese word 'ando' meaning black soil."
      },
      {
        question: "Aridisols are typically found in humid regions.",
        answer: false,
        explanation: "Aridisols are mineral soils of dry places (arid and semiarid) where soils remain dry for most part of the year."
      },
      {
        question: "Mollisols must have a base saturation of more than 50%.",
        answer: true,
        explanation: "Mollisols have a base-rich surface horizon with base saturation more than 50%."
      },
      {
        question: "Andisols can develop on any type of parent material.",
        answer: false,
        explanation: "Andisols specifically develop on volcanic ash (>60%) within 60 cm of the mineral soil parent material."
      },
      {
        question: "Oxisols are typically fertile soils of humid tropics.",
        answer: false,
        explanation: "Oxisols are strongly weathered mineral soils of humid tropics that are poor in fertility."
      },
      {
        question: "Histosols require a peaty horizon of at least 80 cm thickness.",
        answer: true,
        explanation: "Histosols are organic rich soils with thick (80 cm) peaty horizon (histic epipedon)."
      },
      {
        question: "Gelisols are influenced by permafrost in their soil development.",
        answer: true,
        explanation: "Permafrost influences Gelisols' pedogenesis by acting as a barrier to the downward movement of the soil solution."
      },
      {
        question: "Spodosols typically develop in hot, arid climates.",
        answer: false,
        explanation: "Spodosols develop under cool, humid climate and coarse-textured silicious parent material."
      },
      {
        question: "Ultisols have higher base saturation than Alfisols.",
        answer: false,
        explanation: "Ultisols have low base saturation (<35%) while Alfisols have base saturation of more than 35 percent."
      }
    ],
    'concept of seed technology': [
      {
        question: "Seed Technology is only concerned with seed production.",
        answer: false,
        explanation: "Seed Technology encompasses seed production, maintenance, quality, and preservation."
      },
      {
        question: "Improved seeds can significantly increase crop yields.",
        answer: true,
        explanation: "Improved seeds can lead to substantial yield increases when combined with other agricultural inputs."
      },
      {
        question: "Seed certification is unnecessary for quality control.",
        answer: false,
        explanation: "Seed certification is essential to ensure that seeds meet specific quality and purity standards."
      },
      {
        question: "The introduction of high yielding varieties has no impact on food imports.",
        answer: false,
        explanation: "The introduction of high yielding varieties has significantly reduced food imports in countries like Bangladesh."
      },
      {
        question: "Seed testing is important for assessing seed viability.",
        answer: true,
        explanation: "Seed testing helps determine the viability and germination rates of seeds."
      },
      {
        question: "Seed Technology plays a role in disaster recovery.",
        answer: true,
        explanation: "Seed Technology provides immediate access to improved seeds for farmers in disaster situations."
      },
      {
        question: "The main focus of Seed Technology is on soil management.",
        answer: false,
        explanation: "The main focus of Seed Technology is on seed production, processing, and quality."
      },
      {
        question: "Seed Technology can help secure food supply.",
        answer: true,
        explanation: "Improved seeds are a basic tool for securing food supply and increasing agricultural productivity."
      },
      {
        question: "Seed Technology has no relationship with agricultural inputs.",
        answer: false,
        explanation: "Seed Technology enhances the effectiveness of traditional agricultural inputs."
      },
      {
        question: "The role of improved seed is limited to crop yield increases.",
        answer: false,
        explanation: "Improved seed also serves as a carrier of new technologies and a tool for food security."
      },
      {
        question: "The major goal of Seed Technology is to decrease agricultural production.",
        answer: false,
        explanation: "The major goal of Seed Technology is to increase agricultural production through the spread of good quality seeds of high yielding varieties."
      },
      {
        question: "Timely supply of seeds is important to prevent disruption in farmers' planting schedules.",
        answer: true,
        explanation: "Timely supply ensures that improved seeds are available when needed for planting."
      },
      {
        question: "Assured high quality of seeds is necessary to obtain expected dividends from improved varieties.",
        answer: true,
        explanation: "High quality seeds are essential for achieving the desired crop yields."
      },
      {
        question: "The price of high-quality seeds should be high to ensure quality.",
        answer: false,
        explanation: "The price of high-quality seeds should be reasonable and within reach of the average farmer."
      },
      {
        question: "Rapid multiplication refers to the slow spread of new varieties.",
        answer: false,
        explanation: "Rapid multiplication refers to the quickest possible spread of new varieties developed by plant breeders."
      },
      {
        question: "The American Seed Association was established in 1883.",
        answer: true,
        explanation: "The American Seed Association (ASTA) was established in 1883."
      },
      {
        question: "The Green Revolution started in the 1960s and significantly increased agricultural production.",
        answer: true,
        explanation: "The Green Revolution led to significant increases in agricultural production, particularly in developing countries."
      },
      {
        question: "Seed certification is unnecessary for ensuring seed quality.",
        answer: false,
        explanation: "Seed certification is essential to ensure that seeds meet specific quality and purity standards."
      },
      {
        question: "The OECD scheme was established to promote seed quality.",
        answer: true,
        explanation: "The OECD scheme, established in 1958, aimed to promote seed quality and facilitate international trade in seeds."
      },
      {
        question: "Seed Technology has no impact on food security.",
        answer: false,
        explanation: "Seed Technology plays a crucial role in ensuring food security by providing access to quality seeds."
      },
      {
        question: "The Agricultural Research Institute was established in Dhaka in 1908.",
        answer: true,
        explanation: "In 1908, the Agricultural Research Institute was established in Dhaka to improve seed varieties."
      },
      {
        question: "Seed multiplication farms were established in the public sector in 1954.",
        answer: true,
        explanation: "In 1954, seed multiplication farms were established in the public sector in 23 places over an area of 2200 hectares."
      },
      {
        question: "The East Pakistan Agricultural Development Corporation was established in 1961 to improve soil quality.",
        answer: false,
        explanation: "The East Pakistan Agricultural Development Corporation was established in 1961 to undertake seed supply."
      },
      {
        question: "The National Seed Board was established in 1974.",
        answer: true,
        explanation: "In 1974, the National Seed Board and Seed Certification Agency were established."
      },
      {
        question: "The Seeds Ordinance 1977 was promulgated to eliminate seed imports.",
        answer: false,
        explanation: "The Seeds Ordinance 1977 was promulgated to provide a legal framework for seed regulation."
      },
      {
        question: "The National Seed Policy was passed in 1993 to encourage private sector participation.",
        answer: true,
        explanation: "The National Seed Policy passed in 1993 encouraged the participation of private sectors and informal sectors in the seed supply system."
      },
      {
        question: "576 tons of wheat seed were first supplied in 1980.",
        answer: false,
        explanation: "576 tons of wheat seed were first supplied in 1976 after production and processing in an organized way."
      },
      {
        question: "The Green Revolution started in the 1960s and significantly increased agricultural production.",
        answer: true,
        explanation: "The Green Revolution led to significant increases in agricultural production, particularly in developing countries."
      },
      {
        question: "The OECD scheme was established to promote seed quality.",
        answer: true,
        explanation: "The OECD scheme, established in 1958, aimed to promote seed quality and facilitate international trade in seeds."
      },
      {
        question: "The Seeds (Amendment) Act, 2005 was the first seed legislation in Bangladesh.",
        answer: false,
        explanation: "The first significant seed legislation was the Seeds Ordinance 1977."
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
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
    ],
    'mouth parts_mizan sir': [
      {
        question: "Mouthparts are structures on the upper part of the insect's head.",
        answer: false,
        explanation: "Mouthparts are located on the lower part of the head."
      },
      {
        question: "Chewing mouthparts are used to cut and grind solid food.",
        answer: true,
        explanation: "Chewing mouthparts consist of mandibles and maxillae that cut and grind solid food."
      },
      {
        question: "Piercing-sucking mouthparts are adapted for sucking sap or blood.",
        answer: true,
        explanation: "Piercing-sucking mouthparts are modified to pierce the epidermis of plants or the skin of animals to suck up sap or blood."
      },
      {
        question: "Thrips have symmetrical mouthparts.",
        answer: false,
        explanation: "Thrips have asymmetrical mouthparts."
      },
      {
        question: "The labium in piercing-sucking mouthparts forms a protective sheath for the stylets.",
        answer: true,
        explanation: "The labium protects the stylets in piercing-sucking mouthparts."
      },
      {
        question: "All insects have the same type of mouthparts.",
        answer: false,
        explanation: "Mouthparts vary among different insect groups and stages of the same species."
      },
      {
        question: "Rasping-sucking mouthparts are used to suck nectar.",
        answer: false,
        explanation: "Rasping-sucking mouthparts are used to rasp host tissues and take up liquid food."
      },
      {
        question: "Insects like silverfish and cockroaches possess chewing mouthparts.",
        answer: true,
        explanation: "Silverfish, cockroaches, grasshoppers, and other insects possess chewing mouthparts."
      },
      {
        question: "The outer stylets in piercing-sucking mouthparts are derived from maxillae.",
        answer: false,
        explanation: "The outer stylets are derived from mandibles."
      },
      {
        question: "Mosquitoes possess chewing mouthparts.",
        answer: false,
        explanation: "Mosquitoes possess piercing-sucking mouthparts."
      },
      {
        question: "Siphoning mouthparts are adapted for the uptake of solid food.",
        answer: false,
        explanation: "Siphoning mouthparts are specialized for the uptake of flower nectar and other liquids."
      },
      {
        question: "Mandibles are absent in sponging mouthparts.",
        answer: true,
        explanation: "Sponging mouthparts do not have mandibles."
      },
      {
        question: "The proboscis in siphoning mouthparts is held in a coiled-spring fashion when not in use.",
        answer: true,
        explanation: "The proboscis is coiled when not in use, allowing for easy extension when feeding."
      },
      {
        question: "House flies possess chewing mouthparts.",
        answer: false,
        explanation: "House flies possess sponging mouthparts."
      },
      {
        question: "The labella in sponging mouthparts are used to mop up liquid food.",
        answer: true,
        explanation: "The labella are designed to absorb liquid food through capillary action."
      },
      {
        question: "Chewing-lapping mouthparts are used by butterflies.",
        answer: false,
        explanation: "Chewing-lapping mouthparts are used by bees, wasps, and ants."
      },
      {
        question: "The galea of maxillae forms a roof over the glossa in chewing-lapping mouthparts.",
        answer: true,
        explanation: "The galea fits over the glossa, forming a food channel for nectar uptake."
      },
      {
        question: "The lower lip in siphoning mouthparts consists of a single part.",
        answer: false,
        explanation: "The lower lip consists of two parts: a broad plate and three segmented labial palps."
      },
      {
        question: "The proboscis in sponging mouthparts is formed by the fusion of labium and maxillae.",
        answer: true,
        explanation: "The proboscis is a fusion of labium and maxillae, allowing for liquid feeding."
      },
      {
        question: "Insects with siphoning mouthparts have well-developed mandibles.",
        answer: false,
        explanation: "Siphoning mouthparts usually have absent or reduced mandibles."
      }
    ],
    'arthropoda_shakhawat sir': [
      {
        question: "Entomology is the study of insects.",
        answer: true,
        explanation: "<b>Definition of Entomology:</b><br><br>Entomology focuses specifically on insects, their behavior, ecology, and physiology."
      },
      {
        question: "All arthropods have wings.",
        answer: false,
        explanation: "<b>Wing Presence in Arthropods:</b><br><br>Not all arthropods have wings; for example, arachnids do not have wings."
      },
      {
        question: "The exoskeleton of arthropods is made of keratin.",
        answer: false,
        explanation: "<b>Exoskeleton Composition:</b><br><br>The exoskeleton is made of chitin, not keratin."
      },
      {
        question: "Arachnids have three pairs of legs.",
        answer: false,
        explanation: "<b>Legs of Arachnids:</b><br><br>Arachnids have four pairs of legs."
      },
      {
        question: "The heart of arthropods is tubular.",
        answer: true,
        explanation: "<b>Heart Structure:</b><br><br>The heart in arthropods is represented by a tubular structure."
      },
      {
        question: "Arthropods are bilaterally symmetrical.",
        answer: true,
        explanation: "<b>Bilateral Symmetry:</b><br><br>Arthropods exhibit bilateral symmetry in their body structure."
      },
      {
        question: "The life cycle of arachnids includes a larval stage with three pairs of legs.",
        answer: true,
        explanation: "<b>Life Cycle of Arachnids:</b><br><br>The larval stage of arachnids has three pairs of legs."
      },
      {
        question: "All arthropods are aquatic.",
        answer: false,
        explanation: "<b>Habitat of Arthropods:</b><br><br>Arthropods can be found in both aquatic and terrestrial environments."
      },
      {
        question: "The phylum Arthropoda is the largest phylum in the animal kingdom.",
        answer: true,
        explanation: "<b>Size of Arthropoda:</b><br><br>Arthropoda represents approximately three-quarters of all known biological organisms."
      },
      {
        question: "Arachnids possess antennae.",
        answer: false,
        explanation: "<b>Antennae in Arachnids:</b><br><br>Arachnids do not have antennae; they have other sensory structures."
      },
      {
        question: "Insects are mainly terrestrial, with few aquatic species.",
        answer: true,
        explanation: "<b>Habitat of Insects:</b><br><br>Most insects are terrestrial, although some species are aquatic."
      },
      {
        question: "Insects have two pairs of wings.",
        answer: false,
        explanation: "<b>Wings of Insects:</b><br><br>Insects may have one or two pairs of wings, but some species are wingless."
      },
      {
        question: "Insects possess three pairs of legs.",
        answer: true,
        explanation: "<b>Legs of Insects:</b><br><br>Insects have three pairs of thoracic legs."
      },
      {
        question: "All insects have a pair of antennae.",
        answer: true,
        explanation: "<b>Antennae in Insects:</b><br><br>Insects typically have a pair of antennae."
      },
      {
        question: "Insects breathe through lungs.",
        answer: false,
        explanation: "<b>Respiration in Insects:</b><br><br>Insects respire primarily through a tracheal system, not lungs."
      },
      {
        question: "The life cycle of insects can include complete metamorphosis.",
        answer: true,
        explanation: "<b>Metamorphosis Types:</b><br><br>Insects can undergo complete metamorphosis, which includes the stages: Egg → Larva → Pupa → Adult."
      },
      {
        question: "The economic value of insect pollination is negligible.",
        answer: false,
        explanation: "<b>Economic Importance of Insect Pollination:</b><br><br>The economic value of insect pollination worldwide is estimated at U.S. $217 billion."
      },
      {
        question: "Insects such as bees and butterflies are important for pollination.",
        answer: true,
        explanation: "<b>Pollinators:</b><br><br>Bees, butterflies, and other insects play crucial roles in pollination."
      },
      {
        question: "Silverfish are an example of winged insects.",
        answer: false,
        explanation: "<b>Examples of Insects:</b><br><br>Silverfish are an example of wingless insects."
      },
      {
        question: "The estimated annual value of ecological services provided by insects in the U.S. is at least $57 billion.",
        answer: true,
        explanation: "<b>Ecological Services:</b><br><br>The estimated annual value of ecological services provided by insects in the U.S. is at least $57 billion."
      },
      {
        question: "Arthropod predators are often specialized in their choice of prey.",
        answer: false,
        explanation: "<b>Predator Characteristics:</b><br><br>Many arthropod predators are generalists rather than specialists."
      },
      {
        question: "Parasitoids are free-living as adults.",
        answer: true,
        explanation: "<b>Parasitoids:</b><br><br>Parasitoids are typically free-living as adults."
      },
      {
        question: "Sericulture is concerned with the rearing of honey bees.",
        answer: false,
        explanation: "<b>Sericulture:</b><br><br>Sericulture involves the rearing of silkworms, not honey bees."
      },
      {
        question: "Lac insects are known for their resinous exudation.",
        answer: true,
        explanation: "<b>Lac Insects:</b><br><br>Lac insects are noted for their resinous exudation from the bodies of females."
      },
      {
        question: "Apiculture is the practice of rearing silkworms.",
        answer: false,
        explanation: "<b>Apiculture:</b><br><br>Apiculture is the maintenance of honey bee colonies, not silkworms."
      },
      {
        question: "Less than 1% of insects are considered pests.",
        answer: true,
        explanation: "<b>Pest Classification:</b><br><br>Less than 1% of insects are regarded as pests."
      },
      {
        question: "Household pests can cause damage to homes and pose health risks.",
        answer: true,
        explanation: "<b>Household Pests:</b><br><br>Common household pests can cause damage and pose health risks."
      },
      {
        question: "Mosquitoes are beneficial insects that do not spread diseases.",
        answer: false,
        explanation: "<b>Diseases Spread by Mosquitoes:</b><br><br>Mosquitoes can spread diseases such as malaria and dengue fever."
      },
      {
        question: "The Rice Weevil is a common pest of stored grains.",
        answer: true,
        explanation: "<b>Pests of Stored Grains:</b><br><br>The Rice Weevil is one of the most common insect pests of stored grains."
      },
      {
        question: "Insect management for stored grains is not necessary.",
        answer: false,
        explanation: "<b>Insect Management:</b><br><br>Insect management for stored grains is crucial for preventing infestations."
      },
      {
        question: "The order Protura is commonly known as Coneheads.",
        answer: true,
        explanation: "<b>Order Protura:</b><br><br>Protura is indeed commonly known as Coneheads."
      },
      {
        question: "The order Collembola is known for its members called Silverfish.",
        answer: false,
        explanation: "<b>Order Collembola:</b><br><br>Collembola is known as Springtails, not Silverfish."
      },
      {
        question: "The order Odonata includes Dragonflies and Damselflies.",
        answer: true,
        explanation: "<b>Order Odonata:</b><br><br>Odonata includes Dragonflies and Damselflies."
      },
      {
        question: "The order Hemiptera is known for its members called Beetles.",
        answer: false,
        explanation: "<b>Order Hemiptera:</b><br><br>Hemiptera includes Bugs, Cicadas, and Hoppers, not Beetles."
      },
      {
        question: "The order Lepidoptera includes Butterflies and Moths.",
        answer: true,
        explanation: "<b>Order Lepidoptera:</b><br><br>Lepidoptera includes Butterflies and Moths."
      },
      {
        question: "The order Diptera is known for its members called Caddisflies.",
        answer: false,
        explanation: "<b>Order Diptera:</b><br><br>Diptera is known for Flies, not Caddisflies."
      },
      {
        question: "The order Thysanoptera is commonly known as Thrips.",
        answer: true,
        explanation: "<b>Order Thysanoptera:</b><br><br>Thysanoptera is commonly known as Thrips."
      },
      {
        question: "The order Neuroptera includes Lacewings and Antlions.",
        answer: true,
        explanation: "<b>Order Neuroptera:</b><br><br>Neuroptera includes Lacewings and Antlions."
      },
      {
        question: "The order Coleoptera is known for its members called Silverfish.",
        answer: false,
        explanation: "<b>Order Coleoptera:</b><br><br>Coleoptera is known for Beetles, not Silverfish."
      },
      {
        question: "The order Mecoptera is commonly known as Scorpionflies.",
        answer: true,
        explanation: "<b>Order Mecoptera:</b><br><br>Mecoptera is commonly known as Scorpionflies."
      },
      {
        question: "Exopterygota undergo complete metamorphosis.",
        answer: false,
        explanation: "<b>Metamorphosis Type:</b><br><br>Exopterygota undergo incomplete metamorphosis."
      },
      {
        question: "Endopterygota have a pupal stage.",
        answer: true,
        explanation: "<b>Pupal Stage:</b><br><br>Endopterygota have a pupal stage, while Exopterygota do not."
      },
      {
        question: "The immature stage of Exopterygota is called Larva.",
        answer: false,
        explanation: "<b>Immature Stage:</b><br><br>The immature stage of Exopterygota is called Naiad or Nymph."
      },
      {
        question: "Antennae are well developed in immature stages of insects.",
        answer: false,
        explanation: "<b>Antennae Development:</b><br><br>Antennae are well developed in adults and poorly developed in immature stages."
      },
      {
        question: "The basal segment of an insect's antenna is called the pedicel.",
        answer: false,
        explanation: "<b>Antennal Structure:</b><br><br>The basal segment of an insect's antenna is called the scape."
      },
      {
        question: "Johnston's organ is used for sensing vibrations.",
        answer: true,
        explanation: "<b>Function of Johnston's Organ:</b><br><br>Johnston's organ is used for sensing vibrations and movement."
      },
      {
        question: "The order Zygentoma is commonly known as Silverfish.",
        answer: true,
        explanation: "<b>Order Zygentoma:</b><br><br>Zygentoma is commonly known as Silverfish."
      },
      {
        question: "The order Odonata includes Dragonflies and Damselflies.",
        answer: true,
        explanation: "<b>Order Odonata:</b><br><br>Odonata includes Dragonflies and Damselflies."
      },
      {
        question: "The order Hemiptera is known for its members called Beetles.",
        answer: false,
        explanation: "<b>Order Hemiptera:</b><br><br>Hemiptera includes Bugs, Cicadas, and Hoppers, not Beetles."
      },
      {
        question: "The order Lepidoptera includes Butterflies and Moths.",
        answer: true,
        explanation: "<b>Order Lepidoptera:</b><br><br>Lepidoptera includes Butterflies and Moths."
      },
      {
        question: "Antennae are useful for detecting chemicals including food and pheromones.",
        answer: true,
        explanation: "<b>Function of Antennae:</b><br><br>Antennae are useful to detect chemicals including food and pheromones."
      },
      {
        question: "Antennae are not involved in perceiving the forward environment.",
        answer: false,
        explanation: "<b>Function of Antennae:</b><br><br>Antennae are useful to perceive the forward environment and detect danger."
      },
      {
        question: "The type of antennae that are described as thread-like is called filiform.",
        answer: true,
        explanation: "<b>Filiform Antennae:</b><br><br>Filiform antennae are thread-like."
      },
      {
        question: "Serrate antennae have segments that are bead-like.",
        answer: false,
        explanation: "<b>Serrate Antennae:</b><br><br>Serrate antennae have segments with short triangular projections on one side."
      },
      {
        question: "The terminal segment of capitate antennae becomes enlarged suddenly.",
        answer: true,
        explanation: "<b>Capitate Antennae:</b><br><br>Capitate antennae have terminal segments that become enlarged suddenly."
      },
      {
        question: "Plumose antennae are characterized by being less feathery with few hairs.",
        answer: false,
        explanation: "<b>Plumose Antennae:</b><br><br>Plumose antennae are feathery with long whorls of hairs."
      },
      {
        question: "The type of antennae that are described as comb-like with long slender processes on both sides is called bipectinate.",
        answer: true,
        explanation: "<b>Bipectinate Antennae:</b><br><br>Bipectinate antennae have segments with long slender lateral processes on both sides."
      },
      {
        question: "Antennae are located between or behind the compound eyes.",
        answer: true,
        explanation: "<b>Antennae Location:</b><br><br>Antennae are located between or behind the compound eyes."
      },
      {
        question: "The type of antennae that are described as saw-like is called serrate.",
        answer: true,
        explanation: "<b>Serrate Antennae:</b><br><br>Serrate antennae have short triangular projections on one side."
      },
      {
        question: "The type of antennae that are described as hair-like is called pilose.",
        answer: true,
        explanation: "<b>Pilose Antennae:</b><br><br>Pilose antennae are less feathery with few hairs."
      }
    ],
    'tree crop interaction_nazmun nahar': [
      {
        question: "Agroforestry is the integration of only crops.",
        answer: false,
        explanation: "<b>Agroforestry Definition:</b><br><br>Agroforestry involves the integration of woody components, crops, and animals."
      },
      {
        question: "Ecological interactions in agroforestry enable a balance of life in a community.",
        answer: true,
        explanation: "<b>Ecological Interactions:</b><br><br>Ecological interactions enable a balance of life in a specific community."
      },
      {
        question: "Competition in agroforestry occurs because components share common growth resources.",
        answer: true,
        explanation: "<b>Competition:</b><br><br>Competition occurs when components share common growth resources such as light, water, and nutrients."
      },
      {
        question: "Economic interactions are conducted only between individuals.",
        answer: false,
        explanation: "<b>Economic Interactions:</b><br><br>Economic interactions can occur between individuals and collectives through the exchange of goods, services, and money."
      },
      {
        question: "The primary focus of agroforestry is to maximize profit through high chemical use.",
        answer: false,
        explanation: "<b>Focus of Agroforestry:</b><br><br>The focus of agroforestry is on sustainable practices with minimal inputs, not maximizing profit through high chemical use."
      },
      {
        question: "Agrisilviculture is a type of agroforestry where trees are dominant.",
        answer: false,
        explanation: "<b>Agrisilviculture:</b><br><br>Agrisilviculture is a type of agroforestry where crops are dominant."
      },
      {
        question: "Interactions in agroforestry can occur both above ground and below ground.",
        answer: true,
        explanation: "<b>Types of Interactions:</b><br><br>Interactions in agroforestry occur both above ground and below ground."
      },
      {
        question: "Agroforestry contributes to low input sustainable agriculture.",
        answer: true,
        explanation: "<b>Contribution to Sustainable Agriculture:</b><br><br>Agroforestry contributes to low input sustainable agriculture."
      },
      {
        question: "The components of agroforestry include only trees and crops.",
        answer: false,
        explanation: "<b>Components of Agroforestry:</b><br><br>The components of agroforestry include trees, crops, and animals."
      },
      {
        question: "Interaction is defined as the effect of one component on the performance of another component.",
        answer: true,
        explanation: "<b>Definition of Interaction:</b><br><br>Interaction is defined as the effect of one component on the performance of another component."
      },
      {
        question: "Tree-crop interactions are always negative.",
        answer: false,
        explanation: "<b>Tree-Crop Interactions:</b><br><br>Tree-crop interactions can be positive, negative, or neutral, depending on the circumstances."
      },
      {
        question: "Mutualism is an interaction where both species benefit.",
        answer: true,
        explanation: "<b>Mutualism:</b><br><br>Mutualism is defined as an interaction where both species benefit from the relationship."
      },
      {
        question: "Allelopathy is an example of a positive interaction.",
        answer: false,
        explanation: "<b>Allelopathy:</b><br><br>Allelopathy is a negative interaction where one plant inhibits the growth of another."
      },
      {
        question: "Competition occurs when species share common growth resources.",
        answer: true,
        explanation: "<b>Competition:</b><br><br>Competition occurs when species compete for limited resources such as light, water, and nutrients."
      },
      {
        question: "Commensalism is when one species benefits and the other is harmed.",
        answer: false,
        explanation: "<b>Commensalism:</b><br><br>Commensalism occurs when one species benefits while the other is neither helped nor harmed."
      },
      {
        question: "Indirect interactions can occur when species alter their environment.",
        answer: true,
        explanation: "<b>Indirect Interactions:</b><br><br>Indirect interactions occur when species affect each other by altering their environment."
      },
      {
        question: "Shading trees have a negative effect on crops.",
        answer: false,
        explanation: "<b>Shading Trees:</b><br><br>Shading trees provide benefits to crops by reducing stress."
      },
      {
        question: "Inhibition occurs when both populations are directly inhibited by each other.",
        answer: true,
        explanation: "<b>Inhibition:</b><br><br>Inhibition occurs when both populations are directly inhibited by each other."
      },
      {
        question: "Positive interactions are always beneficial for both species.",
        answer: true,
        explanation: "<b>Positive Interactions:</b><br><br>Positive interactions are beneficial for both species involved."
      },
      {
        question: "Tree-animal interactions can have both positive and negative effects.",
        answer: true,
        explanation: "<b>Tree-Animal Interactions:</b><br><br>Tree-animal interactions can have both positive and negative effects on crops and animals."
      },
      {
        question: "Shading trees are beneficial for shade-loving crops.",
        answer: true,
        explanation: "<b>Benefits of Shading Trees:</b><br><br>Shading trees are beneficial for shade-loving crops like turmeric and ginger."
      },
      {
        question: "Agroforestry systems achieve 100% light interception.",
        answer: false,
        explanation: "<b>Light Interception:</b><br><br>Light interception by monoculture can never be achieved 100%."
      },
      {
        question: "Photosynthetic efficiencies in agroforestry systems are generally lower than in monoculture systems.",
        answer: false,
        explanation: "<b>Photosynthetic Efficiency:</b><br><br>Photosynthetic efficiencies in agroforestry systems range from 1.7% to 2.38%, which can be higher than in monoculture systems."
      },
      {
        question: "Biomass contributes to soil health and productivity.",
        answer: true,
        explanation: "<b>Biomass Contribution:</b><br><br>Biomass from pruning materials, litter fall, and crop root residues improves soil health and productivity."
      },
      {
        question: "Deep-rooted trees have less developed root systems than shallow-rooted crops.",
        answer: false,
        explanation: "<b>Root Systems:</b><br><br>Deep-rooted trees have more developed root systems that can explore larger soil volumes."
      },
      {
        question: "Biodiverse ecosystems are less resilient to environmental stresses than monocrops.",
        answer: false,
        explanation: "<b>Biodiversity:</b><br><br>Biodiverse ecosystems are generally more resilient to diverse environmental stresses than monocrops."
      },
      {
        question: "Shading can lead to an increase in average maximum temperatures.",
        answer: false,
        explanation: "<b>Temperature Effects:</b><br><br>Shading can reduce average maximum temperatures by 5.4°C."
      },
      {
        question: "Agroforestry systems utilize only direct sunlight for photosynthesis.",
        answer: false,
        explanation: "<b>Light Utilization:</b><br><br>Agroforestry systems utilize sunbeam, reflected, and diffuse light."
      },
      {
        question: "Balanced nutrient utilization is important for enhancing productivity.",
        answer: true,
        explanation: "<b>Balanced Nutrient Utilization:</b><br><br>Balanced nutrient utilization ensures effective sharing and recycling of nutrients, enhancing productivity."
      },
      {
        question: "The interaction characterized by shading trees is an example of negative interaction.",
        answer: false,
        explanation: "<b>Shading Trees:</b><br><br>Shading trees provide positive benefits for crops."
      },
      {
        question: "Microclimate amelioration increases soil moisture.",
        answer: true,
        explanation: "<b>Microclimate Amelioration:</b><br><br>Microclimate amelioration helps in increasing soil moisture."
      },
      {
        question: "Agroforestry systems increase evaporation.",
        answer: false,
        explanation: "<b>Water Conservation:</b><br><br>Agroforestry systems reduce evaporation by acting as 'bioirrigators' for adjacent plants."
      },
      {
        question: "The effect of shade is more severe for light-demanding weeds.",
        answer: true,
        explanation: "<b>Weed Suppression:</b><br><br>The effect of shade is more severe for light-demanding weeds."
      },
      {
        question: "Soil conservation in agroforestry decreases water holding capacity.",
        answer: false,
        explanation: "<b>Soil Conservation:</b><br><br>Soil conservation improves water holding capacity and reduces soil erosion."
      },
      {
        question: "Factors influencing tree-crop interactions include only soil type.",
        answer: false,
        explanation: "<b>Factors Influencing Interactions:</b><br><br>Factors influencing tree-crop interactions include tree functional characteristics, root architecture, and canopy type."
      },
      {
        question: "Deep-rooted trees can access nutrients released from weathering.",
        answer: true,
        explanation: "<b>Nutrient Cycling:</b><br><br>Deep-rooted trees can access nutrients released from weathering in lower soil horizons."
      },
      {
        question: "Seasonal changes have no effect on tree-crop interactions.",
        answer: false,
        explanation: "<b>Seasonal Changes:</b><br><br>Seasonal changes can significantly affect tree-crop interactions by altering resource availability."
      },
      {
        question: "Silvicultural management practices can optimize tree-crop interactions.",
        answer: true,
        explanation: "<b>Silvicultural Management:</b><br><br>Silvicultural management practices can optimize tree-crop interactions by enhancing light availability."
      },
      {
        question: "Closely planted shrub hedges can increase soil erosion.",
        answer: false,
        explanation: "<b>Hedge Planting:</b><br><br>Closely planted shrub hedges can efficiently control soil erosion."
      },
      {
        question: "Agroforestry systems are ineffective in conserving water.",
        answer: false,
        explanation: "<b>Water Conservation:</b><br><br>Agroforestry systems reduce evaporation and improve water conservation."
      },
      {
        question: "Light competition can reduce photosynthesis.",
        answer: true,
        explanation: "<b>Light Competition:</b><br><br>Light competition can reduce photosynthesis and overall plant growth."
      },
      {
        question: "Nutrient competition increases growth and development of plants.",
        answer: false,
        explanation: "<b>Nutrient Competition:</b><br><br>Nutrient competition can reduce growth and development of plants."
      },
      {
        question: "Water competition can depress crop production.",
        answer: true,
        explanation: "<b>Water Competition:</b><br><br>Water competition can depress crop production by competing for moisture."
      },
      {
        question: "Allelopathy enhances the growth of neighboring plants.",
        answer: false,
        explanation: "<b>Allelopathy:</b><br><br>Allelopathy can suppress the growth of neighboring plants through the release of phytotoxic substances."
      },
      {
        question: "The first documented case of allelopathy was observed in Eucalyptus.",
        answer: false,
        explanation: "<b>First Documented Case:</b><br><br>The first documented case of allelopathy was observed in black walnut (Juglans regia)."
      },
      {
        question: "Shade can encourage the growth of light-demanding weeds.",
        answer: true,
        explanation: "<b>Weed Growth:</b><br><br>Shade can encourage the growth of light-demanding weeds."
      },
      {
        question: "Toxic compounds in Acacia include cyanoglucosides.",
        answer: true,
        explanation: "<b>Toxic Compounds:</b><br><br>Toxic compounds in Acacia include cyanoglucosides and tannins."
      },
      {
        question: "Allelochemicals can enhance the metabolic pathways of neighboring plants.",
        answer: false,
        explanation: "<b>Allelochemicals:</b><br><br>Allelochemicals can interfere with the metabolic pathways of neighboring plants."
      },
      {
        question: "Weed growth can be suppressed by the shade of upperstory trees.",
        answer: false,
        explanation: "<b>Weed Growth:</b><br><br>Weed growth can be increased by the shade cast by upperstory trees."
      },
      {
        question: "Allelopathy is a widely considered limitation for the promotion of agroforestry.",
        answer: true,
        explanation: "<b>Limitations of Allelopathy:</b><br><br>Allelopathy is one of the widely considered limitations for the promotion and adoption of agroforestry."
      },
      {
        question: "Microclimate amelioration can lead to increased growth in tree-crop interfaces.",
        answer: true,
        explanation: "<b>Increased Growth:</b><br><br>Microclimate amelioration can lead to increased growth in tree-crop interfaces."
      },
      {
        question: "Excessive shading promotes growth in tree-crop interfaces.",
        answer: false,
        explanation: "<b>Decreased Growth:</b><br><br>Excessive shading can lead to decreased growth in tree-crop interfaces."
      },
      {
        question: "Animals can negatively affect vegetation through mechanical damage.",
        answer: true,
        explanation: "<b>Mechanical Damage:</b><br><br>Animals can negatively affect vegetation through browsing and trampling."
      },
      {
        question: "Low quality tree fodder can enhance livestock production.",
        answer: false,
        explanation: "<b>Negative Interactions:</b><br><br>Low quality tree fodder can adversely affect livestock production."
      },
      {
        question: "Mimosine is a beneficial compound found in Leucaena fodder.",
        answer: false,
        explanation: "<b>Toxic Compounds:</b><br><br>Mimosine is a toxic compound found in Leucaena fodder."
      },
      {
        question: "Shelterbelts can protect animals from harsh weather conditions.",
        answer: true,
        explanation: "<b>Shelterbelts:</b><br><br>Shelterbelts provide protection for both pasture and animals from strong winds and storms."
      },
      {
        question: "Phenolic compounds increase the feed value of tree fodder.",
        answer: false,
        explanation: "<b>Phenolic Compounds:</b><br><br>Phenolic compounds can reduce the feed value of tree fodder."
      },
      {
        question: "Livestock can improve soil properties through compaction.",
        answer: false,
        explanation: "<b>Soil Compaction:</b><br><br>Livestock can cause soil compaction, negatively impacting tree growth."
      },
      {
        question: "Understanding tree-animal interactions is essential for effective agroforestry management.",
        answer: true,
        explanation: "<b>Understanding Interactions:</b><br><br>Understanding tree-animal interactions is essential for managing agroforestry systems effectively."
      },
      {
        question: "Negative interactions between trees and animals have no impact on agroforestry.",
        answer: false,
        explanation: "<b>Negative Interactions:</b><br><br>Negative interactions can significantly impact agroforestry systems."
      },
      {
        question: "The Land Equivalent Ratio (LER) indicates the relative performance of intercrops compared to monocultures.",
        answer: true,
        explanation: "<b>Land Equivalent Ratio:</b><br><br>LER indicates the relative performance of intercrops compared to monocultures."
      },
      {
        question: "If F < C, it indicates a positive interaction.",
        answer: false,
        explanation: "<b>Negative Interaction:</b><br><br>If F < C, it indicates a negative interaction."
      },
      {
        question: "The choice of species is irrelevant in agroforestry systems.",
        answer: false,
        explanation: "<b>Choice of Species:</b><br><br>The choice of species is crucial as it affects compatibility and productivity."
      },
      {
        question: "Quantifying tree-crop interaction can be expressed as Ysystem = Ytree + Ycrop + F - C.",
        answer: true,
        explanation: "<b>Quantifying Interaction:</b><br><br>Quantifying tree-crop interaction can be expressed as Ysystem = Ytree + Ycrop + F - C."
      },
      {
        question: "The design of an agroforestry system can only be in parallel rows.",
        answer: false,
        explanation: "<b>Design of Agroforestry System:</b><br><br>The design can be in parallel rows or concentric rows."
      },
      {
        question: "WaNuLCAS is a model for water, nutrient, and light capture in agroforestry systems.",
        answer: true,
        explanation: "<b>WaNuLCAS:</b><br><br>WaNuLCAS is a model for water, nutrient, and light capture in agroforestry systems."
      },
      {
        question: "The yield of tree products is represented by Ycrop in the equation Ysystem = Ytree + Ycrop.",
        answer: false,
        explanation: "<b>Yield Representation:</b><br><br>The yield of tree products is represented by Ytree."
      },
      {
        question: "The term LER is derived from its indication of relative land requirements for intercrops versus monocultures.",
        answer: true,
        explanation: "<b>Land Equivalent Ratio:</b><br><br>LER indicates relative land requirements for intercrops versus monocultures."
      },
      {
        question: "Positive interactions occur when the benefits of trees outweigh the competition effects.",
        answer: true,
        explanation: "<b>Positive Interactions:</b><br><br>Positive interactions occur when the benefits of trees outweigh the competition effects."
      },
      {
        question: "The management of agroforestry systems is irrelevant to their success.",
        answer: false,
        explanation: "<b>Management Role:</b><br><br>The management of agroforestry systems is crucial for their success."
      }
    ],
    'concept and classification by nasrin sultana mam': [
      {
        "question": "An agroforestry practice is the same as an agroforestry system.",
        "answer": false,
        "explanation": "Practices refer to arrangements in space and time, while systems encompass specific groups of practices."
      },
      {
        "question": "The main goal of agroforestry technology is to completely replace existing systems.",
        "answer": false,
        "explanation": "Agroforestry technology aims to innovate or improve systems, not necessarily replace them entirely."
      },
      {
        "question": "All agroforestry systems include spatial and temporal arrangements of components.",
        "answer": true,
        "explanation": "Systems distinctly arrange components like crops, trees, and animals in space and time."
      },
      {
        "question": "Classification of agroforestry systems should offer flexibility in regrouping information.",
        "answer": true,
        "explanation": "Flexibility ensures that classification schemes can adapt to various contexts and data analyses."
      },
      {
        "question": "ICRAF is known for its role in developing fishing-based land use systems.",
        "answer": false,
        "explanation": "ICRAF focuses on agroforestry systems involving crops, trees, and pastures, not fishing-based systems."
      },
      {
        question: "Nair (1987) identified four bases for classifying agroforestry systems.",
        answer: true,
        explanation: "<b>Nair's Classification:</b><br><br>Nair identified four bases: Structure, Function, Socio-economic Scale, and Ecological Spread for classifying agroforestry systems."
    },
    {
        question: "Dwivedi (1992) expanded the classification bases into six categories.",
        answer: false,
        explanation: "<b>Dwivedi's Reorganization:</b><br><br>Dwivedi expanded the classification into seven categories: Structure, Physiognomic, Function, Floristic, Socio-economic, History, and Ecological."
    },
    {
        question: "The socio-economic basis refers to the level of input management in agroforestry systems.",
        answer: true,
        explanation: "<b>Socio-economic Basis:</b><br><br>This basis considers management intensity and commercial goals, such as subsistence or commercial."
    },
    {
        question: "The ecological basis is irrelevant to agroforestry classification.",
        answer: false,
        explanation: "<b>Ecological Basis:</b><br><br>This basis is based on the assumption that different ecological conditions require distinct agroforestry systems."
    },
    {
        question: "The structural basis of agroforestry classification refers to the historical context.",
        answer: false,
        explanation: "<b>Structural Basis:</b><br><br>This basis includes both spatial and temporal arrangements of different components within the agroforestry system."
    },
    {
        question: "Historical classification refers to the evolution of agroforestry systems over time.",
        answer: true,
        explanation: "<b>Historical Classification:</b><br><br>This basis helps in understanding how traditional practices have shaped current agroforestry systems."
    },
    {
        question: "The physiognomic basis refers to the characters of vegetation.",
        answer: true,
        explanation: "<b>Physiognomic Basis:</b><br><br>This classification helps in understanding how different vegetation types adapt to their environments."
    },
    {
        question: "The floristic basis considers the economic aspects of agroforestry systems.",
        answer: false,
        explanation: "<b>Floristic Basis:</b><br><br>This basis is important for understanding the diversity and ecological interactions within agroforestry systems."
    },
    {
        question: "In Bangladesh, 'land utilization' is included as a basis for classifying agroforestry systems.",
        answer: true,
        explanation: "<b>Land Utilization:</b><br><br>This basis focuses on how agroforestry systems are adapted to specific land use patterns in Bangladesh."
    },
    {
        question: "The functional basis of agroforestry systems refers to the historical context.",
        answer: false,
        explanation: "<b>Functional Basis:</b><br><br>This basis highlights the contributions of woody components to the overall productivity of the system."
    },
    {
      question: "The structural basis refers to the composition of the components, including spatial and temporal arrangement.",
      answer: true,
      explanation: "<b>Structural Basis:</b><br><br>This basis helps in understanding how various elements interact within the agroforestry system."
  },
  {
      question: "The agrisilviculture system refers to the use of land for the production of agricultural crops only.",
      answer: false,
      explanation: "<b>Agrisilviculture System:</b><br><br>This system refers to the production of both agricultural crops and woody perennials."
  },
  {
      question: "Silvipasture is a prominent agroforestry practice that integrates trees with grasses.",
      answer: true,
      explanation: "<b>Silvipasture System:</b><br><br>This system is characterized by the integration of trees with grasses for wood production and animal rearing."
  },
  {
      question: "Apiculture with trees involves planting honey-producing tree species on the boundary mixed with agricultural crops.",
      answer: true,
      explanation: "<b>Apiculture System:</b><br><br>This system aims for honey production by integrating trees with agricultural crops."
  },
  {
      question: "Aquaforestry focuses on the production of only agricultural crops.",
      answer: false,
      explanation: "<b>Aquaforestry:</b><br><br>This system focuses on fish production and bund stabilization around ponds."
  },
  {
      question: "Agroforestry systems can be classified based on the dominance of components into multiple categories.",
      answer: true,
      explanation: "<b>Classification Based on Dominance:</b><br><br>Agroforestry systems can be classified into several categories based on the dominance of components."
  },
  {
      question: "In silvoagriculture, agriculture is the primary aim of land use.",
      answer: false,
      explanation: "<b>Silvoagriculture:</b><br><br>This system has silviculture as the primary aim, with trees as the major component."
  },
  {
      question: "The agrisilvopastural system is a combination of crops, trees, and pastures.",
      answer: true,
      explanation: "<b>Agrisilvopastural System:</b><br><br>This system has agricultural crops dominant over trees and pasture."
  },
  {
      question: "Pastural silviculture is an agroforestry system where trees are the primary component.",
      answer: false,
      explanation: "<b>Pastural Silviculture:</b><br><br>This system has pasture as the primary component while trees are secondary."
  },
  {
      question: "Silvopasture is an agroforestry system where trees constitute the primary component of land use.",
      answer: true,
      explanation: "<b>Silvopasture:</b><br><br>This system integrates trees with pastures, making trees the primary component."
  },
  {
    question: "Agroforestry systems can be classified based on the arrangement of components in space, time, and vertical stratification.",
    answer: true,
    explanation: "<b>Arrangement of Components:</b><br><br>This classification helps in understanding how different elements interact within the agroforestry system."
},
{
    question: "A mixed dense agroforestry system refers to components arranged together with low density.",
    answer: false,
    explanation: "<b>Mixed Dense System:</b><br><br>This arrangement refers to components arranged together with high density, such as in home gardens."
},
{
    question: "In a coincident system, different crops occupy the land together.",
    answer: true,
    explanation: "<b>Coincident System:</b><br><br>Examples include tea/coffee grown under trees."
},
{
    question: "A productive agroforestry system focuses on protecting the land and improving climate.",
    answer: false,
    explanation: "<b>Productive Agroforestry System:</b><br><br>This system focuses on the production of essential commodities."
},
{
    question: "A protective agroforestry system aims to reduce wind and water erosion.",
    answer: true,
    explanation: "<b>Protective Agroforestry System:</b><br><br>Examples include windbreaks and shelterbelts."
},
{
    question: "A multipurpose agroforestry system ensures production through optimizing only productive functions.",
    answer: false,
    explanation: "<b>Multipurpose Agroforestry System:</b><br><br>This system optimizes both productive and protective functions."
},
{
    question: "Vertical stratification refers to the layering of components in different vertical levels.",
    answer: true,
    explanation: "<b>Vertical Stratification:</b><br><br>This classification helps in understanding how different components occupy space."
},
{
    question: "A multilayered agroforestry system has components in only one layer.",
    answer: false,
    explanation: "<b>Multilayered System:</b><br><br>This system has components in more than two layers."
},
{
    question: "In a silvoagriculture system, trees are the major component while crops are secondary.",
    answer: true,
    explanation: "<b>Silvoagriculture:</b><br><br>This system integrates trees as the major component while including crops."
},
{
    question: "A concomitant system occurs when different crops occupy the land together.",
    answer: false,
    explanation: "<b>Concomitant System:</b><br><br>This system occurs when different components stay together for a certain period."
},
{
  question: "Agroforestry systems can be classified based on ecological parameters such as climatic, edaphic, and physiographic factors.",
  answer: true,
  explanation: "<b>Ecological Classification:</b><br><br>This classification is based on important ecological parameters."
},
{
  question: "The xeromorphic agroforestry system refers to vegetation in wetland areas.",
  answer: false,
  explanation: "<b>Xeromorphic System:</b><br><br>This system refers to dryland agroforestry in arid and semi-arid areas."
},
{
  question: "A subsistence agroforestry system aims at meeting the basic needs of small families with limited investment capacity.",
  answer: true,
  explanation: "<b>Subsistence Agroforestry System:</b><br><br>Examples include shifting cultivation and homestead agroforestry."
},
{
  question: "A commercial agroforestry system focuses on small-scale production.",
  answer: false,
  explanation: "<b>Commercial Agroforestry System:</b><br><br>This system aims for large-scale production for sale."
},
{
  question: "An intensively managed agroforestry system is managed for less production per unit area.",
  answer: false,
  explanation: "<b>Intensively Managed System:</b><br><br>This system is managed for more production per unit area."
},
{
  question: "Integrated-farm-forestry refers to the production of crops, animals, fishes, and trees together.",
  answer: true,
  explanation: "<b>Integrated-farm-forestry:</b><br><br>This system promotes diverse production in a single area."
},
{
  question: "Roadside agroforestry involves the production of deep-rooted tall trees along the sides of roads.",
  answer: true,
  explanation: "<b>Roadside Agroforestry:</b><br><br>This system involves planting trees and crops along roads, highways, and railways."
},
{
  question: "A low technology agroforestry system uses modern technology for production.",
  answer: false,
  explanation: "<b>Low Technology System:</b><br><br>This system uses primitive technology, as seen in shifting cultivation."
},
{
  question: "A high technology agroforestry system relies on modern technology for production.",
  answer: true,
  explanation: "<b>High Technology System:</b><br><br>Examples include tea gardens."
},
{
  question: "The mesomorphic agroforestry system refers to vegetation in extreme climates.",
  answer: false,
  explanation: "<b>Mesomorphic System:</b><br><br>This system refers to agroforestry systems where water is available in optimal quantities."
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
                    <div 
                      className="explanation-content"
                      dangerouslySetInnerHTML={{ __html: item.explanation }}
                    />
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
                <div 
                  className="explanation-content"
                  dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }}
                />
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
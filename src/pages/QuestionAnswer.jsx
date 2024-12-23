import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

function QuestionAnswer() {
  const { courseName, chapterName } = useParams();
  const navigate = useNavigate();
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const questions = {
    'introduction to agroforestry': [
      {
        question: "What are the key characteristics of Agroforestry systems?",
        answer: "The key characteristics of Agroforestry systems are:\n1. Multiple components, with at least one being woody perennial\n2. High level of interaction between woody and non-woody components\n3. All components are in the same unit of land\n4. Supply multiple products (food, fuel, fodder, furniture etc.)\n5. The cycle of Agroforestry system is more than one year\n6. More complex than mono-cropping"
      },
      {
        question: "What are the three major components of an Agroforestry system?",
        answer: "The three major components in an agroforestry system are:\n1. Tree or woody perennials\n2. Crops\n3. Animals"
      },
      {
        question: "Explain the key features that distinguish Agroforestry from other farming or forestry practices.",
        answer: "The key features that distinguish Agroforestry include:\n\n1. Intentional: Combinations of trees, crops and/or animals are intentionally designed and managed as a whole unit, rather than as individual elements\n\n2. Intensive: Practices are intensively managed to maintain productive and protective functions, involving annual operations like cultivation and fertilization\n\n3. Interactive: Management actively manipulates biological and physical interactions between tree, crop and animal components\n\n4. Integrated: The components are structurally and functionally combined into a single, integrated management unit, either horizontally or vertically, above or below ground"
      },
      {
        question: "What are the three main attributes of Agroforestry systems?",
        answer: "The three main attributes of Agroforestry systems are:\n\n1. Productivity: Aims to maintain or increase production and land productivity through:\n   - Increased output of tree products\n   - Improved yields of associated crops\n   - Reduction of cropping system inputs\n   - Better soil management\n   - Increased labor efficiency\n\n2. Sustainability: Conserves production potential of the resource base through beneficial effects of woody perennials on soils, achieving and maintaining conservation and fertility goals\n\n3. Adoptability: Refers to acceptance by the farming community. New Agroforestry technologies should conform to local farming practices"
      },
      {
        question: "What are the main objectives of Agroforestry?",
        answer: "The main objectives of Agroforestry are:\n1. Maximum utilization of land\n2. Diversified production on same unit of land\n3. Fulfillment of family demands (fund, financial, nutrition, happiness)\n4. Soil and water conservation\n5. Reduced risks of hurricane damages\n6. Long-term improvement of soil fertility & microclimate\n7. Reduction of external inputs (fertilizer, pesticides)\n8. Maintenance of landscape beauty and natural diversity"
      },
      {
        question: "What is the historical development and origin of the concept of Agroforestry?",
        answer: "The concept of Agroforestry originated from understanding trees' vital role in protecting land's long-term interests and making agriculture economically viable. It emerged primarily due to the need to maximize soil resource utilization by combining forest and agriculture (PCARRD, 1983). The term 'Agroforestry' was derived from 'Agrisilviculture', coined by Kenneth King in 1968. While the concept first emerged in temperate zones due to small family farms, it wasn't a new invention but rather a traditional practice where farmers historically raised trees, crops, and animals together on the same land unit. Modern agroforestry has evolved as an interface between agriculture and forestry, specifically addressing the needs of tropical developing countries."
      },
      {
        question: "What is Agroforestry? Explain its comprehensive definition according to different scientists.",
        answer: "Agroforestry has been defined by various scientists over time:\n1. Bene et al. (1977) provided the first definition: 'A sustainable management system for land that increases overall production, combines agricultural crops, tree crops, and forest plants and/or animals simultaneously/or sequentially and applies management practices compatible with local population's cultural patterns.'\n\n2. Nair (1979) defined it as: 'A land use system that integrates trees, crops and/or animals in a way that is scientifically sound, ecologically desirable, practically feasible and socially acceptable to the farmers.'\n\n3. Lundgren and Raintree (1982) at ICRAF defined it as: 'A collective name for land-use systems and technologies in which woody perennials (trees, shrubs, bamboos) are deliberately grown on the same land-management unit with herbaceous crops and/or animals, either in spatial arrangement or temporal sequence.'\n\nIn simple terms, it's an efficient land-use system where trees or shrubs are grown with arable crops to enhance productivity sustainably."
      },
      {
        question: "What are the two components that form the word 'Agroforestry'?",
        answer: "Agroforestry comes from two different words: 'agriculture' and 'forestry'."
      },
      {
        question: "Who coined the term 'Agrisilviculture' and in which year?",
        answer: "Kenneth King coined the term 'Agrisilviculture' in 1968."
      },
      {
        question: "Why has Agroforestry become increasingly important in modern times?",
        answer: "Agroforestry has become crucial because human population is increasing in geometric progression while land resources remain limited. This necessitates growing food, fuel, fodder, and fiber in an integrated manner on the same unit of land."
      },
      {
        question: "What are the key characteristics of Agroforestry according to modern definitions?",
        answer: "The key characteristics include:\n- Integration of trees, crops, and/or animals\n- Scientific soundness\n- Ecological desirability\n- Practical feasibility\n- Social acceptability\n- Sustainable land management\n- Increased overall production"
      },
      {
        question: "What are the environmental/ecological benefits of Agroforestry?",
        answer: "The environmental/ecological benefits of Agroforestry include:\n1. Better protection of crops and lives from environmental hazards (flood, drought, cyclone)\n2. Conserved biodiversity\n3. Improved microclimate (reduced soil temperature, reduced evaporation of soil moisture)\n4. Purification of air and water\n5. Reduced use of chemical fertilizer\n6. Reduced pressure on forests\n7. Protection of lands through reduction of surface run-off and soil erosion\n8. Increased soil nutrients through decomposition of litter fall"
      },
      {
        question: "Explain the economic benefits of Agroforestry systems.",
        answer: "The economic benefits of Agroforestry include:\n1. Diversified outputs from a given area of land\n2. Reduced incidence of total crop failure compared to mono-cropping systems\n3. Spread of labor inputs more evenly through the year\n4. Productive use of underutilized land, labour and capital\n5. Increased farm incomes due to improved and sustained productivity"
      },
      {
        question: "What are the social and biological benefits of Agroforestry?",
        answer: "Social Benefits:\n1. Improved rural living standards\n2. Improved nutrition and health\n3. Stabilization and improvement of upland communities\n\nBiological Benefits:\n1. Increased crop productivity\n2. Production of diversified foods\n3. Increased forest productivity\n4. Decreased weed infection"
      },
      {
        question: "How does Agroforestry improve soil conditions? Explain the various ways.",
        answer: "Agroforestry improves soil conditions in several ways:\n1. Reduction of soil loss by reducing surface run-off\n2. Addition of carbon through decomposable biomass\n3. Enrichment of soil through biological nitrogen fixation\n4. Improvement of soil physical conditions by increasing water holding capacity\n5. Assistance in nutrient recycling that conserves soil\n6. Protection of natural flora and fauna within the soil"
      },
      {
        question: "What are the main limitations of Agroforestry systems?",
        answer: "The limitations of Agroforestry can be categorized into two aspects:\n\nEnvironmental Aspects:\n1. Competition of trees with food crops may reduce crop yield\n2. Damage to food crop during tree harvest operation\n3. Trees sometimes serve as hosts to insect pests\n4. Rapid regeneration by prolific trees, which may displace food crops and take over entire fields\n\nSocioeconomic Aspects:\n1. Labor scarcity\n2. Long time required to get economic value from trees\n3. Resistance by farmers to displace food crops with trees\n4. More complex, less well understood and more difficult to apply compared to single-crop farming"
      },
      {
        question: "What are the key characteristics of Agroforestry according to modern definitions?",
        answer: "The key characteristics include:\n- Integration of trees, crops, and/or animals\n- Scientific soundness\n- Ecological desirability\n- Practical feasibility\n- Social acceptability\n- Sustainable land management\n- Increased overall production"
      },
      {
        question: "What was the historical practice of Agroforestry in Europe?",
        answer: "In Europe, it was common to clear-fell degraded forests and burn the slash to cultivate food crops. They would plant or sow trees before, alongside, or after sowing agricultural crops. This practice was prevalent in Finland until the end of the 19th century but is no longer popular in Europe."
      },
      {
        question: "How was Agroforestry practiced in Asia, particularly in the Philippines?",
        answer: "In Asia, particularly in the Philippines, a complex and sophisticated type of shifting cultivation was practiced, involving the clearing of forests for agricultural use."
      },
      {
        question: "Describe the Agroforestry practices in Africa, especially in Southern Nigeria.",
        answer: "In Southern Nigeria, people grew yams, maize, pumpkins, and beans together under the shade of scattered trees, demonstrating an early form of Agroforestry."
      },
      {
        question: "What was the significance of the 'Taungya' method introduced in Myanmar?",
        answer: "The 'Taungya' method, established by the British U. Pan Hle in 1806, involved growing annual agricultural crops alongside forest species during the early years of forest plantation establishment. This method was significant in integrating agriculture with forestry."
      },
      {
        question: "What role did the International Development Research Centre (IDRC) play in Agroforestry?",
        answer: "Due to overexploitation of natural resources and serious deforestation in the tropics, the IDRC in Ottawa, Canada, appointed a commission to formulate sustainable forestry research programs, leading to the establishment of the International Council for Research in Agroforestry (ICRAF) in 1977 with financial support from the World Bank."
      },
      {
        question: "Outline the historical development of Agroforestry in Bangladesh.",
        answer: "Agroforestry has been practiced in various forms across Bangladesh, with significant milestones including:\n1. Establishment of the forest department and management activities in 1862.\n2. Introduction of the Taungya system by Jhum farmers in 1912.\n3. The Betagi-Pomora Community Forestry Project in 1979 was the first Agroforestry program initiated under social forestry.\n4. The Jhoomia Rehabilitation program in the 1980s aimed to rehabilitate families in the Chittagong Hill Tracts.\n5. Establishment of the Agroforestry Department at Bangladesh Agricultural University in 1988.\n6. Formation of the National Agroforestry Working Group (NAWG) in 1997 to support Agroforestry initiatives."
      },
      {
        question: "What are the key characteristics of Agroforestry according to modern definitions?",
        answer: "The key characteristics include:\n- Integration of trees, crops, and/or animals\n- Scientific soundness\n- Ecological desirability\n- Practical feasibility\n- Social acceptability\n- Sustainable land management\n- Increased overall production"
      },
      {
        question: "What are the prospective areas for Agroforestry in Bangladesh?",
        answer: "The prospective areas for Agroforestry in Bangladesh include:\n1. Hilly areas: 10-15% of the total land area.\n2. Homestead and surrounding areas: 28.5 million homesteads covering 0.3 million hectares.\n3. Crop land: High land - about 29% situated above normal flood level.\n4. Fallow and marginal land: 0.39 million hectares of current fallow land, of which 0.27 million hectares is cultivable.\n5. Coastal areas: Length of coastal areas is 710 km.\n6. Degraded and encroached public forest lands: About 15.5% of land is suitable for public forest, with a current status of less than 7%.\n7. Roads, railways, and embankments: Total road length is 14,759 km, railway is 2,818 km, and larger embankments are 80,000 km.\n8. Water bodies: 1.77 million ponds covering 0.92 million hectares, and 700 rivers totaling 22,155 km.\n9. Other areas: Schools, mosques, playgrounds, markets, tea gardens, etc."
      },
      {
        question: "What qualities are needed for good Agroforestry trees?",
        answer: "The qualities needed for good Agroforestry trees include:\n1. Deep roots to avoid competition with crops for water and nutrients.\n2. Leaves that allow light to pass through for crop growth.\n3. Ability to survive regular pruning and cutting back.\n4. Small canopy size.\n5. Small and narrow leaves.\n6. Straight and long trunks.\n7. Ability to add nutrients to the soil.\n8. Leaves that provide animal fodder or soil mulch."
      },
      {
        question: "What types of products can be derived from Agroforestry systems?",
        answer: "Agroforestry systems support the production of a wide range of products, including:\n1. Food: arable crops, vegetables, animal products, fruits, mushrooms, oils, nuts, and leaves.\n2. Fuel: willow or hazel coppice, charcoal, and fuelwood.\n3. Fodder and forage.\n4. Fibre: pulp for paper, rubber, cork, bark, and woodchip mulch.\n5. Timber: for construction and furniture making.\n6. Gums and resins.\n7. Thatching and hedging materials: spars, binders, and stakes.\n8. Gardening materials: pea sticks, bean poles, fencing, hurdles.\n9. Medicinal products: ginseng, goldenseal, witch hazel.\n10. Craft products: natural dyes, basketry, floral arrangements.\n11. Recreation: agritourism, sport, hunting.\n12. Ecological services."
      },
      {
        question: "What are the key characteristics of Agroforestry according to modern definitions?",
        answer: "The key characteristics include:\n- Integration of trees, crops, and/or animals\n- Scientific soundness\n- Ecological desirability\n- Practical feasibility\n- Social acceptability\n- Sustainable land management\n- Increased overall production"
      },
      {
        question: "What was the historical practice of Agroforestry in Europe?",
        answer: "In Europe, it was common to clear-fell degraded forests and burn the slash to cultivate food crops. They would plant or sow trees before, alongside, or after sowing agricultural crops. This practice was prevalent in Finland until the end of the 19th century but is no longer popular in Europe."
      },
      {
        question: "How was Agroforestry practiced in Asia, particularly in the Philippines?",
        answer: "In Asia, particularly in the Philippines, a complex and sophisticated type of shifting cultivation was practiced, involving the clearing of forests for agricultural use."
      },
      {
        question: "Describe the Agroforestry practices in Africa, especially in Southern Nigeria.",
        answer: "In Southern Nigeria, people grew yams, maize, pumpkins, and beans together under the shade of scattered trees, demonstrating an early form of Agroforestry."
      },
      {
        question: "What was the significance of the 'Taungya' method introduced in Myanmar?",
        answer: "The 'Taungya' method, established by the British U. Pan Hle in 1806, involved growing annual agricultural crops alongside forest species during the early years of forest plantation establishment. This method was significant in integrating agriculture with forestry."
      },
      {
        question: "What role did the International Development Research Centre (IDRC) play in Agroforestry?",
        answer: "Due to overexploitation of natural resources and serious deforestation in the tropics, the IDRC in Ottawa, Canada, appointed a commission to formulate sustainable forestry research programs, leading to the establishment of the International Council for Research in Agroforestry (ICRAF) in 1977 with financial support from the World Bank."
      },
      {
        question: "Outline the historical development of Agroforestry in Bangladesh.",
        answer: "Agroforestry has been practiced in various forms across Bangladesh, with significant milestones including:\n1. Establishment of the forest department and management activities in 1862.\n2. Introduction of the Taungya system by Jhum farmers in 1912.\n3. The Betagi-Pomora Community Forestry Project in 1979 was the first Agroforestry program initiated under social forestry.\n4. The Jhoomia Rehabilitation program in the 1980s aimed to rehabilitate families in the Chittagong Hill Tracts.\n5. Establishment of the Agroforestry Department at Bangladesh Agricultural University in 1988.\n6. Formation of the National Agroforestry Working Group (NAWG) in 1997 to support Agroforestry initiatives."
      },
      {
        question: "What are the key characteristics of Agroforestry according to modern definitions?",
        answer: "The key characteristics include:\n- Integration of trees, crops, and/or animals\n- Scientific soundness\n- Ecological desirability\n- Practical feasibility\n- Social acceptability\n- Sustainable land management\n- Increased overall production"
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
        answer: "Bangladesh's LCC Subclasses:\n\nMajor Subclasses (based on flooding):\n1. D - soils lying above normal flood level\n2. W - soils subject to flooding for part or all the year\n\nOrdinary Subclasses:\n- d: restricted use due to droughtiness in dry season\n- e: restricted use due to erosion hazards\n- r: irregular relief hindering irrigation, drainage and tillage\n- s: excess soluble salts\n- t: toxic or potentially toxic chemicals to plants\n- w: restricted use due to excess water\n- x: fresh alluvium or very young alluvial soils\n- z: hazards of crop loss due to rapid rise of flood water"
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
    ],
    'concept of seed': [
      {
        "question": "What is the definition of a seed?",
        "answer": "In general, a seed is defined as the medium used to sustain and multiply plant species. Depending on the media used for plant propagation, a seed can be classified as:<br><br>1. <b>Botanical Seed</b>: A fertilized and mature ovule containing an embryo in a dormant state. Examples include rice seed, wheat seed, and jute seed. This is also called 'true seed.'<br>2. <b>Agricultural Seed</b>: Any part of the plant, whether vegetative or reproductive, that can produce new offspring of its type under suitable conditions. Examples include pineapple crown and banana sucker."
      },
      {
        "question": "What are the kinds of seeds based on the definition?",
        "answer": "Based on the definition, seeds are categorized into:<br><br>1. <b>Botanical Seed</b>: Fertilized and mature ovule containing an embryo in a dormant state. Examples: Rice seed, Wheat seed, Jute seed.<br>2. <b>Agricultural Seed</b>: Any vegetative or reproductive part of a plant capable of producing offspring. Examples: Pineapple crown, Banana sucker."
      },
      {
        "question": "What are the types of seeds based on the seed coat?",
        "answer": "Seeds can be classified based on the seed coat into:<br><br>1. <b>Naked Seed</b>:<ul><li>Seed coat is absent.</li><li>Found in plants that do not produce fruit.</li><li>Not found in higher plant classes.</li><li>Examples: Pine, Aurocaria, Cycus.</li></ul><br>2. <b>Covered Seed</b>:<ul><li>Seed coat is present.</li><li>Produced within fruit.</li><li>Found in higher classes of plants.</li><li>Examples: Rice seed, Wheat seed, Maize seed, Mustard seed.</li></ul>"
      },
      {
        "question": "What are the types of seeds based on cotyledons?",
        "answer": "Seeds are categorized based on cotyledons as:<br><br>1. <b>Monocot Seed</b>: Contains one cotyledon. Examples: Rice seed, Wheat seed.<br>2. <b>Dicot Seed</b>: Contains two cotyledons. Examples: Jute seed, Tomato seed.<br>3. <b>Polycot Seed</b>: Contains more than two cotyledons. Examples: Pine seed."
      },
      {
        "question": "What are the types of seeds based on the presence of endosperm?",
        "answer": "Based on the presence of endosperm, seeds are classified as:<br><br>1. <b>Endospermic (Albuminous) Seed</b>:<ul><li>Contains endosperm or albumin.</li><li>Examples: Rice seed, Wheat seed, Coconut seed.</li></ul><br>2. <b>Non-endospermic (Ex-albuminous) Seed</b>:<ul><li>Endosperm or albumin is absent.</li><li>Examples: Gram seed, Bean seed.</li></ul>"
      },
      {
        "question": "What are the types of seeds based on the embryo?",
        "answer": "Seeds are categorized based on the embryo as:<br><br>1. <b>Monoembryonic Seed</b>: Contains only one embryo. Examples: Rice seed, Wheat seed, Jute seed.<br>2. <b>Polyembryonic Seed</b>: Contains more than one embryo. Examples: Citrus fruit seed."
      },
      {
        "question": "What are the types of seeds based on fertilization?",
        "answer": "Based on fertilization, seeds are classified into:<br><br>1. <b>Fertilized Seed</b>:<ul><li>Produced through fertilization.</li><li>Examples: Rice seed, Wheat seed, Jute seed, Gram seed.</li></ul><br>2. <b>Non-fertilized Seed</b>:<ul><li>Produced without fertilization through asexual propagation.</li><li>These seeds form without meiosis or sexual propagation.</li></ul>"
      },
      {
        "question": "What is the difference between naked seeds and covered seeds?",
        "answer": "The differences between naked and covered seeds are:<br><br><table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Feature</th><th>Naked Seed</th><th>Covered Seed</th></tr></thead><tbody><tr><td>Seed coat</td><td>Absent</td><td>Present</td></tr><tr><td>Found in plants</td><td>Non-fruit-producing plants</td><td>Fruit-producing plants</td></tr><tr><td>Examples</td><td>Pine, Aurocaria, Cycus</td><td>Rice seed, Wheat seed, Mustard seed</td></tr></tbody></table>"
      },
      {
        "question": "How do monocot seeds differ from dicot seeds?",
        "answer": "The differences between monocot and dicot seeds are:<br><br><table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Feature</th><th>Monocot Seed</th><th>Dicot Seed</th></tr></thead><tbody><tr><td>Cotyledons</td><td>One</td><td>Two</td></tr><tr><td>Examples</td><td>Rice seed, Wheat seed</td><td>Jute seed, Tomato seed</td></tr></tbody></table>"
      },
      {
        "question": "What are the examples of polycot seeds?",
        "answer": "Polycot seeds are seeds that contain more than two cotyledons. Examples include the pine seed."
      },
      {
        "question": "What are the types of non-fertilized seeds?",
        "answer": "Non-fertilized seeds are classified into the following types:<br><br>1. <b>Recurrent Apomixis</b>:<ul><li>Embryo originates from the egg mother cell where meiosis has not occurred.</li><li>Example: Apple</li></ul><br>2. <b>Adventitious Embryony</b>:<ul><li>Embryo originates from the nucellus or integument.</li><li>Examples: Citrus fruits, Opuntia</li></ul><br>3. <b>Non-recurrent Apomixis</b>:<ul><li>Embryo originates directly from the egg nucleolus.</li></ul><br>4. <b>Vegetative Apomixis</b>:<ul><li>Vegetative buds or bulbils form in the inflorescences as a method of vegetative propagation.</li><li>Example: Onion</li></ul>"
      },
      {
        "question": "Differentiate between botanical and agricultural seeds.",
        "answer": "The differences between botanical and agricultural seeds are as follows:<br><br><table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Feature</th><th>Botanical Seed</th><th>Agricultural Seed</th></tr></thead><tbody><tr><td>Definition</td><td>Fertilized and mature ovule containing an embryo in a dormant state.</td><td>Any part of the plant, whether vegetative or reproductive, capable of producing new offspring under suitable conditions.</td></tr><tr><td>Examples</td><td>Rice, Jute, Wheat</td><td>Sett of Sugarcane, Tuber of Potato</td></tr><tr><td>Usage</td><td>Only seeds are used for propagation.</td><td>Seeds and vegetative parts are used for propagation.</td></tr><tr><td>Relationship</td><td>All botanical seeds are agricultural seeds.</td><td>Not all agricultural seeds are botanical seeds.</td></tr></tbody></table>"
      },
      {
        "question": "Why are seeds important in agriculture?",
        "answer": "Seeds play a critical role in agriculture due to the following reasons:<br><br>1. <b>Maintenance of Species</b>:<ul><li>Seeds protect the embryo.</li><li>They supply food for the germinating embryo.</li></ul><br>2. <b>Food Source</b>:<ul><li>Seeds serve as food for humans, animals, and other organisms.</li><li>Examples: Cereals, pulses, and oils (50% of edible oil comes from seeds).</li></ul><br>3. <b>Plant Improvement</b>:<ul><li>Used in selection, hybridization, and gene banks.</li></ul><br>4. <b>Basic Commodity</b>:<ul><li>Good seeds lead to better crops.</li><li>Examples: High-Yielding Varieties (HYV) and hybrids.</li></ul><br>5. <b>Industrial Use</b>:<ul><li>Seeds are used to produce chemicals, medicines, beverages, and alkaloids.</li></ul><br>6. <b>Beautification</b>:<ul><li>Seeds add value through their size, shape, and color.</li></ul><br>7. <b>Spread of Life</b>:<ul><li>Seeds are vehicles for spreading plant species across regions.</li></ul>"
      },
      {
        "question": "What is the definition of a seed?",
        "answer": "A seed is defined as the medium used to sustain and multiply plant species. It can be classified into:<br><br>1. <b>Botanical Seed</b>: A fertilized and mature ovule containing an embryo in a dormant state. Examples: Rice, Wheat, Jute.<br>2. <b>Agricultural Seed</b>: Any part of the plant, whether vegetative or reproductive, capable of producing offspring. Examples: Pineapple crown, Banana sucker."
      },
      {
        "question": "What are the advantages of seeds in plant improvement?",
        "answer": "Seeds aid in plant improvement through the following methods:<br><br>1. <b>Selection</b>: Choosing the best seeds for propagation.<br>2. <b>Hybridization</b>: Crossing two different varieties to create superior offspring.<br>3. <b>Gene Bank</b>: Storing seeds for future use in breeding and conservation."
      },
      {
        "question": "What are the uses of seeds in industries?",
        "answer": "Seeds are used in various industries for:<br><br>1. <b>Chemicals</b><br>2. <b>Medicines</b><br>3. <b>Beverages</b><br>4. <b>Alkaloids</b>"
      },
      {
        "question": "What are the sources of insect and disease spread in seeds?",
        "answer": "Seeds can act as sources of:<br><br>1. <b>Insect Spread</b>: Carrying pests to new areas.<br>2. <b>Disease Spread</b>: Acting as a medium for pathogens.<br>3. <b>Weed Spread</b>: Transporting weed seeds to new regions."
      },
      {
        "question": "What is the role of seeds in beautification?",
        "answer": "Seeds contribute to beautification by:<br><br>1. Their <b>size</b>, <b>shape</b>, and <b>color</b> adding aesthetic value.<br>2. Enhancing ornamental gardens and landscapes."
      },
      {
        "question": "How do seeds provide flavor and odor?",
        "answer": "Seeds add flavor and aroma to food. Examples include:<br><br>1. Curry spices<br>2. Polaw seasonings"
      },
      {
        "question": "What is vegetative apomixis?",
        "answer": "Vegetative apomixis is a type of vegetative propagation where buds or bulbils form in place of flowers in the inflorescence. Example: Onion."
      }      
    ]    
  };

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get the questions for current chapter
  useEffect(() => {
    const chapterQuestions = questions[chapterName.toLowerCase()] || [];
    // Shuffle the questions
    const shuffled = shuffleArray(chapterQuestions);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
  }, [chapterName]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setCurrentQuestionIndex((prev) => 
      prev < shuffledQuestions.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevQuestion = () => {
    setShowAnswer(false);
    setCurrentQuestionIndex((prev) => 
      prev > 0 ? prev - 1 : prev
    );
  };

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
                  <div 
                    className="answer" 
                    dangerouslySetInnerHTML={{ __html: currentQuestion.answer }}
                  />
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
  );
}

export default QuestionAnswer;

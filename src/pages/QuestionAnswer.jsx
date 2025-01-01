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
    'soil classification': [
      {
        question: "What is soil classification? Explain its purposes in detail.",
        answer: "Soil classification is the systematic grouping of soils based on their properties for study, identification, and categorization. It follows a multi-categorical or hierarchical system.\n\nThe main purposes of soil classification are:\n\n1. Systematic Organization:\n- Helps remember soil properties\n- Enables understanding of relationships between different soils\n\n2. Knowledge Management:\n- Organizes information efficiently\n- Leads to economy of thoughts\n\n3. Property Recognition:\n- Helps identify and recognize soil properties\n- Enables better understanding of soil characteristics\n\n4. Relationship Discovery:\n- Helps learn new relationships\n- Identifies principles in soil populations\n\n5. Practical Applications:\n- Predicts soil behavior\n- Identifies potential uses\n- Estimates productivity\n- Provides research objectives\n- Facilitates technology transfer from research to fields"
      },
      {
        question: "Define soil. Explain its basic characteristics.",
        answer: "Soil is defined as the loose and unconsolidated outer layer of the earth's crust that is crumbly, loose, and powdery in nature. Key characteristics include:\n\n1. Physical Properties:\n- Made up of particles of different sizes\n- Loose and unconsolidated structure\n- Crumbly and powdery texture\n\n2. Formation:\n- Natural body formed through interaction of soil-forming factors\n- Developed through pedogenic processes\n\n3. Location:\n- Forms the outer layer of earth's crust\n- Variable depth depending on location and conditions"
      },
      {
        question: "Explain the early systems of soil classification in detail.",
        answer: "The early systems of soil classification were based on single characteristics and included five main types:\n\n1. Economic Classification:\n- Based on soil productivity for taxation\n- Examples: Rice soils, Cotton soils\n\n2. Physical Classification:\n- Based on soil texture\n- Examples: Loamy, Sandy, Clayey soils\n\n3. Chemical Classification:\n- Based on chemical composition and characteristics\n- Examples: Acidic, Alkaline, Calcareous soils\n\n4. Geological Classification:\n- Based on parent rock/material\n- Examples: Basalt, Limestone, Sandstone soils\n\n5. Physiographic Classification:\n- Based on landscape characteristics\n- Examples: Basin, Terrace, Mountain valley soils\n\nLimitations:\n- Based on single characteristics\n- Limited utility\n- Led to need for more comprehensive systems"
      },
      {
        question: "What are the limitations of early soil classification systems?",
        answer: "The early soil classification systems had several limitations:\n\n1. Single-Character Focus:\n- Based on only one soil characteristic\n- Ignored other important properties\n\n2. Limited Scope:\n- Restricted utility in practical applications\n- Incomplete understanding of soil properties\n\n3. Lack of Comprehensiveness:\n- Failed to account for multiple soil attributes\n- Insufficient for modern agricultural needs\n\n4. Practical Limitations:\n- Difficult to apply in complex soil situations\n- Limited use in agricultural planning\n\nThese limitations led to the development of more comprehensive classification systems."
      },
      {
        question: "How does soil classification help in agricultural technology transfer?",
        answer: "Soil classification aids agricultural technology transfer in several ways:\n\n1. Research Application:\n- Provides framework for research\n- Helps identify suitable soil conditions\n\n2. Technology Transfer:\n- Facilitates transfer from research to fields\n- Helps match technologies with soil types\n\n3. Practical Implementation:\n- Guides farmers in soil management\n- Helps in crop selection\n\n4. Knowledge Sharing:\n- Enables systematic information sharing\n- Supports agricultural extension services"
      },
      {
        question: "What is the hierarchical system in soil classification?",
        answer: "The hierarchical system in soil classification is a multi-categorical approach where:\n\n1. Definition:\n- Soils are grouped in an orderly and logical manner\n- Classification moves from broad categories to specific ones\n\n2. Purpose:\n- Creates organized structure for soil types\n- Enables systematic study and identification\n\n3. Benefits:\n- Facilitates better understanding of soil relationships\n- Makes soil classification more comprehensive\n- Allows for detailed soil property analysis"
      },
      {
        question: "How does soil classification contribute to agricultural research?",
        answer: "Soil classification contributes to agricultural research in multiple ways:\n\n1. Research Framework:\n- Provides structured approach to soil studies\n- Enables systematic data collection\n\n2. Experimental Design:\n- Helps select appropriate soil types for experiments\n- Ensures research validity\n\n3. Result Analysis:\n- Facilitates comparison of research findings\n- Helps understand soil-crop relationships\n\n4. Application:\n- Guides practical implementation of research findings\n- Helps develop soil-specific recommendations"
      },
      {
        question: "What are the key components of soil that influence its classification?",
        answer: "The key components influencing soil classification include:\n\n1. Physical Components:\n- Particle size distribution\n- Soil structure\n- Texture characteristics\n\n2. Chemical Components:\n- Mineral composition\n- Chemical properties\n- pH levels\n\n3. Biological Components:\n- Organic matter content\n- Microbial activity\n\n4. Environmental Factors:\n- Formation processes\n- Geographic location\n- Climate influences"
      },
      {
        question: "Explain the importance of soil classification in land management.",
        answer: "Soil classification is crucial for land management because:\n\n1. Land Use Planning:\n- Helps determine suitable land uses\n- Guides crop selection\n- Assists in irrigation planning\n\n2. Conservation:\n- Identifies soil conservation needs\n- Helps prevent soil degradation\n- Guides sustainable practices\n\n3. Resource Management:\n- Facilitates efficient resource allocation\n- Helps optimize land use\n- Guides soil improvement strategies\n\n4. Economic Benefits:\n- Improves agricultural productivity\n- Reduces resource waste\n- Enhances farm profitability"
      },
      {
        question: "What role does soil classification play in sustainable agriculture?",
        answer: "Soil classification plays vital roles in sustainable agriculture:\n\n1. Resource Conservation:\n- Helps maintain soil health\n- Guides sustainable farming practices\n- Prevents soil degradation\n\n2. Crop Management:\n- Assists in crop rotation planning\n- Guides fertilizer application\n- Helps in water management\n\n3. Environmental Protection:\n- Reduces environmental impact\n- Promotes biodiversity\n- Supports ecosystem health\n\n4. Long-term Sustainability:\n- Ensures continued soil productivity\n- Maintains ecological balance\n- Supports future agricultural needs"
      },
      {
        question: "Explain Dokuchaiev's Genetic System of soil classification in detail.",
        answer: "Dokuchaiev's Genetic System (1900) divided soils into three categories:\n\n1. Normal (Zonal) Soils:\n- Fully developed soil profiles\n- Reflect climate and vegetation influence\n- Examples: Sierozem, Chestnut, Podzol, Laterites\n\n2. Transitional (Intrazonal) Soils:\n- Occur within zones\n- Reflect local conditions (topography, parent material)\n- Characteristics dominated by local conditions\n- Examples: Calcimorphic and Hydromorphic soils\n\n3. Abnormal (Azonal) Soils:\n- Time-limited soil formation\n- Lack fully developed horizons\n- Examples: Alluvial Soils, Regosols"
      },
      {
        question: "Describe Marbut's Morpho-Genetic System of soil classification.",
        answer: "Marbut's Morpho-Genetic System (1927) divided Zonal soils into two main classes:\n\n1. Pedalfers:\n- Show accumulation of iron and aluminum\n- Occur in high rainfall areas\n- Have surplus water for leaching\n\n2. Pedocals:\n- Show accumulation of calcium carbonate\n- Occur in high evaporation areas\n- Have water deficit"
      },
      {
        question: "Explain the Baldwin and associates Genetic System of soil classification.",
        answer: "Baldwin and associates Genetic System (1938) was a revision of Marbut's system:\n\n1. Main Structure:\n- Three orders: Zonal, Intrazonal, and Azonal\n- Based on Russian zonality concept\n\n2. Subdivisions:\n- Orders divided into 9 suborders\n- Based on specific climatic and vegetative regions\n\n3. Further Classification:\n- Suborders divided into Great Soil Groups\n- Great groups subdivided into soil families\n- Further divided into series and soil types"
      },
      {
        question: "Compare and contrast Pedalfers and Pedocals in Marbut's system.",
        answer: "Comparison between Pedalfers and Pedocals:\n\n1. Pedalfers:\n- Accumulate iron and aluminum\n- Found in high rainfall areas\n- Have water surplus\n- Enhanced leaching processes\n\n2. Pedocals:\n- Accumulate calcium carbonate\n- Found in high evaporation areas\n- Have water deficit\n- Limited leaching processes"
      },
      {
        question: "What are the characteristics of Intrazonal soils?",
        answer: "Characteristics of Intrazonal soils:\n\n1. Location:\n- Occur within specific zones\n- Influenced by local conditions\n\n2. Dominant Factors:\n- Topography\n- Parent material\n- Local environmental conditions\n\n3. Key Features:\n- Excess of water\n- Salt content\n- Calcium carbonate presence\n\n4. Examples:\n- Calcimorphic soils\n- Hydromorphic soils\n- Saline soils\n- Sodic soils\n- Saline-sodic soils"
      },
      {
        question: "What are the key features of Normal (Zonal) soils?",
        answer: "Normal (Zonal) soils have the following key features:\n\n1. Profile Development:\n- Fully developed soil profiles\n- Clear horizon differentiation\n\n2. Influencing Factors:\n- Strong climate influence\n- Significant vegetation impact\n\n3. Examples:\n- Sierozem\n- Chestnut soils\n- Podzol\n- Laterites\n\n4. Characteristics:\n- Reflect regional climate patterns\n- Show typical vegetation influences\n- Have well-defined soil horizons"
      },
      {
        question: "How did Baldwin's system improve upon Marbut's classification?",
        answer: "Baldwin's system improved Marbut's classification in several ways:\n\n1. Hierarchical Structure:\n- Introduced more detailed subdivisions\n- Created clearer categorization levels\n\n2. Classification Levels:\n- Orders (Zonal, Intrazonal, Azonal)\n- Suborders (9 based on climate and vegetation)\n- Great Soil Groups\n- Soil Families\n- Series and Types\n\n3. Integration:\n- Combined Russian zonality concept\n- Incorporated Marbut's insights\n- Added climate and vegetation factors"
      },
      {
        question: "What is the significance of the Russian zonality concept in soil classification?",
        answer: "The Russian zonality concept is significant because:\n\n1. Theoretical Foundation:\n- Based on geographical zonation\n- Reflects climate-vegetation relationships\n\n2. Classification Basis:\n- Helps organize soils systematically\n- Considers regional variations\n\n3. Practical Applications:\n- Aids in understanding soil distribution\n- Helps predict soil properties\n- Guides agricultural planning"
      },
      {
        question: "Explain the role of time in Azonal soil formation.",
        answer: "Time's role in Azonal soil formation includes:\n\n1. Development Limitation:\n- Insufficient time for full profile development\n- Limited horizon formation\n\n2. Characteristics:\n- Lack of distinct horizons\n- Minimal profile development\n- Young soil features\n\n3. Examples:\n- Alluvial soils (recent deposits)\n- Regosols (young soils)\n\n4. Implications:\n- Different management needs\n- Specific agricultural considerations\n- Unique development potential"
      },
      {
        question: "How do local conditions influence Intrazonal soil development?",
        answer: "Local conditions influence Intrazonal soil development through:\n\n1. Environmental Factors:\n- Topography effects\n- Parent material influence\n- Local water conditions\n\n2. Specific Conditions:\n- Water excess or deficit\n- Salt accumulation\n- Calcium carbonate presence\n\n3. Resulting Properties:\n- Distinct chemical characteristics\n- Unique physical properties\n- Special management requirements\n\n4. Management Implications:\n- Specific crop suitability\n- Special cultivation needs\n- Particular conservation approaches"
      }
    ],
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
      },
      {
        question: "What is the hierarchical system in soil classification?",
        answer: "The hierarchical system in soil classification is a multi-categorical approach where:\n\n1. Definition:\n- Soils are grouped in an orderly and logical manner\n- Classification moves from broad categories to specific ones\n\n2. Purpose:\n- Creates organized structure for soil types\n- Enables systematic study and identification\n\n3. Benefits:\n- Facilitates better understanding of soil relationships\n- Makes soil classification more comprehensive\n- Allows for detailed soil property analysis"
      },
      {
        question: "How does soil classification contribute to agricultural research?",
        answer: "Soil classification contributes to agricultural research in multiple ways:\n\n1. Research Framework:\n- Provides structured approach to soil studies\n- Enables systematic data collection\n\n2. Experimental Design:\n- Helps select appropriate soil types for experiments\n- Ensures research validity\n\n3. Result Analysis:\n- Facilitates comparison of research findings\n- Helps understand soil-crop relationships\n\n4. Application:\n- Guides practical implementation of research findings\n- Helps develop soil-specific recommendations"
      },
      {
        question: "What are the key components of soil that influence its classification?",
        answer: "The key components influencing soil classification include:\n\n1. Physical Components:\n- Particle size distribution\n- Soil structure\n- Texture characteristics\n\n2. Chemical Components:\n- Mineral composition\n- Chemical properties\n- pH levels\n\n3. Biological Components:\n- Organic matter content\n- Microbial activity\n\n4. Environmental Factors:\n- Formation processes\n- Geographic location\n- Climate influences"
      },
      {
        question: "Explain the importance of soil classification in land management.",
        answer: "Soil classification is crucial for land management because:\n\n1. Land Use Planning:\n- Helps determine suitable land uses\n- Guides crop selection\n- Assists in irrigation planning\n\n2. Conservation:\n- Identifies soil conservation needs\n- Helps prevent soil degradation\n- Guides sustainable practices\n\n3. Resource Management:\n- Facilitates efficient resource allocation\n- Helps optimize land use\n- Guides soil improvement strategies\n\n4. Economic Benefits:\n- Improves agricultural productivity\n- Reduces resource waste\n- Enhances farm profitability"
      },
      {
        question: "What role does soil classification play in sustainable agriculture?",
        answer: "Soil classification plays vital roles in sustainable agriculture:\n\n1. Resource Conservation:\n- Helps maintain soil health\n- Guides sustainable farming practices\n- Prevents soil degradation\n\n2. Crop Management:\n- Assists in crop rotation planning\n- Guides fertilizer application\n- Helps in water management\n\n3. Environmental Protection:\n- Reduces environmental impact\n- Promotes biodiversity\n- Supports ecosystem health\n\n4. Long-term Sustainability:\n- Ensures continued soil productivity\n- Maintains ecological balance\n- Supports future agricultural needs"
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
    ],
    'soil taxonomy- a comprehensive system': [
      {
        question: "What is Soil Taxonomy and when was it introduced?",
        answer: "Soil Taxonomy, also known as the '7th approximation', is:<br><br>1. <b>Introduction</b>:<ul><li>Published in 1960 by US Soil Survey Staff</li><li>Officially adopted in USA and many other countries</li></ul><br>2. <b>Nature of System</b>:<ul><li>A comprehensive morphogenetic system</li><li>Based on soil properties as they exist today</li><li>Uses morphology as a guide to soil genesis</li></ul><br>3. <b>Classification Basis</b>:<ul><li>Uses diagnostic horizons</li><li>Considers soil moisture regimes</li><li>Includes temperature regimes</li></ul>"
      },
      {
        question: "Define Pedon and Polypedon with their characteristics.",
        answer: "Pedon and Polypedon are defined as:<br><br><table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Pedon</th><th>Polypedon</th></tr></thead><tbody><tr><td>Definition</td><td>Smallest classifiable soil unit</td><td>Soil area composed of many similar pedons</td></tr><tr><td>Size</td><td>Usually 1 m² surface area</td><td>Multiple pedons combined</td></tr><tr><td>Capacity</td><td>Large enough to contain entire root system of average-sized plant</td><td>Contains multiple plant root systems</td></tr></tbody></table>"
      },
      {
        question: "Explain the concept of Diagnostic Horizons in Soil Taxonomy.",
        answer: "Diagnostic Horizons are:<br><br>1. <b>Definition</b>:<ul><li>Horizons formed through pedogenetic processes</li><li>Have distinct properties that can be measured</li><li>Part of a soil pedon</li></ul><br>2. <b>Types</b>:<ul><li>Epipedons (surface horizons)</li><li>Endopedons (subsurface horizons)</li></ul><br>3. <b>Characteristics</b>:<ul><li>Used for soil classification</li><li>Have measurable properties</li><li>Result from soil formation processes</li></ul>"
      },
      {
        question: "Compare and contrast Epipedons and Endopedons.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Feature</th><th>Epipedons</th><th>Endopedons</th></tr></thead><tbody><tr><td>Definition</td><td>Diagnostic surface horizons</td><td>Diagnostic subsurface horizons</td></tr><tr><td>Location</td><td>Uppermost soil horizons</td><td>Lower part of soil</td></tr><tr><td>Depth</td><td>Usually up to 0.15-0.18m</td><td>Below epipedons</td></tr><tr><td>Characteristic</td><td>Often darkened by organic matter</td><td>Area of material accumulation</td></tr></tbody></table>"
      },
      {
        question: "Describe the characteristics of Mollic Epipedon.",
        answer: "Mollic Epipedon (Latin mollis=soft) has the following characteristics:<br><br>1. <b>Physical Properties</b>:<ul><li>Thick horizon</li><li>Dark colored</li><li>Soft mineral horizon</li></ul><br>2. <b>Chemical Properties</b>:<ul><li>Contains 1% or more organic matter</li><li>High base saturation (>50%)</li></ul><br>3. <b>Structure</b>:<ul><li>Strong structure</li></ul>"
      },
      {
        question: "Explain the characteristics of Anthropic Epipedon.",
        answer: "Anthropic Epipedon (Greek Anthrops=man) is characterized by:<br><br>1. <b>Chemical Properties</b>:<ul><li>High concentration of available phosphorus (>250 ppm)</li><li>Distinguishable from mollic and umbric epipedons by phosphorus content</li></ul><br>2. <b>Formation</b>:<ul><li>Formed under long-continued farming systems</li><li>Requires irrigation</li><li>Needs large additions of organic matter (compost)</li></ul>"
      },
      {
        question: "Describe the characteristics of Umbric and Ochric Epipedons.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Umbric Epipedon</th><th>Ochric Epipedon</th></tr></thead><tbody><tr><td>Color</td><td>Dark colored</td><td>Light colored</td></tr><tr><td>Texture</td><td>Soft mineral horizon</td><td>Hard or very hard when dry</td></tr><tr><td>Base Saturation</td><td>Low (<50%)</td><td>Not specified</td></tr><tr><td>Organic Matter</td><td>Similar to mollic</td><td>Less than 1%</td></tr><tr><td>Structure</td><td>Like mollic</td><td>Massive when dry</td></tr></tbody></table>"
      },
      {
        question: "Compare Histic and Folistic Epipedons.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Histic Epipedon</th><th>Folistic Epipedon</th></tr></thead><tbody><tr><td>Water Saturation</td><td>Saturated for 30+ days/year</td><td>Never saturated for >30 days/year</td></tr><tr><td>Composition</td><td>Thin organic horizon</td><td>High organic matter content</td></tr><tr><td>Drainage</td><td>Can be artificially drained</td><td>Natural drainage</td></tr><tr><td>Duration of Saturation</td><td>>30 days cumulative</td><td><1 month</td></tr></tbody></table>"
      },
      {
        question: "Explain the characteristics of Plaggen Epipedon.",
        answer: "Plaggen Epipedon (German plaggen=sod) has the following characteristics:<br><br>1. <b>Physical Properties</b>:<ul><li>Man-made or artificial epipedon</li><li>At least 50 cm thick</li></ul><br>2. <b>Formation</b>:<ul><li>Produced by long and continued manuring</li><li>Sod was used as bedding for animals</li></ul><br>3. <b>Significance</b>:<ul><li>Represents human influence on soil formation</li><li>Historical agricultural practice indicator</li></ul>"
      },
      {
        question: "Describe the characteristics of Melanic Epipedon.",
        answer: "Melanic Epipedon (Greek melas=black) is characterized by:<br><br>1. <b>Color Properties</b>:<ul><li>Very black in color</li><li>Due to high organic matter content</li></ul><br>2. <b>Physical Properties</b>:<ul><li>Low bulk density (<0.9 gcc-1)</li><li>Contains 60% or more volcanic ash</li></ul><br>3. <b>Chemical Properties</b>:<ul><li>Organic carbon content >6%</li><li>Contains 4-6% organic carbon</li></ul><br>4. <b>Formation</b>:<ul><li>Dark color from organic matter accumulation</li><li>Results from decomposition of grass vegetation</li></ul>"
      },
      {
        question: "What is an Argillic horizon? Explain its formation and characteristics.",
        answer: "Argillic horizon (Latin: argilla = white clay) is characterized by:<br><br>1. <b>Definition</b>:<ul><li>An illuvial horizon with significant clay accumulation</li><li>Formed by clay migration from A to B horizon</li></ul><br>2. <b>Clay Content Requirements</b>:<ul><li>3% more clay if eluvial layer contains <15% clay</li><li>8% more clay if eluvial layer contains >15% clay</li></ul><br>3. <b>Formation Process</b>:<ul><li>Clay particles carried by water</li><li>Movement from A horizon to B horizon</li><li>Significant illuviation process</li></ul>"
      },
      {
        question: "Compare and contrast Natric and Spodic horizons.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Natric Horizon</th><th>Spodic Horizon</th></tr></thead><tbody><tr><td>Definition</td><td>Special type of argillic horizon</td><td>Active amorphous materials horizon</td></tr><tr><td>Key Component</td><td>High sodium content</td><td>Organic matter and aluminum</td></tr><tr><td>Structure</td><td>Prismatic or columnar</td><td>Not specified</td></tr><tr><td>Special Feature</td><td>ESP > 15%</td><td>High exchange capacity</td></tr><tr><td>Composition</td><td>Clay with high Na</td><td>Humus and/or sesquioxides</td></tr></tbody></table>"
      },
      {
        question: "Describe the characteristics and formation of Cambic and Oxic horizons.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Cambic Horizon</th><th>Oxic Horizon</th></tr></thead><tbody><tr><td>Nature</td><td>Altered horizon</td><td>Oxide-enriched horizon</td></tr><tr><td>Formation</td><td>Physical and chemical weathering</td><td>Fe and Al oxide enrichment</td></tr><tr><td>Physical Changes</td><td>Movement by frost, roots, animals</td><td>At least 30 cm thick</td></tr><tr><td>Texture</td><td>Various</td><td>Sandy loam or finer</td></tr><tr><td>Special Features</td><td>Ped formation</td><td>Variable 1:1 clay content</td></tr></tbody></table>"
      },
      {
        question: "Explain the characteristics of Duripan and Fragipan horizons.",
        answer: "Comparison of Duripan and Fragipan horizons:<br><br>1. <b>Duripan Horizon</b>:<ul><li>Cemented by silica</li><li>Fragments don't slake in water or HCl</li><li>Highly resistant to dissolution</li></ul><br>2. <b>Fragipan Horizon</b>:<ul><li>Brittle when moist</li><li>Very hard when dry</li><li>Can be broken by hand</li><li>Air-dry fragments slake in water</li><li>High bulk density</li></ul>"
      },
      {
        question: "What are the characteristics of Albic and Calcic horizons?",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Albic Horizon</th><th>Calcic Horizon</th></tr></thead><tbody><tr><td>Definition</td><td>Bleached E horizon</td><td>Carbonate accumulation horizon</td></tr><tr><td>Color</td><td>Determined by primary particles</td><td>Varies</td></tr><tr><td>Key Feature</td><td>Oxides removed or segregated</td><td>Ca or Ca-Mg carbonate enriched</td></tr><tr><td>Occurrence</td><td>In podzols and planosols</td><td>Various soil types</td></tr></tbody></table>"
      },
      {
        question: "Describe the characteristics of Agric horizon.",
        answer: "Agric horizon (Latin: ager = field) has the following characteristics:<br><br>1. <b>Definition</b>:<ul><li>Illuvial horizon of clay, silt, and humus</li><li>Located directly under plough layer</li></ul><br>2. <b>Formation</b>:<ul><li>Result of long-continued cultivation</li><li>Agricultural management impact</li></ul><br>3. <b>Composition</b>:<ul><li>Clay accumulation</li><li>Silt presence</li><li>Humus content</li></ul>"
      },
      {
        question: "Explain the characteristics of Gypsic and Salic horizons.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Gypsic Horizon</th><th>Salic Horizon</th></tr></thead><tbody><tr><td>Thickness</td><td>≥15 cm</td><td>≥15 cm</td></tr><tr><td>Composition</td><td>Calcium sulphate enrichment</td><td>Soluble salt enrichment</td></tr><tr><td>Minimum Content</td><td>5% more gypsum than underlying layer</td><td>>2% soluble salts</td></tr><tr><td>Salt Types</td><td>Calcium sulphate</td><td>NaCl, Na2SO4, etc.</td></tr><tr><td>Special Requirement</td><td>Non-cemented or weakly cemented</td><td>Product of thickness × salt% ≥60</td></tr></tbody></table>"
      },
      {
        question: "What are the key features of Spodic horizon?",
        answer: "Spodic horizon (Greek: spodos = wood ash) features include:<br><br>1. <b>Composition</b>:<ul><li>Active amorphous materials</li><li>Organic matter (humus)</li><li>Aluminum enrichment</li><li>Optional iron content</li></ul><br>2. <b>Properties</b>:<ul><li>High exchange capacity</li><li>Large surface area</li><li>High water retention</li></ul><br>3. <b>Formation</b>:<ul><li>Precipitation of organic matter</li><li>Accumulation of sesquioxides</li></ul>"
      },
      {
        question: "Describe the formation and characteristics of Cambic horizon.",
        answer: "Cambic horizon formation and characteristics include:<br><br>1. <b>Nature</b>:<ul><li>Altered horizon</li><li>Result of weathering processes</li></ul><br>2. <b>Formation Processes</b>:<ul><li>Physical weathering</li><li>Chemical weathering</li><li>Particle movement by frost</li><li>Root activity</li><li>Animal activity</li></ul><br>3. <b>Physical Changes</b>:<ul><li>Soil particle aggregation</li><li>Ped formation</li><li>Structural development</li></ul>"
      },
      {
        question: "What are the distinguishing features of Oxic horizon?",
        answer: "Oxic horizon (French: Oxide) characteristics include:<br><br>1. <b>Composition</b>:<ul><li>Enriched with Fe and Al oxides</li><li>Contains variable amounts of 1:1 clay</li></ul><br>2. <b>Physical Properties</b>:<ul><li>Minimum thickness of 30 cm</li><li>Sandy loam or finer texture</li></ul><br>3. <b>Significance</b>:<ul><li>Indicates advanced weathering</li><li>Important for soil classification</li><li>Affects soil management practices</li></ul>"
      }
    ],
    'soil moisture and temperature regimes': [
      {
        question: "What is Soil Moisture Regime (SMR)? Explain its significance.",
        answer: "Soil Moisture Regime (SMR) is defined as:<br><br>1. <b>Definition</b>:<ul><li>Refers to presence or absence of water in soil at different times of year</li><li>Guides soil utilization for plant growth</li></ul><br>2. <b>Measurement Criteria</b>:<ul><li>Soil considered moist: moisture tension < 15 bar</li><li>Soil considered dry: moisture tension ≥ 15 bar</li></ul><br>3. <b>Significance</b>:<ul><li>Controls soil development</li><li>Guides plant growth</li><li>Determines soil utilization</li></ul>"
      },
      {
        question: "What is Soil Moisture Control Section (SMCS)? Explain its importance.",
        answer: "Soil Moisture Control Section (SMCS):<br><br>1. <b>Definition</b>:<ul><li>Depth limits of soil that regulate moisture supply to crops</li><li>Depends on soil texture</li></ul><br>2. <b>Importance</b>:<ul><li>Controls moisture availability to plants</li><li>Helps determine moisture regime classification</li><li>Critical for crop management</li></ul>"
      },
      {
        question: "Compare and contrast Aquic and Udic moisture regimes.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Aquic Regime</th><th>Udic Regime</th></tr></thead><tbody><tr><td>Drainage</td><td>Poorly drained</td><td>Well drained</td></tr><tr><td>Water Status</td><td>Saturated for some time</td><td>Moist throughout</td></tr><tr><td>Oxygen Status</td><td>Reduced due to lack of oxygen</td><td>Normal oxygen levels</td></tr><tr><td>Dry Period</td><td>Rarely dry</td><td>Not dry for >90 cumulative days</td></tr></tbody></table>"
      },
      {
        question: "Explain the characteristics of Ustic moisture regime.",
        answer: "Ustic moisture regime characteristics:<br><br>1. <b>Temperature Conditions</b>:<ul><li>MAST > 22°C</li><li>MSST-MWST difference can be <5°C or >5°C</li></ul><br>2. <b>Moisture Requirements</b>:<ul><li>SMCS dry in parts for 90 cumulative days</li><li>SMCS moist in parts for 180 cumulative days</li><li>Continuously moist for 90 consecutive days</li></ul><br>3. <b>Seasonal Patterns</b>:<ul><li>Moist in all parts for 45+ consecutive days in 4 months after summer solstice</li><li>Dry in all parts for 45+ consecutive days in 4 months after winter solstice</li></ul>"
      },
      {
        question: "Describe the characteristics of Xeric moisture regime.",
        answer: "Xeric moisture regime is characterized by:<br><br>1. <b>Temperature Requirements</b>:<ul><li>MAST < 22°C</li><li>MSST and MWST differ by >5°C</li></ul><br>2. <b>Moisture Conditions</b>:<ul><li>SMCS dry in all parts for ≥45 consecutive days</li><li>SMCS moist in all parts for >45 consecutive days</li></ul><br>3. <b>Significance</b>:<ul><li>Limited moisture availability</li><li>Distinct seasonal patterns</li></ul>"
      },
      {
        question: "Compare Aridic and Torric moisture regimes.",
        answer: "Aridic and Torric regimes share these characteristics:<br><br>1. <b>Moisture Status</b>:<ul><li>SMCS dry throughout for >180 cumulative days (at >5°C)</li><li>Never moist in some/all parts for 90 consecutive days (at >8°C)</li></ul><br>2. <b>Key Features</b>:<ul><li>Negligible moisture</li><li>Extended dry periods</li><li>Limited plant growth potential</li></ul>"
      },
      {
        question: "What is the significance of Mean Annual Soil Temperature (MAST) in soil classification?",
        answer: "Mean Annual Soil Temperature (MAST) significance:<br><br>1. <b>Classification Role</b>:<ul><li>Helps differentiate moisture regimes</li><li>Critical threshold at 22°C</li></ul><br>2. <b>Regime Determination</b>:<ul><li>Ustic regime: MAST > 22°C</li><li>Xeric regime: MAST < 22°C</li></ul><br>3. <b>Impact</b>:<ul><li>Influences soil development</li><li>Affects moisture availability</li><li>Guides crop selection</li></ul>"
      },
      {
        question: "Explain the importance of seasonal temperature differences in soil moisture regimes.",
        answer: "Seasonal temperature differences importance:<br><br>1. <b>Temperature Measurements</b>:<ul><li>MSST (Mean Summer Soil Temperature)</li><li>MWST (Mean Winter Soil Temperature)</li></ul><br>2. <b>Significance in Regimes</b>:<ul><li>Ustic: MSST-MWST can be <5°C or >5°C</li><li>Xeric: MSST-MWST must be >5°C</li></ul><br>3. <b>Impact on Soil Properties</b>:<ul><li>Affects moisture retention</li><li>Influences biological activity</li><li>Determines crop growing seasons</li></ul>"
      },
      {
        question: "What are the key differences between moisture regimes based on consecutive dry days?",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Moisture Regime</th><th>Consecutive Dry Days</th><th>Other Conditions</th></tr></thead><tbody><tr><td>Udic</td><td>Not dry for 90 days</td><td>Moist throughout</td></tr><tr><td>Ustic</td><td>Dry for parts of 90 days</td><td>Moist for 180 cumulative days</td></tr><tr><td>Xeric</td><td>Dry for 45+ days</td><td>MAST < 22°C</td></tr><tr><td>Aridic/Torric</td><td>Dry for 180+ days</td><td>Temperature >5°C</td></tr></tbody></table>"
      },
      {
        question: "How do solstice periods affect soil moisture regimes?",
        answer: "Solstice periods affect soil moisture regimes as follows:<br><br>1. <b>Summer Solstice (from June 22)</b>:<ul><li>Important for Ustic regime</li><li>Requires 45+ consecutive moist days in following 4 months</li></ul><br>2. <b>Winter Solstice (from December 23)</b>:<ul><li>Also important for Ustic regime</li><li>Requires 45+ consecutive dry days in following 4 months</li></ul><br>3. <b>Significance</b>:<ul><li>Helps determine seasonal moisture patterns</li><li>Important for agricultural planning</li><li>Affects crop selection and timing</li></ul>"
      },
      {
        question: "What are Soil Temperature Regimes (STRs)? Explain their significance in soil classification.",
        answer: "Soil Temperature Regimes (STRs) are:<br><br>1. <b>Definition</b>:<ul><li>Temperature ranges within which biological activity occurs</li><li>Characteristic temperature regime for each pedon</li></ul><br>2. <b>Measurement Parameters</b>:<ul><li>Mean annual soil temperature</li><li>Average seasonal fluctuations</li><li>Mean warm/cold seasonal soil temperature gradient (5-100 cm root zone)</li></ul><br>3. <b>Classification Significance</b>:<ul><li>Used in family level classification</li><li>Important for suborder level classification</li></ul>"
      },
      {
        question: "Compare the different temperature ranges in Soil Temperature Regimes.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>STR</th><th>Temperature Range (°C)</th><th>Additional Criteria</th></tr></thead><tbody><tr><td>Pergelic</td><td>< 0°C</td><td>Permanent frost</td></tr><tr><td>Cryic</td><td>0 to < 8°C</td><td>Very cold soils</td></tr><tr><td>Frigid</td><td>< 8°C</td><td>Warmer summers than Cryic</td></tr><tr><td>Mesic</td><td>8 to < 15°C</td><td>MSST-MWST > 5°C</td></tr><tr><td>Thermic</td><td>15 to < 22°C</td><td>MSST-MWST > 5°C</td></tr><tr><td>Hyperthermic</td><td>22 to < 28°C</td><td>MSST-MWST > 5°C</td></tr><tr><td>Megathermic</td><td>≥ 28°C</td><td>MSST-MWST > 5°C</td></tr></tbody></table>"
      },
      {
        question: "Explain the concept of 'iso' prefix in Soil Temperature Regimes.",
        answer: "The 'iso' prefix in STRs:<br><br>1. <b>Definition</b>:<ul><li>Used when difference between mean summer and winter temperature is < 5°C</li></ul><br>2. <b>Applications</b>:<ul><li>Isofrigid</li><li>Isomesic</li><li>Isothermic</li><li>Isohyperthermic</li><li>Isomegathermic</li></ul><br>3. <b>Significance</b>:<ul><li>Indicates minimal seasonal temperature variation</li><li>Important for agricultural planning</li><li>Affects soil classification</li></ul>"
      },
      {
        question: "Describe the characteristics of Frigid and Cryic temperature regimes.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Frigid Regime</th><th>Cryic Regime</th></tr></thead><tbody><tr><td>Temperature Range</td><td>< 8°C</td><td>0 to < 8°C</td></tr><tr><td>Summer Condition</td><td>Warmer than Cryic</td><td>Very cold</td></tr><tr><td>Seasonal Difference</td><td>> 5°C between seasons</td><td>Not specified</td></tr><tr><td>Classification Use</td><td>Family level</td><td>Family level</td></tr></tbody></table>"
      },
      {
        question: "Compare Thermic and Hyperthermic temperature regimes.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Thermic Regime</th><th>Hyperthermic Regime</th></tr></thead><tbody><tr><td>Temperature Range</td><td>15 to < 22°C</td><td>22 to < 28°C</td></tr><tr><td>Seasonal Difference</td><td>> 5°C</td><td>> 5°C</td></tr><tr><td>Iso-variant</td><td>Isothermic</td><td>Isohyperthermic</td></tr><tr><td>Application</td><td>Family level</td><td>Family level</td></tr></tbody></table>"
      },
      {
        question: "What is the significance of MSST-MWST difference in Soil Temperature Regimes?",
        answer: "MSST-MWST difference significance:<br><br>1. <b>Standard Regimes</b>:<ul><li>Difference > 5°C required for regular classification</li><li>Applies to Frigid through Megathermic</li></ul><br>2. <b>Iso-Regimes</b>:<ul><li>Difference < 5°C leads to 'iso' prefix</li><li>Indicates more stable temperature conditions</li></ul><br>3. <b>Impact</b>:<ul><li>Affects soil development</li><li>Influences biological activity</li><li>Important for agricultural planning</li></ul>"
      },
      {
        question: "Explain the characteristics of Megathermic temperature regime.",
        answer: "Megathermic temperature regime characteristics:<br><br>1. <b>Temperature Requirements</b>:<ul><li>Mean annual soil temperature ≥ 28°C</li><li>MSST-MWST difference > 5°C</li></ul><br>2. <b>Variants</b>:<ul><li>Regular Megathermic</li><li>Isomegathermic (if MSST-MWST < 5°C)</li></ul><br>3. <b>Significance</b>:<ul><li>Indicates very hot soil conditions</li><li>Important for tropical agriculture</li><li>Affects soil biological activity</li></ul>"
      },
      {
        question: "How are STRs used in soil classification?",
        answer: "STRs in soil classification:<br><br>1. <b>Classification Levels</b>:<ul><li>Used at family categoric level</li><li>Applied at suborder level</li></ul><br>2. <b>Geographic Distribution</b>:<ul><li>Boreal regions: Colder regimes</li><li>Tropical regions: Warmer regimes</li></ul><br>3. <b>Application</b>:<ul><li>Helps determine soil properties</li><li>Guides agricultural practices</li><li>Influences soil management decisions</li></ul>"
      },
      {
        question: "What are the characteristics of Pergelic temperature regime?",
        answer: "Pergelic temperature regime characteristics:<br><br>1. <b>Temperature Condition</b>:<ul><li>Mean annual soil temperature < 0°C</li><li>Permanent frost condition</li></ul><br>2. <b>Significance</b>:<ul><li>Indicates permafrost conditions</li><li>Limited biological activity</li><li>Restricted agricultural use</li></ul><br>3. <b>Classification Use</b>:<ul><li>Important for polar region soils</li><li>Used in soil taxonomy</li></ul>"
      },
      {
        question: "Describe the Mesic temperature regime and its significance.",
        answer: "Mesic temperature regime characteristics:<br><br>1. <b>Temperature Range</b>:<ul><li>Mean annual soil temperature: 8 to < 15°C</li><li>MSST-MWST difference > 5°C</li></ul><br>2. <b>Variants</b>:<ul><li>Regular Mesic</li><li>Isomesic (if MSST-MWST < 5°C)</li></ul><br>3. <b>Agricultural Significance</b>:<ul><li>Moderate temperature conditions</li><li>Suitable for many crops</li><li>Common in temperate regions</li></ul>"
      }
    ],
    'categories in soil taxonomy': [
      {
        question: "Explain the hierarchical categories in Soil Taxonomy and their significance.",
        answer: "Soil Taxonomy categories are organized as:<br><br>1. <b>Higher Categories</b>:<ul><li>Order (12)</li><li>Suborder (63)</li><li>Great group (240+)</li></ul><br>2. <b>Lower Categories</b>:<ul><li>Subgroup (1000)</li><li>Family (8000)</li><li>Series (500+ in Bangladesh, 19,000 in USA)</li></ul><br>3. <b>Significance</b>:<ul><li>Organized from highest to lowest levels of generalization</li><li>Provides systematic classification framework</li><li>Enables precise soil identification</li></ul>"
      },
      {
        question: "Describe the formative elements and derivation of major soil orders.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Soil Order</th><th>Formative Element</th><th>Derivation</th></tr></thead><tbody><tr><td>Entisol</td><td>ent</td><td>Nonsense Symbol</td></tr><tr><td>Vertisol</td><td>ert</td><td>Latin: verto (turn)</td></tr><tr><td>Inceptisol</td><td>ept</td><td>Latin: inceptum (beginning)</td></tr><tr><td>Aridisol</td><td>id</td><td>Latin: aridus (dry)</td></tr><tr><td>Mollisol</td><td>oll</td><td>Latin: mollis (soft)</td></tr><tr><td>Spodosol</td><td>od</td><td>Greek: spodos (woodash)</td></tr><tr><td>Alfisol</td><td>alf</td><td>Nonsense Symbol</td></tr><tr><td>Ultisols</td><td>ult</td><td>Latin: ultimus (last)</td></tr><tr><td>Oxisol</td><td>ox</td><td>French: oxide</td></tr><tr><td>Histosol</td><td>ist</td><td>Greek: histos (tissue)</td></tr><tr><td>Andisol</td><td>and</td><td>Japanese: ando (black soil)</td></tr><tr><td>Gelisols</td><td>el</td><td>Greek: gelid (very cold)</td></tr></tbody></table>"
      },
      {
        question: "Explain the characteristics of Entisols and their suborders in Bangladesh.",
        answer: "Entisols characteristics:<br><br>1. <b>Definition</b>:<ul><li>Very recently developed mineral soils</li><li>No diagnostic horizon</li><li>Formed in fresh deposits or eroding steep slopes</li></ul><br>2. <b>Suborders in Bangladesh</b>:<ul><li>Aquents: Calcareous Alluvium</li><li>Fluvent: Noncalcareous Alluvium</li><li>Psamments: Unripened Acid Sulphate Soils</li><li>Arents: Poorly drained Acid Basin Clays</li><li>Orthents: Grey Flood plain Soils, Shallow Red Brown Terrace Soils, Grey Terrace Soils</li></ul>"
      },
      {
        question: "Describe the characteristics of Inceptisols and their distribution in Bangladesh.",
        answer: "Inceptisols characteristics:<br><br>1. <b>Definition</b>:<ul><li>Early stage of soil development</li><li>Shows alteration of parent material</li><li>Developed soil structure</li></ul><br>2. <b>Distribution</b>:<ul><li>Very common in Bangladesh</li><li>Occur throughout the world</li></ul><br>3. <b>Suborders and Equivalents</b>:<ul><li>Aquepts: Ripened Acid Sulphate Soils</li><li>Anthrepts: Grey Floodplain Soils</li><li>Ustepts: Noncalcareous Brown Floodplain Soils</li><li>Udepts: Black Terai Soils, Brown Hill Soils</li></ul>"
      },
      {
        question: "What are the key characteristics of Vertisols?",
        answer: "Vertisols characteristics:<br><br>1. <b>Physical Properties</b>:<ul><li>Uniform, thick (≥50 cm)</li><li>Tropical black or dark colored soils</li><li>Deep cracks when dry (≥1 cm wide, 50 cm deep)</li></ul><br>2. <b>Special Features</b>:<ul><li>Associated with gilgai microrelief</li><li>Intersecting slickensides</li><li>Contains ≥30% clay</li><li>Ability to swell and shrink</li></ul><br>3. <b>Suborders</b>:<ul><li>Aquerts</li><li>Cryerts</li><li>Xererts</li><li>Torrerts</li><li>Usterts</li><li>Uderts</li></ul>"
      },
      {
        question: "Compare the soil series numbers between Bangladesh and USA.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Region</th><th>Number of Soil Series</th><th>Significance</th></tr></thead><tbody><tr><td>Bangladesh</td><td>500+</td><td>Relatively fewer series due to smaller area</td></tr><tr><td>USA</td><td>19,000</td><td>Large number due to diverse landscapes and climates</td></tr></tbody></table>"
      },
      {
        question: "Explain the significance of suborders in soil classification.",
        answer: "Significance of suborders:<br><br>1. <b>Classification Level</b>:<ul><li>Second highest category in soil taxonomy</li><li>63 total suborders identified</li></ul><br>2. <b>Examples in Bangladesh</b>:<ul><li>Entisol suborders: Aquents, Fluvents, Psamments</li><li>Inceptisol suborders: Aquepts, Anthrepts, Ustepts</li><li>Vertisol suborders: Aquerts, Uderts</li></ul><br>3. <b>Importance</b>:<ul><li>Provides more specific soil characteristics</li><li>Helps in land use planning</li><li>Guides agricultural management</li></ul>"
      },
      {
        question: "What are the major soil orders and their basic characteristics?",
        answer: "Major soil orders and characteristics:<br><br>1. <b>Recently Developed Soils</b>:<ul><li>Entisols: No diagnostic horizon</li><li>Inceptisols: Beginning stage of development</li></ul><br>2. <b>Clay-Rich Soils</b>:<ul><li>Vertisols: Dark, cracking clays</li><li>Alfisols: High base status</li></ul><br>3. <b>Special Soils</b>:<ul><li>Histosols: Organic soils</li><li>Andisols: Volcanic soils</li><li>Gelisols: Very cold soils</li></ul>"
      },
      {
        question: "Describe the relationship between higher and lower categories in soil taxonomy.",
        answer: "Relationship between categories:<br><br>1. <b>Higher Categories</b>:<ul><li>More general characteristics</li><li>Broader groupings</li><li>Fewer total units (12 orders, 63 suborders)</li></ul><br>2. <b>Lower Categories</b>:<ul><li>More specific characteristics</li><li>Detailed classifications</li><li>More numerous (1000 subgroups, 8000 families)</li></ul><br>3. <b>Hierarchical Structure</b>:<ul><li>Progressive refinement of classification</li><li>Increasing detail at lower levels</li><li>More precise management recommendations</li></ul>"
      },
      {
        question: "What are the common Bangladesh soil equivalents in major soil orders?",
        answer: "Bangladesh soil equivalents:<br><br>1. <b>Entisol Equivalents</b>:<ul><li>Calcareous Alluvium</li><li>Noncalcareous Alluvium</li><li>Grey Flood plain Soils</li></ul><br>2. <b>Inceptisol Equivalents</b>:<ul><li>Grey Floodplain Soils</li><li>Noncalcareous Brown Floodplain Soils</li><li>Black Terai Soils</li></ul><br>3. <b>Special Features</b>:<ul><li>Acid Sulphate Soils</li><li>Brown Hill Soils</li><li>Terrace Soils</li></ul>"
      },
      {
        question: "Compare and contrast Aridisols, Mollisols, and Spodosols.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Aridisols</th><th>Mollisols</th><th>Spodosols</th></tr></thead><tbody><tr><td>Environment</td><td>Arid and semiarid</td><td>Sub humid to humid</td><td>Cool, humid climate</td></tr><tr><td>Key Features</td><td>Salt accumulation</td><td>Dark colored, base-rich</td><td>Sesquioxides and humus accumulation</td></tr><tr><td>Base Saturation</td><td>Variable</td><td>>50%</td><td>Variable</td></tr><tr><td>Parent Material</td><td>Various</td><td>Various</td><td>Coarse-textured silicious</td></tr><tr><td>Vegetation</td><td>Limited</td><td>Grassland</td><td>Various</td></tr></tbody></table>"
      },
      {
        question: "Explain the characteristics and distribution of Alfisols and Ultisols.",
        answer: "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr><th>Characteristic</th><th>Alfisols</th><th>Ultisols</th></tr></thead><tbody><tr><td>Base Status</td><td>Base-rich (>35%)</td><td>Base-poor (<35%)</td></tr><tr><td>Region</td><td>Sub humid and humid</td><td>Humid and sub-humid</td></tr><tr><td>Key Features</td><td>Clay-rich argillic horizon</td><td>Developed under high rainfall</td></tr><tr><td>Vegetation</td><td>Various</td><td>Forest vegetation</td></tr><tr><td>Bangladesh Examples</td><td>Deep Red Brown and Mottled Terrace Soil</td><td>Kashimpur Series, Shallow Red Brown Terrace Soils</td></tr></tbody></table>"
      },
      {
        question: "Describe the characteristics of Oxisols, Histosols, and Andisols.",
        answer: "1. <b>Oxisols</b>:<ul><li>Strongly weathered mineral soils</li><li>Found in humid tropics</li><li>Poor fertility</li><li>Colors: Brick red, yellow, or gray</li><li>Bangladesh equivalent: Grey Terrace Soils</li></ul><br>2. <b>Histosols</b>:<ul><li>Dominantly organic soils</li><li>Known as bogs, peat, and mucks</li><li>80 cm thick peaty horizon</li><li>Bangladesh equivalent: Peat Soils</li></ul><br>3. <b>Andisols</b>:<ul><li>Dark colored soils</li><li>Low bulk density (<0.09 g/cc)</li><li>Developed on volcanic ash (>60%)</li><li>No equivalent in Bangladesh</li></ul>"
      },
      {
        question: "What are Gelisols and their characteristics?",
        answer: "Gelisols characteristics:<br><br>1. <b>Definition</b>:<ul><li>Soils with gelic material</li><li>Underlain by permafrost</li></ul><br>2. <b>Key Features</b>:<ul><li>Shows evidence of cryoturbation (frost churning)</li><li>Permafrost acts as barrier to downward movement</li><li>Influences pedogenesis</li></ul><br>3. <b>Suborders</b>:<ul><li>Histels</li><li>Turbels</li><li>Orthels</li></ul><br>4. <b>Distribution</b>:<ul><li>No equivalent soils in Bangladesh</li><li>Found in permafrost regions</li></ul>"
      }
    ],
    'concept of seed technology': [
      {
        question: "Define Seed Technology and its significance.",
        answer: "Seed Technology is defined as the discipline of study related to seed production, maintenance, quality, and preservation. Its significance includes:<br><br>1. Development of superior crop varieties.<br>2. Improvement of genetic and physical characteristics of seeds.<br>3. Ensuring food security through quality seed supply."
      },
      {
        question: "What are the roles of improved seed according to Feistritzer (1975)?",
        answer: "The roles of improved seed include:<br><br>1. A carrier of new technologies.<br>2. A basic tool for secured food supply.<br>3. A means to secure crop yields in less favorable production areas.<br>4. A medium for rapid rehabilitation of agriculture in cases of natural disaster."
      },
      {
        question: "How does improved seed contribute to yield increases?",
        answer: "Improved seed contributes to yield increases by:<br><br>1. Enhancing the effects of traditional inputs.<br>2. Increasing yield levels significantly, as seen in various crops like cereals, potatoes, and sugar beet."
      },
      {
        question: "Explain the impact of high yielding varieties in Bangladesh.",
        answer: "The introduction of high yielding varieties in Bangladesh has led to:<br><br>1. Remarkable increases in food production.<br>2. A reduction in food imports despite rapid population growth."
      },
      {
        question: "What is the importance of seed technology in disaster situations?",
        answer: "In disaster situations, seed technology is crucial because:<br><br>1. It provides immediate access to improved seeds for farmers.<br>2. It helps in rapid rehabilitation of agriculture after floods or droughts."
      },
      {
        question: "What are the components of Seed Technology in a narrow sense?",
        answer: "In a narrow sense, Seed Technology comprises:<br><br>1. Techniques of seed production.<br>2. Seed processing.<br>3. Seed storage.<br>4. Seed testing and certification.<br>5. Seed marketing and distribution."
      },
      {
        question: "How does seed technology affect food security?",
        answer: "Seed technology affects food security by ensuring the availability of quality seeds, which leads to higher crop yields and better food supply management."
      },
      {
        question: "What is the relationship between seed technology and agricultural inputs?",
        answer: "The relationship is that improved seeds, when combined with other agricultural inputs, significantly increase yield levels and overall production."
      },
      {
        question: "Describe the concept of seed certification.",
        answer: "Seed certification is the process of verifying that seeds meet specific standards of quality and purity, ensuring that farmers receive high-quality seeds for planting."
      },
      {
        question: "What are the benefits of seed testing?",
        answer: "Seed testing provides benefits such as:<br><br>1. Assessing seed viability and germination rates.<br>2. Ensuring the genetic purity of seed varieties.<br>3. Helping farmers make informed decisions about seed selection."
      },
      {
        question: "What is the major goal of Seed Technology?",
        answer: "The major goal of Seed Technology is to increase agricultural production through the spread of good quality seeds of high yielding varieties."
      },
      {
        question: "What does rapid multiplication in Seed Technology refer to?",
        answer: "Rapid multiplication refers to the increase in agricultural production through the quickest possible spread of new varieties developed by plant breeders. It measures the efficiency and adequacy in the development of Seed Technology."
      },
      {
        question: "Why is timely supply important in Seed Technology?",
        answer: "Timely supply ensures that improved seeds of new varieties are available when needed, preventing disruption in farmers' planting schedules and allowing them to use good seeds for planting."
      },
      {
        question: "What is the significance of assured high quality of seeds?",
        answer: "Assured high quality of seeds is necessary to obtain the expected dividends from the use of improved varieties, ensuring that farmers achieve the desired crop yields."
      },
      {
        question: "Why should the price of high-quality seeds be reasonable?",
        answer: "The cost of high-quality seeds should be within reach of the average farmer to ensure accessibility and encourage the adoption of improved varieties."
      },
      {
        question: "What significant event occurred in 1816 related to seed legislation?",
        answer: "In 1816, the Seed Act was passed in Buru, Switzerland, marking an important step in seed regulation."
      },
      {
        question: "What was established in 1883 in the USA?",
        answer: "The American Seed Association (ASTA) was established in 1883, contributing to the development of seed standards and practices."
      },
      {
        question: "What does ISTA stand for and when was it established?",
        answer: "ISTA stands for the International Seed Testing Association, which was established in 1924 to promote seed testing standards globally."
      },
      {
        question: "What major agricultural movement started in the 1960s?",
        answer: "The Green Revolution started in the 1960s, particularly in developing countries, leading to significant increases in agricultural production."
      },
      {
        question: "What was the role of the OECD scheme established in 1958?",
        answer: "The OECD scheme, established in 1958, aimed to promote seed quality and facilitate international trade in seeds."
      },
      {
        question: "What significant event occurred in 1908 related to seed technology in Bangladesh?",
        answer: "In 1908, the Agricultural Research Institute was established in Dhaka, marking an attempt to improve seed varieties."
      },
      {
        question: "What happened in 1954 regarding seed multiplication in Bangladesh?",
        answer: "In 1954, seed multiplication farms were established in the public sector in 23 places over an area of 2200 hectares."
      },
      {
        question: "What was established in 1961 to undertake seed supply in East Pakistan (now Bangladesh)?",
        answer: "In 1961, the East Pakistan Agricultural Development Corporation was established with a clear mandate to undertake seed supply."
      },
      {
        question: "What major development occurred in 1974 in the seed sector?",
        answer: "In 1974, the National Seed Board and Seed Certification Agency were established to regulate and certify seed quality."
      },
      {
        question: "What was the significance of the Seeds Ordinance promulgated in 1977?",
        answer: "The Seeds Ordinance 1977 was promulgated to provide a legal framework for seed regulation and quality control in Bangladesh."
      },
      {
        question: "What was the impact of the National Seed Policy passed in 1993?",
        answer: "The National Seed Policy passed in 1993 encouraged the participation of private sectors and informal sectors in the seed supply system."
      },
      {
        question: "What was established in 1996 to enhance seed technology?",
        answer: "In 1996, a joint venture with a foreign company was established to improve seed technology and supply."
      },
      {
        question: "What are the key components of the seed legislation in Bangladesh?",
        answer: "Key components include the Seeds Ordinance 1977, the Seeds Policy 1993, the Seeds (Amendment) Act 1997, the Seed Rules 1998, and the Plant Variety Protection Act."
      },
      {
        question: "What was the first organized supply of wheat seed in Bangladesh?",
        answer: "In 1976, 576 tons of wheat seed were first supplied after production and processing in an organized way."
      },
      {
        question: "What significant changes occurred in the seed sector from 1976 to 1988?",
        answer: "From 1976 to 1988, there was an expansion of appropriate technology in rice, wheat, potato, pulses, oilseed crops, and vegetables."
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

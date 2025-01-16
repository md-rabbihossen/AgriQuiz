import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

function ChapterList() {
  const { courseName } = useParams()
  const navigate = useNavigate()

  // Define chapters for each course
  const courseChapters = {
    abot: [
      { id: 1, name: 'Plant Physiology' }
    ],
    agro: [
      { id: 1, name: 'Concept of Seed Technology' },
      { id: 2, name: 'Concept of Seed' }
    ],
    soil: [
      { id: 1, name: 'Soil Classification' },
      { id: 2, name: 'Land Evaluation' },
      { id: 3, name: 'SOIL TAXONOMY- A comprehensive System' },
      { id: 4, name: 'SOIL MOISTURE AND TEMPERATURE REGIMES' },
      { id: 5, name: 'Categories in Soil Taxonomy' }
    ],
    afes: [
      { id: 1, name: 'Introduction to Agroforestry' },
      { id: 2, name: 'Tree Crop Interaction_Nazmun Nahar' },
      { id: 3, name: 'Concept and Classification by Nasrin Sultana Mam' }
    ],
    hort: [
      { id: 1, name: 'Plant Propagation' }
    ],
    ento: [
      { id: 1, name: 'Mouth Parts_Mizan Sir' },
      { id: 2, name: 'Arthropoda_Shakhawat Sir' }
    ]
  }

  // Get chapters for the current course
  const chapters = courseChapters[courseName.toLowerCase()] || []

  return (
    <div className="chapter-page">
      <Navbar />
      <div className="chapter-container">
        <h2>{courseName.toUpperCase()} Chapters</h2>
        <div className="chapter-list">
          {chapters.map(chapter => (
            <button 
              key={chapter.id} 
              className="chapter-button"
              onClick={() => navigate(`/course/${courseName}/chapter/${encodeURIComponent(chapter.name)}`)}
            >
              {chapter.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChapterList 
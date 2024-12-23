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
      { id: 1, name: 'Concept of Seed' }
    ],
    soil: [
      { id: 2, name: 'Land Evaluation' }
    ],
    afes: [
      { id: 1, name: 'Introduction to Agroforestry' }
    ],
    hort: [
      { id: 1, name: 'Plant Propagation' }
    ],
    ento: [
      { id: 1, name: 'Insect Morphology' }
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
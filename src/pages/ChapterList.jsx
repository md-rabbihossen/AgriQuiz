import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

function ChapterList() {
  const { courseName } = useParams()
  const navigate = useNavigate()

  // Define chapters for each course
  const courseChapters = {
    abot: [
      { id: 1, name: 'Pollination' },
      { id: 2, name: 'Fertilization' },
      { id: 3, name: 'Cell Division' },
      { id: 4, name: 'Plant Anatomy' }
    ],
    agro: [
      { id: 1, name: 'Concept of Seed' },
      { id: 2, name: 'Seed Quality' },
      { id: 3, name: 'Germination' }
    ],
    soil: [
      { id: 1, name: 'Soil Organic Matter' },
      { id: 2, name: 'Land Evaluation' }
    ],
    afes: [
      { id: 1, name: 'Introduction to Agroforestry' }
    ],
    hort: [
      { id: 1, name: 'Plant Propagation' },
      { id: 2, name: 'Greenhouse Management' },
      { id: 3, name: 'Fruit Production' },
      { id: 4, name: 'Landscape Design' }
    ],
    ento: [
      { id: 1, name: 'Insect Morphology' },
      { id: 2, name: 'Pest Classification' },
      { id: 3, name: 'Beneficial Insects' },
      { id: 4, name: 'Integrated Pest Management' }
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
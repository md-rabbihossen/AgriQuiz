import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

function QuestionTypes() {
  const { courseName, chapterName } = useParams()
  const navigate = useNavigate()

  const questionTypes = [
    { id: 1, name: 'Question & Answer', path: 'qa' },
    { id: 2, name: 'MCQ', path: 'mcq' },
    { id: 3, name: 'Fill in the Blank', path: 'fill-blank' },
    { id: 4, name: 'True/False', path: 'true-false' }
  ]

  const handleTypeClick = (path) => {
    navigate(`/course/${courseName}/chapter/${chapterName}/${path}`)
  }

  return (
    <div className="question-types-page">
      <Navbar />
      <div className="question-types-container">
        <h2>Select Question Type</h2>
        <h3>{decodeURIComponent(chapterName)}</h3>
        <div className="question-types-grid">
          {questionTypes.map(type => (
            <button
              key={type.id}
              className="question-type-card"
              onClick={() => handleTypeClick(type.path)}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionTypes 
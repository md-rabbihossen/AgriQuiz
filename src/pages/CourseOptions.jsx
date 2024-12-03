import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from './Footer'

function CourseOptions() {
  const { courseName } = useParams()
  const navigate = useNavigate()

  return (
    <div className="resources-page">
      <Navbar />
      <section className="resources-section">
        <h2>{courseName.toUpperCase()} Resources</h2>
        <div className="course-options">
          <button 
            className="option-button"
            onClick={() => navigate(`/resources/${courseName}/theory`)}
          >
            Theory
          </button>
          <button 
            className="option-button"
            onClick={() => navigate(`/resources/${courseName}/practical`)}
          >
            Practical
          </button>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default CourseOptions 
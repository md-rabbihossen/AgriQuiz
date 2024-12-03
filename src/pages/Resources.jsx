import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from './Footer'

function Resources() {
  const navigate = useNavigate()
  
  const courses = [
    { id: 1, name: 'ABOT' },
    { id: 2, name: 'AGRO' },
    { id: 3, name: 'SOIL' },
    { id: 4, name: 'AFES' },
    { id: 5, name: 'ENTO' },
    { id: 6, name: 'HORT(ELECTIVE)' }
  ]

  const handleSyllabusDownload = () => {
    const link = document.createElement('a')
    link.href = '/files/L - 02 S - 02 Syllabus.pdf'
    link.download = 'L - 02 S - 02 Syllabus.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOldSheetClick = () => {
    window.open('https://drive.google.com/drive/u/0/folders/1M0-1K81fjA9AH7y8Dom0SEZw5-kM5ydt', '_blank')
  }

  return (
    <div className="resources-page">
      <Navbar />
      <section className="resources-section">
        <h2>Course Resources</h2>
        
        {/* Syllabus Download Button */}
        <div className="syllabus-container">
          <button 
            className="syllabus-button"
            onClick={handleSyllabusDownload}
          >
            Download Syllabus
          </button>
        </div>

        <div className="course-list">
          {courses.map(course => (
            <button 
              key={course.id}
              className="course-button"
              onClick={() => navigate(`/resources/${course.name.toLowerCase()}`)}
            >
              {course.name}
            </button>
          ))}
          <button 
            className="course-button old-sheet-button"
            onClick={handleOldSheetClick}
          >
            OLD SHEET
          </button>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Resources 
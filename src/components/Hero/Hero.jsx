import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()
  
  const courses = [
    { id: 1, name: 'ABOT' },
    { id: 2, name: 'AGRO' },
    { id: 3, name: 'SOIL' },
    { id: 4, name: 'AFES' },
    { id: 5, name: 'ENTO' }
  ]

  return (
    <section className="hero">
      <h2>Our Courses</h2>
      <div className="course-list">
        {courses.map(course => (
          <button 
            key={course.id}
            className="course-button"
            onClick={() => navigate(`/course/${course.name.toLowerCase()}`)}
          >
            {course.name}
          </button>
        ))}
      </div>
    </section>
  )
}

export default Hero 
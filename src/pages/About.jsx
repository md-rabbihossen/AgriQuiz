import Navbar from '../components/Navbar/Navbar'

function About() {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-container">
        <h1>About AgriQuiz</h1>
        
        <div className="about-content">
          <section className="mission-section">
            <h2>Our Mission</h2>
            <p>
              AgriQuiz was born from a simple idea during my time as an Agriculture University student. 
              Like many of my fellow students, I found myself looking for an effective way to test my 
              knowledge before exams. What started as a personal project to help myself and my friends 
              has grown into a platform that serves agriculture students across the university.
            </p>
          </section>

          <section className="features-section">
            <h2>What We Offer</h2>
            <ul>
              <li>Comprehensive question banks covering major agricultural subjects</li>
              <li>Multiple quiz formats: MCQ, True/False, Fill in the Blanks, and Q&A</li>
              <li>Chapter-wise organized content for focused learning</li>
              <li>Instant feedback and performance tracking</li>
              <li>User-friendly interface designed for students</li>
            </ul>
          </section>

          <section className="subjects-section">
            <h2>Covered Subjects</h2>
            <p>
              Our platform currently covers essential agricultural courses including Agricultural 
              Botany (ABOT), Agronomy (AGRO), Soil Science (SOIL), Agricultural and Food Engineering 
              Sciences (AFES), and Entomology (ENTO). Each subject is carefully structured into 
              chapters to align with university curriculum.
            </p>
          </section>

          <section className="story-section">
            <h2>Our Story</h2>
            <p>
              As a student of agriculture, I understand the challenges we face while preparing for 
              exams. Traditional study methods often leave us wondering about our preparation level. 
              AgriQuiz addresses this by providing a practical way to test and reinforce our 
              knowledge. The platform is continuously evolving, incorporating feedback from fellow 
              students to better serve our academic community.
            </p>
          </section>

          <section className="future-section">
            <h2>Looking Forward</h2>
            <p>
              We're committed to expanding our question bank, adding more subjects, and implementing 
              new features to enhance your learning experience. Your feedback and suggestions are 
              always welcome as we grow together in this academic journey.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About 
import Navbar from '../components/Navbar/Navbar'
import { FaEnvelope, FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa'

function Contact() {
  return (
    <div className="contact-page">
      <Navbar />
      <div className="contact-container">
        <h1>Get in Touch</h1>
        
        <div className="contact-content">
          <div className="contact-intro">
            <h2>Let's Connect!</h2>
            <p>
              Have questions about AgriQuiz? Want to contribute or suggest improvements? 
              I'd love to hear from you! Feel free to reach out through any of the following channels.
            </p>
          </div>

          <div className="contact-cards">
            <a 
              href="mailto:rabbihossenrabbi24@gmail.com" 
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope className="contact-icon" />
              <h3>Email</h3>
              <p>rabbihossenrabbi24@gmail.com</p>
            </a>

            <a 
              href="https://www.linkedin.com/in/md-rabbi-hossen-rabbi-b1bbb0326" 
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="contact-icon" />
              <h3>LinkedIn</h3>
              <p>MD Rabbi Hossen Rabbi</p>
            </a>

            <a 
              href="https://github.com/md-rabbihossen" 
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="contact-icon" />
              <h3>GitHub</h3>
              <p>@md-rabbihossen</p>
            </a>

            <a 
              href="https://www.facebook.com/mohammad.rahat.177570" 
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="contact-icon" />
              <h3>Facebook</h3>
              <p>Mohammad Rahat</p>
            </a>
          </div>

          <div className="contact-message">
            <p>
              I'm always looking to improve AgriQuiz and make it more helpful for agriculture students. 
              Your feedback and suggestions are valuable in making this platform better for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 
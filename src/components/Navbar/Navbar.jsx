import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="QuizLab Logo" className="logo-image" />
          <h1>AgriQuiz</h1>
        </Link>
      </div>
      
      <div 
        className={`menu-icon ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link to="/resources" onClick={() => setIsMenuOpen(false)}>Resources</Link></li>
        <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
        <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
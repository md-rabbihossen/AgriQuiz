import {
  FaCopyright,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

function CustomFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-section">
            <h3>About</h3>
            <p className="footer-about">
              AgriQuiz is an interactive platform designed to help agriculture
              students prepare for their exams effectively. Created by students,
              for students.
            </p>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul className="footer-contact">
              <li>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:rabbihossenrabbi24@gmail.com">
                  rabbihossenrabbi24@gmail.com
                </a>
              </li>
              <li>
                <FaGithub className="contact-icon" />
                <a
                  href="https://github.com/md-rabbihossen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @md-rabbihossen
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <a
            href="https://github.com/md-rabbihossen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/md-rabbi-hossen-rabbi-b1bbb0326"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.facebook.com/mohammad.rahat.177570"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a href="mailto:rabbihossenrabbi24@gmail.com">
            <FaEnvelope />
          </a>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="copyright text-center">
            <div className="copyright-text">
              <FaCopyright className="copyright-icon" />
              <span>{currentYear} AgriQuiz. All rights reserved.</span>
            </div>
            <div>Made by Rabbi Hossen</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CustomFooter;

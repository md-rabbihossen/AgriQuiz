import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from './Footer'

function ResourceFiles() {
  const { courseName, resourceType } = useParams()

  // Resource files organized by course and type
  const resourceFiles = {
    abot: {
      theory: [
        { 
          name: 'Chapter 1: Introduction', 
          url: '/files/abot/theory/chapter1.pdf' 
        },
        { 
          name: 'Chapter 2: Plant Anatomy', 
          url: '/files/abot/theory/chapter2.pdf' 
        }
      ],
      practical: [
        { 
          name: 'Lab Manual', 
          url: '/files/abot/practical/lab-manual.pdf' 
        },
        { 
          name: 'Practical Guide', 
          url: '/files/abot/practical/guide.pdf' 
        }
      ]
    },
    agro: {
      theory: [
        { 
          name: 'Course Notes', 
          url: '/files/agro/theory/notes.pdf' 
        }
      ],
      practical: [
        { 
          name: 'Field Work Guide', 
          url: '/files/agro/practical/fieldwork.pdf' 
        }
      ]
    }
    // Add more courses...
  }

  const files = resourceFiles[courseName.toLowerCase()]?.[resourceType] || []

  const handleDownload = (url, fileName) => {
    try {
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download file. Please try again.')
    }
  }

  return (
    <div className="resources-page">
      <Navbar />
      <section className="resources-section">
        <h2>{courseName.toUpperCase()} - {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}</h2>
        <div className="resources-list">
          {files.length > 0 ? (
            files.map((file, index) => (
              <button
                key={index}
                className="resource-button"
                onClick={() => handleDownload(file.url, file.name)}
              >
                {file.name}
              </button>
            ))
          ) : (
            <p className="no-resources">No {resourceType} resources available for this course yet.</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default ResourceFiles 
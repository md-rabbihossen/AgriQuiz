import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ChapterList from './pages/ChapterList'
import QuestionTypes from './pages/QuestionTypes'
import QuestionAnswer from './pages/QuestionAnswer'
import MCQQuestion from './pages/MCQQuestion'
import FillBlank from './pages/FillBlank'
import TrueFalse from './pages/TrueFalse'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:courseName" element={<ChapterList />} />
          <Route path="/course/:courseName/chapter/:chapterName" element={<QuestionTypes />} />
          <Route path="/course/:courseName/chapter/:chapterName/qa" element={<QuestionAnswer />} />
          <Route path="/course/:courseName/chapter/:chapterName/mcq" element={<MCQQuestion />} />
          <Route path="/course/:courseName/chapter/:chapterName/fill-blank" element={<FillBlank />} />
          <Route path="/course/:courseName/chapter/:chapterName/true-false" element={<TrueFalse />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

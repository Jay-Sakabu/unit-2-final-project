import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './Pages/About'
import Budget from './Pages/Budget'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './Pages/Home'
import ViewBudget from './Pages/ViewBudget'


function App() {
  const [count, setCount] = useState(0)


  return (
    <Router>
      <div className='app-container'>
        <Header />
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/viewBudgets" element={<ViewBudget />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>


      </div>
      <Footer />
    </Router>
  )
}

export default App

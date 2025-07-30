import './App.css'
import { useState, useEffect } from 'react'
import Header from './components/universal-components/Header'
import Footer from './components/universal-components/Footer'
import About from './Pages/About'
import BudgetForm from './Pages/CreateBudgetPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './Pages/Home'
import ViewBudget from './Pages/ViewBudget'

// https://dev.to/abbeyperini/toggle-dark-mode-in-react-28c9
function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme)
      return storedTheme;
    return window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light';
  });

  //TODO: Change document so we're not directly grabbing from DOM, tutorial has steps on how to do this
  // on theme change, update html
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
  return (
    <Router>
      <div className='app-container'>
        <Header onToggleTheme={toggleTheme} currentTheme={theme} />
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/budget" element={<BudgetForm />} />
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

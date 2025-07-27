import './App.css'
import Header from './components/universal-components/Header'
import Footer from './components/universal-components/Footer'
import About from './Pages/About'
import BudgetForm from './Pages/CreateBudgetPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './Pages/Home'
import ViewBudget from './Pages/ViewBudget'

//TODO: Change some naming conventions, ViewBudget is more of a financial overview with a budget 'feature'
//looking at some of the names is a headache

function App() {

  return (
    <Router>
      <div className='app-container'>
        <Header />
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

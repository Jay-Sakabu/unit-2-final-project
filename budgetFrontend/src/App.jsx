import './App.css';
import { useState, useEffect, useContext } from 'react';
import Header from './components/universal-components/Header';
import Footer from './components/universal-components/Footer';
import About from './Pages/About';
import BudgetForm from './Pages/CreateBudgetPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './Pages/Home';
import ViewBudget from './Pages/ViewBudget';
import AuthForm from './components/forms/AuthForm';
import { AuthContext, AuthProvider } from './components/auth-context/AuthContext';

// https://dev.to/abbeyperini/toggle-dark-mode-in-react-28c9
function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme)
      return storedTheme;
    return window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light';
  });

  // Sync the HTML data-theme attribute & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));


  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ user, logout }) => (
            <>
              {!user
                ? <AuthForm />
                : (
                  <div className="app-container">
                    <Header
                      onToggleTheme={toggleTheme}
                      currentTheme={theme}
                      onLogout={logout}
                    />
                    <main className="main-content">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/budget" element={<BudgetForm />} />
                        <Route path="/viewBudgets" element={<ViewBudget />} />
                        <Route path="/about" element={<About />} />
                      </Routes>
                    </main>
                  </div>
                )
              }
              <Footer />
            </>
          )}
        </AuthContext.Consumer>
      </Router>
    </AuthProvider>
  );
}

export default App

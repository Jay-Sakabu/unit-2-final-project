import { Link, NavLink, useNavigate } from 'react-router';
import { useState, useContext } from 'react';
import ThemeToggle from './ThemeToggle';
import { AuthContext } from '../auth-context/AuthContext';
const Header = ({ onToggleTheme, currentTheme, onLogout }) => {
    const { user } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        navigate("/");
    }
    return (
        <div className='side-navbar'>
            <nav>
                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>
                <ThemeToggle
                    currentTheme={currentTheme}
                    onToggle={() =>
                        onToggleTheme(theme => (theme === 'dark' ? 'light' : 'dark'))
                    }
                />
                <h4>Welcome, {user.name}!</h4>
                <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                    {/* Check if link is active, if so: give link active-link CSS class */}
                    <NavLink className={({ isActive }) => isActive ? "active-link" : "link-styling"} to="/">Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active-link" : "link-styling"} to="/budget">Create Budget</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active-link" : "link-styling"} to="/ViewBudgets">Financial Info</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active-link" : "link-styling"} to="/about">About</NavLink>

                    <button className="link-styling" onClick={handleLogoutClick} id='logout-button'>
                        Logout
                    </button></div>
            </nav>
        </div>
    );
};

export default Header;
import { Link, NavLink } from 'react-router';
import { useState } from 'react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
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
                <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                    {/* Check if link is active, if so: give link active-link CSS class */}
                    <NavLink className={({ isActive }) => isActive ? "active-link" : "link-styling"} to="/">Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active-link" : "link-styling"} to="/budget">Create Budget</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active-link" : "link-styling"} to="/ViewBudgets">Financial Info</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active-link" : "link-styling"} to="/about">About</NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Header;
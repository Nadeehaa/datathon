import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/navbar.css';

const NavBar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/" onClick={closeMenu}>EcoAyur</Link>
            </div>
            
            <button 
                className={`menu-icon ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <Link 
                    to="/" 
                    className={currentPath === '/' ? 'active' : ''}
                    onClick={closeMenu}
                >
                    Home
                </Link>
                <Link 
                    to="/benefits" 
                    className={currentPath === '/benefits' ? 'active' : ''}
                    onClick={closeMenu}
                >
                    Benefits
                </Link>
                <Link 
                    to="/farmers" 
                    className={currentPath === '/farmers' ? 'active' : ''}
                    onClick={closeMenu}
                >
                    Farmers
                </Link>
                <Link 
                    to="/blog" 
                    className={currentPath.includes('/blog') ? 'active' : ''}
                    onClick={closeMenu}
                >
                    Blog
                </Link>
                <Link 
                    to="/health" 
                    className={currentPath === '/health' ? 'active' : ''}
                    onClick={closeMenu}
                >
                    Health
                </Link>
            </div>
        </nav>
    );
};

export default NavBar; 
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/navbar.css';

const NavBar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">EcoAyur</Link>
            </div>
            <div className="nav-links">
                <Link to="/" className={currentPath === '/' ? 'active' : ''}>
                    Home
                </Link>
                <Link to="/benefits" className={currentPath === '/benefits' ? 'active' : ''}>
                    Benefits
                </Link>
                <Link to="/farmers" className={currentPath === '/farmers' ? 'active' : ''}>
                    Farmers
                </Link>
                <Link to="/blog" className={currentPath.includes('/blog') ? 'active' : ''}>
                    Blog
                </Link>
                <Link to="/health" className={currentPath === '/health' ? 'active' : ''}>
                    Health
                </Link>
            </div>
        </nav>
    );
};

export default NavBar; 
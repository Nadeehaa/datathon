import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/benefits">Benefits</Link></li>
                <li><Link to="/farmers">Farmers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/health">Health</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar; 
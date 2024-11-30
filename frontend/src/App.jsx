import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Benefits from './components/Benefits';
import Farmers from './components/Farmers';
import Blog from './components/Blog';
import Health from './components/Health';
import './components/styles/main.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <NavBar />
                <div className="content-wrapper">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/benefits" element={<Benefits />} />
                        <Route path="/farmers" element={<Farmers />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/health" element={<Health />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

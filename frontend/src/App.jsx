import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Routes, 
    createRoutesFromElements 
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Benefits from './components/Benefits';
import Farmers from './components/Farmers';
import Blog from './components/Blog';
import HerbDetail from './components/HerbDetail';
import Health from './components/Health';
import TestConnection from './components/TestConnection';
import './components/styles/main.css';

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="app">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/benefits" element={<Benefits />} />
                    <Route path="/farmers" element={<Farmers />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<HerbDetail />} />
                    <Route path="/health" element={<Health />} />
                    <Route path="/test-connection" element={<TestConnection />} />
                </Routes>
                <footer className="footer">
                    <div className="footer-content">
                        <p className="footer-text">
                            Made for a 24-hour datathon, the first ever in Telangana State, named 'DATANYX 24'
                        </p>
                        <div className="linkedin-links">
                            <a 
                                href="https://www.linkedin.com/in/haniya-konain-210882251/" 
                                className="linkedin-link" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-linkedin"></i>
                                <span>Developed by Haniya Konain</span>
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/nadeeha-mapa-shoukat-9a834a175/" 
                                className="linkedin-link" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-linkedin"></i>
                                <span>Designed by Nadeeha Mapa Shoukat</span>
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/fatima-syed-764b49249/" 
                                className="linkedin-link" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-linkedin"></i>
                                <span>Idea by Syeda Fatima</span>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App; 
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
            </div>
        </Router>
    );
}

export default App; 
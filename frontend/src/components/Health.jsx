import React, { useState } from 'react';
import axios from 'axios';
import './styles/health.css';

const Health = () => {
    const [location, setLocation] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [searchResults, setPractitioners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const specialties = [
        { id: 'general_physician', name: 'General Physician' },
        { id: 'ayurvedic', name: 'Ayurvedic Doctor' },
        { id: 'homeopathy', name: 'Homeopathy Doctor' },
        { id: 'cardiologist', name: 'Cardiologist' },
        { id: 'dermatologist', name: 'Dermatologist' },
        { id: 'pediatrician', name: 'Pediatrician' },
        { id: 'orthopedic', name: 'Orthopedic' },
        { id: 'neurologist', name: 'Neurologist' },
        { id: 'dentist', name: 'Dentist' }
    ];

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Construct a more specific medical search query
            const searchQuery = specialty 
                ? `${specialty} doctor hospital clinic in ${location}`
                : `medical hospital clinic in ${location}`;

            const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
                params: {
                    query: searchQuery,
                    type: 'health', // Restricts to health-related places
                    key: process.env.REACT_APP_GOOGLE_PLACES_API_KEY
                }
            });

            const results = response.data.results.map(place => ({
                id: place.place_id,
                name: place.name,
                type: place.types.includes('hospital') ? 'Hospital' : 'Clinic',
                location: place.formatted_address,
                rating: place.rating || 'N/A',
                totalRatings: place.user_ratings_total || 0,
                openNow: place.opening_hours?.open_now,
                photoUrl: place.photos?.[0]?.photo_reference,
                placeId: place.place_id
            }));

            setPractitioners(results);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to fetch medical facilities. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="health-container">
            <div className="health-header">
                <h1>Healthcare Services</h1>
                <p>Find doctors, hospitals, and medical facilities near you</p>
            </div>

            {/* Search Section */}
            <div className="search-section">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="form-group">
                        <label>Location</label>
                        <input 
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter your location"
                            className="search-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Medical Specialty</label>
                        <select 
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="search-select"
                        >
                            <option value="">All Medical Services</option>
                            {specialties.map(spec => (
                                <option key={spec.id} value={spec.id}>
                                    {spec.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="search-button" disabled={loading}>
                        {loading ? 'Searching...' : 'Find Medical Services'}
                    </button>
                </form>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Results Grid */}
            <div className="practitioners-grid">
                {searchResults.map(facility => (
                    <div key={facility.id} className="practitioner-card">
                        <div className="practitioner-header">
                            <h3>{facility.name}</h3>
                            <div className="rating-container">
                                <span className="rating">★ {facility.rating}</span>
                                <span className="rating-count">({facility.totalRatings} reviews)</span>
                            </div>
                        </div>
                        
                        <div className="practitioner-info">
                            <p><strong>Type:</strong> {facility.type}</p>
                            <p><strong>Location:</strong> {facility.location}</p>
                            <p><strong>Status:</strong> 
                                <span className={facility.openNow ? 'open' : 'closed'}>
                                    {facility.openNow ? ' Open Now' : ' Closed'}
                                </span>
                            </p>
                        </div>

                        <div className="practitioner-actions">
                            <button className="book-btn">Book Appointment</button>
                            <button 
                                className="directions-btn"
                                onClick={() => window.open(`https://www.google.com/maps/place/?q=place_id:${facility.placeId}`, '_blank')}
                            >
                                Get Directions
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {searchResults.length === 0 && !loading && !error && (
                <div className="empty-state">
                    <p>Enter a location to find medical services near you</p>
                </div>
            )}
        </div>
    );
};

export default Health;
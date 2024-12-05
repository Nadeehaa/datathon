import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/blog.css';

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = {
        all: 'All Herbs',
        digestive: 'Digestive Health',
        respiratory: 'Respiratory Health',
        cognitive: 'Brain & Memory',
        heart: 'Heart Health',
        immunity: 'Immunity',
        womens: "Women's Health"
    };

    const herbList = {
        amla: {
            name: "Amla (Indian Gooseberry)",
            shortDescription: "A powerful antioxidant fruit and one of the richest natural sources of Vitamin C. Used in Ayurvedic medicine for thousands of years.",
            categories: ['immunity', 'digestive']
        },
        arjuna: {
            name: "Arjuna",
            shortDescription: "A cardioprotective herb that has been used in Ayurveda for centuries to support heart health and maintain healthy blood pressure.",
            categories: ['heart']
        },
        ashwagandha: {
            name: "Ashwagandha",
            shortDescription: "Known as Indian Ginseng, this adaptogenic herb helps reduce stress and anxiety while boosting energy and concentration.",
            categories: ['immunity', 'cognitive']
        },
        bala: {
            name: "Bala",
            shortDescription: "A rejuvenating herb that enhances strength and vitality, particularly known for supporting the nervous system and muscle tissues.",
            categories: ['immunity', 'womens']
        },
        bhringaraj: {
            name: "Bhringaraj",
            shortDescription: "Known as the 'King of Hair', it's primarily used for hair care and liver health, while also supporting mental clarity.",
            categories: ['cognitive', 'digestive']
        },
        bibhitaki: {
            name: "Bibhitaki",
            shortDescription: "One of the three fruits in Triphala, known for its detoxifying properties and ability to support respiratory health.",
            categories: ['respiratory', 'digestive']
        },
        brahmi: {
            name: "Brahmi",
            shortDescription: "A powerful brain tonic known for enhancing memory, concentration, and cognitive function.",
            categories: ['cognitive']
        },
        cardamom: {
            name: "Cardamom (Ela)",
            shortDescription: "A sweet, aromatic spice valued for its digestive benefits and respiratory support properties.",
            categories: ['digestive', 'respiratory']
        },
        chitrak: {
            name: "Chitrak",
            shortDescription: "A powerful digestive and metabolic enhancer, known for its ability to support healthy digestion and metabolism.",
            categories: ['digestive']
        },
        cinnamon: {
            name: "Cinnamon (Tvak)",
            shortDescription: "A warming spice that helps balance blood sugar and support metabolic health.",
            categories: ['digestive', 'immunity']
        },
        ginger: {
            name: "Ginger",
            shortDescription: "A versatile herb known for its digestive benefits and anti-inflammatory properties.",
            categories: ['digestive', 'immunity']
        },
        guduchi: {
            name: "Guduchi",
            shortDescription: "Known as the 'Nectar of Life', this powerful immunomodulator supports overall health and vitality.",
            categories: ['immunity']
        },
        haritaki: {
            name: "Haritaki",
            shortDescription: "Known as the 'King of Medicines' in Tibet, it cleanses and rejuvenates the body while promoting longevity.",
            categories: ['digestive', 'immunity']
        },
        jatamansi: {
            name: "Jatamansi",
            shortDescription: "A precious Himalayan herb valued for its calming properties and ability to promote quality sleep.",
            categories: ['cognitive']
        },
        kantakari: {
            name: "Kantakari",
            shortDescription: "A powerful herb for respiratory health, particularly effective in managing respiratory conditions.",
            categories: ['respiratory']
        },
        kapikacchu: {
            name: "Kapikacchu",
            shortDescription: "A natural source of L-dopa, known for supporting nervous system and reproductive health.",
            categories: ['cognitive', 'womens']
        },
        kutki: {
            name: "Kutki",
            shortDescription: "A highly valued herb known for its liver-protective and immune-modulating properties.",
            categories: ['immunity', 'digestive']
        },
        licorice: {
            name: "Licorice (Yashtimadhu)",
            shortDescription: "A widely used herb valued for harmonizing other herbs and supporting respiratory health.",
            categories: ['respiratory', 'digestive']
        },
        manjistha: {
            name: "Manjistha",
            shortDescription: "Known as the 'blood purifier', it supports lymphatic drainage and promotes healthy skin.",
            categories: ['immunity']
        },
        moringa: {
            name: "Moringa",
            shortDescription: "The 'Miracle Tree', one of the most nutrient-dense plants on Earth.",
            categories: ['immunity', 'womens']
        },
        nagkesar: {
            name: "Nagkesar",
            shortDescription: "A precious herb known for supporting reproductive health and managing pain.",
            categories: ['womens']
        },
        neem: {
            name: "Neem",
            shortDescription: "Known as the 'Village Pharmacy', valued for its purifying and cleansing properties.",
            categories: ['immunity']
        },
        peppermint: {
            name: "Peppermint",
            shortDescription: "A refreshing herb known for its cooling properties and digestive benefits.",
            categories: ['digestive', 'respiratory']
        },
        pippali: {
            name: "Pippali (Long Pepper)",
            shortDescription: "A powerful digestive and respiratory tonic that enhances the bioavailability of other herbs.",
            categories: ['digestive', 'respiratory']
        },
        punarnava: {
            name: "Punarnava",
            shortDescription: "Known as 'one that renews the body', supports kidney function and fluid balance.",
            categories: ['immunity']
        },
        pushkarmool: {
            name: "Pushkarmool",
            shortDescription: "Valued for its effectiveness in respiratory conditions and supporting healthy breathing.",
            categories: ['respiratory']
        },
        rasna: {
            name: "Rasna",
            shortDescription: "A powerful anti-inflammatory herb effective in managing joint pain and respiratory conditions.",
            categories: ['respiratory']
        },
        shatavari: {
            name: "Shatavari",
            shortDescription: "Known as the 'Queen of Herbs', primarily supports women's health throughout their lifecycle.",
            categories: ['womens', 'immunity']
        },
        triphala: {
            name: "Triphala",
            shortDescription: "A traditional formulation of three fruits, renowned for its gentle detoxifying properties.",
            categories: ['digestive', 'immunity']
        },
        tulsi: {
            name: "Tulsi (Holy Basil)",
            shortDescription: "The 'Queen of Herbs', revered for its adaptogenic properties and respiratory support.",
            categories: ['respiratory', 'immunity']
        },
        vacha: {
            name: "Vacha",
            shortDescription: "A powerful herb known for enhancing memory and cognitive function.",
            categories: ['cognitive']
        },
        sariva: {
            name: "Sariva (Indian Sarsaparilla)",
            shortDescription: "A cooling herb known for its blood-purifying and skin-supporting properties. Particularly valued for maintaining healthy skin and supporting detoxification.",
            categories: ['immunity', 'womens']
        },
        sarpagandha: {
            name: "Sarpagandha",
            shortDescription: "A powerful herb known for its ability to support cardiovascular health and promote relaxation. Particularly valued for its calming properties.",
            categories: ['heart', 'cognitive']
        },
        shankhpushpi: {
            name: "Shankhpushpi",
            shortDescription: "A brain tonic herb known for enhancing memory, concentration, and overall cognitive function. Particularly valued for mental health support.",
            categories: ['cognitive']
        },
        turmeric: {
            name: "Turmeric",
            shortDescription: "A golden spice revered for its anti-inflammatory and antioxidant properties. Used traditionally for joint health and immune support.",
            categories: ['immunity', 'digestive']
        },
        vidari: {
            name: "Vidari",
            shortDescription: "A rejuvenating herb particularly beneficial for women's health and vitality. Known for its nourishing and strengthening properties.",
            categories: ['womens', 'immunity']
        }
    };

    const filteredHerbs = Object.entries(herbList).filter(([id, herb]) => {
        const matchesSearch = herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            herb.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || herb.categories.includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="blog-container">
            <h1 className="blog-title">Explore Medicinal Herbs</h1>
            
            <div className="filter-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search herbs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="category-filters">
                    {Object.entries(categories).map(([key, label]) => (
                        <button
                            key={key}
                            className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="herb-grid">
                {filteredHerbs.map(([id, herb]) => (
                    <div key={id} className="herb-card">
                        <div className="herb-card-image">
                            <img 
                                src={`/herbs/${id}.jpg`} 
                                alt={herb.name}
                                onError={(e) => {
                                    e.target.src = '/herbs/placeholder.jpg';
                                    e.target.onerror = null;
                                }}
                            />
                        </div>
                        <div className="herb-card-content">
                            <h2>{herb.name}</h2>
                            <p>{herb.shortDescription}</p>
                            <Link to={`/blog/${id}`} className="read-more-btn">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
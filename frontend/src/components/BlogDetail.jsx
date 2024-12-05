import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/blogDetail.css';

const BlogDetail = () => {
    const { herbId } = useParams();
    
    const herbDetails = {
        amla: {
            name: "Amla",
            hindi: "आंवला (Amla)",
            telugu: "ఉసిరి (Usiri)",
            description: "Amla, or Indian Gooseberry, is one of the most important herbs in Ayurvedic medicine. It's renowned for having the highest natural concentration of Vitamin C among all fruits.",
            advantages: [
                "Highest natural source of Vitamin C",
                "Powerful antioxidant properties",
                "Supports immune system",
                "Promotes healthy digestion",
                "Benefits hair and skin health"
            ],
            disadvantages: [
                "May interact with diabetes medications",
                "Can cause acid reflux in some people",
                "May lower blood sugar levels",
                "Not recommended during pregnancy in large amounts"
            ],
            usage: "Can be consumed fresh, dried, as juice, powder, or in various Ayurvedic formulations. Often used in hair oils and skincare products.",
            dosage: "2-3 grams of powder daily or as directed by an Ayurvedic practitioner.",
            researchStudies: "Multiple studies have shown its effectiveness in...",
            traditionalUse: "In traditional Ayurveda, Amla has been used for..."
        },
        // ... Add detailed information for all herbs
    };

    const herb = herbDetails[herbId];

    if (!herb) {
        return <div>Herb not found</div>;
    }

    return (
        <div className="blog-detail-container">
            <Link to="/blog" className="back-button">← Back to Herbs</Link>
            
            <article className="herb-article">
                <header>
                    <h1>{herb.name}</h1>
                    <div className="herb-names">
                        <span className="hindi-name">{herb.hindi}</span>
                        <span className="telugu-name">{herb.telugu}</span>
                    </div>
                </header>

                <section className="description">
                    <h2>Description</h2>
                    <p>{herb.description}</p>
                </section>

                <section className="advantages">
                    <h2>Benefits</h2>
                    <ul>
                        {herb.advantages.map((advantage, index) => (
                            <li key={index}>{advantage}</li>
                        ))}
                    </ul>
                </section>

                <section className="disadvantages">
                    <h2>Precautions</h2>
                    <ul>
                        {herb.disadvantages.map((disadvantage, index) => (
                            <li key={index}>{disadvantage}</li>
                        ))}
                    </ul>
                </section>

                <section className="usage">
                    <h2>How to Use</h2>
                    <p>{herb.usage}</p>
                    <h3>Recommended Dosage</h3>
                    <p>{herb.dosage}</p>
                </section>

                <section className="research">
                    <h2>Research Studies</h2>
                    <p>{herb.researchStudies}</p>
                </section>

                <section className="traditional">
                    <h2>Traditional Use</h2>
                    <p>{herb.traditionalUse}</p>
                </section>
            </article>
        </div>
    );
};

export default BlogDetail; 
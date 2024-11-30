import React, { useState, useEffect } from 'react';

const HerbImage = ({ herbName, altText }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const image = await import(`../assets/herbs/${herbName.toLowerCase()}.jpg`);
                setImageSrc(image.default);
            } catch (err) {
                console.error(`Error loading image for ${herbName}:`, err);
                setError(true);
            }
        };

        loadImage();
    }, [herbName]);

    if (error) {
        return (
            <div className="herb-image placeholder">
                <img src="/placeholder.jpg" alt={altText} />
            </div>
        );
    }

    return (
        <div className="herb-image">
            {imageSrc ? (
                <img 
                    src={imageSrc} 
                    alt={altText}
                    onError={() => setError(true)}
                />
            ) : (
                <div className="loading-placeholder">Loading...</div>
            )}
        </div>
    );
};

export default HerbImage; 
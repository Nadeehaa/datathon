import React from 'react';
import './styles/benefits.css';
import images from '../images';

const Benefits = () => {
    const herbBenefits = {
        amla: {
            name: "Amla",
            hindi: "आंवला (Amla)",
            telugu: "ఉసిరి (Usiri)",
            image: images.amla,
            benefits: [
                "Rich in Vitamin C",
                "Boosts immunity",
                "Improves digestion",
                "Enhances hair health",
                "Supports eye health"
            ]
        },
        arjuna: {
            name: "Arjuna",
            hindi: "अर्जुन (Arjun)",
            telugu: "మద్ది చెట్టు (Maddi Chettu)",
            image: images.arjuna,
            benefits: [
                "Supports heart health",
                "Maintains healthy blood pressure",
                "Strengthens cardiac muscles",
                "Natural antioxidant",
                "Helps in wound healing"
            ]
        },
        ashwagandha: {
            name: "Ashwagandha",
            hindi: "अश्वगंधा (Ashwagandha)",
            telugu: "అశ్వగంధ (Ashwagandha)",
            image: images.ashwagandha,
            benefits: [
                "Reduces stress and anxiety",
                "Improves sleep quality",
                "Boosts immunity",
                "Enhances strength",
                "Supports cognitive function"
            ]
        },
        bala: {
            name: "Bala",
            hindi: "बला (Bala)",
            telugu: "బల (Bala)",
            image: images.bala,
            benefits: [
                "Increases strength",
                "Supports nervous system",
                "Improves muscle health",
                "Boosts immunity",
                "Enhances vitality"
            ]
        },
        bhringaraj: {
            name: "Bhringaraj",
            hindi: "भृंगराज (Bhringraj)",
            telugu: "గుంటగలగర (Guntagalagara)",
            image: images.bhringaraj,
            benefits: [
                "Promotes hair growth",
                "Supports liver health",
                "Improves memory",
                "Enhances eye health",
                "Calms the mind"
            ]
        },
        bibhitaki: {
            name: "Bibhitaki",
            hindi: "बहेड़ा (Baheda)",
            telugu: "తాని కాయ (Tani Kaya)",
            image: images.bibhitaki,
            benefits: [
                "Supports respiratory health",
                "Improves voice quality",
                "Aids digestion",
                "Promotes eye health",
                "Natural detoxifier"
            ]
        },
        brahmi: {
            name: "Brahmi",
            hindi: "ब्राह्मी (Brahmi)",
            telugu: "బ్రాహ్మి (Brahmi)",
            image: images.brahmi,
            benefits: [
                "Enhances memory",
                "Improves concentration",
                "Reduces anxiety",
                "Supports brain function",
                "Promotes mental clarity"
            ]
        },
        cardamom: {
            name: "Cardamom",
            hindi: "इलायची (Elaichi)",
            telugu: "ఏలకులు (Yelakulu)",
            image: images.cardamom,
            benefits: [
                "Aids digestion",
                "Freshens breath",
                "Supports heart health",
                "Reduces nausea",
                "Balances blood sugar"
            ]
        },
        chitrak: {
            name: "Chitrak",
            hindi: "चित्रक (Chitrak)",
            telugu: "చిత్రమూలం (Chitramoolam)",
            image: images.chitrak,
            benefits: [
                "Improves metabolism",
                "Enhances digestion",
                "Supports weight management",
                "Anti-inflammatory properties",
                "Detoxifies body"
            ]
        },
        cinnamon: {
            name: "Cinnamon",
            hindi: "दालचीनी (Dalchini)",
            telugu: "దాల్చిన చెక్క (Dalchina Chekka)",
            image: images.cinnamon,
            benefits: [
                "Regulates blood sugar",
                "Anti-inflammatory",
                "Supports heart health",
                "Improves brain function",
                "Natural antioxidant"
            ]
        },
        ginger: {
            name: "Ginger",
            hindi: "अदरक (Adrak)",
            telugu: "అల్లం (Allam)",
            image: images.ginger,
            benefits: [
                "Natural digestive aid",
                "Anti-inflammatory properties",
                "Reduces nausea",
                "Boosts immune system",
                "Improves circulation"
            ]
        },
        guduchi: {
            name: "Guduchi",
            hindi: "गिलोय (Giloy)",
            telugu: "తిప్పతీగ (Tippateega)",
            image: images.guduchi,
            benefits: [
                "Boosts immunity",
                "Reduces fever",
                "Supports liver function",
                "Anti-inflammatory",
                "Stress reliever"
            ]
        },
        haritaki: {
            name: "Haritaki",
            hindi: "हरड़ (Harad)",
            telugu: "కరక్కాయ (Karakkaya)",
            image: images.haritaki,
            benefits: [
                "Improves digestion",
                "Natural detoxifier",
                "Enhances brain function",
                "Supports eye health",
                "Promotes longevity"
            ]
        },
        jatamansi: {
            name: "Jatamansi",
            hindi: "जटामांसी (Jatamansi)",
            telugu: "జటామాంసి (Jatamansi)",
            image: images.jatamansi,
            benefits: [
                "Promotes mental calmness",
                "Improves sleep quality",
                "Reduces stress",
                "Enhances memory",
                "Balances emotions"
            ]
        },
        kantakari: {
            name: "Kantakari",
            hindi: "कंटकारी (Kantakari)",
            telugu: "నేలములక (Nelamulaka)",
            image: images.kantakari,
            benefits: [
                "Supports respiratory health",
                "Relieves cough",
                "Aids digestion",
                "Anti-inflammatory",
                "Boosts immunity"
            ]
        },
        kapikacchu: {
            name: "Kapikacchu",
            hindi: "कपिकच्छु (Kapikacchu)",
            telugu: "దూర్లభ (Doorlabha)",
            image: images.kapikacchu,
            benefits: [
                "Supports nervous system",
                "Improves fertility",
                "Enhances muscle strength",
                "Boosts mental focus",
                "Increases energy"
            ]
        },
        kutki: {
            name: "Kutki",
            hindi: "कुटकी (Kutki)",
            telugu: "కుట్కి (Kutki)",
            image: images.kutki,
            benefits: [
                "Supports liver health",
                "Aids digestion",
                "Boosts immunity",
                "Anti-inflammatory",
                "Helps in skin disorders"
            ]
        },
        yashtimadhu: {
            name: "Licorice",
            hindi: "मुलेठी (Mulethi)",
            telugu: "అతిమధురం (Athimaduram)",
            image: images.yashtimadhu,
            benefits: [
                "Supports respiratory health",
                "Soothes digestive system",
                "Improves voice quality",
                "Boosts immunity",
                "Anti-inflammatory"
            ]
        },
        manjistha: {
            name: "Manjistha",
            hindi: "मंजिष्ठा (Manjistha)",
            telugu: "మంజిష్ట (Manjishta)",
            image: images.manjistha,
            benefits: [
                "Blood purifier",
                "Improves skin health",
                "Supports lymphatic system",
                "Anti-inflammatory",
                "Promotes healing"
            ]
        },
        moringa: {
            name: "Moringa",
            hindi: "मोरिंगा (Moringa)",
            telugu: "మునగ (Munaga)",
            image: images.moringa,
            benefits: [
                "Rich in nutrients",
                "Powerful antioxidant",
                "Anti-inflammatory",
                "Supports brain health",
                "Protects liver"
            ]
        },
        nagkesar: {
            name: "Nagkesar",
            hindi: "नागकेसर (Nagkesar)",
            telugu: "నాగకేసరం (Nagakesaram)",
            image: images.nagkesar,
            benefits: [
                "Supports skin health",
                "Aids digestion",
                "Anti-inflammatory",
                "Relieves pain",
                "Improves complexion"
            ]
        },
        neem: {
            name: "Neem",
            hindi: "नीम (Neem)",
            telugu: "వేప (Vepa)",
            image: images.neem,
            benefits: [
                "Natural antibacterial",
                "Purifies blood",
                "Supports skin health",
                "Boosts immunity",
                "Promotes oral health"
            ]
        },
        peppermint: {
            name: "Peppermint",
            hindi: "पुदीना (Pudina)",
            telugu: "పుదీనా (Pudina)",
            image: images.peppermint,
            benefits: [
                "Aids digestion",
                "Relieves headache",
                "Freshens breath",
                "Reduces nausea",
                "Improves focus"
            ]
        },
        pippali: {
            name: "Pippali",
            hindi: "पिप्पली (Pippali)",
            telugu: "పిప్పలి (Pippali)",
            image: images.pippali,
            benefits: [
                "Improves digestion",
                "Supports respiratory health",
                "Boosts metabolism",
                "Enhances bioavailability",
                "Strengthens immunity"
            ]
        },
        punarnava: {
            name: "Punarnava",
            hindi: "पुनर्नवा (Punarnava)",
            telugu: "గలిజేరు (Galijeru)",
            image: images.punarnava,
            benefits: [
                "Supports kidney health",
                "Reduces inflammation",
                "Improves liver function",
                "Aids in detoxification",
                "Boosts immunity"
            ]
        },
        pushkarmool: {
            name: "Pushkarmool",
            hindi: "पुष्करमूल (Pushkarmool)",
            telugu: "పుష్కరమూలం (Pushkaramoolam)",
            image: images.pushkarmool,
            benefits: [
                "Supports respiratory health",
                "Relieves cough",
                "Anti-inflammatory",
                "Improves digestion",
                "Reduces fever"
            ]
        },
        rasna: {
            name: "Rasna",
            hindi: "रास्ना (Rasna)",
            telugu: "రాస్న (Rasna)",
            image: images.rasna,
            benefits: [
                "Relieves joint pain",
                "Anti-inflammatory",
                "Supports respiratory health",
                "Improves digestion",
                "Reduces swelling"
            ]
        },
        sariva: {
            name: "Sariva",
            hindi: "सारिवा (Sariva)",
            telugu: "సుగంధిపాల (Sugandhipala)",
            image: images.sariva,
            benefits: [
                "Blood purifier",
                "Supports skin health",
                "Reduces inflammation",
                "Cooling properties",
                "Improves complexion"
            ]
        },
        sarpagandha: {
            name: "Sarpagandha",
            hindi: "सर्पगंधा (Sarpagandha)",
            telugu: "సర్పగంధ (Sarpagandha)",
            image: images.sarpagandha,
            benefits: [
                "Supports blood pressure",
                "Reduces anxiety",
                "Promotes sleep",
                "Calms nervous system",
                "Relieves headache"
            ]
        },
        shankhpushpi: {
            name: "Shankhpushpi",
            hindi: "शंखपुष्पी (Shankhpushpi)",
            telugu: "శంఖపుష్పి (Shankhapushpi)",
            image: images.shankhpushpi,
            benefits: [
                "Enhances memory",
                "Improves concentration",
                "Reduces anxiety",
                "Supports brain function",
                "Promotes sleep quality"
            ]
        },
        shatavari: {
            name: "Shatavari",
            hindi: "शतावरी (Shatavari)",
            telugu: "శతావరి (Shatavari)",
            image: images.shatavari,
            benefits: [
                "Female reproductive health",
                "Boosts immunity",
                "Anti-aging properties",
                "Improves digestion",
                "Increases vitality"
            ]
        },
        triphala: {
            name: "Triphala",
            hindi: "त्रिफला (Triphala)",
            telugu: "త్రిఫల (Triphala)",
            image: images.triphala,
            benefits: [
                "Digestive health",
                "Natural detoxifier",
                "Eye health",
                "Supports immunity",
                "Anti-inflammatory"
            ]
        },
        tulsi: {
            name: "Tulsi",
            hindi: "तुलसी (Tulsi)",
            telugu: "తులసి (Tulasi)",
            image: images.tulsi,
            benefits: [
                "Respiratory support",
                "Stress relief",
                "Immune booster",
                "Anti-microbial",
                "Adaptogenic properties"
            ]
        },
        turmeric: {
            name: "Turmeric",
            hindi: "हल्दी (Haldi)",
            telugu: "పసుపు (Pasupu)",
            image: images.turmeric,
            benefits: [
                "Anti-inflammatory",
                "Antioxidant properties",
                "Joint health",
                "Immune support",
                "Brain function"
            ]
        },
        vacha: {
            name: "Vacha",
            hindi: "वच (Vacha)",
            telugu: "వస (Vasa)",
            image: images.vacha,
            benefits: [
                "Improves speech",
                "Enhances memory",
                "Supports respiratory health",
                "Aids digestion",
                "Nervous system tonic"
            ]
        },
        vidari: {
            name: "Vidari",
            hindi: "विदारी (Vidari)",
            telugu: "నేలగుమ్మడి (Nelagummadi)",
            image: images.vidari,
            benefits: [
                "Strengthening tonic",
                "Female reproductive health",
                "Anti-aging",
                "Improves immunity",
                "Increases energy"
            ]
        }
        // Add more herbs as needed
    };

    return (
        <div className="benefits-container">
            <h1 className="page-title">Health Benefits</h1>
            <div className="benefits-grid">
                {Object.entries(herbBenefits).map(([key, herb]) => (
                    <div key={key} className="benefit-card">
                        <div className="herb-image">
                            <img 
                                src={herb.image} 
                                alt={herb.name}
                                onError={(e) => {
                                    e.target.src = '/herbs/placeholder.jpg';
                                }}
                            />
                        </div>
                        <div className="benefit-content">
                            <h2>{herb.name}</h2>
                            <div className="herb-names">
                                <span className="hindi-name">{herb.hindi}</span>
                                <span className="telugu-name">{herb.telugu}</span>
                            </div>
                            <div className="benefits-list">
                                <h3>Key Benefits:</h3>
                                <ul>
                                    {herb.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Benefits; 
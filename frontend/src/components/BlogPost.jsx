import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/blogPost.css';

const BlogPost = () => {
    const { id } = useParams();
    
    const herbDetails = {
        amla: {
            name: "Amla",
            hindi: "आंवला (Amla)",
            telugu: "ఉసిరి (Usiri)",
            description: "Amla, or Indian Gooseberry, is one of the most important herbs in Ayurvedic medicine. It's renowned for having the highest natural concentration of Vitamin C among all fruits and is considered a powerful rejuvenating herb.",
            benefits: [
                "Extremely rich in Vitamin C",
                "Powerful antioxidant properties",
                "Boosts immunity",
                "Improves digestion",
                "Enhances hair health",
                "Supports eye health"
            ],
            usage: "Can be consumed fresh, dried, as juice, powder, or in various Ayurvedic formulations. Often used in hair oils and skincare products.",
            precautions: [
                "May interact with diabetes medications",
                "Can affect blood clotting",
                "Avoid excessive consumption during pregnancy",
                "May interfere with certain medications"
            ]
        },
        arjuna: {
            name: "Arjuna",
            hindi: "अर्जुन (Arjun)",
            telugu: "మద్ది చెట్టు (Maddi Chettu)",
            description: "Arjuna is a large deciduous tree whose bark has been used in Ayurvedic medicine for centuries. Named after the warrior Arjuna from the Mahabharata, this herb is primarily known for its cardiovascular benefits.",
            benefits: [
                "Supports heart health",
                "Maintains healthy blood pressure",
                "Strengthens cardiac muscles",
                "Natural antioxidant",
                "Helps in wound healing",
                "Supports liver function"
            ],
            usage: "Typically taken as powder or decoction of the bark. Can be mixed with milk or water. Available in capsule form.",
            precautions: [
                "May interact with heart medications",
                "Consult healthcare provider if on blood pressure medications",
                "Not recommended during pregnancy",
                "May affect blood sugar levels"
            ]
        },
        ashwagandha: {
            name: "Ashwagandha",
            hindi: "अश्वगंधा (Ashwagandha)",
            telugu: "అశ్వగంధ (Ashwagandha)",
            description: "Known as 'Indian Winter Cherry' or 'Indian Ginseng', Ashwagandha is one of the most powerful herbs in Ayurvedic healing. It's classified as an adaptogen, meaning it helps the body manage stress.",
            benefits: [
                "Reduces stress and anxiety",
                "Improves sleep quality",
                "Boosts immunity",
                "Enhances strength and stamina",
                "Supports cognitive function",
                "May help with thyroid function"
            ],
            usage: "Available as powder, capsules, or liquid extract. Can be mixed with milk, ghee, or honey.",
            precautions: [
                "May increase thyroid hormone levels",
                "Avoid during pregnancy",
                "Not recommended for autoimmune conditions",
                "May interact with sedative medications"
            ]
        },
        bala: {
            name: "Bala",
            hindi: "बला (Bala)",
            telugu: "బల (Bala)",
            description: "Bala, meaning strength, is aptly named for its rejuvenating and strengthening properties. It's particularly valued for its effects on the nervous system and muscles.",
            benefits: [
                "Increases physical strength",
                "Supports nervous system",
                "Improves muscle health",
                "Boosts immunity",
                "Enhances vitality",
                "Supports reproductive health"
            ],
            usage: "Can be taken as powder, decoction, or in medicated oils. Often used in combination with other herbs.",
            precautions: [
                "May lower blood sugar levels",
                "Monitor if diabetic",
                "Consult healthcare provider during pregnancy",
                "May affect blood pressure"
            ]
        },
        bhringaraj: {
            name: "Bhringaraj",
            hindi: "भृंगराज (Bhringraj)",
            telugu: "గుంటగలగర (Guntagalagara)",
            description: "Known as the 'King of Hair', Bhringaraj is renowned for its benefits on hair health and growth. It's also highly regarded for its effects on liver health and mental clarity.",
            benefits: [
                "Promotes hair growth",
                "Prevents premature graying",
                "Supports liver health",
                "Improves memory",
                "Enhances eye health",
                "Calms the mind"
            ],
            usage: "Used as oil for hair applications, or internally as powder or liquid extract. Can be mixed with other herbs for enhanced benefits.",
            precautions: [
                "May increase sensitivity to sunlight",
                "Avoid during pregnancy",
                "Not recommended during breastfeeding",
                "May interact with certain medications"
            ]
        },
        bibhitaki: {
            name: "Bibhitaki",
            hindi: "बहेड़ा (Baheda)",
            telugu: "తాని కాయ (Tani Kaya)",
            description: "Bibhitaki is one of the three fruits in the famous Triphala formula. Known for its detoxifying properties, it's particularly effective for respiratory and digestive health.",
            benefits: [
                "Supports respiratory health",
                "Improves voice quality",
                "Aids digestion",
                "Promotes eye health",
                "Natural detoxifier",
                "Helps in weight management"
            ],
            usage: "Can be taken as powder, tablet, or as part of Triphala. Often used in gargle water for throat conditions.",
            precautions: [
                "May cause loose stools initially",
                "Not recommended during pregnancy",
                "Consult healthcare provider if on medications",
                "May lower blood sugar levels"
            ]
        },
        brahmi: {
            name: "Brahmi",
            hindi: "ब्राह्मी (Brahmi)",
            telugu: "బ్రాహ్మి (Brahmi)",
            description: "Brahmi is one of the most powerful brain tonics in Ayurvedic medicine. It's known for its ability to enhance memory, learning, and concentration.",
            benefits: [
                "Enhances memory and concentration",
                "Reduces anxiety and stress",
                "Improves cognitive function",
                "Supports nervous system",
                "Anti-inflammatory properties",
                "Promotes hair growth"
            ],
            usage: "Can be taken as juice, powder, or tablet. Often used in hair oils and as a brain tonic.",
            precautions: [
                "May cause digestive upset in some people",
                "Can increase secretions in the urinary tract",
                "Consult healthcare provider during pregnancy",
                "May interact with thyroid medications"
            ]
        },
        cardamom: {
            name: "Cardamom",
            hindi: "इलायची (Elaichi)",
            telugu: "ఏలకులు (Yelakulu)",
            description: "Cardamom is known as the 'Queen of Spices' and is valued not only for its culinary uses but also for its medicinal properties in Ayurveda.",
            benefits: [
                "Aids digestion",
                "Freshens breath",
                "Supports heart health",
                "Reduces nausea",
                "Balances blood sugar",
                "Anti-inflammatory properties"
            ],
            usage: "Can be used in cooking, as tea, or chewed whole. Available as powder or essential oil.",
            precautions: [
                "May interact with blood pressure medications",
                "Can affect blood sugar levels",
                "Use in moderation during pregnancy",
                "May cause allergic reactions in some people"
            ]
        },
        chitrak: {
            name: "Chitrak",
            hindi: "चित्रक (Chitrak)",
            telugu: "చిత్రమూలం (Chitramoolam)",
            description: "Chitrak is a powerful herb known for its ability to enhance metabolism and digestion. It's particularly valued for its effects on the digestive system.",
            benefits: [
                "Improves metabolism",
                "Enhances digestion",
                "Supports weight management",
                "Anti-inflammatory properties",
                "Detoxifies body",
                "Helps in respiratory conditions"
            ],
            usage: "Usually taken as powder or tablet. Should be used under guidance due to its potent nature.",
            precautions: [
                "Not recommended during pregnancy",
                "Avoid in case of ulcers",
                "Can increase body heat",
                "Should be used in appropriate doses only"
            ]
        },
        cinnamon: {
            name: "Cinnamon",
            hindi: "दालचीनी (Dalchini)",
            telugu: "దాల్చిన చెక్క (Dalchina Chekka)",
            description: "Cinnamon is a popular spice that has been used for thousands of years in both traditional medicine and cooking. It's known for its sweet, warming properties.",
            benefits: [
                "Regulates blood sugar",
                "Anti-inflammatory properties",
                "Supports heart health",
                "Improves brain function",
                "Natural antioxidant",
                "Helps with digestive issues"
            ],
            usage: "Can be used in cooking, as tea, or taken as supplement. Available in powder, stick, or extract form.",
            precautions: [
                "May interact with diabetes medications",
                "Can affect blood thinning medications",
                "Use Ceylon cinnamon for long-term use",
                "May cause allergic reactions in some people"
            ]
        },
        ginger: {
            name: "Ginger",
            hindi: "अदरक (Adrak)",
            telugu: "అల్లం (Allam)",
            description: "Ginger is one of the most widely used herbs in both culinary and medicinal applications. Known for its pungent taste and warming properties, it's a powerful digestive aid and anti-inflammatory herb.",
            benefits: [
                "Natural digestive aid",
                "Anti-inflammatory properties",
                "Reduces nausea and motion sickness",
                "Boosts immune system",
                "Improves circulation",
                "Helps with respiratory issues"
            ],
            usage: "Can be used fresh, dried, powdered, or as tea. Also available as capsules and in various formulations.",
            precautions: [
                "May interact with blood-thinning medications",
                "Can affect blood sugar levels",
                "Use with caution during pregnancy",
                "May cause heartburn in some people"
            ]
        },
        guduchi: {
            name: "Guduchi",
            hindi: "गिलोय (Giloy)",
            telugu: "తి్పతీగ (Tippateega)",
            description: "Guduchi is known as the 'Amrita' or nectar of life in Ayurveda. It's a powerful immunomodulator and adaptogenic herb that helps boost overall health and immunity.",
            benefits: [
                "Boosts immunity",
                "Reduces fever",
                "Supports liver function",
                "Anti-inflammatory properties",
                "Stress reliever",
                "Purifies blood"
            ],
            usage: "Available as powder, juice, or tablets. Can be taken with water or honey.",
            precautions: [
                "May lower blood sugar levels",
                "Can affect autoimmune conditions",
                "Consult healthcare provider during pregnancy",
                "May interact with immunosuppressant drugs"
            ]
        },
        haritaki: {
            name: "Haritaki",
            hindi: "हरड़ (Harad)",
            telugu: "కరక్కాయ (Karakkaya)",
            description: "Haritaki is considered the 'King of Medicines' in Tibet and is one of the three fruits in Triphala. It's known for its remarkable healing properties and spiritual significance.",
            benefits: [
                "Improves digestion",
                "Natural detoxifier",
                "Enhances brain function",
                "Supports eye health",
                "Promotes longevity",
                "Balances all three doshas"
            ],
            usage: "Can be taken as powder, tablet, or as part of Triphala. Often used in combination with other herbs.",
            precautions: [
                "May cause loose stools initially",
                "Not recommended during pregnancy",
                "May interact with certain medications",
                "Avoid on empty stomach"
            ]
        },
        jatamansi: {
            name: "Jatamansi",
            hindi: "जटामांसी (Jatamansi)",
            telugu: "జటామాంసి (Jatamansi)",
            description: "Jatamansi is often called Indian Spikenard and is highly valued for its calming and grounding properties. It's particularly known for its effects on the mind and nervous system.",
            benefits: [
                "Promotes mental calmness",
                "Improves sleep quality",
                "Reduces stress and anxiety",
                "Enhances memory",
                "Balances emotions",
                "Supports hair growth"
            ],
            usage: "Available as powder, tablet, or oil. Often used in aromatherapy and hair care products.",
            precautions: [
                "Avoid during pregnancy and breastfeeding",
                "May cause drowsiness",
                "Can interact with sedative medications",
                "Use under guidance for mental health conditions"
            ]
        },
        kantakari: {
            name: "Kantakari",
            hindi: "कंटकारी (Kantakari)",
            telugu: "నేలములక (Nelamulaka)",
            description: "Kantakari is a thorny herb that's particularly valued for its effects on the respiratory system. It's one of the most important herbs for respiratory health in Ayurveda.",
            benefits: [
                "Supports respiratory health",
                "Relieves cough and cold",
                "Aids digestion",
                "Anti-inflammatory properties",
                "Helps with asthma",
                "Reduces chest congestion"
            ],
            usage: "Usually taken as powder, decoction, or tablet. Can be used in combination with other respiratory herbs.",
            precautions: [
                "May increase pitta dosha",
                "Use with caution during pregnancy",
                "Can cause gastric irritation in some people",
                "Consult healthcare provider for chronic conditions"
            ]
        },
        kapikacchu: {
            name: "Kapikacchu",
            hindi: "कपिकच्छु (Kapikacchu)",
            telugu: "దూర్లభ (Doorlabha)",
            description: "Kapikacchu, also known as Mucuna pruriens, is a powerful herb known for its effects on the nervous system and reproductive health. It's a natural source of L-dopa.",
            benefits: [
                "Supports nervous system health",
                "Improves fertility",
                "Enhances muscle strength",
                "Boosts mood and motivation",
                "Supports hormonal balance",
                "Increases energy levels"
            ],
            usage: "Available as powder or capsules. Should be taken under guidance due to its potent nature.",
            precautions: [
                "May interact with Parkinson's medications",
                "Not recommended during pregnancy",
                "Can affect blood pressure",
                "May interact with psychiatric medications"
            ]
        },
        kutki: {
            name: "Kutki",
            hindi: "कुटकी (Kutki)",
            telugu: "కుట్కి (Kutki)",
            description: "Kutki is a highly valued herb in Ayurveda, particularly known for its beneficial effects on the liver and digestive system. It's considered one of the best herbs for liver health.",
            benefits: [
                "Supports liver health",
                "Improves digestion",
                "Reduces fever",
                "Anti-inflammatory properties",
                "Helps in skin conditions",
                "Balances bile production"
            ],
            usage: "Usually taken as powder or tablet. Should be used under professional guidance.",
            precautions: [
                "Not recommended during pregnancy",
                "May interact with liver medications",
                "Avoid with gallbladder issues",
                "Use appropriate dosage only"
            ]
        },
        licorice: {
            name: "Licorice (Yashtimadhu)",
            hindi: "मुलेठी (Mulethi)",
            telugu: "అతి మధురం (Ati Madhuram)",
            description: "Licorice, known as Yashtimadhu in Ayurveda, is one of the most widely used herbs in traditional medicine systems worldwide. It's particularly valued for its ability to harmonize and enhance the effects of other herbs while providing its own powerful therapeutic benefits.",
            benefits: [
                "Supports respiratory health",
                "Soothes digestive system",
                "Natural expectorant",
                "Helps maintain adrenal health",
                "Supports immune function",
                "Promotes oral health"
            ],
            usage: "Can be taken as powder, tea, tablets, or in combination with other herbs. Often used in cough syrups and throat lozenges.",
            precautions: [
                "May increase blood pressure",
                "Not recommended for long-term use",
                "Avoid during pregnancy",
                "Can interact with certain medications"
            ]
        },
        manjistha: {
            name: "Manjistha",
            hindi: "मंजिष्ठा (Manjistha)",
            telugu: "మంజిష్ట (Manjishta)",
            description: "Manjistha is known as the 'blood purifier' in Ayurveda. It's particularly valued for its ability to cleanse the blood and support healthy skin.",
            benefits: [
                "Purifies blood",
                "Improves skin health",
                "Anti-inflammatory properties",
                "Supports lymphatic drainage",
                "Helps with menstrual issues",
                "Promotes wound healing"
            ],
            usage: "Can be taken as powder, tablet, or decoction. Often used in skin care formulations.",
            precautions: [
                "May increase bleeding time",
                "Use with caution during pregnancy",
                "Can interact with blood thinners",
                "May affect iron absorption"
            ]
        },
        moringa: {
            name: "Moringa",
            hindi: "मुनगा (Munaga)",
            telugu: "మునగ (Munaga)",
            description: "Moringa, often called the 'Miracle Tree', is known for its exceptional nutritional value and medicinal properties. Every part of the tree has beneficial uses.",
            benefits: [
                "Rich in nutrients",
                "Powerful antioxidant",
                "Anti-inflammatory properties",
                "Supports brain health",
                "Helps maintain blood sugar",
                "Enhances bone health"
            ],
            usage: "Leaves can be eaten fresh, dried, or powdered. Also available as capsules and in various formulations.",
            precautions: [
                "May interact with thyroid medications",
                "Can affect blood sugar levels",
                "Use with caution during pregnancy",
                "May interact with blood pressure medications"
            ]
        },
        nagkesar: {
            name: "Nagkesar",
            hindi: "नागकेसर (Nagkesar)",
            telugu: "నాగకేసరం (Nagakesaram)",
            description: "Nagkesar is a prized herb known for its beautiful flowers and powerful medicinal properties. It's particularly valued for its effects on the respiratory and digestive systems.",
            benefits: [
                "Supports respiratory health",
                "Improves digestion",
                "Anti-inflammatory properties",
                "Helps with skin conditions"
            ],
            usage: "Usually taken as powder or tablet. Should be used under professional guidance.",
            precautions: [
                "Not recommended during pregnancy",
                "May interact with respiratory medications",
                "Avoid with skin conditions",
                "Use appropriate dosage only"
            ]
        },
        neem: {
            name: "Neem",
            hindi: "नीम (Neem)",
            telugu: "వేప (Vepa)",
            description: "Neem is often called 'Nature's Pharmacy' due to its remarkable range of health-promoting properties. Every part of the neem tree - leaves, bark, seeds, flowers, and oil - has distinct medicinal properties. It's particularly renowned for its powerful antimicrobial, antifungal, and blood-purifying properties. In Ayurveda, neem is considered one of the most powerful detoxifying and immune-boosting herbs.",
            benefits: [
                "Powerful blood purifier",
                "Natural antibacterial and antifungal",
                "Supports skin health",
                "Boosts immune system",
                "Helps maintain healthy blood sugar levels",
                "Natural pest repellent",
                "Promotes dental health",
                "Supports liver function"
            ],
            usage: "Can be used as oil, powder, or tablets. Leaves can be consumed fresh or dried. Often used in skincare and dental products. Neem oil is used for external applications.",
            precautions: [
                "Not recommended during pregnancy",
                "May affect fertility if used in large amounts",
                "Can interact with diabetes medications",
                "May lower blood sugar levels",
                "Should be used under guidance for internal consumption"
            ]
        },
        peppermint: {
            name: "Peppermint",
            hindi: "पुदीना (Pudina)",
            telugu: "పుదీనా (Pudina)",
            description: "Peppermint is more than just a refreshing herb; it's a powerful medicinal plant with a long history in both Eastern and Western herbal traditions. Its active component, menthol, provides its characteristic cooling effect and numerous therapeutic benefits. In Ayurveda, it's valued for its ability to improve digestion, clear respiratory passages, and cool pitta dosha. The herb is particularly known for its ability to soothe digestive issues and provide mental clarity.",
            benefits: [
                "Relieves digestive discomfort",
                "Reduces nausea and bloating",
                "Clears respiratory passages",
                "Improves mental focus",
                "Natural cooling agent",
                "Freshens breath",
                "Helps with headaches",
                "Soothes muscle aches"
            ],
            usage: "Can be consumed as tea, used fresh in cooking, or taken as oil or capsules. Essential oil can be used for aromatherapy and topical applications.",
            precautions: [
                "May interact with certain medications",
                "Can worsen acid reflux in some people",
                "Use essential oil with caution",
                "Not recommended in large amounts during pregnancy",
                "May affect iron absorption"
            ]
        },
        pippali: {
            name: "Pippali (Long Pepper)",
            hindi: "पिप्पली (Pippali)",
            telugu: "పిప్పలి (Pippali)",
            description: "Pippali is a powerful digestive and respiratory tonic that has been used in Ayurveda for thousands of years. It's particularly known for its ability to enhance the bioavailability of other herbs and support the body's natural healing processes.",
            benefits: [
                "Improves digestion",
                "Enhances nutrient absorption",
                "Supports respiratory health",
                "Boosts metabolism",
                "Strengthens immune system",
                "Helps with coughs and colds"
            ],
            usage: "Can be taken as powder, tablet, or in combination with other herbs. Often used in small amounts due to its potency.",
            precautions: [
                "May increase body heat",
                "Use in moderation during pregnancy",
                "Can interact with medications",
                "Not recommended for people with ulcers"
            ]
        },
        punarnava: {
            name: "Punarnava",
            hindi: "पुनर्नवा (Punarnava)",
            telugu: "గలిజేరు (Galijeru)",
            description: "Punarnava, meaning 'one that renews the body', is a remarkable herb known for its rejuvenating properties. It's particularly valued for its ability to support kidney function and maintain proper fluid balance in the body.",
            benefits: [
                "Supports kidney function",
                "Maintains fluid balance",
                "Anti-inflammatory properties",
                "Improves liver function",
                "Supports heart health",
                "Helps with joint pain"
            ],
            usage: "Available as powder, tablet, or decoction. Best taken under professional guidance.",
            precautions: [
                "May interact with diuretic medications",
                "Use with caution during pregnancy",
                "Monitor if taking blood pressure medications",
                "May affect blood sugar levels"
            ]
        },
        pushkarmool: {
            name: "Pushkarmool",
            hindi: "पुष्करमूल (Pushkarmool)",
            telugu: "పుష్కరమూలం (Pushkaramoolam)",
            description: "Pushkarmool is a highly regarded herb in Ayurveda, particularly known for its effectiveness in supporting respiratory health. It's one of the primary herbs used for maintaining healthy breathing and lung function.",
            benefits: [
                "Supports respiratory health",
                "Helps with asthma and bronchitis",
                "Anti-inflammatory properties",
                "Relieves cough",
                "Improves breathing",
                "Supports heart health"
            ],
            usage: "Usually taken as powder or decoction. Can be combined with other respiratory herbs for enhanced benefits.",
            precautions: [
                "Use under professional guidance",
                "Not recommended during pregnancy",
                "May interact with respiratory medications",
                "Avoid in cases of bleeding disorders"
            ]
        },
        rasna: {
            name: "Rasna",
            hindi: "रास्ना (Rasna)",
            telugu: "చేతిపాన (Chetipana)",
            description: "Rasna is a powerful herb known for its effectiveness in managing joint pain and respiratory conditions. It's particularly valued in Ayurveda for its anti-inflammatory properties and ability to support the respiratory system.",
            benefits: [
                "Relieves joint pain",
                "Supports respiratory health",
                "Anti-inflammatory properties",
                "Helps with sciatica",
                "Reduces swelling",
                "Improves circulation"
            ],
            usage: "Can be taken as powder, decoction, or oil for external application. Often combined with other herbs.",
            precautions: [
                "Use with caution during pregnancy",
                "May interact with pain medications",
                "Consult healthcare provider if on blood thinners",
                "Monitor if taking blood pressure medications"
            ]
        },
        shatavari: {
            name: "Shatavari",
            hindi: "शतावरी (Shatavari)",
            telugu: "పిల్లి పీచర (Pilli Peechara)",
            description: "Shatavari, known as the 'Queen of Herbs', is one of the most important herbs in Ayurveda for women's health. Its name means 'she who possesses a hundred husbands', referring to its ability to promote fertility and vitality.",
            benefits: [
                "Supports women's reproductive health",
                "Enhances fertility",
                "Maintains hormonal balance",
                "Improves lactation",
                "Boosts immunity",
                "Provides antioxidant support"
            ],
            usage: "Can be taken as powder, tablet, or liquid extract. Often mixed with milk or water.",
            precautions: [
                "May not be suitable for those with estrogen-sensitive conditions",
                "Consult healthcare provider during pregnancy",
                "Can cause allergic reactions in some people",
                "May interact with certain medications"
            ]
        },
        triphala: {
            name: "Triphala",
            hindi: "त्रिफला (Triphala)",
            telugu: "త్రిఫల (Triphala)",
            description: "Triphala is a traditional Ayurvedic formulation consisting of three fruits: Amalaki, Bibhitaki, and Haritaki. It's one of the most respected and commonly used formulations in Ayurveda.",
            benefits: [
                "Gentle detoxification",
                "Improves digestion",
                "Supports eye health",
                "Boosts immunity",
                "Maintains healthy weight",
                "Promotes longevity"
            ],
            usage: "Can be taken as powder, tablet, or liquid extract. Best taken before bed or on an empty stomach.",
            precautions: [
                "May cause loose stools initially",
                "Use with caution during pregnancy",
                "Can interact with certain medications",
                "Not recommended for severe diarrhea"
            ]
        },
        tulsi: {
            name: "Tulsi (Holy Basil)",
            hindi: "तुलसी (Tulsi)",
            telugu: "తులసి (Tulasi)",
            description: "Tulsi, also known as Holy Basil, is one of the most sacred and revered herbs in India. It's known as 'The Queen of Herbs' and is renowned for its diverse healing properties.",
            benefits: [
                "Boosts immunity",
                "Supports respiratory health",
                "Reduces stress and anxiety",
                "Anti-inflammatory properties",
                "Improves digestion",
                "Enhances stamina"
            ],
            usage: "Can be consumed fresh, as tea, powder, or in supplement form. Often used in ritual and spiritual practices.",
            precautions: [
                "May interact with blood thinning medications",
                "Use with caution during pregnancy",
                "Can affect fertility in large doses",
                "May interact with diabetes medications"
            ]
        },
        vacha: {
            name: "Vacha",
            hindi: "वच (Vacha)",
            telugu: "వస (Vasa)",
            description: "Vacha is a powerful herb known for its effects on the nervous system and cognitive function. It's particularly valued for its ability to enhance memory and mental clarity.",
            benefits: [
                "Improves memory and concentration",
                "Enhances speech and voice",
                "Supports nervous system",
                "Aids in respiratory health",
                "Promotes mental clarity",
                "Helps with meditation practices"
            ],
            usage: "Should be used in small amounts and under professional guidance. Available as powder or tablet.",
            precautions: [
                "Not recommended during pregnancy",
                "Should be properly processed before use",
                "Can cause nausea in high doses",
                "May interact with psychiatric medications"
            ]
        },
        sariva: {
            name: "Sariva (Indian Sarsaparilla)",
            hindi: "सारिवा (Sariva)",
            telugu: "సుగంధిపాల (Sugandhipala)",
            description: "Sariva, also known as Indian Sarsaparilla, is a cooling herb renowned for its blood-purifying properties. In Ayurveda, it's considered one of the best herbs for maintaining healthy skin and supporting the body's natural detoxification processes. The herb is particularly valued for its ability to balance pitta dosha and cool the body.",
            benefits: [
                "Purifies blood and lymphatic system",
                "Supports healthy skin",
                "Maintains body temperature",
                "Enhances complexion",
                "Supports urinary health",
                "Anti-inflammatory properties"
            ],
            usage: "Can be taken as decoction, powder, or tablet. Often used in combination with other blood-purifying herbs. Commonly included in skin care formulations.",
            precautions: [
                "May lower blood pressure",
                "Use with caution during pregnancy",
                "Can increase cooling in the body",
                "May interact with diabetes medications"
            ]
        },
        sarpagandha: {
            name: "Sarpagandha",
            hindi: "सर्पगंधा (Sarpagandha)",
            telugu: "సర్పగంధ (Sarpagandha)",
            description: "Sarpagandha is a powerful herb known for its remarkable effects on the cardiovascular and nervous systems. Its name literally means 'snake-smelling', and it has been used in traditional medicine for centuries. The herb is particularly valued for its ability to promote relaxation and support healthy blood pressure levels.",
            benefits: [
                "Supports cardiovascular health",
                "Promotes mental calmness",
                "Helps maintain healthy blood pressure",
                "Aids in anxiety management",
                "Supports quality sleep",
                "Reduces nervous tension"
            ],
            usage: "Should be taken under professional guidance due to its potent nature. Available as powder, tablet, or extract. Often used in combination with other calming herbs.",
            precautions: [
                "Not recommended during pregnancy or breastfeeding",
                "May interact with blood pressure medications",
                "Can cause drowsiness",
                "Should not be combined with sedative medications"
            ]
        },
        shankhpushpi: {
            name: "Shankhpushpi",
            hindi: "शंखपुष्पी (Shankhpushpi)",
            telugu: "శంఖపుష్పి (Shankhapushpi)",
            description: "Shankhpushpi, named after its flowers which resemble a conch shell, is one of the most powerful herbs for enhancing memory and cognitive function. In Ayurveda, it's considered a 'Medhya Rasayana' - a herb that rejuvenates the mind and intellect.",
            benefits: [
                "Enhances memory and learning",
                "Improves cognitive function",
                "Reduces anxiety and stress",
                "Supports mental clarity",
                "Promotes restful sleep",
                "Helps with attention and focus"
            ],
            usage: "Available as powder, tablet, or syrup. Can be taken with milk or honey. Often used in brain tonics and memory-enhancing formulations.",
            precautions: [
                "May interact with anti-anxiety medications",
                "Use with caution during pregnancy",
                "Can cause mild drowsiness",
                "Monitor if taking thyroid medications"
            ]
        },
        turmeric: {
            name: "Turmeric",
            hindi: "हल्दी (Haldi)",
            telugu: "పసుపు (Pasupu)",
            description: "Turmeric, often called the 'Golden Spice', is one of the most researched and valuable herbs in Ayurveda. Its active compound, curcumin, is renowned for its powerful anti-inflammatory and antioxidant properties. This sacred herb has been used for thousands of years in both culinary and medicinal applications.",
            benefits: [
                "Powerful anti-inflammatory",
                "Strong antioxidant properties",
                "Supports joint health",
                "Enhances immune function",
                "Promotes healthy digestion",
                "Supports liver function",
                "Maintains healthy skin",
                "Aids in wound healing"
            ],
            usage: "Can be used fresh or dried in cooking, taken as supplements, or applied externally. Often combined with black pepper to enhance absorption. Available as powder, capsules, or in various formulations.",
            precautions: [
                "May interact with blood-thinning medications",
                "Can affect iron absorption",
                "Use with caution before surgery",
                "May interact with diabetes medications",
                "High doses may cause digestive issues"
            ]
        },
        vidari: {
            name: "Vidari",
            hindi: "विदारी (Vidari)",
            telugu: "విదారి (Vidari)",
            description: "Vidari is a rejuvenating herb particularly known for its benefits to women's health and vitality. In Ayurveda, it's classified as a Rasayana (rejuvenative) herb and is considered especially beneficial for supporting reproductive health and maintaining overall strength and energy.",
            benefits: [
                "Supports women's reproductive health",
                "Enhances strength and vitality",
                "Promotes healthy lactation",
                "Boosts immune system",
                "Maintains hormonal balance",
                "Provides anti-aging benefits",
                "Supports muscle strength"
            ],
            usage: "Can be taken as powder mixed with milk or water, or in tablet form. Often combined with other rejuvenating herbs for enhanced benefits.",
            precautions: [
                "May affect blood sugar levels",
                "Use with caution during pregnancy",
                "Can interact with hormone medications",
                "Monitor if diabetic",
                "Consult healthcare provider if on immunosuppressants"
            ]
        }
    };

    const herb = herbDetails[id];

    if (!herb) {
        return <div>Herb not found</div>;
    }

    return (
        <div className="blog-post">
            <Link to="/blog" className="back-button">← Back to Herbs</Link>
            <article>
                <h1>{herb.name}</h1>
                <div className="herb-names">
                    <span className="hindi-name">{herb.hindi}</span>
                    <span className="telugu-name">{herb.telugu}</span>
                </div>
                
                <section className="description">
                    <h2>About {herb.name}</h2>
                    <p>{herb.description}</p>
                </section>

                <section className="benefits">
                    <h2>Benefits</h2>
                    <ul>
                        {herb.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                </section>

                <section className="usage">
                    <h2>How to Use</h2>
                    <p>{herb.usage}</p>
                </section>

                <section className="precautions">
                    <h2>Precautions</h2>
                    <ul>
                        {herb.precautions.map((precaution, index) => (
                            <li key={index}>{precaution}</li>
                        ))}
                    </ul>
                </section>
            </article>
        </div>
    );
};

export default BlogPost; 
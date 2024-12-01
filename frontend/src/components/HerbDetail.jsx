import React from 'react';
import { useParams } from 'react-router-dom';
import './styles/herbDetail.css';

const HerbDetail = () => {
    const { id } = useParams();

    const herbDetails = {
        amla: {
            name: "Amla (Indian Gooseberry)",
            hindi: "आंवला (Amla)",
            telugu: "ఉసిరి (Usiri)",
            description: "Amla, or Indian Gooseberry, is one of the richest natural sources of Vitamin C. This powerful antioxidant fruit has been used in Ayurvedic medicine for thousands of years. It's considered a rasayana (rejuvenative) that supports longevity and overall health.",
            benefits: [
                "Highest natural source of Vitamin C",
                "Boosts immune system",
                "Improves digestion",
                "Enhances hair growth and health",
                "Supports eye health",
                "Natural blood purifier",
                "Anti-aging properties"
            ],
            advantages: [
                "Can be consumed in multiple forms (fresh, dried, powder)",
                "Suitable for daily consumption",
                "Affordable and readily available",
                "Long shelf life when dried",
                "Can be combined with other herbs"
            ],
            disadvantages: [
                "May cause acid reflux in some people",
                "Can interact with diabetes medications",
                "May increase bleeding risk when taken with blood thinners",
                "Highly acidic taste might not be palatable for everyone"
            ],
            usage: "Can be consumed fresh, dried, or in powder form. Often taken with honey or as part of traditional formulations. Common dosage is 1-2 teaspoons of powder daily.",
            marketPrice: {
                fresh: "₹80-120 per kg",
                powder: "₹200-300 per 100g",
                supplement: "₹300-500 per bottle"
            },
            precautions: "Consult healthcare provider if pregnant, nursing, or on medications. Start with small doses to test tolerance."
        },
        arjuna: {
            name: "Arjuna",
            hindi: "अर्जुन (Arjuna)",
            telugu: "అర్జున (Arjuna)",
            description: "Arjuna is a cardioprotective herb that has been used in Ayurveda for centuries to support heart health. The bark of the Arjuna tree contains powerful antioxidants and minerals that strengthen heart muscles and maintain healthy blood pressure.",
            benefits: [
                "Strengthens heart muscles",
                "Maintains healthy blood pressure",
                "Supports cardiovascular health",
                "Reduces chest pain",
                "Anti-inflammatory properties",
                "Helps in stress management",
                "Supports healthy cholesterol levels"
            ],
            advantages: [
                "Natural cardiotonic",
                "Safe for long-term use",
                "Well-researched herb",
                "Multiple therapeutic applications",
                "Can be combined with other heart tonics"
            ],
            disadvantages: [
                "May interact with heart medications",
                "Can cause mild stomach upset initially",
                "May lower blood pressure too much in some cases",
                "Results take time to show"
            ],
            usage: "Typically taken as powder (1/2 teaspoon twice daily) with warm water or milk. Also available in capsule form.",
            marketPrice: {
                powder: "₹200-300 per 100g",
                capsules: "₹400-600 per bottle",
                bark: "₹150-250 per 100g"
            },
            precautions: "Consult healthcare provider if on heart medications. Monitor blood pressure regularly when using Arjuna."
        },
        ashwagandha: {
            name: "Ashwagandha",
            hindi: "अश्वगंधा (Ashwagandha)",
            telugu: "అశ్వగంధ (Ashwagandha)",
            description: "Ashwagandha, also known as Indian Ginseng, is one of the most powerful herbs in Ayurvedic healing. It's best known for its restorative and rejuvenating benefits, helping reduce stress and anxiety while boosting energy and concentration.",
            benefits: [
                "Reduces stress and anxiety",
                "Improves strength and muscle mass",
                "Boosts brain function and memory",
                "Reduces blood sugar levels",
                "Reduces inflammation",
                "May help fight cancer",
                "Improves sleep quality"
            ],
            advantages: [
                "Available in multiple forms (powder, capsules, liquid)",
                "Can be combined with other supplements",
                "Suitable for both men and women",
                "Natural adaptogenic herb",
                "Scientifically proven benefits"
            ],
            disadvantages: [
                "May cause drowsiness",
                "Can interact with certain medications",
                "Not suitable during pregnancy",
                "May affect thyroid tests",
                "Can cause stomach upset in some people"
            ],
            usage: "Can be taken as powder (1/4 to 1/2 teaspoon) with warm milk or water, preferably twice daily. Also available in capsule form.",
            marketPrice: {
                powder: "₹250-400 per 100g",
                capsules: "₹500-800 per bottle",
                root: "₹300-500 per 100g"
            },
            precautions: "Avoid during pregnancy. Consult healthcare provider if you have autoimmune conditions or are on medication for thyroid, diabetes, or blood pressure."
        },
        bala: {
            name: "Bala",
            hindi: "बला (Bala)",
            telugu: "బల (Bala)",
            description: "Bala, meaning strength, is a rejuvenating herb that enhances overall strength and vitality. It's particularly known for its benefits to the nervous system and muscle tissues.",
            benefits: [
                "Increases physical strength",
                "Supports nervous system health",
                "Improves muscle mass",
                "Enhances immunity",
                "Reduces inflammation",
                "Supports reproductive health",
                "Promotes healthy aging"
            ],
            advantages: [
                "Natural strength enhancer",
                "Suitable for all age groups",
                "Can be combined with other herbs",
                "Multiple health benefits",
                "Safe for long-term use"
            ],
            disadvantages: [
                "May cause mild digestive issues",
                "Not suitable during acute fever",
                "Can interact with certain medications",
                "May cause drowsiness in some people"
            ],
            usage: "Can be taken as powder (1/4 to 1/2 teaspoon) with milk or ghee, twice daily.",
            marketPrice: {
                powder: "₹180-250 per 100g",
                tablets: "₹300-450 per bottle",
                oil: "₹250-400 per 100ml"
            },
            precautions: "Avoid during acute fever. Consult healthcare provider if pregnant or nursing."
        },
        bhringaraj: {
            name: "Bhringaraj",
            hindi: "भृंगराज (Bhringraj)",
            telugu: "గుంటగలగర (Guntagalagara)",
            description: "Bhringaraj is known as the 'King of Hair' in Ayurveda. It's primarily used for hair care and liver health, while also supporting mental clarity and peaceful sleep.",
            benefits: [
                "Promotes hair growth",
                "Prevents premature graying",
                "Supports liver health",
                "Improves sleep quality",
                "Enhances memory",
                "Reduces stress",
                "Supports eye health"
            ],
            advantages: [
                "Natural hair tonic",
                "Can be used both internally and externally",
                "Supports multiple body systems",
                "Safe for regular use",
                "Combines well with other herbs"
            ],
            disadvantages: [
                "Oil can stain clothes",
                "May cause headache in some people",
                "Bitter taste when taken internally",
                "Results take time to show"
            ],
            usage: "Can be used as oil for hair application, or taken internally as powder (1/4 to 1/2 teaspoon) with warm water.",
            marketPrice: {
                powder: "₹150-250 per 100g",
                oil: "₹200-350 per 100ml",
                tablets: "₹300-450 per bottle"
            },
            precautions: "Avoid during pregnancy. Test for allergic reactions before regular use."
        },
        bibhitaki: {
            name: "Bibhitaki",
            hindi: "बहेड़ा (Baheda)",
            telugu: "తాండ్రి (Tandri)",
            description: "Bibhitaki is one of the three fruits in Triphala. It's known for its detoxifying properties and ability to support respiratory health. The fruit is particularly effective in maintaining healthy mucus membranes.",
            benefits: [
                "Supports respiratory health",
                "Natural detoxifier",
                "Improves digestion",
                "Maintains healthy mucus membranes",
                "Supports eye health",
                "Promotes healthy hair",
                "Balances Kapha dosha"
            ],
            advantages: [
                "Natural expectorant",
                "Can be used alone or in combinations",
                "Multiple therapeutic uses",
                "Long shelf life",
                "Well-documented benefits"
            ],
            disadvantages: [
                "Astringent taste may be unpleasant",
                "May cause initial digestive adjustment",
                "Can cause dryness if overused",
                "Not suitable during certain conditions"
            ],
            usage: "Take 1/2 to 1 teaspoon powder with warm water, preferably before meals. Can also be used in Triphala formulation.",
            marketPrice: {
                powder: "₹150-250 per 100g",
                whole: "₹200-300 per kg",
                capsules: "₹350-500 per bottle"
            },
            precautions: "Avoid during pregnancy and severe dehydration. Start with small doses to test tolerance."
        },
        brahmi: {
            name: "Brahmi",
            hindi: "ब्रह्मी (Brahmi)",
            telugu: "బ్రహ్మి (Brahmi)",
            description: "Brahmi is a powerful herb known for its ability to enhance memory and cognitive function. It's particularly effective in managing stress and anxiety while boosting mental clarity and focus.",
            benefits: [
                "Enhances memory",
                "Improves cognitive function",
                "Reduces stress",
                "Supports mental clarity",
                "Improves focus",
                "Supports healthy brain function",
                "Natural adaptogenic herb"
            ],
            advantages: [
                "Natural brain tonic",
                "Safe for long-term use",
                "Well-researched herb",
                "Multiple therapeutic applications",
                "Can be combined with other brain tonics"
            ],
            disadvantages: [
                "May cause drowsiness",
                "Can interact with certain medications",
                "Not suitable during pregnancy",
                "May affect thyroid tests",
                "Can cause stomach upset in some people"
            ],
            usage: "Can be taken as powder (1/4 to 1/2 teaspoon) with warm milk or water, preferably twice daily. Also available in capsule form.",
            marketPrice: {
                powder: "₹200-300 per 100g",
                capsules: "₹400-600 per bottle",
                root: "₹300-500 per 100g"
            },
            precautions: "Avoid during pregnancy. Consult healthcare provider if you have autoimmune conditions or are on medication for thyroid, diabetes, or blood pressure."
        },
        cardamom: {
            name: "Cardamom (Ela)",
            hindi: "इलायची (Elaichi)",
            telugu: "ఏలకులు (Yelakulu)",
            description: "Cardamom is a sweet, aromatic spice that's known as the 'Queen of Spices'. It's valued not only for its unique flavor but also for its digestive, respiratory, and oral health benefits.",
            benefits: [
                "Improves digestion",
                "Freshens breath naturally",
                "Supports respiratory health",
                "Helps in detoxification",
                "Reduces anxiety",
                "Maintains oral health",
                "Supports heart health"
            ],
            advantages: [
                "Pleasant taste and aroma",
                "Easy to incorporate in diet",
                "Both culinary and medicinal uses",
                "Long shelf life when properly stored",
                "Can be used whole or powdered"
            ],
            disadvantages: [
                "Relatively expensive spice",
                "May interact with certain medications",
                "Can cause allergic reactions in some",
                "Loses flavor quickly when ground"
            ],
            usage: "Can be used in cooking, or 2-3 pods can be chewed daily. Powder can be added to tea or other beverages.",
            marketPrice: {
                whole: "₹1200-1500 per kg",
                powder: "₹2000-2500 per kg",
                organic: "₹1800-2200 per kg"
            },
            precautions: "Use in moderation. May affect gallstone conditions. Consult healthcare provider if pregnant."
        },
        chitrak: {
            name: "Chitrak",
            hindi: "चित्रक (Chitrak)",
            telugu: "చిత్రమూలం (Chitramoolam)",
            description: "Chitrak is a powerful herb known for its ability to enhance metabolism and digestive fire (agni). It's particularly effective in managing digestive disorders and supporting healthy weight management.",
            benefits: [
                "Enhances metabolism",
                "Improves digestion",
                "Supports weight management",
                "Reduces bloating and gas",
                "Helps in detoxification",
                "Balances stomach acid",
                "Anti-inflammatory properties"
            ],
            advantages: [
                "Powerful digestive stimulant",
                "Effective in small doses",
                "Can be combined with other herbs",
                "Traditional weight management aid",
                "Supports multiple digestive functions"
            ],
            disadvantages: [
                "Strong heating effect",
                "Can cause burning sensation",
                "Not suitable for pitta conditions",
                "Should be used under guidance"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with warm water before meals. Can be mixed with ginger and other digestive herbs.",
            marketPrice: {
                powder: "₹200-300 per 100g",
                root: "₹300-400 per 100g",
                capsules: "₹400-600 per bottle"
            },
            precautions: "Not recommended during pregnancy, ulcers, or high pitta conditions. Use under professional guidance."
        },
        cinnamon: {
            name: "Cinnamon (Tvak)",
            hindi: "दालचीनी (Dalchini)",
            telugu: "దాల్చిన చెక్క (Dalchina Chekka)",
            description: "Cinnamon is a warming spice that has been used for thousands of years in both culinary and medicinal applications. It's particularly known for its ability to balance blood sugar and support metabolic health.",
            benefits: [
                "Helps regulate blood sugar",
                "Supports heart health",
                "Anti-inflammatory properties",
                "Improves digestion",
                "Natural antimicrobial",
                "Enhances brain function",
                "Supports weight management"
            ],
            advantages: [
                "Pleasant taste and aroma",
                "Easy to incorporate in diet",
                "Available year-round",
                "Long shelf life",
                "Both culinary and medicinal uses"
            ],
            disadvantages: [
                "May interact with diabetes medications",
                "Can cause allergic reactions",
                "May affect liver in large doses",
                "Not suitable during pregnancy in large amounts"
            ],
            usage: "Can be used in cooking, or 1/2 to 1 teaspoon powder can be taken with warm water daily.",
            marketPrice: {
                powder: "₹200-300 per 100g",
                sticks: "₹400-600 per 100g",
                organic: "₹500-700 per 100g"
            },
            precautions: "Use Ceylon cinnamon for therapeutic purposes. Avoid large doses if on blood-thinning medications."
        },
        ginger: {
            name: "Ginger",
            hindi: "अदरक (Adrak)",
            telugu: "అల్లం (Allam)",
            description: "Ginger is a powerful digestive aid and anti-inflammatory herb that has been used for thousands of years. It's particularly effective for digestive issues, nausea, and joint pain.",
            benefits: [
                "Improves digestion",
                "Reduces nausea",
                "Anti-inflammatory properties",
                "Boosts immunity",
                "Reduces muscle pain",
                "Supports respiratory health",
                "Helps in cold and flu"
            ],
            advantages: [
                "Readily available",
                "Can be used fresh or dried",
                "Multiple preparation methods",
                "Safe for most people",
                "Both culinary and medicinal uses"
            ],
            disadvantages: [
                "May cause heartburn in some",
                "Can interact with blood-thinning medications",
                "May not suit people with certain gallbladder conditions",
                "Strong taste may be unpleasant for some"
            ],
            usage: "Can be used fresh, dried, or powdered. Take 1-2g powder daily or drink as tea.",
            marketPrice: {
                fresh: "₹100-150 per kg",
                powder: "₹200-300 per 100g",
                capsules: "₹300-500 per bottle"
            },
            precautions: "Use with caution if on blood-thinning medications or before surgery."
        },
        guduchi: {
            name: "Guduchi",
            hindi: "गिलोय (Giloy)",
            telugu: "తిప్పతీగ (Tippatheega)",
            description: "Guduchi is known as the 'Amrita' or nectar of life in Ayurveda. It's a powerful immunomodulator and adaptogenic herb that supports overall health and vitality.",
            benefits: [
                "Boosts immunity",
                "Purifies blood",
                "Reduces stress",
                "Improves digestion",
                "Anti-inflammatory properties",
                "Supports liver health",
                "Balances all three doshas"
            ],
            advantages: [
                "Can be grown at home",
                "Multiple preparation methods",
                "Year-round availability",
                "Adaptogenic properties",
                "Suits all body types"
            ],
            disadvantages: [
                "Bitter taste",
                "May cause constipation in some",
                "Can lower blood sugar",
                "May interact with immunosuppressants"
            ],
            usage: "Take 1/2 to 1 teaspoon powder twice daily with warm water. Can also be taken as juice or decoction.",
            marketPrice: {
                powder: "₹150-250 per 100g",
                tablets: "₹200-300 per bottle",
                juice: "₹150-200 per bottle"
            },
            precautions: "Consult healthcare provider if pregnant or on immunosuppressive drugs."
        },
        haritaki: {
            name: "Haritaki",
            hindi: "हरड़ (Harad)",
            telugu: "కరక్కాయ (Karakkaya)",
            description: "Haritaki is known as the 'King of Medicines' in Tibet and is one of the three fruits in Triphala. It's revered for its ability to cleanse and rejuvenate the body while promoting longevity.",
            benefits: [
                "Improves digestion",
                "Natural laxative",
                "Supports brain function",
                "Cleanses the colon",
                "Promotes eye health",
                "Enhances skin health",
                "Balances all three doshas"
            ],
            advantages: [
                "Can be used alone or in combinations",
                "Multiple therapeutic applications",
                "Suits all body types",
                "Available year-round",
                "Well-documented benefits"
            ],
            disadvantages: [
                "Astringent taste",
                "May cause initial digestive discomfort",
                "Can cause dehydration if overused",
                "Not suitable during pregnancy"
            ],
            usage: "Take 1/2 to 1 teaspoon powder with warm water before bed. Can also be used in Triphala formulation.",
            marketPrice: {
                powder: "₹200-300 per 100g",
                whole: "₹300-400 per kg",
                capsules: "₹400-600 per bottle"
            },
            precautions: "Avoid during pregnancy and severe dehydration. Start with small doses."
        },
        jatamansi: {
            name: "Jatamansi",
            hindi: "जटामांसी (Jatamansi)",
            telugu: "జటామాంసి (Jatamansi)",
            description: "Jatamansi is a precious Himalayan herb known for its calming and grounding properties. It's particularly valued for its ability to support mental health and promote quality sleep.",
            benefits: [
                "Promotes restful sleep",
                "Reduces anxiety and stress",
                "Supports mental clarity",
                "Improves memory",
                "Balances emotions",
                "Promotes hair growth",
                "Natural sedative"
            ],
            advantages: [
                "Natural alternative to sleeping pills",
                "Non-addictive",
                "Can be combined with other herbs",
                "Multiple therapeutic uses",
                "Traditional wisdom backed by research"
            ],
            disadvantages: [
                "Strong earthy smell",
                "May cause drowsiness",
                "Limited availability",
                "Relatively expensive"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with warm milk before bed. Can also be used as oil for hair.",
            marketPrice: {
                powder: "₹800-1200 per 100g",
                oil: "₹500-700 per 50ml",
                capsules: "₹600-800 per bottle"
            },
            precautions: "Avoid during pregnancy and breastfeeding. Do not drive after taking Jatamansi."
        },
        kantakari: {
            name: "Kantakari",
            hindi: "कटेरी (Kateri)",
            telugu: "నేలములక (Nelamulaka)",
            description: "Kantakari is a powerful herb for respiratory health. It's particularly effective in managing respiratory conditions and supporting healthy lung function.",
            benefits: [
                "Supports respiratory health",
                "Clears chest congestion",
                "Reduces cough",
                "Anti-inflammatory properties",
                "Improves digestion",
                "Supports immune system",
                "Balances Kapha dosha"
            ],
            advantages: [
                "Natural expectorant",
                "Can be combined with other herbs",
                "Multiple preparation methods",
                "Traditional respiratory tonic",
                "Scientifically validated benefits"
            ],
            disadvantages: [
                "Bitter taste",
                "May cause throat irritation initially",
                "Limited availability",
                "Results take time"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with honey twice daily. Can also be taken as decoction.",
            marketPrice: {
                powder: "₹200-300 per 100g",
                tablets: "₹300-400 per bottle",
                syrup: "₹150-200 per 100ml"
            },
            precautions: "Use with caution in pitta conditions. Not recommended during pregnancy."
        },
        kapikacchu: {
            name: "Kapikacchu",
            hindi: "कौंच (Kaunch)",
            telugu: "దూడపాల (Dudapaala)",
            description: "Kapikacchu, also known as Mucuna pruriens, is a powerful herb known for its ability to support the nervous system and enhance reproductive health. It's a natural source of L-dopa.",
            benefits: [
                "Supports nervous system health",
                "Enhances reproductive function",
                "Improves mood and motivation",
                "Increases strength and energy",
                "Supports healthy dopamine levels",
                "Improves sleep quality",
                "Natural antioxidant"
            ],
            advantages: [
                "Natural source of L-dopa",
                "Well-researched herb",
                "Multiple health benefits",
                "Can be combined with other herbs",
                "Traditional fertility tonic"
            ],
            disadvantages: [
                "May cause nausea initially",
                "Can interact with certain medications",
                "Seeds can cause itching if not processed properly",
                "Not suitable for everyone"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with milk or water twice daily.",
            marketPrice: {
                powder: "₹300-400 per 100g",
                capsules: "₹500-700 per bottle",
                seeds: "₹200-300 per 100g"
            },
            precautions: "Not recommended during pregnancy. Consult healthcare provider if on medications for Parkinson's or psychiatric conditions."
        },
        kutki: {
            name: "Kutki",
            hindi: "कुटकी (Kutki)",
            telugu: "కుట్కి (Kutki)",
            description: "Kutki is a highly valued herb in Ayurveda, particularly known for its liver-protective and immune-modulating properties. It's considered one of the best herbs for supporting liver health.",
            benefits: [
                "Supports liver health",
                "Improves digestion",
                "Reduces fever",
                "Anti-inflammatory properties",
                "Boosts immunity",
                "Helps in skin disorders",
                "Balances Pitta dosha"
            ],
            advantages: [
                "Powerful liver tonic",
                "Natural detoxifier",
                "Can be combined with other herbs",
                "Multiple therapeutic applications",
                "Well-documented benefits"
            ],
            disadvantages: [
                "Bitter taste",
                "Limited availability",
                "Relatively expensive",
                "May cause initial digestive adjustment"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with warm water before meals.",
            marketPrice: {
                powder: "₹800-1000 per 100g",
                tablets: "₹600-800 per bottle",
                extract: "₹1000-1200 per bottle"
            },
            precautions: "Avoid during pregnancy. Use under professional guidance."
        },
        licorice: {
            name: "Licorice (Yashtimadhu)",
            hindi: "मुलेठी (Mulethi)",
            telugu: "అతిమధురం (Athimaduram)",
            description: "Licorice is known as the 'sweet stick' and is one of the most widely used herbs in Ayurveda. It's particularly valued for its ability to harmonize other herbs and support respiratory health.",
            benefits: [
                "Supports respiratory health",
                "Soothes digestive system",
                "Natural expectorant",
                "Boosts immunity",
                "Supports adrenal function",
                "Improves voice quality",
                "Natural sweetener"
            ],
            advantages: [
                "Pleasant taste",
                "Versatile usage",
                "Can enhance other herbs",
                "Long shelf life",
                "Well-researched benefits"
            ],
            disadvantages: [
                "May increase blood pressure",
                "Can cause water retention",
                "Not suitable for long-term use",
                "Interacts with many medications"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with warm water or honey. Can be used as tea.",
            marketPrice: {
                powder: "₹200-300 per 100g",
                sticks: "₹300-400 per 100g",
                tablets: "₹250-350 per bottle"
            },
            precautions: "Not recommended for those with high blood pressure, kidney disease, or during pregnancy."
        },
        manjistha: {
            name: "Manjistha",
            hindi: "मंजिष्ठा (Manjistha)",
            telugu: "మంజిష్ట (Manjishta)",
            description: "Manjistha is known as the 'blood purifier' in Ayurveda. It's particularly valued for its ability to cleanse the blood, support lymphatic drainage, and promote healthy skin.",
            benefits: [
                "Purifies blood",
                "Supports lymphatic system",
                "Promotes healthy skin",
                "Anti-inflammatory properties",
                "Supports menstrual health",
                "Detoxifies liver",
                "Improves complexion"
            ],
            advantages: [
                "Natural blood cleanser",
                "Can be used internally and externally",
                "Combines well with other herbs",
                "Multiple therapeutic uses",
                "Traditional beauty tonic"
            ],
            disadvantages: [
                "May stain clothes and skin",
                "Bitter taste",
                "Can cause loose stools initially",
                "Results take time to show"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with warm water twice daily. Can also be used in face packs.",
            marketPrice: {
                powder: "₹300-400 per 100g",
                tablets: "₹400-500 per bottle",
                root: "₹250-350 per 100g"
            },
            precautions: "Use with caution during pregnancy and menstruation. Start with small doses."
        },
        moringa: {
            name: "Moringa",
            hindi: "सहजन (Sahjan)",
            telugu: "మునగ (Munaga)",
            description: "Moringa, known as the 'Miracle Tree', is one of the most nutrient-dense plants on Earth. It's particularly valued for its high content of vitamins, minerals, and protein.",
            benefits: [
                "Rich in nutrients",
                "Boosts energy levels",
                "Supports immune system",
                "Anti-inflammatory properties",
                "Promotes healthy digestion",
                "Supports bone health",
                "Natural antioxidant"
            ],
            advantages: [
                "Can be grown easily",
                "All parts are useful",
                "Year-round availability",
                "Versatile in cooking",
                "Sustainable source of nutrition"
            ],
            disadvantages: [
                "Taste may not appeal to all",
                "May cause uterine contractions",
                "Can interact with medications",
                "May cause digestive issues in some"
            ],
            usage: "Leaves can be eaten fresh, dried, or powdered. Take 1-2 teaspoons powder daily with food.",
            marketPrice: {
                powder: "₹200-300 per 100g",
                leaves: "₹50-100 per bunch",
                capsules: "₹400-600 per bottle"
            },
            precautions: "Use with caution during pregnancy. Start with small amounts to test tolerance."
        },
        nagkesar: {
            name: "Nagkesar",
            hindi: "नागकेसर (Nagkesar)",
            telugu: "నాగకేసరం (Nagakesaram)",
            description: "Nagkesar is a precious herb known for its ability to support reproductive health and manage pain. It's particularly valued for its aromatic and therapeutic properties.",
            benefits: [
                "Supports reproductive health",
                "Natural pain reliever",
                "Improves digestion",
                "Anti-inflammatory properties",
                "Supports respiratory health",
                "Promotes skin health",
                "Natural antimicrobial"
            ],
            advantages: [
                "Pleasant aroma",
                "Multiple therapeutic uses",
                "Can be used internally and externally",
                "Traditional pain remedy",
                "Well-documented benefits"
            ],
            disadvantages: [
                "Limited availability",
                "Relatively expensive",
                "May cause warming sensation",
                "Not suitable for all conditions"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with warm water or milk. Can also be used in external applications.",
            marketPrice: {
                powder: "₹800-1000 per 100g",
                flowers: "₹1200-1500 per 100g",
                oil: "₹600-800 per 50ml"
            },
            precautions: "Use with caution during pregnancy and in pitta conditions. Consult healthcare provider before use."
        },
        punarnava: {
            name: "Punarnava",
            hindi: "पुनर्नवा (Punarnava)",
            telugu: "గలిజేరు (Galijeru)",
            description: "Punarnava, meaning 'one that renews the body', is particularly known for its ability to support kidney function and maintain healthy fluid levels in the body.",
            benefits: [
                "Supports kidney health",
                "Maintains fluid balance",
                "Anti-inflammatory properties",
                "Supports liver function",
                "Improves digestion",
                "Boosts immunity",
                "Natural diuretic"
            ],
            advantages: [
                "Natural rejuvenative",
                "Multiple therapeutic uses",
                "Can be grown easily",
                "Cost-effective",
                "Traditional wisdom backed by research"
            ],
            disadvantages: [
                "Bitter taste",
                "May increase urination frequency",
                "Results take time",
                "May interact with certain medications"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with warm water twice daily. Can also be taken as decoction.",
            marketPrice: {
                powder: "₹200-300 per 100g",
                tablets: "₹300-400 per bottle",
                root: "₹150-250 per 100g"
            },
            precautions: "Use with caution during pregnancy. Monitor if taking diuretic medications."
        },
        pushkarmool: {
            name: "Pushkarmool",
            hindi: "पुष्करमूल (Pushkarmool)",
            telugu: "పుష్కరమూలం (Pushkaramoolam)",
            description: "Pushkarmool is a valuable herb known for its effectiveness in respiratory conditions. It's particularly valued for its ability to support healthy breathing and clear congestion.",
            benefits: [
                "Supports respiratory health",
                "Clears congestion",
                "Anti-inflammatory properties",
                "Improves digestion",
                "Reduces cough",
                "Supports heart health",
                "Natural expectorant"
            ],
            advantages: [
                "Powerful respiratory tonic",
                "Can be combined with other herbs",
                "Multiple preparation methods",
                "Traditional wisdom",
                "Well-documented benefits"
            ],
            disadvantages: [
                "Limited availability",
                "Strong taste",
                "May cause initial throat irritation",
                "Relatively expensive"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with honey twice daily. Can be used in decoctions.",
            marketPrice: {
                powder: "₹600-800 per 100g",
                root: "₹800-1000 per 100g",
                tablets: "₹500-700 per bottle"
            },
            precautions: "Use with caution during pregnancy. Start with small doses to test tolerance."
        },
        rasna: {
            name: "Rasna",
            hindi: "रास्ना (Rasna)",
            telugu: "రాస్న (Rasna)",
            description: "Rasna is a powerful anti-inflammatory herb particularly known for its effectiveness in managing joint pain and respiratory conditions.",
            benefits: [
                "Reduces joint pain",
                "Anti-inflammatory properties",
                "Supports respiratory health",
                "Improves digestion",
                "Reduces swelling",
                "Supports nervous system",
                "Balances Vata dosha"
            ],
            advantages: [
                "Natural pain reliever",
                "Multiple therapeutic uses",
                "Can be combined with other herbs",
                "Traditional joint tonic",
                "Well-researched benefits"
            ],
            disadvantages: [
                "Bitter taste",
                "Limited availability",
                "May cause mild digestive issues initially",
                "Results take time"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with warm water twice daily. Can be used in oil applications.",
            marketPrice: {
                powder: "₹400-600 per 100g",
                tablets: "₹300-500 per bottle",
                oil: "₹300-400 per 100ml"
            },
            precautions: "Use with caution during pregnancy. Start with small doses."
        },
        sariva: {
            name: "Sariva (Indian Sarsaparilla)",
            hindi: "सारिवा (Sariva)",
            telugu: "సుగంధిపాల (Sugandhipala)",
            description: "Sariva is a cooling herb known for its blood-purifying and skin-supporting properties. It's particularly valued for its ability to maintain healthy skin and support detoxification.",
            benefits: [
                "Purifies blood",
                "Supports skin health",
                "Cooling properties",
                "Anti-inflammatory",
                "Supports urinary health",
                "Promotes healthy complexion",
                "Natural detoxifier"
            ],
            advantages: [
                "Natural blood cleanser",
                "Can be used internally and externally",
                "Combines well with other herbs",
                "Traditional beauty tonic",
                "Multiple therapeutic uses"
            ],
            disadvantages: [
                "May cause mild digestive issues",
                "Results take time to show",
                "Limited availability",
                "Relatively expensive"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with warm water twice daily. Can be used in skin care preparations.",
            marketPrice: {
                powder: "₹400-600 per 100g",
                root: "₹300-500 per 100g",
                tablets: "₹500-700 per bottle"
            },
            precautions: "Use with caution during pregnancy. Start with small doses to test tolerance."
        },
        sarpagandha: {
            name: "Sarpagandha",
            hindi: "सर्पगंधा (Sarpagandha)",
            telugu: "సర్పగంధ (Sarpagandha)",
            description: "Sarpagandha is a powerful herb known for its ability to support cardiovascular health and promote relaxation. It's particularly valued for its calming properties.",
            benefits: [
                "Supports heart health",
                "Reduces anxiety",
                "Promotes sleep",
                "Maintains blood pressure",
                "Calms nervous system",
                "Reduces stress",
                "Natural tranquilizer"
            ],
            advantages: [
                "Powerful relaxant",
                "Well-researched herb",
                "Multiple therapeutic uses",
                "Traditional wisdom backed by science",
                "Effective in small doses"
            ],
            disadvantages: [
                "Strong herb - needs careful dosing",
                "Can cause drowsiness",
                "May interact with medications",
                "Not suitable for everyone"
            ],
            usage: "Take as prescribed by healthcare provider. Typically used in small doses under supervision.",
            marketPrice: {
                powder: "₹800-1000 per 100g",
                tablets: "₹600-800 per bottle",
                root: "₹1000-1200 per 100g"
            },
            precautions: "Use only under professional guidance. Not recommended during pregnancy or with certain medications."
        },
        shankhpushpi: {
            name: "Shankhpushpi",
            hindi: "शंखपुष्पी (Shankhpushpi)",
            telugu: "శంఖపుష్పి (Shankhapushpi)",
            description: "Shankhpushpi is a brain tonic herb known for enhancing memory, concentration, and overall cognitive function. It's particularly valued for its ability to support mental health and learning ability.",
            benefits: [
                "Enhances memory",
                "Improves concentration",
                "Reduces anxiety",
                "Supports brain function",
                "Promotes sleep quality",
                "Calms mind",
                "Supports learning ability"
            ],
            advantages: [
                "Natural brain tonic",
                "Safe for long-term use",
                "Can be combined with other herbs",
                "Multiple preparation methods",
                "Traditional wisdom backed by research"
            ],
            disadvantages: [
                "Results take time to show",
                "May cause mild drowsiness",
                "Limited availability",
                "Taste may not appeal to all"
            ],
            usage: "Take 1/4 to 1/2 teaspoon powder with warm milk twice daily. Can also be taken as juice or syrup.",
            marketPrice: {
                powder: "₹300-400 per 100g",
                syrup: "₹200-300 per bottle",
                tablets: "₹400-500 per bottle"
            },
            precautions: "Safe for most people. Start with small doses. Consult healthcare provider if pregnant or nursing."
        }
        // ... I can add more herbs if you'd like
    };

    const herb = herbDetails[id];

    if (!herb) {
        return (
            <div className="herb-not-found">
                <h1>Herb Not Found</h1>
                <p>Sorry, we couldn't find information about this herb.</p>
            </div>
        );
    }

    return (
        <div className="herb-detail-container">
            <div className="herb-detail-content">
                <header className="herb-header">
                    <h1>{herb.name}</h1>
                    <div className="herb-names">
                        <span className="hindi-name">{herb.hindi}</span>
                        <span className="telugu-name">{herb.telugu}</span>
                    </div>
                </header>

                <section className="herb-intro">
                    <p>{herb.description}</p>
                </section>

                <div className="herb-image-container">
                    <img 
                        src={`/herbs/${id}.jpg`} 
                        alt={herb.name} 
                        className="herb-main-image"
                        onError={(e) => {
                            e.target.src = '/herbs/placeholder.jpg';
                            e.target.onerror = null;
                        }}
                    />
                </div>

                <div className="herb-details-grid">
                    <section className="benefits-section">
                        <h2>Key Benefits</h2>
                        <ul>
                            {herb.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="advantages-section">
                        <h2>Advantages</h2>
                        <ul>
                            {herb.advantages.map((advantage, index) => (
                                <li key={index}>{advantage}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="disadvantages-section">
                        <h2>Disadvantages & Side Effects</h2>
                        <ul>
                            {herb.disadvantages.map((disadvantage, index) => (
                                <li key={index}>{disadvantage}</li>
                            ))}
                        </ul>
                    </section>
                </div>

                <section className="market-price-section">
                    <h2>Market Price</h2>
                    <div className="price-grid">
                        {Object.entries(herb.marketPrice).map(([type, price]) => (
                            <div key={type} className="price-card">
                                <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                                <p className="price">{price}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="usage-section">
                    <h2>How to Use</h2>
                    <p>{herb.usage}</p>
                </section>

                <section className="precautions-section">
                    <h2>Important Precautions</h2>
                    <p>{herb.precautions}</p>
                </section>
            </div>
        </div>
    );
};

export default HerbDetail; 
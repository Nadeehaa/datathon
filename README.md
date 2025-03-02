# 🌿 EcoAyur: Herbal Medicine Recommendation System

EcoAyur is a web application designed to recommend herbal remedies based on user-input symptoms. The application combines machine learning, web scraping, and data visualization to provide personalized herbal recommendations. It also supports multilingual capabilities to cater to a wide audience.

> **Disclaimer:** The information provided by EcoAyur may not be 100% accurate as it is generated by a machine learning model and may contain errors. Always consult a professional before use.

---

## ⚖️ Key Technologies and Libraries

### 🔢 Frontend
- **React.js**: Framework for building the user interface using functional components and React Hooks (e.g., `useState`).
- **Recharts**: Data visualization library for creating interactive charts.
- **CSS**: Custom styling with responsive design using Flexbox and Grid layouts.
- **React Router**: Navigation management.
- **Axios**: HTTP client for making requests to the backend API.

### 🔧 Backend
- **Flask**: Python web framework for creating the backend API.
- **NumPy & Pandas**: Libraries for data manipulation and numerical computation.
- **scikit-learn**: Machine learning library for training models.
  - **RandomForestClassifier**: Used for recommending herbal remedies and crop prediction.
- **Flask-CORS**: Cross-Origin Resource Sharing management.
- **Joblib**: For serializing machine learning models.

### 🤖 Machine Learning
- **Random Forest**: Model used for multi-label classification in herbal remedy recommendations.
- **Web Scraping**: Collects herbal data from external sources like **BeautifulSoup** and **requests**.
- **Text Vectorization (TF-IDF)**: For analyzing and processing symptom data.

---

## 🌟 Features

### 🌿 Herbal Recommendation System
- **Machine Learning Recommendations**: Suggests the most suitable herbal remedies based on symptoms.
- **Web Scraping**: Retrieves herbal data from external trusted sources.
- **Multilingual Support**: Available in English, Hindi, and Telugu.

### 🖼 User Interface
- **Interactive Forms**: Collects symptom data using dropdowns and dynamic forms.
- **Data Visualization**: Displays interactive charts (e.g., pie charts, bar graphs) for market trends and herb effectiveness.
- **Responsive Design**: Adapts to both mobile and desktop devices using Flexbox and Grid layouts.

---

## 🏰 Project Structure

```bash
frontend/                   # React.js frontend
    public/
    src/
    package.json
    index.html
backend/                    # Flask backend
    app.py
    data/
        herbal_remedies.csv
    ml_model.py
    requirements.txt
    render.yaml
    __pycache__/
```

---

## ⚙️ Installation and Setup

### 🔧 Backend Setup (Flask)
1. **Clone the repository**:
   ```bash
   git clone https://github.com/haniyakonain/datathon.git
   cd ecoayur/backend
   ```

2. **Create and activate a Python virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install required dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask server**:
   ```bash
   python app.py
   ```

### 🔄 Frontend Setup (React)
1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install the required dependencies**:
   ```bash
   npm install
   ```

3. **Run the frontend in development mode**:
   ```bash
   npm run dev
   ```

### 🚀 Running the Full Application
1. Ensure both frontend and backend servers are running.
2. Open a browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## ✨ Key Features

### 🌿 Herbal Recommendation System
- **Machine Learning-Based Recommendations**: The system uses a trained model to suggest herbal remedies based on input symptoms.
- **Web Scraping**: Retrieves herbal data from external sources like NCCIH, BSI, and NGDC.
- **Multilingual Support**: Supports English, Hindi, and Telugu.

### 🖼 User Interface
- **Interactive Forms**: Dropdown selectors and dynamic forms collect user symptoms.
- **Data Visualization**: Displays charts such as pie charts and bar graphs for crop suitability and herb effectiveness.
- **Responsive Design**: Fully mobile and desktop-friendly.

---

## 📊 Example Outputs

### 🌿 Ayurvedic Recommendations:
- **Input**: Symptoms: Headache, Seasonal Allergies
- **Output**:
  - **Recommendation 1**: 25% Match
    - **Herbs**: Butterbur, Nettle Leaf, Elderflower
    - **Ingredients**: Butterbur extract, Nettle leaves, Elderflower
    - **Instructions**: Boil Butterbur and Elderflower in water.
    - **Recipe**: 1 cup water, 1 tsp each herb
    - **Dosage**: Twice daily

---

### 🌱 Health Benefits of Herbs

#### **Amla (Indian Gooseberry)**

- **Other Names**: आंवला (Amla), ఉసిరి (Usiri)
- **Benefits**:
  - Rich in Vitamin C
  - Boosts immunity
  - Improves digestion
  - Enhances hair health

#### **Arjuna**

- **Other Names**: अर्जुन (Arjun), మద్ది చెట్టు (Maddi Chettu)
- **Benefits**:
  - Supports heart health
  - Maintains healthy blood pressure
  - Strengthens cardiac muscles

#### **Ashwagandha**

- **Other Names**: अश्वगंधा (Ashwagandha), అశ్వగంధ (Ashwagandha)
- **Benefits**:
  - Reduces stress and anxiety
  - Improves sleep quality
  - Boosts immunity

---

### 🌱 Crop Growing Recommendation System

**Input**:
- Soil Type: Clay Soil
- Climate Zone: Temperate Climate
- Water Resources: Medium Water Availability
- Farm Location: Hyderabad

**Output**:
- **Recommended Crops**: Wheat, Barley, Oats
- **Weather Data**: Temperature: 23.23°C, Weather: Haze
- **Market Trends**: Price and demand for Wheat, Barley, Oats

---

### 👨‍🌿 Explore Medicinal Herbs

#### Example Herb: **Arjuna**

Arjuna is a herb used for heart health, with the bark containing antioxidants and minerals that support cardiovascular health.

- **Benefits**: Strengthens heart muscles, reduces chest pain, helps manage blood pressure.
- **Market Price**: ₹200-300 per 100g (Powder), ₹400-600 per bottle (Capsules)
- **How to Use**: Typically taken as powder with warm water or milk.

---

## 🌳 Additional Features

### **Healthcare Services**:
- Find Ayurvedic doctors and medical facilities based on location.
  - **Example Output**: 
    - Location: Hyderabad
    - Specialty: Ayurvedic Doctor
    - Results:
      - Ayurvedic College, Kalyan Nagar
      - Government Ayurvedic Dispensary, Golconda Rd

---

Made with ❤️ by **Haniya Konain** and team

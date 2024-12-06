import axios from 'axios';

const API_URL = 'https://agromonitoring.com/api#soildata';

const getSoilData = async (formData) => {
  try {
    const response = await axios.post(API_URL, {
      soilType: formData.soilType,
      climate: formData.climate,
      waterAvailability: formData.waterAvailability
    });
    
    return response.data;  // Assuming the response contains the relevant crop data
  } catch (error) {
    console.error("Error fetching soil data:", error);
    throw error;
  }
};

export default {
  getSoilData
};

// src/api/servicesApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/services';

export const addServiceWithSubService = async (serviceData) => {
    // serviceData is the object containing form values
    try {
        const response = await axios.post(`${API_BASE_URL}/add-with-subservice`, serviceData);
        return response.data; // You may want to return entire response or just .data
    } catch (error) {
        throw error; // Handle error in calling code
    }
};

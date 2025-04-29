import axios from 'axios';

const API_URL = "http://localhost:8000/api/cars"; // ndrro nëse ke backend në URL tjetër

export const getCars = async () => {
    return await axios.get(API_URL);
};

export const createCar = async (carData) => {
    return await axios.post(API_URL, carData);
};

export const updateCar = async (id, carData) => {
    return await axios.put(`${API_URL}/${id}`, carData);
};

export const deleteCar = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

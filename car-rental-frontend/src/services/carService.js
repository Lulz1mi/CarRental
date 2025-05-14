// src/services/carService.js
import apiClient from './apiClient';

export const getCars = async () => {
  return await apiClient.get('/cars');
};

export const createCar = async (carData) => {
  return await apiClient.post('/cars', carData);
};

export const updateCar = async (id, carData) => {
  return await apiClient.put(`/cars/${id}`, carData);
};

export const deleteCar = async (id) => {
  return await apiClient.delete(`/cars/${id}`);
};

// auth.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Funksioni për logimin
export const login = async (email, password) => {
  const response = await API.post('/login', {
    email,
    password,
  });

  // ruaj token-in në localStorage ose state manager
  const token = response.data.token;
  localStorage.setItem('token', token);

  return response.data;
};

// Funksioni për regjistrimin
export const register = async (userData) => {
  const response = await API.post('/register', userData);

  // ruaj token-in në localStorage ose state manager pas regjistrimit
  const token = response.data.token;
  localStorage.setItem('token', token);

  return response.data;
};

// Funksioni për marrjen e të dhënave të profilit të përdoruesit
export const getProfile = async () => {
  try {
    const response = await API.get('/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gabim gjatë marrjes së të dhënave të profilit:", error);
    throw error; // Mund ta trajtoni gabimin më tej në komponentin tuaj
  }
};
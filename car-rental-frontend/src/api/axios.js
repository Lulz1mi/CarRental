// src/api/axios.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Adresa e backend-it
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;

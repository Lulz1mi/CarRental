import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Adresa e backend-it
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor për shtimin e token-it në headers në çdo kërkesë
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

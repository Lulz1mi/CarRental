import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Funksioni për logimin
export const login = async ({ email, password }) => {
  const response = await API.post('/login', {
    email,
    password,
  });

  const token = response.data.token;
  localStorage.setItem('token', token);

  // Merr profilin pas login-it dhe ruaje në localStorage
  const profile = await getProfile();
  localStorage.setItem('user', JSON.stringify(profile));

  return { token, user: profile };
};

// Funksioni për regjistrimin
export const register = async (userData) => {
  const response = await API.post('/register', userData);

  const token = response.data.token;
  localStorage.setItem('token', token);

  // Merr profilin pas regjistrimit dhe ruaje në localStorage
  const profile = await getProfile();
  localStorage.setItem('user', JSON.stringify(profile));

  return { token, user: profile };
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
    throw error;
  }
};

// Funksioni për rezervimin e makinës (book car)
export const bookCar = async (bookingData) => {
  try {
    const response = await API.post('/bookings', bookingData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gabim gjatë rezervimit:', error.response || error.message);
    throw error;
  }
};

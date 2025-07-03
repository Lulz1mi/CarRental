import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('/profile');
        const data = response.data;

        setUserData(data);
        setForm({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: '',
          password_confirmation: ''
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Nuk u arrit të merren të dhënat');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (form.password && form.password !== form.password_confirmation) {
      setError('Fjalëkalimi dhe konfirmimi nuk përputhen.');
      return;
    }

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone
      };

      if (form.password) {
        payload.password = form.password;
        payload.password_confirmation = form.password_confirmation;
      }

      await axios.put('/profile', payload);
      setMessage('Profili u përditësua me sukses!');

      // Redirect menjëherë në homepage pas përditësimit
      navigate('/HomePage', { replace: true });

    } catch (err) {
      console.error(err);
      setError('Ndodhi një gabim gjatë përditësimit.');
    }
  };

  if (loading) return <p className="p-6">Duke ngarkuar...</p>;
  if (error && !userData) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Llogaria ime</h1>
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleUpdate} className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <label className="block font-semibold">Emri</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Telefoni</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Fjalëkalim i ri</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            placeholder="Lëre bosh nëse nuk dëshiron ta ndryshosh"
          />
        </div>
        <div>
          <label className="block font-semibold">Konfirmo fjalëkalimin</label>
          <input
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Përditëso Profilin
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;

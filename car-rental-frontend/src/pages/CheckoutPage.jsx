import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Notification = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        zIndex: 9999,
        fontWeight: 'bold',
      }}
    >
      {message}
    </div>
  );
};

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const reservationDetails = state?.reservationDetails;

  useEffect(() => {
    if (!reservationDetails) {
      navigate('/cars');
    }
  }, [reservationDetails, navigate]);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    birth_date: '',
    license: '',
    phone: '',
    street: '',
    postal_code: '',
    payment_method: 'cash',
  });

  const [loading, setLoading] = useState(false);

  // Shtojmë state për mesazhin
  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const calculateDays = () => {
    if (!reservationDetails) return 0;
    const start = new Date(reservationDetails.start_date);
    const end = new Date(reservationDetails.end_date);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1; // minimum 1 day
  };

  const totalPayment = (
    calculateDays() * Number(reservationDetails.pricePerDay || 0)
  ).toFixed(2);

  const handleSubmit = async () => {
    if (!reservationDetails) return;
    setLoading(true);

    try {
      await api.post('/bookings', {
        ...formData,
        car_id: reservationDetails.car_id,
        start_date: reservationDetails.start_date,
        end_date: reservationDetails.end_date,
        total_payment: totalPayment,
      });

      setNotification('Rezervimi u krye me sukses!');

      // Pas disa sekondash navigojmë në homepage dhe largojmë mundësinë e kthimit prapa
      setTimeout(() => {
        navigate('/homepage', { replace: true });
      }, 1500);

    } catch (error) {
      console.error('Gabim gjatë rezervimit:', error.response?.data || error.message);
      setNotification('Gabim gjatë rezervimit! Kontrollo të dhënat dhe provo përsëri.');
    } finally {
      setLoading(false);
    }
  };

  if (!reservationDetails) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 text-gray-800">
      <Notification message={notification} onClose={() => setNotification('')} />

      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        Plotëso të dhënat për rezervimin
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Të dhënat e shoferit */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Të dhënat e shoferit</h2>
          <div className="space-y-4">
            <input
              name="first_name"
              placeholder="Emri"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <input
              name="last_name"
              placeholder="Mbiemri"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <input
              name="license"
              placeholder="Patentë shoferi"
              value={formData.license}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <input
              name="phone"
              placeholder="Numri i telefonit"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <input
              name="street"
              placeholder="Adresa"
              value={formData.street}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <input
              name="postal_code"
              placeholder="Kodi postar"
              value={formData.postal_code}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Përmbledhja dhe pagesa */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Përmbledhja e rezervimit</h2>
          <div className="border rounded-lg p-4 bg-white shadow mb-6 space-y-2">
            <p>
              <strong>Makina:</strong> {reservationDetails.carName}
            </p>
            <p>
              <strong>Prej:</strong> {reservationDetails.start_date}
            </p>
            <p>
              <strong>Deri më:</strong> {reservationDetails.end_date}
            </p>
            <p>
              <strong>Ditë:</strong> {calculateDays()}
            </p>
            <p>
              <strong>Çmimi/ditë:</strong>{" "}
              {Number(reservationDetails.pricePerDay).toFixed(2)} €
            </p>
            <p className="text-lg font-bold text-orange-600">
              Total: {totalPayment} €
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-2">Metoda e pagesës</h2>
          <div className="space-y-2 mb-6">
            <label>
              <input
                type="radio"
                name="payment_method"
                value="cash"
                checked={formData.payment_method === 'cash'}
                onChange={handleChange}
              />
              <span className="ml-2">Cash</span>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold shadow disabled:opacity-50"
          >
            {loading ? 'Duke dërguar...' : 'Konfirmo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

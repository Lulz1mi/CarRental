// src/components/PaymentInsert.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PaymentInsert = ({ onPaymentAdded }) => {
  const [formData, setFormData] = useState({
    rental_id: '',
    car_id: '',
    user_id: '',
    amount: '',
    payment_method: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validimi bazik
    const requiredFields = ['rental_id', 'car_id', 'user_id', 'amount', 'payment_method', 'status'];
    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      alert('Ju lutem plotësoni të gjitha fushat.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/payments', formData);
      onPaymentAdded(); // Rifresko listën në dashboard
      setFormData({
        rental_id: '',
        car_id: '',
        user_id: '',
        amount: '',
        payment_method: '',
        status: '',
      });
    } catch (error) {
      console.error('Gabim gjatë shtimit të pagesës:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-[#2b386e] mb-4">Shto Pagesë</h2>

      {[
        { name: 'rental_id', label: 'Rental ID', type: 'number' },
        { name: 'car_id', label: 'Car ID', type: 'number' },
        { name: 'user_id', label: 'User ID', type: 'number' },
        { name: 'amount', label: 'Amount (€)', type: 'number' },
        { name: 'payment_method', label: 'Metoda e Pagesës' },
        { name: 'status', label: 'Statusi' },
      ].map(({ name, label, type = 'text' }) => (
        <div className="mb-4" key={name}>
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            type={type}
            name={name}
            id={name}
            value={formData[name]}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#2b386e] focus:border-[#2b386e] p-2 border"
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-[#2b386e] text-white px-4 py-2 rounded hover:bg-[#1f2b5a]"
      >
        Shto Pagesë
      </button>
    </form>
  );
};

export default PaymentInsert;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarUpdate = ({ show, handleClose, selectedCar, setCars }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price_per_day: '',
    fuel_type: '',
    transmission: '',
  });

  useEffect(() => {
    if (selectedCar) {
      setFormData({
        brand: selectedCar.brand || '',
        model: selectedCar.model || '',
        year: selectedCar.year || '',
        price_per_day: selectedCar.price_per_day || '',
        fuel_type: selectedCar.fuel_type || '',
        transmission: selectedCar.transmission || '',
      });
    }
  }, [selectedCar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const requiredFields = ['brand', 'model', 'year', 'price_per_day', 'fuel_type', 'transmission'];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      alert("Ju lutem plotësoni të gjitha fushat.");
      return;
    }

    if (!selectedCar?.id) {
      console.error("Mungon ID e makinës për përditësim.");
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/cars/${selectedCar.id}`, formData);
      const updatedCars = await axios.get('http://localhost:8000/api/cars');
      setCars(updatedCars.data);
      handleClose();
    } catch (error) {
      console.error('Gabim gjatë përditësimit të makinës:', error.response?.data || error.message);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#2b386e]">Përditëso Makinën</h2>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        <div className="space-y-4">
          {[
            { label: 'Brand', name: 'brand' },
            { label: 'Model', name: 'model' },
            { label: 'Year', name: 'year', type: 'number' },
            { label: 'Price Per Day', name: 'price_per_day', type: 'number' },
            { label: 'Fuel Type', name: 'fuel_type' },
            { label: 'Transmission', name: 'transmission' }
          ].map(({ label, name, type = 'text' }, index) => (
            <div key={name}>
              <label htmlFor={`${name}-${index}`} className="block font-medium mb-1">{label}:</label>
              <input
                type={type}
                id={`${name}-${index}`}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b386e]"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Mbyll
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded-lg bg-[#2b386e] text-white hover:bg-[#1f2c5e]"
          >
            Ruaj
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarUpdate;

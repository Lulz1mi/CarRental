import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCarSide } from 'react-icons/fa';

const CarUpdate = ({ show, handleClose, selectedCar, setCars }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price_per_day: '',
    fuel_type: '',
    transmission: '',
    image_url: '',
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedCar) {
      setFormData({
        brand: selectedCar.brand || '',
        model: selectedCar.model || '',
        year: selectedCar.year || '',
        price_per_day: selectedCar.price_per_day || '',
        fuel_type: selectedCar.fuel_type || '',
        transmission: selectedCar.transmission || '',
        image_url: selectedCar.image_url || '',
      });
    }
  }, [selectedCar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/cars/${selectedCar.Id}`,
        formData
      );
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.Id === selectedCar.Id ? response.data : car
        )
      );
      handleClose();
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || 'Gabim gjatë përditësimit.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 relative animate-fadeIn">
        {/* Ikonë dhe titull */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 flex items-center justify-center rounded-full shadow text-3xl">
            <FaCarSide />
          </div>
          <h2 className="text-2xl font-bold mt-4 text-green-700">Përditëso Makinën</h2>
          <p className="text-sm text-gray-500">Modifiko detajet më poshtë</p>
        </div>

        {/* Mesazh gabimi */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center font-medium animate-shake">
            {error}
          </div>
        )}

        {/* Forma */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {[
            { label: 'Marka', name: 'brand' },
            { label: 'Modeli', name: 'model' },
            { label: 'Viti', name: 'year', type: 'number' },
            { label: 'Çmimi/ditë (€)', name: 'price_per_day', type: 'number' },
            { label: 'Tipi i Karburantit', name: 'fuel_type' },
            { label: 'Transmisioni', name: 'transmission' },
            { label: 'URL e Imazhit', name: 'image_url', fullWidth: true },
          ].map(({ label, name, type = 'text', fullWidth }) => (
            <div key={name} className={fullWidth ? 'sm:col-span-2' : ''}>
              <label
                htmlFor={name}
                className="block text-gray-700 font-medium mb-1"
              >
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={name !== 'image_url'}
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                  focus:outline-none focus:ring-2 focus:ring-green-600
                  transition-shadow duration-300 shadow-sm hover:shadow-md placeholder-gray-400"
                placeholder={`Shkruaj ${label.toLowerCase()}`}
              />
            </div>
          ))}

          {/* Butonat */}
          <div className="sm:col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
            >
              Anulo
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Duke ruajtur...' : 'Ruaj'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarUpdate;

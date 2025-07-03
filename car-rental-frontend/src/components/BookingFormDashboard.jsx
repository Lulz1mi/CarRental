import React, { useState, useEffect } from 'react';
import { FaCarSide } from 'react-icons/fa';

const BookingForm = ({
  selectedCar,
  initialData = {},
  onSubmit,
  message,
  onClose,
}) => {
  const [form, setForm] = useState({
    start_date: '',
    end_date: '',
    first_name: '',
    last_name: '',
    email: '',
    birth_date: '',
    license: '',
    phone: '',
    street: '',
    postal_code: '',
    payment_method: 'cash',
    total_payment: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        start_date: initialData.start_date || '',
        end_date: initialData.end_date || '',
        first_name: initialData.first_name || '',
        last_name: initialData.last_name || '',
        email: initialData.email || '',
        birth_date: initialData.birth_date || '',
        license: initialData.license || '',
        phone: initialData.phone || '',
        street: initialData.street || '',
        postal_code: initialData.postal_code || '',
        payment_method: initialData.payment_method || 'cash',
        total_payment: initialData.total_payment || '',
      });
    }
  }, [initialData]);

  if (!selectedCar) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, car_id: selectedCar.id });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-4xl shadow-md">
            <FaCarSide />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-green-600">Rezervimi për:</h2>
          <p className="text-sm text-gray-600 text-center underline decoration-yellow-400">
            {selectedCar.brand} {selectedCar.model}
          </p>
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center font-medium ${
              message.toLowerCase().includes('gabim')
                ? 'bg-red-100 text-red-700 animate-shake'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5" noValidate>
          {/* Data e fillimit */}
          <div>
            <label htmlFor="start_date" className="block text-gray-700 font-medium mb-1">
              Data e fillimit
            </label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              value={form.start_date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300 shadow-sm hover:shadow-md"
            />
          </div>

          {/* Data e përfundimit */}
          <div>
            <label htmlFor="end_date" className="block text-gray-700 font-medium mb-1">
              Data e përfundimit
            </label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              value={form.end_date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300 shadow-sm hover:shadow-md"
            />
          </div>

          {/* Emri */}
          <div>
            <label htmlFor="first_name" className="block text-gray-700 font-medium mb-1">
              Emri
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={form.first_name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {/* Mbiemri */}
          <div>
            <label htmlFor="last_name" className="block text-gray-700 font-medium mb-1">
              Mbiemri
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={form.last_name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {/* Data e lindjes */}
          <div>
            <label htmlFor="birth_date" className="block text-gray-700 font-medium mb-1">
              Data e lindjes
            </label>
            <input
              id="birth_date"
              name="birth_date"
              type="date"
              value={form.birth_date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {/* Leja e drejtimit */}
          <div>
            <label htmlFor="license" className="block text-gray-700 font-medium mb-1">
              Leja e drejtimit
            </label>
            <input
              id="license"
              name="license"
              type="text"
              value={form.license}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {/* Telefoni */}
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
              Telefoni
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {/* Adresa */}
          <div>
            <label htmlFor="street" className="block text-gray-700 font-medium mb-1">
              Adresa (Rruga)
            </label>
            <input
              id="street"
              name="street"
              type="text"
              value={form.street}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {/* Kodi postal */}
          <div>
            <label htmlFor="postal_code" className="block text-gray-700 font-medium mb-1">
              Kodi postal
            </label>
            <input
              id="postal_code"
              name="postal_code"
              type="text"
              value={form.postal_code}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {/* Metoda e pagesës */}
          <div>
            <label htmlFor="payment_method" className="block text-gray-700 font-medium mb-1">
              Metoda e pagesës
            </label>
            <select
              id="payment_method"
              name="payment_method"
              value={form.payment_method}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </div>

          {/* Totali i pagesës */}
          <div>
            <label htmlFor="total_payment" className="block text-gray-700 font-medium mb-1">
              Totali i pagesës (€)
            </label>
            <input
              id="total_payment"
              name="total_payment"
              type="number"
              min="0"
              step="0.01"
              value={form.total_payment}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {/* Butonat */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
            >
              Anulo
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition"
            >
              {initialData && initialData.id ? 'Përditëso' : 'Rezervo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;

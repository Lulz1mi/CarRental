import React from 'react';
import { FaCarSide } from 'react-icons/fa';

const BookingForm = ({
  selectedCar,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
  message,
  onClose,
}) => {
  if (!selectedCar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8 relative animate-fadeIn">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-4xl shadow-md">
            <FaCarSide />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-green-600">
            Rezervimi për:
          </h2>
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

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5" noValidate>
          <div>
            <label htmlFor="startDate" className="block text-gray-700 font-medium mb-1">
              Data e fillimit
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={onStartDateChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300 shadow-sm hover:shadow-md"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-gray-700 font-medium mb-1">
              Data e përfundimit
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={onEndDateChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300 shadow-sm hover:shadow-md"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}  // ✅ Përdor onClose, jo reload!
              className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
            >
              Anulo
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition"
            >
              Rezervo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;

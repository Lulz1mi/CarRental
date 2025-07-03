import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import BookingForm from '../components/BookingFormDashboard';

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const loadBookings = async () => {
    try {
      const res = await api.get('/all-bookings');
      setBookings(res.data);
      setError('');
    } catch (err) {
      console.error('Gabim gjatë marrjes së rezervimeve:', err);
      setError('Gabim gjatë marrjes së rezervimeve.');
    }
  };

  const openFormForEdit = (booking) => {
    setSelectedBooking(booking);
    setFormVisible(true);
    setMessage('');
    setError('');
  };

  const closeForm = () => {
    setFormVisible(false);
    setSelectedBooking(null);
    setMessage('');
    setError('');
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('A jeni i sigurt që doni ta fshini këtë rezervim?')) return;

    try {
      await api.delete(`/bookings/${id}`);
      setMessage('Rezervimi u fshi me sukses.');
      loadBookings();
    } catch (err) {
      console.error('Gabim gjatë fshirjes së rezervimit:', err);
      setError('Gabim gjatë fshirjes së rezervimit.');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedBooking && selectedBooking.id) {
        const updateData = {
          start_date: formData.start_date,
          end_date: formData.end_date,
          status: formData.status || selectedBooking.status,
          total_payment: formData.total_payment,
        };
        await api.put(`/bookings/${selectedBooking.id}`, updateData);
        setMessage('Rezervimi u përditësua me sukses.');
      } else {
        await api.post('/bookings', formData);
        setMessage('Rezervimi u shtua me sukses.');
      }
      closeForm();
      loadBookings();
    } catch (err) {
      console.error('Gabim gjatë ruajtjes së rezervimit:', err);
      setError('Gabim gjatë ruajtjes së rezervimit.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 bg-gradient-to-r from-green-100 via-green-50 to-green-100 rounded-3xl shadow-xl">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-green-900 tracking-wide drop-shadow-md">
        Të gjitha rezervimet
      </h1>

      {message && (
        <div className="mb-6 p-4 text-center bg-green-100 text-green-700 rounded-lg shadow">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 text-center bg-red-100 text-red-700 rounded-lg shadow">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-green-300 bg-white">
        <table className="min-w-full divide-y divide-green-200">
          <thead className="bg-green-100">
            <tr>
              {[
                "Përdoruesi",
                "Makina",
                "Prej",
                "Deri",
                "Statusi",
                "Totali i Pagesës",
                "Veprime",
              ].map((title) => (
                <th
                  key={title}
                  className="px-6 py-4 text-left text-sm font-semibold text-green-700 uppercase tracking-wider"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-green-100">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  Nuk ka rezervime për t’u shfaqur.
                </td>
              </tr>
            ) : (
              bookings.map((booking, idx) => (
                <tr
                  key={booking.id}
                  className={`transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-green-50"
                  }`}
                >
                  <td className="px-6 py-3 border border-green-200">
                    {booking.first_name} {booking.last_name}
                  </td>
                  <td className="px-6 py-3 border border-green-200">
                    {booking.brand} {booking.model}
                  </td>
                  <td className="px-6 py-3 border border-green-200">{booking.start_date}</td>
                  <td className="px-6 py-3 border border-green-200">{booking.end_date}</td>
                  <td className="px-6 py-3 border border-green-200">{booking.status}</td>
                  <td className="px-6 py-3 border border-green-200">
                    {booking.total_payment
                      ? Number(booking.total_payment).toFixed(2) + " €"
                      : "-"}
                  </td>
                  <td className="px-6 py-3 border border-green-200 space-x-2">
                    <button
                      onClick={() => openFormForEdit(booking)}
                      className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                      Edito
                    </button>
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                    >
                      Fshi
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {formVisible && (
        <BookingForm
          selectedCar={
            selectedBooking
              ? {
                  id: selectedBooking.car_id,
                  brand: selectedBooking.brand,
                  model: selectedBooking.model,
                }
              : null
          }
          initialData={selectedBooking || {}}
          onClose={closeForm}
          onSubmit={handleFormSubmit}
          message={message || error}
        />
      )}
    </div>
  );
};

export default AdminBookingsPage;

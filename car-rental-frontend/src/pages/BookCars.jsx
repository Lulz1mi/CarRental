import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FaCalendarAlt, FaCog, FaGasPump, FaUser } from 'react-icons/fa';
import BookingForm from '../components/BookingForm';

const BookCars = () => {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  // Dropdown user
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        const normalizedCars = response.data.map(car => ({
          ...car,
          id: car.Id,
        }));
        setCars(normalizedCars);
      } catch (error) {
        console.error('Gabim gjatë marrjes së makinave:', error);
      }
    };
    fetchCars();

    // Merr user nga localStorage për dropdown
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleBookingClick = (car) => {
    setSelectedCar(car);
    setStartDate('');
    setEndDate('');
    setMessage('');
  };

  const handleCloseForm = () => {
    setSelectedCar(null);
    setStartDate('');
    setEndDate('');
    setMessage('');
  };

  const handleSubmitBooking = () => {
    if (!selectedCar || !selectedCar.id) {
      setMessage('Gabim: Makina nuk është e zgjedhur siç duhet.');
      return;
    }
    if (!startDate || !endDate) {
      setMessage('Ju lutem plotësoni datat!');
      return;
    }

    const formattedStart = new Date(startDate).toISOString().split('T')[0];
    const formattedEnd = new Date(endDate).toISOString().split('T')[0];

    navigate('/checkout', {
      state: {
        reservationDetails: {
          car_id: selectedCar.id,
          carName: `${selectedCar.brand} ${selectedCar.model}`,
          start_date: formattedStart,
          end_date: formattedEnd,
          pricePerDay: selectedCar.price_per_day,
        },
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 shadow bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-10 font-medium">
          <div className="text-2xl font-bold text-orange-500 cursor-default">IllyriaRental</div>
          <div className="space-x-6 hidden sm:flex">
            <Link to="/homepage" className="text-gray-700 hover:text-yellow-500">Home</Link>
            <Link to="/book-cars" className="text-gray-700 hover:text-yellow-500">Book Cars</Link>
            <Link to="/AboutUs" className="text-gray-700 hover:text-yellow-500">AboutUs</Link>
            <Link to="/my-bookings" className="text-gray-700 hover:text-yellow-500">Rezervimet e Mia</Link>
          </div>
        </div>

        {/* Ikona user me dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none text-orange-500 hover:text-orange-600"
          >
            <FaUser className="w-10 h-10 rounded-full border-2 border-orange-500 p-1" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl ring-1 ring-gray-200 z-50 overflow-hidden animate-fade-in-up">
              <div className="px-4 py-4 bg-gray-50 border-b border-gray-100">
                <p className="text-base font-semibold text-gray-800">{user?.name || "Përdoruesi"}</p>
                <p className="text-sm text-gray-500 truncate">{user?.email || "Emaili"}</p>
              </div>
              <div className="flex flex-col py-2">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition duration-200"
                >
                  Shiko Profilin
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 text-left transition duration-200"
                >
                  Dil
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Përmbajtja kryesore */}
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-12">
          Rezervo Veturën Tënde
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <img src={car.image_url} alt={car.model} className="w-full h-52 object-cover" />
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-gray-800">{car.brand} {car.model}</h3>
                <p className="text-xl text-orange-600 font-bold">
                  {Number(car.price_per_day).toFixed(2)} € <span className="text-sm">/ Day</span>
                </p>
                <p className="text-sm text-gray-500">
                  Total: {Number(car.price_per_day).toFixed(2)} € / 1 Day
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-600 mt-3">
                  <span className="flex items-center gap-1"><FaCalendarAlt className="text-orange-500" /> Model {car.year}</span>
                  <span className="flex items-center gap-1"><FaCog className="text-orange-500" /> {car.transmission}</span>
                  <span className="flex items-center gap-1"><FaGasPump className="text-orange-500" /> {car.fuel_type}</span>
                </div>
                <button
                  onClick={() => handleBookingClick(car)}
                  className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forma rezervimit */}
      {selectedCar && (
        <BookingForm
          selectedCar={selectedCar}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(e) => setStartDate(e.target.value)}
          onEndDateChange={(e) => setEndDate(e.target.value)}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitBooking();
          }}
          message={message}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default BookCars;

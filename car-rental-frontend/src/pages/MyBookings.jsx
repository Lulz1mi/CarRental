import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";

// Komponenti Notification
const Notification = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgColor = type === "error" ? "#f87171" : "#4caf50"; // kuq ose jeshil

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        backgroundColor: bgColor,
        color: "white",
        padding: "12px 20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        zIndex: 9999,
        fontWeight: "bold",
        minWidth: "250px",
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
};

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const [postponeModal, setPostponeModal] = useState({
    isOpen: false,
    bookingId: null,
    newDate: "",
  });

  // Dropdown user
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState({});

  // Notification state
  const [notification, setNotification] = useState({ message: "", type: "success" });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  // Logout funksioni
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Merr rezervimet dhe makinat e lidhura
  const fetchBookingsWithCars = useCallback(async () => {
    try {
      const bookingsRes = await axios.get("http://localhost:8000/api/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const bookingsData = bookingsRes.data;

      const carsPromises = bookingsData.map((booking) =>
        axios.get(`http://localhost:8000/api/cars/${booking.car_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );

      const carsRes = await Promise.all(carsPromises);

      const bookingsWithCars = bookingsData.map((booking, index) => ({
        ...booking,
        car: carsRes[index].data,
      }));

      setBookings(bookingsWithCars);
    } catch (error) {
      console.error("Gabim gjatë marrjes së rezervimeve:", error);
      setNotification({ message: "Gabim gjatë marrjes së rezervimeve.", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBookingsWithCars();
  }, [fetchBookingsWithCars]);

  // Fshirja e rezervimit
  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));

      setNotification({ message: "Rezervimi u fshi me sukses.", type: "success" });
    } catch (error) {
      console.error("Gabim gjatë fshirjes:", error);
      setNotification({ message: "Dështoi fshirja e rezervimit.", type: "error" });
    }
  };

  // Modal për shtyrje rezervimi
  const openPostponeModal = (bookingId) => {
    setPostponeModal({ isOpen: true, bookingId, newDate: "" });
  };

  const closePostponeModal = () => {
    setPostponeModal({ isOpen: false, bookingId: null, newDate: "" });
  };

  const handleDateChange = (e) => {
    setPostponeModal((prev) => ({ ...prev, newDate: e.target.value }));
  };

  const submitPostpone = async () => {
    if (!postponeModal.newDate) {
      setNotification({ message: "Ju lutem vendosni një datë të re.", type: "error" });
      return;
    }

    const currentBooking = bookings.find((b) => b.id === postponeModal.bookingId);
    if (currentBooking && postponeModal.newDate <= currentBooking.end_date) {
      setNotification({
        message: `Data e re duhet të jetë më e madhe se data aktuale: ${currentBooking.end_date}`,
        type: "error",
      });
      return;
    }

    try {
      await axios.put(
        `http://localhost:8000/api/bookings/${postponeModal.bookingId}/postpone`,
        { end_date: postponeModal.newDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification({ message: "Rezervimi u shty me sukses.", type: "success" });
      closePostponeModal();
      fetchBookingsWithCars();
    } catch (error) {
      console.error("Gabim gjatë shtyrjes:", error);
      setNotification({ message: "Dështoi shtyrja e rezervimit.", type: "error" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-4 text-gray-600 font-medium">Po ngarkohen rezervimet...</span>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-12 text-lg">
        Nuk keni bërë asnjë rezervim.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "success" })}
      />

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 shadow-md bg-white">
        <div className="flex items-center space-x-10 text-sm font-medium">
          <div className="text-2xl font-bold text-yellow-500 cursor-default">IllyriaRental</div>
          <div className="flex space-x-6">
            <Link to="/homepage" className="text-gray-700 hover:text-yellow-500">
              Home
            </Link>
            <Link to="/book-cars" className="text-gray-700 hover:text-yellow-500">
              Book Cars
            </Link>
            <Link to="/AboutUs" className="text-gray-700 hover:text-yellow-500">
              AboutUs
            </Link>
            <Link to="/my-bookings" className="text-gray-700 hover:text-yellow-500">
              Rezervimet e Mia
            </Link>
          </div>
        </div>

        {/* Ikona user me dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none text-yellow-500 hover:text-yellow-600"
          >
            <FaUser className="w-10 h-10 rounded-full border-2 border-yellow-500 p-1" />
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

      {/* Përmbajtja e rezervimeve */}
      <div className="p-6 max-w-6xl mx-auto flex-grow">
        <h2 className="text-3xl font-bold mb-8 text-blue-700">Rezervimet e Mia</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={
                  booking.car && booking.car.image_url
                    ? `/assets/${booking.car.image_url.replace(/\\/g, "").replace(/^Assets\/?/, "")}`
                    : "/assets/default-car.jpg"
                }
                alt={booking.car ? `${booking.car.brand} ${booking.car.model}` : "Makina"}
                className="w-full h-48 object-cover"
              />

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {booking.car ? `${booking.car.brand} ${booking.car.model}` : "Makina"}
                  </h3>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Viti:</strong> {booking.car?.year ?? "-"}
                    </p>
                    <p>
                      <strong>Transmisioni:</strong> {booking.car?.transmission ?? "-"}
                    </p>
                    <p>
                      <strong>Karburanti:</strong> {booking.car?.fuel_type ?? "-"}
                    </p>
                    <p>
                      <strong>Çmimi/ditë:</strong> {booking.car?.price_per_day ?? "-"} €
                    </p>
                  </div>

                  <div className="border-t pt-3 mt-3 text-sm text-gray-700 space-y-1">
                    <p>
                      <strong>Data Fillimit:</strong> {booking.start_date}
                    </p>
                    <p>
                      <strong>Data Përfundimit:</strong> {booking.end_date}
                    </p>
                    <p>
                      <strong>Statusi:</strong>{" "}
                      <span
                        className={`font-semibold ${
                          booking.status === "confirmed"
                            ? "text-green-600"
                            : booking.status === "cancelled"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </p>
                    <p>
                      <strong>Totali i Pagesës:</strong>{" "}
                      {booking.total_payment
                        ? Number(booking.total_payment).toFixed(2) + " €"
                        : "-"}
                    </p>
                  </div>

                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Anulo
                    </button>
                    <button
                      onClick={() => openPostponeModal(booking.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Shto Shtyrje
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal për shtyrjen e datës */}
        {postponeModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 max-w-full">
              <h3 className="text-xl font-semibold mb-4">Shto shtyrje për rezervimin</h3>
              <label className="block mb-2 font-medium" htmlFor="newDate">
                Data e re e përfundimit:
              </label>
              <input
                type="date"
                id="newDate"
                value={postponeModal.newDate}
                onChange={handleDateChange}
                className="border px-3 py-2 rounded w-full mb-4"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closePostponeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Anulo
                </button>
                <button
                  onClick={submitPostpone}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Konfirmo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-6 mt-auto">
        <p>© {new Date().getFullYear()} CarRental. Të gjitha të drejtat e rezervuara.</p>
      </footer>
    </div>
  );
};

export default MyBookings;

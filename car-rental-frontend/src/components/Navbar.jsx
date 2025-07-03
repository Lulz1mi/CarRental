import { useState } from "react";
import { useNavigate } from "react-router-dom";  // IMPORTON useNavigate
import { FiUser, FiX, FiMail, FiPhone, FiUserCheck, FiLogOut } from "react-icons/fi";
import { CarFront } from "lucide-react";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();  // PËRDOR useNavigate

  const user = {
    name: "Lulzim  Gashi",
    email: "lulzim.gashi2005@gmail.com",
    phone: "049-123-456",
    role: "Administrator i faqes",
  };

  // Funksioni për logout funksional
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("User logged out");
    setShowModal(false);
    navigate("/login");  // RIDREJTON TE /login
  };

  return (
    <>
      {/* Navbar */}
      <div className="h-16 bg-gradient-to-b from-green-100 via-green-50 to-green-100 shadow-md flex items-center justify-between px-8 text-green-900">
        <h2 className="text-2xl font-extrabold tracking-wide drop-shadow-sm flex items-center gap-2">
          Dashboard
        </h2>

        <div
          className="flex items-center space-x-3 cursor-pointer rounded-2xl px-4 py-2 hover:bg-white/10 transition"
          onClick={() => setShowModal(true)}
        >
          <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-bold shadow-md">
            <FiUser size={20} />
          </div>
          <span className="text-sm font-bold tracking-wide select-none">
            Përdoruesi
          </span>
        </div>
      </div>

      {/* Modal Profili */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-green-100 via-green-50 to-green-100 w-full max-w-xl p-8 rounded-2xl shadow-2xl relative text-green-900">
            {/* Mbyll */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-green-700 hover:text-red-500 transition"
            >
              <FiX size={24} />
            </button>

            {/* Ikona përdoruesi */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-green-200 text-green-900 flex items-center justify-center shadow-md">
                <FiUser size={40} />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-green-900">
                {user.name}
              </h3>
              <p className="text-sm text-green-700">{user.role}</p>
            </div>

            {/* Informacioni i përdoruesit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md text-green-900">
                <FiMail className="text-green-700" size={20} />
                <div>
                  <p className="font-semibold">Email</p>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md text-green-900">
                <FiPhone className="text-green-700" size={20} />
                <div>
                  <p className="font-semibold">Telefoni</p>
                  <p>{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md sm:col-span-2 text-green-900">
                <FiUserCheck className="text-green-700" size={20} />
                <div>
                  <p className="font-semibold">Roli</p>
                  <p>{user.role}</p>
                </div>
              </div>
            </div>

            {/* Butoni Logout */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                <FiLogOut size={20} />
                Logout
              </button>
            </div>

            {/* Footer ikonë veture */}
            <div className="mt-6 text-center text-green-900 flex justify-center items-center gap-2 text-sm font-semibold">
              <CarFront size={18} />
              Menaxhimi i automjeteve dhe përdoruesve aktiv
            </div>
          </div>
        </div>
      )}
    </>
  );
}

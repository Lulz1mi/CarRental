import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const AboutUs = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    } else {
      setUser({ name: "Përdoruesi", email: "emaili@example.com" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-6 shadow-md bg-white">
        <div className="flex items-center space-x-10 text-sm font-medium">
          <div className="text-2xl font-bold text-yellow-500 cursor-default">
            IllyriaRental
          </div>
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

        {/* DROPDOWN PËRDORUESI ME IKONË */}
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
                <p className="text-base font-semibold text-gray-800">
                  {user?.name || "Përdoruesi"}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {user?.email || "Emaili"}
                </p>
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

      {/* ABOUT US CONTENT */}
      <div className="flex flex-col items-center justify-center flex-grow px-6 py-20 md:px-32 bg-white text-gray-700 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full">
          {/* IMAZHI */}
          <div className="relative mb-10 md:mb-0 md:mr-16">
            <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 w-[300px] h-[300px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-2xl opacity-30 z-0" />
            <img
              src="/Assets/Lamborghinifromthetop.png"
              alt="Pamje makine nga lart"
              className="relative z-10 w-[300px] h-auto object-contain"
            />
          </div>

          {/* TEKSTI */}
          <div className="max-w-xl text-left z-10">
            
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              About <span className="text-yellow-500">Us</span>
            </h2>
            <p className="mb-4 leading-relaxed">
              Ku pasioni takohet me profesionalizmin. Ne nuk jemi vetëm një shërbim 
              qiraje makinash; ne jemi shoku juaj i udhëtimit. Të përkushtuar ndaj shkëlqimit, 
              synojmë të rindërtojmë udhëtimin tuaj me makina premium, eksperienca të 
              rrjedhshme dhe një shërbim personal të veçantë.
              <span className="text-yellow-500 font-semibold"> Historia juaj fillon me ne.</span>
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Besojmë se çdo aventurë duhet të jetë po aq e paharrueshme sa destinacioni. Zbuloni{" "}
              <span className="text-yellow-500 font-semibold">
                historinë pas përkushtimit tonë
              </span>{" "}
              ndaj shkëlqimit dhe forcën që na bën partnerin tuaj të besuar në rrugë.
            </p>
            <button className="border border-yellow-500 text-yellow-500 px-6 py-2 rounded-full hover:bg-yellow-500 hover:text-white transition duration-300">
              Lexo më shumë
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} IllyriaRental. Të gjitha të drejtat e rezervuara.
      </footer>
    </div>
  );
};

export default AboutUs;

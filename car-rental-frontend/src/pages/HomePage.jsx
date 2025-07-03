import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
  FaCarAlt, FaUsers, FaHandshake, FaPhoneAlt,
  FaMapMarkerAlt, FaStar, FaShieldAlt, FaTags,
  FaClock, FaUser
} from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 shadow-md bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-10 text-sm font-medium">
          <div className="text-2xl font-bold text-yellow-500 cursor-default">
            IllyriaRental
          </div>
          <div className="flex space-x-6">
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

      {/* HERO */}
      <div className="relative bg-gradient-to-r from-white via-[#f7f7f7] to-[#e0e7ff] py-16 px-6 md:px-20 overflow-hidden">
        <div
          className="absolute top-0 right-0 bottom-0 w-1/2 opacity-70 pointer-events-none"
          style={{
            backgroundImage: 'url(/Assets/Lamborghini.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'contain',
            filter: 'brightness(0.85)',
            zIndex: 0,
          }}
        ></div>
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
              <span className="text-yellow-500">Merr makinën</span> me besim dhe vozit me stil
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Zgjidhni makinën tuaj të preferuar me çmime të shkëlqyera. Rezervoni online në pak hapa.
            </p>
            <Link
              to="/book-cars"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-full text-base shadow-lg transition transform hover:scale-105 duration-300"
            >
              Rezervo Tani
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="relative bg-gradient-to-r from-white via-[#f7f7f7] to-[#e0e7ff] py-20 px-6 md:px-20 text-center overflow-hidden">
        <h2 className="text-4xl font-extrabold mb-12 text-gray-900 tracking-tight">
          Pse të zgjedhësh <span className="text-yellow-500">IllyriaRental</span>?
        </h2>
        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-2xl p-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            {[{
              icon: <FaCarAlt className="text-yellow-500 text-5xl" />,
              title: "Flotë moderne",
              text: "Makina të reja dhe të mirëmbajtura për çdo nevojë tuajën."
            }, {
              icon: <FaHandshake className="text-yellow-500 text-5xl" />,
              title: "Çmime të arsyeshme",
              text: "Çmime konkurruese pa kosto të fshehura."
            }, {
              icon: <FaUsers className="text-yellow-500 text-5xl" />,
              title: "Mbështetje 24/7",
              text: "Stafi ynë është gjithmonë në dispozicion."
            }].map(({ icon, title, text }, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl duration-300">
                <div className="bg-yellow-100 rounded-full p-5 mb-6">
                  {icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-700 max-w-xs text-center">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative bg-gradient-to-r from-white via-[#f7f7f7] to-[#e0e7ff] py-16 px-6 md:px-20 overflow-hidden">
        <h2 className="text-4xl font-extrabold mb-12 text-gray-900 tracking-tight text-center">
          Si funksionon?
        </h2>
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[["1. Zgjidh veturën", "Shfleto flotën tonë dhe zgjidh veturën që të përshtatet."],
            ["2. Bëj rezervimin", "Plotëso detajet dhe konfirmo rezervimin online."],
            ["3. Merr veturën", "Vetura do të jetë e gatshme në vendin dhe kohën e caktuar."]].map(([title, desc], i) => (
              <div key={i} className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-700 max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cars */}
      <section className="relative bg-gradient-to-r from-white via-[#f7f7f7] to-[#e0e7ff] py-16 px-6 md:px-20 text-center overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          Veturat më të kërkuara
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{
            name: "Audi A4",
            specs: "Automatik • Diesel • 2017",
            img: "/Assets/Audi A4.png"
          }, {
            name: "Mercedes C-Class",
            specs: "Automatik • Benzinë • 2021",
            img: "/Assets/Mercedes C-class2.png"
          }, {
            name: "Volkswagen Golf 7",
            specs: "Automatik • Diesel • 2018",
            img: "/Assets/Golff 7.png"
          }].map(({ name, specs, img }, i) => (
            <div key={i} className="bg-white p-6 shadow rounded-xl flex flex-col items-center">
              <img src={img} alt={name} className="w-full h-52 object-cover object-center rounded-md mb-4" />
              <h3 className="font-semibold text-gray-800 text-xl">{name}</h3>
              <p className="text-gray-600 text-sm mb-4">{specs}</p>
              <Link
                to="/book-cars"
                className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full shadow transition duration-300"
              >
                Rezervo Tani
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Çfarë thonë klientët tanë?</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[["Makina ishte e gatshme menjëherë dhe procesi ishte shumë i thjeshtë.", "Arta, Prishtinë"],
          ["Rezervim i lehtë dhe shërbim shumë profesional. Do të kthehem përsëri!", "Blerim, Pejë"]].map(([text, author], i) => (
            <blockquote key={i} className="bg-gray-100 p-6 rounded-xl shadow">
              <p className="italic text-gray-700">"{text}"</p>
              <footer className="mt-4 text-sm font-semibold text-gray-600 flex items-center gap-2">
                <FaStar className="text-yellow-500" /> {author}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Garanci dhe siguri</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{
            icon: <FaShieldAlt className="text-yellow-500 text-4xl mb-2" />,
            title: "Siguri maksimale",
            text: "Vetura të sigurta dhe me sigurim aktiv."
          }, {
            icon: <FaTags className="text-yellow-500 text-4xl mb-2" />,
            title: "Pa kosto të fshehura",
            text: "Çdo çmim është transparent dhe i përballueshëm."
          }, {
            icon: <FaClock className="text-yellow-500 text-4xl mb-2" />,
            title: "Mbështetje 24/7",
            text: "Na kontakto në çdo kohë për ndihmë ose pyetje."
          }].map(({ icon, title, text }, i) => (
            <div key={i} className="flex flex-col items-center">
              {icon}
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-gray-600 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow-500 text-white text-center py-12 px-6">
        <h2 className="text-3xl font-bold mb-4">Gati për të rezervuar?</h2>
        <p className="mb-6">Rezervo veturën tënde të preferuar me vetëm disa klikime.</p>
        <Link
          to="/book-cars"
          className="bg-white text-yellow-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100"
        >
          Shfleto veturat
        </Link>
      </section>

      {/* Kontakt */}
      <section className="bg-gray-100 py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Na kontaktoni</h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-yellow-500" />
            <span className="text-gray-700">+383 49 123 456</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-yellow-500" />
            <span className="text-gray-700">Suharekë, Kosovë</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-6 mt-auto">
        <p>© {new Date().getFullYear()} CarRental. Të gjitha të drejtat e rezervuara.</p>
      </footer>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaCarAlt, FaUsers, FaHandshake, FaPhoneAlt, FaMapMarkerAlt, FaStar, FaShieldAlt, FaTags, FaClock } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <nav className="flex justify-between items-center p-6 shadow-md bg-white">
    <div className="flex items-center space-x-10 text-sm font-medium">
    <div className="text-2xl font-bold text-yellow-500 cursor-default">
      IllyriaRental
    </div>
    <div className="flex space-x-6">
      <Link to="/" className="text-gray-700 hover:text-yellow-500">Home</Link>
      <Link to="/cars" className="text-gray-700 hover:text-yellow-500">Book Cars</Link>
      <Link to="/contact" className="text-gray-700 hover:text-yellow-500">Contact</Link>
    </div>
    </div>
      <button
    onClick={handleLogout}
    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full text-sm"
      >
    Logout
      </button>
  </nav>

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
    {/* Teksti */}
    <div>
      <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
        <span className="text-yellow-500">Merr makinën</span> me besim dhe vozit me stil
      </h1>
      <p className="text-gray-600 text-lg mb-8">
       Zgjidhni makinën tuaj të preferuar me çmime të shkëlqyera. Rezervoni online në pak hapa.
      </p>
      <Link
        to="/cars"
        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-full text-base shadow-lg transition transform hover:scale-105 duration-300"
      >
        Rezervo Tani
      </Link>
            </div>
          </div>
        </div>

      {/* Features Section */}
<section className="relative bg-gradient-to-r from-white via-[#f7f7f7] to-[#e0e7ff] py-20 px-6 md:px-20 text-center overflow-hidden">
  <h2 className="text-4xl font-extrabold mb-12 text-gray-900 tracking-tight">
    Pse të zgjedhësh <span className="text-yellow-500">IllyriaRental</span>?
  </h2>

  {/* Wrapper container që përfshin të tri kartat */}
  <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-2xl p-10 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-3 gap-10">
      {/* Feature 1 */}
      <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl duration-300">
        <div className="bg-yellow-100 rounded-full p-5 mb-6">
          <FaCarAlt className="text-yellow-500 text-5xl" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">Flotë moderne</h3>
        <p className="text-gray-700 max-w-xs text-center">
          Makina të reja dhe të mirëmbajtura për çdo nevojë tuajën.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl duration-300">
        <div className="bg-yellow-100 rounded-full p-5 mb-6">
          <FaHandshake className="text-yellow-500 text-5xl" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">Çmime të arsyeshme</h3>
        <p className="text-gray-700 max-w-xs text-center">
          Çmime konkurruese pa kosto të fshehura.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl duration-300">
        <div className="bg-yellow-100 rounded-full p-5 mb-6">
          <FaUsers className="text-yellow-500 text-5xl" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">Mbështetje 24/7</h3>
        <p className="text-gray-700 max-w-xs text-center">
          Stafi ynë është gjithmonë në dispozicion.
        </p>
      </div>
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
      {[{
        step: "1. Zgjidh veturën",
        desc: "Shfleto flotën tonë dhe zgjidh veturën që të përshtatet."
      }, {
        step: "2. Bëj rezervimin",
        desc: "Plotëso detajet dhe konfirmo rezervimin online."
      }, {
        step: "3. Merr veturën",
        desc: "Vetura do të jetë e gatshme në vendin dhe kohën e caktuar."
      }].map(({step, desc}, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl duration-300"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step}</h3>
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
    {/* Audi A4 */}
    <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center">
      <img src="/Assets/Audi A4.png" alt="Audi A4" className="w-1000 h-52 object-cover object-center rounded-md mb-4" />
      <h3 className="font-semibold text-gray-800 text-xl">Audi A4</h3>
      <p className="text-gray-600 text-sm mb-4">Automatik • Diesel • 2017</p>
      <a
        href="/cars"
        className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full shadow transition duration-300"
      >
        Rezervo Tani
      </a>
    </div>

    {/* Mercedes C-Class */}
    <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center">
      <img src="/Assets/Mercedes C-class2.png" alt="Mercedes C-Class" className="w-1000 h-52 object-cover object-center rounded-md mb-4" />
      <h3 className="font-semibold text-gray-800 text-xl">Mercedes C-Class</h3>
      <p className="text-gray-600 text-sm mb-4">Automatik • Benzinë • 2021</p>
      <a
        href="/cars"
        className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full shadow transition duration-300"
      >
        Rezervo Tani
      </a>
    </div>

    {/* Golf 7 */}
    <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center">
      <img src="/Assets/Golff 7.png" alt="Volkswagen Golf 7" className="w-1000 h-52 object-cover object-center rounded-md mb-4" />
      <h3 className="font-semibold text-gray-800 text-xl">Volkswagen Golf 7</h3>
      <p className="text-gray-600 text-sm mb-4">Automatik • Diesel • 2018</p>
      <a
        href="/cars"
        className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full shadow transition duration-300"
      >
        Rezervo Tani
      </a>
    </div>
  </div>
</section>

      {/* Testimonials */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Çfarë thonë klientët tanë?</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <blockquote className="bg-gray-100 p-6 rounded-xl shadow">
            <p className="italic text-gray-700">"Makina ishte e gatshme menjëherë dhe procesi ishte shumë i thjeshtë."</p>
            <footer className="mt-4 text-sm font-semibold text-gray-600 flex items-center gap-2">
              <FaStar className="text-yellow-500" /> Arta, Prishtinë
            </footer>
          </blockquote>
          <blockquote className="bg-gray-100 p-6 rounded-xl shadow">
            <p className="italic text-gray-700">"Rezervim i lehtë dhe shërbim shumë profesional. Do të kthehem përsëri!"</p>
            <footer className="mt-4 text-sm font-semibold text-gray-600 flex items-center gap-2">
              <FaStar className="text-yellow-500" /> Blerim, Pejë
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Garanci dhe siguri</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <FaShieldAlt className="text-yellow-500 text-4xl mb-2" />
            <h3 className="text-lg font-semibold">Siguri maksimale</h3>
            <p className="text-gray-600 text-sm">Vetura të sigurta dhe me sigurim aktiv.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaTags className="text-yellow-500 text-4xl mb-2" />
            <h3 className="text-lg font-semibold">Pa kosto të fshehura</h3>
            <p className="text-gray-600 text-sm">Çdo çmim është transparent dhe i përballueshëm.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaClock className="text-yellow-500 text-4xl mb-2" />
            <h3 className="text-lg font-semibold">Mbështetje 24/7</h3>
            <p className="text-gray-600 text-sm">Na kontakto në çdo kohë për ndihmë ose pyetje.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yellow-500 text-white text-center py-12 px-6">
        <h2 className="text-3xl font-bold mb-4">Gati për të rezervuar?</h2>
        <p className="mb-6">Rezervo veturën tënde të preferuar me vetëm disa klikime.</p>
        <Link
          to="/cars"
          className="bg-white text-yellow-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100"
        >
          Shfleto veturat
        </Link>
      </section>

      {/* Contact Section */}
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

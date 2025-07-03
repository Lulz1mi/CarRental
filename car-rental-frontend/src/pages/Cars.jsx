import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarUpdate from '../components/CarUpdate';
import CarInsert from '../components/CarInsert';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showInsertModal, setShowInsertModal] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së të dhënave:', error);
      }
    };

    fetchCars();
  }, []);

  const handleUpdate = (id) => {
    const car = cars.find(c => c.Id === id);
    setSelectedCar(car);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedCar(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("A jeni të sigurt që dëshironi të fshini këtë makinë?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/cars/${id}`);
        setCars(cars.filter(car => car.Id !== id));
      } catch (error) {
        console.error('Gabim gjatë fshirjes së makinës:', error);
      }
    }
  };

  const handleCloseInsertModal = () => {
    setShowInsertModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 bg-gradient-to-r from-green-100 via-green-50 to-green-100 rounded-3xl shadow-xl">
      <h2 className="text-5xl font-extrabold mb-10 text-center text-green-900 tracking-wide drop-shadow-md">
        Menaxhimi i Automjeteve
      </h2>

      <div className="flex justify-center mb-10">
        <button
          onClick={() => setShowInsertModal(true)}
          className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-semibold text-white rounded-xl shadow-lg group bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition-transform duration-300 transform hover:scale-105 active:scale-95"
        >
          <span className="absolute left-0 w-2 h-12 bg-green-400 rounded-full -translate-x-4 group-hover:translate-x-0 transition-transform duration-300"></span>
          <span className="relative z-10">Shto Makinë</span>
          <svg
            className="absolute right-3 w-5 h-5 text-green-300 group-hover:text-white transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-green-300 bg-white">
        <table className="min-w-full divide-y divide-green-200">
          <thead className="bg-green-100">
            <tr>
              {["Marka", "Modeli", "Viti", "Çmimi për Ditë", "Tipi i Karburantit", "Transmisioni", "Veprimet"].map((title) => (
                <th
                  key={title}
                  className="px-8 py-4 text-left text-sm font-semibold text-green-700 uppercase tracking-wide select-none"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-green-200">
            {cars.map((car, idx) => (
              <tr
                key={car.Id}
                className={`cursor-pointer transition duration-300 ease-in-out
                            ${idx % 2 === 0 ? "bg-white hover:bg-green-50" : "bg-green-50 hover:bg-green-100"}
                            `}
              >
                <td className="px-8 py-4 whitespace-nowrap font-medium text-green-900">{car.brand}</td>
                <td className="px-8 py-4 whitespace-nowrap text-green-800">{car.model}</td>
                <td className="px-8 py-4 whitespace-nowrap text-green-800">{car.year}</td>
                <td className="px-8 py-4 whitespace-nowrap text-green-800">{car.price_per_day} €</td>
                <td className="px-8 py-4 whitespace-nowrap text-green-800">{car.fuel_type}</td>
                <td className="px-8 py-4 whitespace-nowrap text-green-800">{car.transmission}</td>
                <td className="px-8 py-4 whitespace-nowrap space-x-5">
                  <button
                    onClick={() => handleUpdate(car.Id)}
                    className="relative inline-flex items-center px-6 py-2 font-semibold text-green-700 rounded-lg border border-green-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 00.707-.293l9.414-9.414a1 1 0 00-1.414-1.414L8.293 18.293A1 1 0 017.586 19H4a1 1 0 00-1 1v0z" />
                    </svg>
                    Përditëso
                  </button>

                  <button
                    onClick={() => handleDelete(car.Id)}
                    className="relative inline-flex items-center px-6 py-2 font-semibold text-red-700 rounded-lg border border-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Fshi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Components */}
      <CarUpdate
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        selectedCar={selectedCar}
        setCars={setCars}
      />
      <CarInsert
        show={showInsertModal}
        handleClose={handleCloseInsertModal}
        setCars={setCars}
      />
    </div>
  );
};

export default Cars;

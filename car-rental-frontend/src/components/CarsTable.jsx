import { useEffect, useState } from "react";
import { getCars, deleteCar } from "../services/carService";
import CarForm from "./CarForm";

export default function CarsTable() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const loadCars = async () => {
    try {
      const res = await getCars();
      console.log(res.data); // Kontrollo të dhënat që kthehen nga API
      setCars(res.data); // Sigurohuni që këto të dhëna të jenë të sakta dhe të ndihmoni debugimin
    } catch (error) {
      console.error("Error fetching cars", error);
    }
  };

  useEffect(() => {
    loadCars();
  }, []); // Kjo do të ngarkojë makinat një herë kur komponenti të ngarkohet

  const handleDelete = async (id) => {
    if (window.confirm("A jeni i sigurt që doni ta fshini këtë makinë?")) {
      await deleteCar(id);
      loadCars(); // Rifresko makinat pas fshirjes
    }
  };

  return (
    <div>
      <CarForm loadCars={loadCars} selectedCar={selectedCar} setSelectedCar={setSelectedCar} />
      <table className="w-full table-auto bg-white rounded shadow mt-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Emri</th>
            <th className="p-2">Modeli</th>
            <th className="p-2">Viti</th>
            <th className="p-2">Veprime</th>
          </tr>
        </thead>
        <tbody>
          {cars.length > 0 ? (
            cars.map((car) => (
              <tr key={car.id} className="text-center border-t"> {/* Sigurohuni që 'car.id' është emri i fushës në të dhëna */}
                <td className="p-2">{car.id}</td> {/* Kontrolloni që 'car.id' është fusha që përdorni për ID */}
                <td className="p-2">{car.brand}</td> {/* Sigurohuni që 'car.brand' është fusha e saktë */}
                <td className="p-2">{car.model}</td> {/* Sigurohuni që 'car.model' është fusha e saktë */}
                <td className="p-2">{car.year}</td> {/* Sigurohuni që 'car.year' është fusha e saktë */}
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={() => setSelectedCar(car)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Ndrysho
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)} // Sigurohuni që po përdorni 'car.id' për fshirje
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Fshij
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">Nuk ka të dhëna për makinat</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

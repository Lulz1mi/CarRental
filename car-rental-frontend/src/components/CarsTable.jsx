import { useEffect, useState } from "react";
import { getCars, deleteCar } from "../services/carService";
import CarForm from "./CarForm";

export default function CarsTable() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const loadCars = async () => {
    const res = await getCars();
    setCars(res.data);
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("A jeni i sigurt që doni ta fshini këtë makinë?")) {
      await deleteCar(id);
      loadCars();
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
          {cars.map((car) => (
            <tr key={car.id} className="text-center border-t">
              <td className="p-2">{car.id}</td>
              <td className="p-2">{car.name}</td>
              <td className="p-2">{car.model}</td>
              <td className="p-2">{car.year}</td>
              <td className="p-2 flex justify-center gap-2">
                <button
                  onClick={() => setSelectedCar(car)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Ndrysho
                </button>
                <button
                  onClick={() => handleDelete(car.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Fshij
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

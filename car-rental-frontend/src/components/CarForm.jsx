import { useState, useEffect } from "react";
import { createCar, updateCar } from "../services/carService";

export default function CarForm({ loadCars, selectedCar, setSelectedCar }) {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
  });

  useEffect(() => {
    if (selectedCar) {
      setFormData({
        brand: selectedCar.brand || "",
        model: selectedCar.model || "",
        year: selectedCar.year || "",
      });
    }
  }, [selectedCar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCar) {
      await updateCar(selectedCar.id, formData);
      setSelectedCar(null);
    } else {
      await createCar(formData);
    }
    setFormData({ brand: "", model: "", year: "" });
    loadCars();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{selectedCar ? "Ndrysho Makinën" : "Shto Makinë"}</h2>
      <div className="flex flex-col gap-4">
        <input
          id="brand"
          name="brand"
          type="text"
          placeholder="Marka"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          id="model"
          name="model"
          type="text"
          placeholder="Modeli"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          id="year"
          name="year"
          type="number"
          placeholder="Viti"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white py-2 rounded">
          {selectedCar ? "Ruaj Ndryshimet" : "Shto"}
        </button>
      </div>
    </form>
  );
}

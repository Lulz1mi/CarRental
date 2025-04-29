import { useState, useEffect } from "react";
import { createCar, updateCar } from "../services/carService";

export default function CarForm({ loadCars, selectedCar, setSelectedCar }) {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    year: "",
  });

  useEffect(() => {
    if (selectedCar) {
      setFormData({
        name: selectedCar.name,
        model: selectedCar.model,
        year: selectedCar.year,
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
    setFormData({ name: "", model: "", year: "" });
    loadCars();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{selectedCar ? "Ndrysho Makinën" : "Shto Makinë"}</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Emri"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Modeli"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
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

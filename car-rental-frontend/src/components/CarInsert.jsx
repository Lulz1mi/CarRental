import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCarSide } from "react-icons/fa";

const CarInsert = ({ show, handleClose, setCars }) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price_per_day: "",
    fuel_type: "",
    transmission: "",
    image_url: "",
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!show) {
      setFormData({
        brand: "",
        model: "",
        year: "",
        price_per_day: "",
        fuel_type: "",
        transmission: "",
        image_url: "",
      });
      setError(null);
      setIsSubmitting(false);
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/api/cars", formData);
      setCars((prevCars) => [...prevCars, response.data]);
      handleClose();
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Gabim gjatë shtimit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8 relative animate-fadeIn">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-4xl shadow-md">
            <FaCarSide />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-green-600">Shto Makinë</h2>
          <p className="text-sm text-gray-500 text-center">Plotëso detajet më poshtë</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center font-medium animate-shake">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleInsert();
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          noValidate
        >
          {[
            { label: "Marka", name: "brand", type: "text" },
            { label: "Modeli", name: "model", type: "text" },
            { label: "Viti", name: "year", type: "number" },
            { label: "Çmimi / Ditë (€)", name: "price_per_day", type: "number" },
            { label: "Tipi i Karburantit", name: "fuel_type", type: "text" },
            { label: "Transmisioni", name: "transmission", type: "text" },
            { label: "URL e Imazhit", name: "image_url", type: "url", fullWidth: true },
          ].map(({ label, name, type, fullWidth }) => (
            <div key={name} className={fullWidth ? "sm:col-span-2" : ""}>
              <label
                htmlFor={name}
                className="block text-gray-700 font-medium mb-1"
              >
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={name !== "image_url"}
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                  focus:outline-none focus:ring-2 focus:ring-green-500
                  transition-shadow duration-300 shadow-sm hover:shadow-md placeholder-gray-400"
                placeholder={`Shkruaj ${label.toLowerCase()}`}
              />
            </div>
          ))}

          <div className="sm:col-span-2 flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition disabled:opacity-50"
            >
              Anulo
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Duke ruajtur..." : "Ruaj"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarInsert;

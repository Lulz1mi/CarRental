import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCreditCard } from "react-icons/fa";

const PaymentInsert = ({ show, onClose, onPaymentAdded }) => {
  const [formData, setFormData] = useState({
    rental_id: "",
    car_id: "",
    user_id: "",
    amount: "",
    payment_method: "",
    status: "",
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!show) {
      setFormData({
        rental_id: "",
        car_id: "",
        user_id: "",
        amount: "",
        payment_method: "",
        status: "",
      });
      setError(null);
      setIsSubmitting(false);
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "rental_id",
      "car_id",
      "user_id",
      "amount",
      "payment_method",
      "status",
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      setError("Ju lutem plotësoni të gjitha fushat.");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post("http://localhost:8000/api/payments", formData);
      onPaymentAdded();
      onClose();
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Gabim gjatë shtimit."
      );
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
            <FaCreditCard />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-green-600">Shto Pagesë</h2>
          <p className="text-sm text-gray-500 text-center">Plotëso detajet më poshtë</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center font-medium animate-shake">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          noValidate
        >
          {[
            { label: "Rental ID", name: "rental_id", type: "number" },
            { label: "Car ID", name: "car_id", type: "number" },
            { label: "User ID", name: "user_id", type: "number" },
            { label: "Shuma (€)", name: "amount", type: "number" },
            { label: "Metoda e Pagesës", name: "payment_method", type: "text" },
            { label: "Statusi", name: "status", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
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
              onClick={onClose}
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

export default PaymentInsert;
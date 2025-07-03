import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    rental_id: "",
    car_id: "",
    user_id: "",
    amount: "",
    payment_method: "",
    status: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Gabim gjatë marrjes së pagesave:", error.message);
    }
  };

  const deletePayment = async (Payment_id) => {
    if (!window.confirm("A jeni i sigurt që doni ta fshini këtë pagesë?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/payments/${Payment_id}`);
      fetchPayments();
    } catch (error) {
      console.error("Gabim gjatë fshirjes:", error.message);
    }
  };

  const addPayment = async (e) => {
    e.preventDefault();
    const paymentData = {
      rental_id: Number(newPayment.rental_id),
      car_id: Number(newPayment.car_id),
      user_id: Number(newPayment.user_id),
      amount: Number(newPayment.amount),
      payment_method: newPayment.payment_method.trim(),
      status: newPayment.status.trim(),
    };

    try {
      await axios.post("http://localhost:8000/api/payments", paymentData);
      fetchPayments();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Gabim gjatë shtimit të pagesës:", error.message);
    }
  };

  const editPayment = (payment) => {
    setIsEditing(true);
    setEditingPayment(payment);
    setNewPayment({ ...payment });
    setIsModalOpen(true);
  };

  const updatePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/payments/${editingPayment.Payment_id}`,
        newPayment
      );
      fetchPayments();
      setIsModalOpen(false);
      setIsEditing(false);
      resetForm();
    } catch (error) {
      console.error("Gabim gjatë përditësimit të pagesës:", error.message);
    }
  };

  const resetForm = () => {
    setNewPayment({
      rental_id: "",
      car_id: "",
      user_id: "",
      amount: "",
      payment_method: "",
      status: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 bg-gradient-to-r from-green-100 via-green-50 to-green-100 rounded-3xl shadow-xl">
      <h2 className="text-5xl font-extrabold mb-10 text-center text-green-900 tracking-wide drop-shadow-md">
        Menaxhimi i Pagesave
      </h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-8 py-3 rounded-xl shadow hover:from-green-600 hover:to-green-800 transition duration-300 hover:scale-105 active:scale-95"
        >
          Shto Pagesë
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
            <h3 className="text-2xl font-bold mb-6 text-green-800">
              {isEditing ? "Përditëso Pagesën" : "Shto Pagesë të Re"}
            </h3>
            <form
              onSubmit={isEditing ? updatePayment : addPayment}
              className="grid grid-cols-2 gap-4"
            >
              {[
                "rental_id",
                "car_id",
                "user_id",
                "amount",
                "payment_method",
                "status",
              ].map((field) => (
                <input
                  key={field}
                  type={["amount", "rental_id", "car_id", "user_id"].includes(
                    field
                  )
                    ? "number"
                    : "text"}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={newPayment[field]}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, [field]: e.target.value })
                  }
                  required
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              ))}
              <div className="col-span-2 flex justify-end space-x-4 mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {isEditing ? "Përditëso" : "Shto"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                    resetForm();
                  }}
                  className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
                >
                  Anulo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-green-300 bg-white">
        <table className="min-w-full divide-y divide-green-200">
          <thead className="bg-green-100">
            <tr>
              {[
                "ID",
                "Rental ID",
                "Car ID",
                "User ID",
                "Amount",
                "Method",
                "Status",
                "Veprime",
              ].map((title) => (
                <th
                  key={title}
                  className="px-6 py-4 text-left text-sm font-semibold text-green-700 uppercase tracking-wider"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {payments.length > 0 ? (
              payments.map((p, idx) => (
                <tr
                  key={p.Payment_id}
                  className={`transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-green-50"
                  }`}
                >
                  <td className="px-6 py-3">{p.Payment_id}</td>
                  <td className="px-6 py-3">{p.rental_id}</td>
                  <td className="px-6 py-3">{p.car_id}</td>
                  <td className="px-6 py-3">{p.user_id}</td>
                  <td className="px-6 py-3">{p.amount} €</td>
                  <td className="px-6 py-3">{p.payment_method}</td>
                  <td className="px-6 py-3">{p.status}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => editPayment(p)}
                      className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                      Përditëso
                    </button>
                    <button
                      onClick={() => deletePayment(p.Payment_id)}
                      className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                    >
                      Fshi
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  Nuk ka pagesa të regjistruara.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDashboard;

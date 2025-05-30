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

  // Merr pagesat
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

  // Fshi pagesë
  const deletePayment = async (Payment_id) => {
    if (!window.confirm("A jeni i sigurt që doni ta fshini këtë pagesë?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/payments/${Payment_id}`);
      fetchPayments();
    } catch (error) {
      console.error("Gabim gjatë fshirjes:", error.message);
    }
  };

  // Shto një pagesë të re
  // Funksioni për shtimin e një pagesë të re
const addPayment = async (e) => {
  e.preventDefault();

  // Sigurohu që fushat numerike dërgohen si numra (jo si string)
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
    setNewPayment({
      rental_id: "",
      car_id: "",
      user_id: "",
      amount: "",
      payment_method: "",
      status: "",
    });
  } catch (error) {
    console.error("Gabim gjatë shtimit të pagesës:", error.response ? error.response.data : error.message);
  }
};

  // Aktivizo formën e editimit me të dhënat e pagesës
  const editPayment = (payment) => {
    setIsEditing(true);
    setEditingPayment(payment);
    setNewPayment({
      rental_id: payment.rental_id,
      car_id: payment.car_id,
      user_id: payment.user_id,
      amount: payment.amount,
      payment_method: payment.payment_method,
      status: payment.status,
    });
    setIsModalOpen(true);
  };

  // Përditëso pagesën
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
      setNewPayment({
        rental_id: "",
        car_id: "",
        user_id: "",
        amount: "",
        payment_method: "",
        status: "",
      });
    } catch (error) {
      console.error("Gabim gjatë përditësimit të pagesës:", error.message);
    }
  };

  // Anulo editimin apo shtimin dhe pastro modal-in
  const cancelModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-[#2b386e]">Pagesat</h1>

      {/* Butoni për të shtuar pagesë */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#2b386e] text-white px-6 py-2 rounded mb-4"
      >
        Shto Pagesë
      </button>

      {/* Modal për shtimin dhe përditësimin e pagesës */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-1/3 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              {isEditing ? "Përditëso Pagesën" : "Shto Pagesën"}
            </h2>
            <form
              onSubmit={isEditing ? updatePayment : addPayment}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Rental ID"
                  value={newPayment.rental_id}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, rental_id: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Car ID"
                  value={newPayment.car_id}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, car_id: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="User ID"
                  value={newPayment.user_id}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, user_id: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, amount: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Payment Method"
                  value={newPayment.payment_method}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, payment_method: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Status"
                  value={newPayment.status}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, status: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="bg-[#2b386e] hover:bg-[#1a274d] text-white px-6 py-2 rounded"
                >
                  {isEditing ? "Përditëso" : "Shto"}
                </button>
                <button
                  type="button"
                  onClick={cancelModal}
                  className="bg-red-500 text-white px-6 py-2 rounded ml-4"
                >
                  Anulo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela e pagesave */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-[#2b386e] text-white">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Rental ID</th>
              <th className="py-2 px-4 border">Car ID</th>
              <th className="py-2 px-4 border">User ID</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Method</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.Payment_id} className="text-center border-t">
                <td className="py-2 px-4 border">{payment.Payment_id}</td>
                <td className="py-2 px-4 border">{payment.rental_id}</td>
                <td className="py-2 px-4 border">{payment.car_id}</td>
                <td className="py-2 px-4 border">{payment.user_id}</td>
                <td className="py-2 px-4 border">{payment.amount} €</td>
                <td className="py-2 px-4 border">{payment.payment_method}</td>
                <td className="py-2 px-4 border">{payment.status}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    onClick={() => editPayment(payment)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePayment(payment.Payment_id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Fshi
                  </button>
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
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

export default PaymentDashboard

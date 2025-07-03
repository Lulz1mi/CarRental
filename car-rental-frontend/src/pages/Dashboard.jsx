import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);  // <-- Shto navigate këtu

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 bg-gradient-to-r from-green-100 via-green-50 to-green-100 rounded-3xl shadow-xl min-h-screen">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-green-900 tracking-wide drop-shadow-md">
          Welcome Back, Admin
        </h1>
        <p className="text-green-700 mt-2">
          Here's a quick overview of your system's current status.
        </p>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          { title: "Total Users", value: 350, icon: "fas fa-users" },
          { title: "Total Cars", value: 120, icon: "fas fa-car" },
          { title: "Total Payments", value: "$8,500", icon: "fas fa-credit-card" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white text-green-900 p-8 rounded-2xl shadow-lg shadow-green-300 flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{stat.title}</h3>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
            <div className="text-green-700 text-4xl">
              <i className={stat.icon}></i>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-2xl shadow-lg shadow-green-300 mb-10">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">Monthly Overview</h2>
        <div className="flex justify-center">
          <div className="w-full lg:w-1/2">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-center text-green-600">Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white p-8 rounded-2xl shadow-lg shadow-green-300">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">Recent Transactions</h2>
        <table className="min-w-full divide-y divide-green-200 rounded-2xl overflow-hidden border border-green-300">
          <thead className="bg-green-100">
            <tr>
              {["Transaction ID", "User", "Amount", "Status", "Date"].map((header) => (
                <th
                  key={header}
                  className="py-3 px-6 text-left text-sm font-semibold text-green-700 uppercase tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-green-200 text-green-800">
            {[
              { id: "#1234", user: "John Doe", amount: "$120", status: "Paid", statusColor: "text-green-600", date: "05/14/2025" },
              { id: "#1235", user: "Jane Smith", amount: "$250", status: "Pending", statusColor: "text-yellow-500", date: "05/13/2025" },
              { id: "#1236", user: "Alice Johnson", amount: "$300", status: "Failed", statusColor: "text-red-600", date: "05/12/2025" },
            ].map((tx, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-green-50" : "bg-white"}>
                <td className="py-3 px-6 font-medium">{tx.id}</td>
                <td className="py-3 px-6">{tx.user}</td>
                <td className="py-3 px-6">{tx.amount}</td>
                <td className={`py-3 px-6 font-semibold ${tx.statusColor}`}>{tx.status}</td>
                <td className="py-3 px-6">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-8 rounded-2xl shadow-lg shadow-green-300 mt-10">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">Notifications</h2>
        <ul className="text-green-800">
          <li className="border-b border-green-200 py-3">New user registered: John Doe</li>
          <li className="border-b border-green-200 py-3">New payment received: $250</li>
          <li className="border-b border-green-200 py-3">Car fleet updated with 5 new cars.</li>
        </ul>
      </div>
    </div>
  );
}

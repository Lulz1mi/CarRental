export default function Dashboard() {
  return (
    <div className="bg-green-600 text-white p-10 min-h-screen">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold">Welcome Back, Admin</h1>
        <p className="text-lg mt-2">Here's a quick overview of your system's current status.</p>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          { title: "Total Users", value: 350, icon: "fas fa-users" },
          { title: "Total Cars", value: 120, icon: "fas fa-car" },
          { title: "Total Payments", value: "$8,500", icon: "fas fa-credit-card" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white text-green-600 p-8 rounded-xl shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{stat.title}</h3>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
            <div className="text-green-600 text-4xl">
              <i className={stat.icon}></i>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Monthly Overview</h2>
        <div className="flex justify-center">
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-center text-gray-600">Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Recent Transactions</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-6">Transaction ID</th>
              <th className="py-3 px-6">User</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[
              { id: "#1234", user: "John Doe", amount: "$120", status: "Paid", statusColor: "text-green-600", date: "05/14/2025" },
              { id: "#1235", user: "Jane Smith", amount: "$250", status: "Pending", statusColor: "text-yellow-500", date: "05/13/2025" },
              { id: "#1236", user: "Alice Johnson", amount: "$300", status: "Failed", statusColor: "text-red-600", date: "05/12/2025" },
            ].map((tx, idx) => (
              <tr key={idx}>
                <td className="py-3 px-6">{tx.id}</td>
                <td className="py-3 px-6">{tx.user}</td>
                <td className="py-3 px-6">{tx.amount}</td>
                <td className={`py-3 px-6 ${tx.statusColor}`}>{tx.status}</td>
                <td className="py-3 px-6">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg mt-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Notifications</h2>
        <ul className="text-gray-700">
          <li className="border-b border-gray-300 py-3">New user registered: John Doe</li>
          <li className="border-b border-gray-300 py-3">New payment received: $250</li>
          <li className="border-b border-gray-300 py-3">Car fleet updated with 5 new cars.</li>
        </ul>
      </div>
    </div>
  );
}

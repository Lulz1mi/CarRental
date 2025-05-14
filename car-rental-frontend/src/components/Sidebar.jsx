import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-8">CarRental</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/cars" className="hover:bg-gray-700 p-2 rounded">Makinat</Link>
        <Link to="/payments" className="hover:bg-gray-700 p-2 rounded">Payments</Link> {/* Link për Payments */}
      </nav>
    </div>
  );
}

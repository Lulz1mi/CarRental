import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const baseClass =
    "p-3 rounded transition-colors duration-300 flex items-center gap-2";

  return (
    <div className="w-64 h-screen bg-green-600 text-white flex flex-col p-6">
      <h1 className="text-3xl font-extrabold mb-10 tracking-wide">CarRental</h1>
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-green-600 text-white font-semibold"
              : "hover:bg-green-700 hover:text-green-200 text-gray-300"
          }
        >
          <div className={baseClass}>Dashboard</div>
        </NavLink>

        <NavLink
          to="/cars"
          className={({ isActive }) =>
            isActive
              ? "bg-green-600 text-white font-semibold"
              : "hover:bg-green-700 hover:text-green-200 text-gray-300"
          }
        >
          <div className={baseClass}>Makinat</div>
        </NavLink>

        <NavLink
          to="/payments"
          className={({ isActive }) =>
            isActive
              ? "bg-green-600 text-white font-semibold"
              : "hover:bg-green-700 hover:text-green-200 text-gray-300"
          }
        >
          <div className={baseClass}>Payments</div>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "bg-green-600 text-white font-semibold"
              : "hover:bg-green-700 hover:text-green-200 text-gray-300"
          }
        >
          <div className={baseClass}>Përdoruesit</div>
        </NavLink>
      </nav>
    </div>
  );
}

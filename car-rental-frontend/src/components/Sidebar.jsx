import { NavLink } from "react-router-dom";
import { CarFront } from "lucide-react";
import { FiHome, FiUsers, FiCreditCard, FiCalendar } from "react-icons/fi";
import { FaCarSide } from "react-icons/fa";

export default function Sidebar() {
  const baseClass =
    "px-4 py-3 rounded-2xl transition duration-300 flex items-center gap-3 text-lg tracking-wide font-semibold";

  const getLinkClass = ({ isActive }) =>
    `${baseClass} ${
      isActive
        ? "bg-white text-green-800 shadow-lg"
        : "text-green-900 hover:bg-white/10 hover:text-green-800"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-green-100 via-green-50 to-green-100 p-6 rounded-r-3xl shadow-xl flex flex-col">
      {/* Logo me ikonë veture */}
      <div className="flex items-center gap-3 mb-12 pl-1">
        <CarFront size={32} className="text-green-800 drop-shadow-md" />
        <h1 className="text-3xl font-extrabold tracking-wide text-green-900 drop-shadow-md">
          CarRental
        </h1>
      </div>

      {/* Navigimi */}
      <nav className="flex flex-col gap-4">
        <NavLink to="/dashboard" end className={getLinkClass}>
          <FiHome size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/cars" className={getLinkClass}>
          <FaCarSide size={20} />
          Makinat
        </NavLink>

        <NavLink to="/admin/bookings" className={getLinkClass}>
          <FiCalendar size={20} />
          Rezervimet
        </NavLink>

        <NavLink to="/payments" className={getLinkClass}>
          <FiCreditCard size={20} />
          Pagesat
        </NavLink>

        <NavLink to="/users" className={getLinkClass}>
          <FiUsers size={20} />
          Përdoruesit
        </NavLink>
      </nav>
    </aside>
  );
}

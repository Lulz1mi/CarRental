import { FiUser } from "react-icons/fi"; // Ikonë përdoruesi nga react-icons

export default function Navbar() {
  return (
    <div className="h-16 bg-green-600 shadow-lg flex items-center justify-between px-8 text-white">
      <h2 className="text-2xl font-extrabold tracking-wide drop-shadow-sm">
        Dashboard
      </h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-600 font-bold shadow-md">
            <FiUser size={20} />
          </div>
          {/* Shtojmë një pikë njoftimi të vogël */}
          <span className="absolute top-0 right-0 block w-3 h-3 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
        </div>
        <span className="text-sm font-semibold tracking-wide select-none">
          Përdoruesi
        </span>
      </div>
    </div>
  );
}

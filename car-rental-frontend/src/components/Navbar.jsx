export default function Navbar() {
  return (
    <div className="h-16 bg-green-600 shadow flex items-center justify-between px-6 text-white">
      <h2 className="text-2xl font-bold tracking-wide">Dashboard</h2>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-600 font-bold">
          P
        </div>
        <span className="text-sm font-medium">Përdoruesi</span>
      </div>
    </div>
  );
}

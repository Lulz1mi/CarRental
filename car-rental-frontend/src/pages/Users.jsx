import UsersTable from "../components/UsersTable";

export default function Users() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12 bg-gradient-to-r from-green-100 via-green-50 to-green-100 rounded-3xl shadow-xl">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-green-900 tracking-wide drop-shadow-md">
        
      </h1>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-green-300 bg-white">
        <UsersTable />
      </div>
    </div>
  );
}

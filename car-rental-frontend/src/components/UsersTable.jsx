import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së përdoruesve:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("A jeni i sigurt që doni ta fshini këtë përdorues?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-4">Tabela e Përdoruesve</h2>
      <table className="w-full table-auto bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Emri</th>
            <th className="p-2">Email</th>
            <th className="p-2">Telefoni</th>
            <th className="p-2">Roli</th>
            <th className="p-2">Veprime</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.Id} className="text-center border-t">
                <td className="p-2">{user.Id}</td>
                <td className="p-2">{user.Name}</td>
                <td className="p-2">{user.Email}</td>
                <td className="p-2">{user.Phone}</td>
                <td className="p-2">{user.Role}</td>
                <td className="p-2 flex justify-center gap-2">
                  {/* Shto butona për edit nëse do */}
                  <button
                    onClick={() => handleDelete(user.Id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Fshij
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">Nuk ka të dhëna për përdoruesit</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

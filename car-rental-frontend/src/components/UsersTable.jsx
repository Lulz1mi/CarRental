import { useEffect, useState } from "react";
import { getUsers, deleteUser, createUser } from "../services/userService";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (form.password !== form.password_confirmation) {
      setError("Fjalëkalimet nuk përputhen.");
      return;
    }

    try {
      await createUser(form);
      setMessage("Përdoruesi u shtua me sukses!");
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        role: "user",
      });
      setIsModalOpen(false);
      loadUsers();
    } catch (err) {
      console.error(err);
      setError("Ndodhi një gabim gjatë shtimit të përdoruesit.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 bg-gradient-to-r from-green-100 via-green-50 to-green-100 rounded-3xl shadow-xl">
      <h2 className="text-5xl font-extrabold mb-10 text-center text-green-900 tracking-wide drop-shadow-md">
        Menaxhimi i Përdoruesve
      </h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-8 py-3 rounded-xl shadow hover:from-green-600 hover:to-green-800 transition duration-300 hover:scale-105 active:scale-95"
        >
          Shto Përdorues
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
            <h3 className="text-2xl font-bold mb-6 text-green-800">
              Shto Përdorues të Ri
            </h3>

            {message && <p className="text-green-600 mb-4">{message}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Emri"
                value={form.name}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Telefoni"
                value={form.phone}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Fjalëkalimi"
                value={form.password}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                name="password_confirmation"
                placeholder="Konfirmo fjalëkalimin"
                value={form.password_confirmation}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="user">Përdorues</option>
                <option value="admin">Admin</option>
              </select>

              <div className="col-span-2 flex justify-end space-x-4 mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  Shto
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
                >
                  Anulo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-green-300 bg-white">
        <table className="min-w-full divide-y divide-green-200">
          <thead className="bg-green-100">
            <tr>
              {["ID", "Emri", "Email", "Telefoni", "Roli", "Veprime"].map(
                (title) => (
                  <th
                    key={title}
                    className="px-6 py-4 text-left text-sm font-semibold text-green-700 uppercase tracking-wider"
                  >
                    {title}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {users.length > 0 ? (
              users.map((user, idx) => (
                <tr
                  key={user.Id}
                  className={`transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-green-50"
                  }`}
                >
                  <td className="px-6 py-3">{user.Id}</td>
                  <td className="px-6 py-3">{user.Name}</td>
                  <td className="px-6 py-3">{user.Email}</td>
                  <td className="px-6 py-3">{user.Phone}</td>
                  <td className="px-6 py-3">{user.Role}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => handleDelete(user.Id)}
                      className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                    >
                      Fshij
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  Nuk ka të dhëna për përdoruesit
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

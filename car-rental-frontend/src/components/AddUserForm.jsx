// import React, { useState } from 'react';
// import axios from '../api/axios';

// const AddUserForm = ({ onSuccess }) => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     password_confirmation: '',
//     role: 'user'  // ose 'admin' nëse doni të krijoni admina
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');

//     if (form.password !== form.password_confirmation) {
//       setError('Fjalëkalimet nuk përputhen.');
//       return;
//     }

//     try {
//       await axios.post('/users', form);
//       setMessage('Përdoruesi u shtua me sukses!');
//       setForm({
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//         password_confirmation: '',
//         role: 'user'
//       });
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       console.error(err);
//       setError('Ndodhi një gabim gjatë shtimit të përdoruesit.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Shto Përdorues të Ri</h2>
//       {message && <p className="text-green-600 mb-2">{message}</p>}
//       {error && <p className="text-red-600 mb-2">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Emri"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Telefoni"
//           value={form.phone}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Fjalëkalimi"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         />
//         <input
//           type="password"
//           name="password_confirmation"
//           placeholder="Konfirmo fjalëkalimin"
//           value={form.password_confirmation}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         />
//         <select
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         >
//           <option value="user">Përdorues</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Shto Përdoruesin
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddUserForm;

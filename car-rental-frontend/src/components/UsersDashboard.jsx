import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/userService';

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then(response => setUsers(response.data))
      .catch(error => console.error("Gabim:", error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista e Përdoruesve</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emri</th>
            <th>Email</th>
            <th>Telefoni</th>
            <th>Roli</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.Id}>
              <td>{user.Id}</td>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>{user.Phone}</td>
              <td>{user.Role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersDashboard;

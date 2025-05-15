import axios from "axios";

// Merr të gjithë përdoruesit nga Laravel API
export const getUsers = () => {
  return axios.get("http://localhost:8000/api/users");
};

// (Opsional) Fshij përdorues me ID nga Laravel API (supozo që ke krijuar endpointin për DELETE)
export const deleteUser = (id) => {
  return axios.delete(`http://localhost:8000/api/users/${id}`);
};

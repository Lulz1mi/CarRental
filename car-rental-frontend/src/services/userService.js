// src/services/userService.js
import api from "../api/axios"; // përdor api me interceptor, jo axios direkt

export const getUsers = () => {
  return api.get("/users");
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export const createUser = (data) => {
  return api.post("/users", data);
};

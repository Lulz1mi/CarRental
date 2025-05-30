// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     // Ridrejto në home ose dashboard sipas rastit
//     return role === "admin" ? <Navigate to="/dashboard" /> : <Navigate to="/HomePage" />;
//   }

//   return children ? children : <Outlet />;
// };

// export default PrivateRoute;
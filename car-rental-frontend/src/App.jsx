import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import PaymentDashboard from "./pages/PaymentDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import HomePage from "./pages/HomePage";
import BookCars from "./pages/BookCars";
import LandingPage from "./pages/LandingPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutUs from "./pages/AboutUs";
import AdminBookingsPage from "./pages/AdminBookingsPage";

import PrivateRoute from "./components/PrivateRoute";

const Layout = ({ children }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="p-6 bg-gray-100 flex-grow">{children}</main>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Publike */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private me Layout */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute onlyAdmin={true}>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/cars"
          element={
            <PrivateRoute>
              <Layout>
                <Cars />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <PrivateRoute>
              <Layout>
                <PaymentDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Layout>
                <Users />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <PrivateRoute onlyAdmin={true}>
              <Layout>
                <AdminBookingsPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/aboutus"
          element={
            <PrivateRoute>
              <Layout>
                <AboutUs />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Private pa Layout */}
        <Route
          path="/book-cars"
          element={
            <PrivateRoute>
              <BookCars />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/homepage"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        {/* Redirect per gjithcka tjeter */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

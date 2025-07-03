import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";   // <-- LandingPage për rrugën "/"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import PaymentDashboard from "./pages/PaymentDashboard";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import BookCars from "./pages/BookCars";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import MyBookings from "./pages/MyBookings";
import AboutUs from "./pages/AboutUs";
import AdminBookingsPage from './pages/AdminBookingsPage';




function App() {
  return (
    <Router>
      <Routes>
        {/* Rrugët pa layout */}
        <Route path="/" element={<LandingPage />} />  {/* LandingPage për rrugën kryesore */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book-cars" element={<BookCars />} />
        <Route path="/Homepage" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/AboutUs" element={<AboutUs />} />




        {/* Rrugët me Sidebar + Navbar (MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cars" element={<Cars />} />
          <Route path="payments" element={<PaymentDashboard />} />
          {/* <Route path="profile" element={<Profile />} /> */}
          <Route path="users" element={<Users />} />
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import PaymentDashboard from "./pages/PaymentDashboard";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Users from "./pages/Users.jsx";
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rrugët jashtë layout-it (p.sh. Home, Login, Register) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rrugët që përdorin Sidebar + Navbar */}
        <Route
          path="/*"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-6 bg-gray-100 min-h-screen">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/cars" element={<Cars />} />
                    <Route path="/payments" element={<PaymentDashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/users" element={<Users />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

app.jsx
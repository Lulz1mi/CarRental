import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import PaymentDashboard from "./pages/PaymentDashboard";  // Importo PaymentDashboard

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="p-6 bg-gray-100 min-h-screen">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/payments" element={<PaymentDashboard />} /> {/* Shtuar rruga për PaymentDashboard */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

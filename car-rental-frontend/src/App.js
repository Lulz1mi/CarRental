import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cars from "./pages/Cars";
import CarInsert from "./components/CarInsert";
import CarUpdate from "./components/CarUpdate";

function App() {
  return (
    <Router>
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Përdor CarInsert dhe CarUpdate direkt në rrugë të ndryshme ose brenda Cars */}
        <Routes>
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/insert" element={<CarInsert />} />
          <Route path="/cars/update/:id" element={<CarUpdate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

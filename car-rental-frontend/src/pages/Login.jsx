import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import api from "../api/axios"; // Përdor api me interceptor

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Kontrollo nëse përdoruesi është i kyçur dhe ridrejto
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("role");
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/HomePage");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const token = response.data.access_token;
      const role = response.data.user.role;
      const name = response.data.user.name;
      const userEmail = response.data.user.email;

      // Ruaj të dhënat në localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify({ name, email: userEmail }));

      // Navigo sipas rolit
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/HomePage");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Email ose fjalëkalim i pasaktë!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-600 relative overflow-hidden px-4">
      <img
        src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80"
        alt="Car background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-green-600 bg-opacity-80 backdrop-blur-sm" />

      <div className="z-10 bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md animate-fadeIn">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 flex items-center justify-center rounded-full shadow text-4xl">
            <FaCarSide />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-green-600">Kyçu në CarRental</h2>
          <p className="text-sm text-gray-500 text-center">
            Mirë se vini — vazhdo me kredencialet e tua
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Shkruaj email-in"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Fjalëkalimi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Shkruaj fjalëkalimin"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {error && (
            <p className="text-red-600 text-center text-sm animate-shake">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Kyçu
          </button>

          <p className="text-sm text-center text-gray-600">
            Nuk ke llogari?{" "}
            <Link to="/register" className="text-green-600 hover:underline font-medium">
              Regjistrohu këtu
            </Link>
          </p>

        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2025 CarRental • Platformë për menaxhim të automjeteve
        </p>
      </div>
    </div>
  );
}

export default Login;

import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

// ================= REGISTER =================
function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post("/auth/register", {
        email,
        password,
      });

      setMsg(res.data.message);

      // Automatically go to OTP verification page
      navigate("/verify");
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
      console.log(err.response?.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit}>Register</button>

      <p>{msg}</p>
    </div>
  );
}

// ================= VERIFY OTP =================
function Verify() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post("/auth/verify-otp", {
        email,
        otp,
      });

      setMsg(res.data.message);

      // Automatically go to Login page
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Verification failed");
      console.log(err.response?.data);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={submit}>Verify</button>

      <p>{msg}</p>
    </div>
  );
}

// ================= LOGIN =================
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = async () => {
    try {
      await axios.post("/auth/login", {
        email,
        password,
      });

      // Automatically go to Dashboard
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
      console.log(err.response?.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <p>{msg}</p>
    </div>
  );
}

// ================= DASHBOARD =================
function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{user.email}</p>
    </div>
  );
}

// ================= APP ROUTES =================
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

// ================= RENDER APP =================
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
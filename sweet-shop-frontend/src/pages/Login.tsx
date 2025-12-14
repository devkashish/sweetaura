import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const navigate = useNavigate();
  const { user, setAuth } = useAuth(); // ✅ must exist in AuthContext

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Redirect logged-in users away from login
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      setAuth(res.data.user, res.data.token, remember);
      toast.success("Welcome back to Sweetaura 🍬");
      navigate("/");
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-heading text-center mb-6">Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg mb-4"
          required
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg pr-12"
            required
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-3 text-gray-500 hover:text-rose-500"
          >
            {show ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-2 text-sm mb-6">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="accent-rose-400"
          />
          Remember me
        </label>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3 rounded-full font-semibold transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4 text-sm">
          No account?{" "}
          <Link to="/register" className="text-rose-500 font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

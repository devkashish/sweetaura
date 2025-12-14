import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sweets from "./pages/Sweets";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* ✅ Toast just below navbar */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            marginTop: "7rem", // navbar height
            borderRadius: "12px",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sweets" element={<Sweets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

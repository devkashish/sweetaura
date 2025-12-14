import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : "";

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="bg-rose-400 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 text-2xl font-heading font-semibold">
          <div className="w-10 h-10   flex items-center justify-center">
            <img src={logo} alt="Sweetaura" className="w-100 h-100 object-contain" />
          </div>
          SweetAura
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          <NavLink to="/">Home</NavLink>
          <NavLink to="/sweets">Sweets</NavLink>

         {/* Admin Panel – ADMIN ONLY */}
{user?.role === "ADMIN" && (
  <NavLink
    to="/admin"
    className="hover:underline underline-offset-4 font-medium"
  >
    Admin Panel
  </NavLink>
)}


          {/* Auth Section */}
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink
  to="/register"
  className="hover:underline underline-offset-4 font-medium"
>
  Register
</NavLink>

            </>
          )}

          {user && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-white text-rose-500 font-semibold flex items-center justify-center"
              >
                {initials}
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 w-52 bg-white text-gray-800 rounded-xl shadow-lg"
                  >
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                      className="w-full  px-4 py-3 text-sm text-center hover:bg-rose-50 text-red-500"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-rose-400 px-6 pb-6"
          >
            <div className="flex flex-col gap-4 text-sm font-medium">

              <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
              <NavLink to="/sweets" onClick={() => setMenuOpen(false)}>Sweets</NavLink>

              {user?.role === "ADMIN" && (
                <NavLink
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  
                >
                  Admin Panel
                </NavLink>
              )}
              

              {!user && (
                <>
                  <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                   
                  >
                    Register
                  </NavLink>
                </>
              )}

              {user && (
                <>
                  <div className="border-t border-rose-300 pt-4">
                    <p className="text-sm font-semibold">{user.email}</p>
                    <p className="text-xs text-rose-100">{user.role}</p>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      navigate("/login");
                    }}
                    className="bg-white text-rose-500 px-4 py-2 text-centerrounded-full font-semibold"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

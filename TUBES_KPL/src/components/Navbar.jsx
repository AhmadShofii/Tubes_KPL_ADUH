import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart, FiMapPin } from "react-icons/fi";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <motion.nav className="navbar" initial={{ y: -70 }} animate={{ y: 0 }}>
      {/* FOODORA -> Ke Landing Page (/) */}
      <Link to="/" className="logo-link">
        <h1 className="logo">Foodora</h1>
      </Link>

      <div className="nav-links">
        {/* HOME -> Ke Dashboard (/beranda) */}
        <Link to="/beranda" className={location.pathname === "/beranda" ? "active" : ""}>
          Home
        </Link>
        <Link to="/promo">Promo</Link>
        <Link to="/history">History</Link>
      </div>

      <div className="nav-right">
        <div className="icon-group">
          <FiShoppingCart className="nav-icon" />
          <FiMapPin className="nav-icon" />
        </div>
        <button className="register-btn">Register</button>
      </div>
    </motion.nav>
  );
}

export default Navbar;
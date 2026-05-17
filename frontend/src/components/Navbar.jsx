import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart, FiMapPin } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Link to="/" className="logo-link">
        <h1 className="logo">Foodora</h1>
      </Link>

      <div className="nav-links">
        <Link
          to="/beranda"
          className={location.pathname === "/beranda" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/promo"
          className={location.pathname === "/promo" ? "active" : ""}
        >
          Promo
        </Link>

        <Link
          to="/history"
          className={location.pathname === "/history" ? "active" : ""}
        >
          History
        </Link>
      </div>

      <div className="nav-right">
        <div className="navbar-icon-group">
          <Link
            to="/keranjang"
            className="navbar-cart-link"
            aria-label="Buka keranjang"
          >
            <FiShoppingCart className="nav-icon" />

            {totalItems > 0 && (
              <span className="navbar-cart-badge">{totalItems}</span>
            )}
          </Link>

          <button
            type="button"
            className="navbar-location-button"
            aria-label="Lihat lokasi"
          >
            <FiMapPin className="nav-icon" />
          </button>
        </div>

        <div className="auth-btns">
          <button type="button" className="login-btn">
            Login
          </button>

          <button type="button" className="register-btn">
            Register
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
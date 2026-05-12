import { Link, useLocation } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";

/**
 * Navbar — navigasi utama Foodora.
 * Props:
 *  - cartCount: jumlah total item di keranjang (untuk badge)
 */
export default function Navbar({ cartCount = 0 }) {
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Promos", to: "/promos" },
    { label: "History", to: "/history" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#1A2E1A]">
          Foodora
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`hover:text-[#1A2E1A] transition-colors ${
                  location.pathname === link.to
                    ? "text-[#1A2E1A] font-semibold"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Cart + Avatar */}
        <div className="flex items-center gap-4">
          <Link
            to="/keranjang"
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Keranjang belanja"
          >
            <ShoppingBasket size={22} className="text-[#1A2E1A]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B23B15] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-amber-200 flex items-center justify-center">
            <span className="text-sm font-bold text-amber-800">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

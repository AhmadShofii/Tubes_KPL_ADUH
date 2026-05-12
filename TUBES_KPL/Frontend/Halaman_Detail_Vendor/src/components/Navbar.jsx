import { MapPin, ShoppingCart } from "lucide-react";

export default function Navbar({ cartCount, onCartOpen }) {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <span className="text-2xl font-bold text-[#1A2E1A]">Foodora</span>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <li>
            <a href="#" className="hover:text-[#1A2E1A] transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#1A2E1A] transition-colors">
              Promos
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#1A2E1A] transition-colors">
              History
            </a>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <MapPin size={20} className="text-gray-500 hidden md:block" />

          {/* Cart icon for mobile */}
          <button
            onClick={onCartOpen}
            className="relative md:hidden p-2 rounded-full bg-gray-100"
            aria-label="Open cart"
          >
            <ShoppingCart size={20} className="text-[#1A2E1A]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B23B15] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-amber-200 overflow-hidden flex items-center justify-center">
            <span className="text-sm font-bold text-amber-800">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

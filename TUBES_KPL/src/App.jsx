import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initialCartItems } from "../keranjang/data/cartData.js";

// Import Components
import Navbar from "../keranjang/components/Navbar.jsx";

// Import Pages
import Home from "./pages/Home";
import Beranda from "./pages/Beranda";
import Promo from "./pages/Promo";
import History from "./pages/History";
import VendorList from "./pages/VendorList";
import ResetPassword from "./pages/ResetPassword";
import CartPage from "../keranjang/index.jsx";
import CheckoutPage from "../checkout/index.jsx";

// Halaman placeholder jika diperlukan
function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFCF0] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#1A2F1A] mb-2">Foodora</h1>
        <p className="text-gray-500 mb-6">Fresh Heritage. Delivered.</p>
        <a
          href="/keranjang"
          className="bg-[#1A2F1A] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#2d4a2d] transition-colors"
        >
          Lihat Keranjang
        </a>
      </div>
    </div>
  );
}

function App() {
  // Cart count di-lift ke App agar Navbar bisa menampilkan badge
  const [cartCount] = useState(
    initialCartItems.reduce((sum, item) => sum + item.qty, 0)
  );

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />
      <Routes>
        {/* Route utama */}
        <Route path="/" element={<HomePage />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/list-vendor" element={<VendorList />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/history" element={<History />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Route Keranjang & Checkout */}
        <Route path="/keranjang" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
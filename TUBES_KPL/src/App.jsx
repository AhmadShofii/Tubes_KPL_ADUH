import { BrowserRouter, Routes, Route } from "react-router-dom";
import VendorDetail from "./pages/vendor/VendorDetail";
import CartPage from "./pages/cart/CartPage";

// Halaman placeholder untuk route lain 
function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFCF0] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#1A2E1A] mb-2">Foodora</h1>
        <p className="text-gray-500 mb-6">Fresh Heritage. Delivered.</p>
        <a href="/cart" className="text-blue-500 underline">Lihat Keranjang</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vendor/:id" element={<VendorDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

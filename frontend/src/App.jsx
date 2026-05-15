import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Beranda from "./pages/Beranda.jsx";
import Promo from "./pages/Promo.jsx";
import History from "./pages/History.jsx";
import VendorList from "./pages/VendorList.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import VendorDetailPage from "./pages/VendorDetailPage.jsx";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/list-vendor" element={<VendorList />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/history" element={<History />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/keranjang" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/vendor-detail" element={<VendorDetailPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
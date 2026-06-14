import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import PaymentQris from "./pages/PaymentQris.jsx";
import VendorDetailPage from "./pages/VendorDetailPage.jsx";

import LoginPage from "./pages/login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPasswordPage from "./pages/ForgotPassword.jsx";
import Verify from "./pages/Verify.jsx";
import PasswordSuccess from "./pages/PasswordSuccess.jsx";
import HistoriPesanan from "./pages/HistoriPesanan.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";

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

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/success" element={<PasswordSuccess />} />
          <Route path="/histori-pesanan" element={<HistoriPesanan />} />
          <Route path="/payment-qris" element={<PaymentQris />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          <Route path="/keranjang" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/vendor-detail" element={<VendorDetailPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import PasswordSuccess from "./pages/PasswordSuccess";
import HistoriPesanan from "./pages/HistoriPesanan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/success" element={<PasswordSuccess />} />

        {/* Halaman histori pesanan hanya bisa diakses lewat URL ini */}
        <Route path="/HistoriPesanan" element={<HistoriPesanan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
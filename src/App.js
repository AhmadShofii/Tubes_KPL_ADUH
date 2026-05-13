import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import PasswordSuccess from "./pages/PasswordSuccess";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/success" element={<PasswordSuccess />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
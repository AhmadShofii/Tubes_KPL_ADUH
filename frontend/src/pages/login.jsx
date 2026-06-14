import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { loginUser, loginWithGoogle } from "../api/authApi";
import "../styles/login.css";

const loginImages = [
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200",
    title: "Fresh Heritage",
    subtitle: "Masuk dan nikmati pilihan katering terbaik dari Foodora.",
  },
  {
    src: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200",
    title: "Comfort Meals",
    subtitle: "Hidangan rumahan berkualitas, siap dikirim ke alamatmu.",
  },
  {
    src: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?q=80&w=1200",
    title: "Healthy Choice",
    subtitle: "Temukan menu sehat, lezat, dan praktis untuk harimu.",
  },
  {
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200",
    title: "Fast Delivery",
    subtitle: "Pesananmu diproses cepat dan dikirim dengan aman.",
  },
];

export default function LoginPage() {
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % loginImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setMessageType("");
    setLoading(true);

    try {
      const result = await loginUser(email, password);

      localStorage.setItem("foodora_user", JSON.stringify(result.data));

      setMessage(result.message || "Login berhasil.");
      setMessageType("success");

      setTimeout(() => {
        navigate("/beranda");
      }, 700);
    } catch (error) {
      setMessage(error.message || "Login gagal.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSuccess(credentialResponse) {
    setMessage("");
    setMessageType("");

    if (!credentialResponse.credential) {
      setMessage("Credential Google tidak ditemukan.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const result = await loginWithGoogle(credentialResponse.credential);

      localStorage.setItem("foodora_user", JSON.stringify(result.data));

      setMessage(result.message || "Login Google berhasil.");
      setMessageType("success");

      setTimeout(() => {
        navigate("/beranda");
      }, 700);
    } catch (error) {
      setMessage(error.message || "Login Google gagal.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleError() {
    setMessage("Login Google gagal. Silakan coba lagi.");
    setMessageType("error");
  }

  const currentImage = loginImages[activeImage];

  return (
    <div className="login-page-wrapper">
      <main className="login-main-content">
        <div className="login-card-flex">
          <section className="login-visual-section">
            <div className="login-image-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage.src}
                  src={currentImage.src}
                  alt={currentImage.title}
                  className="login-food-img"
                  initial={{ opacity: 0, scale: 1.08, x: -32 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.96, x: 32 }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                />
              </AnimatePresence>

              <div className="login-image-gradient" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.title}
                  className="login-image-overlay"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <span>Foodora</span>
                  <h2>{currentImage.title}</h2>
                  <p>{currentImage.subtitle}</p>
                </motion.div>
              </AnimatePresence>

              <div className="login-image-dots">
                {loginImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={activeImage === index ? "active" : ""}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Pilih gambar ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          <motion.section
            className="login-form-card"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h2>Masuk ke Akun</h2>

            <p className="login-subtitle">
              Nikmati hidangan warisan terbaik langsung di pintu Anda.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="login-input-group">
                <label>Email</label>

                <div className="login-input-wrapper">
                  <input
                    type="email"
                    placeholder="contoh@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="login-input-group">
                <label>Kata Sandi</label>

                <div className="login-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="login-eye-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label="Tampilkan atau sembunyikan password"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="login-row-actions">
                <label className="login-remember">
                  <input type="checkbox" />
                  Ingat Saya
                </label>

                <Link to="/forgot-password" className="forgot-link">
                  Lupa Password?
                </Link>
              </div>

              <button
                className="login-submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Masuk Sekarang"}
              </button>

              <div className="login-divider">
                <span></span>
                <p>atau masuk dengan</p>
                <span></span>
              </div>

              <div className="google-login-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  text="signin_with"
                  shape="pill"
                  width="100%"
                />
              </div>

              {message && (
                <div className={`message ${messageType}`}>{message}</div>
              )}

              <p className="login-footer-text">
                Belum punya akun? <Link to="/register">Daftar Sekarang</Link>
              </p>
            </form>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
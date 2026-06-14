import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/Register.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { registerUser, loginWithGoogle } from "../api/authApi";

const registerImages = [
  {
    src: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200",
    title: "Fresh Heritage",
    subtitle: "Nikmati hidangan terbaik dengan cita rasa rumahan.",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200",
    title: "Foodora Choice",
    subtitle: "Pilihan katering modern untuk kebutuhan harianmu.",
  },
  {
    src: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?q=80&w=1200",
    title: "Healthy Meals",
    subtitle: "Menu lezat, praktis, dan tetap berkualitas.",
  },
  {
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200",
    title: "Delivered Fast",
    subtitle: "Pesanan siap diantar langsung ke alamatmu.",
  },
];

function Register() {
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    password: "",
    confirmPassword: "",
    alamat: "",
  });

  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Register";

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % registerImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!form.nama || !form.email || !form.password) {
      setMessage("Nama, email, dan password wajib diisi.");
      setMessageType("error");
      return;
    }

    if (form.password.length < 6) {
      setMessage("Password minimal 6 karakter.");
      setMessageType("error");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Konfirmasi password tidak sama.");
      setMessageType("error");
      return;
    }

    if (!agree) {
      setMessage("Kamu harus menyetujui syarat dan ketentuan.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser({
        nama: form.nama,
        email: form.email,
        password: form.password,
        no_hp: form.no_hp,
        alamat: form.alamat,
      });

      setMessage(result.message || "Registrasi berhasil.");
      setMessageType("success");

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (error) {
      setMessage(error.message || "Registrasi gagal.");
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

      setMessage(result.message || "Akun Google berhasil digunakan.");
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

  const currentImage = registerImages[activeImage];

  return (
    <div className="register-page">
      <main className="register-main">
        <section className="register-left">
          <div className="register-image-card">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.title}
                className="register-food-img"
                initial={{ opacity: 0, scale: 1.08, x: 35 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -35 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
              />
            </AnimatePresence>

            <div className="register-image-gradient" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage.title}
                className="register-image-overlay"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <span>Foodora</span>
                <h2>{currentImage.title}</h2>
                <p>{currentImage.subtitle}</p>
              </motion.div>
            </AnimatePresence>

            <div className="register-image-dots">
              {registerImages.map((_, index) => (
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

        <section className="register-right">
          <motion.div
            className="form-wrapper"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h1>Daftar Akun</h1>

            <p className="subtitle">
              Buat akun baru untuk memulai menggunakan <br />
              aplikasi <span>Foodora</span>
            </p>

            <form onSubmit={handleSubmit}>
              <label>Nama Lengkap</label>
              <div className="input-box">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama lengkap"
                  value={form.nama}
                  onChange={handleChange}
                />
              </div>

              <label>Email</label>
              <div className="input-box">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Masukkan Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <label>No. Handphone</label>
              <div className="input-box">
                <FaPhone className="input-icon" />
                <input
                  type="text"
                  name="no_hp"
                  placeholder="Masukkan nomor handphone"
                  value={form.no_hp}
                  onChange={handleChange}
                />
              </div>

              <label>Alamat</label>
              <div className="input-box">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  name="alamat"
                  placeholder="Masukkan alamat"
                  value={form.alamat}
                  onChange={handleChange}
                />
              </div>

              <label>Kata Sandi</label>
              <div className="input-box">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Masukkan kata sandi"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <label>Konfirmasi Kata Sandi</label>
              <div className="input-box">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Masukkan ulang kata sandi"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="terms">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <p>
                  Saya setuju dengan <span>Syarat & Ketentuan</span> dan{" "}
                  <span>Kebijakan Privasi</span>
                </p>
              </div>

              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Daftar"}
              </button>

              {message && (
                <div className={`message ${messageType}`}>{message}</div>
              )}
            </form>

            <div className="divider">
              <span></span>
              <p>Atau daftar dengan</p>
              <span></span>
            </div>

            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signup_with"
                shape="pill"
                width="100%"
              />
            </div>

            <p className="login-text">
              Sudah memiliki akun? <Link to="/login">Masuk disini</Link>
            </p>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default Register;
import "./Register.css";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

function Register() {
  return (
    <div className="register-page">
      <main className="register-main">
        {/* GAMBAR KIRI */}
        <section className="register-left">
          <img
            src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200"
            alt="Foodora"
            className="register-food-img"
          />
        </section>

        {/* FORM KANAN */}
        <section className="register-right">
          <div className="form-wrapper">
            <h1>Daftar Akun</h1>

            <p className="subtitle">
              Buat akun baru untuk memulai menggunakan <br />
              aplikasi <span>Foodora</span>
            </p>

            <form>
              <label>Nama Lengkap</label>
              <div className="input-box">
                <FaUser className="input-icon" />
                <input type="text" placeholder="Masukkan nama lengkap" />
              </div>

              <label>Email</label>
              <div className="input-box">
                <FaEnvelope className="input-icon" />
                <input type="email" placeholder="Masukkan Email" />
              </div>

              <label>No. Handphone</label>
              <div className="input-box">
                <FaPhone className="input-icon" />
                <input type="text" placeholder="Masukkan nomor handphone" />
              </div>

              <label>Kata Sandi</label>
              <div className="input-box">
                <FaLock className="input-icon" />
                <input type="password" placeholder="Masukkan kata sandi" />
              </div>

              <label>Konfirmasi Kata Sandi</label>
              <div className="input-box">
                <FaLock className="input-icon" />
                <input type="password" placeholder="Masukkan ulang kata sandi" />
              </div>

              <div className="terms">
                <input type="checkbox" />
                <p>
                  Saya setuju dengan <span>Syarat & Ketentuan</span> dan{" "}
                  <span>Kebijakan Privasi</span>
                </p>
              </div>

              <button type="button" className="register-button">
                Daftar
              </button>
            </form>

            <div className="divider">
              <span></span>
              <p>Atau daftar dengan</p>
              <span></span>
            </div>

            <button className="social-button">
              <FcGoogle className="social-icon" />
              Daftar dengan google
            </button>

            <button className="social-button">
              <FaFacebook className="facebook-icon" />
              Daftar dengan facebook
            </button>

            <p className="login-text">
              Sudah memiliki akun? <span>Masuk disini</span>
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-col brand">
          <h3>Foodora</h3>
          <p>
            Membawa kekayaan cita rasa warisan Indonesia langsung ke meja makan
            Anda dengan standar kebersihan tertinggi.
          </p>
        </div>

        <div className="footer-col">
          <h4>PERUSAHAAN</h4>
          <p>About Us</p>
          <p>Partner with Us</p>
          <p>Terms of Service</p>
        </div>

        <div className="footer-col">
          <h4>DUKUNGAN</h4>
          <p>Help Center</p>
          <p>Contact</p>
          <p>Privacy Policy</p>
        </div>

        <div className="footer-col">
          <h4>IKUTI KAMI</h4>
          <div className="social-small">
            <span>↗</span>
            <span>✉</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>©2024 Foodora Indonesia. Fresh Heritage. Delivered.</p>
          <p>🌐 Indonesia &nbsp;&nbsp; IDR</p>
        </div>
      </footer>
    </div>
  );
}

export default Register;
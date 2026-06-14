import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiSmartphone,
  FiCheckCircle,
  FiLock,
  FiArrowRight,
  FiShield,
  FiKey,
  FiClock,
} from "react-icons/fi";
import { forgotPassword } from "../api/authApi";
import "../styles/ForgotPassword.css";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [channel, setChannel] = useState("email");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Lupa Password - Foodora";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const cleanValue = value.trim();

    if (!cleanValue) {
      setMessage(
        channel === "email"
          ? "Alamat email wajib diisi."
          : "Nomor WhatsApp wajib diisi."
      );
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      await forgotPassword({
        channel,
        value: cleanValue,
      });

      navigate("/verify", {
        state: {
          channel,
          value: cleanValue,
        },
      });
    } catch (error) {
      setMessage(error.message || "Gagal mengirim kode pemulihan.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page-wrapper">
      <main className="forgot-main-content">
        <div className="forgot-card-flex">
          <section className="forgot-form-card">
            <div className="forgot-icon-box">
              <FiLock />
            </div>

            <span className="forgot-badge">ACCOUNT RECOVERY</span>

            <h2>Lupa Password?</h2>

            <p className="forgot-subtitle">
              Tenang, kami bantu amankan akun Foodora kamu. Pilih metode
              verifikasi, lalu masukkan email atau nomor WhatsApp untuk
              menerima kode OTP.
            </p>

            <div className="forgot-channel-tabs">
              <button
                type="button"
                className={channel === "email" ? "active" : ""}
                onClick={() => {
                  setChannel("email");
                  setValue("");
                  setMessage("");
                }}
              >
                <FiMail />
                Email
              </button>

              <button
                type="button"
                className={channel === "whatsapp" ? "active" : ""}
                onClick={() => {
                  setChannel("whatsapp");
                  setValue("");
                  setMessage("");
                }}
              >
                <FiSmartphone />
                WhatsApp
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="forgot-input-group">
                <label>
                  {channel === "email" ? "Alamat Email" : "Nomor WhatsApp"}
                </label>

                <div className="forgot-input-wrapper">
                  {channel === "email" ? <FiMail /> : <FiSmartphone />}

                  <input
                    type={channel === "email" ? "email" : "tel"}
                    placeholder={
                      channel === "email"
                        ? "nama@contoh.com"
                        : "08xxxxxxxxxx"
                    }
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="forgot-note-box">
                <label>PROSES PEMULIHAN</label>

                <ul>
                  <li>
                    <FiCheckCircle className="forgot-check" />
                    Masukkan data akun yang terdaftar.
                  </li>

                  <li>
                    <FiCheckCircle className="forgot-check" />
                    Kami kirimkan kode OTP untuk verifikasi.
                  </li>

                  <li>
                    <FiCheckCircle className="forgot-check" />
                    Setelah valid, kamu bisa membuat password baru.
                  </li>
                </ul>
              </div>

              <button
                className="forgot-submit-btn ready"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  "Mengirim Kode..."
                ) : (
                  <>
                    Kirim Kode OTP
                    <FiArrowRight />
                  </>
                )}
              </button>

              {message && (
                <div className={`message ${messageType}`}>{message}</div>
              )}

              <Link to="/login" className="back-login">
                ← Kembali ke Login
              </Link>

              <p className="bottom-text">
                Butuh Bantuan? <a href="#">Hubungi Kami</a>
              </p>
            </form>
          </section>

          <aside className="forgot-info-panel">
            <div className="forgot-info-glow"></div>

            <div className="forgot-info-content">
              <div className="forgot-shield-box">
                <FiShield />
              </div>

              <span>Secure Reset</span>

              <h3>Pemulihan Akun Aman & Cepat</h3>

              <p>
                Kode OTP hanya berlaku sementara. Jangan bagikan kode verifikasi
                kepada siapa pun.
              </p>

              <div className="forgot-info-list">
                <div>
                  <FiKey />
                  <section>
                    <h4>OTP Verification</h4>
                    <p>Kode verifikasi dikirim sesuai metode pilihanmu.</p>
                  </section>
                </div>

                <div>
                  <FiClock />
                  <section>
                    <h4>Fast Recovery</h4>
                    <p>Reset password bisa dilakukan dengan cepat dan aman.</p>
                  </section>
                </div>

                <div>
                  <FiCheckCircle />
                  <section>
                    <h4>Secure Account</h4>
                    <p>Akun tetap terlindungi selama proses pemulihan.</p>
                  </section>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
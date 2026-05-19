import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import "../styles/ForgotPassword.css";

const forgotPassword = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.value) {
        resolve({
          message: "Link pemulihan berhasil dikirim",
        });
      } else {
        reject({
          message: "Masukkan email atau nomor WhatsApp yang valid",
        });
      }
    }, 1000);
  });
};

export default function ForgotPasswordPage() {
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
    setLoading(true);

    try {
      const result = await forgotPassword({
        channel,
        value,
      });

      setMessage(result.message);
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout pageTitle="Lupa Password">
      <div className="forgot-page-wrapper">

        <main className="forgot-main-content">
          <div className="forgot-card-flex">

            <div className="forgot-form-card">

              <h2>Lupa Sandi?</h2>

              <p className="forgot-subtitle">
                Jangan khawatir. Masukkan detail akun di bawah dan kami akan
                mengirimkan link pemulihan.
              </p>

              <form onSubmit={handleSubmit}>

                <div className="forgot-input-group">
                  <label>
                    {channel === "email"
                      ? "Masukkan Email"
                      : "Masukkan Nomor WhatsApp"}
                  </label>

                  <div className="forgot-input-wrapper">
                    <input
                      type={channel === "email" ? "email" : "tel"}
                      placeholder={
                        channel === "email"
                          ? "nama@contoh.com"
                          : "08xxxxxxxxxx"
                      }
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  className="forgot-submit-btn ready"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Mengirim..."
                    : "Kirim Link Pemulihan →"}
                </button>

                {message && (
                  <div className={`message ${messageType}`}>
                    {message}
                  </div>
                )}

                <Link to="/login" className="back-login">
                  ← Kembali ke Login
                </Link>

                <p className="bottom-text">
                  Butuh Bantuan? <a href="#">Hubungi Kami</a>
                </p>

              </form>
            </div>

          </div>
        </main>

      </div>
    </AuthLayout>
  );
}
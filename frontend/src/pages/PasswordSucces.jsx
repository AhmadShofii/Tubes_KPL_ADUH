import "../styles/PasswordSuccess.css";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PasswordSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <header className="success-header">
        <h2>Foodora</h2>
      </header>

      <main className="success-main">
        <section className="success-left">
          <div className="success-image-card">
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200"
              alt="Authentic Flavors"
              className="success-food-img"
            />

            <div className="success-overlay"></div>

            <div className="success-image-text">
              <h1>Authentic Flavors Await</h1>
              <p>
                Your journey back to the heart of Indonesia's culinary heritage
                starts here.
              </p>
            </div>
          </div>
        </section>

        <section className="success-right">
          <div className="success-card">
            <div className="check-circle-outer">
              <div className="check-circle-inner">
                <FaCheck className="check-icon" />
              </div>
            </div>

            <h1>Password Updated</h1>

            <p className="success-desc">
              Password anda berhasil diubah. Gunakan
              <br />
              password baru untuk login kembali.
            </p>

            <button
              className="login-now-btn"
              onClick={() => navigate("/HistoriPesanan")}
            >
              Login Now
              <FaArrowRight className="login-arrow" />
            </button>

            <p className="secure-text">
              Bukan anda yg mengubah password?
              <br />
              <span>Amankan akun anda</span>
            </p>

            <button className="back-home-btn" onClick={() => navigate("/")}>
              Back to home
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PasswordSuccess;
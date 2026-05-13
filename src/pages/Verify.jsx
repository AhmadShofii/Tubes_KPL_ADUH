import "./Verify.css";
import { useRef } from "react";
import { FaWhatsapp, FaRegEnvelope, FaArrowRight } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";

function Verify() {
    const otpRefs = useRef([]);

const handleOtpChange = (e, index) => {
  const value = e.target.value;

  if (!/^[0-9]?$/.test(value)) {
    e.target.value = "";
    return;
  }

  if (value && index < 5) {
    otpRefs.current[index + 1].focus();
  }
};

const handleKeyDown = (e, index) => {
  if (e.key === "Backspace" && !e.target.value && index > 0) {
    otpRefs.current[index - 1].focus();
  }
};
  return (
    <div className="verify-page">
      {/* HEADER */}
      <header className="verify-header">
        <h2>Foodora</h2>
      </header>

      {/* CONTENT */}
      <main className="verify-main">
        {/* LEFT IMAGE */}
        <section className="verify-left">
          <img
            src="https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200"
            alt="Indonesian Food"
            className="verify-food-img"
          />
        </section>

        {/* RIGHT FORM */}
        <section className="verify-right">
          <div className="verify-box">
            <h1>Verify Your Account</h1>

            <p className="verify-subtitle">
              Kami telah mengirim kode 6 digit ke perangkat terdaftar Anda.
              <br />
              Masukkan kode di bawah untuk melanjutkan.
            </p>

            <p className="method-title">Pilih metode verifikasi :</p>

            <div className="method-wrapper">
              <button className="method-card">
                <FaWhatsapp className="method-icon" />
                <span>WhatsApp</span>
              </button>

              <button className="method-card">
                <FaRegEnvelope className="method-icon" />
                <span>Email</span>
              </button>
            </div>

            <div className="otp-wrapper">
            {[0, 1, 2, 3, 4, 5].map((item, index) => (
                <input
                key={item}
                maxLength="1"
                ref={(el) => (otpRefs.current[index] = el)}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
            </div>

            <div className="resend-row">
              <p className="timer-text">
                <MdOutlineTimer className="timer-icon" />
                Resend in <span>00:30</span>
              </p>

              <p className="resend-code">Resend Code</p>
            </div>

            <button className="verify-button">
              Verify Now
              <FaArrowRight className="arrow-icon" />
            </button>

            <div className="verify-divider"></div>

            <div className="info-section">
              <div className="info-item">
                <IoShieldCheckmark className="info-icon" />
                <p>
                  Your security is our priority. We use end-to-end encryption
                  for all verification processes.
                </p>
              </div>

              <div className="info-item">
                <BiSupport className="info-icon" />
                <p>
                  Having trouble? <span>Contact our support</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Verify;
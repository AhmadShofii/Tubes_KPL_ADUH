import "../styles/Verify.css";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp, FaRegEnvelope, FaArrowRight, FaRedoAlt } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { verifyOtp, forgotPassword } from "../api/authApi";

function formatTimer(seconds) {
  const minute = Math.floor(seconds / 60);
  const second = seconds % 60;

  return `${minute}:${String(second).padStart(2, "0")}`;
}

function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const otpRefs = useRef([]);

  const channel = location.state?.channel;
  const value = location.state?.value;

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    document.title = "Verifikasi OTP - Foodora";

    if (!channel || !value) {
      navigate("/forgot-password");
    }
  }, [channel, value, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const otp = otpValues.join("");

  function handleOtpChange(e, index) {
    const inputValue = e.target.value;

    if (!/^[0-9]?$/.test(inputValue)) {
      return;
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = inputValue;
    setOtpValues(newOtpValues);

    if (inputValue && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) return;

    const newOtpValues = ["", "", "", "", "", ""];

    pastedValue.split("").forEach((digit, index) => {
      newOtpValues[index] = digit;
    });

    setOtpValues(newOtpValues);

    const nextIndex = Math.min(pastedValue.length, 5);
    otpRefs.current[nextIndex]?.focus();
  }

  async function handleVerifyOtp() {
    setMessage("");
    setMessageType("");

    if (otp.length !== 6) {
      setMessage("Masukkan kode OTP 6 digit dulu ya.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const result = await verifyOtp({
        channel,
        value,
        otp,
      });

      setMessage("OTP berhasil diverifikasi. Mengarahkan ke reset password...");
      setMessageType("success");

      setTimeout(() => {
        navigate("/reset-password", {
          state: {
            resetToken: result.data.resetToken,
          },
        });
      }, 800);
    } catch (error) {
      setMessage(error.message || "Kode OTP salah atau sudah kedaluwarsa.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOtp() {
    setMessage("");
    setMessageType("");

    if (!channel || !value) {
      navigate("/forgot-password");
      return;
    }

    setResendLoading(true);

    try {
      await forgotPassword({
        channel,
        value,
      });

      setOtpValues(["", "", "", "", "", ""]);
      setTimeLeft(600);
      otpRefs.current[0]?.focus();

      setMessage("Kode OTP baru berhasil dikirim.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message || "Gagal mengirim ulang OTP.");
      setMessageType("error");
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="verify-page">
      <div className="verify-blob blob-one"></div>
      <div className="verify-blob blob-two"></div>
      <div className="verify-blob blob-three"></div>

      <motion.main
        className="verify-main"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <motion.section
          className="verify-left"
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200"
            alt="Foodora"
            className="verify-food-img"
          />

          <div className="verify-left-overlay"></div>

          <motion.div
            className="verify-brand-card"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div>
              <IoShieldCheckmark />
            </div>

            <span>Foodora Security</span>
            <h2>Verifikasi Aman</h2>
            <p>
              Masukkan kode OTP untuk melanjutkan proses reset password akunmu.
            </p>
          </motion.div>

          <motion.div
            className="verify-floating-card card-top"
            animate={{ y: [0, 12, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <MdOutlineTimer />
            <span>OTP berlaku 10 menit</span>
          </motion.div>

          <motion.div
            className="verify-floating-card card-bottom"
            animate={{ y: [0, -10, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {channel === "email" ? <FaRegEnvelope /> : <FaWhatsapp />}
            <span>{channel === "email" ? "Email OTP" : "WhatsApp OTP"}</span>
          </motion.div>
        </motion.section>

        <motion.section
          className="verify-right"
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
        >
          <div className="verify-box">
            <motion.div
              className="verify-icon-main"
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, 4, -4, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <IoShieldCheckmark />
            </motion.div>

            <span className="verify-badge">OTP VERIFICATION</span>

            <h1>Masukkan Kode OTP</h1>

            <p className="verify-subtitle">
              Kami telah mengirim kode 6 digit ke{" "}
              <b>{channel === "email" ? "email" : "WhatsApp"}</b>:
              <br />
              <strong>{value}</strong>
            </p>

            <div className="verify-method-wrapper">
              <div
                className={
                  channel === "email"
                    ? "verify-method-card active"
                    : "verify-method-card"
                }
              >
                <FaRegEnvelope />
                <span>Email</span>
              </div>

              <div
                className={
                  channel === "whatsapp"
                    ? "verify-method-card active"
                    : "verify-method-card"
                }
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </div>
            </div>

            <div className="verify-timer-box">
              <MdOutlineTimer />
              <span>
                {timeLeft > 0
                  ? `Kode berlaku ${formatTimer(timeLeft)}`
                  : "Kode OTP sudah kedaluwarsa"}
              </span>
            </div>

            <div className="otp-wrapper" onPaste={handlePaste}>
              {otpValues.map((digit, index) => (
                <motion.input
                  key={index}
                  maxLength="1"
                  value={digit}
                  ref={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  whileFocus={{ scale: 1.08 }}
                />
              ))}
            </div>

            <div className="resend-row">
              <p>
                Tidak menerima kode?
              </p>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendLoading}
              >
                <FaRedoAlt className={resendLoading ? "spin" : ""} />
                {resendLoading ? "Mengirim..." : "Kirim Ulang"}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  key={message}
                  className={`verify-message ${messageType}`}
                  initial={{
                    opacity: 0,
                    y: 10,
                    x: messageType === "error" ? -8 : 0,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    x: 0,
                  }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              className="verify-button"
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
              whileHover={loading || otp.length !== 6 ? {} : { y: -3 }}
              whileTap={loading || otp.length !== 6 ? {} : { scale: 0.97 }}
            >
              {loading ? "Memverifikasi..." : "Verifikasi Sekarang"}
              <FaArrowRight />
            </motion.button>

            <div className="verify-divider"></div>

            <div className="info-section">
              <motion.div
                className="info-item"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <IoShieldCheckmark className="info-icon" />

                <p>
                  Jangan bagikan kode OTP kepada siapa pun demi keamanan akun.
                </p>
              </motion.div>

              <motion.div
                className="info-item"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <BiSupport className="info-icon" />

                <p>
                  Mengalami kendala? <span>Hubungi support Foodora.</span>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}

export default Verify;
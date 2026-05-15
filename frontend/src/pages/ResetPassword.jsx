import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowRight, FiShield, FiCheckCircle, FiCircle, FiHelpCircle } from "react-icons/fi";
import "../styles/auth.css";

function ResetPassword() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isShaking, setIsShaking] = useState(false); 
  const [isSuccess, setIsSuccess] = useState(false); // STATE BARU UNTUK ANIMASI SUKSES
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const reqLength = password.length >= 8;
  const reqUpper = /[A-Z]/.test(password);
  const reqNumber = /[0-9]/.test(password);
  const reqMatch = password === confirmPassword && password.length > 0;
  
  const isAllReady = reqLength && reqUpper && reqNumber && reqMatch;

  // Hitung seberapa kuat password-nya (0 sampai 4)
  const strengthScore = [reqLength, reqUpper, reqNumber, reqMatch].filter(Boolean).length;
  // Tentukan warna garis berdasarkan kekuatan
  const strengthColor = strengthScore <= 1 ? "#e74c3c" : strengthScore <= 3 ? "#f1c40f" : "#1b4d1c";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAllReady) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    } else {
      // BUKAN ALERT LAGI, TAPI MENTRIGGER ANIMASI SUKSES!
      setIsSuccess(true);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const CheckIcon = ({ isMet }) => (
    <motion.div
      initial={false}
      animate={{ scale: isMet ? [0, 1.2, 1] : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      style={{ display: "flex" }}
    >
      {isMet ? <FiCheckCircle className="check-v" /> : <FiCircle className="uncheck-v" />}
    </motion.div>
  );

  return (
    <div className="auth-page-wrapper">
      <motion.header 
        className="auth-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-container-nav">
          <Link to="/" className="auth-logo">Foodora</Link>
          <FiHelpCircle className="help-icon" title="Butuh Bantuan?" />
        </div>
      </motion.header>

      <main className="auth-main-content">
        <div className="auth-card-flex">
          
          <motion.div 
            className="reset-form-card"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
            }}
          >
            {/* LOGIKA ANIMASI TRANSISI SUKSES */}
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.h2 variants={fadeUp}>Reset Kata Sandi</motion.h2>
                  <motion.p className="subtitle" variants={fadeUp}>
                    Silakan buat kata sandi baru untuk memastikan akun dan perjalanan kuliner Anda tetap aman.
                  </motion.p>

                  <motion.form className="auth-form" variants={fadeUp} onSubmit={handleSubmit}>
                    <div className="input-group">
                      <label>Kata Sandi Baru</label>
                      <div className="input-wrapper" style={{ overflow: 'hidden' }}>
                        <input 
                          type={showPass ? "text" : "password"} 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="eye-icon" onClick={() => setShowPass(!showPass)}>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={showPass ? "eye" : "eye-off"}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{ duration: 0.15 }}
                            >
                              {showPass ? <FiEye /> : <FiEyeOff />}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        
                        {/* INI BAR UNTUK KEKUATAN PASSWORD */}
                        <motion.div 
                          style={{
                            height: "4px",
                            background: strengthColor,
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            borderRadius: "0 0 12px 12px"
                          }}
                          initial={{ width: "0%" }}
                          animate={{ width: `${(strengthScore / 4) * 100}%`, backgroundColor: strengthColor }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label>Konfirmasi Kata Sandi</label>
                      <div className="input-wrapper">
                        <input 
                          type={showConfirm ? "text" : "password"} 
                          placeholder="••••••••" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={showConfirm ? "eye" : "eye-off"}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{ duration: 0.15 }}
                            >
                              {showConfirm ? <FiEye /> : <FiEyeOff />}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    <div className="security-box">
                      <label>SYARAT KATA SANDI</label>
                      <ul>
                        <motion.li animate={{ color: reqLength ? "#1b4d1c" : "#666" }} className={reqLength ? "req-met" : ""}>
                          <CheckIcon isMet={reqLength} /> Minimal terdiri dari 8 karakter
                        </motion.li>
                        <motion.li animate={{ color: reqUpper ? "#1b4d1c" : "#666" }} className={reqUpper ? "req-met" : ""}>
                          <CheckIcon isMet={reqUpper} /> Mengandung huruf besar (Kapital)
                        </motion.li>
                        <motion.li animate={{ color: reqNumber ? "#1b4d1c" : "#666" }} className={reqNumber ? "req-met" : ""}>
                          <CheckIcon isMet={reqNumber} /> Mengandung setidaknya 1 angka
                        </motion.li>
                        <motion.li animate={{ color: reqMatch ? "#1b4d1c" : "#666" }} className={reqMatch ? "req-met" : ""}>
                          <CheckIcon isMet={reqMatch} /> Kedua kata sandi cocok
                        </motion.li>
                      </ul>
                    </div>

                    <motion.button 
                      type="submit" 
                      className={`btn-update-pass ${isAllReady ? "ready" : ""}`}
                      animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      whileHover={isAllReady ? { scale: 1.02 } : {}}
                      whileTap={isAllReady ? { scale: 0.98 } : {}}
                    >
                      Perbarui Kata Sandi <FiArrowRight />
                    </motion.button>
                  </motion.form>

                  <motion.div variants={fadeUp}>
                    <Link to="/login" className="back-login">Kembali ke Login</Link>
                  </motion.div>
                </motion.div>
              ) : (
                /* STATE SUKSES (TAMPIL KALAU SUBMIT BERHASIL) */
                /* STATE SUKSES (TAMPIL KALAU SUBMIT BERHASIL) */
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                style={{ textAlign: "center", padding: "40px 0", position: "relative" }}
              >
                {/* EFEK LEDAKAN PARTIKEL (CONFETTI) */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: [1, 1.5, 0],
                      x: (Math.random() - 0.5) * 300, // Menyebar ke segala arah
                      y: (Math.random() - 0.5) * 300,
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      width: "12px", height: "12px",
                      background: ["#1b4d1c", "#f1c40f", "#e74c3c", "#7a2d48"][i % 4],
                      borderRadius: Math.random() > 0.5 ? "50%" : "2px", // Campuran bulat dan kotak
                      top: "20%", left: "50%",
                      zIndex: 0
                    }}
                  />
                ))}

                {/* IKON CENTANG UTAMA */}
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <FiCheckCircle style={{ fontSize: "5rem", color: "#1b4d1c", marginBottom: "20px", background: "white", borderRadius: "50%" }} />
                </motion.div>
                
                <h2 style={{ color: "#1b4d1c", fontSize: "2rem", marginBottom: "10px", fontWeight: 800, position: "relative", zIndex: 1 }}>Kata Sandi Diperbarui!</h2>
                <p style={{ color: "#717171", lineHeight: 1.6, marginBottom: "30px", position: "relative", zIndex: 1 }}>
                  Mantap! Akun Anda sekarang sudah diamankan dengan kata sandi baru. Mari kembali berburu kuliner!
                </p>
                <Link to="/login" style={{ textDecoration: "none", position: "relative", zIndex: 1 }}>
                  <motion.button 
                    className="btn-update-pass ready"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Lanjut ke Login <FiArrowRight />
                  </motion.button>
                </Link>
              </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="auth-side-decor"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="illustration-box">
              <img src="https://images.unsplash.com/photo-1529651795107-e5a141e34843?q=80&w=500" alt="Ilustrasi Sate" />
            </div>
            
            <div className="security-info-card">
              <FiShield className="shield-icon" />
              <p>Keamanan Anda adalah prioritas kami. Kami menggunakan enkripsi standar industri untuk melindungi data Anda.</p>
            </div>
          </motion.div>

        </div>
      </main>

      <footer className="auth-footer">
        <p>© 2026 Rasa Nusantara. Authentic Indonesian Culinary Experience.</p>
      </footer>
    </div>
  );
}

export default ResetPassword;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import '../styles/login.css';

const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({
          message: 'Login berhasil',
        });
      } else {
        reject({
          message: 'Email dan password harus diisi',
        });
      }
    }, 1000);
  });
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const result = await login(email, password);
      setMessage(result.message);
      setMessageType('success');
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <main className="login-main-content">
        <div className="login-card-flex">

          <div className="login-form-card">
            <h2>Masuk ke Akun</h2>

            <p className="login-subtitle">
              Nikmati hidangan warisan terbaik langsung di pintu Anda.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="login-input-group">
                <label>Email atau Nomor Telepon</label>

                <div className="login-input-wrapper">
                  <input
                    type="text"
                    placeholder="contoh@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="login-input-group">
                <label>Kata Sandi</label>

                <div className="login-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span
                    className="login-eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </span>
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
                {loading ? 'Memproses...' : 'Masuk Sekarang'}
              </button>

              {message && (
                <div className={`message ${messageType}`}>
                  {message}
                </div>
              )}

              <p className="login-footer-text">
                Belum punya akun? <a href="#">Daftar Sekarang</a>
              </p>

            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
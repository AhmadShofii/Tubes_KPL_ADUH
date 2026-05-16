import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { login } from '../../api/authApi';

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
    <AuthLayout pageTitle="Login">
      <div className="brand">Foodora</div>
      <h1>Masuk ke Akun</h1>
      <p className="subtitle">
        Nikmati hidangan warisan terbaik langsung di pintu Anda.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label-row">Email atau Nomor Telepon</label>
          <input
            className="input"
            type="text"
            placeholder="contoh@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <div className="label-row">
            <label>Kata Sandi</label>
            <Link to="/forgot-password" className="link">
              Lupa Sandi?
            </Link>
          </div>

          <div className="password-wrap">
            <input
              className="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk Sekarang'}
        </button>

        {message && <div className={`message ${messageType}`}>{message}</div>}

        <div className="divider">Atau masuk dengan</div>

        <div className="social-row">
          <button type="button" className="social-btn">
            Google
          </button>
          <button type="button" className="social-btn">
            Facebook
          </button>
        </div>

        <p className="bottom-text">
          Belum punya akun? <a href="#">Daftar Sekarang</a>
        </p>
      </form>
    </AuthLayout>
  );
}
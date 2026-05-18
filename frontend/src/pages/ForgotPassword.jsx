import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { forgotPassword } from '../../api/authApi';

export default function ForgotPasswordPage() {
  const [channel, setChannel] = useState('email');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Lupa Password-Chiara';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const result = await forgotPassword({
        channel,
        value,
      });
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
    <AuthLayout pageTitle="Lupa Password-Chiara">
      <div className="brand">Foodora</div>
      <h1>Lupa Sandi?</h1>
      <p className="subtitle">
        Jangan khawatir. Masukkan detail akun di bawah dan kami akan mengirimkan
        link pemulihan.
      </p>

      <div className="toggle-group">
        <button
          type="button"
          className={`toggle-btn ${channel === 'email' ? 'active' : ''}`}
          onClick={() => setChannel('email')}
        >
          Email
        </button>
        <button
          type="button"
          className={`toggle-btn ${channel === 'whatsapp' ? 'active' : ''}`}
          onClick={() => setChannel('whatsapp')}
        >
          WhatsApp
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label-row">
            {channel === 'email' ? 'Masukkan Email' : 'Masukkan Nomor WhatsApp'}
          </label>
          <input
            className="input"
            type={channel === 'email' ? 'email' : 'tel'}
            placeholder={channel === 'email' ? 'nama@contoh.com' : '08xxxxxxxxxx'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? 'Mengirim...' : 'Kirim Link Pemulihan →'}
        </button>

        {message && <div className={`message ${messageType}`}>{message}</div>}

        <Link to="/login" className="back-link">
          ← Keluar
        </Link>

        <p className="bottom-text">
          Butuh Bantuan? <a href="#">Hubungi Kami</a>
        </p>
      </form>
    </AuthLayout>
  );
}
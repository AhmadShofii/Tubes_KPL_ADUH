const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API LOGIN
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email dan password wajib diisi.',
    });
  }

  // Akun demo untuk testing
  if (email === 'demo@foodora.com' && password === 'password123') {
    return res.json({
      success: true,
      message: 'Login berhasil.',
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Email atau password salah.',
  });
});

// API FORGOT PASSWORD
app.post('/api/forgot-password', (req, res) => {
  const { channel, value } = req.body;

  if (!channel || !value) {
    return res.status(400).json({
      success: false,
      message: 'Data pemulihan wajib diisi.',
    });
  }

  if (channel === 'email') {
    return res.json({
      success: true,
      message: `Link pemulihan sudah dikirim ke email ${value}.`,
    });
  }

  if (channel === 'whatsapp') {
    return res.json({
      success: true,
      message: `Link pemulihan sudah dikirim ke WhatsApp ${value}.`,
    });
  }

  return res.status(400).json({
    success: false,
    message: 'Metode pemulihan tidak valid.',
  });
});

app.listen(PORT, () => {
  console.log(`API server berjalan di http://localhost:${PORT}`);
});
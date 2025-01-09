const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulasi API Key
const MOCK_API_KEY = '12345-ABCDE-67890-FGHIJ'; // Ganti dengan proses scraping jika diperlukan

// Endpoint untuk mendapatkan API Key
app.get('/wanzofc', (req, res) => {
  res.json({ apiKey: MOCK_API_KEY });
});

// Endpoint untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint untuk chat
app.post('/chat', (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  let reply;

  // Logika sederhana untuk respons chat
  if (userMessage.includes('apikey')) {
    reply = `API Key Anda adalah: ${MOCK_API_KEY}`;
  } else if (userMessage.includes('halo')) {
    reply = 'Halo! Ada yang bisa saya bantu?';
  } else if (userMessage.includes('terima kasih')) {
    reply = 'Sama-sama! Semoga harimu menyenangkan!';
  } else {
    reply = 'Maaf, saya tidak mengerti. Coba tanyakan sesuatu tentang API Key.';
  }

  // Kirimkan balasan ke klien
  res.json({ reply });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

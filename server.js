const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulasi API Key
const MOCK_API_KEY = 'wanzofc'; // Ganti dengan proses scraping jika diperlukan

// Endpoint untuk mendapatkan API Key
app.get('/wanzofc', (req, res) => {
  res.json({ apiKey: MOCK_API_KEY });
});

// Endpoint untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint untuk chat interaktif
app.post('/chat', (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  let reply;

  // Logika respons dinamis berdasarkan kata kunci
  if (userMessage.includes('apikey')) {
    reply = `API Key Anda adalah: ${MOCK_API_KEY}`;
  } else if (userMessage.includes('halo') || userMessage.includes('hi')) {
    reply = 'Halo! Ada yang bisa saya bantu?';
  } else if (userMessage.includes('terima kasih') || userMessage.includes('thank you')) {
    reply = 'Sama-sama! Semoga harimu menyenangkan!';
  } else if (userMessage.includes('apa itu api')) {
    reply = 'API adalah antarmuka yang memungkinkan dua aplikasi berbicara satu sama lain. Apakah Anda butuh penjelasan lebih lanjut?';
  } else if (userMessage.includes('openai') || userMessage.includes('ai')) {
    reply = 'OpenAI adalah perusahaan riset AI yang membuat model seperti ChatGPT. Apa yang ingin Anda ketahui tentang OpenAI?';
  } else {
    reply = 'Maaf, saya tidak mengerti. Coba tanyakan sesuatu tentang API Key atau OpenAI.';
  }

  // Kirimkan balasan ke klien
  res.json({ reply });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

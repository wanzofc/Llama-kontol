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

// Endpoint untuk file HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint untuk mendapatkan API Key
app.get('/wanzofc', (req, res) => {
  res.json({ apiKey: MOCK_API_KEY });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
                     

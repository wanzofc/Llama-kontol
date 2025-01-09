const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path'); // Path untuk keamanan akses file

const app = express();
const port = 8080;

// Middleware untuk CORS dan parsing JSON
app.use(cors());
app.use(express.json());

// API Key valid untuk semua request
const VALID_API_KEY = "wanzofckey";

// Middleware untuk validasi API Key
const validateApiKey = (req, res, next) => {
    const apiKey = req.query.apiKey; // API Key dikirimkan melalui query parameter
    console.log('Menerima API Key:', apiKey); // Debugging log
    if (apiKey !== VALID_API_KEY) {
        return res.status(401).json({ error: 'API Key tidak valid.' });
    }
    next();
};

// Halaman utama untuk index.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html')); // Mengambil file index.html dari root
});

// Halaman kontak untuk kontak.html
app.get('/kontak', (req, res) => {
    res.sendFile(path.resolve('kontak.html')); // Mengambil file kontak.html dari root
});

// API untuk mendapatkan API Key Twitter
app.get('/api/get-api-key/twitter', validateApiKey, (req, res) => {
    res.json({ apiKey: 'twitter-api-key-anda' });
});

// API untuk mengunduh media dari TikTok
app.get('/api/download/tiktok', validateApiKey, async (req, res) => {
    const mediaUrl = req.query.url; // URL media TikTok dari query parameter
    if (!mediaUrl) return res.status(400).json({ error: 'URL TikTok tidak diberikan.' });
    await downloadMedia(mediaUrl, res);
});

// API untuk mengunduh media dari Instagram
app.get('/api/download/instagram', validateApiKey, async (req, res) => {
    const mediaUrl = req.query.url; // URL media Instagram dari query parameter
    if (!mediaUrl) return res.status(400).json({ error: 'URL Instagram tidak diberikan.' });
    await downloadMedia(mediaUrl, res);
});

// Fallback rute jika rute tidak ditemukan
app.use((req, res) => {
    res.status(404).send('Rute tidak ditemukan!');
});

// Membuat server HTTP
http.createServer(app).listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

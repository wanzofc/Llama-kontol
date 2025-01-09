const express = require('express');
const app = express();
const port = 8080;
const path = require('path'); // Untuk memberikan file statis
const fs = require('fs'); // Untuk membaca file JSON

// Menggunakan express untuk parsing JSON
app.use(express.json());

// Halaman utama untuk index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// API untuk mendapatkan API key TikTok
app.get('/api/get-api-key/tiktok', (req, res) => {
    const apiKey = "wanzofc"; // API Key yang dapat digunakan siapa saja
    const response = {
        platform: "tiktok",
        apiKey: apiKey,
        downloadUrl: "https://api.tiktok.com/download"
    };
    res.json(response);
});

// API untuk mendapatkan API key Instagram
app.get('/api/get-api-key/instagram', (req, res) => {
    const apiKey = "wanzofc";
    const response = {
        platform: "instagram",
        apiKey: apiKey,
        downloadUrl: "https://api.instagram.com/download"
    };
    res.json(response);
});

// API untuk mendapatkan API key YouTube
app.get('/api/get-api-key/youtube', (req, res) => {
    const apiKey = "wanzofc";
    const response = {
        platform: "youtube",
        apiKey: apiKey,
        downloadUrl: "https://api.youtube.com/download"
    };
    res.json(response);
});

// API untuk mendapatkan API key Twitter
app.get('/api/get-api-key/twitter', (req, res) => {
    const apiKey = "wanzofc";
    const response = {
        platform: "twitter",
        apiKey: apiKey,
        downloadUrl: "https://api.twitter.com/download"
    };
    res.json(response);
});

// API untuk mendapatkan API key Facebook
app.get('/api/get-api-key/facebook', (req, res) => {
    const apiKey = "wanzofc";
    const response = {
        platform: "facebook",
        apiKey: apiKey,
        downloadUrl: "https://api.facebook.com/download"
    };
    res.json(response);
});

// Endpoint untuk memberikan Postman Collection dalam respons JSON
app.get('/api/postman-collection', (req, res) => {
    const filePath = path.resolve(__dirname, 'Postman_Collection_Video_Downloader.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Gagal membaca file:', err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat membaca file JSON.' });
        }
        res.json(JSON.parse(data)); // Menampilkan isi JSON langsung
    });
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

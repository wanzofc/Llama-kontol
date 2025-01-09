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

// Halaman utama untuk index.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html')); // Mengambil file index.html dari root
});

// Halaman kontak untuk kontak.html
app.get('/kontak', (req, res) => {
    res.sendFile(path.resolve('kontak.html')); // Mengambil file kontak.html dari root
});

// Helper function untuk mengunduh media dari URL
const downloadMedia = async (url, res) => {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
        });
        const filename = `media.${url.split('.').pop()}`; // Menentukan nama file berdasarkan ekstensi
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengunduh media.', details: error.message });
    }
};

// Middleware untuk validasi API Key
const validateApiKey = (req, res, next) => {
    const apiKey = req.query.apiKey; // API Key dikirimkan melalui query parameter
    if (apiKey !== VALID_API_KEY) {
        return res.status(401).json({ error: 'API Key tidak valid.' });
    }
    next();
};

// API untuk mengunduh media dari TikTok
app.get('/api/download/tiktok', validateApiKey, async (req, res) => {
    const mediaUrl = req.query.url; // URL media TikTok dari query parameter
    if (!mediaUrl) return res.status(400).json({ error: 'https://vt.tiktok.com/ZS6rbEMpN/.' });
    await downloadMedia(mediaUrl, res);
});

// API untuk mengunduh media dari Instagram
app.get('/api/download/instagram', validateApiKey, async (req, res) => {
    const mediaUrl = req.query.url; // URL media Instagram dari query parameter
    if (!mediaUrl) return res.status(400).json({ error: 'https://www.instagram.com/reel/DDLdn8tPdae/?igsh=b2lsanEwbG84azYy.' });
    await downloadMedia(mediaUrl, res);
});

// API untuk mengunduh media dari YouTube
app.get('/api/download/youtube', validateApiKey, async (req, res) => {
    const mediaUrl = req.query.url; // URL media YouTube dari query parameter
    if (!mediaUrl) return res.status(400).json({ error: 'https://youtube.com/watch?v=0Qsrx04Efns.' });
    await downloadMedia(mediaUrl, res);
});

// API untuk mengunduh media dari Twitter
app.get('/api/download/twitter', validateApiKey, async (req, res) => {
    const mediaUrl = req.query.url; // URL media Twitter dari query parameter
    if (!mediaUrl) return res.status(400).json({ error: 'URL tidak diberikan.' });
    await downloadMedia(mediaUrl, res);
});

// API untuk mengunduh media dari Facebook
app.get('/api/download/facebook', validateApiKey, async (req, res) => {
    const mediaUrl = req.query.url; // URL media Facebook dari query parameter
    if (!mediaUrl) return res.status(400).json({ error: 'URL tidak diberikan.' });
    await downloadMedia(mediaUrl, res);
});

// Membuat server HTTPS dan HTTP
// const httpsOptions = {
 //   key: fs.readFileSync(path.resolve('key.pem')), // Membaca SSL Key dari root
//    cert: fs.readFileSync(path.resolve('cert.pem')) // Membaca SSL Cert dari root
//};

// Server HTTP
http.createServer(app).listen(port, () => {
    console.log(`Server HTTP berjalan di http://localhost:${port}`);
});

// Server HTTPS
//https.createServer(httpsOptions, app).listen(8443, () => {
  //console.log(`Server HTTPS berjalan di https://localhost:8080`);
//});//

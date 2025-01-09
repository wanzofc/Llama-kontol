const express = require('express');
const app = express();
const port = 8080;

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

// Endpoint untuk memberikan Postman Collection dengan URL dinamis
app.get('/api/postman-collection', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`; // Mendapatkan domain/IP dinamis
    const postmanCollection = {
        info: {
            name: "Video Downloader API",
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: [
            {
                name: "Get API Key TikTok",
                request: {
                    method: "GET",
                    url: {
                        raw: `${baseUrl}/api/get-api-key/tiktok`,
                        host: baseUrl,
                        path: "/api/get-api-key/tiktok"
                    }
                }
            },
            {
                name: "Get API Key Instagram",
                request: {
                    method: "GET",
                    url: {
                        raw: `${baseUrl}/api/get-api-key/instagram`,
                        host: baseUrl,
                        path: "/api/get-api-key/instagram"
                    }
                }
            },
            {
                name: "Get API Key YouTube",
                request: {
                    method: "GET",
                    url: {
                        raw: `${baseUrl}/api/get-api-key/youtube`,
                        host: baseUrl,
                        path: "/api/get-api-key/youtube"
                    }
                }
            },
            {
                name: "Get API Key Twitter",
                request: {
                    method: "GET",
                    url: {
                        raw: `${baseUrl}/api/get-api-key/twitter`,
                        host: baseUrl,
                        path: "/api/get-api-key/twitter"
                    }
                }
            },
            {
                name: "Get API Key Facebook",
                request: {
                    method: "GET",
                    url: {
                        raw: `${baseUrl}/api/get-api-key/facebook`,
                        host: baseUrl,
                        path: "/api/get-api-key/facebook"
                    }
                }
            }
        ]
    };

    res.json(postmanCollection); // Menampilkan JSON dinamis langsung
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

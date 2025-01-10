const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs'); // Modul untuk membaca file
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'); // Untuk Swagger UI
const port = 8080;

// Menggunakan express untuk parsing JSON
app.use(express.json());

// Menyajikan file statis seperti `awan.js` dan `style.css`
app.use(express.static(path.join(__dirname))); // Folder root untuk mengakses file

// Konfigurasi Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Wanzofc API Documentation',
      version: '1.0.0',
      description: 'API documentation for Wanzofc Social Media APIs and related services'
    },
    servers: [
      {
        url: 'http://localhost:8080'
      }
    ]
  },
  apis: ['./server.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Gunakan Swagger UI untuk menampilkan dokumentasi
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Halaman utama untuk index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API untuk mendapatkan API key TikTok
/**
 * @swagger
 * /api/get-api-key/tiktok:
 *   get:
 *     description: Get API Key for TikTok
 *     responses:
 *       200:
 *         description: A JSON object with TikTok API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 platform:
 *                   type: string
 *                   example: tiktok
 *                 apiKey:
 *                   type: string
 *                   example: wanzofc
 *                 downloadUrl:
 *                   type: string
 *                   example: https://api.tiktok.com/download
 */
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
/**
 * @swagger
 * /api/get-api-key/instagram:
 *   get:
 *     description: Get API Key for Instagram
 *     responses:
 *       200:
 *         description: A JSON object with Instagram API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 platform:
 *                   type: string
 *                   example: instagram
 *                 apiKey:
 *                   type: string
 *                   example: wanzofc
 *                 downloadUrl:
 *                   type: string
 *                   example: https://api.instagram.com/download
 */
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
/**
 * @swagger
 * /api/get-api-key/youtube:
 *   get:
 *     description: Get API Key for YouTube
 *     responses:
 *       200:
 *         description: A JSON object with YouTube API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 platform:
 *                   type: string
 *                   example: youtube
 *                 apiKey:
 *                   type: string
 *                   example: wanzofc
 *                 downloadUrl:
 *                   type: string
 *                   example: https://api.youtube.com/download
 */
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
/**
 * @swagger
 * /api/get-api-key/twitter:
 *   get:
 *     description: Get API Key for Twitter
 *     responses:
 *       200:
 *         description: A JSON object with Twitter API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 platform:
 *                   type: string
 *                   example: twitter
 *                 apiKey:
 *                   type: string
 *                   example: wanzofc
 *                 downloadUrl:
 *                   type: string
 *                   example: https://api.twitter.com/download
 */
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
/**
 * @swagger
 * /api/get-api-key/facebook:
 *   get:
 *     description: Get API Key for Facebook
 *     responses:
 *       200:
 *         description: A JSON object with Facebook API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 platform:
 *                   type: string
 *                   example: facebook
 *                 apiKey:
 *                   type: string
 *                   example: wanzofc
 *                 downloadUrl:
 *                   type: string
 *                   example: https://api.facebook.com/download
 */
app.get('/api/get-api-key/facebook', (req, res) => {
  const apiKey = "wanzofc";
  const response = {
    platform: "facebook",
    apiKey: apiKey,
    downloadUrl: "https://api.facebook.com/download"
  };
  res.json(response);
});

// API untuk membaca service-worker.js
/**
 * @swagger
 * /service-worker.js:
 *   get:
 *     description: Fetch the service worker file
 *     responses:
 *       200:
 *         description: The service worker JavaScript file
 *         content:
 *           application/javascript:
 *             schema:
 *               type: string
 *               example: "self.addEventListener('install', function(event) { event.waitUntil(self.skipWaiting()); });"
 */
app.get('/service-worker.js', (req, res) => {
  const filePath = path.join(__dirname, 'service-worker.js');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Gagal membaca file:', err);
      res.status(500).send('Terjadi kesalahan saat membaca file.');
    } else {
      res.type('application/javascript'); // Set header untuk file JS
      res.send(data); // Kirimkan isi file
    }
  });
});

// API untuk membaca manifest.json
/**
 * @swagger
 * /manifest.json:
 *   get:
 *     description: Fetch the manifest JSON file
 *     responses:
 *       200:
 *         description: The manifest JSON file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Wanzofc Web App"
 *                 short_name:
 *                   type: string
 *                   example: "Wanzofc"
 *                 start_url:
 *                   type: string
 *                   example: "/"
 *                 display:
 *                   type: string
 *                   example: "standalone"
 *                 background_color:
 *                   type: string
 *                   example: "#000000"
 *                 theme_color:
 *                   type: string
 *                   example: "#000000"
 */
app.get('/manifest.json', (req, res) => {
  const filePath = path.join(__dirname, 'manifest.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Gagal membaca file:', err);
      res.status(500).send('Terjadi kesalahan saat membaca file.');
    } else {
      res.type('application/json'); // Set header untuk file JSON
      res.send(data); // Kirimkan isi file
    }
  });
});

// API untuk membaca kontak.html
/**
 * @swagger
 * /kontak.html:
 *   get:
 *     description: Fetch the kontak.html page
 *     responses:
 *       200:
 *         description: The kontak.html page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html><body><h1>Kontak Kami</h1><p>Silakan hubungi kami melalui email.</p></body></html>"
 */
app.get('/kontak.html', (req, res) => {
  const filePath = path.join(__dirname, 'kontak.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Gagal membaca file:', err);
      res.status(500).send('Terjadi kesalahan saat membaca file.');
    } else {
      res.type('text/html'); // Set header untuk file HTML
      res.send(data); // Kirimkan isi file
    }
  });
});

// API untuk membaca _config.yml
/**
 * @swagger
 * /_config.yml:
 *   get:
 *     description: Fetch the _config.yml file
 *     responses:
 *       200:
 *         description: The _config.yml file
 *         content:
 *           application/x-yaml:
 *             schema:
 *               type: string
 *               example: "server: \n  url: http://localhost:8080"
 */
app.get('/_config.yml', (req, res) => {
  const filePath = path.join(__dirname, '_config.yml');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Gagal membaca file:', err);
      res.status(500).send('Terjadi kesalahan saat membaca file.');
    } else {
      res.type('application/x-yaml'); // Set header untuk file YAML
      res.send(data); // Kirimkan isi file
    }
  });
});

// Endpoint untuk memberikan Postman Collection dengan URL dinamis
/**
 * @swagger
 * /api/postman-collection:
 *   get:
 *     description: Get the Postman Collection URL
 *     responses:
 *       200:
 *         description: A JSON object with the Postman collection download URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 collection:
 *                   type: string
 *                   example: "https://www.getpostman.com/collections/your_collection_link"
 */
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

  res.json({ collection: postmanCollection });
});

// Menjalankan server di port 8080
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

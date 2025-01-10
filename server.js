const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const axios = require('axios');
const port = 8080;

// Gunakan morgan untuk logging request
app.use(morgan('combined'));

// Middleware untuk parsing JSON
app.use(express.json());

// Rate Limiting - Batasi hingga 100 permintaan per 15 menit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Maksimal 100 request per IP
  message: "Terlalu banyak permintaan dari IP ini, coba lagi setelah 15 menit"
});

// Terapkan rate limiter untuk semua rute API
app.use('/api/', apiLimiter);

// Menggunakan express untuk menyajikan file statis
app.use(express.static(path.join(__dirname)));

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
  apis: ['./server.js'] // File yang berisi anotasi Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Gunakan Swagger UI untuk dokumentasi API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Endpoint TikTok API
/**
 * @swagger
 * /api/v1/get-api-key/tiktok:
 *   get:
 *     description: Get API Key for TikTok (v1)
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
app.get('/api/v1/get-api-key/tiktok', (req, res) => {
  const apiKey = "wanzofc";
  const response = {
    platform: "tiktok",
    apiKey: apiKey,
    downloadUrl: "https://api.tiktok.com/download"
  };
  res.json(response);
});

// Endpoint Instagram API
/**
 * @swagger
 * /api/v1/get-api-key/instagram:
 *   get:
 *     description: Get API Key for Instagram (v1)
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
 *                   example: instagram-api-key
 */
app.get('/api/v1/get-api-key/instagram', (req, res) => {
  const apiKey = "instagram-api-key";
  const response = {
    platform: "instagram",
    apiKey: apiKey,
  };
  res.json(response);
});

// Endpoint Twitter API
/**
 * @swagger
 * /api/v1/get-api-key/twitter:
 *   get:
 *     description: Get API Key for Twitter (v1)
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
 *                   example: twitter-api-key
 */
app.get('/api/v1/get-api-key/twitter', (req, res) => {
  const apiKey = "twitter-api-key";
  const response = {
    platform: "twitter",
    apiKey: apiKey,
  };
  res.json(response);
});

// Endpoint Facebook API
/**
 * @swagger
 * /api/v1/get-api-key/facebook:
 *   get:
 *     description: Get API Key for Facebook (v1)
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
 *                   example: facebook-api-key
 */
app.get('/api/v1/get-api-key/facebook', (req, res) => {
  const apiKey = "facebook-api-key";
  const response = {
    platform: "facebook",
    apiKey: apiKey,
  };
  res.json(response);
});

// Feedback and Rating API
/**
 * @swagger
 * /api/feedback:
 *   post:
 *     description: Submit feedback or rating for the service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Rating score from 1 to 5
 *                 example: 5
 *               feedback:
 *                 type: string
 *                 description: User's feedback
 *                 example: "Great service, really helpful!"
 *     responses:
 *       200:
 *         description: Feedback submitted successfully
 *       400:
 *         description: Bad Request
 */
app.post('/api/feedback', (req, res) => {
  const { rating, feedback } = req.body;
  if (rating && feedback) {
    res.status(200).json({ message: "Feedback submitted successfully" });
  } else {
    res.status(400).json({ message: "Bad Request, missing rating or feedback" });
  }
});

// Monitoring and Logs
/**
 * @swagger
 * /api/logs:
 *   get:
 *     description: Get server logs for monitoring purposes
 *     responses:
 *       200:
 *         description: Logs data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logs:
 *                   type: string
 *                   example: "Server started successfully at ... "
 */
app.get('/api/logs', (req, res) => {
  fs.readFile('./logs.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error reading logs" });
    } else {
      res.json({ logs: data });
    }
  });
});

// Rute utama untuk index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Menjalankan server di port yang ditentukan
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

const express = require('express');
const path = require('path');
const fs = require('fs');
const swaggerDocs = require('./swagger'); // Swagger Docs
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const axios = require('axios');
const port = 8080;
const app = express();
app.use(morgan('combined'));
app.use(express.json());
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Terlalu banyak permintaan dari IP ini, coba lagi setelah 15 menit",
});
app.use('/api/', apiLimiter);
app.use(express.static(path.join(__dirname)));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// API Versioning
// TikTok - Versi 1
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
  const apiKey = "v1-wanzofc";
  const response = {
    platform: "tiktok",
    apiKey: apiKey,
    downloadUrl: "https://api.tiktok.com/download",
  };
  res.json(response);
});

// TikTok - Versi 2
/**
 * @swagger
 * /api/v2/get-api-key/tiktok:
 *   get:
 *     description: Get API Key for TikTok (v2)
 *     responses:
 *       200:
 *         description: A JSON object with TikTok API key (v2)
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
 *                   example: v2-wanzofc
 *                 downloadUrl:
 *                   type: string
 *                   example: https://api.tiktok.com/v2/download
 */
app.get('/api/v2/get-api-key/tiktok', (req, res) => {
  const apiKey = "v2-wanzofc";
  const response = {
    platform: "tiktok",
    apiKey: apiKey,
    downloadUrl: "https://api.tiktok.com/v2/download",
  };
  res.json(response);
});
/**
 * @swagger
 * /api/get-api-key/tiktok:
 *   get:
 *     description: Get API Key for TikTok without versioning
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
 *                   example: https://api.tiktok.com/version/download
 */
app.get('/api/get-api-key/tiktok', (req, res) => {
  const apiKey = "wanzofc";
  const response = {
    platform: "tiktok",
    apiKey: apiKey,
    downloadUrl: "https://api.tiktok.com/no-version/download",
  };
  res.json(response);
});
app.get('/api/v1/get-api-key/instagram', (req, res) => {
  const apiKey = "v1-wanzofc";
  const response = {
    platform: "instagram",
    apiKey: apiKey,
    downloadUrl: "https://api.instagram.com/v1/download",
  };
  res.json(response);
});
app.get('/api/v2/get-api-key/instagram', (req, res) => {
  const apiKey = "v2-wanzofc";
  const response = {
    platform: "instagram",
    apiKey: apiKey,
    downloadUrl: "https://api.instagram.com/v2/download",
  };
  res.json(response);
});
app.get('/api/get-api-key/instagram', (req, res) => {
  const apiKey = "wanzofc";
  const response = {
    platform: "instagram",
    apiKey: apiKey,
    downloadUrl: "https://api.instagram.com/no-version/download",
  };
  res.json(response);
});
app.get('/api/v1/get-api-key/twitter', (req, res) => {
  const apiKey = "v1-wanzofc";
  const response = {
    platform: "twitter",
    apiKey: apiKey,
    downloadUrl: "https://api.twitter.com/v1/download",
  };
  res.json(response);
});
app.get('/api/v2/get-api-key/twitter', (req, res) => {
  const apiKey = "v2-wanzofc";
  const response = {
    platform: "twitter",
    apiKey: apiKey,
    downloadUrl: "https://api.twitter.com/v2/download",
  };
  res.json(response);
});
app.get('/api/get-api-key/twitter', (req, res) => {
  const apiKey = "wanzofc";
  const response = {
    platform: "twitter",
    apiKey: apiKey,
    downloadUrl: "https://api.twitter.com/no-version/download",
  };
  res.json(response);
});
app.get('/api/v1/get-api-key/facebook', (req, res) => {
  const apiKey = "v1-wanzofc";
  const response = {
    platform: "facebook",
    apiKey: apiKey,
    downloadUrl: "https://api.facebook.com/v1/download",
  };
  res.json(response);
});
app.get('/api/v2/get-api-key/facebook', (req, res) => {
  const apiKey = "v2-wanzofc";
  const response = {
    platform: "facebook",
    apiKey: apiKey,
    downloadUrl: "https://api.facebook.com/v2/download",
  };
  res.json(response);
});
app.get('/api/get-api-key/facebook', (req, res) => {
  const apiKey = "wanzofc";
  const response = {
    platform: "facebook",
    apiKey: apiKey,
    downloadUrl: "https://api.facebook.com/no-version/download",
  };
  res.json(response);
});
app.get('/api/v1/get-api-key/youtube', (req, res) => {
  const apiKey = "v1-wanzofc";
  const response = {
    platform: "youtube",
    apiKey: apiKey,
    downloadUrl: "https://api.youtube.com/v1/download",
  };
  res.json(response);
});
app.get('/api/v2/get-api-key/youtube', (req, res) => {
  const apiKey = "v2-wanzofc";
  const response = {
    platform: "youtube",
    apiKey: apiKey,
    downloadUrl: "https://api.youtube.com/v2/download",
  };
  res.json(response);
});
app.get('/api/get-api-key/youtube', (req, res) => {
  const apiKey = "wanzofc";
  const response = {
    platform: "youtube",
    apiKey: apiKey,
    downloadUrl: "https://api.youtube.com/no-version/download",
  };
  res.json(response);
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
        

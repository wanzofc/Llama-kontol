const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const swaggerDocs = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const axios = require('axios');
const port = 8080;
const app = express();
app.use(morgan('combined'));
app.use(express.json());
const accountSid = 'ACe85d183b50de0e7e1d81d0e9ac370a44';
const authToken = '9bdd10d7984046f7cbd66c5ca3597a09';
const twilioPhoneNumber = '+62895402567224';

const client = new twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
  const { phone, code } = req.body;

  client.messages
    .create({
      body: `Your verification code is: ${code}`,
      from: twilioPhoneNumber,
      to: phone,
    })
    .then((message) => {
      console.log(message.sid);
      res.json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.json({ success: false });
    });
});
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Terlalu banyak permintaan dari IP ini, coba lagi setelah 15 menit",
});
let requestCount = 0; 
const maxRequests = 1000;
app.get('/get-api-data', (req, res) => {
    if (requestCount >= maxRequests) {
        return res.status(429).json({ message: 'Batas permintaan API tercapai.tunggu 15 menit.' });
    }
    requestCount++;
    const apiData = {
        message: 'Data berhasil diambil!',
        data: { key: 'value' },
    };
    res.json(apiData);
})
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
// API untuk mendapatkan API key Instagram
/**
 * @swagger
 * /api/v1/get-api-key/instagram:
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
 *                   example: https://api.instagram.com/v1/download
 */
app.get('/api/v1/get-api-key/instagram', (req, res) => {
  const apiKey = "v1-wanzofc";
  const response = {
    platform: "instagram",
    apiKey: apiKey,
    downloadUrl: "https://api.instagram.com/v1/download",
  };
  res.json(response);
});
// API untuk mendapatkan API key Instagram
/**
 * @swagger
 * /api/v2/get-api-key/instagram:
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
 *                   example: https://api.instagram.com/v2/download
 */
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
/**
 * @swagger
 * /api/v1/get-api-key/openai:
 *   get:
 *     description: Get API Key for OpenAI
 *     responses:
 *       200:
 *         description: A JSON object with OpenAI API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 platform:
 *                   type: string
 *                   example: openai
 *                 apiKey:
 *                   type: string
 *                   example: wanzofc_openai_123456
 *                 downloadUrl:
 *                   type: string
 *                   example: https://api.openai.com/v1/engines/davinci/completions
 */

/**
 * @swagger
 * /api/v1/get-api-key/openai:
 *   post:
 *     description: Use the generated API key to access OpenAI API
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         description: The API key for authenticating the request
 *         required: true
 *         schema:
 *           type: string
 *           example: wanzofc-bro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: "Hello, OpenAI!"
 *     responses:
 *       200:
 *         description: Response from OpenAI API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "Response from OpenAI for prompt: 'Hello, OpenAI!'"
 *       401:
 *         description: Invalid API key or missing API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid API key"
 */
const secret_key = 'bC&5tP!mHs8yKw@uVwZ1r-9zJ3#56qzM1';

// Endpoint untuk mendapatkan API key OpenAI
app.get('/api/v1/get-api-key/openai', (req, res) => {
  const userId = 'wanzofc'; 
  const apiKey = jwt.sign({ userId }, secret_key, { expiresIn: '1h' });
  const response = {
    platform: 'openai',
    apiKey: apiKey,
    downloadUrl: 'https://api.openai.com/v1/engines/davinci/completions', // Contoh URL API OpenAI
  };
  res.json(response);
});

// Endpoint untuk menggunakan API key OpenAI
app.get('/api/v1/get-api-key/openai', (req, res) => {
  const token = req.headers['x-api-key']; 
  if (!token) {
    return res.status(401).json({ error: 'API key is required' });
  }
  try {
    const decoded = jwt.verify(token, secret_key); 
    console.log('Authenticated User:', decoded.userId); 
    const prompt = req.body.prompt || "Hello, OpenAI!";
    res.json({ result: `Response from OpenAI for prompt: "${prompt}"` });
  } catch (error) {
    res.status(401).json({ error: 'Invalid API key' });
  }
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
/**
 * @swagger
 * /api/v1/get-api-key/virtual-sim:
 *   get:
 *     description: Get API Key for Virtual SIM
 *     responses:
 *       200:
 *         description: A JSON object with Virtual SIM API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 platform:
 *                   type: string
 *                   example: nokos
 *                 apiKey:
 *                   type: string
 *                   example: v1-wanzofc-otp
 *                 serviceUrl:
 *                   type: string
 *                   example: https://api.virtualsim.com/v1/sms
 */
app.get('/api/v1/get-api-key/virtual-sim', (req, res) => {
  const apiKey = "v1-wanzofc-virtual-sim";
  const response = {
    platform: "virtual-sim",
    apiKey: apiKey,
    serviceUrl: "https://api.virtualsim.com/v1/sms",
  };
  res.json(response);
});

// Endpoint untuk menggunakan API Virtual SIM
/**
 * @swagger
 * /api/v1/use-api/virtual-sim:
 *   post:
 *     description: Use the Virtual SIM API to send or receive SMS
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         description: The API key for authenticating the request
 *         required: true
 *         schema:
 *           type: string
 *           example: v1-wanzofc-virtual-sim
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               message:
 *                 type: string
 *                 example: "Hello from Virtual SIM!"
 *     responses:
 *       200:
 *         description: Response from Virtual SIM API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "SMS sent successfully!"
 *       401:
 *         description: Invalid API key or missing API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid API key"
 */
app.post('/api/v1/use-api/virtual-sim', (req, res) => {
  const token = req.headers['x-api-key']; 
  if (!token || token !== 'v1-wanzofc-virtual-sim') {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  const { phoneNumber, message } = req.body;
  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Phone number and message are required' });
  }

  // Simulasi pengiriman SMS (bisa disesuaikan dengan layanan nyata)
  const response = {
    status: "success",
    message: `SMS sent successfully to ${phoneNumber} with message: "${message}"`,
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

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
        

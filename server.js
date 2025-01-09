const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulasi API Key yang di-share kepada pengguna
const SHARED_API_KEY = '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';

// Endpoint untuk memberikan API Key ke frontend
app.get('/apikey', (req, res) => {
  res.json({ apiKey: SHARED_API_KEY });
});

// Endpoint untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint untuk chat
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Kirim permintaan ke OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // Model AI
        messages: [{ role: 'user', content: message }],
        max_tokens: 100, // Batasi jumlah token
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SHARED_API_KEY}`, // Gunakan API Key
        },
      }
    );

    // Balasan dari OpenAI
    const reply = response.data.choices[0].message.content.trim();
    res.json({ reply });
  } catch (error) {
    console.error('Error from OpenAI:', error.response?.data || error.message);
    res.status(500).json({ reply: 'Maaf, ada masalah dengan server AI. Coba lagi nanti.' });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Route untuk mengembalikan API key
app.get('/api/get-api-key/:platform', (req, res) => {
    const platform = req.params.platform;
    const apiKey = "wanzofc"; // API Key yang statis
    const response = {
        platform: platform,
        apiKey: apiKey
    };

    res.json(response);
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

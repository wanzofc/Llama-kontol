const express = require("express");
const cors = require("cors");
const { pipeline } = require("@xenova/transformers");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
let chatPipeline;
(async () => {
  console.log("Loading model...");
  chatPipeline = await pipeline("text-generation", "meta-llama/Llama-2-7b-chat-hf");
  console.log("Model loaded!");
})();
app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }
  try {
    const response = await chatPipeline(prompt, {
      max_length: 200,
      temperature: 0.7,
    });
    res.json({ response: response[0].generated_text });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Failed to generate response." });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

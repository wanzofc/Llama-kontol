const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Social Media API",
      version: "1.0.0",
      description: "API untuk mengakses API Key dari berbagai platform sosial media seperti TikTok, Instagram, Twitter, Facebook, dan YouTube.",
      contact: {
        name: "awan",
        email: "wanzbrayy010308@gmail.com",
      },
    },
    servers: [
      {
        url: "https://llama-kontol-production.up.railway.app/api",
      },
    ],
  },
  apis: ["./server.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;

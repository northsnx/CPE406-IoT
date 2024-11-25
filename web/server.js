// Import Modules
const express = require('express');
const WebSocket = require('ws');

// HTTP Server Setup (Express)
const httpApp = express();
const HTTP_PORT = 3000;

// Function to generate random temperature and humidity
function getRandomTemperature() {
    return (Math.random() * 10 + 20).toFixed(2); // ค่า 20-30°C
}

function getRandomHumidity() {
    return (Math.random() * 50 + 30).toFixed(2); // ค่า 30-80%
}

// HTTP API Endpoint
httpApp.get('/api/environment', (req, res) => {
    const temperature = getRandomTemperature();
    const humidity = getRandomHumidity();
    res.json({ temperature, humidity });
});

// Start HTTP Server
httpApp.listen(HTTP_PORT, () => {
    console.log(`HTTP Server is running on http://localhost:${HTTP_PORT}`);
});

// WebSocket Server Setup
const WS_PORT = 3001;
const wss = new WebSocket.Server({ port: WS_PORT });

console.log(`WebSocket server running on ws://localhost:${WS_PORT}`);

// WebSocket Connection Handling
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send temperature and humidity data every 2 seconds
    const interval = setInterval(() => {
        const temperature = getRandomTemperature();
        const humidity = getRandomHumidity();
        ws.send(JSON.stringify({ temperature, humidity }));
    }, 2000);

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

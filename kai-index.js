const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000; // Port to listen on


app.use(cors());


app.use(express.static(path.join(__dirname))); // Serve static files


app.get('/phone', (req, res) => {
    res.sendFile(path.join(__dirname, 'phone/phone-index.html'));
});

app.get("phone/phone-script.js", (req, res) => {
    res.sendFile(path.join(__dirname, 'phone/phone-script.js'));
});

// app.get("phone/phone-styles.css", (req, res) => {
//     res.sendFile(path.join(__dirname, 'phone/phone-styles.css'));
// });

app.get("/fav", (req, res) => {
    res.sendFile(path.join(__dirname, 'phone/phone-fav.html'));
});

app.get("phone/phone-fav.css", (req, res) => {
    res.sendFile(path.join(__dirname, 'phone/phone-fav.css'));
});

app.get("tv/tv-index.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'tv/tv-index.html'));
});

app.get("tv/tv-script.js", (req, res) => {
    res.sendFile(path.join(__dirname, 'tv/tv-script.js'));
});

app.get("tv/tv-styles.css", (req, res) => {
    res.sendFile(path.join(__dirname, 'tv/tv-styles.css'));
});

app.get("socket.io/socket.io.js", (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist', 'socket.io.min.js'));
});


//if the url does not exist, report 404
app.get('*', (req, res) => {
    res.status(404).send('404 - Page not found');
});





io.on('connection', (socket) => { // Listen for connection
    console.log('A user connected'); // Log connection

    socket.on('icon-clicked', (data) => { // Listen for icon click
        console.log(`Icon clicked: ${data.iconId}`);
        const message = {
            type: 'iconClicked',
            iconId: data.iconId
        };
        sendMessage(message); // Send message to tv
    });

    socket.on('disconnect', () => { // Listen for disconnection
        console.log('User disconnected');
    });
});

server.listen(PORT, () => { // Listen on port
    console.log(`Server listening on port ${PORT}`);
});

function sendMessage(message) { // Send message to tv
    io.emit('message', message);
    console.log("Message sent");
}
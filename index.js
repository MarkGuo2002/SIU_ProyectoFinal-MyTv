const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000; // Port to listen on

var fav1 = `DailyDose`;
var fav2 = `Paella`;

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

app.get("/tv", (req, res) => {
    res.sendFile(path.join(__dirname, 'tv/tv-index.html'));
});

// app.get("tv/tv-script.js", (req, res) => {
//     res.sendFile(path.join(__dirname, 'tv/tv-script.js'));
// });

// app.get("tv/tv-styles.css", (req, res) => {
//     res.sendFile(path.join(__dirname, 'tv/tv-styles.css'));
// });

app.get("socket.io/socket.io.js", (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist', 'socket.io.min.js'));
});


//if the url does not exist, report 404
app.get('*', (req, res) => {
    res.status(404).send('404 - Page not found');
});



io.on('connection', (socket) => { // Listen for connection
    console.log(`user with sd ${socket.id} connected`); // Log connection

    socket.on('icon-clicked', (iconId) => { // Listen for icon-click event
        console.log(`Icon clicked: ${iconId}`);
        socket.broadcast.emit('tv-action', iconId); // Send message to tv
    });

    socket.on('get-client-fav', () => {
        console.log("send client: ", fav1, fav2);
        socket.emit('update-client-fav', fav1, fav2);
    });

    socket.on('update-server-fav', (fav) => {
        if (fav1 != fav && fav2 != fav) {
            fav2 = fav1;
            fav1 = fav;
        }
        console.log(`New fav1:`, fav1);
        console.log(`New fav2:`, fav2);
    });

    socket.on('video-clicked', (videoId) => { // Listen for video-click event
        console.log(`Video clicked: ${videoId}`);
        socket.broadcast.emit('tv-action', videoId); // Send message to tv
    });

    socket.on('sound-detected', () => { // Mobile phione detects sound
        console.log("Wow so loud!!!");
        socket.broadcast.emit('sound');
    });

    socket.on('disconnect', () => { // Listen for disconnection
        console.log('User disconnected');
    });
});

server.listen(PORT, () => { // Listen on port
    console.log(`Server listening on port ${PORT}`);
});


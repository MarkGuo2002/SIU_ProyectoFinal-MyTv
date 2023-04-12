const path = require('path');
const http = require('http');
const fs = require('fs');
const socketIO = require('socket.io');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/phone') {
        fs.readFile('phone/phone-index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/phone-script.js') {
        fs.readFile('phone/phone-script.js', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(data);
        });
    } else if (req.url === '/phone-styles.css') { 
        fs.readFile('phone/phone-styles.css', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else if (req.url === '/tv') {
        fs.readFile('tv/tv-index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/tv-script.js') {
        fs.readFile('tv/tv-script.js', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(data);
        });
    } else if (req.url === '/tv-styles.css') { 
        fs.readFile('tv/tv-styles.css', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else if (req.url === '/socket.io/socket.io.js') {
        const socketIOClientPath = path.join(__dirname, 'node_modules', 'socket.io', 'client-dist', 'socket.io.min.js');
        fs.readFile(socketIOClientPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    } else if (req.url === '/css-addons/css/fontawesome.css') {
        fs.readFile('css-addons/css/fontawesome.css', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else if (req.url === '/css-addons/css/solid.css') {
        fs.readFile('css-addons/css/solid.css', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

let tvSocket = null;

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Store the TV client's socket connection
    socket.on('tv', () => {
        console.log('TV client connected');
        tvSocket = socket;
    });

    socket.on('icon-clicked', (data) => {
        console.log(`Icon clicked: ${data.iconId}`);
    });

    socket.on('message', (data) => {
        console.log('Message received:', data);

        // Forward the message to the TV client, if connected
        if (tvSocket) {
            tvSocket.emit('message', data);
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


const path = require('path');
const http = require('http');
const fs = require('fs');
const socketIO = require('socket.io');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('phone/index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/script.js') {
        fs.readFile('phone/script.js', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(data);
        });
    } else if (req.url === '/styles.css') { 
        fs.readFile('phone/styles.css', (err, data) => {
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

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('icon-clicked', (data) => {
        console.log(`Icon clicked: ${data.iconId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


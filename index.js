const path = require('path'); 
const http = require('http');
const fs = require('fs');

const PORT = 3000; // Port to listen on

const server = http.createServer((req, res) => { // Create server
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
    } else if (req.url === '/fav') { 
        fs.readFile('phone/phone-fav.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/phone-fav.css') { 
        fs.readFile('phone/phone-fav.css', (err, data) => {
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
    } else if (req.url === '/css-addons/webfonts/fa-solid-900.woff2') {
        fs.readFile('css-addons/webfonts/fa-solid-900.woff2', (err, data) => {
            if (err) {
                res.writeHead(404);
                console.log('Failed to load fa-solid-900.woff2 error: ' + err);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'font/woff2' });
            res.end(data);
        });
    /*} else if (req.url === '/css-addons/webfonts/fa-solid-900.ttf') {
        fs.readFile('css-addons/webfonts/fa-solid-900.ttf', (err, data) => {
            if (err) {
                res.writeHead(404);
                console.log('Failed to load fa-solid-900.ttf error: ' + err);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'font/ttf' });
            res.end(data);
        });  */
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

const io = require('socket.io')(server); // Create socket

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
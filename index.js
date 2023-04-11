const http = require('http'); // Importa el modulo http
const fs = require('fs'); // Importa el modulo fs

const PORT = 3000; // Puerto en el que escucha el servidor
var action = 'None';

const handleRequest = async (request, response) => {
    const url = request.url;
    response.setHeader("Access-Control-Allow-Origin", "*");
    
    if(request.method === "GET"){ // Comprobar si GET es el metodo correcto
        let content;
        let contentType;
        switch(url){
            case "/volume-up":
                action = "volume-up";
                console.log('Volume up request received');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('Volume up request received');
                response.end();
                break;
            case "/volume-down":
                action = "volume-down";
                console.log('Volume down request received');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('Volume down request received');
                response.end();
                break;
            case "/arrow-up":
                action = "arrow-up";
                console.log('Arrow up request received');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('Arrow up request received');
                response.end();
                break;
            case "/arrow-down":
                action = "arrow-down";
                console.log('Arrow down request received');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('Arrow down request received');
                response.end();
                break;
            case "/arrow-left":
                action = "arrow-left";
                console.log('Arrow left request received');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('Arrow left request received');
                response.end();
                break;
            case "/arrow-right":
                action = "arrow-right";
                console.log('Arrow right request received');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('Arrow right request received');
                response.end();
                break;
            case "/play-pause":
                action = "play-pause";
                console.log('Play pause request received');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('Play pause request received');
                response.end();
                break;
            case "/gestures":
                action = "gestures";
                console.log('Gestures request received');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('Gestures request received');
                response.end();
                break;
            case "/go-back":
                action = "go-back";
                console.log('Go back request received');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('Go back request received');
                response.end();
                break;
            case "/okay":
                action = "okay";
                console.log('Okay request received');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('Okay request received');
                response.end();
                break;
            case "/get-message":
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write(action);
                response.end();
                action = 'None';
                break;
            default:
                console.log('Unknown icon clicked');
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write('Unknown icon clicked');
                response.end();
                break;
        }
    }else{
        response.writeHead(405, {"Content-Type": "text/html"});
        response.write(`Metodo ${request.method} no permitido!\r\n`);
    }
}

const server = http.createServer(handleRequest);

server.listen(PORT);
console.log(`Listening! (port ${PORT})`)


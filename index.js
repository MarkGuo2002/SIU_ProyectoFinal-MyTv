const http = require('http'); // Importa el modulo http
const fs = require('fs'); // Importa el modulo fs

const PORT = 3000; // Puerto en el que escucha el servidor

const handleRequest = async (request, response) => {
    const url = request.url;
    response.setHeader("Access-Control-Allow-Origin", "*");

    if(request.method === "GET"){ // Comprobar si GET es el methos correcto
        let content;
        let contentType;
        switch(url){
            case "/volume-up":
                console.log('Volume up request received');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('Volume up request received');
                response.end();
                break;
            case "/volume-down":
                console.log('Volume down request received');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('Volume down request received');
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
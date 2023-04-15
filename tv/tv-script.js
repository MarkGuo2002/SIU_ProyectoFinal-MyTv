const socket = io('http://localhost:3000'); // Connect to the server
 
socket.on('connect', () => { // Listen for connection
  console.log('Connected to server');
});

socket.on('message', (message) => { // Listen for message
  console.log(`Message recived: ${message.iconId}`);
  handleRequest(message.iconId); // Handle request
});

socket.on('disconnect', () => { // Listen for disconnection
  console.log('Disconnected from server');
});

   
function handleRequest(iconId) { // Handle request
    switch (iconId) {
        case 'volume-up':
            console.log('Volume up');
            break;
        case 'volume-down':
            console.log('Volume down');
            break;
        case 'arrow-up':
            console.log('Arrow up');
            break;
        case 'arrow-down':
            console.log('Arrow down');
            break;
        case 'arrow-left':
            console.log('Arrow left');
            break;
        case 'arrow-right':
            console.log('Arrow right');
            break;
        case 'play-pause':
            console.log('Play/pause');
            break;
        case 'gestures':
            console.log('Gestures');
            break;
        case 'go-back':
            console.log('Go back');
            break;
        case 'okay':
            console.log('Okay');
            break;  
        default:
            console.log('Unknown request');
    }
}

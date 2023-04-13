const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('message', (message) => {
  console.log(`Received message: ${message.iconId}`);
  handleRequest(message.iconId);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

  
function handleRequest(iconId) {
    switch (iconId) {
        case 'volume-up':
            console.log('Volume up');
            break;
        case 'volume-down':
            console.log('Volume down');
            break;
        // Add more cases for different message types
        default:
            console.log('Unknown request');
    }
}

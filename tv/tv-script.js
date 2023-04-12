document.addEventListener('DOMContentLoaded', function () {
  const socket = io();

  socket.on('message', function (data) {
      console.log('Message received:', data);
      handleMessage(data);
  });

  function handleMessage(message) {
      switch (message.type) {
          case 'volumeUp':
              console.log('Volume up');
              break;
          case 'volumeDown':
              console.log('Volume down');
              break;
          // Add more cases for different message types
          default:
              console.log('Unknown message type:', message.type);
      }
  }
});

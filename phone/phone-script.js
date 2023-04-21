const socket = io(); // Connect to the server

var fav = 0;  // Indicates if the user is on the fav page or not
let isDebouncing = false; // Indicates if a movement has been detected recently
const wait = 500 // Time to wait before detecting another movement
var fav1 = null;
var fav2 = null;



window.addEventListener('devicemotion', event => { // Detect device movement
  if (!isDebouncing) {
    if (event.acceleration.x > 10) {
      handleIconClick('arrow-right');
      isDebouncing = true;
      setTimeout(() => {
        isDebouncing = false;
      }, wait);
    } else if (event.acceleration.x < -10) {
      handleIconClick('arrow-left');
      isDebouncing = true;
      setTimeout(() => {
        isDebouncing = false;
      }, wait);
    } else if (event.acceleration.z < -15) {
      handleIconClick('arrow-up');
      isDebouncing = true;
      setTimeout(() => {
        isDebouncing = false;
      }, wait);
    } else if (event.acceleration.z > 15) {
      handleIconClick('arrow-down');
      isDebouncing = true;
      setTimeout(() => {
        isDebouncing = false;
      }, wait);
    }
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const icons = document.querySelectorAll('i'); // Get all icons

  icons.forEach(icon => { // Add event listener to each icon
    icon.addEventListener('click', function () {
      //console.log(this.id);
      if (this.id == "fav") { // If the user clicks on the fav icon
        updateFav(); // Update the fav page
        window.location.href = '/fav';
      } else if (this.id == "go-back-fav") {
        window.location.href = '/phone';
      } else {
        handleIconClick(this.id); // Handle icon click
      }
    });
  });

});


function handleIconClick(iconId) { // Handle icon click
  socket.emit('icon-clicked', iconId); // Send icon id to the server
}

function redirectTo(url) { // Redirect to the given url
  window.location.href = url;
}

function sendidvideo(idvideo) {
  console.log(idvideo);
  socket.emit('video-clicked', idvideo);
}

function updateFav() {
  socket.emit('update-fav');
}

socket.on('connect', () => { // Listen for connection
  console.log('Connected to server');
});

socket.on('tv-action', (iconId) => { // Listen for message
  console.log(`Message recived: ${iconId}`);
});

socket.on('send-update-fav', fav => {
  fav1 = fav2;
  fav1 = fav;
  console.log(fav1);
  console.log(fav2);
})

socket.on('disconnect', () => { // Listen for disconnection
  console.log('Disconnected from server');
});

socket.on('test', () => {
  console.log('test');
});
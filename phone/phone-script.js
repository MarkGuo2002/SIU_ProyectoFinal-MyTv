const socket = io(); // Connect to the server
let isDebouncing = false; // Indicates if a movement has been detected recently
const wait = 500 // Time to wait before detecting another movement
var fav1 = null;
var fav2 = null;
let startY = null;
let endY = null;

updateFavJs();

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
      handleIconClick(this.id);
      if (this.id == "fav") { // If the user clicks on the fav icon
        window.location.href = '/fav';
      } else if (this.id == "go-back-fav") {
        window.location.href = '/phone';
      } 
      });
    });
  });

document.addEventListener("touchstart", function(event) {
  if (event.touches.length === 1) {
    startY = event.touches[0].clientY;
  }
}, false);

document.addEventListener("touchmove", function(event) {
  if (event.touches.length === 1) {
    endY = event.touches[0].clientY;
  }
}, false);

document.addEventListener("touchend", function() {
  if (startY !== null && endY !== null && endY < startY) {
    handleIconClick('gestures');
  }
  startY = endY = null;
}, false);
  

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

socket.on('connect', () => { // Listen for connection
  console.log('Connected to server');
});

socket.on('update-client-fav', (newFav1, newFav2) => { 
  fav1 = newFav1;
  fav2 = newFav2;
  console.log(`New fav1:`, fav1);
  console.log(`New fav2:`, fav2); 
  updateFavHtml(fav1, fav2);
});

socket.on('disconnect', () => { // Listen for disconnection
  console.log('Disconnected from server');
});

function updateFavJs(){
  console.log("updateFavJs: debug");
  socket.emit('get-client-fav');
}

function updateFavHtml(fav1, fav2){
  console.log("updateFavHtml: debug");
  var containerFav1 = document.querySelector(".container-fav1");
  var containerFav2 = document.querySelector(".container-fav2");
  if (containerFav1 && containerFav2) {
    containerFav1.innerHTML = `<img id="${fav1}" onclick="sendidvideo('${fav1}')" src="\\resources\\preview_videos\\${fav1}.png" alt="">`;
    containerFav2.innerHTML = `<img id="${fav2}" onclick="sendidvideo('${fav2}')" src="\\resources\\preview_videos\\${fav2}.png" alt="">`;
  }  
}
const socket = io(); // Connect to the server
var containerFav1 = document.querySelector(".container-fav1");
var containerFav2 = document.querySelector(".container-fav2");

var fav = 0;  // Indicates if the user is on the fav page or not
let isDebouncing = false; // Indicates if a movement has been detected recently
const wait = 500 // Time to wait before detecting another movement
var fav1 = 'DailyDose';
var fav2 = 'Paella';
updateFav();

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

socket.on('connect', () => { // Listen for connection
  console.log('Connected to server');
});

socket.on('send-update-fav', fav => {
  fav2 = fav1;
  fav1 = fav;
  updateFav();
  console.log(fav1);
  console.log(fav2);
})

socket.on('disconnect', () => { // Listen for disconnection
  console.log('Disconnected from server');
});

function updateFav(){
  containerFav1.innerHTML = `<img id="${fav1}" onclick="sendidvideo('${fav1}')" src="\\resources\\preview_videos\\${fav1}.png" alt="">`;
  containerFav2.innerHTML = `<img id="${fav2}" onclick="sendidvideo('${fav2}')" src="\\resources\\preview_videos\\${fav2}.png" alt="">`;
}
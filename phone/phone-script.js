const socket = io(); // Connect to the server

var fav = 0;  // Indicates if th user is on the fav page or not
let isDebouncing = false; // Indicates if a movement has been detected recently
const wait = 500 // Time to wait before detecting another movement

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
  

document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('i'); // Get all icons

    icons.forEach(icon => { // Add event listener to each icon
        icon.addEventListener('click', function() {
            console.log(this.id);
            handleIconClick(this.id); // Handle icon click
        });
    });

});


function handleIconClick(iconId) { // Handle icon click
    socket.emit('icon-clicked', { iconId }); // Send icon id to the server
} 


function redirectTo(url) { // Redirect to the given url
  window.location.href = url;
}




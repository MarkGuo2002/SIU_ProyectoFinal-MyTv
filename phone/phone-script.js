const socket = io(); // Connect to the server
const wait = 500 // Time to wait before detecting another movement

let isDebouncing = false; // Indicates if a movement has been detected recently
let startY = null; // Y position of the first touch, to detct swipe up
let endY = null; // Y position of the last touch, to detct swipe up

var fav1 = null; // Favorite 1
var fav2 = null; // Favorite 2


updateFavJs(); // Update favs, it need to execute everytime the script is loaded


window.addEventListener('devicemotion', event => { // Detect device movement
  if (!isDebouncing) { // If a movement has not been detected recently
    if (event.acceleration.x > 10) { // If the device is moved to the right
      handleIconClick('arrow-right');
      isDebouncing = true; // Set debouncing to true
      setTimeout(() => {
        isDebouncing = false; // Set debouncing to false after the wait time
      }, wait);
    } else if (event.acceleration.x < -10) { // If the device is moved to the left
      handleIconClick('arrow-left');
      isDebouncing = true;
      setTimeout(() => {
        isDebouncing = false;
      }, wait);
    } else if (event.acceleration.z < -15) { // If the device is moved up
      handleIconClick('arrow-up');
      isDebouncing = true;
      setTimeout(() => {
        isDebouncing = false;
      }, wait);
    } else if (event.acceleration.z > 15) { // If the device is moved down
      handleIconClick('arrow-down');
      isDebouncing = true;
      setTimeout(() => {
        isDebouncing = false;
      }, wait);
    }
  }
});



document.addEventListener('DOMContentLoaded', function () { // Detect button click 
  const icons = document.querySelectorAll('i'); // Get all icons
  icons.forEach(icon => { // Add event listener to each icon
    icon.addEventListener('click', function () {
      handleIconClick(this.id);
      if (this.id == "fav") { // If the user clicks on the fav icon
        window.location.href = '/fav'; // Redirect to the fav page
      } else if (this.id == "go-back-fav") { // If the user clicks on the go back icon on the fav page
        window.location.href = '/phone';
      }
    });
  });
});


document.addEventListener("touchstart", function (event) { // Detect swipe up first touch
  if (event.touches.length === 1) {
    startY = event.touches[0].clientY;
  }
}, false);


document.addEventListener("touchmove", function (event) { // Detect swipe up last touch
  if (event.touches.length === 1) {
    endY = event.touches[0].clientY;
  }
}, false);


document.addEventListener("touchend", function () { // Detect swipe up
  if (startY !== null && endY !== null && endY < startY) { // If the user swipes up
    handleIconClick('gestures'); // Open the gestures menu
  }
  startY = endY = null;
}, false);



socket.on('connect', () => { // Listen for connection
  console.log('Connected to server');
});


socket.on('update-client-fav', (newFav1, newFav2) => { // Listen for fav update
  fav1 = newFav1; // Update favs
  fav2 = newFav2; // Update favs 

  updateFavHtml(fav1, fav2); // Update favs on the HTML page
});


socket.on('disconnect', () => { // Listen for disconnection
  console.log('Disconnected from server');
});



function handleIconClick(iconId) { // Handle icon click
  socket.emit('icon-clicked', iconId); // Send icon id to the server
}


function redirectTo(url) { // Redirect to the given url
  window.location.href = url;
}


function sendIdVideo(idVideo) { // Send video ID to the server
  socket.emit('video-clicked', idVideo);
}


function updateFavJs() { // Update favs in the JS file
  socket.emit('get-client-fav');
}


function updateFavHtml(fav1, fav2) { // Update favs on the HTML page
  var containerFav1 = document.querySelector(".container-fav1"); // Get the fav containers
  var containerFav2 = document.querySelector(".container-fav2"); // Get the fav containers
  if (containerFav1 && containerFav2) { // If the fav containers exist
    containerFav1.innerHTML = `<img id="${fav1}" onclick="sendidvideo('${fav1}')" src="\\resources\\preview_videos\\${fav1}.png" alt="">`;
    containerFav2.innerHTML = `<img id="${fav2}" onclick="sendidvideo('${fav2}')" src="\\resources\\preview_videos\\${fav2}.png" alt="">`;
  }
}

function calculateAverage(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
}

var soundDetectionDelay = 2000; // Set delay between sound detections (in milliseconds)
var minDb = 40; // Set minimum recognizable sound level (in dB)

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function (stream) {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let lastDetectionTime = 0; // Initialize time of last sound detection
    function loop() {
      analyser.getByteFrequencyData(dataArray);
      const average = calculateAverage(dataArray);
      const currentTime = Date.now(); // Get current time
      if (average > minDb && (currentTime - lastDetectionTime) >= soundDetectionDelay) {
        console.log("Sound detected above 20 dB");
        socket.emit('sound-detected');
        // send message via socket here
        lastDetectionTime = currentTime; // Update time of last sound detection
      }
      requestAnimationFrame(loop);
    }
    loop();
  })
  .catch(function (error) {
    console.error(error);
  });

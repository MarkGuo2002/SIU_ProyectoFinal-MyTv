function getMessage() {
  fetch("http://localhost:5500/get-message", {method: "GET"})
  .then(response => response.text())
  .then(data => handleData(data));
}

function handleData(data) {
  switch(data) {
    case "volume-up":
      volumeUp();
      break;
    case "volume-down":
      volumeDown();
      break;
    case "arrow-up":
      arrowUp();
      break;
    case "arrow-down":
      arrowDown();
      break;
    case "arrow-left":
      arrowLeft();
      break;
    case "arrow-right":
      arrowRight();
      break;
    case "play-pause":
      playPause();
      break;
    case "gestures":
      gestures();
      break;
    case "go-back":
      goBack();
      break;
    case "okay":
      okay();
      break;
  }
}

function volumeUp() {
  console.log("Volume up");
}

function volumeDown() {
  console.log("Volume down");
}

function arrowUp() {
  console.log("Arrow up");
}

function arrowDown() {
  console.log("Arrow down");
}

function arrowLeft() { 
  console.log("Arrow left");
}

function arrowRight() {
  console.log("Arrow right");
}

function playPause() {
  console.log("Play pause");
}

function gestures() {
  console.log("Gestures");
}

function goBack() {
  console.log("Go back");
}

function okay() {
  console.log("Okay");
}

console.log("Getting messages");
setInterval(getMessage, 1000);

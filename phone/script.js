document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('i');   // Select all Font Awesome icon elements

    icons.forEach(icon => { // Attach click event listeners to each icon
        icon.addEventListener('click', function() {
            handleIconClick(this);  // Perform action based on the clicked icon's ID
        });
    });
});
  
function handleIconClick(clickedIcon) {
    const iconId = clickedIcon.id;
  
    switch (iconId) {
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
        default:
            console.log('Unknown icon clicked');
            break;
    }
}
  
function volumeUp() {
    fetch("http://localhost:3000/volume-up", {method: "GET"})
    .then(response => {console.log(response.statusText);})
}
  
function volumeDown() {
    fetch("http://localhost:3000/volume-down", {method: "GET"})
    .then(response => {console.log(response.statusText);})
}

function arrowUp() {
    fetch("http://localhost:3000/arrow-up", {method: "GET"})
    .then(response => {console.log(response.statusText);})
}

function arrowDown() {
    fetch("http://localhost:3000/arrow-down", {method: "GET"})
    .then(response => {console.log(response.statusText);})
}

function arrowLeft() {
    fetch("http://localhost:3000/arrow-left", {method: "GET"})
    .then(response => {console.log(response.statusText);})
}

function arrowRight() {
    fetch("http://localhost:3000/arrow-right", {method: "GET"})
    .then(response => {console.log(response.statusText);})
}

function playPause() {
    fetch("http://localhost:3000/play-pause", {method: "GET"})
    .then(response => {console.log(response.statusText);})
}

function gestures() {
    fetch("http://localhost:3000/gestures", {method: "GET"})
    .then(response => {console.log(response.statusText);})
}

function goBack() {
    fetch("http://localhost:3000/go-back", {method: "GET"})
    .then(response => {console.log(response.statusText);})
}

function okay() {
    fetch("http://localhost:3000/okay", {method: "GET"})
    .then(response => {console.log(response.statusText);})
}


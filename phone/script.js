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
        default:
            console.log('Unknown icon clicked');
            break;
    }
}
  
function volumeUp() {
    fetch("http://localhost:3000/volume-up", {method: "GET"})
    .then(response => {console.log(response.statusText);})
    console.log('Volume Up clicked');
}
  
function volumeDown() {
    fetch("http://localhost:3000/volume-down", {method: "GET"})
    .then(response => {console.log(response.statusText);})
    console.log('Volume Down clicked');
}
  
/*function arrowUp() {
    console.log('Arrow Up clicked');
}

function arrowDown() {
    console.log('Arrow Down clicked');
}

function arrowLeft() {
    console.log('Arrow Left clicked');
}

function arrowRight() {
    console.log('Arrow Right clicked');
}

function playPause() {
    console.log('Play/Pause clicked');
}

function gestures() {
    console.log('Gestures clicked');
}

function goBack() {
    console.log('Go Back clicked');
}

function okay() {
    console.log('Okay clicked');
}*/


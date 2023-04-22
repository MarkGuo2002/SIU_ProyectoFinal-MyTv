const socket = io(); // Connect to the server
let user = document.getElementById("user");
let userDropdown = document.querySelector(".user-dropdown");
let videoContainer = document.querySelector(".video-container");
let messageContainer = document.querySelector(".message-container");
console.log(userDropdown);

const INTERFACES = [
    
    {
        id: "nivel-1",
        
    },
    {
        id: "nivel-2",
        
    },
    {
        id: "nivel-3",
        
    }
]
var videoStartIndex = 1;



socket.on('connect', () => { // Listen for connection
    console.log('Connected to server');
});

socket.on('tv-action', (iconId) => { // Listen for message
    console.log(`Message recived: ${iconId}`);
    handleRequest(iconId); // Handle request
});

socket.on('sound', () => {
    console.log("sound detected");
    displayMessage("I have detected a very loud sound, are you okay? Do you need any assistance?");
});

socket.on('disconnect', () => { // Listen for disconnection
    console.log('Disconnected from server');
});

function displayMessage(msg) {
    if (messageContainer.childElementCount > 0) {
        return;
    }
    let messageCard = document.createElement("div");
    messageCard.classList.add("message-card");

    let message = document.createElement("p");
    message.innerHTML = msg;

    messageCard.appendChild(message);
    messageContainer.appendChild(messageCard);
    setTimeout(() => {
        messageContainer.removeChild(messageCard);
    }, 5000);

}

function displayGestures() {
    if (messageContainer.childElementCount > 0) {
        return;
    }
    let messageCard = document.createElement("div");
    messageCard.classList.add("message-card");

    let gestureImg = document.createElement("img");
    gestureImg.setAttribute("src", "/resources/gestos/gestures.jpeg");

    messageCard.appendChild(gestureImg);
    messageContainer.appendChild(messageCard);
    setTimeout(() => {
        messageContainer.removeChild(messageCard);
    }, 5000);
}




function moveUp() {
    console.log("up");
    i = i - 1;
    if (i < 0) {
        i = INTERFACES.length - 1;
    }
    // Add selected class to current item
    selectedId = INTERFACES[i].id;
    document.getElementById(selectedId).classList.add("selected");
}

function moveDown() {
    console.log("down");
    i = i + 1;
    if (i > INTERFACES.length - 1) {
        i = 0;
    }
    // Add selected class to current item
    selectedId = INTERFACES[i].id;
    document.getElementById(selectedId).classList.add("selected");
}

function moveLeft() {
    console.log("left");
    i = i - 1;
    if (i < 0) {
        i = INTERFACES.length - 1;
    }
    // Add selected class to current item
    selectedId = INTERFACES[i].id;
    document.getElementById(selectedId).classList.add("selected");
}

function moveRight() {
    console.log("down");
    i = i + 1;
    if (i > INTERFACES.length - 1) {
        i = 0;
    }
    // Add selected class to current item
    selectedId = INTERFACES[i].id;
    document.getElementById(selectedId).classList.add("selected");
}

var i = 0;
let selectedId = INTERFACES[i].id;
console.log('selectedId', selectedId);
// Add selected class to initial item
document.getElementById(selectedId).classList.add("selected");

function handleRequest(iconId) { // Handle request
    console.log(i)
    document.getElementById(selectedId).classList.remove("selected");
    switch (iconId) {
        case 'volume-up':
            console.log('Volume up');
            break;
        case 'volume-down':
            console.log('Volume down');
            break;
        case 'arrow-up':
            console.log('Arrow up');
            moveUp();
            break;
        case 'arrow-down':
            console.log('Arrow down');
            moveDown();
            break;
        case 'arrow-left':
            console.log('Arrow left');
            moveLeft();
            break;
        case 'arrow-right':
            console.log('Arrow right');
            moveRight();
            break;
        case 'play-pause':
            if (i < videoStartIndex) {
                console.log("menu");
                handleMenuSelection();
                break;
            }
            console.log('Play/pause');
            play_pause();
            break;
        case 'gestures':
            console.log('Gestures');
            break;
        case 'go-back':
            console.log('Go back');
            GoBackToIndex();
            break;
        case 'okay':
            if (i < videoStartIndex) {
                console.log("menu");
                handleExperience();
                break;
            }
            break;
        case 'daily-dose':
            console.log('Daily dose on tv');
            playVideo('daily-dose');
            break;
        case 'paella':
            console.log('Paella on tv');
            playVideo('paella');
            break;
        case 'heart':
            console.log('Heart');
            sendFav();
            break;
        default:
            console.log('Unknown request?');
    }
}



function GoBackToIndex() {
    window.location.href = "tv-index.html";
}

function showDrop() {
    var drop_menu = document.getElementById("drop-down-menu");
    drop_menu.classList.toggle("visible");
    userDropdown.classList.toggle("user-dropdown-show")
}

function iraExperience() {
    window.location.href = "tv-experience.html";
}

function playVideo(id) {
    console.log("in the function", id);
    let video = document.getElementById(id);
    // video.requestFullscreen();-- da errores de seguridad
    video.paused ? video.play() : video.pause();
}

function play_pause() {
    // Queremos que el video se reproduzca y se haga pantalla completa en play y que se pause y se haga pequeño en pause 
    // Si el video está en pausa, que se reproduzca y se haga pantalla completa
    // Si el video está en reproducción, que se pause y se haga pequeño

    let video = document.getElementById(selectedId);

    video.paused ? video.play() : video.pause();
    //video.paused ? video.requestFullscreen() : document.exitFullscreen(); -- da errores de seguridad 

}

function sendFav() {
    var fav = document.getElementById(selectedId);
    socket.emit('update-server-fav', fav.getAttribute('id'));
}

function go_to_experience() {
    window.location.href = "tv-experience.html";
}

function handleExperience() {
    if ((selectedId == 'user') && (userDropdown.classList.contains('user-dropdown-show'))) {
        go_to_experience();
    }
}
function handleMenuSelection() {
    switch (selectedId) {
        case 'user':
            console.log('user');
            showDrop();
            break;
        case 'gestures':
            console.log('gestures');
            displayGestures();
            break;
        case 'settings':
            console.log('asdasdasdasdads');
            displayMessage('This is Settings');
            break;
        case 'logo':
            console.log('logo');
            displayMessage('Welcome to MyTv!!!');
            break;
        default:
            console.log('Unknown request');
    }
}

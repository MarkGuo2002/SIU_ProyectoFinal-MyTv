const socket = io(); // Connect to the server
let user = document.getElementById("user");
let userDropdown = document.querySelector(".user-dropdown");
let videoContainer = document.querySelector(".video-container");
console.log(userDropdown);

const INTERFACES = [
    {
        id: "logo",
    },
    {
        id: "settings"
    },
    {
        id: "favourites"
    },
    {
        id: "user"
    },
    {
        id: "daily-dose",
        title: "Daily Dose Of Internet",
        liked: false,
    },
    {
        id: "san-jacobo",
        title: "Cómo hacer un San Jacobo",
        liked: false,
    },
    {
        id: "bbc-earth",
        title: "BBC Earth Look at this cute cat",
        liked: false,
    },
    {
        id: "squid-game",
        title: "Squid Game - Full Video",
        liked: false,
    },
    {
        id: "game-of-thrones",
        title: "Game of Thrones - Full Video",
        liked: false,
    },
    {
        id: "aot",
        title: "Attack on Titan - Watch Anime",
        liked: false,
    },
    {
        id: "amazon",
        title: "Documental | How beautiful is Amazon?",
        liked: false,
    },
    {
        id: "china",
        title: "Documental | Cómo de diferente es la cultura china?",
        liked: false,
    },
    {
        id: "paella",
        title: "Cómo hacer una paella super fácil",
        liked: false,
    }
]

let logo = document.getElementById("logo");

logo.addEventListener("click", () => {
    fav = "test";
    sendFav(fav);
});

socket.on('connect', () => { // Listen for connection
    console.log('Connected to server');
});

socket.on('tv-action', (iconId) => { // Listen for message
    console.log(`Message recived: ${iconId}`);
    handleRequest(iconId); // Handle request
});

socket.on('disconnect', () => { // Listen for disconnection
    console.log('Disconnected from server');
});

function populateVideos() {
    alert("populate");
    console.log("populate");
    //skipping headers

    for (let i = 4; i < INTERFACES.length; i++) {
        let videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        let video = document.createElement("video");
        video.setAttribute("id", INTERFACES[i].id);
        video.setAttribute("src", `/resources/videos/${INTERFACES[i].id}.mp4#t=3`);
        video.setAttribute("controls", "");

        let title = document.createElement("p");
        title.classList.add("video-title");
        title.innerHTML = INTERFACES[i].title;

        videoCard.appendChild(video);
        videoCard.appendChild(title);
        videoContainer.appendChild(videoCard);


    }
}

function moveUp() {
    console.log("up");
    i = i - 3;
    if (i < 0) {
        i = INTERFACES.length - 1;
    }
    // Add selected class to current item
    selectedId = INTERFACES[i].id;
    document.getElementById(selectedId).classList.add("selected");
}

function moveDown() {
    console.log("down");
    i = i + 3;
    if (i > INTERFACES.length - 1) {
        i = 0;
    }
    // Add selected class to current item
    selectedId = INTERFACES[i].id;
    document.getElementById(selectedId).classList.add("selected");
}

function moveLeft() {
    console.log("left");
    i--;
    if (i < 0) {
        i = INTERFACES.length - 1;
    }
    // Add selected class to current item
    selectedId = INTERFACES[i].id;
    document.getElementById(selectedId).classList.add("selected");
}

function moveRight() {
    console.log("right");
    i++;
    if (i > INTERFACES.length - 1) {
        i = 0;
    }
    // Add selected class to current item
    selectedId = INTERFACES[i].id;
    document.getElementById(selectedId).classList.add("selected");
}

populateVideos();
let i = 0;
let selectedId = INTERFACES[i].id;
console.log('selectedId', selectedId);
// Add selected class to initial item
document.getElementById(selectedId).classList.add("selected");

function handleRequest(iconId) { // Handle request
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
            console.log('Play/pause');
            play_pause();
            break;
        case 'gestures':
            console.log('Gestures');
            break;
        case 'go-back':
            console.log('Go back');
            break;
        case 'okay':
            console.log('Okay');
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
            console.log('Unknown request');
    }
}
// document.addEventListener("keydown", (e) => {
//     e.preventDefault();
//     console.log(i);
//     // Remove selected class from previous item
//     document.getElementById(selectedId).classList.remove("selected");
//     if (e.key === "ArrowRight") {

//         console.log("right");
//         i++;
//         if (i > INTERFACES.length - 1) {
//             i = 0;
//         }
//         // Add selected class to current item
//         selectedId = INTERFACES[i].id;
//         document.getElementById(selectedId).classList.add("selected");
//     } else if (e.key === "ArrowLeft") {
//         e.preventDefault();
//         console.log("left");
//         i--;
//         if (i < 0) {
//             i = INTERFACES.length - 1;
//         }
//         // Add selected class to current item
//         selectedId = INTERFACES[i].id;
//         document.getElementById(selectedId).classList.add("selected");
//     } else if (e.key === "ArrowDown") {
//         e.preventDefault();
//         console.log("down");
//         i = i + 3;
//         if (i > INTERFACES.length - 1) {
//             i = 0;
//         }
//         // Add selected class to current item
//         selectedId = INTERFACES[i].id;
//         document.getElementById(selectedId).classList.add("selected");
//     } else if (e.key === "ArrowUp") {
//         e.preventDefault();
//         console.log("up");
//         i = i - 3;
//         if (i < 0) {
//             i = INTERFACES.length - 1;
//         }
//         // Add selected class to current item
//         selectedId = INTERFACES[i].id;
//         document.getElementById(selectedId).classList.add("selected");
//     }

//     else if (e.key === " ") {
//         console.log("space");
//         if (!document.fullscreenElement) { // Enter full screen
//             let video = document.getElementById(selectedId);
//             video.requestFullscreen();
//             video.play();
//         } else { // Exit full screen
//             document.exitFullscreen();
//         }
//     }
//     else if (e.key === "Enter") {
//         if (i == 3) {
//             //add user-dropdown class to user dropdown
//             userDropdown.classList.toggle("user-dropdown-show");
//         }
//         console.log("enter");
//         let video = document.getElementById(selectedId);
//         video.paused ? video.play() : video.pause();
//     }

//     else if (e.key === "a") {
//         console.log("d");
//         let video = document.getElementById(selectedId);
//         video.currentTime = video.currentTime - 10;
//     }
//     else if (e.key === "d") {
//         console.log("q");
//         let video = document.getElementById(selectedId);

//         video.currentTime = video.currentTime + 10;
//     }

//     else if (e.key === "w") {
//         console.log("w");
//         e.preventDefault(); // prevent default behavior of arrow key
//         let video = document.getElementById(selectedId);
//         if (video.volume < 1) {
//             video.volume += 0.1;
//         }
//     } else if (e.key === "s") {
//         console.log("s"); s
//         e.preventDefault(); // prevent default behavior of arrow key
//         let video = document.getElementById(selectedId);
//         if (video.volume > 0) {
//             video.volume -= 0.1;
//         }
//     }



// if (i == 3) {
//     userDropdown.classList.add("user-dropdown-show");
// }
// else {
//     userDropdown.classList.remove("user-dropdown-show");
// }
// });




// user.addEventListener("click", () => {
//     console.log("click");
//     userDropdown.classList.toggle("user-dropdown-show");
// });


function show_drop() {
    var drop_menu = document.getElementById("drop-down-menu");
    drop_menu.classList.toggle("visible");
}

function mostrarPopup() {
    document.getElementById("miPopup").style.display = "flex";
}

function ocultarPopup() {
    document.getElementById("miPopup").style.display = "none";
}

function iraExperience() {
    window.location.href = "tv-experience.html";
}

function playVideo(id){
    console.log("in the function", id);
    let video = document.getElementById(id);
    // video.requestFullscreen();-- da errores de seguridad
    video.paused ? video.play() : video.pause();
}

function play_pause(){
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






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

populateVideos();

let i = 0;
let selectedId = INTERFACES[i].id;

// Add selected class to initial item
document.getElementById(selectedId).classList.add("selected");

document.addEventListener("keydown", (e) => {
    console.log(i);
    // Remove selected class from previous item
    document.getElementById(selectedId).classList.remove("selected");
    if (e.key === "ArrowRight") {
        console.log("right");
        i++;
        if (i > INTERFACES.length - 1) {
            i = 0;
        }
        // Add selected class to current item
        selectedId = INTERFACES[i].id;
        document.getElementById(selectedId).classList.add("selected");
    } else if (e.key === "ArrowLeft") {
        console.log("left");
        i--;
        if (i < 0) {
            i = INTERFACES.length - 1;
        }
        // Add selected class to current item
        selectedId = INTERFACES[i].id;
        document.getElementById(selectedId).classList.add("selected");
    } else if (e.key === "ArrowDown") {
        console.log("down");
        i = i + 3;
        if (i > INTERFACES.length - 1) {
            i = 0;
        }
        // Add selected class to current item
        selectedId = INTERFACES[i].id;
        document.getElementById(selectedId).classList.add("selected");
    } else if (e.key === "ArrowUp") {
        console.log("up");
        i = i - 3;
        if (i < 0) {
            i = INTERFACES.length - 1;
        }
        // Add selected class to current item
        selectedId = INTERFACES[i].id;
        document.getElementById(selectedId).classList.add("selected");
    }

    if (i == 3) {
        userDropdown.classList.add("user-dropdown-show");
    }
    else {
        userDropdown.classList.remove("user-dropdown-show");
    }
});


function populateVideos() {
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

user.addEventListener("click", () => {
    console.log("click");
    userDropdown.classList.toggle("user-dropdown-show");
});

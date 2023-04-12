const socket = io();

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
    socket.emit('icon-clicked', { iconId });
}

let sidebar = document.querySelector(".sidebar");
let burger = document.querySelector(".burger");

burger.addEventListener("click", () => {
    sidebar.classList.toggle("show-sidebar");
})

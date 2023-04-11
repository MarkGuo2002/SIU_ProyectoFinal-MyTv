let daylyDose = document.getElementById("daylyDose");
let user = document.getElementById("user")
let userDropdown = document.querySelector(".user-dropdown")
console.log(userDropdown)


user.addEventListener("click", () => {
    console.log("click");
    userDropdown.classList.toggle("user-dropdown-show");
});

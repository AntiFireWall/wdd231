const navBar = document.querySelector(".nav-bar");

function openNav(hamburger) {
    hamburger.classList.toggle("change");
    navBar.classList.toggle("nav-show");
}
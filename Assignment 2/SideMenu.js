let menuIcon = document.querySelector("#menuButton img");
let sideMenu = document.getElementById("OpenedMenu");

let isOpen = false;

menuIcon.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
        sideMenu.classList.add("active");
        menuIcon.src = "Body/Opened Menu/close.99df6797.png";
    } else {
        sideMenu.classList.remove("active");
        menuIcon.src = "Header/Menu/menu.png";
    }
});

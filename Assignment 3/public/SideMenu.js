window.addEventListener("load", function () {

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

    // ================= MENU HOVER =================

    let items = document.querySelectorAll(".MenuGroceryDiv, .MenuElectronicsDiv");
    let groups = document.querySelectorAll(".rightGroup");
    let menuRight = document.getElementById("MenuRight");

    // show on hover
    items.forEach(item => {

        item.addEventListener("mouseenter", () => {

            // hide all groups
            groups.forEach(g => g.style.display = "none");

            // show target group
            let target = item.getAttribute("data-target");
            let activeGroup = document.getElementById(target);

            if (activeGroup) {
                activeGroup.style.display = "grid";
            }
        });

    });

    //Go To Products Page Navigator
    $("#Go-To-Products-Page").on("click", function () {
        window.location.href = "/products";
    });

});
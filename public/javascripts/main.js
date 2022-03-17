console.log(":)");

function setActiveMenu() {
    var menuLinks = document.getElementsByClassName('menu-link')
    Array.from(menuLinks).forEach(link => {
        var url = window.location.href.split('/').pop()
        url = url.split(' ')[0]
        if(slugify(link.href.split('/').pop()) == url) {
            link.style.borderBottom = "#fdbb18";
            link.style.borderBottomStyle = "solid";
        }
    });
}

setActiveMenu()

function slugify(string) {
    string = string.replace('ö','%C3%B6')
    return string
}

var galleryImages = document.getElementsByClassName('gallery-image');

Array.from(galleryImages).forEach(img => {
    if (img.getAttribute("data-visible") == 1) {
        img.setAttribute("src", img.getAttribute("thumb-src"))
        img.onload = function () {
            img.style.opacity = '1'
        };
    }
});

function lazyLoading() {
    var images = document.getElementsByClassName("gallery-image")
    var isVisible = 0
    Array.from(images).forEach(image => {
        if (image.getAttribute("data-visible") == 0) {
            var rect = image.getBoundingClientRect()
            var elemTop = rect.top
            var elemBottom = rect.bottom
            isVisible = elemTop < window.innerHeight && elemBottom >= 0
            if (isVisible) {
                image.setAttribute("data-visible", 1)
                image.setAttribute("src", image.getAttribute("thumb-src"))
                image.onload = function () {
                    // if((this.height / this.width) < 1) image.parentElement.classList.add('wide')
                    image.style.opacity = '1'
                };
            }
        }
    });
}

window.onscroll = function () {
    lazyLoading()
    navbarShadow()
};

let menuActive = false;

function finishHamburgerAnimation() {
    if (!menuActive) {
        line1.removeEventListener("transitionend", finishHamburgerAnimation);
        line1.style.transform += "translateY(-8px)";
        line3.style.transform += "translateY(8px)";
        line2.style.opacity = "1";
    } else {
        line1.removeEventListener("transitionend", finishHamburgerAnimation);
        line1.style.transform += "rotate(45deg)";
        line3.style.transform += "rotate(-45deg)";
    }
}

function toggleMenu() {
    if (!menuActive) {
        menuActive = true;
        menu.classList.add("active");
        document
            .getElementById("line1")
            .addEventListener("transitionend", finishHamburgerAnimation);
        line1.style.transform = "translateY(8px)";
        line3.style.transform = "translateY(-8px)";
        line2.style.opacity = "0";
        fullscreen.style.visibility = "visible";
        fullscreen.style.opacity = "0.7";
    } else {
        menuActive = false;
        fullscreen.style.visibility = "hidden";
        fullscreen.style.opacity = "0";
        document
            .getElementById("line1")
            .addEventListener("transitionend", finishHamburgerAnimation);
        line1.style.transform += "rotate(-45deg)";
        line3.style.transform += "rotate(45deg)";
        menu.classList.remove("active");
    }
}

function navbarShadow() {
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos >= 100) {
        document.getElementById('navbar').classList.add("navbar-shadow");
    } else {
        document.getElementById("navbar").classList.remove("navbar-shadow");
    }
}
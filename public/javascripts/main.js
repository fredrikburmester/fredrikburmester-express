function setActiveMenu() {
    var els = document.getElementsByClassName('menu-link')
    Array.from(els).forEach(el => {
        var obj = window.location.href.split('/')
        obj.forEach(els => {
            if(slugify(el.innerHTML) == els) {
                el.style.borderBottom = "#fdbb18";
                el.style.borderBottomStyle = "solid";
            }
        });
    });
}

function slugify(string) {
    string = string.replace('ö','%C3%B6')
    return string
}

setActiveMenu()

var els = document.getElementsByClassName('gallery-image');
Array.from(els).forEach(img => {
    if (img.getAttribute("data-visible") == 1) {
        img.setAttribute("src", img.getAttribute("data-src"))
        img.onload = function () {
            if((this.height / this.width) < 1) img.parentElement.classList.add('wide'); else img.parentElement.classList.add('tall')
            var getUrl = window.location;
            if(this.src == getUrl.origin + "/static/images/Home/thumbs/1.jpg" || this.src == getUrl.origin + "/static/images/Home/thumbs/2.jpg") {
                img.parentElement.classList.add('wide')
            }
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
                image.setAttribute("src", image.getAttribute("data-src"))
                image.onload = function () {
                    if((this.height / this.width) < 1) image.parentElement.classList.add('wide')
                    image.style.opacity = '1'
                };
            }
        }
    });
};

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

var zoomed = 0;
var open = 0;
var images = "[{&#x27;index&#x27;: &#x27;002&#x27;, &#x27;src&#x27;: &#x27;images/Home/2.jpg&#x27;, &#x27;thumb&#x27;: &#x27;images/Home/thumbs/2.jpg&#x27;}, {&#x27;index&#x27;: &#x27;001&#x27;, &#x27;src&#x27;: &#x27;images/Home/1.jpg&#x27;, &#x27;thumb&#x27;: &#x27;images/Home/thumbs/1.jpg&#x27;}]"
images = images.replace(/&#x27;/g,'\"');
var obj = JSON.parse(images)
var currentLightBoxImage = 0;
var l = document.getElementById("lightbox")

var e = document.createElement("div");
e.id = "lightbox-bg"
e.classList.add("lightbox-bg")
l.appendChild(e)

var e2 = document.createElement("div");
e2.classList.add("closeBtn")
e2.setAttribute('onclick', 'closeLightbox()')
l.appendChild(e2);
var e22 = document.createElement("div");
e22.classList.add("line")
e22.id = "lightbox-line1"
e2.appendChild(e22);
var e23 = document.createElement("div");
e23.classList.add("line")
e23.id = "lightbox-line2"
e2.appendChild(e23);
l.appendChild(e2);

var e3 = document.createElement("div");
e3.classList.add("swipe")
e3.id = "slider"

var e32 = document.createElement("div");
e32.classList.add("swipe-wrap")
e32.id = "slider-wrap"

obj.forEach(image => {
    var div = document.createElement("div");
    var img = document.createElement("img");
    img.setAttribute('data-src', '/static/' + image.src)
    img.classList.add("lightbox-image")
    img.alt = ""
    div.appendChild(img)
    e32.appendChild(div)
});

e3.appendChild(e32);
l.appendChild(e3);

var currentImageIndex = 0
var images = document.getElementsByClassName('lightbox-image')

var html = document.getElementsByTagName("html")[0]; 
var body = document.getElementsByTagName("body")[0]; 

function closeLightbox() {
    html.classList.remove("no-scroll")
    body.classList.remove("no-scroll")

    document.getElementById('lightbox').classList.add("hide-lightbox")
    document.getElementById('lightbox-bg').classList.add("hide-lightbox")
    document.getElementById('slider').classList.add("hide-lightbox")



    // document.getElementById('lightbox').style.opacity = '0'

    Array.from(images).forEach(image => {
        image.src = ""
    });
}

function openLightbox(index) {
    html.classList.add("no-scroll")
    body.classList.add("no-scroll")
    document.getElementById('lightbox').style.visibility = "visible"
    document.getElementById('lightbox').classList.remove("hide-lightbox")
    document.getElementById('lightbox-bg').classList.remove("hide-lightbox")
    document.getElementById('slider').classList.remove("hide-lightbox")



    // document.getElementById('lightbox').style.opacity = '1'

    var old_element = document.getElementById("slider");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);

    var prevImage;
    var nextImage;
    var src;

    var maxIndex = images.length - 1

    if (index >= maxIndex) index = maxIndex; else if (index <= 0) index = 0;

    if (index <= 0) {
        currentImageIndex = 0
        prevImage = images[maxIndex]
    } else {
        currentImageIndex = index
        prevImage = images[index - 1]
    }

    if (index >= maxIndex) {
        currentImageIndex = maxIndex
        nextImage = images[0]
    } else {
        currentImageIndex = index
        nextImage = images[index + 1]
    }

    src = images[index].getAttribute("data-src")
    images[index].src = src

    src = prevImage.getAttribute("data-src")
    prevImage.src = src

    src = nextImage.getAttribute("data-src")
    nextImage.src = src

    var element = document.getElementById('slider');
    window.swipe = new Swipe(element, {
        startSlide: index,
        auto: 0,
        draggable: true,
        autoRestart: true,
        continuous: false,
        disableScroll: true,
        stopPropagation: true,
        callback: function (index, element) {
            if (index <= 0)
                prevImage = images[maxIndex]
            else
                prevImage = images[index - 1]

            if (index >= maxIndex)
                nextImage = images[0]
            else
                nextImage = images[index + 1]

            src = prevImage.getAttribute("data-src")
            prevImage.src = src

            src = nextImage.getAttribute("data-src")
            nextImage.src = src
            currentImageIndex = index
        },
        transitionEnd: function (index, element) {}
    });
}

document.addEventListener('keydown', function(event) {
    if(event.key == "ArrowRight")
        goToNextImage()
    else if(event.key == "ArrowLeft")
        goToPreviousImage()
    else if(event.key == "Escape")
        closeLightbox()
});

function goToNextImage() {
    closeLightbox()
    openLightbox(currentImageIndex + 1)
}

function goToPreviousImage() {
    closeLightbox()
    openLightbox(currentImageIndex - 1)
}

let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = slides.children.length;

function nextSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) currentIndex = 0;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Change slide every 3 seconds
setInterval(nextSlide, 3000);
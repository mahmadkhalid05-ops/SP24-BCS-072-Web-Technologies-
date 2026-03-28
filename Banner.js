// ================= Carousel + Dots =================

// Select all slides and the dots container
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');

// Track the current slide index
let currentIndex = 0;

// ---------------- CREATE DOTS ----------------
slides.forEach(() => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// ---------------- SHOW NEXT SLIDE ----------------
function showNextSlide() {
    // Hide current slide
    slides[currentIndex].classList.remove('active');

    // Move to next slide (wrap around)
    currentIndex = (currentIndex + 1) % slides.length;

    // Show next slide
    slides[currentIndex].classList.add('active');

    // Update dots
    updateDots();
}

// ---------------- UPDATE DOTS ----------------
function updateDots() {
    // Clear all active dots
    dots.forEach(dot => dot.classList.remove('active'));

    // Activate current dot
    dots[currentIndex].classList.add('active');

    // Activate next dot (for 2-dot highlight effect)
    let next = (currentIndex + 1) % dots.length;
    dots[next].classList.add('active');
}

// ---------------- INITIALIZE ----------------
updateDots(); // show initial active dots

// ---------------- AUTO SLIDE ----------------
setInterval(showNextSlide, 3000); // change slide every 3 seconds
const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slide");
const slideCount = slides.length;
let currentSlide = 0;

function goToSlide(slideIndex) {
    if (slideIndex < 0) {
        slideIndex = slideCount - 1;
    } else if (slideIndex >= slideCount) {
        slideIndex = 0;
    }
    carousel.style.transform = `translateY(-${slideIndex * 100}%)`;
    currentSlide = slideIndex;
}

// Agregar botones de navegación si es necesario

document.querySelector(".prev-button").addEventListener("click", () => {
    goToSlide(currentSlide - 1);
});

document.querySelector(".next-button").addEventListener("click", () => {
    goToSlide(currentSlide + 1);
});

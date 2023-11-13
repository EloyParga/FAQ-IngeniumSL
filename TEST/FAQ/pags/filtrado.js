function filtrarVideos() {
  const inputFilter = document.getElementById('inputFilter');
  const filter = inputFilter.value.toLowerCase();
  const videoSlides = document.querySelectorAll('.swiper-slide');

  videoSlides.forEach((slide) => {
    const categories = slide.getAttribute('data-category').toLowerCase().split(' ');

    // Verificar si alguna de las categorías coincide con el filtro
    const match = categories.some((category) => category.includes(filter));

    if (match) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

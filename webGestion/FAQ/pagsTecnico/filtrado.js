
/**Funcion para el filtrado de videos FAQ */
function filtrarVideos() {
  const inputFilter = document.getElementById('inputFilter');      //almacena el Buscador
  const filter = inputFilter.value.toLowerCase();                 //contenido del Buscador
  const videoSlides = document.querySelectorAll('.swiper-slide');// almacena los videos

  videoSlides.forEach((slide) => { //recorre Array Videos
    const categories = slide.getAttribute('data-category').toLowerCase();

    if (categories.includes(filter)) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

const swiper = new Swiper('.swiper', {
    // Optional parameters
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },
    // Navigation arrows
    breakpoints:{
      1300:{
        autoHeight: true,
        direction: 'vertical',
        loop: false,
        slidesPerView: 3
        ,
      }
      
    }
  });

//Función para ocultar navigation buttons en pantalla grande

  window.addEventListener('DOMContentLoaded', function() {
    // Función para ocultar los elementos de navegación
    function hideNavigationButtons() {
      var screenWidth = window.innerWidth;
      var navigationButtons = document.querySelectorAll('.swiper-button-prev, .swiper-button-next');
  
      if (screenWidth > 1300) {
        navigationButtons.forEach(function(button) {
          button.style.display = 'none';
        });
      } else {
        navigationButtons.forEach(function(button) {
          button.style.display = 'block'; // O el valor CSS deseado para mostrar los botones
        });
      }
    }

    // Llama a la función al cargar la página y cuando la ventana cambie de tamaño
    hideNavigationButtons();

    window.addEventListener('resize', function() {
      hideNavigationButtons();
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    const swiperElement = document.querySelector('.swiper');
    const gridElement = document.querySelector('.video-grid');
  
    function updateVideoDisplay() {
      if (window.innerWidth <= 1300) {
        swiperElement.style.display = 'none';
        gridElement.style.display = 'grid';
      } else {
        swiperElement.style.display = 'block';
        gridElement.style.display = 'none';
      }
    }
  
    window.addEventListener('resize', updateVideoDisplay);
    updateVideoDisplay(); // Llamada inicial para configurar el display según el tamaño actual de la ventana
  });
  
  
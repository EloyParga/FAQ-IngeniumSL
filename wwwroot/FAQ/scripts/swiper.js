const swiper = new Swiper('.swiper', {
    // Optional parameters

    spaceBetween:10,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Navigation arrows
 
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints:{
        1301:{
            direction: 'vertical',
            loop: false,
            slidesPerView: 3,
        },
        769:{
            direction: 'horizontal',
            loop: false,
            slidesPerView: 5, //o 4?
        },
        300:{
            direction: 'horizontal',
            loop: false,
            slidesPerView: 3,
        }
    }
  });
const swiper = new Swiper('.swiper', {
    // Optional parameters

    direction: 'vertical',
    loop: true,
    slidesPerView: 3,
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
            slidesPerView: 4,
        },
        300:{
            direction: 'horizontal',
            loop: false,
            slidesPerView: 3,
        }
    }
  });
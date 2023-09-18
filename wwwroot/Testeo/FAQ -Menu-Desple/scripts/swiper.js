const swiper = new Swiper('.swiper', {
    // Optional parameters
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints:{
        1301:{
            direction: 'vertical',
            loop: true,
            slidesPerView: 3,
            effect: "coverflow",
/*             coverflow: {
                rotate: 180,
                scale:2,
                depth: 200,
                modifier: 2,
                opacity:0.9,
                slideShadows: true,
              }, */
        },
        769:{
            direction: 'horizontal',
            loop: true,
            slidesPerView: 2,
        },
        300:{
            direction: 'horizontal',
            loop: true,
            effect:"creative",
            slidesPerView: 1,
        }
    }
  });
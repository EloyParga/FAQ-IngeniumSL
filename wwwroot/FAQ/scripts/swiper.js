const swiper = new Swiper('.swiper', {
    
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
<<<<<<< HEAD
=======
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
>>>>>>> 6fe9bbb858b37ec2bbe0dd8c6d962c6f9a358f9c
    breakpoints:{
        1301:{
            direction: 'vertical',
            loop: true,
            slidesPerView: 3,
        },
        769:{
            direction: 'horizontal',
            loop: true,
            slidesPerView: 4,
        },
        300:{
            direction: 'horizontal',
            loop: true,
            slidesPerView: 3,
        }
    }
  });


(function () {
    const topExpert = document.querySelector(".top-expert");
    if (!topExpert) reviews;

    new Swiper(".top-expert__slider", {
        spaceBetween: 30,
        navigation: {
            nextEl: ".top-expert .sl-arrows__arrow--next",
            prevEl: ".top-expert .sl-arrows__arrow--prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1.1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2.2,
                spaceBetween: 30,
            },
            980: {
                slidesPerView: 3,
            },
        },
    });
})();
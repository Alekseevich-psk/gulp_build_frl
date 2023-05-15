(function () {
    const test = document.querySelector(".test");
    if (!test) return;

    new Swiper(".test__slider", {
        spaceBetween: 30,
        navigation: {
            nextEl: ".test .sl-arrows__arrow--next",
            prevEl: ".test .sl-arrows__arrow--prev",
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
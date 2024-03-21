(function () {
    const btnTop = document.querySelector(".btn-top");
    if (!btnTop) return;

    trackScroll(btnTop);

    window.addEventListener("scroll", () => {
        trackScroll(btnTop);
    });

    btnTop.addEventListener("click", backToTop);

    function trackScroll(el) {
        let scrolled = window.pageYOffset;
        let coords = 120;

        if (scrolled >= coords) {
            el.classList.add("show");
        }

        if (scrolled <= coords) {
            el.classList.remove("show");
        }
    }

    function backToTop() {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -80);
            setTimeout(backToTop, 0);
        }
    }
})();

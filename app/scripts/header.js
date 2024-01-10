(function () {
    const header = document.querySelector(".header");
    if (!header) return;

    const classForHeaderScroll = "scroll";
    const marginBottomFromElement = 0;

    const headerHeight = header.querySelector(".header__height");
    const headerContainer = header.querySelector(".header__container");

    addClassForElement(header);

    window.addEventListener("scroll", () => {
        addClassForElement(header);
    });

    window.addEventListener("resize", () => {
        addClassForElement(header);
    });

    function addClassForElement(el) {
        scrollHeight() > getMaxOfArray(headerContainer) ? el.classList.add(classForHeaderScroll) : el.classList.remove(classForHeaderScroll);

        if (headerHeight) {
            headerHeight.style.height = getMaxOfArray(headerContainer) + "px";
        }
    }

    function scrollHeight() {
        return Math.max.apply(null, [window.pageYOffset, document.documentElement.scrollTop]);
    }

    function getMaxOfArray(el) {
        return Math.max.apply(null, [el.clientHeight, el.offsetHeight]) + marginBottomFromElement;
    }

})();

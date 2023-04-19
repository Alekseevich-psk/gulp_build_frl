(function () {
    const header = document.querySelector(".header");
    if (!header) return;

    const classForHeaderScroll = "scroll";
    const marginBottomFromElement = 0;
    const nextElem = header.nextElementSibling;

    const heightElem = getMaxOfArray(header);
    
    addClassForElement(header);

    window.onscroll = () => {
        addClassForElement(header);
    };

    function addClassForElement(el) {
        scrollHeight() > heightElem ? el.classList.add(classForHeaderScroll) : el.classList.remove(classForHeaderScroll);
        nextElem.style.marginTop = heightElem + 'px';
    }

    function scrollHeight() {
        return Math.max.apply(null, [window.pageYOffset, document.documentElement.scrollTop]);
    }

    function getMaxOfArray(el) {
        return Math.max.apply(null, [el.clientHeight, el.offsetHeight]) + marginBottomFromElement;
    }

})();

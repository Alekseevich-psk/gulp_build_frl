(function () {
    const parent = document.querySelector(".footer");
    if (!parent) return;

    const body = document.body;
    const html = document.documentElement;

    function fixedFooter() {
        const heightDoc = Math.max(body.offsetHeight, html.offsetHeight);
        const heightWindow = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
        heightDoc < heightWindow ? parent.classList.add("fixed") : parent.classList.remove("fixed");
    }

    window.addEventListener('resize', () => {
        if (parent.classList.contains("fixed")) parent.classList.remove("fixed");
        fixedFooter();
    });

    fixedFooter();
})();

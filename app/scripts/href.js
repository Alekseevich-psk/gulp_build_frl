(function () {
    const links = document.querySelectorAll('a[href*="#"]');
    if (links.length <= 0) return;

    let marginTop = 120;
    if (innerWidth <= 768) marginTop = 80;

    window.addEventListener("resize", () => {
        if (innerWidth <= 768) {
            marginTop = 80;
        }
    });

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const blockID = link.getAttribute("href").substr(1);

            if (blockID && blockID !== "") {
                const elem = document.querySelector(`#${blockID}`);

                if (elem) {
                    window.scrollBy({
                        top: elem.getBoundingClientRect().top - marginTop,
                        left: 0,
                        behavior: "smooth",
                    });
                }
            }
        });
    });
})();

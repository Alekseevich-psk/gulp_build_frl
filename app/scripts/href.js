(function () {
    const links = document.querySelectorAll('a[href*="#"]');
    if (links.length <= 0) return;

    let marginTop = 100;
    if (window.innerWidth <= 768) marginTop = 80;

    window.addEventListener("resize", () => {
        if (window.innerWidth <= 768) {
            marginTop = 80;
        }
    });

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            const blockID = link.getAttribute("href").substr(1);

            if (blockID && blockID !== "") {
                const elem = document.querySelector(`#${blockID}`);

                if (elem) {
                    e.preventDefault();
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
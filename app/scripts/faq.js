(function () {
    const faq = document.querySelector(".faq");
    if (!faq) return;

    faq.querySelectorAll(".faq__item").forEach((element) => {
        element.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    });
})();

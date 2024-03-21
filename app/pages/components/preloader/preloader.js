document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.querySelector(".preloader");
    if (!preloader) return;

    setTimeout(() => {
        document.querySelector(".preloader").classList.add("hide");
    }, 1000);
});
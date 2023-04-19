(function () {
    const ranting = document.querySelectorAll(".ranting");
    console.log(ranting.length);
    if (ranting.length <= 0) return;

    ranting.forEach(el => {
        const maxCount = el.querySelector(".ranting__max-count");
        const rantingValue = el.querySelector(".ranting__value");
        const starsList = el.querySelector(".ranting__list");

        if (maxCount) cloneStar(starsList, Number(maxCount.innerHTML), Number(rantingValue.innerHTML));
    })

    function cloneStar(parent, countElem, rantingValue) {
        const integer = Math.trunc(rantingValue);
        let percent = 100;

        for (let i = 0; i < countElem; i++) {
            if (integer == i) percent = (rantingValue % 1) * 100;
            if (integer < i) percent = 0;

            parent.insertAdjacentHTML(
                "beforeend",
                `<div class="ranting__item">
                    <div class="ranting__bg" style="width:${percent}%"></div>
            </div>`
            );
        }
    }

})();

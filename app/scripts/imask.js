(function () {
    const inputs = document.querySelectorAll('input[name="phone"]');
    if (!inputs.length) return;

    inputs.forEach((element) => {
        element.addEventListener("input", (e) => {
            if (Number(e.target.value) === 8) {
                e.target.value = "";
            } else {
                IMask(element, {
                    mask: "+7 (000) 000-00-00",
                });
            }
        });
    });
})();

(function () {
    const inputs = document.querySelectorAll('input[name="email"]');
    if (!inputs.length) return;

    inputs.forEach((element) => {
        if (element) {
            let el = IMask(element, {
                mask: function (value) {
                    if (/^[a-z0-9_\.-]+$/.test(value)) return true;
                    if (/^[a-z0-9_\.-]+@$/.test(value)) return true;
                    if (/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value)) return true;
                    if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value)) return true;
                    if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value)) return true;
                    if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value)) return true;
                    if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value)) return true;
                    return false;
                },
                lazy: false,
            });
        }
    });
})();
(function () {
    const popup = document.querySelector(".popup");
    if (!popup) return;

    const popupBtnOpens = document.querySelectorAll(".open__popup");
    const formTitleInput = popup.querySelector('[name="formTitle"]');
    const descForm = popup.querySelector(".popup__desc");

    const popupWrap = popup.querySelector(".popup__wrap");
    const popupSuccess = popup.querySelector(".popup__success");
    const btnClose = popup.querySelector(".popup__close");
    const btnOverlay = popup.querySelector(".popup__overlay");

    const body = document.querySelector("body");

    function openPopup() {
        if (popupWrap.classList.contains("hide")) {
            popupWrap.classList.remove("hide");
        }

        if (popupSuccess.classList.contains("show")) {
            popupSuccess.classList.remove("show");
        }

        if (!popup.classList.contains("active")) {
            popup.classList.add("active");
        }

        if (!body.classList.contains("overflow")) {
            body.classList.add("overflow");
        }
    }

    function closePopup() {
        if (popupWrap.classList.contains("hide")) {
            popupWrap.classList.remove("hide");
        }

        if (popupSuccess.classList.contains("show")) {
            popupSuccess.classList.remove("show");
        }

        if (popup.classList.contains("active")) {
            popup.classList.remove("active");
        }

        if (body.classList.contains("overflow")) {
            body.classList.remove("overflow");
        }
    }

    popupBtnOpens.forEach((el) => {
        el.addEventListener("click", function () {
            const title = el.nextElementSibling;
            descForm.style.display = "none";

            if (formTitleInput && title) {
                formTitleInput.value = title.innerHTML;
                descForm.innerHTML = title.innerHTML;
                descForm.style.display = "block";
            }

            openPopup();
        });
    });

    btnClose.addEventListener("click", () => {
        closePopup();
    });

    btnOverlay.addEventListener("click", function (e) {
        const target = e.target;

        if (target.classList.contains("popup__overlay")) {
            closePopup();
        }
    });
})();

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var link = document.querySelector(".js-link");
    var form = document.querySelector(".js-form");

    var arrivalDate = form.querySelector("[name=arrival-date]");
    var livingDate = form.querySelector("[name=living-date]");
    var adultsAmount = form.querySelector("[name=adults-amount]");
    var kidsAmount = form.querySelector("[name=kids-amount]");

    var isStorageSupport = true;
    var adults = "";
    var kids = "";

    var codeEscape = 27;

    try {
      adults = localStorage.getItem("adults");
      kids = localStorage.getItem("kids");
    } catch (err) {
      isStorageSupport = false;
    }

    form.classList.add("modal-hidden");

    var onLinkClick = function (evt) {
      evt.preventDefault();
      form.classList.toggle("modal-hidden");
      form.classList.add("modal-animate");
      arrivalDate.focus();
      if (adults && kids) {
        adultsAmount.value = adults;
        kidsAmount.value = kids;
      }
    };

    var removeAnimate = function () {
      form.classList.remove("modal-error");
    }

    var onSubmitClick = function (evt) {
      if (!arrivalDate.value || !livingDate.value) {
        evt.preventDefault();
        form.classList.remove("modal-animate");
        form.classList.add("modal-error");
        setTimeout(removeAnimate, 1000);
        arrivalDate.focus();
      } else {
        if (isStorageSupport) {
          localStorage.setItem("adults", adultsAmount.value);
          localStorage.setItem("kids", kidsAmount.value);
        }
      }
    };

    var isKeydownEsc = function (evt) {
      if (evt.keyCode === codeEscape) {
        evt.preventDefault();
        if (!form.classList.contains("modal-hidden")) {
          form.classList.add("modal-hidden");
          form.classList.remove("modal-error");
        }
      }
    };

    link.addEventListener("click", onLinkClick);

    form.addEventListener("submit", onSubmitClick);

    window.addEventListener("keydown", isKeydownEsc);
  });
})();
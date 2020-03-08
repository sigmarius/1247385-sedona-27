var link = document.querySelector(".search-header");
var form = document.querySelector(".search-form");

var arrivalDate = form.querySelector("[name=arrival-date]");
var livingDate = form.querySelector("[name=living-date]");
var adultsAmount = form.querySelector("[name=adults-amount]");
var kidsAmount = form.querySelector("[name=kids-amount]");

var isStorageSupport = true;
var adults = "";
var kids = "";

try {
  adults = localStorage.getItem("adults");
  kids = localStorage.getItem("kids");
} catch (err) {
  isStorageSupport = false;
}

window.addEventListener("load", function (evt) {
  evt.preventDefault();
  form.classList.add("modal");
});

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  form.classList.toggle("modal");
  form.classList.remove("modal-error");
  arrivalDate.focus();
  if (adults && kids) {
    adultsAmount.value = adults;
    kidsAmount.value = kids;
  }
});

form.addEventListener("submit", function (evt) {
  if (!arrivalDate.value || !livingDate.value) {
    evt.preventDefault();
    form.classList.remove("modal-error");
    form.offsetWidth = form.offsetWidth;
    form.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("adults", adultsAmount.value);
      localStorage.setItem("kids", kidsAmount.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (!form.classList.contains("modal")) {
      form.classList.add("modal");
      form.classList.remove("modal-error");
    }
  }
});
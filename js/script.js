(function () {
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

var onLinkClick = function (evt) {
  evt.preventDefault();
  form.classList.toggle("modal-hidden");
  form.classList.remove("modal-error");
  arrivalDate.focus();
  if (adults && kids) {
    adultsAmount.value = adults;
    kidsAmount.value = kids;
  }
};

var onSubmitClick = function (evt) {
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
};

var onEscapeClick = function (evt) {
  if (evt.keyCode === codeEscape) {
    evt.preventDefault();
    if (!form.classList.contains("modal-hidden")) {
      form.classList.add("modal-hidden");
      form.classList.remove("modal-error");
    }
  }
};

var onDocumentReady = function (evt) {
  evt.preventDefault();
  form.classList.add("modal-hidden");
};

try {
  adults = localStorage.getItem("adults");
  kids = localStorage.getItem("kids");
} catch (err) {
  isStorageSupport = false;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", onDocumentReady);
} else {
  onDocumentReady;
}

link.addEventListener("click", onLinkClick);

form.addEventListener("submit", onSubmitClick);

window.addEventListener("keydown", onEscapeClick);
})();
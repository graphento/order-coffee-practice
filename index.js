const makeForm = (() => {
  const beverageTemplate =
    document.getElementById("beverage-template").content.firstElementChild;

  var nextId = 1;

    return function () {
    const clone = beverageTemplate.cloneNode(true);

    clone.getElementsByClassName("beverage-count")[0].textContent =
        "Напиток №" + nextId;
    addDeleteButton(clone);

    document
        .getElementById("add-button")
        .insertAdjacentElement("beforebegin", clone);

    nextId++;
  };
})();

function addDeleteButton(fieldset) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "✕";
  btn.className = "delete-btn";

  fieldset.style.position = "relative";
  fieldset.appendChild(btn);

  btn.addEventListener("click", () => {
    const all = document.querySelectorAll(".beverage");

    if (all.length === 1) return;

    fieldset.remove();
    updateNumbers();
  });
}

function updateNumbers() {
  const items = document.querySelectorAll(".beverage");

  items.forEach((el, index) => {
    el.querySelector(".beverage-count").textContent =
      "Напиток №" + (index + 1);
  });
}

document
  .getElementById("add-button")
  .addEventListener("click", (e) => makeForm());

const lightboxToggle = document.getElementById("lightbox-toggle");

document.getElementById("submit-button").addEventListener("click", (e) => {
  e.preventDefault();
  lightboxToggle.checked = true;
});

makeForm();

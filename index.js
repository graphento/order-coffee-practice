const makeForm = (() => {
  const beverageTemplate =
    document.getElementById("beverage-template").content.firstElementChild;

  var nextId = 1;

  return function () {
    const clone = beverageTemplate.cloneNode(true);
    clone.getElementsByClassName("beverage-count")[0].textContent =
      "Напиток №" + nextId;

    document
      .getElementById("add-button")
      .insertAdjacentElement("beforebegin", clone);

    nextId++;
  };
})();

document
  .getElementById("add-button")
  .addEventListener("click", (e) => makeForm());

makeForm();

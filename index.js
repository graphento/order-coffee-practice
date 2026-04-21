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

const lightboxMessage = document.getElementById("lightbox-message");
const lightboxToggle = document.getElementById("lightbox-toggle");

function declineDrinks(number) {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;

  let word;

  if (n > 10 && n < 20) {
    word = "напитков";
  } else if (n1 > 1 && n1 < 5) {
    word = "напитка";
  } else if (n1 === 1) {
    word = "напиток";
  } else {
    word = "напитков";
  }

  return `${number} ${word}`;
}

document.getElementById("submit-button").addEventListener("click", (e) => {
  e.preventDefault();
  const count = document.getElementsByClassName("beverage").length;
  lightboxMessage.innerText = `Вы заказали ${declineDrinks(count)}`;
  lightboxToggle.checked = true;
});

makeForm();

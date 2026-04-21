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

function getOrderData() {
  const beverages = document.querySelectorAll(".beverage");

  return Array.from(beverages).map((item) => {
    const drink = item.querySelector("select").value;

    const milk = item.querySelector("input[name='milk']:checked").value;

    const options = Array.from(
      item.querySelectorAll("input[name='options']:checked")
    ).map((el) => el.value);

    return {
      drink,
      milk,
      options,
    };
  });
}

function translateDrink(val) {
  return {
    espresso: "Эспрессо",
    capuccino: "Капучино",
    cacao: "Какао",
  }[val];
}

function translateMilk(val) {
  return {
    usual: "обычном молоке",
    "no-fat": "обезжиренном молоке",
    soy: "соевом молоке",
    coconut: "кокосовом молоке",
  }[val];
}

function createTable(data) {
  const rows = data
    .map((item) => {
      const optionsText =
        item.options.length > 0 ? item.options.join(", ") : "—";

      return `
        <tr>
          <td>${translateDrink(item.drink)}</td>
          <td>${translateMilk(item.milk)}</td>
          <td>${optionsText}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <table class="order-table">
      <thead>
        <tr>
          <th>Напиток</th>
          <th>Молоко</th>
          <th>Дополнительно</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

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
  const data = getOrderData();
  const tableHTML = createTable(data);
  lightboxMessage.innerHTML = `
    <div style="margin-bottom: 15px;">
      Вы заказали ${declineDrinks(count)}
    </div>
    ${tableHTML}
  `;
  lightboxToggle.checked = true;
});

makeForm();

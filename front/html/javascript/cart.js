///METTRE DANS UN ARRAY LE LS //////////
let products = JSON.parse(localStorage.getItem("myChoice"));
console.table(products);
for (let product of products) {
  fetch("http://localhost:3000/api/products/" + product.id)
    .then((res) => res.json())
    .then((data) => {
      let content = "";
      console.log(data);
      content += `  <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl}".jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${product.color}</p>
                    <p>${data.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.number}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> `;
      document.querySelector("#cart__items").innerHTML += content;
      const deleteKanap = document.querySelector(".deleteItem");
      deleteKanap.addEventListener("click", (e) => {
        console.log(e.target);
      });
      console.log(deleteKanap);
    });
}

////CHERCHE LE PRIX, LA PHOTO, LE NOM/////////

////////FORM////////////////
const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"]'
);
let firstName, lastName, address, city, email;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("input" + "#" + tag);
  const errorMessage = document.querySelector("#" + tag + "ErrorMsg");
  if (!valid) {
    container.classList.add("p");
    errorMessage.textContent = message;
  } else {
    container.classList.remove("p");
    errorMessage.textContent = message;
  }
};

const nameChecker = (value, type) => {
  const label = type === "firstName" ? "prénom" : "nom";
  if (value.length > 0 && (value.length < 1 || value.length > 30)) {
    errorDisplay(type, `Le ${label} doit faire entre 1 et 30 caractères`);
    if (type === "firstName") {
      firstName = null;
    } else {
      lastName = null;
    }
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      type,
      `Le ${label} ne doit pas contenir de caractère spéciaux `
    );
    if (type === "firstName") {
      firstName = null;
    } else {
      lastName = null;
    }
  } else {
    errorDisplay(type, "", true);
    if (type === "firstName") {
      firstName = value;
    } else {
      lastName = value;
    }
  }
};

const adressChecker = (value) => {
  if (!value.match(/^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/)) {
    errorDisplay("address", "L'adresse n'est pas valide");
    address = null;
  } else {
    errorDisplay("address", "", true);
    address = value;
  }
};
const cityChecker = (value) => {
  if (value.length > 0 && (value.length < 1 || value.length > 30)) {
    errorDisplay(
      "city",
      "Le Nom de la ville doit faire entre 1 et 30 caractères"
    );
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "city",
      "Le Nom de la ville ne doit pas contenir de caractère spéciaux "
    );
    city = null;
  } else {
    errorDisplay("city", "", true);
    city = value;
  }
};
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
      case "lastName":
        nameChecker(e.target.value, e.target.id);
        break;
      case "address":
        adressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(firstName, lastName, address, city, email);
  if (firstName && lastName && address && city && email) {
    const data = {
      firstName,
      lastName,
      address,
      city,
      email,
    };
    console.log(data);
    inputs.forEach((input) => (input.value = ""));
    firstName = null;
    lastName = null;
    address = null;
    city = null;
    email = null;
  } else {
    alert("veuillez remplir correctement les champs");
  }
});

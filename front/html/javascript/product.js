const queryString = window.location.search;
console.log(queryString);
const urlSearchParams = new URLSearchParams(queryString);
console.log(urlSearchParams);
const id = urlSearchParams.get("id"); //RECUPERATION DE l'ID des OBJETS
console.log(id);
if (id) {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => {
      if (res.ok) return res.json();
      else
        window.location.replace(
          "http://127.0.0.1:5502/P5-Dev-Web-Kanap/front/html/index.html"
        );
    })
    .then((data) => {
      console.log(data);
      const kanapColors = data.colors;
      document.querySelector("#description").innerHTML = `${data.description}`;
      document.querySelector("#title").innerHTML = `${data.name}`;
      document.querySelector("#price").innerHTML = `${data.price}`;
      document.querySelector(".item__img").innerHTML = `
    <img src="${data.imageUrl}" alt="${data.altTxt}">
    `;
      console.log(kanapColors);

      for (let color of kanapColors) {
        const optColors = document.createElement("option");
        document.querySelector("#colors").appendChild(optColors);
        optColors.value = color;
        optColors.innerHTML = color;
      }
    });
} else {
  window.location.replace(
    "http://127.0.0.1:5502/P5-Dev-Web-Kanap/front/html/index.html"
  );
}

//Je rassemble les informations à mettre dans mon panier//
const myKanapColor = document.querySelector("#colors");
console.log(myKanapColor);
const myKanapNumber = document.querySelector("#quantity");
console.log(myKanapNumber);

// quand je clique sur" ajouter au panier" je crée un Objet contenant
// les options choisis
/// AJOUT DANS LE PANIER (LOCAL STORAGE)///
document.querySelector("#addToCart").addEventListener("click", () => {
  const selectedOption = {
    id,
    color: myKanapColor.value,
    number: parseInt(myKanapNumber.value),
  };
  if (selectedOption.number > 100) {
    selectedOption.number = 100;
    alert("quantité maximale pour le produit, 100 unitées");
  }
  const products = JSON.parse(localStorage.getItem("myChoice")) ?? [];
  const productIndex = products.findIndex(
    (product) => product.id === id && product.color === myKanapColor.value
  );
  console.log(productIndex);
  if (productIndex !== -1) {
    const newQuantity =
      parseInt(products[productIndex].number) + parseInt(myKanapNumber.value);
    console.log(newQuantity);
    products[productIndex].number = newQuantity;
    console.log("produit est présent dans le panier");
  } else {
    console.log("produit n'est  pas présent dans le panier");
    products.push(selectedOption);
  }

  localStorage.setItem("myChoice", JSON.stringify(products));
});

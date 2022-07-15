fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    let content = "";
    for (let product of data) {
      console.log(product);
      content += `
      <a href="./product.html?id=${product._id}">
      <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription"${product.description}</p>
      </article>
      </a>`;
    }
    document.querySelector("#items").innerHTML = content;
  });

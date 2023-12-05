async function displayProducts(url) {
  try {
    let res = await fetch(url);
    let products = await res.json();
    console.log(products.products);
    localStorage.setItem("products", JSON.stringify(products.products));
    let productsContainer = document.querySelector("#products");
    products.products.forEach((product, index) => {
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p><img src=${product.images[0]} alt=product-${
        index + 1
      } height="100px" width="100px"/></p>
            <h3>Rs.${product.price}</h3>
            <button onclick='addToCart(${product.id})'>Add to cart</button>
            <hr />
        `;
      productsContainer.appendChild(productDiv);
    });
  } catch (error) {
    console.log(error);
  }
}

displayProducts("https://dummyjson.com/products");

function addToCart(id) 
{
  let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
  //   console.log(cartStorage);
  let findProduct = JSON.parse(localStorage.getItem("products")).find(
    (product) => product.id === id
  );
  console.log(findProduct);

  let findIndex = cartStorage.findIndex((product) => product.id === id);
  console.log(findIndex);
  if (findIndex == -1) {
    cartStorage.push({
      id: findProduct.id,
      title: findProduct.title,
      image: findProduct.images[0],
      price: findProduct.price,
      quantity: 1,
    });
    localStorage.setItem("cart", JSON.stringify(cartStorage));
  } else {
    let updateProduct = cartStorage[findIndex];
    let productToUpdate = {
      ...updateProduct,
      quantity: updateProduct.quantity + 1,
    };
    console.log(productToUpdate);
    cartStorage.splice(findIndex, 1, productToUpdate);
    localStorage.setItem("cart", JSON.stringify(cartStorage));
  }
}

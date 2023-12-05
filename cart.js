
function updateCart(id, upd) {
  let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
  let findProduct = JSON.parse(localStorage.getItem("products")).find(
    (product) => product.id === id
  );

  let findIndex = cartStorage.findIndex((product) => product.id === id);

  if (findIndex == -1) {
    
    cartStorage.push({
      id: findProduct.id,
      title: findProduct.title,
      image: findProduct.images[0],
      price: findProduct.price,
      quantity: 1,
    });
  } else {
    let updateProduct = cartStorage[findIndex];
    let updatedQuantity = updateProduct.quantity + Number(upd);

    if (updatedQuantity > 0) {
     
      let productToUpdate = {
        ...updateProduct,
        quantity: updatedQuantity,
      };
      cartStorage.splice(findIndex, 1, productToUpdate);
    } else {
      
      cartStorage.splice(findIndex, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cartStorage));
  window.location.reload();
}

function removeCart(id) {
  let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
  let updatedCart = cartStorage.filter((product) => product.id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.location.reload();
}

const displayProducts = () => {
  let cartContainer = document.querySelector("#cart-items");
  let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
  cartProducts.forEach((product, index) => {
    const divEle = document.createElement("div");
    divEle.innerHTML = `<h2>${product.title}</h2>
            <p><img src=${product.image} alt=product-${
      index + 1
    } height="100px" width="100px"/></p>
            <h3>Rs.${product.price}</h3>
            <h3>Qty: ${product.quantity}</h3>
            <button onclick='updateCart(${product.id}, 1)'>+</button>
            <button onclick='updateCart(${product.id}, -1)'>-</button>
            <button onclick='removeCart(${product.id})'>Remove</button>
            <hr />`;
    cartContainer.appendChild(divEle);
  });
};

window.onload = displayProducts;


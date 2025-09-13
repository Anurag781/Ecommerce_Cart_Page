const products = [
  { id: 1, name: "Wireless Headphones", price: 2999, img: "image/Wireless Headphones.jpeg" },
  { id: 2, name: "Smartwatch", price: 4999, img: "image/Smartwatch.jpeg" },
  { id: 3, name: "Sneakers", price: 2599, img: "image/Sneakers.jpeg" },
  { id: 4, name: "Backpack", price: 1499, img: "image/Backpack.jpeg" }
];

let cart = [];

// Render Products
const productList = document.getElementById("product-list");
products.forEach(p => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button>Add to Cart</button>
  `;
  card.querySelector("button").onclick = () => addToCart(p);
  productList.appendChild(card);
});

// Add to Cart
function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

// Render Cart
function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="item-details">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
      </div>
      <div class="controls">
        <button class="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="increase">+</button>
        <button class="remove">Remove</button>
      </div>
    `;

    div.querySelector(".increase").onclick = () => {
      item.quantity++;
      updateCart();
    };

    div.querySelector(".decrease").onclick = () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.splice(index, 1);
      }
      updateCart();
    };

    div.querySelector(".remove").onclick = () => {
      cart.splice(index, 1);
      updateCart();
    };

    container.appendChild(div);
  });
}

// Update Cart
function updateCart() {
  renderCart();
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

// Checkout
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Proceeding to checkout with ₹" + document.getElementById("total-price").textContent);
  }
});

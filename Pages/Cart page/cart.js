import products from "../../data/medicine.js";

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve cart from localStorage (IDs only)
  let cartIds = JSON.parse(localStorage.getItem("cart")) || [];

  // Construct full cart objects with quantity
  let cart = cartIds.map((id) => {
    const product = products.find((p) => p.id === id);
    return product ? { product, quantity: 1 } : null;
  }).filter(Boolean); // Remove nulls if any IDs were invalid

  // DOM Elements
  const cartItemsElement = document.getElementById("cart-items");
  const cartItemsCountElement = document.getElementById("cart-items-count");
  const cartCountElement = document.querySelector(".cart-count");
  const subtotalElement = document.getElementById("subtotal-amount");
  const discountElement = document.getElementById("discount-amount");
  const totalElement = document.getElementById("total-amount");

  // Update UI
  function updateCart() {
    cartItemsElement.innerHTML = "";

    let subtotal = 0;
    let itemsCount = 0;

    cart.forEach((item) => {
      const itemTotal = item.product.originalPrice * item.quantity;
      subtotal += itemTotal;
      itemsCount += item.quantity;

      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";
      cartItemElement.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.product.image}" alt="${item.product.name}">
        </div>
        <div class="cart-item-details">
          <h4>${item.product.name}</h4>
        </div>
        <div class="cart-item-price">₹${item.product.originalPrice.toFixed(2)}</div>
        <div class="cart-item-quantity">
          <button class="decrease-quantity" data-id="${item.product.id}">-</button>
          <span>${item.quantity}</span>
          <button class="increase-quantity" data-id="${item.product.id}">+</button>
        </div>
        <div class="cart-item-remove">
          <i class="fas fa-trash-alt" data-id="${item.product.id}"></i>
        </div>
      `;

      cartItemsElement.appendChild(cartItemElement);
    });

    // Update cart count & totals
    cartItemsCountElement.textContent = itemsCount;
    cartCountElement.textContent = itemsCount;

    const shipping = cart.length > 0 ? 50 : 0;
    const discount = subtotal > 1000 ? subtotal * 0.1 : 0;
    const total = subtotal + shipping - discount;

    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    discountElement.textContent = `-₹${discount.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;

    // Update localStorage with just the IDs
    const updatedCartIds = cart.map((item) => item.product.id);
    localStorage.setItem("cart", JSON.stringify(updatedCartIds));

    // Quantity & Remove buttons
    setupCartButtons();
  }

  function setupCartButtons() {
    document.querySelectorAll(".increase-quantity").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        const item = cart.find((i) => i.product.id === id);
        if (item) {
          item.quantity++;
          updateCart();
        }
      });
    });

    document.querySelectorAll(".decrease-quantity").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        const item = cart.find((i) => i.product.id === id);
        if (item && item.quantity > 1) {
          item.quantity--;
        } else {
          cart = cart.filter((i) => i.product.id !== id);
        }
        updateCart();
      });
    });

    document.querySelectorAll(".cart-item-remove i").forEach((icon) => {
      icon.addEventListener("click", () => {
        const id = parseInt(icon.getAttribute("data-id"));
        cart = cart.filter((i) => i.product.id !== id);
        updateCart();
      });
    });
  }

  // Checkout button logic
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length > 0) {
      localStorage.setItem("medicartItems", JSON.stringify(cart));
      window.location.href = "/Pages/Payment gateway page/payment.html";
    } else {
      alert("Your cart is empty. Please add items before checkout.");
    }
  });

  // Recommended products section
  function renderRecommendedProducts() {
    const grid = document.querySelector(".product-grid");
    products.slice(0, 4).forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h4>${product.name}</h4>
          <div class="price">₹${product.originalPrice.toFixed(2)}</div>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      `;
      grid.appendChild(card);
    });

    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        if (!cart.find((i) => i.product.id === id)) {
          const product = products.find((p) => p.id === id);
          if (product) cart.push({ product, quantity: 1 });
        }
        updateCart();
      });
    });
  }

  // Initialize
  updateCart();
  renderRecommendedProducts();
});

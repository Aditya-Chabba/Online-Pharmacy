import products from "./data/medicine.js";

document.addEventListener("DOMContentLoaded", () => {
  // Get cart from localStorage (only contains IDs)
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function setCart(cartArray) {
    localStorage.setItem("cart", JSON.stringify(cartArray));
  }

  let cartIds = getCart();
  let cartData = cartIds.map((id) => ({
    id,
    quantity: 1,
  }));

  const cartCountElem = document.querySelector(".cart-count");
  

  const cartItemsContainer = document.querySelector(".cart-items");

  function renderCart() {
    cartItemsContainer.innerHTML = ""; // Clear previous

    cartData.forEach((item, index) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="item-details">
          <h3>${product.name}</h3>
          <p>Price: ₹${product.price}</p>
          <div class="quantity-control">
            <button class="minus-btn">-</button>
            <input type="number" value="${item.quantity}" min="1" />
            <button class="plus-btn">+</button>
          </div>
        </div>
        <div class="item-total">₹${(product.price * item.quantity).toFixed(2)}</div>
        <button class="delete-btn">Delete</button>
      `;

      cartItemsContainer.appendChild(cartItem);

      // Set up event listeners
      const minusBtn = cartItem.querySelector(".minus-btn");
      const plusBtn = cartItem.querySelector(".plus-btn");
      const quantityInput = cartItem.querySelector("input");
      const itemTotal = cartItem.querySelector(".item-total");
      const deleteBtn = cartItem.querySelector(".delete-btn");

      const updateItemTotal = () => {
        const qty = parseInt(quantityInput.value);
        cartData[index].quantity = qty;
        itemTotal.textContent = `₹${(qty * product.price).toFixed(2)}`;
        updateCartSummary();
      };

      minusBtn.addEventListener("click", () => {
        let qty = parseInt(quantityInput.value);
        if (qty > 1) {
          quantityInput.value = qty - 1;
          updateItemTotal();
        }
      });

      plusBtn.addEventListener("click", () => {
        let qty = parseInt(quantityInput.value);
        quantityInput.value = qty + 1;
        updateItemTotal();
      });

      quantityInput.addEventListener("input", () => {
        let val = parseInt(quantityInput.value);
        if (isNaN(val) || val < 1) quantityInput.value = 1;
        updateItemTotal();
      });

      deleteBtn.addEventListener("click", () => {
        cartData.splice(index, 1);
        cartIds = cartData.map((item) => item.id);
        setCart(cartIds);
        renderCart();
      });
    });
    cartCountElem.textContent = cartData.length
    updateCartSummary();
  }

  function updateCartSummary() {
    let totalItems = 0;
    let totalAmount = 0;

    cartData.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        totalItems += item.quantity;
        totalAmount += item.quantity * product.price;
      }
    });

    document.getElementById("total-items").textContent = totalItems;
    document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
  }

  renderCart();
});

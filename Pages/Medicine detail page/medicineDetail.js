import products from "../../data/medicine.js";

// ===== Utility Functions =====
function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id")) || 1;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function calculateDiscountedPrice(originalPrice, discountPercent) {
  return Math.round(originalPrice - (originalPrice * discountPercent) / 100);
}

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    '<i class="fas fa-star"></i>'.repeat(fullStars) +
    (hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : "") +
    '<i class="far fa-star"></i>'.repeat(emptyStars)
  );
}

// ===== Page Initialization =====
document.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromUrl();
  console.log(productId)
  const product = products.find((p) => p.id === productId) || products[0];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const isInCart = cart.includes(productId);

  const actionButton = document.querySelector(".btn-add-to-cart");
  if (actionButton) {
    // Set the innerHTML based on cart state
    actionButton.innerHTML = isInCart
      ? `<i class="fas fa-trash"></i> Remove from Cart`
      : `<i class="fas fa-shopping-cart"></i> Add to Cart`;

    // Conditionally add or remove class
    actionButton.classList.toggle("delete-btn", isInCart);

    actionButton.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const isInCartNow = cart.includes(productId);

      if (isInCartNow) {
        cart = cart.filter((id) => id !== productId);
        actionButton.innerHTML = `<i class="fas fa-shopping-cart"></i> Add to Cart`;
        actionButton.classList.remove("delete-btn");
      } else {
        cart.push(productId);
        actionButton.innerHTML = `<i class="fas fa-trash"></i> Remove from Cart`;
        actionButton.classList.add("delete-btn");
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    });
  }

  renderProductPage(product);
  updateCartCount();
});

// ===== Render Functions =====
function renderProductPage(product) {
  document.title = `${product.name} - Herbal-Heal`;

  document.getElementById("medicine-name").textContent = product.name;
  document.getElementById("medicine-img").src = product.image;
  document.getElementById("medicine-img").alt = product.name;
  document.getElementById("medicine-title").textContent = product.name;
  document.getElementById("rating-value").textContent = product.rating;
  document.getElementById("rating-stars").innerHTML = generateStarRating(
    product.rating
  );
  document.getElementById("medicine-category").textContent =
    capitalizeFirstLetter(product.category);
  document.getElementById("medicine-concerns").textContent = product.concerns
    .map(capitalizeFirstLetter)
    .join(", ");

  const discountedPrice = calculateDiscountedPrice(
    product.originalPrice,
    product.discountPercent
  );
  document.getElementById(
    "original-price"
  ).textContent = `₹${product.originalPrice}`;
  document.getElementById("discount-price").textContent = `₹${discountedPrice}`;

  const hasDiscount = product.discountPercent > 0;
  document.getElementById("discount-percent").textContent = hasDiscount
    ? `${product.discountPercent}% OFF`
    : "";
  document.getElementById("original-price").style.display = hasDiscount
    ? "inline"
    : "none";
  document.getElementById("discount-percent").style.display = hasDiscount
    ? "inline"
    : "none";

  renderProductDetails(product);
  loadRelatedProducts(product);
}

function addToCart(productId, buttonElement = null) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const isInCart = cart.includes(productId);

  if (isInCart) {
    cart = cart.filter((id) => id !== productId);
    showNotification("Item removed from your cart");
    if (buttonElement) {
      buttonElement.classList.remove("delete-btn");
      buttonElement.innerHTML = `<i class="fas fa-shopping-cart"></i> Add to Cart`;
    }
  } else {
    cart.push(productId);
    showNotification("Item added to cart");
    if (buttonElement) {
      buttonElement.classList.add("delete-btn")
      buttonElement.innerHTML = `<i class="fas fa-trash"></i> Remove from Cart`;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) cartCountElement.textContent = cart.length;
}

function showNotification(message) {
  let notification = document.querySelector(".notification");
  if (!notification) {
    notification = document.createElement("div");
    notification.className = "notification";
    document.body.appendChild(notification);
  }

  notification.textContent = message;
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 3000);
}

// ===== Product Detail Tabs =====
function renderProductDetails(product) {
  const section = document.querySelector(".product-description");
  section.innerHTML = `
    <div class="tab-header">
      <button class="tab-button active" data-tab="description">Description</button>
      <button class="tab-button" data-tab="how-to-use">How to Use</button>
      <button class="tab-button" data-tab="benefits">Benefits</button>
    </div>
    <div class="tab-content">
      <div class="tab-pane active" id="description">
        <h3>About ${product.name}</h3>
        <p>${product.description}</p>
        <h4>Key Features:</h4>
        <ul>${product.keyFeatures.map((f) => `<li>${f}</li>`).join("")}</ul>
      </div>
      <div class="tab-pane" id="how-to-use">
        <h3>How to Use</h3>
        <p>${product.usage.general}</p>
        <h4>Recommended Usage:</h4>
        <ul>${product.usage.specific.map((u) => `<li>${u}</li>`).join("")}</ul>
        <p>${product.usage.storage}</p>
      </div>
      <div class="tab-pane" id="benefits">
        <h3>Benefits</h3>
        <ul class="benefits-list">
          ${product.benefits
            .map(
              (b) =>
                `<li><i class="fas fa-check-circle"></i><div><h4>${b.title}</h4><p>${b.description}</p></div></li>`
            )
            .join("")}
        </ul>
      </div>
    </div>
  `;

  setupTabToggle();
}

function setupTabToggle() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      const tabId = button.dataset.tab;
      button.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });
}

// ===== Related Products =====
function loadRelatedProducts(currentProduct) {
  const container = document.getElementById("related-products-container");
  container.innerHTML = "";

  const related = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category ||
          p.concerns.some((c) => currentProduct.concerns.includes(c)))
    )
    .slice(0, 4);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  related.forEach((product) => {
    const discounted = calculateDiscountedPrice(
      product.originalPrice,
      product.discountPercent
    );
    const isInCart = cart.includes(product.id);

    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <a href="medicineDetail.html?id=${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="product-rating">
            ${generateStarRating(product.rating)} <span>${product.rating}</span>
          </div>
          <div class="product-price">
            <span class="current-price">₹${discounted}</span>
            ${
              product.discountPercent > 0
                ? `<span class="original-price">₹${product.originalPrice}</span>`
                : ""
            }
          </div>
        </div>
      </a>
      <button class="add-to-cart ${isInCart ? "delete-btn" : ""}" data-id="${
      product.id
    }">
  ${
    isInCart
      ? `<i class="fas fa-trash"></i> Remove from Cart`
      : `<i class="fas fa-shopping-cart"></i> Add to Cart`
  }
</button>
    `;

    container.appendChild(productCard);
  });

  container.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = parseInt(btn.dataset.id);
      addToCart(productId, btn);
    });
  });
}

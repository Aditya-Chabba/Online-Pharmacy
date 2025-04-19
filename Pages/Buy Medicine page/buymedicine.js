import products from "../../data/medicine.js";
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const categoryFilters = document.querySelectorAll(".category-filter");
  const concernFilters = document.querySelectorAll(".concern-filter");
  const priceRange = document.getElementById("price-range");
  const priceValue = document.getElementById("price-value");
  const sortSelect = document.getElementById("sort-select");
  const clearFiltersBtn = document.querySelector(".clear-filters-btn");
  const cartCountElem = document.querySelector(".cart-count");

  const productsPerPage = 3;
  let currentPage = 1;

  // Function to display products for the current page
  function renderPaginatedProducts(products, page = 1) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    renderProducts(paginatedProducts);
    renderPaginationControls(products.length);
  }

  // Function to render pagination buttons
  function renderPaginationControls(totalItems) {
    const totalPages = Math.ceil(totalItems / productsPerPage);
    const paginationContainer = document.getElementById("med-pagination");
    paginationContainer.innerHTML = null;

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.className = `page-btn ${i === currentPage ? "active" : ""}`;
      btn.textContent = i;

      btn.addEventListener("click", () => {
        currentPage = i;
        renderPaginatedProducts(products, currentPage);
      });

      paginationContainer.appendChild(btn);
    }

    // Optional Next Button
    if (currentPage < totalPages) {
      const nextBtn = document.createElement("button");
      nextBtn.className = "page-btn next";
      nextBtn.innerHTML = `Next <i class="fas fa-chevron-right"></i>`;
      nextBtn.addEventListener("click", () => {
        currentPage++;
        renderPaginatedProducts(products, currentPage);
      });
      paginationContainer.appendChild(nextBtn);
    }
  }

  // Save and retrieve cart from localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const cart = getCart();
    cartCountElem.textContent = cart.length;
  }

  function renderProducts(productList) {
    const productsGrid = document.getElementById("products-grid");
    const cart = getCart();
    productsGrid.innerHTML = "";

    if (productList.length === 0) {
      productsGrid.innerHTML = "<p>No products found.</p>";
      return;
    }
    productList.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const isInCart = cart.includes(product.id);

      productCard.innerHTML = `
  <div class="product-img">
    <div class="medicine-detail" medicineId="${product.id}">View Details</div>
    <img src="${product.image}" alt="${product.name}" />
    ${
      product.discountPercent > 0
        ? `<span class="discount-badge">${product.discountPercent}% OFF</span>`
        : ""
    }
    
  </div>
  <div class="product-info">
    <h3 class="product-title" >${product.name}</h3>
    <p class="product-price">
    ${
      product.discountPercent > 0
        ? `<span class="original-price">₹${product.originalPrice}</span> 
         <span class="discounted-price">₹${Math.floor(
           product.originalPrice * (1 - product.discountPercent / 100)
         )}</span>`
        : `<span class="discounted-price">₹${product.originalPrice}</span>`
    }    
    </p>
    <p class="product-rating">Rating : ${product.rating} ⭐</p>
  </div>
  <div class="product-actions">
    <button class="add-to-cart-btn ${isInCart ? "added" : ""}" data-id="${
        product.id
      }">
      ${isInCart ? "Remove from Cart" : "Add to Cart"}
    </button>
  </div>
`;

      productsGrid.appendChild(productCard);
    });

    //open medicine detail page
    const viewDetail = document.querySelectorAll(".medicine-detail");

    viewDetail.forEach((btn) => {
      const id = parseInt(btn.getAttribute("medicineId"));
      btn.addEventListener("click", () => {
        window.location.href = `/Pages/Medicine detail page/medicineDetail.html?id=${id}`;
      });
    });

    // Add/Remove cart button functionality
    document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = parseInt(btn.dataset.id);
        let cart = getCart();

        if (cart.includes(productId)) {
          cart = cart.filter((id) => id !== productId);
          btn.textContent = "Add to Cart";
          btn.classList.remove("added");
        } else {
          cart.push(productId);
          btn.textContent = "Remove from Cart";
          btn.classList.add("added");
        }

        saveCart(cart);
        updateCartCount();
      });
    });
  }

  function updateProductCount(count) {
    document.getElementById("product-count").textContent = count;
  }

  function clearAllFilters() {
    categoryFilters.forEach((cb) => (cb.checked = false));
    concernFilters.forEach((cb) => (cb.checked = false));
    priceRange.value = 1000;
    priceValue.textContent = "₹1000";
    searchInput.value = "";
    sortSelect.value = "popularity";
    applyFilters();
    renderPaginatedProducts(products);
  }

  function applyFilters() {
    currentPage = 1; // Reset to first page on filter

    let filtered = [...products];

    // Category filter
    const selectedCategories = Array.from(categoryFilters)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Concern filter
    const selectedConcerns = Array.from(concernFilters)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    if (selectedConcerns.length > 0) {
      filtered = filtered.filter((product) =>
        product.concerns.some((c) => selectedConcerns.includes(c))
      );
    }

    // Price filter - use discounted price
    const maxPrice = parseInt(priceRange.value);
    filtered = filtered.filter((product) => {
      console.log(product);
      const finalPrice =
        product.originalPrice * (1 - (product.discountPercent || 0) / 100);
      return finalPrice <= maxPrice;
    });

    // Search filter
    const searchQuery = searchInput.value.toLowerCase().trim();
    if (searchQuery !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    // Sorting
    const sortBy = sortSelect.value;
    if (sortBy === "price-low") {
      console.log(sortBy);
      console.log(filtered);
      filtered.sort((a, b) => {
        const priceA = a.originalPrice * (1 - a.discountPercent / 100);
        const priceB = b.originalPrice * (1 - b.discountPercent / 100);
        return priceA - priceB;
      });
      console.log(filtered);
    }
    if (sortBy === "price-high") {
      filtered.sort((a, b) => {
        const priceA = a.originalPrice * (1 - a.discountPercent / 100);
        const priceB = b.originalPrice * (1 - b.discountPercent / 100);
        return priceB - priceA;
      });
    }
    if (sortBy === "newest") {
      filtered.sort((a, b) => b.id - a.id);
    }

    // Final render
    renderPaginatedProducts(filtered, currentPage);
    updateProductCount(filtered.length);
  }

  // Event listeners
  priceRange.addEventListener("input", () => {
    priceValue.textContent = "₹" + priceRange.value;
    applyFilters();
  });

  categoryFilters.forEach((cb) => cb.addEventListener("change", applyFilters));
  concernFilters.forEach((cb) => cb.addEventListener("change", applyFilters));
  sortSelect.addEventListener("change", applyFilters);
  clearFiltersBtn.addEventListener("click", clearAllFilters);

  searchButton.addEventListener("click", applyFilters);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") applyFilters();
  });

  // Initial render
  updateCartCount();
  renderPaginatedProducts(products);
  updateProductCount(products.length);
});

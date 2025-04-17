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

  let products = [
    {
      id: 1,
      name: "Ashwagandha Capsules",
      category: "herbal",
      concerns: ["stress", "immunity"],
      price: 25,
      image: "https://picsum.photos/seed/multivitamin/400/300",
      rating: 4.7,
    },
    {
      id: 2,
      name: "Triphala Powder",
      category: "ayurvedic",
      concerns: ["digestion"],
      price: 18,
      image: "https://picsum.photos/seed/multivitamin/400/300",
      rating: 4.3,
    },
    {
      id: 3,
      name: "Multivitamin Supplement",
      category: "supplements",
      concerns: ["immunity"],
      price: 30,
      image: "https://picsum.photos/seed/multivitamin/400/300",
      rating: 4.5,
    },
    {
      id: 4,
      name: "Chamomile Tea",
      category: "herbal",
      concerns: ["stress", "sleep"],
      price: 12,
      image: "https://picsum.photos/seed/chamomile/400/300",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Turmeric Curcumin Capsules",
      category: "supplements",
      concerns: ["inflammation", "joints"],
      price: 22,
      image: "https://picsum.photos/seed/turmeric/400/300",
      rating: 4.8,
    },
    {
      id: 6,
      name: "Probiotics Complex",
      category: "supplements",
      concerns: ["digestion", "immunity"],
      price: 35,
      image: "https://picsum.photos/seed/probiotics/400/300",
      rating: 4.4,
    },
    {
      id: 7,
      name: "Valerian Root Extract",
      category: "herbal",
      concerns: ["sleep", "anxiety"],
      price: 19,
      image: "https://picsum.photos/seed/valerian/400/300",
      rating: 4.2,
    },
    {
      id: 8,
      name: "Ginseng Root Powder",
      category: "ayurvedic",
      concerns: ["energy", "focus"],
      price: 28,
      image: "https://picsum.photos/seed/ginseng/400/300",
      rating: 4.5,
    },
    {
      id: 9,
      name: "Omega-3 Fish Oil",
      category: "supplements",
      concerns: ["heart", "brain"],
      price: 32,
      image: "https://picsum.photos/seed/omega3/400/300",
      rating: 4.6,
    },
    {
      id: 10,
      name: "Spirulina Tablets",
      category: "supplements",
      concerns: ["detox", "immunity"],
      price: 24,
      image: "https://picsum.photos/seed/spirulina/400/300",
      rating: 4.3,
    },
    {
      id: 11,
      name: "Brahmi Herbal Extract",
      category: "ayurvedic",
      concerns: ["memory", "focus"],
      price: 21,
      image: "https://picsum.photos/seed/brahmi/400/300",
      rating: 4.4,
    },
    {
      id: 12,
      name: "Lavender Essential Oil",
      category: "herbal",
      concerns: ["relaxation", "sleep"],
      price: 15,
      image: "https://picsum.photos/seed/lavender/400/300",
      rating: 4.9,
    },
    {
      id: 13,
      name: "Vitamin D3 Drops",
      category: "supplements",
      concerns: ["bones", "immunity"],
      price: 18,
      image: "https://picsum.photos/seed/vitamind/400/300",
      rating: 4.7,
    },
    {
      id: 14,
      name: "Moringa Leaf Powder",
      category: "herbal",
      concerns: ["nutrition", "energy"],
      price: 20,
      image: "https://picsum.photos/seed/moringa/400/300",
      rating: 4.5,
    },
    {
      id: 15,
      name: "Chyawanprash",
      category: "ayurvedic",
      concerns: ["immunity", "vitality"],
      price: 26,
      image: "https://picsum.photos/seed/chyawanprash/400/300",
      rating: 4.6,
    },
  ];

  const productsPerPage = 6; // You can change this number
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
                    <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <p class="product-rating">${product.rating} ⭐</p>
                    <button class="add-to-cart-btn ${
                      isInCart ? "added" : ""
                    }" data-id="${product.id}">
                        ${isInCart ? "Remove from Cart" : "Add to Cart"}
                    </button>
                </div>
            `;

      productsGrid.appendChild(productCard);
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
    priceRange.value = 100;
    priceValue.textContent = "$100";
    searchInput.value = "";
    sortSelect.value = "popularity";
    applyFilters();
  }

  function applyFilters() {
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

    // Price filter
    const maxPrice = parseInt(priceRange.value);
    filtered = filtered.filter((product) => product.price <= maxPrice);

    // Search filter
    const searchQuery = searchInput.value.toLowerCase();
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    // Sorting
    const sortBy = sortSelect.value;
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => b.id - a.id);
    }

    renderPaginatedProducts(filtered);
    updateProductCount(filtered.length);
  }

  // Event listeners
  priceRange.addEventListener("input", () => {
    priceValue.textContent = "$" + priceRange.value;
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

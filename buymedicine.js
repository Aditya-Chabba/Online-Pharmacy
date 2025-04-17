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
      image:
        "https://himalayawellness.in/cdn/shop/products/Ashvagandha-2.jpg?v=1676957290",
      rating: 4.7,
    },
    {
      id: 2,
      name: "Triphala Powder",
      category: "ayurvedic",
      concerns: ["digestion"],
      price: 18,
      image:
        "https://king-online.co.za/files/001120/gallery/00/02/25/00022512_00010661.png",
      rating: 4.3,
    },
    {
      id: 3,
      name: "Multivitamin Supplement",
      category: "supplements",
      concerns: ["immunity"],
      price: 30,
      image: "https://smytten-image.gumlet.io/shop_item/THO0140AB61.jpg",
      rating: 4.5,
    },
    {
      id: 4,
      name: "Chamomile Tea",
      category: "herbal",
      concerns: ["stress", "sleep"],
      price: 12,
      image: "https://m.media-amazon.com/images/I/618-BI6hasL.jpg",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Turmeric Curcumin Capsules",
      category: "supplements",
      concerns: ["inflammation", "joints"],
      price: 22,
      image: "https://m.media-amazon.com/images/I/71jdiK6jGbL.jpg",
      rating: 4.8,
    },
    {
      id: 6,
      name: "Probiotics Complex",
      category: "supplements",
      concerns: ["digestion", "immunity"],
      price: 35,
      image: "https://i.ebayimg.com/images/g/IgAAAOSwp9Fl32n1/s-l1200.png",
      rating: 4.4,
    },
    {
      id: 7,
      name: "Valerian Root Extract",
      category: "herbal",
      concerns: ["sleep", "anxiety"],
      price: 19,
      image:
        "https://himalayawellness.co.za/cdn/shop/products/Valerian.png?v=1606283240&width=1080",
      rating: 4.2,
    },
    {
      id: 8,
      name: "Ginseng Root Powder",
      category: "ayurvedic",
      concerns: ["energy", "focus"],
      price: 28,
      image: "https://m.media-amazon.com/images/I/71D2jFiC1UL.jpg",
      rating: 4.5,
    },
    {
      id: 9,
      name: "Omega-3 Fish Oil",
      category: "supplements",
      concerns: ["heart", "brain"],
      price: 32,
      image:
        "https://www.getsupp.com/static/media/__resized/images/products/KU8K8F3CCX3006ORJ-6db76ac5-ef20-4f17-bed7-f147acaa175f-thumbnail_webp-512x512-70.webp",
      rating: 4.6,
    },
    {
      id: 10,
      name: "Spirulina Tablets",
      category: "supplements",
      concerns: ["detox", "immunity"],
      price: 24,
      image:
        "https://meds.myupchar.com/153431/health-veda-organics-spirulina-capsules-veg-capsules-for-good-health-120-0.webp",
      rating: 4.3,
    },
    {
      id: 11,
      name: "Brahmi Herbal Extract",
      category: "ayurvedic",
      concerns: ["memory", "focus"],
      price: 21,
      image:
        "https://himalayawellness.my/cdn/shop/products/brahmi.jpg?v=1652784134",
      rating: 4.4,
    },
    {
      id: 12,
      name: "Lavender Essential Oil",
      category: "herbal",
      concerns: ["relaxation", "sleep"],
      price: 15,
      image:
        "https://img.tatacliq.com/images/i8/437Wx649H/MP000000008742207_437Wx649H_202206300458233.jpeg",
      rating: 4.9,
    },
    {
      id: 13,
      name: "Vitamin D3 Drops",
      category: "supplements",
      concerns: ["bones", "immunity"],
      price: 18,
      image:
        "https://cdn01.pharmeasy.in/dam/products_otc/Q06828/vlados-himalayan-organics-vitamin-d3-with-k2-as-mk7-supplement-120-veg-tablets-2-1741330796.jpg?dim=400x0&dpr=1&q=100",
      rating: 4.7,
    },
    {
      id: 14,
      name: "Moringa Leaf Powder",
      category: "herbal",
      concerns: ["nutrition", "energy"],
      price: 20,
      image:
        "https://dr9wvh6oz7mzp.cloudfront.net/i/c50f7b6fa87890d4c039fc7c75d20058_ra,w806,h806_pa,w806,h806.jpg",
      rating: 4.5,
    },
    {
      id: 15,
      name: "Chyawanprash",
      category: "ayurvedic",
      concerns: ["immunity", "vitality"],
      price: 26,
      image:
        "https://www.daburshop.com/cdn/shop/files/1_88963119-1df1-4a16-9ca7-d3a3cca73d3e.png?v=1733210278&width=1445",
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <p class="product-price">Currunt Price : ₹${product.price}</p>
    <p class="product-rating">Rating : ${product.rating} ⭐</p>
    
  </div>
  <div class="product-actions">
      <button class="add-to-cart-btn ${isInCart ? "added" : ""}" data-id="${
        product.id
      }">
        ${isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>
      <button class="compare-btn" data-id="${product.id}">
        Compare
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

    renderPaginatedProducts(filtered, currentPage);
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

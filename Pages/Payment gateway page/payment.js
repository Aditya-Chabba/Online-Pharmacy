document.addEventListener("DOMContentLoaded", function () {
  // Get cart items from localStorage
  // localStorage.setItem('medicartItems', JSON.stringify([
  //     { id: "med001", quantity: 2 ,product: {price:123,image:""}},
  //     { id: "med003", quantity: 1 ,product: {price:223,image:""}},
  //     { id: "med005", quantity: 3 ,product: {price:423,image:""}}
  //   ]));

  const cartItems = JSON.parse(localStorage.getItem("medicartItems")) || [];

  // Initialize the payment page
  function initPaymentPage() {
    // Render order summary
    renderOrderSummary();

    // Set up payment method tabs
    setupPaymentTabs();

    // Setup UPI payment options
    setupUpiOptions();

    // Setup back to cart button
    document
      .querySelector(".back-to-cart")
      .addEventListener("click", function () {
        window.location.href = "/Pages/Cart page/Cart.html";
      });

    // Setup pay now button
    document
      .getElementById("pay-now-btn")
      .addEventListener("click", processPayment);

    // Setup continue shopping button in success modal
    document
      .getElementById("continue-shopping")
      .addEventListener("click", function () {
        // Clear cart and redirect to home
        localStorage.removeItem("medicartItems");
        window.location.href = "/Pages/Buy Medicine page/buymedicine.html";
      });

    // Format card number input with spaces
    const cardNumberInput = document.getElementById("card-number");
    if (cardNumberInput) {
      cardNumberInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        let formattedValue = "";

        for (let i = 0; i < value.length; i++) {
          if (i > 0 && i % 4 === 0) {
            formattedValue += " ";
          }
          formattedValue += value[i];
        }

        e.target.value = formattedValue;
      });
    }

    // Format expiry date input with slash
    const expiryDateInput = document.getElementById("expiry-date");
    if (expiryDateInput) {
      expiryDateInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 2) {
          value = value.substring(0, 2) + "/" + value.substring(2, 4);
        }

        e.target.value = value;
      });
    }
  }

  // Render order summary
  function renderOrderSummary() {
    const orderItemsElement = document.getElementById("order-items");
    const subtotalElement = document.getElementById("order-subtotal");
    const discountElement = document.getElementById("order-discount");
    const totalElement = document.getElementById("order-total");

    // Clear current items
    orderItemsElement.innerHTML = "";

    // Calculate totals
    let subtotal = 0;

    // Add each item to order summary
    cartItems.forEach((item) => {
      console.log(item);
      const itemTotal = item.product.originalPrice * item.quantity;
      console.log(
        typeof item.product.originalPrice +
          " " +
          typeof item.quantity +
          " " +
          itemTotal
      );
      subtotal += itemTotal;

      const orderItemElement = document.createElement("div");
      orderItemElement.className = "order-item";
      orderItemElement.innerHTML = `
              <div class="order-item-image">
                <img src="${item.product.image}" alt="${item.product.name}">
              </div>
              <div class="order-item-details">
                <h4>${item.product.name}</h4>
                <div class="item-price">₹${item.product.originalPrice.toFixed(
                  2
                )}</div>
              </div>
              <div class="order-item-quantity">
                x${item.quantity}
              </div>
            `;

      orderItemsElement.appendChild(orderItemElement);
    });

    // Fixed shipping cost
    const shipping = cartItems.length > 0 ? 50 : 0;

    // Calculate discount (10% if subtotal > 1000)
    const discount = subtotal > 1000 ? subtotal * 0.1 : 0;

    // Update UI with calculated values
    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    discountElement.textContent = `-₹${discount.toFixed(2)}`;
    totalElement.textContent = `₹${(subtotal + shipping - discount).toFixed(
      2
    )}`;
  }

  // Setup payment method tabs
  function setupPaymentTabs() {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".payment-content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs and contents
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));

        // Add active class to clicked tab
        this.classList.add("active");

        // Show corresponding content
        const tabId = this.getAttribute("data-tab");
        document.getElementById(`${tabId}-content`).classList.add("active");
      });
    });
  }

  // Setup UPI payment options
  function setupUpiOptions() {
    const upiIdRadio = document.getElementById("upi-id");
    const upiQrRadio = document.getElementById("upi-qr");
    const upiIdForm = document.querySelector(".upi-id-form");
    const upiQrForm = document.querySelector(".upi-qr-form");

    upiIdRadio.addEventListener("change", function () {
      if (this.checked) {
        upiIdForm.classList.add("active");
        upiQrForm.classList.remove("active");
      }
    });

    upiQrRadio.addEventListener("change", function () {
      if (this.checked) {
        upiQrForm.classList.add("active");
        upiIdForm.classList.remove("active");
      }
    });
  }

  // Process payment
  function processPayment() {
    // Show payment processing modal
    const paymentModal = document.getElementById("payment-modal");
    paymentModal.classList.add("active");

    // Simulate payment processing
    setTimeout(function () {
      // Hide payment processing modal
      paymentModal.classList.remove("active");

      // Generate random order ID
      const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);
      document.getElementById("order-id").textContent = orderId;

      // Show success modal
      document.getElementById("success-modal").classList.add("active");
    }, 2000);
  }

  // Initialize the payment page
  initPaymentPage();
});

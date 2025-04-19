 
// Sample medication data
const medications = [
    {
        id: 1,
        name: "Ibuprofen 400mg",
        description: "Pain reliever, anti-inflammatory",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        prescriptionRequired: false
    },
    {
        id: 2,
        name: "Amoxicillin 500mg",
        description: "Antibiotic for bacterial infections",
        price: 12.50,
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        prescriptionRequired: true
    },
    {
        id: 3,
        name: "Loratadine 10mg",
        description: "Antihistamine for allergies",
        price: 6.75,
        image: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        prescriptionRequired: false
    }
];

// Cart state
let cart = [];

// DOM Elements
const cartItemsEl = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const cartCountEl = document.querySelector('.cart-count');

// Initialize cart from localStorage if available
function initCart() {
    const savedCart = localStorage.getItem('pharmaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    } else {
        // Add sample items to cart for demo purposes
        cart = [
            { ...medications[0], quantity: 1 },
            { ...medications[1], quantity: 2 }
        ];
        saveCart();
        updateCartDisplay();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('pharmaCart', JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountEl.textContent = totalItems;

    // If cart is empty
    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="shop-now-btn">Shop Now</button>
            </div>
        `;
        updateCartTotals();
        return;
    }

    // Render cart items
    cartItemsEl.innerHTML = '';
    cart.forEach(item => {
        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');
        cartItemEl.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                ${item.prescriptionRequired ? 
                    `<span class="prescription-required"><i class="fas fa-file-prescription"></i> Prescription Required</span>` : ''}
                <p class="item-description">${item.description}</p>
                <div class="item-meta">
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                    <div class="item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-times"></i> Remove
            </button>
        `;
        cartItemsEl.appendChild(cartItemEl);
    });

    // Add event listeners for quantity buttons and remove buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', () => decreaseQuantity(parseInt(btn.dataset.id)));
    });

    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', () => increaseQuantity(parseInt(btn.dataset.id)));
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => removeItem(parseInt(btn.dataset.id)));
    });

    updateCartTotals();
}

// Increase item quantity
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity++;
        saveCart();
        updateCartDisplay();
    }
}

// Decrease item quantity
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity--;
        if (item.quantity === 0) {
            removeItem(id);
            return;
        }
        saveCart();
        updateCartDisplay();
    }
}

// Remove item from cart
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartDisplay();
}

// Update cart totals
function updateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 5.99 : 0;
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + shipping + tax;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCart);

// Add checkout button functionality
document.querySelector('.checkout-btn').addEventListener('click', () => {
    const prescriptionRequired = cart.some(item => item.prescriptionRequired);
    
    if (prescriptionRequired) {
        alert('Some items in your cart require a valid prescription. Please upload your prescription before checkout.');
    } else {
        alert('Proceeding to checkout...');
    }
});

// Shop now button functionality for empty cart
document.addEventListener('click', e => {
    if (e.target.classList.contains('shop-now-btn')) {
        alert('Redirecting to product catalog...');
    }
});

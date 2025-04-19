document.addEventListener('DOMContentLoaded', function() {
    // Sample products data
    const products = [
        {
            id: 1,
            name: "Paracetamol 500mg",
            description: "Pain reliever and fever reducer",
            price: 120.00,
            image: "https://via.placeholder.com/70x70"
        },
        {
            id: 2,
            name: "Vitamin C 1000mg",
            description: "Immune system support",
            price: 350.00,
            image: "https://via.placeholder.com/70x70"
        },
        {
            id: 3,
            name: "Omeprazole 20mg",
            description: "Reduces stomach acid production",
            price: 180.00,
            image: "https://via.placeholder.com/70x70"
        }
    ];
    
    // Recommended products
    const recommendedProducts = [
        {
            id: 4,
            name: "Multivitamin Complex",
            price: 450.00,
            image: "https://via.placeholder.com/200x150"
        },
        {
            id: 5,
            name: "Calcium + Vitamin D3",
            price: 280.00,
            image: "https://via.placeholder.com/200x150"
        },
        {
            id: 6,
            name: "Omega-3 Fish Oil",
            price: 520.00,
            image: "https://via.placeholder.com/200x150"
        },
        {
            id: 7,
            name: "Probiotics 50 Billion CFU",
            price: 650.00,
            image: "https://via.placeholder.com/200x150"
        }
    ];
    
    // Cart state
    let cart = [];
    
    // Initialize the cart with some items
    function initializeCart() {
        // Add some sample items to cart
        addToCart(products[0], 2);
        addToCart(products[1], 1);
        
        // Render recommended products
        renderRecommendedProducts();
    }
    
    // Add item to cart
    function addToCart(product, quantity) {
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                product: product,
                quantity: quantity
            });
        }
        
        updateCart();
    }
    
    // Remove item from cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.product.id !== productId);
        updateCart();
    }
    
    // Update item quantity
    function updateQuantity(productId, newQuantity) {
        const item = cart.find(item => item.product.id === productId);
        
        if (item) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                updateCart();
            }
        }
    }
    
    // Update cart UI
    function updateCart() {
        const cartItemsElement = document.getElementById('cart-items');
        const cartItemsCountElement = document.getElementById('cart-items-count');
        const cartCountElement = document.querySelector('.cart-count');
        const subtotalElement = document.getElementById('subtotal-amount');
        const discountElement = document.getElementById('discount-amount');
        const totalElement = document.getElementById('total-amount');
        
        // Clear current items
        cartItemsElement.innerHTML = '';
        
        // Calculate totals
        let subtotal = 0;
        let itemsCount = 0;
        
        // Add each item to cart UI
        cart.forEach(item => {
            const itemTotal = item.product.price * item.quantity;
            subtotal += itemTotal;
            itemsCount += item.quantity;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.product.image}" alt="${item.product.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.product.name}</h4>
                    <p>${item.product.description || ''}</p>
                </div>
                <div class="cart-item-price">₹${item.product.price.toFixed(2)}</div>
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
        
        // Update counts and totals
        cartItemsCountElement.textContent = itemsCount;
        cartCountElement.textContent = itemsCount;
        
        // Fixed shipping cost
        const shipping = cart.length > 0 ? 50 : 0;
        
        // Calculate discount (10% if subtotal > 1000)
        const discount = subtotal > 1000 ? subtotal * 0.1 : 0;
        
        // Update UI with calculated values
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        discountElement.textContent = `-₹${discount.toFixed(2)}`;
        totalElement.textContent = `₹${(subtotal + shipping - discount).toFixed(2)}`;
        
        // Add event listeners to quantity buttons and remove buttons
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const item = cart.find(item => item.product.id === productId);
                if (item) {
                    updateQuantity(productId, item.quantity + 1);
                }
            });
        });
        
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const item = cart.find(item => item.product.id === productId);
                if (item) {
                    updateQuantity(productId, item.quantity - 1);
                }
            });
        });
        
        document.querySelectorAll('.cart-item-remove i').forEach(icon => {
            icon.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }
    
    // Render recommended products
    function renderRecommendedProducts() {
        const productGridElement = document.querySelector('.product-grid');
        
        recommendedProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <div class="price">₹${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            
            productGridElement.appendChild(productElement);
        });
        
        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = recommendedProducts.find(p => p.id === productId);
                if (product) {
                    addToCart(product, 1);
                }
            });
        });
    }
    
    // Proceed to checkout
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length > 0) {
            // Save cart to localStorage for the payment page
            localStorage.setItem('medicartItems', JSON.stringify(cart));
            window.location.href = 'payment.html';
        } else {
            alert('Your cart is empty. Please add items before checkout.');
        }
    });
    
    // Initialize the cart
    initializeCart();
});

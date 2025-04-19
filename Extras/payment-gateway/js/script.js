document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('payment-form');
    const cardNumberInput = document.getElementById('card-number');
    const cardHolderInput = document.getElementById('card-holder');
    const cardTypeIcon = document.getElementById('card-type-icon');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');
    
    // Preview elements
    const previewNumber = document.getElementById('preview-number');
    const previewName = document.getElementById('preview-name');
    const previewExpiry = document.getElementById('preview-expiry');
    const previewCardLogo = document.getElementById('preview-card-logo');
    
    // Modal elements
    const modal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const viewReceiptBtn = document.getElementById('view-receipt');
    const transactionIdElement = document.getElementById('transaction-id');
    const transactionDateElement = document.getElementById('transaction-date');
    const paymentMethodElement = document.getElementById('payment-method');
    
    // Tab switching
    const tabs = document.querySelectorAll('.payment-tabs li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to selected tab and content
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Update payment method in success modal
            if(tabId === 'credit-card') {
                paymentMethodElement.textContent = 'Credit Card';
            } else {
                paymentMethodElement.textContent = 'Digital Wallet';
            }
        });
    });
    
    // Live card preview updates
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
        
        // Update preview
        if (value.length > 0) {
            let maskedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    maskedValue += ' ';
                }
                if (i < value.length - 4) {
                    maskedValue += '•';
                } else {
                    maskedValue += value[i];
                }
            }
            previewNumber.textContent = maskedValue;
        } else {
            previewNumber.textContent = '•••• •••• •••• ••••';
        }
        
        // Detect card type
        detectCardType(value);
    });
    
    cardHolderInput.addEventListener('input', function(e) {
        const value = e.target.value.toUpperCase();
        previewName.textContent = value || 'YOUR NAME';
    });
    
    expiryDateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        e.target.value = value;
        previewExpiry.textContent = value || 'MM/YY';
    });
    
    // Function to detect and display card type
    function detectCardType(number) {
        // Reset the icon
        cardTypeIcon.className = 'far fa-credit-card';
        previewCardLogo.innerHTML = '<i class="far fa-credit-card"></i>';
        
        // Update preview card style
        const previewCard = document.querySelector('.preview-card');
        previewCard.style.background = 'linear-gradient(135deg, #614385, #516395)';
        
        // Visa
        if (number.startsWith('4')) {
            cardTypeIcon.className = 'fab fa-cc-visa';
            previewCardLogo.innerHTML = '<i class="fab fa-cc-visa"></i>';
            previewCard.style.background = 'linear-gradient(135deg, #0099cc, #004D99)';
        } 
        // Mastercard
        else if (/^5[1-5]/.test(number)) {
            cardTypeIcon.className = 'fab fa-cc-mastercard';
            previewCardLogo.innerHTML = '<i class="fab fa-cc-mastercard"></i>';
            previewCard.style.background = 'linear-gradient(135deg, #FF5F00, #CC0000)';
        } 
        // Amex
        else if (/^3[47]/.test(number)) {
            cardTypeIcon.className = 'fab fa-cc-amex';
            previewCardLogo.innerHTML = '<i class="fab fa-cc-amex"></i>';
            previewCard.style.background = 'linear-gradient(135deg, #108168, #002663)';
        } 
        // Discover
        else if (/^6(?:011|5)/.test(number)) {
            cardTypeIcon.className = 'fab fa-cc-discover';
            previewCardLogo.innerHTML = '<i class="fab fa-cc-discover"></i>';
            previewCard.style.background = 'linear-gradient(135deg, #F27B1C, #DC3C01)';
        }
    }
    
    // Validate form on submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            const submitBtn = document.querySelector('.btn-pay');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            
            btnText.textContent = 'Processing...';
            btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate payment processing
            setTimeout(function() {
                // Generate random transaction ID
                const transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
                transactionIdElement.textContent = transactionId;
                
                // Set transaction date
                const now = new Date();
                const formattedDate = now.toLocaleDateString('en-IN', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                transactionDateElement.textContent = formattedDate;
                
                // Show success modal
                modal.classList.add('show');
            }, 2000);
        }
    });
    
    // Close modal and reset form
    closeModalBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        form.reset();
        
        // Reset preview
        previewNumber.textContent = '•••• •••• •••• ••••';
        previewName.textContent = 'YOUR NAME';
        previewExpiry.textContent = 'MM/YY';
        previewCardLogo.innerHTML = '<i class="far fa-credit-card"></i>';
        
        // Reset button
        const submitBtn = document.querySelector('.btn-pay');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        
        btnText.textContent = 'Pay ₹1,528.00';
        btnIcon.innerHTML = '<i class="fas fa-lock"></i>';
        submitBtn.disabled = false;
        
        // Reset preview card style
        const previewCard = document.querySelector('.preview-card');
        previewCard.style.background = 'linear-gradient(135deg, #614385, #516395)';
    });
    
    // View receipt action (example)
    viewReceiptBtn.addEventListener('click', function() {
        alert('Receipt will be emailed to your registered email address.');
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Remove any existing error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('input.error').forEach(el => el.classList.remove('error'));
        
        // Check which tab is active
        const activeTab = document.querySelector('.tab-content.active').id;
        
        if (activeTab === 'credit-card') {
            // Validate card holder name
            const cardHolder = document.getElementById('card-holder');
            if (cardHolder.value.trim() === '') {
                showError(cardHolder, 'Please enter card holder name');
                isValid = false;
            }
            
            // Validate card number
            if (cardNumberInput.value.replace(/\s/g, '').length < 16) {
                showError(cardNumberInput, 'Please enter a valid card number');
                isValid = false;
            }
            
            // Validate expiry date
            const expiryValue = expiryDateInput.value;
            if (!expiryValue.match(/^\d{2}\/\d{2}$/)) {
                showError(expiryDateInput, 'Use format MM/YY');
                isValid = false;
            } else {
                const [month, year] = expiryValue.split('/');
                const now = new Date();
                const currentYear = now.getFullYear() % 100;
                const currentMonth = now.getMonth() + 1;
                
                if (parseInt(month) < 1 || parseInt(month) > 12) {
                    showError(expiryDateInput, 'Month must be between 1-12');
                    isValid = false;
                } else if ((parseInt(year) < currentYear) || 
                          (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                    showError(expiryDateInput, 'Card has expired');
                    isValid = false;
                }
            }
            
            // Validate CVV
            if (cvvInput.value.length < 3) {
                showError(cvvInput, 'Enter valid CVV');
                isValid = false;
            }
            
            // Validate billing address
            const billingAddress = document.getElementById('billing-address');
            if (billingAddress.value.trim() === '') {
                showError(billingAddress, 'Please enter billing address');
                isValid = false;
            }
            
            // Validate city and postal code
            const city = document.getElementById('city');
            const zip = document.getElementById('zip');
            
            if (city.value.trim() === '') {
                showError(city, 'Please enter city');
                isValid = false;
            }
            
            if (zip.value.trim() === '') {
                showError(zip, 'Please enter postal code');
                isValid = false;
            }
        } else {
            // Digital wallet validation
            const selectedWallet = document.querySelector('input[name="wallet"]:checked');
            if (!selectedWallet) {
                const walletOptions = document.querySelector('.wallet-options');
                const errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.textContent = 'Please select a payment method';
                walletOptions.after(errorElement);
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Helper function to show error messages
    function showError(inputElement, message) {
        inputElement.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        inputElement.parentElement.appendChild(errorElement);
        
        // Add shake animation
        inputElement.classList.add('shake');
        setTimeout(() => {
            inputElement.classList.remove('shake');
        }, 500);
    }
    
    // Add CSS for shake animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize preview card flip animation on hover
    const cardPreview = document.querySelector('.card-preview');
    if (cardPreview) {
        cardPreview.addEventListener('mouseenter', function() {
            document.querySelector('.preview-card').classList.add('flip');
        });
        
        cardPreview.addEventListener('mouseleave', function() {
            document.querySelector('.preview-card').classList.remove('flip');
        });
    }
    
    // Add flip animation CSS
    const flipStyle = document.createElement('style');
    flipStyle.innerHTML = `
        .preview-card.flip {
            transform: rotateY(10deg);
            box-shadow: -20px 10px 25px rgba(0, 0, 0, 0.15);
        }
    `;
    document.head.appendChild(flipStyle);
});

// Optional: Add background pattern SVG as fallback if assets/images/bg-pattern.svg is not available
document.addEventListener('DOMContentLoaded', function() {
    // Create SVG pattern for card background if image doesn't load
    const previewCard = document.querySelector('.preview-card');
    
    if (previewCard) {
        // Check if background image failed to load
        setTimeout(() => {
            const computedStyle = getComputedStyle(previewCard);
            const backgroundImage = computedStyle.backgroundImage;
            
            if (!backgroundImage.includes('bg-pattern.svg')) {
                // Create inline SVG pattern
                const patternSVG = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                                <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.1)" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#pattern)" />
                    </svg>
                `;
                
                // Create a data URL from the SVG
                const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(patternSVG);
                
                // Set as background
                previewCard.style.backgroundImage = `linear-gradient(135deg, #614385, #516395), url("${svgDataUrl}")`;
            }
        }, 500);
    }
});

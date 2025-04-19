document.addEventListener("DOMContentLoaded", function() {
    // Get elements
    const progress = document.getElementById("progress");
    const steps = document.querySelectorAll(".step");
    const statusButtons = document.querySelectorAll(".status-btn");
    const trackAnotherBtn = document.getElementById("track-another");
    const contactSupportBtn = document.getElementById("contact-support");
    
    // Set current active step (default: 2 - Order Confirmed)
    let currentActive = 2;
    
    // Update the progress bar and active steps
    function updateProgress() {
        // Update active class for steps
        steps.forEach((step, idx) => {
            if (idx < currentActive) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });
        
        // Update progress bar width
        const progressWidth = ((currentActive - 1) / (steps.length - 1)) * 100;
        progress.style.width = `${progressWidth}%`;
        
        // For mobile view, update height instead of width
        if (window.innerWidth <= 768) {
            progress.style.height = `${progressWidth}%`;
        }
    }
    
    // Event listeners for demo status buttons
    statusButtons.forEach(button => {
        button.addEventListener("click", () => {
            const status = parseInt(button.getAttribute("data-status"));
            currentActive = status;
            updateProgress();
            
            // Add animation effect
            progress.style.transition = "all 0.5s ease";
            steps.forEach(step => {
                step.querySelector(".step-icon").style.transition = "all 0.5s ease";
            });
            
            // Update order dates based on status
            updateOrderDates(status);
        });
    });
    
    // Function to update order dates based on current status
    function updateOrderDates(status) {
        const today = new Date();
        const orderDate = new Date(today);
        orderDate.setDate(today.getDate() - 3); // Order placed 3 days ago
        
        const dateOptions = { month: 'short', day: 'numeric' };
        
        // Set dates for each step based on the current status
        if (status >= 1) {
            document.querySelector('[data-step="1"] .step-date').textContent = 
                orderDate.toLocaleDateString('en-US', dateOptions);
        }
        
        if (status >= 2) {
            const confirmDate = new Date(orderDate);
            confirmDate.setDate(orderDate.getDate() + 1);
            document.querySelector('[data-step="2"] .step-date').textContent = 
                confirmDate.toLocaleDateString('en-US', dateOptions);
        }
        
        if (status >= 3) {
            const shipDate = new Date(orderDate);
            shipDate.setDate(orderDate.getDate() + 3);
            document.querySelector('[data-step="3"] .step-date').textContent = 
                shipDate.toLocaleDateString('en-US', dateOptions);
        }
        
        if (status >= 4) {
            const deliveryDate = new Date(orderDate);
            deliveryDate.setDate(orderDate.getDate() + 6);
            document.querySelector('[data-step="4"] .step-date').textContent = 
                deliveryDate.toLocaleDateString('en-US', dateOptions);
        }
        
        if (status >= 5) {
            const completedDate = new Date(orderDate);
            completedDate.setDate(orderDate.getDate() + 7);
            document.querySelector('[data-step="5"] .step-date').textContent = 
                completedDate.toLocaleDateString('en-US', dateOptions);
        }
    }
    
    // Track another order button
    trackAnotherBtn.addEventListener("click", () => {
        // Simulate tracking another order
        alert("Enter a new order number to track");
    });
    
    // Contact support button
    contactSupportBtn.addEventListener("click", () => {
        // Simulate contacting support
        alert("Connecting to customer support...");
    });
    
    // Handle window resize for responsive layout
    window.addEventListener("resize", () => {
        if (window.innerWidth <= 768) {
            progress.style.width = "6px";
            progress.style.height = `${((currentActive - 1) / (steps.length - 1)) * 100}%`;
        } else {
            progress.style.height = "6px";
            progress.style.width = `${((currentActive - 1) / (steps.length - 1)) * 100}%`;
        }
    });
    
    // Initialize progress
    updateProgress();
});

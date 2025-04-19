document.addEventListener("DOMContentLoaded", function() {
    // Contact Form Submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const orderNumber = document.getElementById("orderNumber").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;
            const newsletter = document.getElementById("newsletter").checked;
            
            // Simulate form submission
            console.log({
                name,
                email,
                phone,
                orderNumber,
                subject,
                message,
                newsletter
            });
            
            // Show success message
            const formCard = document.querySelector(".form-card");
            const originalContent = formCard.innerHTML;
            
            formCard.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 20px;"></i>
                    <h2>Thank You!</h2>
                    <p>Your message has been sent successfully. Our team will get back to you shortly.</p>
                    <button class="btn primary" id="resetForm" style="margin-top: 20px;">
                        <i class="fas fa-paper-plane"></i> Send Another Message
                    </button>
                </div>
            `;
            
            // Add event listener to reset form
            document.getElementById("resetForm").addEventListener("click", function() {
                formCard.innerHTML = originalContent;
                
                // Re-attach event listener to the new form
                const newForm = document.getElementById("contactForm");
                newForm.addEventListener("submit", function(e) {
                    e.preventDefault();
                    // Simulate form submission again
                    console.log("Form submitted again");
                });
            });
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item");
    
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        
        question.addEventListener("click", () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains("active")) {
                    otherItem.classList.remove("active");
                }
            });
            
            // Toggle current item
            item.classList.toggle("active");
        });
    });
    
    // Add link to order tracking page in the header
    const header = document.querySelector(".header h1");
    if (header) {
        header.innerHTML = `<a href="index.html" style="text-decoration: none; color: inherit;">Contact Us</a>`;
    }
    
    // Form validation visual feedback
    const formInputs = document.querySelectorAll("input, select, textarea");
    
    formInputs.forEach(input => {
        input.addEventListener("blur", function() {
            if (this.hasAttribute("required") && !this.value) {
                this.style.borderColor = "var(--error-color)";
                this.style.boxShadow = "0 0 0 3px rgba(220, 53, 69, 0.2)";
            } else {
                this.style.borderColor = "var(--input-border)";
                this.style.boxShadow = "none";
            }
        });
        
        input.addEventListener("input", function() {
            if (this.style.borderColor === "rgb(220, 53, 69)") {
                if (this.value) {
                    this.style.borderColor = "var(--input-border)";
                    this.style.boxShadow = "none";
                }
            }
        });
    });
    
    // Add animation to social links
    const socialLinks = document.querySelectorAll(".social-link");
    
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add("animated");
    });
});

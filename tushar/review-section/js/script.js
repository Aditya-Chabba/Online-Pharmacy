document.addEventListener("DOMContentLoaded", function() {
    // Write Review Button
    const writeReviewBtn = document.getElementById("write-review-btn");
    const reviewForm = document.getElementById("review-form");
    const closeReviewForm = document.getElementById("close-review-form");
    
    writeReviewBtn.addEventListener("click", function() {
        reviewForm.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    });
    
    closeReviewForm.addEventListener("click", function() {
        reviewForm.classList.remove("active");
        document.body.style.overflow = ""; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the form
    reviewForm.addEventListener("click", function(e) {
        if (e.target === reviewForm) {
            reviewForm.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
    
    // Star Rating Functionality
    const ratingStars = document.querySelectorAll(".rating-input i");
    const ratingValue = document.getElementById("rating-value");
    
    ratingStars.forEach(star => {
        star.addEventListener("mouseover", function() {
            const rating = this.getAttribute("data-rating");
            highlightStars(rating);
        });
        
        star.addEventListener("mouseout", function() {
            resetStars();
            if (ratingValue.value > 0) {
                highlightStars(ratingValue.value);
            }
        });
        
        star.addEventListener("click", function() {
            const rating = this.getAttribute("data-rating");
            ratingValue.value = rating;
            highlightStars(rating);
        });
    });
    
    function highlightStars(rating) {
        ratingStars.forEach(star => {
            const starRating = star.getAttribute("data-rating");
            if (starRating <= rating) {
                star.classList.remove("far");
                star.classList.add("fas");
                star.classList.add("hover");
            } else {
                star.classList.remove("fas");
                star.classList.add("far");
                star.classList.remove("hover");
            }
        });
    }
    
    function resetStars() {
        ratingStars.forEach(star => {
            star.classList.remove("fas");
            star.classList.add("far");
            star.classList.remove("hover");
        });
    }
    
    // Photo Upload Preview
    const photoInput = document.getElementById("photo-input");
    const photoPreview = document.getElementById("photo-preview");
    
    photoInput.addEventListener("change", function() {
        photoPreview.innerHTML = "";
        
        if (this.files) {
            const maxFiles = 5;
            const files = Array.from(this.files).slice(0, maxFiles);
            
            files.forEach(file => {
                if (!file.type.match("image.*")) {
                    return;
                }
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const previewItem = document.createElement("div");
                    previewItem.className = "preview-item";
                    
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    
                    const removeBtn = document.createElement("div");
                    removeBtn.className = "remove-photo";
                    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                    removeBtn.addEventListener("click", function() {
                        previewItem.remove();
                    });
                    
                    previewItem.appendChild(img);
                    previewItem.appendChild(removeBtn);
                    photoPreview.appendChild(previewItem);
                };
                
                reader.readAsDataURL(file);
            });
            
            if (this.files.length > maxFiles) {
                alert(`You can upload a maximum of ${maxFiles} images.`);
            }
        }
    });
    
    // Form Submission
    const newReviewForm = document.getElementById("new-review-form");
    
    newReviewForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Validate rating
        if (ratingValue.value === "0") {
            alert("Please select a rating");
            return;
        }
        
        // Get form values
        const rating = ratingValue.value;
        const title = document.getElementById("review-title").value;
        const content = document.getElementById("review-content").value;
        const name = document.getElementById("reviewer-name").value;
        const email = document.getElementById("reviewer-email").value;
        
        // Simulate form submission
        console.log({
            rating,
            title,
            content,
            name,
            email
        });
        
        // Show success message
        const formCard = document.querySelector(".review-form-card");
        const originalContent = formCard.innerHTML;
        
        formCard.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 30px 0;">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 20px;"></i>
                <h2>Thank You for Your Review!</h2>
                <p style="margin: 20px 0;">Your review has been submitted successfully and will be published after moderation.</p>
                <button class="btn primary" id="close-success">
                    <i class="fas fa-arrow-left"></i> Back to Reviews
                </button>
            </div>
        `;
        
        // Add event listener to close success message
        document.getElementById("close-success").addEventListener("click", function() {
            reviewForm.classList.remove("active");
            document.body.style.overflow = "";
            
            // Reset form after a short delay
            setTimeout(() => {
                formCard.innerHTML = originalContent;
                
                // Re-initialize form event listeners
                initFormEventListeners();
            }, 300);
        });
    });
    
    function initFormEventListeners() {
        // Re-initialize star rating
        const newRatingStars = document.querySelectorAll(".rating-input i");
        const newRatingValue = document.getElementById("rating-value");
        
        newRatingStars.forEach(star => {
            star.addEventListener("mouseover", function() {
                const rating = this.getAttribute("data-rating");
                highlightStars(rating);
            });
            
            star.addEventListener("mouseout", function() {
                resetStars();
                if (newRatingValue.value > 0) {
                    highlightStars(newRatingValue.value);
                }
            });
            
            star.addEventListener("click", function() {
                const rating = this.getAttribute("data-rating");
                newRatingValue.value = rating;
                highlightStars(rating);
            });
        });
        
        // Re-initialize photo upload
        const newPhotoInput = document.getElementById("photo-input");
        const newPhotoPreview = document.getElementById("photo-preview");
        
        newPhotoInput.addEventListener("change", function() {
            // Photo upload logic
        });
        
        // Re-initialize form submission
        const newReviewForm = document.getElementById("new-review-form");
        newReviewForm.addEventListener("submit", function(e) {
            e.preventDefault();
            // Form submission logic
        });
    }
    
    // Helpful buttons functionality
    const helpfulBtns = document.querySelectorAll(".helpful-btn");
    
    helpfulBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const isActive = this.classList.contains("active");
            
            // Remove active class from all buttons in the same group
            const parentSection = this.closest(".helpful-section");
            parentSection.querySelectorAll(".helpful-btn").forEach(button => {
                button.classList.remove("active");
            });
            
            // Toggle active class for clicked button
            if (!isActive) {
                this.classList.add("active");
                
                // Update count (in a real app, this would be an API call)
                const countText = this.textContent;
                const count = parseInt(countText.match(/\d+/)[0]);
                const newCount = count + 1;
                
                if (this.querySelector("i").classList.contains("fa-thumbs-up")) {
                    this.innerHTML = '<i class="fas fa-thumbs-up"></i> Yes (' + newCount + ')';
                } else {
                    this.innerHTML = '<i class="fas fa-thumbs-down"></i> No (' + newCount + ')';
                }
            }
        });
    });
    
    // Report button functionality
    const reportBtns = document.querySelectorAll(".report-btn");
    
    reportBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const reviewCard = this.closest(".review-card");
            const reviewTitle = reviewCard.querySelector(".review-title").textContent;
            
            if (confirm(`Do you want to report the review "${reviewTitle}" as inappropriate?`)) {
                alert("Thank you for your feedback. Our team will review this content.");
                this.disabled = true;
                this.innerHTML = '<i class="fas fa-flag"></i> Reported';
            }
        });
    });
    
    // Load more reviews button
    const loadMoreBtn = document.getElementById("load-more-btn");
    
    loadMoreBtn.addEventListener("click", function() {
        // In a real app, this would fetch more reviews from the server
        // For demo purposes, we'll just show a message
        loadMoreBtn.textContent = "Loading...";
        
        setTimeout(() => {
            loadMoreBtn.textContent = "No More Reviews";
            loadMoreBtn.disabled = true;
        }, 1500);
    });
    
    // Filter and sort functionality
    const sortSelect = document.getElementById("sort-by");
    const filterSelect = document.getElementById("filter-rating");
    const searchInput = document.getElementById("search-reviews");
    const searchBtn = document.getElementById("search-btn");
    
    function applyFilters() {
        // In a real app, this would filter and sort the reviews
        // For demo purposes, we'll just log the filter values
        console.log({
            sort: sortSelect.value,
            filter: filterSelect.value,
            search: searchInput.value
        });
        
        // Simulate loading
        const reviewsContainer = document.querySelector(".reviews-container");
        reviewsContainer.style.opacity = "0.5";
        
        setTimeout(() => {
            reviewsContainer.style.opacity = "1";
        }, 500);
    }
    
    sortSelect.addEventListener("change", applyFilters);
    filterSelect.addEventListener("change", applyFilters);
    searchBtn.addEventListener("click", applyFilters);
    
    searchInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            applyFilters();
        }
    });
});

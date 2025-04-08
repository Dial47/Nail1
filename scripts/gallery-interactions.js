/**
 * AngelNails - Gallery Interactions JavaScript
 * Version: 1.0
 */

document.addEventListener("DOMContentLoaded", () => {
  // Gallery Filter Functionality
  initGalleryFilter();
  
  // Video Gallery Functionality
  initVideoGallery();
  
  // Gallery Pagination
  initGalleryPagination();
  
  // Instagram Feed Hover Effects
  initInstagramFeed();
  
  // Add sparkle effects to gallery items
  initGallerySparkles();
});

// Gallery Filter
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".filter-button");
  const galleryItems = document.querySelectorAll(".gallery-item");
  
  if (!filterButtons.length || !galleryItems.length) return;
  
  // Add initial animation to gallery items
  galleryItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add("gallery-item-animated");
  });
  
  // Event listeners for filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", function() {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      
      // Add active class to clicked button
      this.classList.add("active");
      
      // Get filter value
      const filterValue = this.getAttribute("data-filter");
      
      // Filter items with animation
      galleryItems.forEach((item, index) => {
        // Reset animation delay for staggered effect
        item.style.transitionDelay = `${index * 0.05}s`;
        
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1) translateY(0)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8) translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Video Gallery
function initVideoGallery() {
  const videoButtons = document.querySelectorAll(".video-play-button");
  const videoModal = document.getElementById("video-modal");
  const videoContainer = document.getElementById("video-container");
  const closeButton = document.querySelector(".video-modal-close");
  
  if (!videoButtons.length || !videoModal || !videoContainer) return;
  
  // Open video modal when play button is clicked
  videoButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const videoId = this.getAttribute("data-video-id");
      
      // Here you would normally load the actual video
      // For this example, we'll create a placeholder
      videoContainer.innerHTML = `
        <div class="video-placeholder">
          <div class="video-placeholder-icon">
            <i class="fas fa-play"></i>
          </div>
          <p>Video: ${videoId}</p>
          <p class="video-placeholder-text">Video player would load here</p>
        </div>
      `;
      
      // Show modal
      videoModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      
      // Animate modal opening
      setTimeout(() => {
        videoModal.style.opacity = "1";
      }, 10);
    });
  });
  
  // Close video modal
  if (closeButton) {
    closeButton.addEventListener("click", closeVideoModal);
  }
  
  // Close modal when clicking outside content
  videoModal.addEventListener("click", function(e) {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });
  
  // Close modal with ESC key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && videoModal.style.display === "flex") {
      closeVideoModal();
    }
  });
  
  function closeVideoModal() {
    videoModal.style.opacity = "0";
    setTimeout(() => {
      videoModal.style.display = "none";
      videoContainer.innerHTML = "";
      document.body.style.overflow = "";
    }, 300);
  }
}

// Gallery Pagination
function initGalleryPagination() {
  const paginationButtons = document.querySelectorAll(".pagination-button");
  
  if (!paginationButtons.length) return;
  
  paginationButtons.forEach((button) => {
    button.addEventListener("click", function() {
      // Remove active class from all buttons
      paginationButtons.forEach((btn) => btn.classList.remove("active"));
      
      // Add active class to clicked button
      if (!this.classList.contains("next")) {
        this.classList.add("active");
      }
      
      // Here you would normally load the next page of gallery items
      // For this example, we'll just show an alert
      if (this.classList.contains("next")) {
        alert("Cargar más imágenes");
      } else {
        alert(`Cargar página ${this.textContent}`);
      }
    });
  });
}

// Instagram Feed Hover Effects
function initInstagramFeed() {
  const instagramItems = document.querySelectorAll(".instagram-item");
  
  if (!instagramItems.length) return;
  
  instagramItems.forEach((item) => {
    item.addEventListener("mouseenter", function() {
      this.querySelector(".instagram-overlay").style.opacity = "1";
    });
    
    item.addEventListener("mouseleave", function() {
      this.querySelector(".instagram-overlay").style.opacity = "0";
    });
  });
}

// Gallery Sparkles
function initGallerySparkles() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  
  if (!galleryItems.length) return;
  
  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", function() {
      addSparkleEffect(this);
    });
  });
  
  function addSparkleEffect(element) {
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement("div");
      sparkle.classList.add("gallery-sparkle");
      
      // Random position around the element
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      sparkle.style.left = `${posX}%`;
      sparkle.style.top = `${posY}%`;
      
      // Random size
      const size = Math.random() * 10 + 5;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      
      // Random animation duration
      sparkle.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
      
      element.appendChild(sparkle);
      
      // Remove sparkle after animation
      setTimeout(() => {
        sparkle.remove();
      }, 1500);
    }
  }
}

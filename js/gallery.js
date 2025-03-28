// Gallery functionality for the gallery page

document.addEventListener("DOMContentLoaded", () => {
    // Tab functionality
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")
  
    if (tabButtons.length > 0) {
      tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Remove active class from all buttons and contents
          tabButtons.forEach((btn) => btn.classList.remove("active"))
          tabContents.forEach((content) => content.classList.remove("active"))
  
          // Add active class to clicked button
          this.classList.add("active")
  
          // Show corresponding content
          const category = this.dataset.category
          document.getElementById(category).classList.add("active")
        })
      })
    }
  
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll(".gallery-item")
  
    if (galleryItems.length > 0) {
      // Create lightbox elements
      const lightbox = document.createElement("div")
      lightbox.className = "lightbox"
  
      const lightboxContent = document.createElement("div")
      lightboxContent.className = "lightbox-content"
  
      const lightboxImage = document.createElement("img")
      lightboxImage.className = "lightbox-image"
  
      const closeBtn = document.createElement("span")
      closeBtn.className = "lightbox-close"
      closeBtn.innerHTML = "&times;"
  
      // Append elements to the DOM
      lightboxContent.appendChild(lightboxImage)
      lightboxContent.appendChild(closeBtn)
      lightbox.appendChild(lightboxContent)
      document.body.appendChild(lightbox)
  
      // Add click event to gallery items
      galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
          const img = item.querySelector("img")
          lightboxImage.src = img.src
          lightbox.style.display = "flex"
          document.body.style.overflow = "hidden" // Prevent scrolling when lightbox is open
        })
      })
  
      // Close lightbox when clicking the close button
      closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none"
        document.body.style.overflow = "" // Re-enable scrolling
      })
  
      // Close lightbox when clicking outside the image
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          lightbox.style.display = "none"
          document.body.style.overflow = "" // Re-enable scrolling
        }
      })
    }
  
    // Add lightbox styles
    const style = document.createElement("style")
    style.textContent = `
          .lightbox {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.9);
              z-index: 1100;
              justify-content: center;
              align-items: center;
          }
          
          .lightbox-content {
              position: relative;
              max-width: 90%;
              max-height: 90%;
          }
          
          .lightbox-image {
              max-width: 100%;
              max-height: 90vh;
              display: block;
              border-radius: 5px;
          }
          
          .lightbox-close {
              position: absolute;
              top: -40px;
              right: 0;
              color: white;
              font-size: 30px;
              font-weight: bold;
              cursor: pointer;
          }
      `
    document.head.appendChild(style)
  
    // Scroll animation
    const animateElements = document.querySelectorAll(".animate-on-scroll")
  
    function checkScroll() {
      animateElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight * 0.9) {
          element.classList.add("active")
        }
      })
    }
  
    // Check elements on load
    checkScroll()
  
    // Check elements on scroll
    window.addEventListener("scroll", checkScroll)
  })
  
  
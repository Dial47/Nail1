// Main JavaScript file for AgelNails website

document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    const currentYearElements = document.querySelectorAll("#currentYear")
    if (currentYearElements.length > 0) {
      const currentYear = new Date().getFullYear()
      currentYearElements.forEach((element) => {
        element.textContent = currentYear
      })
    }
  
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector(".mobile-menu-button")
    const closeMenuButton = document.querySelector(".close-menu-button")
    const mobileMenu = document.querySelector(".mobile-menu")
    const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop")
  
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.add("active")
        mobileMenuBackdrop.classList.add("active")
        document.body.style.overflow = "hidden" // Prevent scrolling when menu is open
      })
    }
  
    if (closeMenuButton && mobileMenu) {
      closeMenuButton.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        mobileMenuBackdrop.classList.remove("active")
        document.body.style.overflow = "" // Re-enable scrolling
      })
    }
  
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        mobileMenuBackdrop.classList.remove("active")
        document.body.style.overflow = "" // Re-enable scrolling
      })
    }
  
    // Check if we're on the reservations page and if there's a selected service in localStorage
    if (window.location.pathname.includes("reservas.html")) {
      const serviceSelect = document.getElementById("service")
      const selectedService = localStorage.getItem("selectedService")
  
      if (serviceSelect && selectedService) {
        // Set the selected service in the dropdown
        const option = Array.from(serviceSelect.options).find((opt) => opt.value === selectedService)
        if (option) {
          serviceSelect.value = selectedService
        }
  
        // Clear the selected service from localStorage
        localStorage.removeItem("selectedService")
      }
    }
  
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
  
  
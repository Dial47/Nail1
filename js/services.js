// Services page functionality

document.addEventListener("DOMContentLoaded", () => {
  // Accordion functionality for FAQs
  const accordionItems = document.querySelectorAll(".accordion-item")

  if (accordionItems.length > 0) {
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header")
      const content = item.querySelector(".accordion-content")

      header.addEventListener("click", () => {
        // Toggle active class on the item
        item.classList.toggle("active")

        // Toggle the content visibility
        if (item.classList.contains("active")) {
          content.style.maxHeight = content.scrollHeight + "px"
        } else {
          content.style.maxHeight = "0"
        }

        // Close other accordion items
        accordionItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active")
            otherItem.querySelector(".accordion-content").style.maxHeight = "0"
          }
        })
      })
    })
  }

  // Service booking links
  const serviceBookingLinks = document.querySelectorAll(".service-booking-link")

  if (serviceBookingLinks.length > 0) {
    serviceBookingLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Get the service from the data attribute
        const service = this.dataset.service

        // Store the selected service in localStorage
        localStorage.setItem("selectedService", service)
      })
    })
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


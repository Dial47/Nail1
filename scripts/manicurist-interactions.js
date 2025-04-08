/**
 * AngelNails - Manicurist Interactions JavaScript
 * Version: 1.0
 */

document.addEventListener("DOMContentLoaded", () => {
  // Service Card Interactions
  initServiceCards()

  // Color Picker Functionality
  initColorPicker()

  // Design Showcase Interactions
  initDesignShowcase()

  // FAQ Section Interactions
  initFaqSection()
})

// Service Cards
function initServiceCards() {
  const serviceCards = document.querySelectorAll(".service-card")

  if (!serviceCards.length) return

  serviceCards.forEach((card) => {
    // Add 3D tilt effect
    card.addEventListener("mousemove", function (e) {
      if (window.innerWidth <= 991) return

      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const tiltX = (y - centerY) / 15 // Reduced tilt amount for smoother effect
      const tiltY = (centerX - x) / 15

      this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`

      // Add dynamic shadow based on tilt
      const shadowX = tiltY * 2
      const shadowY = tiltX * 2
      this.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(255, 62, 157, 0.15), 0 15px 30px rgba(0, 0, 0, 0.1)`
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.boxShadow = ""
    })

    // Add hover effect for service icon
    const serviceIcon = card.querySelector(".service-icon")
    if (serviceIcon) {
      card.addEventListener("mouseenter", () => {
        serviceIcon.style.transform = "rotate(10deg) scale(1.1)"
      })

      card.addEventListener("mouseleave", () => {
        serviceIcon.style.transform = ""
      })
    }

    // Add sparkle effect on hover
    card.addEventListener("mouseenter", function () {
      addSparkleEffect(this)
    })
  })

  // Add sparkle effect to premium service cards
  const premiumCards = document.querySelectorAll(".premium-service-card")
  if (premiumCards.length) {
    premiumCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        addSparkleEffect(this)
      })
    })
  }

  function addSparkleEffect(element) {
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement("div")
      sparkle.classList.add("design-sparkle")

      // Random position around the element
      const posX = Math.random() * 100
      const posY = Math.random() * 100

      sparkle.style.left = `${posX}%`
      sparkle.style.top = `${posY}%`

      // Random size
      const size = Math.random() * 10 + 5
      sparkle.style.width = `${size}px`
      sparkle.style.height = `${size}px`

      // Random animation duration
      sparkle.style.animationDuration = `${Math.random() * 1 + 0.5}s`

      element.appendChild(sparkle)

      // Remove sparkle after animation
      setTimeout(() => {
        sparkle.remove()
      }, 1500)
    }
  }
}

// Color Picker
function initColorPicker() {
  const colorSwatches = document.querySelectorAll(".color-swatch")
  const nails = document.querySelectorAll(".nail")
  const colorNameDisplay = document.querySelector(".color-name-display")
  const colorBrand = document.getElementById("color-brand")
  const colorFinish = document.getElementById("color-finish")
  const colorDurability = document.getElementById("color-durability")
  const randomColorButton = document.querySelector(".random-color-button")

  if (!colorSwatches.length || !nails.length) return

  // Set initial color
  const defaultColor = "#FFFFFF"
  nails.forEach((nail) => {
    nail.style.backgroundColor = defaultColor
  })

  // Color swatch click event
  colorSwatches.forEach((swatch) => {
    swatch.addEventListener("click", function () {
      const color = this.style.backgroundColor
      const colorName = this.getAttribute("data-name")
      const brand = this.getAttribute("data-brand")
      const finish = this.getAttribute("data-finish")
      const durability = this.getAttribute("data-durability")

      // Apply color to nails with staggered animation
      nails.forEach((nail, index) => {
        setTimeout(() => {
          nail.style.backgroundColor = color
          nail.style.transform = "scale(1.1)"

          setTimeout(() => {
            nail.style.transform = "scale(1)"
          }, 200)
        }, index * 100)
      })

      // Update color information
      if (colorNameDisplay) colorNameDisplay.textContent = colorName
      if (colorBrand) colorBrand.textContent = brand
      if (colorFinish) colorFinish.textContent = finish
      if (colorDurability) colorDurability.textContent = durability

      // Add active class to selected swatch
      colorSwatches.forEach((s) => s.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Random color button
  if (randomColorButton) {
    randomColorButton.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * colorSwatches.length)
      colorSwatches[randomIndex].click()
    })
  }
}

// Design Showcase
function initDesignShowcase() {
  const designItems = document.querySelectorAll(".design-item")

  if (!designItems.length) return

  designItems.forEach((item) => {
    const overlay = item.querySelector(".design-overlay")

    // Show overlay on hover
    item.addEventListener("mouseenter", () => {
      overlay.style.opacity = "1"
      overlay.style.transform = "translateY(0)"
    })

    item.addEventListener("mouseleave", () => {
      overlay.style.opacity = "0"
      overlay.style.transform = "translateY(20px)"
    })

    // Add sparkle effect on hover
    item.addEventListener("mouseenter", function () {
      addSparkleEffect(this)
    })
  })

  function addSparkleEffect(element) {
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement("div")
      sparkle.classList.add("design-sparkle")

      // Random position around the element
      const posX = Math.random() * 100
      const posY = Math.random() * 100

      sparkle.style.left = `${posX}%`
      sparkle.style.top = `${posY}%`

      // Random size
      const size = Math.random() * 10 + 5
      sparkle.style.width = `${size}px`
      sparkle.style.height = `${size}px`

      // Random animation duration
      sparkle.style.animationDuration = `${Math.random() * 1 + 0.5}s`

      element.appendChild(sparkle)

      // Remove sparkle after animation
      setTimeout(() => {
        sparkle.remove()
      }, 1500)
    }
  }
}

// Añadir inicialización para la sección de FAQ
function initFaqSection() {
  const faqItems = document.querySelectorAll(".faq-item")

  if (!faqItems.length) return

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")

    // Set initial height for animation
    answer.style.height = "0px"

    question.addEventListener("click", () => {
      // Toggle active class
      const isActive = item.classList.contains("active")

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
          otherItem.querySelector(".faq-answer").style.height = "0px"
        }
      })

      // Toggle current item
      if (isActive) {
        item.classList.remove("active")
        answer.style.height = "0px"
      } else {
        item.classList.add("active")
        answer.style.height = answer.scrollHeight + "px"
      }
    })
  })
}

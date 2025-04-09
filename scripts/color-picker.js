/**
 * AngelNails - Color Picker Functionality
 * Version: 1.0
 */

document.addEventListener("DOMContentLoaded", () => {
  initColorPicker()
})

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
      const colorName = this.getAttribute("data-name") || "Color"
      const brand = this.getAttribute("data-brand") || "Brand"
      const finish = this.getAttribute("data-finish") || "Finish"
      const durability = this.getAttribute("data-durability") || "Duration"

      // Apply color to nails with staggered animation
      nails.forEach((nail, index) => {
        setTimeout(() => {
          // Add animation class
          nail.classList.add("changing-color")

          // Change color
          nail.style.backgroundColor = color

          // Remove animation class after animation completes
          setTimeout(() => {
            nail.classList.remove("changing-color")
          }, 500)
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

  // Trigger a click on the first color swatch to initialize
  if (colorSwatches.length > 0) {
    setTimeout(() => {
      colorSwatches[0].click()
    }, 1000)
  }
}

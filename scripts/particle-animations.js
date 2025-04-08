/**
 * AngelNails - Particle Animations JavaScript
 * Version: 1.0
 */

document.addEventListener("DOMContentLoaded", () => {
    // Glitter particles
    const glitterContainer = document.querySelector(".glitter-container")
  
    if (glitterContainer) {
      // Create glitter particles on mouse move
      document.addEventListener("mousemove", (e) => {
        createGlitterParticle(e.clientX, e.clientY)
      })
  
      // Create glitter particles on touch move
      document.addEventListener("touchmove", (e) => {
        createGlitterParticle(e.touches[0].clientX, e.touches[0].clientY)
      })
  
      // Function to create a glitter particle
      function createGlitterParticle(x, y) {
        // Limit the rate of particle creation
        if (Math.random() > 0.3) return
  
        const particle = document.createElement("div")
        particle.classList.add("glitter-particle")
  
        // Random size between 3px and 8px
        const size = Math.random() * 5 + 3
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
  
        // Position at mouse/touch position with slight random offset
        const offsetX = (Math.random() - 0.5) * 20
        const offsetY = (Math.random() - 0.5) * 20
        particle.style.left = `${x + offsetX}px`
        particle.style.top = `${y + offsetY}px`
  
        // Random color
        const hue = Math.random() * 60 + 300 // Pink to purple range
        const saturation = Math.random() * 20 + 80 // High saturation
        const lightness = Math.random() * 20 + 70 // Bright
        particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`
  
        // Add to container
        glitterContainer.appendChild(particle)
  
        // Remove after animation completes
        setTimeout(() => {
          particle.remove()
        }, 3000)
      }
  
      // Create random particles periodically
      setInterval(() => {
        if (Math.random() > 0.7) {
          const x = Math.random() * window.innerWidth
          const y = Math.random() * window.innerHeight
          createGlitterParticle(x, y)
        }
      }, 200)
    }
  
    // Floating elements
    const floatingElements = document.querySelectorAll(".animate-float-slow, .animate-float-medium, .animate-float-fast")
  
    floatingElements.forEach((element) => {
      // Add random delay to make the animation more natural
      const delay = Math.random() * 2
      element.style.animationDelay = `${delay}s`
    })
  })
  
  
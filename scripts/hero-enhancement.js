/**
 * AngelNails - Hero Section Enhancement
 * Version: 1.0
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mejorar la experiencia visual del hero
  enhanceHeroSection()
})

function enhanceHeroSection() {
  // Obtener elementos del hero
  const heroSection = document.querySelector(".hero-section")
  const carouselSlides = document.querySelectorAll(".carousel-slide")
  const highlightTexts = document.querySelectorAll(".highlight-text")

  if (!heroSection) return

  // Añadir efecto de brillo a los textos destacados
  highlightTexts.forEach((text) => {
    // Crear efecto de brillo
    const addGlowEffect = () => {
      text.style.boxShadow = "0 0 10px rgba(255, 62, 157, 0.7)"
      setTimeout(() => {
        text.style.boxShadow = "none"
      }, 1000)
    }

    // Aplicar efecto cada 3 segundos
    setInterval(addGlowEffect, 3000)

    // Aplicar efecto inicial después de un retraso
    setTimeout(addGlowEffect, 1500)
  })

  // Mejorar la transición entre slides
  carouselSlides.forEach((slide) => {
    slide.addEventListener("transitionend", function () {
      if (this.classList.contains("active")) {
        // Añadir efecto de zoom suave a la imagen de fondo
        const image = this.querySelector(".carousel-image")
        if (image) {
          image.style.transform = "scale(1.05)"
          setTimeout(() => {
            image.style.transform = "scale(1)"
          }, 5000)
        }
      }
    })
  })

  // Añadir partículas brillantes al hero
  addSparkleParticles(heroSection)
}

function addSparkleParticles(container) {
  // Crear 15 partículas brillantes
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const particle = document.createElement("div")
      particle.className = "hero-sparkle"

      // Posición aleatoria
      const posX = Math.random() * 100
      const posY = Math.random() * 100

      // Tamaño aleatorio
      const size = Math.random() * 6 + 2

      // Estilo de la partícula
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: white;
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        opacity: 0;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        z-index: 5;
        pointer-events: none;
      `

      // Añadir al contenedor
      container.appendChild(particle)

      // Animar aparición y desaparición
      setTimeout(() => {
        particle.style.opacity = "0.8"
        particle.style.transform = "scale(1.5)"
        particle.style.transition = "all 1s ease-in-out"

        setTimeout(() => {
          particle.style.opacity = "0"
          particle.style.transform = "scale(0.5)"

          // Eliminar después de la animación
          setTimeout(() => {
            particle.remove()
          }, 1000)
        }, 1500)
      }, 100)
    }, i * 1000) // Escalonar la creación de partículas
  }

  // Repetir el proceso cada 15 segundos
  setTimeout(() => {
    addSparkleParticles(container)
  }, 15000)
}

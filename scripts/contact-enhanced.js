/**
 * AngelNails - Enhanced Contact Page JavaScript
 * Version: 1.0
 */

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar animaciones para elementos al hacer scroll
    initScrollAnimations()
  
    // Inicializar el acordeón de preguntas frecuentes
    initFaqAccordion()
  
    // Añadir efectos de hover a las tarjetas de información
    initCardHoverEffects()
  
    // Añadir efectos de partículas brillantes
    initGlitterEffects()
  })
  
  // Función para inicializar animaciones al hacer scroll
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(".animate-on-scroll")
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )
  
    animatedElements.forEach((element) => {
      observer.observe(element)
    })
  }
  
  // Función para inicializar el acordeón de preguntas frecuentes
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      const answer = item.querySelector(".faq-answer")
  
      // Establecer altura inicial para la animación
      answer.style.height = "0px"
  
      question.addEventListener("click", () => {
        // Comprobar si el elemento está activo
        const isActive = item.classList.contains("active")
  
        // Cerrar todos los demás elementos
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
            otherItem.querySelector(".faq-answer").style.height = "0px"
          }
        })
  
        // Alternar el elemento actual
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
  
  // Función para inicializar efectos de hover en las tarjetas
  function initCardHoverEffects() {
    // Tarjetas de información de contacto
    const contactInfoCards = document.querySelectorAll(".contact-info-card")
  
    contactInfoCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        const icon = this.querySelector(".contact-info-icon")
        if (icon) {
          icon.style.transform = "rotate(10deg) scale(1.1)"
        }
      })
  
      card.addEventListener("mouseleave", function () {
        const icon = this.querySelector(".contact-info-icon")
        if (icon) {
          icon.style.transform = ""
        }
      })
    })
  
    // Tarjetas de redes sociales
    const socialMediaCards = document.querySelectorAll(".social-media-card")
  
    socialMediaCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        const icon = this.querySelector(".social-media-icon")
        const cta = this.querySelector(".social-media-cta")
  
        if (icon) {
          icon.style.transform = "rotate(10deg) scale(1.1)"
        }
  
        if (cta) {
          cta.style.transform = "translateX(5px)"
        }
      })
  
      card.addEventListener("mouseleave", function () {
        const icon = this.querySelector(".social-media-icon")
        const cta = this.querySelector(".social-media-cta")
  
        if (icon) {
          icon.style.transform = ""
        }
  
        if (cta) {
          cta.style.transform = ""
        }
      })
    })
  }
  
  // Función para añadir efectos de partículas brillantes
  function initGlitterEffects() {
    const glitterContainer = document.querySelector(".glitter-container")
  
    if (!glitterContainer) return
  
    // Crear partículas brillantes al mover el ratón
    document.addEventListener("mousemove", (e) => {
      // Limitar la frecuencia de creación de partículas
      if (Math.random() > 0.9) {
        createGlitterParticle(e.clientX, e.clientY)
      }
    })
  
    // Función para crear una partícula brillante
    function createGlitterParticle(x, y) {
      const particle = document.createElement("div")
      particle.classList.add("glitter-particle")
  
      // Tamaño aleatorio entre 3px y 8px
      const size = Math.random() * 5 + 3
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
  
      // Posición en el cursor con un ligero desplazamiento aleatorio
      const offsetX = (Math.random() - 0.5) * 20
      const offsetY = (Math.random() - 0.5) * 20
      particle.style.left = `${x + offsetX}px`
      particle.style.top = `${y + offsetY}px`
  
      // Color aleatorio en tonos rosa y morado
      const colors = ["#ff3e9d", "#a742ff", "#4158ff", "#ffde59"]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      particle.style.backgroundColor = randomColor
  
      // Añadir al contenedor
      glitterContainer.appendChild(particle)
  
      // Eliminar después de que termine la animación
      setTimeout(() => {
        particle.remove()
      }, 3000)
    }
  
    // Crear partículas aleatorias periódicamente
    setInterval(() => {
      if (Math.random() > 0.7) {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        createGlitterParticle(x, y)
      }
    }, 200)
  }
  
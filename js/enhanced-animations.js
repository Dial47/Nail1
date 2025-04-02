/**
 * Script para animaciones mejoradas y efectos dinámicos
 */
document.addEventListener("DOMContentLoaded", () => {
  // Elementos para animar
  const animatedElements = document.querySelectorAll(".animate-on-scroll")
  const heroContent = document.querySelector(".hero-content")
  const ctaElements = document.querySelectorAll(".cta-title, .cta-description, .cta-button-container")
  const testimonialElements = document.querySelectorAll(
    ".testimonial-title, .testimonial-description, .testimonial-slider",
  )

  // Añadir clase para iniciar animación del hero
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add("animate-fade-in")
    }, 500)
  }

  // Función para animar elementos al hacer scroll
  function animateOnScroll() {
    const triggerBottom = window.innerHeight * 0.8

    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      if (elementTop < triggerBottom) {
        element.classList.add("active")
      }
    })

    // Animar elementos de CTA con retraso secuencial
    ctaElements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top
      if (elementTop < triggerBottom) {
        setTimeout(() => {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
          element.style.transition = "opacity 0.8s ease, transform 0.8s ease"
        }, 200 * index)
      }
    })

    // Animar elementos de testimonios con retraso secuencial
    testimonialElements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top
      if (elementTop < triggerBottom) {
        setTimeout(() => {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
          element.style.transition = "opacity 0.8s ease, transform 0.8s ease"
        }, 200 * index)
      }
    })
  }

  // Ejecutar animaciones al cargar la página
  animateOnScroll()

  // Ejecutar animaciones al hacer scroll
  window.addEventListener("scroll", animateOnScroll)

  // Añadir efectos de parallax al hero
  const heroSection = document.querySelector(".hero-section")
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      if (scrollPosition < window.innerHeight) {
        const parallaxOffset = scrollPosition * 0.4
        heroSection.style.backgroundPositionY = `-${parallaxOffset}px`
      }
    })
  }

  // Añadir efecto de partículas flotantes en el hero
  function createParticles() {
    const heroSection = document.querySelector(".hero-section")
    if (!heroSection) return

    // Crear contenedor de partículas
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles-container"
    particlesContainer.style.position = "absolute"
    particlesContainer.style.top = "0"
    particlesContainer.style.left = "0"
    particlesContainer.style.width = "100%"
    particlesContainer.style.height = "100%"
    particlesContainer.style.overflow = "hidden"
    particlesContainer.style.zIndex = "1"
    heroSection.appendChild(particlesContainer)

    // Crear partículas
    const particleCount = 20
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.position = "absolute"
      particle.style.width = `${Math.random() * 10 + 5}px`
      particle.style.height = particle.style.width
      particle.style.background = "rgba(255, 255, 255, 0.5)"
      particle.style.borderRadius = "50%"
      particle.style.top = `${Math.random() * 100}%`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`
      particle.style.opacity = `${Math.random() * 0.5 + 0.1}`
      particle.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)"

      particlesContainer.appendChild(particle)
    }
  }

  // Crear partículas flotantes
  createParticles()

  // Añadir efecto de brillo a los botones
  const buttons = document.querySelectorAll(".cta-button, .service-button, .carousel-button")
  buttons.forEach((button) => {
    button.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      this.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%), var(--gradient-hot)`
    })

    button.addEventListener("mouseleave", function () {
      this.style.background = "var(--gradient-hot)"
    })
  })

  // Añadir efecto de ondas al hacer clic en botones
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ripple = document.createElement("span")
      ripple.className = "ripple-effect"
      ripple.style.position = "absolute"
      ripple.style.top = `${y}px`
      ripple.style.left = `${x}px`
      ripple.style.transform = "translate(-50%, -50%)"
      ripple.style.width = "0"
      ripple.style.height = "0"
      ripple.style.borderRadius = "50%"
      ripple.style.backgroundColor = "rgba(255, 255, 255, 0.4)"
      ripple.style.transition = "all 0.6s ease-out"

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        ripple.style.width = `${Math.max(rect.width, rect.height) * 2.5}px`
        ripple.style.height = `${Math.max(rect.width, rect.height) * 2.5}px`
        ripple.style.opacity = "0"
      }, 10)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Añadir efecto de desplazamiento suave a los enlaces internos
  const internalLinks = document.querySelectorAll('a[href^="#"]')
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Añadir efecto de typing al título principal
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.innerHTML
    heroTitle.innerHTML = ""

    let i = 0
    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.innerHTML += originalText.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    // Iniciar efecto de typing después de un breve retraso
    setTimeout(typeWriter, 1000)
  }

  // Añadir efecto de contador para números en estadísticas (si existen)
  const countElements = document.querySelectorAll(".count-up")
  countElements.forEach((element) => {
    const target = Number.parseInt(element.getAttribute("data-target"))
    let count = 0
    const increment = target / 50 // Incrementar en 50 pasos

    function updateCount() {
      if (count < target) {
        count += increment
        element.innerText = Math.ceil(count)
        setTimeout(updateCount, 30)
      } else {
        element.innerText = target
      }
    }

    // Iniciar contador cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCount()
          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(element)
  })
})

// Añadir efecto de cambio de color al hacer scroll
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY
  const navbar = document.getElementById("main-navbar")

  if (navbar) {
    if (scrollPosition > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  }
})

// Añadir año actual al copyright
document.addEventListener("DOMContentLoaded", () => {
  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }
})

// Prevenir animaciones durante el redimensionamiento
let resizeTimer
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper")
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper")
  }, 400)
})


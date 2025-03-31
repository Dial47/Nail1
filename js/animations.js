// Animaciones adicionales para AgelNails
document.addEventListener("DOMContentLoaded", () => {
  // Aplicar animaciones a elementos específicos
  applyAnimations()

  // Inicializar efectos de parallax
  initParallax()

  // Inicializar efectos de hover
  initHoverEffects()

  // Inicializar animaciones de texto
  initTextAnimations()

  // Inicializar efectos de scroll
  initScrollEffects()

  // Mejorar el carrusel
  enhanceCarousel()
})

// Aplicar animaciones a elementos específicos
function applyAnimations() {
  // Animación flotante para el logo
  const logo = document.querySelector(".logo-image")
  if (logo) {
    logo.classList.add("float-animation")
  }

  // Animación de pulso para botones CTA
  const ctaButtons = document.querySelectorAll(".cta-button")
  ctaButtons.forEach((button) => {
    button.classList.add("pulse-animation")
  })

  // Animación para tarjetas de servicio
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    card.classList.add("hover-scale")
  })

  // Animación para elementos de galería
  const galleryItems = document.querySelectorAll(".gallery-item")
  galleryItems.forEach((item) => {
    item.classList.add("hover-glow")
  })
}

// Inicializar efectos de parallax
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY

    // Parallax para hero section
    const heroContent = document.querySelector(".hero-content")
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.2}px)`
    }

    // Parallax para círculos decorativos
    const circles = document.querySelectorAll(".decorative-circle")
    circles.forEach((circle, index) => {
      const speed = 0.05 * (index + 1)
      circle.style.transform = `translateY(${scrollY * speed}px)`
    })
  })
}

// Inicializar efectos de hover
function initHoverEffects() {
  // Efecto de brillo para botones
  const buttons = document.querySelectorAll("button, .service-button, .cta-button")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s ease"
      this.style.boxShadow = "0 0 15px rgba(255, 0, 153, 0.7)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.boxShadow = ""
    })
  })

  // Efecto de zoom para imágenes
  const images = document.querySelectorAll(".service-image, .gallery-image")
  images.forEach((image) => {
    image.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.5s ease"
      this.style.transform = "scale(1.1)"
    })

    image.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })
  })
}

// Inicializar animaciones de texto
function initTextAnimations() {
  // Animación de texto para títulos de sección
  const sectionTitles = document.querySelectorAll(".section-title")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  sectionTitles.forEach((title) => {
    title.style.opacity = "0"
    title.style.transform = "translateY(20px)"
    title.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(title)
  })
}

// Inicializar efectos de scroll
function initScrollEffects() {
  // Efecto de aparición al hacer scroll
  const elementsToAnimate = document.querySelectorAll(".service-card, .gallery-item, .testimonial-card, .calendly-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  elementsToAnimate.forEach((element) => {
    element.classList.add("to-animate")
    observer.observe(element)
  })

  // Añadir estilos para animaciones
  const style = document.createElement("style")
  style.textContent = `
    .to-animate {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `
  document.head.appendChild(style)
}

// Mejorar el carrusel
function enhanceCarousel() {
  const carouselSlides = document.querySelectorAll(".carousel-slide")
  const carouselIndicators = document.querySelectorAll(".carousel-indicators .indicator")
  const prevButton = document.querySelector(".carousel-button.prev")
  const nextButton = document.querySelector(".carousel-button.next")

  if (carouselSlides.length === 0) return

  let currentSlide = 0
  let isAnimating = false
  let autoplayInterval

  // Función para mostrar un slide específico
  function showSlide(index) {
    if (isAnimating) return
    isAnimating = true

    // Ocultar slide actual
    carouselSlides[currentSlide].classList.remove("active")
    carouselIndicators[currentSlide].classList.remove("active")

    // Mostrar nuevo slide
    currentSlide = index
    carouselSlides[currentSlide].classList.add("active")
    carouselIndicators[currentSlide].classList.add("active")

    // Permitir nueva animación después de un tiempo
    setTimeout(() => {
      isAnimating = false
    }, 1000)
  }

  // Función para ir al siguiente slide
  function nextSlide() {
    let newIndex = currentSlide + 1
    if (newIndex >= carouselSlides.length) {
      newIndex = 0
    }
    showSlide(newIndex)
  }

  // Función para ir al slide anterior
  function prevSlide() {
    let newIndex = currentSlide - 1
    if (newIndex < 0) {
      newIndex = carouselSlides.length - 1
    }
    showSlide(newIndex)
  }

  // Iniciar autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000)
  }

  // Detener autoplay
  function stopAutoplay() {
    clearInterval(autoplayInterval)
  }

  // Reiniciar autoplay
  function resetAutoplay() {
    stopAutoplay()
    startAutoplay()
  }

  // Configurar botones de navegación
  if (prevButton && nextButton) {
    prevButton.addEventListener("click", (e) => {
      e.preventDefault()
      prevSlide()
      resetAutoplay()
    })

    nextButton.addEventListener("click", (e) => {
      e.preventDefault()
      nextSlide()
      resetAutoplay()
    })
  }

  // Configurar indicadores
  carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", (e) => {
      e.preventDefault()
      showSlide(index)
      resetAutoplay()
    })
  })

  // Añadir efectos de hover a los botones de navegación
  const carouselButtons = document.querySelectorAll(".carousel-button")
  carouselButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-50%) scale(1.1)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-50%)"
    })
  })

  // Iniciar autoplay
  startAutoplay()

  // Pausar autoplay al hacer hover en el carrusel
  const carousel = document.querySelector(".carousel")
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoplay)
    carousel.addEventListener("mouseleave", startAutoplay)
  }
}

// Efecto de partículas para secciones especiales
function createParticles(container) {
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Estilos aleatorios para cada partícula
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    particle.style.width = `${Math.random() * 10 + 5}px`
    particle.style.height = particle.style.width
    particle.style.opacity = `${Math.random() * 0.5 + 0.1}`
    particle.style.animationDuration = `${Math.random() * 10 + 5}s`
    particle.style.animationDelay = `${Math.random() * 5}s`

    container.appendChild(particle)
  }
}

// Inicializar partículas en secciones específicas
document.addEventListener("DOMContentLoaded", () => {
  const ctaSection = document.querySelector(".cta-section")
  if (ctaSection) {
    ctaSection.style.position = "relative"
    ctaSection.style.overflow = "hidden"
    createParticles(ctaSection)
  }

  // Añadir estilos para partículas
  const style = document.createElement("style")
  style.textContent = `
    .particle {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
      animation: float-particle 10s infinite linear;
    }
    
    @keyframes float-particle {
      0% {
        transform: translateY(0) rotate(0deg);
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
      }
    }
  `
  document.head.appendChild(style)
})


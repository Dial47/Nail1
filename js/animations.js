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

  // Añadir efectos de brillo
  addShimmerEffects()

  // Añadir animaciones de entrada
  addEntranceAnimations()
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

  // Animación para el botón de WhatsApp
  const whatsappButton = document.querySelector(".whatsapp-button")
  if (whatsappButton) {
    setInterval(() => {
      whatsappButton.classList.add("pulse-animation")
      setTimeout(() => {
        whatsappButton.classList.remove("pulse-animation")
      }, 2000)
    }, 5000)
  }
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

    // Parallax para imágenes de servicio
    const serviceImages = document.querySelectorAll(".service-image")
    serviceImages.forEach((image) => {
      const card = image.closest(".service-card")
      const cardTop = card.getBoundingClientRect().top
      const cardCenter = cardTop + card.offsetHeight / 2
      const windowCenter = window.innerHeight / 2
      const distanceFromCenter = cardCenter - windowCenter
      const parallaxValue = distanceFromCenter * 0.05

      image.style.transform = `translateY(${parallaxValue}px)`
    })

    // Parallax para imágenes de galería
    const galleryImages = document.querySelectorAll(".gallery-image")
    galleryImages.forEach((image) => {
      const item = image.closest(".gallery-item")
      const itemTop = item.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      const parallaxValue = (itemTop - windowHeight) * 0.05

      image.style.transform = `translateY(${parallaxValue}px)`
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

  // Efecto de elevación para tarjetas
  const cards = document.querySelectorAll(".service-card, .testimonial-card, .gallery-item")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s ease"
      this.style.transform = "translateY(-10px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })

  // Efecto de brillo para enlaces del menú
  const menuLinks = document.querySelectorAll(".menu-link")
  menuLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s ease"
      this.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.8)"
    })

    link.addEventListener("mouseleave", function () {
      this.style.textShadow = ""
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

  // Animación para el título del hero
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const text = heroTitle.textContent
    heroTitle.innerHTML = ""

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span")
      span.textContent = text[i]
      span.style.opacity = "0"
      span.style.display = "inline-block"
      span.style.transform = "translateY(20px)"
      span.style.transition = `opacity 0.5s ease ${i * 0.03}s, transform 0.5s ease ${i * 0.03}s`

      heroTitle.appendChild(span)

      setTimeout(() => {
        span.style.opacity = "1"
        span.style.transform = "translateY(0)"
      }, 100)
    }
  }
}

// Inicializar efectos de scroll
function initScrollEffects() {
  // Efecto de aparición al hacer scroll
  const elementsToAnimate = document.querySelectorAll(
    ".service-card, .gallery-item, .testimonial-card, .calendly-card, .section-header, .cta-content",
  )

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

  // Efecto de cambio de tamaño para la navbar al hacer scroll
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
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

  // Añadir controles táctiles para dispositivos móviles
  let touchStartX = 0
  let touchEndX = 0

  carousel.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
    },
    false,
  )

  carousel.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    },
    false,
  )

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Deslizar a la izquierda
      nextSlide()
      resetAutoplay()
    } else if (touchEndX > touchStartX + 50) {
      // Deslizar a la derecha
      prevSlide()
      resetAutoplay()
    }
  }
}

// Añadir efectos de brillo
function addShimmerEffects() {
  // Añadir efecto de brillo a los títulos
  const titles = document.querySelectorAll(".section-title, .hero-title, .cta-title")
  titles.forEach((title) => {
    title.classList.add("shimmer-animation")
  })

  // Añadir efecto de brillo a los botones CTA
  const ctaButtons = document.querySelectorAll(".cta-button")
  ctaButtons.forEach((button) => {
    const shimmerOverlay = document.createElement("div")
    shimmerOverlay.className = "shimmer-overlay"
    shimmerOverlay.style.position = "absolute"
    shimmerOverlay.style.top = "0"
    shimmerOverlay.style.left = "0"
    shimmerOverlay.style.width = "100%"
    shimmerOverlay.style.height = "100%"
    shimmerOverlay.style.background =
      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)"
    shimmerOverlay.style.backgroundSize = "200% 100%"
    shimmerOverlay.style.animation = "shimmer 2s infinite"
    shimmerOverlay.style.pointerEvents = "none"

    button.style.position = "relative"
    button.style.overflow = "hidden"
    button.appendChild(shimmerOverlay)
  })
}

// Añadir animaciones de entrada
function addEntranceAnimations() {
  // Animación para las tarjetas de servicio
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(50px)"
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
            observer.unobserve(card)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(card)
  })

  // Animación para los elementos de galería
  const galleryItems = document.querySelectorAll(".gallery-item")
  galleryItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)"
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            item.style.opacity = "1"
            item.style.transform = "translateX(0)"
            observer.unobserve(item)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(item)
  })

  // Animación para los testimonios
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  testimonialCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "scale(0.9)"
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease"

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.style.opacity = "1"
            card.style.transform = "scale(1)"
            observer.unobserve(card)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(card)
  })
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


document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Mobile Menu
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const closeMenuButton = document.querySelector(".close-menu-button")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop")
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link, .mobile-cta-button")

  // Mejorar la funcionalidad del menú móvil
  function openMobileMenu() {
    mobileMenu.classList.add("active")
    mobileMenuBackdrop.classList.add("active")
    document.body.style.overflow = "hidden"

    // Añadir animación de entrada a los elementos del menú
    const menuItems = document.querySelectorAll(".mobile-menu-link")
    menuItems.forEach((item, index) => {
      item.style.opacity = "0"
      item.style.transform = "translateX(20px)"
      setTimeout(
        () => {
          item.style.transition = "all 0.3s ease"
          item.style.opacity = "1"
          item.style.transform = "translateX(0)"
        },
        100 + index * 50,
      )
    })
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active")
    mobileMenuBackdrop.classList.remove("active")
    document.body.style.overflow = ""
  }

  mobileMenuButton.addEventListener("click", openMobileMenu)
  closeMenuButton.addEventListener("click", closeMobileMenu)
  mobileMenuBackdrop.addEventListener("click", closeMobileMenu)

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Hero Carousel - Optimizado
  const carouselSlides = document.querySelectorAll(".carousel-slide")
  const carouselIndicators = document.querySelectorAll(".carousel-indicators .indicator")
  const prevButton = document.querySelector(".carousel-button.prev")
  const nextButton = document.querySelector(".carousel-button.next")

  if (carouselSlides.length > 0) {
    let currentSlide = 0
    let carouselInterval
    let isTransitioning = false

    function showSlide(index) {
      if (isTransitioning) return
      isTransitioning = true

      // Fade out current slide
      carouselSlides[currentSlide].style.opacity = "0"
      carouselIndicators[currentSlide].classList.remove("active")

      // After fade out, set up new slide
      setTimeout(() => {
        carouselSlides[currentSlide].classList.remove("active")
        carouselSlides[index].classList.add("active")
        carouselIndicators[index].classList.add("active")

        // Start fade in
        setTimeout(() => {
          carouselSlides[index].style.opacity = "1"
          currentSlide = index
          isTransitioning = false
        }, 50)
      }, 500)
    }

    function nextSlide() {
      if (isTransitioning) return
      let newIndex = currentSlide + 1
      if (newIndex >= carouselSlides.length) {
        newIndex = 0
      }
      showSlide(newIndex)
    }

    function prevSlide() {
      if (isTransitioning) return
      let newIndex = currentSlide - 1
      if (newIndex < 0) {
        newIndex = carouselSlides.length - 1
      }
      showSlide(newIndex)
    }

    function startCarouselInterval() {
      carouselInterval = setInterval(nextSlide, 5000)
    }

    function resetCarouselInterval() {
      clearInterval(carouselInterval)
      startCarouselInterval()
    }

    // Inicializar el carrusel
    carouselSlides.forEach((slide, index) => {
      if (index === 0) {
        slide.classList.add("active")
        slide.style.opacity = "1"
      } else {
        slide.style.opacity = "0"
      }
    })

    carouselIndicators[0].classList.add("active")

    // Añadir event listeners para los botones
    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => {
        prevSlide()
        resetCarouselInterval()
      })

      nextButton.addEventListener("click", () => {
        nextSlide()
        resetCarouselInterval()
      })
    }

    // Añadir event listeners para los indicadores
    carouselIndicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        if (currentSlide !== index) {
          showSlide(index)
          resetCarouselInterval()
        }
      })
    })

    // Iniciar el intervalo automático
    startCarouselInterval()
  }

  // Testimonial Slider - Optimizado con la misma lógica
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialIndicators = document.querySelectorAll(".testimonial-indicators .indicator")
  const testimonialPrevButton = document.querySelector(".testimonial-button.prev")
  const testimonialNextButton = document.querySelector(".testimonial-button.next")

  if (testimonialSlides.length > 0) {
    let currentTestimonial = 0
    let testimonialInterval
    let isTestimonialTransitioning = false

    function showTestimonial(index) {
      if (isTestimonialTransitioning) return
      isTestimonialTransitioning = true

      // Fade out current testimonial
      testimonialSlides[currentTestimonial].style.opacity = "0"
      testimonialIndicators[currentTestimonial].classList.remove("active")

      // After fade out, set up new testimonial
      setTimeout(() => {
        testimonialSlides[currentTestimonial].classList.remove("active")
        testimonialSlides[index].classList.add("active")
        testimonialIndicators[index].classList.add("active")

        // Start fade in
        setTimeout(() => {
          testimonialSlides[index].style.opacity = "1"
          currentTestimonial = index
          isTestimonialTransitioning = false
        }, 50)
      }, 500)
    }

    function nextTestimonial() {
      if (isTestimonialTransitioning) return
      let newIndex = currentTestimonial + 1
      if (newIndex >= testimonialSlides.length) {
        newIndex = 0
      }
      showTestimonial(newIndex)
    }

    function prevTestimonial() {
      if (isTestimonialTransitioning) return
      let newIndex = currentTestimonial - 1
      if (newIndex < 0) {
        newIndex = testimonialSlides.length - 1
      }
      showTestimonial(newIndex)
    }

    function startTestimonialInterval() {
      testimonialInterval = setInterval(nextTestimonial, 7000)
    }

    function resetTestimonialInterval() {
      clearInterval(testimonialInterval)
      startTestimonialInterval()
    }

    // Inicializar el slider de testimonios
    testimonialSlides.forEach((slide, index) => {
      if (index === 0) {
        slide.classList.add("active")
        slide.style.opacity = "1"
      } else {
        slide.style.opacity = "0"
      }
    })

    testimonialIndicators[0].classList.add("active")

    // Añadir event listeners para los botones
    if (testimonialPrevButton && testimonialNextButton) {
      testimonialPrevButton.addEventListener("click", () => {
        prevTestimonial()
        resetTestimonialInterval()
      })

      testimonialNextButton.addEventListener("click", () => {
        nextTestimonial()
        resetTestimonialInterval()
      })
    }

    // Añadir event listeners para los indicadores
    testimonialIndicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        if (currentTestimonial !== index) {
          showTestimonial(index)
          resetTestimonialInterval()
        }
      })
    })

    // Iniciar el intervalo automático
    startTestimonialInterval()
  }

  // Scroll Animations
  function animateOnScroll() {
    const elements = document.querySelectorAll(".animate-on-scroll")
    const serviceCards = document.querySelectorAll(".service-card-animate")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("active")
      }
    })

    serviceCards.forEach((card, index) => {
      const cardPosition = card.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (cardPosition < windowHeight - 100) {
        setTimeout(() => {
          card.classList.add("active")
        }, 150 * index)
      }
    })
  }

  // Run once on load
  animateOnScroll()

  // Run on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.classList.contains("service-booking-link")) {
        // No prevenir el comportamiento predeterminado para los enlaces de reserva de servicio
        // ya que se manejan en calendly-integration.js
        return
      }

      e.preventDefault()

      const targetId = this.getAttribute("href")

      // Manejar URLs con parámetros como #booking?service=manicura-regular
      const cleanTargetId = targetId.split("?")[0]
      const targetElement = document.querySelector(cleanTargetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for navbar height
          behavior: "smooth",
        })
      }
    })
  })

  // Inicializar animaciones al cargar la página
  document.querySelector(".hero-content").classList.add("animate-fade-in")

  // Añadir fallbacks para imágenes
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      if (!this.hasAttribute("data-error-handled")) {
        this.setAttribute("data-error-handled", "true")

        // Determinar el tipo de imagen y establecer un placeholder adecuado
        const width = this.width || 300
        const height = this.height || 200
        const alt = this.alt || "Imagen"

        this.src = `https://placehold.co/${width}x${height}/e6007e/ffffff?text=${encodeURIComponent(alt)}`
      }
    })
  })

  // Marcar el enlace activo en la navegación
  const currentLocation = window.location.pathname
  const menuLinks = document.querySelectorAll(".menu-link")

  menuLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")
    if (
      linkPath === currentLocation ||
      (currentLocation === "/" && linkPath === "/index.html") ||
      (linkPath !== "/index.html" && currentLocation.includes(linkPath))
    ) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })

  // Efecto de reducción de la navbar al hacer scroll
  const navbar = document.getElementById("main-navbar")

  function handleScroll() {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  }

  // Ejecutar una vez al cargar
  handleScroll()

  // Añadir evento de scroll
  window.addEventListener("scroll", handleScroll)
})


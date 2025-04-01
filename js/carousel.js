// Funcionalidad simplificada para el carrusel
document.addEventListener("DOMContentLoaded", () => {
  initCarousel()
})

function initCarousel() {
  const carouselSlides = document.querySelectorAll(".carousel-slide")
  const carouselIndicators = document.querySelectorAll(".carousel-indicators .indicator")
  const prevButton = document.querySelector(".carousel-button.prev")
  const nextButton = document.querySelector(".carousel-button.next")

  if (carouselSlides.length === 0) return

  let currentSlide = 0
  let isAnimating = false
  let autoplayInterval

  // Inicializar el carrusel
  function initializeCarousel() {
    // Ocultar todas las diapositivas excepto la primera
    carouselSlides.forEach((slide, index) => {
      if (index === 0) {
        slide.classList.add("active")
      } else {
        slide.classList.remove("active")
      }
    })

    // Activar el primer indicador
    if (carouselIndicators.length > 0) {
      carouselIndicators[0].classList.add("active")
    }

    // Iniciar autoplay
    startAutoplay()

    // Configurar controles
    setupControls()

    // Configurar eventos táctiles
    setupTouchEvents()
  }

  // Función para mostrar un slide específico
  function showSlide(index) {
    if (isAnimating) return
    isAnimating = true

    // Ocultar slide actual
    carouselSlides[currentSlide].classList.remove("active")
    if (carouselIndicators.length > 0) {
      carouselIndicators[currentSlide].classList.remove("active")
    }

    // Mostrar nuevo slide
    currentSlide = index
    carouselSlides[currentSlide].classList.add("active")
    if (carouselIndicators.length > 0) {
      carouselIndicators[currentSlide].classList.add("active")
    }

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

  // Configurar controles
  function setupControls() {
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
        if (currentSlide !== index) {
          showSlide(index)
          resetAutoplay()
        }
      })
    })

    // Pausar autoplay al hacer hover en el carrusel
    const carousel = document.querySelector(".carousel")
    if (carousel) {
      carousel.addEventListener("mouseenter", stopAutoplay)
      carousel.addEventListener("mouseleave", startAutoplay)
    }
  }

  // Configurar eventos táctiles
  function setupTouchEvents() {
    const carousel = document.querySelector(".carousel")
    let touchStartX = 0
    let touchEndX = 0

    carousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      { passive: true },
    )

    carousel.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      { passive: true },
    )

    function handleSwipe() {
      const swipeThreshold = 50

      if (touchEndX < touchStartX - swipeThreshold) {
        // Deslizar a la izquierda (siguiente)
        nextSlide()
        resetAutoplay()
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Deslizar a la derecha (anterior)
        prevSlide()
        resetAutoplay()
      }
    }
  }

  // Optimizar imágenes para diferentes tamaños de pantalla
  function optimizeImages() {
    carouselSlides.forEach((slide) => {
      const img = slide.querySelector(".carousel-image")
      if (img) {
        // Asegurar que la imagen cubra todo el espacio sin líneas blancas
        img.style.width = "100%"
        img.style.height = "100%"
        img.style.objectFit = "cover"

        // Centrar la imagen para diferentes tamaños de pantalla
        if (window.innerWidth <= 768) {
          // En móviles, centrar en el sujeto principal
          img.style.objectPosition = "center center"
        } else {
          // En pantallas grandes, mostrar más contexto
          img.style.objectPosition = "center center"
        }
      }
    })
  }

  // Inicializar el carrusel
  initializeCarousel()

  // Optimizar imágenes
  optimizeImages()

  // Reoptimizar imágenes cuando cambia el tamaño de la ventana
  window.addEventListener("resize", optimizeImages)
}


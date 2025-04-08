/**
 * AngelNails - Carousel JavaScript File
 * Contiene la funcionalidad del carrusel de imágenes
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar el carrusel
  initCarousel()
})

/**
 * Inicializa el carrusel de imágenes
 */
function initCarousel() {
  const carousel = document.querySelector(".carousel")
  if (!carousel) return

  const slides = carousel.querySelectorAll(".carousel-slide")
  const indicators = carousel.querySelectorAll(".carousel-indicators .indicator")
  const prevButton = carousel.querySelector(".carousel-button.prev")
  const nextButton = carousel.querySelector(".carousel-button.next")

  let currentSlide = 0
  let interval
  const autoplayDelay = 5000 // 5 segundos entre slides

  // Función para mostrar un slide específico
  function showSlide(index) {
    // Ocultar todos los slides
    slides.forEach((slide) => {
      slide.classList.remove("active")
      slide.style.opacity = "0"
    })

    // Desactivar todos los indicadores
    indicators.forEach((indicator) => {
      indicator.classList.remove("active")
    })

    // Mostrar el slide actual
    slides[index].classList.add("active")
    slides[index].style.opacity = "1"

    // Activar el indicador correspondiente
    indicators[index].classList.add("active")

    // Actualizar el índice actual
    currentSlide = index
  }

  // Función para ir al siguiente slide
  function nextSlide() {
    let next = currentSlide + 1
    if (next >= slides.length) {
      next = 0
    }
    showSlide(next)
  }

  // Función para ir al slide anterior
  function prevSlide() {
    let prev = currentSlide - 1
    if (prev < 0) {
      prev = slides.length - 1
    }
    showSlide(prev)
  }

  // Iniciar autoplay
  function startAutoplay() {
    interval = setInterval(nextSlide, autoplayDelay)
  }

  // Detener autoplay
  function stopAutoplay() {
    clearInterval(interval)
  }

  // Event listeners para los botones
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide()
      stopAutoplay()
      startAutoplay() // Reiniciar el autoplay después de la interacción
    })
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide()
      stopAutoplay()
      startAutoplay() // Reiniciar el autoplay después de la interacción
    })
  }

  // Event listeners para los indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index)
      stopAutoplay()
      startAutoplay() // Reiniciar el autoplay después de la interacción
    })
  })

  // Pausar autoplay al hacer hover sobre el carrusel
  carousel.addEventListener("mouseenter", stopAutoplay)
  carousel.addEventListener("mouseleave", startAutoplay)

  // Iniciar el carrusel
  showSlide(0)
  startAutoplay()

  // Manejar el botón de sonido del video
  const videoSoundToggle = carousel.querySelector(".video-sound-toggle")
  const backgroundVideo = carousel.querySelector("#background-video")

  if (videoSoundToggle && backgroundVideo) {
    videoSoundToggle.addEventListener("click", function () {
      if (backgroundVideo.muted) {
        backgroundVideo.muted = false
        this.innerHTML = '<i class="fas fa-volume-up"></i>'
      } else {
        backgroundVideo.muted = true
        this.innerHTML = '<i class="fas fa-volume-mute"></i>'
      }
    })
  }

  // Añadir transiciones suaves entre slides
  slides.forEach((slide) => {
    slide.style.transition = "opacity 1s ease-in-out"
  })
}


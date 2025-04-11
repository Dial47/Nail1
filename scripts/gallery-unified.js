/**
 * AngelNails - Galería y Videos Unificados
 * Version: 2.1
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar componentes de la galería
  initGalleryFilter()
  initVideoPlayers()
  initGalleryLoader()
  initVideoLoader()
  initTrendsSlider()
})

// ===== FILTRO DE GALERÍA =====
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".filter-button")
  const galleryItems = document.querySelectorAll(".gallery-item")

  if (!filterButtons.length) return

  // Configurar botones de filtro
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Quitar clase activa de todos los botones
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Añadir clase activa al botón clickeado
      this.classList.add("active")

      // Obtener valor del filtro
      const filterValue = this.getAttribute("data-filter")

      // Filtrar elementos con animación
      filterGalleryItems(galleryItems, filterValue)
    })
  })
}

function filterGalleryItems(items, filterValue) {
  items.forEach((item, index) => {
    // Retrasar la animación para efecto escalonado
    item.style.transitionDelay = `${index * 0.05}s`

    if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
      item.style.display = "block"
      setTimeout(() => {
        item.style.opacity = "1"
        item.style.transform = "scale(1) translateY(0)"
      }, 50)
    } else {
      item.style.opacity = "0"
      item.style.transform = "scale(0.8) translateY(20px)"
      setTimeout(() => {
        item.style.display = "none"
      }, 300)
    }
  })
}

// ===== REPRODUCTOR DE VIDEOS =====
function initVideoPlayers() {
  const videoItems = document.querySelectorAll(".video-item")

  if (!videoItems.length) return

  // Videos de demostración (en un entorno real, estos vendrían de una base de datos)
  const videoSources = {
    "video-1": {
      title: "Tutorial de Uñas Acrílicas",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      type: "video/mp4",
      poster: "img/gallery/g002.webp",
    },
    "video-2": {
      title: "Diseño de Nail Art Floral",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      type: "video/mp4",
      poster: "img/gallery/g003.webp",
    },
    "video-3": {
      title: "Efecto Espejo en Gel",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      type: "video/mp4",
      poster: "img/gallery/g004.webp",
    },
    "video-4": {
      title: "Decoración con Pedrería",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      type: "video/mp4",
      poster: "img/gallery/g005.webp",
    },
    "video-5": {
      title: "Técnica de Degradado",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      type: "video/mp4",
      poster: "img/gallery/g006.webp",
    },
    "video-6": {
      title: "Uñas de Temporada",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      type: "video/mp4",
      poster: "img/gallery/g007.webp",
    },
    "video-7": {
      title: "Manicura Francesa Moderna",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      type: "video/mp4",
      poster: "img/gallery/g001.webp",
    },
    "video-8": {
      title: "Técnicas de Nail Art Avanzado",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      type: "video/mp4",
      poster: "img/gallery/g002.webp",
    },
    "video-9": {
      title: "Cuidados para Uñas Naturales",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      type: "video/mp4",
      poster: "img/gallery/g003.webp",
    },
    "video-7": {
      title: "Manicura Francesa Moderna",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      type: "video/mp4",
      poster: "img/gallery/g001.webp",
    },
    "video-8": {
      title: "Técnicas de Nail Art Avanzado",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      type: "video/mp4",
      poster: "img/gallery/g002.webp",
    },
    "video-9": {
      title: "Cuidados para Uñas Naturales",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      type: "video/mp4",
      poster: "img/gallery/g003.webp",
    },
  }

  setupVideoPlayers(videoItems, videoSources)
}

function setupVideoPlayers(videoItems, videoSources) {
  videoItems.forEach((item) => {
    const playButton = item.querySelector(".video-play-button")
    const thumbnail = item.querySelector(".video-thumbnail")
    const videoId = playButton.getAttribute("data-video-id")

    // Configurar botón de reproducción
    playButton.addEventListener("click", function (e) {
      e.preventDefault()

      // Si ya hay un video reproduciéndose, detenerlo
      const existingVideo = item.querySelector("video")
      if (existingVideo) {
        // Si el video ya existe, solo alternar reproducción/pausa
        if (existingVideo.paused) {
          existingVideo.play()
          this.innerHTML = '<i class="fas fa-pause"></i>'
        } else {
          existingVideo.pause()
          this.innerHTML = '<i class="fas fa-play"></i>'
        }
        return
      }

      // Obtener datos del video
      const videoData = videoSources[videoId]
      if (!videoData) {
        console.error("Video no encontrado:", videoId)
        return
      }

      // Crear elemento de video
      const videoElement = document.createElement("video")
      videoElement.className = "video-player"
      videoElement.controls = true
      videoElement.poster = videoData.poster
      videoElement.style.width = "100%"
      videoElement.style.height = "100%"
      videoElement.style.objectFit = "cover"
      videoElement.style.borderRadius = "10px"

      // Crear source para el video
      const sourceElement = document.createElement("source")
      sourceElement.src = videoData.src
      sourceElement.type = videoData.type

      // Mensaje de fallback
      videoElement.innerHTML = "Tu navegador no soporta la reproducción de videos."

      // Añadir source al video
      videoElement.appendChild(sourceElement)

      // Reemplazar la miniatura con el video
      thumbnail.innerHTML = ""
      thumbnail.appendChild(videoElement)
      thumbnail.appendChild(playButton)

      // Cambiar el icono del botón
      playButton.innerHTML = '<i class="fas fa-pause"></i>'
      playButton.classList.add("playing")

      // Reproducir el video
      videoElement.play()

      // Manejar eventos del video
      videoElement.addEventListener("ended", () => {
        // Restaurar la miniatura cuando termina el video
        playButton.innerHTML = '<i class="fas fa-play"></i>'
        playButton.classList.remove("playing")
      })

      // Manejar errores de carga
      videoElement.addEventListener("error", () => {
        console.error("Error al cargar el video:", videoId)

        // Mostrar mensaje de error
        thumbnail.innerHTML = `
          <div class="video-error">
            <i class="fas fa-exclamation-circle"></i>
            <p>Lo sentimos, el video no está disponible.</p>
          </div>
        `
        thumbnail.appendChild(playButton)
        playButton.innerHTML = '<i class="fas fa-play"></i>'
      })
    })
  })
}

// ===== CARGA DE GALERÍA =====
function initGalleryLoader() {
  const galleryContainer = document.getElementById("gallery-container")
  const loadMoreButton = document.getElementById("load-more-button")
  const galleryLoader = document.querySelector(".gallery-loader")

  if (!galleryContainer || !loadMoreButton) return

  // Datos de ejemplo para la galería (en un entorno real, vendrían de una API)
  const galleryData = [
    {
      id: 1,
      title: "Manicura Francesa Elegante",
      category: "gel",
      image: "img/gallery/g001.webp",
      description: "Diseño clásico y elegante para cualquier ocasión",
    },
    {
      id: 2,
      title: "Uñas Acrílicas con Pedrería",
      category: "acrilicas",
      image: "img/gallery/g002.webp",
      description: "Diseño sofisticado con aplicaciones de cristales",
    },
    {
      id: 3,
      title: "Nail Art Floral",
      category: "nail-art",
      image: "img/gallery/g003.webp",
      description: "Delicados diseños florales pintados a mano",
    },
    {
      id: 4,
      title: "Efecto Espejo",
      category: "gel",
      image: "img/gallery/g004.webp",
      description: "Acabado cromado de alta duración",
    },
    {
      id: 5,
      title: "Pedicura Spa Completa",
      category: "pedicura",
      image: "img/gallery/g005.webp",
      description: "Tratamiento completo con exfoliación e hidratación",
    },
    {
      id: 6,
      title: "Diseño Navideño",
      category: "temporada",
      image: "img/gallery/g006.webp",
      description: "Motivos festivos para celebrar la temporada",
    },
    {
      id: 7,
      title: "Uñas Stiletto",
      category: "acrilicas",
      image: "img/gallery/g007.webp",
      description: "Diseño elegante y estilizado para ocasiones especiales",
    },
    {
      id: 8,
      title: "Manicura Minimalista",
      category: "gel",
      image: "img/gallery/g001.webp",
      description: "Diseños simples pero sofisticados para el día a día",
    },
    {
      id: 9,
      title: "Nail Art Geométrico",
      category: "nail-art",
      image: "img/gallery/g002.webp",
      description: "Patrones geométricos modernos y elegantes",
    },
    {
      id: 10,
      title: "Pedicura con Diseño",
      category: "pedicura",
      image: "img/gallery/g003.webp",
      description: "Pedicura completa con diseños exclusivos",
    },
    {
      id: 11,
      title: "Diseño Primaveral",
      category: "temporada",
      image: "img/gallery/g004.webp",
      description: "Motivos florales y colores vibrantes para primavera",
    },
    {
      id: 12,
      title: "Uñas de Gel con Glitter",
      category: "gel",
      image: "img/gallery/g005.webp",
      description: "Acabado brillante con partículas de glitter",
    },
  ]

  let currentPage = 0
  const itemsPerPage = 6

  // Cargar primera página
  loadGalleryItems(currentPage)

  // Configurar botón de cargar más
  loadMoreButton.addEventListener("click", () => {
    currentPage++

    // Mostrar loader
    galleryLoader.classList.add("active")

    // Simular carga (en un entorno real, sería una llamada a API)
    setTimeout(() => {
      loadGalleryItems(currentPage)
      galleryLoader.classList.remove("active")

      // Ocultar botón si no hay más páginas
      if ((currentPage + 1) * itemsPerPage >= galleryData.length) {
        loadMoreButton.style.display = "none"
      }
    }, 1000)
  })

  function loadGalleryItems(page) {
    const startIndex = page * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, galleryData.length)

    // Obtener elementos para esta página
    const pageItems = galleryData.slice(startIndex, endIndex)

    // Crear y añadir elementos a la galería
    pageItems.forEach((item, index) => {
      const galleryItem = createGalleryItem(item, index)
      galleryContainer.appendChild(galleryItem)
    })

    // Inicializar animaciones para los nuevos elementos
    initGalleryAnimations()
  }

  function createGalleryItem(item, index) {
    const galleryItem = document.createElement("div")
    galleryItem.className = "gallery-item"
    galleryItem.setAttribute("data-category", item.category)
    galleryItem.style.opacity = "0"
    galleryItem.style.transform = "translateY(30px)"

    galleryItem.innerHTML = `
      <div class="gallery-image-container">
        <img src="${item.image}" alt="${item.title}" class="gallery-image">
        <div class="gallery-overlay">
          <h3 class="gallery-title">${item.title}</h3>
          <p class="gallery-description">${item.description}</p>
        </div>
      </div>
      <div class="gallery-category">${getCategoryName(item.category)}</div>
    `

    return galleryItem
  }

  function getCategoryName(category) {
    const categories = {
      gel: "Gel",
      acrilicas: "Acrílicas",
      "nail-art": "Nail Art",
      pedicura: "Pedicura",
      temporada: "Temporada",
    }

    return categories[category] || category
  }
}

// ===== CARGA DE VIDEOS =====
function initVideoLoader() {
  const videoContainer = document.querySelector(".video-gallery-grid")
  const loadMoreVideosButton = document.getElementById("load-more-videos-button")
  const videoLoader = document.querySelector(".video-loader")

  if (!videoContainer || !loadMoreVideosButton) return

  // Datos de ejemplo para videos adicionales (en un entorno real, vendrían de una API)
  const videoData = [
    {
      id: "video-4",
      title: "Decoración con Pedrería",
      description: "Aprende a aplicar y fijar pedrería en tus diseños de uñas.",
      image: "img/gallery/g005.webp",
    },
    {
      id: "video-5",
      title: "Técnica de Degradado",
      description: "Cómo crear efectos de degradado perfectos en tus uñas.",
      image: "img/gallery/g006.webp",
    },
    {
      id: "video-6",
      title: "Uñas de Temporada",
      description: "Diseños especiales para cada temporada del año.",
      image: "img/gallery/g007.webp",
    },
    {
      id: "video-7",
      title: "Manicura Francesa Moderna",
      description: "Versiones modernas y creativas de la clásica manicura francesa.",
      image: "img/gallery/g001.webp",
    },
    {
      id: "video-8",
      title: "Técnicas de Nail Art Avanzado",
      description: "Técnicas profesionales para crear diseños complejos y detallados.",
      image: "img/gallery/g002.webp",
    },
    {
      id: "video-9",
      title: "Cuidados para Uñas Naturales",
      description: "Consejos para mantener tus uñas naturales fuertes y saludables.",
      image: "img/gallery/g003.webp",
    },
  ]

  let currentVideoPage = 0
  const videosPerPage = 3

  // Configurar botón de cargar más videos
  loadMoreVideosButton.addEventListener("click", () => {
    currentVideoPage++

    // Mostrar loader
    videoLoader.classList.add("active")

    // Simular carga (en un entorno real, sería una llamada a API)
    setTimeout(() => {
      loadVideoItems(currentVideoPage)
      videoLoader.classList.remove("active")

      // Ocultar botón si no hay más páginas
      if ((currentVideoPage + 1) * videosPerPage >= videoData.length) {
        loadMoreVideosButton.style.display = "none"
      }
    }, 1000)
  })

  function loadVideoItems(page) {
    const startIndex = page * videosPerPage
    const endIndex = Math.min(startIndex + videosPerPage, videoData.length)

    // Obtener elementos para esta página
    const pageItems = videoData.slice(startIndex, endIndex)

    // Crear y añadir elementos a la galería de videos
    pageItems.forEach((item, index) => {
      const videoItem = createVideoItem(item, index)
      videoContainer.appendChild(videoItem)
    })

    // Inicializar los nuevos reproductores de video
    const newVideoItems = document.querySelectorAll(".video-item:not(.initialized)")
    setupVideoPlayers(newVideoItems, {})

    // Marcar como inicializados
    newVideoItems.forEach((item, index) => {
      item.classList.add("initialized")

      // Animar con retraso escalonado
      setTimeout(() => {
        item.classList.add("animated")
      }, index * 100)
    })
  }

  function createVideoItem(item, index) {
    const videoItem = document.createElement("div")
    videoItem.className = "video-item animate-on-scroll"
    videoItem.style.opacity = "0"
    videoItem.style.transform = "translateY(30px)"

    videoItem.innerHTML = `
      <div class="video-thumbnail">
        <img src="${item.image}" alt="${item.title}" class="video-image">
        <div class="video-play-button" data-video-id="${item.id}">
          <i class="fas fa-play"></i>
        </div>
      </div>
      <h3 class="video-title">${item.title}</h3>
      <p class="video-description">${item.description}</p>
    `

    return videoItem
  }
}

function initGalleryAnimations() {
  const galleryItems = document.querySelectorAll(".gallery-item:not(.animated)")

  galleryItems.forEach((item, index) => {
    // Añadir clase para evitar re-animación
    item.classList.add("animated")

    // Animar con retraso escalonado
    setTimeout(() => {
      item.style.opacity = "1"
      item.style.transform = "translateY(0)"
    }, index * 100)

    // Añadir efecto de brillo al hover
    item.addEventListener("mouseenter", function () {
      addSparkleEffect(this)
    })
  })
}

function addSparkleEffect(element) {
  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement("div")
    sparkle.classList.add("gallery-sparkle")

    // Posición aleatoria
    const posX = Math.random() * 100
    const posY = Math.random() * 100

    sparkle.style.left = `${posX}%`
    sparkle.style.top = `${posY}%`

    // Tamaño aleatorio
    const size = Math.random() * 10 + 5
    sparkle.style.width = `${size}px`
    sparkle.style.height = `${size}px`

    // Duración de animación aleatoria
    sparkle.style.animationDuration = `${Math.random() * 1 + 0.5}s`

    element.appendChild(sparkle)

    // Eliminar después de la animación
    setTimeout(() => {
      if (sparkle.parentNode === element) {
        sparkle.remove()
      }
    }, 1500)
  }
}

// ===== SLIDER DE TENDENCIAS =====
function initTrendsSlider() {
  const trendsSlider = document.querySelector(".trends-slider")
  const trendsTrack = document.querySelector(".trends-track")
  const trendCards = document.querySelectorAll(".trend-card")
  const prevButton = document.querySelector(".trend-nav.prev")
  const nextButton = document.querySelector(".trend-nav.next")

  if (!trendsTrack || !trendCards.length || !prevButton || !nextButton) return

  let currentPosition = 0
  const cardWidth = trendCards[0].offsetWidth
  const gap = 32 // 2rem gap
  const visibleCards = getVisibleCards()
  const maxPosition = Math.max(0, trendCards.length - visibleCards)

  // Configurar botones de navegación
  updateNavButtons()

  prevButton.addEventListener("click", () => {
    if (currentPosition > 0) {
      currentPosition--
      updateSliderPosition()
    }
  })

  nextButton.addEventListener("click", () => {
    if (currentPosition < maxPosition) {
      currentPosition++
      updateSliderPosition()
    }
  })

  // Actualizar en cambio de tamaño de ventana
  window.addEventListener("resize", () => {
    // Recalcular visibles y posición máxima
    const newVisibleCards = getVisibleCards()
    const newMaxPosition = Math.max(0, trendCards.length - newVisibleCards)

    // Ajustar posición actual si es necesario
    if (currentPosition > newMaxPosition) {
      currentPosition = newMaxPosition
    }

    updateSliderPosition()
  })

  function updateSliderPosition() {
    const translateX = currentPosition * -(cardWidth + gap)
    trendsTrack.style.transform = `translateX(${translateX}px)`
    updateNavButtons()
  }

  function updateNavButtons() {
    prevButton.disabled = currentPosition === 0
    nextButton.disabled = currentPosition >= maxPosition

    prevButton.style.opacity = prevButton.disabled ? "0.5" : "1"
    nextButton.style.opacity = nextButton.disabled ? "0.5" : "1"
  }

  function getVisibleCards() {
    const containerWidth = trendsSlider.offsetWidth
    return Math.floor(containerWidth / (cardWidth + gap))
  }
}

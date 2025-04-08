/**
 * AngelNails - Enhanced Gallery JavaScript
 * Version: 1.0
 */

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar la galería con carga al hacer scroll
    initInfiniteGallery()
  
    // Inicializar el filtro de la galería
    initGalleryFilter()
  
    // Inicializar la galería de videos
    initVideoGallery()
  
    // Inicializar el slider de tendencias
    initTrendsSlider()
  })
  
  // Datos de la galería (simulando una API o base de datos)
  const galleryData = [
    {
      id: 1,
      category: "gel",
      image: "img/imagenes/IMG-20250403-WA0114.jpg",
      title: "Gel Rosa Pastel",
      description: "Manicura en gel con acabado brillante y detalles en dorado.",
    },
    {
      id: 2,
      category: "acrilicas",
      image: "img/imagenes/IMG-20250403-WA0100.jpg",
      title: "Acrílicas Stiletto",
      description: "Extensiones acrílicas en forma stiletto con efecto mármol.",
    },
    {
      id: 3,
      category: "nail-art",
      image: "img/imagenes/IMG-20250403-WA0112.jpg",
      title: "Arte Floral",
      description: "Diseño detallado de flores pintadas a mano con técnica acuarela.",
    },
    {
      id: 4,
      category: "gel",
      image: "img/imagenes/IMG-20250403-WA0111.jpg",
      title: "Gel Francés",
      description: "Manicura francesa moderna con toques de brillo.",
    },
    {
      id: 5,
      category: "nail-art",
      image: "img/imagenes/IMG-20250403-WA0110.jpg",
      title: "Diseño Geométrico",
      description: "Patrones modernos con líneas precisas y colores vibrantes.",
    },
    {
      id: 6,
      category: "acrilicas",
      image: "img/imagenes/IMG-20250403-WA0109.jpg",
      title: "Acrílicas Ombré",
      description: "Degradado suave de colores con acabado brillante.",
    },
    {
      id: 7,
      category: "pedicura",
      image: "img/imagenes/IMG-20250403-WA0108.jpg",
      title: "Pedicura Spa",
      description: "Pedicura completa con esmalte rojo y decoración de cristales.",
    },
    {
      id: 8,
      category: "temporada",
      image: "img/imagenes/IMG-20250403-WA0107.jpg",
      title: "Diseño Navideño",
      description: "Motivos festivos con colores tradicionales y detalles dorados.",
    },
    {
      id: 9,
      category: "nail-art",
      image: "img/imagenes/IMG-20250403-WA0106.jpg",
      title: "Nail Art 3D",
      description: "Diseños tridimensionales con relieves y texturas.",
    },
    {
      id: 10,
      category: "gel",
      image: "img/imagenes/IMG-20250403-WA0104.jpg",
      title: "Gel Metálico",
      description: "Acabado espejo con efecto cromado de larga duración.",
    },
    {
      id: 11,
      category: "acrilicas",
      image: "img/imagenes/IMG-20250403-WA0105.jpg",
      title: "Acrílicas Transparentes",
      description: "Diseño minimalista con efecto cristal y detalles encapsulados.",
    },
    {
      id: 12,
      category: "pedicura",
      image: "img/imagenes/IMG-20250403-WA0101.jpg",
      title: "Pedicura Francesa",
      description: "Estilo clásico y elegante para pies con acabado brillante.",
    },
    // Segunda página de imágenes
    {
      id: 13,
      category: "temporada",
      image: "img/imagenes/IMG-20250403-WA0102.jpg",
      title: "Diseño Primaveral",
      description: "Colores vibrantes y motivos florales para la temporada de primavera.",
    },
    {
      id: 14,
      category: "nail-art",
      image: "img/imagenes/IMG-20250403-WA0103.jpg",
      title: "Nail Art Abstracto",
      description: "Diseño artístico con formas libres y combinación de colores.",
    },
    {
      id: 15,
      category: "gel",
      image: "img/imagenes/IMG-20250403-WA0099.jpg",
      title: "Gel Mate",
      description: "Acabado sin brillo con detalles geométricos en contraste.",
    },
    {
      id: 16,
      category: "acrilicas",
      image: "img/imagenes/IMG-20250403-WA0098.jpg",
      title: "Acrílicas XL",
      description: "Extensiones extra largas con diseños elaborados y pedrería.",
    },
    {
      id: 17,
      category: "nail-art",
      image: "img/imagenes/IMG-20250403-WA0097.jpg",
      title: "Nail Art Tropical",
      description: "Diseños inspirados en motivos tropicales y colores vibrantes.",
    },
    {
      id: 18,
      category: "gel",
      image: "img/imagenes/IMG-20250403-WA0096.jpg",
      title: "Gel Degradado",
      description: "Transición suave entre colores para un efecto moderno y elegante.",
    },
    {
      id: 19,
      category: "pedicura",
      image: "img/imagenes/IMG-20250403-WA0095.jpg",
      title: "Pedicura Glitter",
      description: "Acabado brillante con purpurina para ocasiones especiales.",
    },
    {
      id: 20,
      category: "temporada",
      image: "img/imagenes/IMG-20250403-WA0094.jpg",
      title: "Diseño Otoñal",
      description: "Tonos cálidos y motivos inspirados en la temporada de otoño.",
    },
    {
      id: 21,
      category: "acrilicas",
      image: "img/imagenes/IMG-20250403-WA0093.jpg",
      title: "Acrílicas Naturales",
      description: "Extensiones con aspecto natural y acabado brillante.",
    },
    {
      id: 22,
      category: "nail-art",
      image: "img/imagenes/IMG-20250403-WA0092.jpg",
      title: "Nail Art Minimalista",
      description: "Diseños simples pero elegantes con líneas finas y detalles sutiles.",
    },
    {
      id: 23,
      category: "gel",
      image: "img/imagenes/IMG-20250403-WA0091.jpg",
      title: "Gel Holográfico",
      description: "Efecto arcoíris que cambia con la luz para un look único.",
    },
    {
      id: 24,
      category: "pedicura",
      image: "img/imagenes/IMG-20250403-WA0090.jpg",
      title: "Pedicura Decorada",
      description: "Diseño elaborado con pedrería y detalles metálicos.",
    },
  ]
  
  // Variables para la carga infinita
  let currentPage = 1
  const itemsPerPage = 12
  let currentFilter = "all"
  let isLoading = false
  let allItemsLoaded = false
  
  // Función para inicializar la galería con carga infinita
  function initInfiniteGallery() {
    const galleryContainer = document.getElementById("gallery-container")
    const loader = document.querySelector(".gallery-loader")
  
    if (!galleryContainer || !loader) return
  
    // Cargar la primera página de imágenes
    loadGalleryItems(currentPage, currentFilter)
  
    // Detectar cuando el usuario llega al final de la página
    window.addEventListener("scroll", () => {
      if (isLoading || allItemsLoaded) return
  
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        loadMoreItems()
      }
    })
  
    // Función para cargar más elementos
    function loadMoreItems() {
      currentPage++
      isLoading = true
      loader.classList.add("active")
  
      // Simular carga de red
      setTimeout(() => {
        loadGalleryItems(currentPage, currentFilter)
        isLoading = false
        loader.classList.remove("active")
      }, 1500)
    }
  }
  
  // Función para cargar elementos de la galería
  function loadGalleryItems(page, filter) {
    const galleryContainer = document.getElementById("gallery-container")
    if (!galleryContainer) return
  
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
  
    let filteredData = galleryData
    if (filter !== "all") {
      filteredData = galleryData.filter((item) => item.category === filter)
    }
  
    // Verificar si ya se han cargado todos los elementos
    if (startIndex >= filteredData.length) {
      allItemsLoaded = true
      return
    }
  
    const itemsToLoad = filteredData.slice(startIndex, endIndex)
  
    // Crear y añadir elementos a la galería
    itemsToLoad.forEach((item, index) => {
      const galleryItem = document.createElement("div")
      galleryItem.className = "gallery-item"
      galleryItem.setAttribute("data-category", item.category)
  
      galleryItem.innerHTML = `
        <div class="gallery-category">${getCategoryName(item.category)}</div>
        <div class="gallery-image-container">
          <img src="${item.image}" alt="${item.title}" class="gallery-image" loading="lazy">
          <div class="gallery-overlay">
            <h3 class="gallery-title">${item.title}</h3>
            <p class="gallery-description">${item.description}</p>
          </div>
        </div>
      `
  
      galleryContainer.appendChild(galleryItem)
  
      // Añadir animación con retraso
      setTimeout(() => {
        galleryItem.classList.add("loaded")
        const image = galleryItem.querySelector(".gallery-image")
        if (image) {
          image.onload = function () {
            this.classList.add("loaded")
          }
          // Si la imagen ya está cargada
          if (image.complete) {
            image.classList.add("loaded")
          }
        }
      }, index * 100)
  
      // Añadir efecto de brillo al pasar el ratón
      galleryItem.addEventListener("mouseenter", function () {
        addSparkleEffect(this)
      })
    })
  }
  
  // Función para obtener el nombre de la categoría
  function getCategoryName(category) {
    const categories = {
      gel: "Gel",
      acrilicas: "Acrílicas",
      "nail-art": "Nail Art",
      pedicura: "Pedicura",
      temporada: "Temporada",
    }
  
    return categories[category] || "Otro"
  }
  
  // Función para añadir efecto de brillo
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
  
      // Duración de la animación aleatoria
      sparkle.style.animationDuration = `${Math.random() * 1 + 0.5}s`
  
      element.appendChild(sparkle)
  
      // Eliminar después de la animación
      setTimeout(() => {
        sparkle.remove()
      }, 1500)
    }
  }
  
  // Función para inicializar el filtro de la galería
  function initGalleryFilter() {
    const filterButtons = document.querySelectorAll(".filter-button")
  
    if (!filterButtons.length) return
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Quitar clase activa de todos los botones
        filterButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Añadir clase activa al botón clickeado
        this.classList.add("active")
  
        // Obtener el valor del filtro
        const filterValue = this.getAttribute("data-filter")
  
        // Actualizar filtro actual y resetear paginación
        currentFilter = filterValue
        currentPage = 1
        allItemsLoaded = false
  
        // Limpiar la galería
        const galleryContainer = document.getElementById("gallery-container")
        if (galleryContainer) {
          galleryContainer.innerHTML = ""
        }
  
        // Cargar elementos filtrados
        loadGalleryItems(currentPage, currentFilter)
      })
    })
  }
  
  // Función para inicializar la galería de videos
  function initVideoGallery() {
    const videoButtons = document.querySelectorAll(".video-play-button")
    const videoModal = document.getElementById("video-modal")
    const videoContainer = document.getElementById("video-container")
    const closeButton = document.querySelector(".video-modal-close")
  
    if (!videoButtons.length || !videoModal || !videoContainer) return
  
    // Animar los elementos de video al hacer scroll
    const videoItems = document.querySelectorAll(".video-item")
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )
  
    videoItems.forEach((item) => {
      observer.observe(item)
    })
  
    // Abrir modal de video
    videoButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const videoId = this.getAttribute("data-video-id")
  
        // Aquí normalmente cargarías el video real
        videoContainer.innerHTML = `
          <div class="video-placeholder">
            <div class="video-placeholder-icon">
              <i class="fas fa-play"></i>
            </div>
            <p>Video: ${videoId}</p>
            <p class="video-placeholder-text">Video player would load here</p>
          </div>
        `
  
        // Mostrar modal
        videoModal.style.display = "flex"
        document.body.style.overflow = "hidden"
  
        // Animar apertura del modal
        setTimeout(() => {
          videoModal.style.opacity = "1"
        }, 10)
      })
    })
  
    // Cerrar modal de video
    if (closeButton) {
      closeButton.addEventListener("click", closeVideoModal)
    }
  
    // Cerrar modal al hacer clic fuera del contenido
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        closeVideoModal()
      }
    })
  
    // Cerrar modal con tecla ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && videoModal.style.display === "flex") {
        closeVideoModal()
      }
    })
  
    function closeVideoModal() {
      videoModal.style.opacity = "0"
      setTimeout(() => {
        videoModal.style.display = "none"
        videoContainer.innerHTML = ""
        document.body.style.overflow = ""
      }, 300)
    }
  }
  
  // Función para inicializar el slider de tendencias
  function initTrendsSlider() {
    const trendsTrack = document.querySelector(".trends-track")
    const prevButton = document.querySelector(".trend-nav.prev")
    const nextButton = document.querySelector(".trend-nav.next")
  
    if (!trendsTrack || !prevButton || !nextButton) return
  
    const cards = document.querySelectorAll(".trend-card")
    const cardWidth = cards[0].offsetWidth + 32 // Ancho + gap
    let position = 0
  
    // Botón siguiente
    nextButton.addEventListener("click", () => {
      if (position > -(cards.length - getVisibleCards()) * cardWidth) {
        position -= cardWidth
        trendsTrack.style.transform = `translateX(${position}px)`
      }
    })
  
    // Botón anterior
    prevButton.addEventListener("click", () => {
      if (position < 0) {
        position += cardWidth
        trendsTrack.style.transform = `translateX(${position}px)`
      }
    })
  
    // Responsive
    window.addEventListener("resize", () => {
      // Resetear posición al cambiar el tamaño de la ventana
      position = 0
      trendsTrack.style.transform = `translateX(0)`
    })
  
    // Función para obtener el número de tarjetas visibles según el ancho de la ventana
    function getVisibleCards() {
      if (window.innerWidth >= 992) {
        return 3
      } else if (window.innerWidth >= 768) {
        return 2
      } else {
        return 1
      }
    }
  }
  
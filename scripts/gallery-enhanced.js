/**
 * AngelNails - Gallery Enhanced JavaScript
 * Version: 1.1
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar la galería con carga progresiva
  initGallery();
  
  // Inicializar el slider de tendencias
  initTrendsSlider();
  
  // Inicializar la galería de videos
  initVideoGallery();
});

// Configuración de la galería
const galleryConfig = {
  // Datos de las imágenes de la galería (ampliado a 24 imágenes)
  images: [
    {
      src: "img/gallery/g001.webp",
      alt: "Manicura en gel con diseño floral",
      title: "Manicura Floral",
      description: "Diseño elegante con detalles florales en tonos pastel",
      category: "gel"
    },
    {
      src: "img/gallery/g002.webp",
      alt: "Uñas acrílicas con efecto mármol",
      title: "Efecto Mármol",
      description: "Uñas acrílicas con elegante efecto mármol en tonos nude",
      category: "acrilicas"
    },
    {
      src: "img/gallery/g003.webp",
      alt: "Nail art con pedrería",
      title: "Glamour Total",
      description: "Diseño exclusivo con pedrería y acabado brillante",
      category: "nail-art"
    },
    {
      src: "img/gallery/g004.webp",
      alt: "Pedicura spa con diseño",
      title: "Pedicura Deluxe",
      description: "Pedicura spa completa con diseño personalizado",
      category: "pedicura"
    },
    {
      src: "img/gallery/g005.webp",
      alt: "Diseño navideño para uñas",
      title: "Espíritu Navideño",
      description: "Diseño festivo con motivos navideños",
      category: "temporada"
    },
    {
      src: "img/gallery/g006.webp",
      alt: "Uñas de gel con efecto cromado",
      title: "Efecto Espejo",
      description: "Acabado cromado de alta duración",
      category: "gel"
    },
    {
      src: "img/gallery/g007.webp",
      alt: "Uñas acrílicas con extensión",
      title: "Extensiones Perfectas",
      description: "Uñas acrílicas con extensión y forma personalizada",
      category: "acrilicas"
    },
    {
      src: "img/gallery/g008.webp",
      alt: "Nail art minimalista",
      title: "Minimalismo Elegante",
      description: "Diseño minimalista con líneas finas y detalles sutiles",
      category: "nail-art"
    },
    {
      src: "img/gallery/g009.webp",
      alt: "Pedicura francesa",
      title: "Francesa Clásica",
      description: "Pedicura con el clásico estilo francés",
      category: "pedicura"
    },
    // Imágenes adicionales (usando las mismas imágenes con diferentes descripciones para demostración)
    {
      src: "img/gallery/g001.webp",
      alt: "Diseño primaveral",
      title: "Primavera Floral",
      description: "Diseño inspirado en la primavera con tonos vibrantes",
      category: "temporada"
    },
    {
      src: "img/gallery/g002.webp",
      alt: "Uñas de gel con degradado",
      title: "Degradado Suave",
      description: "Técnica de degradado con colores pastel",
      category: "gel"
    },
    {
      src: "img/gallery/g003.webp",
      alt: "Uñas acrílicas con incrustaciones",
      title: "Lujo y Brillo",
      description: "Diseño de lujo con incrustaciones brillantes",
      category: "acrilicas"
    },
    {
      src: "img/gallery/g004.webp",
      alt: "Nail art geométrico",
      title: "Geometría Moderna",
      description: "Diseño con patrones geométricos en colores contrastantes",
      category: "nail-art"
    },
    {
      src: "img/gallery/g005.webp",
      alt: "Pedicura con decoración",
      title: "Pedicura Artística",
      description: "Pedicura con decoraciones artísticas y pedrería",
      category: "pedicura"
    },
    {
      src: "img/gallery/g006.webp",
      alt: "Diseño para San Valentín",
      title: "Amor y Pasión",
      description: "Diseño romántico para celebrar el día del amor",
      category: "temporada"
    },
    {
      src: "img/gallery/g007.webp",
      alt: "Uñas de gel con efecto mate",
      title: "Elegancia Mate",
      description: "Acabado mate sofisticado para un look elegante",
      category: "gel"
    },
    {
      src: "img/gallery/g008.webp",
      alt: "Uñas acrílicas con forma almendrada",
      title: "Forma Perfecta",
      description: "Uñas acrílicas con elegante forma almendrada",
      category: "acrilicas"
    },
    {
      src: "img/gallery/g009.webp",
      alt: "Nail art con motivos florales",
      title: "Jardín en tus Manos",
      description: "Arte floral detallado con técnicas avanzadas",
      category: "nail-art"
    },
    {
      src: "img/gallery/g001.webp",
      alt: "Pedicura con diseño tropical",
      title: "Tropical Vibes",
      description: "Pedicura con motivos tropicales para el verano",
      category: "pedicura"
    },
    {
      src: "img/gallery/g002.webp",
      alt: "Diseño para Halloween",
      title: "Noche de Terror",
      description: "Diseño temático para la noche más terrorífica del año",
      category: "temporada"
    },
    {
      src: "img/gallery/g003.webp",
      alt: "Uñas de gel con efecto sugar",
      title: "Sugar Effect",
      description: "Efecto azucarado con textura y brillo",
      category: "gel"
    },
    {
      src: "img/gallery/g004.webp",
      alt: "Uñas acrílicas con diseño animal print",
      title: "Wild Style",
      description: "Diseño animal print para un look salvaje y atrevido",
      category: "acrilicas"
    },
    {
      src: "img/gallery/g005.webp",
      alt: "Nail art con técnica acuarela",
      title: "Acuarela Artística",
      description: "Técnica de acuarela para un diseño único y personalizado",
      category: "nail-art"
    }
  ],
  itemsPerPage: 6,
  loadMoreIncrement: 6, // Aumentado para cargar más imágenes a la vez
  
  // Datos de los videos
  videos: [
    {
      id: "video-1",
      title: "Tutorial de Uñas Acrílicas",
      description: "Aprende el proceso paso a paso para crear uñas acrílicas perfectas.",
      thumbnail: "img/gallery/g002.webp",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Reemplazar con URL real
    },
    {
      id: "video-2",
      title: "Nail Art Floral",
      description: "Técnica de pintura a mano para crear diseños florales detallados.",
      thumbnail: "img/gallery/g003.webp",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Reemplazar con URL real
    },
    {
      id: "video-3",
      title: "Efecto Espejo en Gel",
      description: "Cómo lograr el perfecto acabado cromado en uñas de gel.",
      thumbnail: "img/gallery/g004.webp",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Reemplazar con URL real
    }
  ]
};

// Inicializar la galería
function initGallery() {
  const galleryContainer = document.getElementById("gallery-container");
  const filterButtons = document.querySelectorAll(".filter-button");
  const galleryLoader = document.querySelector(".gallery-loader");
  
  if (!galleryContainer) return;
  
  let currentFilter = "all";
  let loadedItems = 0;
  let observer;
  
  // Configurar el observador de intersección para carga lazy
  setupIntersectionObserver();
  
  // Cargar las primeras imágenes
  loadInitialImages();
  
  // Configurar filtros
  setupFilters();
  
  // Configurar detección de scroll para cargar más imágenes
  setupInfiniteScroll();
  
  // Función para configurar el observador de intersección
  function setupIntersectionObserver() {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector(".gallery-image");
          const src = img.getAttribute("data-src");
          
          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
            
            img.onload = () => {
              img.classList.add("loaded");
              entry.target.classList.add("loaded");
            };
            
            img.onerror = () => {
              // Manejar error de carga
              img.src = "/placeholder.svg?height=400&width=400";
              img.classList.add("loaded");
              entry.target.classList.add("loaded");
            };
            
            observer.unobserve(entry.target);
          }
        }
      });
    }, {
      rootMargin: "200px 0px"
    });
  }
  
  // Cargar las imágenes iniciales
  function loadInitialImages() {
    loadedItems = 0;
    galleryContainer.innerHTML = "";
    loadMoreImages();
  }
  
  // Función para cargar más imágenes
  function loadMoreImages() {
    const filteredImages = galleryConfig.images.filter(img => 
      currentFilter === "all" || img.category === currentFilter
    );
    
    const itemsToLoad = Math.min(
      galleryConfig.loadMoreIncrement, 
      filteredImages.length - loadedItems
    );
    
    if (itemsToLoad <= 0) {
      galleryLoader.classList.remove("active");
      return;
    }
    
    galleryLoader.classList.add("active");
    
    // Simular tiempo de carga para demostración
    setTimeout(() => {
      for (let i = 0; i < itemsToLoad; i++) {
        const imageData = filteredImages[loadedItems + i];
        if (!imageData) continue;
        
        const galleryItem = createGalleryItem(imageData);
        galleryContainer.appendChild(galleryItem);
        
        // Observar el elemento para carga lazy
        observer.observe(galleryItem);
      }
      
      loadedItems += itemsToLoad;
      galleryLoader.classList.remove("active");
      
      // Comprobar si hay más imágenes para cargar
      if (loadedItems >= filteredImages.length) {
        galleryLoader.style.display = "none";
      } else {
        galleryLoader.style.display = "block";
      }
    }, 800);
  }
  
  // Crear un elemento de galería
  function createGalleryItem(imageData) {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    galleryItem.setAttribute("data-category", imageData.category);
    
    galleryItem.innerHTML = `
      <div class="gallery-image-container">
        <img 
          class="gallery-image" 
          data-src="${imageData.src}" 
          alt="${imageData.alt}" 
          width="400" 
          height="400"
        >
        <div class="gallery-category">${getCategoryName(imageData.category)}</div>
        <div class="gallery-overlay">
          <h3 class="gallery-title">${imageData.title}</h3>
          <p class="gallery-description">${imageData.description}</p>
        </div>
      </div>
    `;
    
    // Añadir efecto de brillo al pasar el ratón
    galleryItem.addEventListener("mouseenter", () => {
      addSparkleEffect(galleryItem.querySelector(".gallery-image-container"));
    });
    
    return galleryItem;
  }
  
  // Configurar los botones de filtro
  function setupFilters() {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        
        // No hacer nada si ya está en el filtro actual
        if (filter === currentFilter) return;
        
        // Actualizar clases activas
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        // Actualizar filtro actual
        currentFilter = filter;
        
        // Reiniciar la galería con el nuevo filtro
        loadInitialImages();
      });
    });
  }
  
  // Configurar scroll infinito
  function setupInfiniteScroll() {
    const scrollObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreImages();
      }
    }, {
      rootMargin: "200px 0px"
    });
    
    scrollObserver.observe(galleryLoader);
  }
  
  // Obtener el nombre legible de la categoría
  function getCategoryName(category) {
    const categories = {
      "gel": "Gel",
      "acrilicas": "Acrílicas",
      "nail-art": "Nail Art",
      "pedicura": "Pedicura",
      "temporada": "Temporada"
    };
    
    return categories[category] || category;
  }
  
  // Añadir efecto de brillo
  function addSparkleEffect(element) {
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement("div");
      sparkle.classList.add("gallery-sparkle");
      
      // Posición aleatoria
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      sparkle.style.left = `${posX}%`;
      sparkle.style.top = `${posY}%`;
      
      // Tamaño aleatorio
      const size = Math.random() * 10 + 5;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      
      // Duración de animación aleatoria
      sparkle.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
      
      element.appendChild(sparkle);
      
      // Eliminar después de la animación
      setTimeout(() => {
        sparkle.remove();
      }, 1500);
    }
  }
}

// Inicializar el slider de tendencias
function initTrendsSlider() {
  const trendsTrack = document.querySelector(".trends-track");
  const prevButton = document.querySelector(".trend-nav.prev");
  const nextButton = document.querySelector(".trend-nav.next");
  
  if (!trendsTrack || !prevButton || !nextButton) return;
  
  let position = 0;
  const trendCards = document.querySelectorAll(".trend-card");
  const cardWidth = trendCards[0]?.offsetWidth || 300;
  const gap = 16; // Gap entre tarjetas
  const visibleCards = window.innerWidth >= 768 ? 3 : 1;
  const maxPosition = Math.max(0, trendCards.length - visibleCards);
  
  // Actualizar posición del slider
  function updatePosition() {
    trendsTrack.style.transform = `translateX(${-position * (cardWidth + gap)}px)`;
  }
  
  // Ir a la siguiente tarjeta
  nextButton.addEventListener("click", () => {
    if (position < maxPosition) {
      position++;
      updatePosition();
    } else {
      // Efecto de rebote si está al final
      trendsTrack.style.transform = `translateX(${-position * (cardWidth + gap) - 20}px)`;
      setTimeout(() => {
        trendsTrack.style.transform = `translateX(${-position * (cardWidth + gap)}px)`;
      }, 200);
    }
  });
  
  // Ir a la tarjeta anterior
  prevButton.addEventListener("click", () => {
    if (position > 0) {
      position--;
      updatePosition();
    } else {
      // Efecto de rebote si está al inicio
      trendsTrack.style.transform = `translateX(20px)`;
      setTimeout(() => {
        trendsTrack.style.transform = `translateX(0)`;
      }, 200);
    }
  });
  
  // Actualizar en cambio de tamaño de ventana
  window.addEventListener("resize", () => {
    const newVisibleCards = window.innerWidth >= 768 ? 3 : 1;
    const newMaxPosition = Math.max(0, trendCards.length - newVisibleCards);
    
    // Ajustar posición si es necesario
    if (position > newMaxPosition) {
      position = newMaxPosition;
      updatePosition();
    }
  });
}

// Inicializar la galería de videos
function initVideoGallery() {
  const videoButtons = document.querySelectorAll(".video-play-button");
  const videoModal = document.getElementById("video-modal");
  const videoContainer = document.getElementById("video-container");
  const closeButton = document.querySelector(".video-modal-close");
  
  if (!videoButtons.length || !videoModal || !videoContainer || !closeButton) return;
  
  // Actualizar las miniaturas de video con las imágenes correctas
  updateVideoThumbnails();
  
  // Abrir modal de video
  videoButtons.forEach(button => {
    button.addEventListener("click", () => {
      const videoId = button.getAttribute("data-video-id");
      const videoData = galleryConfig.videos.find(v => v.id === videoId);
      
      if (!videoData) return;
      
      // Cargar el video real usando iframe
      videoContainer.innerHTML = `
        <iframe 
          width="100%" 
          height="100%" 
          src="${videoData.videoUrl}?autoplay=1" 
          title="${videoData.title}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        ></iframe>
      `;
      
      // Mostrar modal
      videoModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      
      // Animar apertura del modal
      setTimeout(() => {
        videoModal.style.opacity = "1";
      }, 10);
    });
  });
  
  // Cerrar modal de video
  closeButton.addEventListener("click", closeVideoModal);
  
  // Cerrar modal al hacer clic fuera del contenido
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });
  
  // Cerrar modal con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal.style.display === "flex") {
      closeVideoModal();
    }
  });
  
  function closeVideoModal() {
    videoModal.style.opacity = "0";
    setTimeout(() => {
      videoModal.style.display = "none";
      videoContainer.innerHTML = ""; // Detener el video al cerrar
      document.body.style.overflow = "";
    }, 300);
  }
  
  // Actualizar las miniaturas de video con las imágenes correctas
  function updateVideoThumbnails() {
    const videoItems = document.querySelectorAll(".video-item");
    
    videoItems.forEach((item, index) => {
      const videoData = galleryConfig.videos[index];
      if (!videoData) return;
      
      const thumbnail = item.querySelector(".video-image");
      const title = item.querySelector(".video-title");
      const description = item.querySelector(".video-description");
      const playButton = item.querySelector(".video-play-button");
      
      if (thumbnail) thumbnail.src = videoData.thumbnail;
      if (title) title.textContent = videoData.title;
      if (description) description.textContent = videoData.description;
      if (playButton) playButton.setAttribute("data-video-id", videoData.id);
    });
  }
}
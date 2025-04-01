// Optimización de carga de imágenes
document.addEventListener("DOMContentLoaded", () => {
  // Implementar lazy loading para todas las imágenes
  initLazyLoading();
  
  // Optimizar imágenes del carrusel
  optimizeCarouselImages();
  
  // Precarga de imágenes críticas
  preloadCriticalImages();
});

// Implementar lazy loading para todas las imágenes
function initLazyLoading() {
  // Verificar si el navegador soporta IntersectionObserver
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            
            // Añadir clase para animación de fade-in
            img.classList.add('lazy-loaded');
            
            // Cuando la imagen se carga completamente
            img.onload = function() {
              img.classList.add('loaded');
            };
            
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '100px 0px', // Cargar imágenes 100px antes de que sean visibles
      threshold: 0.01
    });
    
    // Observar todas las imágenes con atributo data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    loadImagesImmediately();
  }
}

// Cargar imágenes inmediatamente (fallback)
function loadImagesImmediately() {
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.getAttribute('data-src');
    img.removeAttribute('data-src');
  });
}

// Optimizar imágenes del carrusel
function optimizeCarouselImages() {
  const carouselImages = document.querySelectorAll('.carousel-image');
  
  carouselImages.forEach(img => {
    // Asegurar que las imágenes del carrusel tengan prioridad alta
    img.loading = 'eager';
    
    // Añadir evento para manejar errores de carga
    img.addEventListener('error', function() {
      if (!this.hasAttribute('data-error-handled')) {
        this.setAttribute('data-error-handled', 'true');
        
        // Usar un placeholder si la imagen no se puede cargar
        this.src = `https://placehold.co/800x600/ff0099/ffffff?text=AngelNails`;
      }
    });
    
    // Optimizar renderizado
    img.style.willChange = 'transform';
    img.style.backfaceVisibility = 'hidden';
  });
}

// Precarga de imágenes críticas
function preloadCriticalImages() {
  // Lista de imágenes críticas que deben cargarse primero
  const criticalImages = [
    '/img/gallery/g001.webp',
    '/img/gallery/g002.webp',
    '/img/gallery/g003.webp',
    '/img/logo_black.webp',
    '/img/logo_white.webp'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Convertir imágenes normales a lazy loading
function convertToLazyLoading() {
  document.querySelectorAll('img:not([data-src]):not(.carousel-image):not(.logo-image)').forEach(img => {
    // No aplicar a imágenes ya cargadas o sin src
    if (!img.src || img.complete) return;
    
    // Guardar la URL original en data-src
    img.setAttribute('data-src', img.src);
    
    // Usar un placeholder de baja resolución mientras se carga
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
    
    // Añadir clase para estilos
    img.classList.add('lazy-image');
  });
}

// Añadir estilos para lazy loading
function addLazyLoadingStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .lazy-image {
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    
    .lazy-loaded {
      opacity: 1;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .loaded {
      animation: fadeIn 0.5s ease forwards;
    }
  `;
  document.head.appendChild(style);
}

// Inicializar todo cuando el DOM esté listo
window.addEventListener('load', () => {
  // Convertir imágenes normales a lazy loading
  convertToLazyLoading();
  
  // Añadir estilos para lazy loading
  addLazyLoadingStyles();
  
  // Iniciar lazy loading
  initLazyLoading();
});
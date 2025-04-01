// Funcionalidad para el video en el carrusel
document.addEventListener("DOMContentLoaded", function() {
  // Referencias a elementos
  const videoThumbnail = document.querySelector('.video-thumbnail');
  const videoContainer = document.querySelector('.video-container');
  const videoElement = document.getElementById('carousel-video');
  const videoCloseButton = document.querySelector('.video-close-button');
  const videoSlide = document.querySelector('.video-slide');
  const carouselButtons = document.querySelectorAll('.carousel-button');
  const carouselIndicators = document.querySelectorAll('.carousel-indicators button');
  
  // Si no hay elementos de video, salir
  if (!videoThumbnail || !videoContainer || !videoElement) return;
  
  // Función para reproducir el video
  function playVideo() {
    // Mostrar el contenedor del video
    videoContainer.style.display = 'flex';
    
    // Añadir clase para estilos específicos
    videoSlide.classList.add('video-active');
    
    // Reproducir el video después de un breve retraso
    setTimeout(() => {
      videoElement.play().catch(error => {
        console.error('Error al reproducir el video:', error);
        // Mostrar un mensaje de error si es necesario
      });
    }, 300);
    
    // Ocultar los botones de navegación del carrusel mientras se reproduce el video
    carouselButtons.forEach(button => {
      button.style.display = 'none';
    });
  }
  
  // Función para detener el video
  function stopVideo() {
    // Pausar el video
    videoElement.pause();
    videoElement.currentTime = 0;
    
    // Ocultar el contenedor del video
    videoContainer.style.display = 'none';
    
    // Quitar clase de video activo
    videoSlide.classList.remove('video-active');
    
    // Mostrar los botones de navegación del carrusel
    carouselButtons.forEach(button => {
      button.style.display = 'block';
    });
  }
  
  // Evento para reproducir el video al hacer clic en la miniatura
  videoThumbnail.addEventListener('click', function() {
    playVideo();
  });
  
  // Evento para cerrar el video
  videoCloseButton.addEventListener('click', function() {
    stopVideo();
  });
  
  // Detener el video cuando se cambia de slide
  carouselIndicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      if (slideIndex !== 0) { // Si no es el slide del video
        stopVideo();
      }
    });
  });
  
  // Detener el video cuando se hace clic en los botones de navegación
  carouselButtons.forEach(button => {
    button.addEventListener('click', function() {
      stopVideo();
    });
  });
  
  // Detener el video cuando se presiona la tecla Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && videoContainer.style.display !== 'none') {
      stopVideo();
    }
  });
  
  // Manejar el final del video
  videoElement.addEventListener('ended', function() {
    // Opción 1: Cerrar el video automáticamente
    stopVideo();
    
    // Opción 2: Mostrar un botón de reproducción para volver a ver
    // videoElement.currentTime = 0;
    // Mostrar un botón de reproducción
  });
  
  // Precargar el video cuando el usuario pase el mouse por encima (opcional)
  videoThumbnail.addEventListener('mouseenter', function() {
    videoElement.preload = 'metadata';
  });
  
  // Actualizar el carrusel para manejar correctamente el slide del video
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    // Observador de mutaciones para detectar cambios en el carrusel
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          // Si el carrusel está en pausa (por ejemplo, cuando el usuario está interactuando con él)
          if (carousel.classList.contains('paused')) {
            // No hacer nada, dejar que el usuario interactúe con el video
          } else {
            // Si el carrusel está avanzando automáticamente, verificar si el video está activo
            if (videoContainer.style.display !== 'none') {
              // Si el video está activo, pausar el carrusel
              if (typeof pauseCarousel === 'function') {
                pauseCarousel();
              }
            }
          }
        }
      });
    });
    
    // Configurar el observador
    observer.observe(carousel, { attributes: true });
  }
});

// Función para actualizar el carrusel existente
function updateCarouselForVideo() {
  // Obtener la función existente de inicialización del carrusel
  const originalInitCarousel = window.initCarousel || function() {};
  
  // Sobrescribir la función
  window.initCarousel = function() {
    // Llamar a la función original
    originalInitCarousel();
    
    // Añadir lógica adicional para el video
    const videoSlide = document.querySelector('.video-slide');
    const videoContainer = document.querySelector('.video-container');
    
    if (videoSlide && videoContainer) {
      // Pausar el carrusel automático cuando el video está activo
      const autoplayInterval = window.carouselInterval;
      
      if (autoplayInterval) {
        setInterval(() => {
          if (videoContainer.style.display !== 'none') {
            // Si el video está activo, reiniciar el temporizador del carrusel
            clearInterval(autoplayInterval);
            window.carouselPaused = true;
          }
        }, 1000);
      }
    }
  };
  
  // Si el carrusel ya está inicializado, actualizar
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    updateCarouselForVideo();
  }
}

// Ejecutar la actualización
updateCarouselForVideo();
// Funcionalidad para el video de fondo en el carrusel
document.addEventListener("DOMContentLoaded", function() {
  // Referencias a elementos
  const backgroundVideo = document.getElementById('background-video');
  const soundToggle = document.querySelector('.video-sound-toggle');
  const videoSlide = document.querySelector('.video-background-slide');
  
  // Si no hay elementos de video, salir
  if (!backgroundVideo || !soundToggle) return;
  
  // Variable para controlar el estado del sonido
  let isMuted = true;
  
  // Función para alternar el sonido
  function toggleSound() {
    if (isMuted) {
      // Activar sonido
      backgroundVideo.muted = false;
      soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
      soundToggle.setAttribute('aria-label', 'Desactivar sonido');
      isMuted = false;
    } else {
      // Silenciar
      backgroundVideo.muted = true;
      soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
      soundToggle.setAttribute('aria-label', 'Activar sonido');
      isMuted = true;
    }
  }
  
  // Evento para alternar el sonido al hacer clic en el botón
  soundToggle.addEventListener('click', function(e) {
    e.preventDefault();
    toggleSound();
  });
  
  // Detectar si el video puede reproducirse automáticamente
  function checkAutoplaySupport() {
    // Crear un video de prueba
    const testVideo = document.createElement('video');
    testVideo.muted = true;
    testVideo.playsInline = true;
    testVideo.autoplay = true;
    
    // Intentar reproducir el video
    const playPromise = testVideo.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay está soportado
          console.log('Autoplay soportado');
        })
        .catch(error => {
          // Autoplay no está soportado
          console.log('Autoplay no soportado:', error);
          document.body.classList.add('no-autoplay');
          
          // Mostrar un botón de reproducción manual
          const playButton = document.createElement('button');
          playButton.className = 'video-play-manual';
          playButton.innerHTML = '<i class="fas fa-play"></i> Ver Video';
          playButton.setAttribute('aria-label', 'Reproducir video');
          
          // Añadir el botón al slide
          if (videoSlide) {
            videoSlide.appendChild(playButton);
            
            // Evento para reproducir el video manualmente
            playButton.addEventListener('click', function() {
              backgroundVideo.play();
              playButton.style.display = 'none';
            });
          }
        });
    }
  }
  
  // Verificar soporte de autoplay
  checkAutoplaySupport();
  
  // Manejar la visibilidad del video cuando cambia el slide
  function handleVideoVisibility() {
    const carouselIndicators = document.querySelectorAll('.carousel-indicators button');
    const carouselButtons = document.querySelectorAll('.carousel-button');
    
    // Función para pausar el video cuando no está visible
    function pauseVideoIfNotVisible() {
      // Verificar si el slide del video está activo
      const isVideoSlideActive = videoSlide.classList.contains('active');
      
      if (isVideoSlideActive) {
        // Si el slide está activo, reproducir el video
        backgroundVideo.play().catch(error => {
          console.log('Error al reproducir el video:', error);
        });
      } else {
        // Si el slide no está activo, pausar el video para ahorrar recursos
        backgroundVideo.pause();
      }
    }
    
    // Verificar inicialmente
    setTimeout(pauseVideoIfNotVisible, 500);
    
    // Añadir eventos a los indicadores del carrusel
    if (carouselIndicators) {
      carouselIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
          // Esperar a que cambie el slide
          setTimeout(pauseVideoIfNotVisible, 500);
        });
      });
    }
    
    // Añadir eventos a los botones de navegación
    if (carouselButtons) {
      carouselButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Esperar a que cambie el slide
          setTimeout(pauseVideoIfNotVisible, 500);
        });
      });
    }
    
    // Observar cambios en las clases del slide para detectar cuando está activo
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          pauseVideoIfNotVisible();
        }
      });
    });
    
    // Configurar el observador
    observer.observe(videoSlide, { attributes: true });
  }
  
  // Iniciar manejo de visibilidad
  handleVideoVisibility();
  
  // Optimizaciones para dispositivos móviles
  function optimizeForMobile() {
    // Verificar si es un dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // En dispositivos móviles, usar una resolución más baja para el video
      const mobileSource = document.createElement('source');
      mobileSource.src = '/videos/angelnails-promo-mobile.mp4'; // Versión de menor resolución
      mobileSource.type = 'video/mp4';
      
      // Añadir la fuente al principio para que tenga prioridad
      backgroundVideo.insertBefore(mobileSource, backgroundVideo.firstChild);
      
      // Reducir la calidad de reproducción para ahorrar batería
      backgroundVideo.setAttribute('playbackQuality', 'small');
    }
  }
  
  // Aplicar optimizaciones para móviles
  optimizeForMobile();
  
  // Precargar el video cuando el carrusel se carga
  backgroundVideo.load();
  
  // Reiniciar el video cuando termina
  backgroundVideo.addEventListener('ended', function() {
    // Reiniciar desde el principio
    backgroundVideo.currentTime = 0;
    backgroundVideo.play().catch(error => {
      console.log('Error al reiniciar el video:', error);
    });
  });
  
  // Manejar errores de reproducción
  backgroundVideo.addEventListener('error', function(e) {
    console.error('Error en la reproducción del video:', e);
    
    // Mostrar imagen de fallback
    document.body.classList.add('no-autoplay');
  });
});

// Función para actualizar el carrusel existente
function updateCarouselForBackgroundVideo() {
  // Obtener la función existente de inicialización del carrusel
  const originalInitCarousel = window.initCarousel || function() {};
  
  // Sobrescribir la función
  window.initCarousel = function() {
    // Llamar a la función original
    originalInitCarousel();
    
    // Añadir lógica adicional para el video de fondo
    const videoSlide = document.querySelector('.video-background-slide');
    const backgroundVideo = document.getElementById('background-video');
    
    if (videoSlide && backgroundVideo) {
      // Asegurarse de que el video se reproduzca cuando el slide está activo
      if (videoSlide.classList.contains('active')) {
        backgroundVideo.play().catch(error => {
          console.log('Error al reproducir el video:', error);
        });
      }
    }
  };
  
  // Si el carrusel ya está inicializado, actualizar
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    updateCarouselForBackgroundVideo();
  }
}

// Ejecutar la actualización
updateCarouselForBackgroundVideo();
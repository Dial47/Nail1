/**
 * AngelNails - Animations JavaScript File
 * Contiene las animaciones generales del sitio
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar el cursor personalizado
  initCustomCursor();
  
  // Inicializar el slider de tendencias
  initTrendsSlider();
  
  // Inicializar efectos hover en las tarjetas de servicios
  initServiceCardEffects();
  
  // Inicializar efectos de hover en los botones
  initButtonEffects();
  
  // Inicializar animaciones de entrada
  initEntryAnimations();
});

/**
* Inicializa el cursor personalizado
*/
function initCustomCursor() {
  const cursorOuter = document.querySelector('.custom-cursor-outer');
  const cursorInner = document.querySelector('.custom-cursor-inner');
  
  if (!cursorOuter || !cursorInner) return;
  
  // Verificar si es dispositivo táctil
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      cursorOuter.style.display = 'none';
      cursorInner.style.display = 'none';
      document.body.style.cursor = 'auto';
      
      // Restaurar cursor en elementos interactivos
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
      interactiveElements.forEach(el => {
          el.style.cursor = 'auto';
      });
      
      return;
  }
  
  // Mover el cursor personalizado con el mouse
  document.addEventListener('mousemove', function(e) {
      cursorOuter.style.left = e.clientX + 'px';
      cursorOuter.style.top = e.clientY + 'px';
      
      // Añadir un pequeño retraso al cursor interno para un efecto más suave
      setTimeout(() => {
          cursorInner.style.left = e.clientX + 'px';
          cursorInner.style.top = e.clientY + 'px';
      }, 50);
  });
  
  // Efecto hover en elementos interactivos
  const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .service-card, .gallery-item, .trend-card');
  
  interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', function() {
          cursorOuter.classList.add('hover');
          cursorInner.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', function() {
          cursorOuter.classList.remove('hover');
          cursorInner.classList.remove('hover');
      });
  });
  
  // Efecto de click
  document.addEventListener('mousedown', function() {
      cursorOuter.classList.add('click');
      cursorInner.classList.add('click');
  });
  
  document.addEventListener('mouseup', function() {
      cursorOuter.classList.remove('click');
      cursorInner.classList.remove('click');
  });
}

/**
* Inicializa el slider de tendencias
*/
function initTrendsSlider() {
  const trendsSlider = document.querySelector('.trends-slider');
  if (!trendsSlider) return;
  
  const trendsTrack = trendsSlider.querySelector('.trends-track');
  const prevButton = trendsSlider.querySelector('.trend-nav.prev');
  const nextButton = trendsSlider.querySelector('.trend-nav.next');
  
  if (!trendsTrack || !prevButton || !nextButton) return;
  
  const cardWidth = 280; // Ancho de cada tarjeta + margen
  const gap = 32; // Espacio entre tarjetas
  const scrollAmount = cardWidth + gap;
  
  // Función para desplazar a la izquierda
  function scrollLeft() {
      trendsTrack.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
      });
  }
  
  // Función para desplazar a la derecha
  function scrollRight() {
      trendsTrack.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
      });
  }
  
  // Event listeners para los botones
  prevButton.addEventListener('click', scrollLeft);
  nextButton.addEventListener('click', scrollRight);
  
  // Desplazamiento automático
  let autoScrollInterval;
  
  function startAutoScroll() {
      autoScrollInterval = setInterval(scrollRight, 5000);
  }
  
  function stopAutoScroll() {
      clearInterval(autoScrollInterval);
  }
  
  // Iniciar desplazamiento automático
  startAutoScroll();
  
  // Detener al hacer hover
  trendsSlider.addEventListener('mouseenter', stopAutoScroll);
  trendsSlider.addEventListener('mouseleave', startAutoScroll);
  
  // Detener al tocar en dispositivos móviles
  trendsSlider.addEventListener('touchstart', stopAutoScroll);
  trendsSlider.addEventListener('touchend', startAutoScroll);
}

/**
* Inicializa efectos en las tarjetas de servicios
*/
function initServiceCardEffects() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  if (!serviceCards.length) return;
  
  serviceCards.forEach(card => {
      // Efecto de elevación al hacer hover
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px)';
          
          // Animar el icono
          const icon = this.querySelector('.service-icon');
          if (icon) {
              icon.style.transform = 'scale(1.1) rotate(10deg)';
              icon.style.backgroundColor = 'var(--color-primary)';
              icon.style.color = 'var(--color-white)';
          }
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
          
          // Restaurar el icono
          const icon = this.querySelector('.service-icon');
          if (icon) {
              icon.style.transform = 'scale(1) rotate(0deg)';
              icon.style.backgroundColor = '#fce7f3';
              icon.style.color = 'var(--color-primary)';
          }
      });
  });
}

/**
* Inicializa efectos en los botones
*/
function initButtonEffects() {
  const buttons = document.querySelectorAll('.cta-button, .service-button, .filter-button');
  
  if (!buttons.length) return;
  
  buttons.forEach(button => {
      // Efecto de brillo al hacer hover
      button.addEventListener('mouseenter', function() {
          if (this.classList.contains('cta-button')) {
              this.style.transform = 'translateY(-3px)';
              this.style.boxShadow = '0 4px 12px rgba(236, 72, 153, 0.3)';
          }
      });
      
      button.addEventListener('mouseleave', function() {
          if (this.classList.contains('cta-button')) {
              this.style.transform = 'translateY(0)';
              this.style.boxShadow = 'none';
          }
      });
  });
}

/**
* Inicializa animaciones de entrada
*/
function initEntryAnimations() {
  // Animar el título del hero
  const heroTitle = document.querySelector('.hero-title');
  const heroDescription = document.querySelector('.hero-description');
  const heroButtons = document.querySelector('.hero-buttons');
  
  if (heroTitle && heroDescription && heroButtons) {
      setTimeout(() => {
          heroTitle.style.opacity = '1';
          heroTitle.style.transform = 'translateY(0)';
      }, 500);
      
      setTimeout(() => {
          heroDescription.style.opacity = '1';
          heroDescription.style.transform = 'translateY(0)';
      }, 800);
      
      setTimeout(() => {
          heroButtons.style.opacity = '1';
          heroButtons.style.transform = 'translateY(0)';
      }, 1100);
  }
}


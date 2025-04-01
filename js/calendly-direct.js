/**
 * Solución directa para la integración de Calendly
 * Este enfoque evita los problemas de timing con el objeto global Calendly
 */
(function() {
  // Configuración
  const DEFAULT_URL = 'https://calendly.com/angelnails326/30min';
  const CONTAINER_ID = 'calendly-container';
  
  // Función principal de inicialización
  function init() {
    console.log('Inicializando solución directa para Calendly');
    
    // Añadir estilos
    addStyles();
    
    // Configurar botones
    setupButtons();
    
    // Mostrar mensaje de carga inicial
    showLoading();
    
    // Cargar el primer calendario después de un breve retraso
    setTimeout(() => {
      const firstButton = document.querySelector('.calendly-service-button');
      if (firstButton) {
        firstButton.click();
      } else {
        embedCalendly(DEFAULT_URL);
      }
    }, 1000);
  }
  
  // Función para añadir estilos
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .calendly-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px;
        font-size: 1.2rem;
        color: var(--primary, #ff0099);
        text-align: center;
      }
      
      .calendly-loading i {
        margin-right: 10px;
        font-size: 1.5rem;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .calendly-error {
        padding: 20px;
        text-align: center;
        color: #ff3366;
        background-color: rgba(255, 51, 102, 0.1);
        border-radius: 8px;
        margin: 20px 0;
      }
      
      .retry-button {
        background-color: var(--primary, #ff0099);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        margin-top: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .retry-button:hover {
        background-color: #d6006f;
        transform: translateY(-2px);
      }
      
      .calendly-service-button {
        transition: all 0.3s ease;
      }
      
      .calendly-service-button.active {
        background-color: var(--primary, #ff0099);
        color: white;
        transform: scale(1.05);
        box-shadow: 0 4px 10px rgba(255, 0, 153, 0.3);
      }
      
      /* Estilos para el iframe de Calendly */
      .calendly-inline-widget {
        min-height: 600px;
        width: 100%;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .calendly-inline-widget {
          min-height: 500px;
        }
      }
      
      @media (max-width: 480px) {
        .calendly-inline-widget {
          min-height: 400px;
        }
        
        .calendly-service-button {
          width: 100%;
          margin-bottom: 8px;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Función para configurar los botones
  function setupButtons() {
    const buttons = document.querySelectorAll('.calendly-service-button');
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        // Remover clase activa de todos los botones
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Añadir clase activa al botón seleccionado
        this.classList.add('active');
        
        // Obtener la URL de Calendly
        const url = this.getAttribute('data-url');
        
        if (url) {
          embedCalendly(url);
        } else {
          showError('Este servicio no tiene un calendario configurado');
        }
      });
    });
  }
  
  // Función para mostrar mensaje de carga
  function showLoading() {
    const container = document.getElementById(CONTAINER_ID);
    if (container) {
      container.innerHTML = `
        <div class="calendly-loading">
          <i class="fas fa-spinner fa-spin"></i> Cargando calendario...
        </div>
      `;
    }
  }
  
  // Función para mostrar mensaje de error
  function showError(message) {
    const container = document.getElementById(CONTAINER_ID);
    if (container) {
      container.innerHTML = `
        <div class="calendly-error">
          <p>${message || 'Hubo un problema al cargar el calendario. Por favor, intenta de nuevo más tarde o contáctanos directamente.'}</p>
          <button class="retry-button" onclick="window.location.reload()">Intentar de nuevo</button>
        </div>
      `;
    }
  }
  
  // Función para incrustar Calendly usando un iframe directamente
  function embedCalendly(url) {
    if (!url) {
      showError('URL de calendario no válida');
      return;
    }
    
    console.log('Incrustando Calendly con URL:', url);
    showLoading();
    
    const container = document.getElementById(CONTAINER_ID);
    if (!container) {
      console.error('No se encontró el contenedor de Calendly');
      return;
    }
    
    // Crear un iframe directamente en lugar de usar el widget de Calendly
    setTimeout(() => {
      // Asegurarse de que la URL tenga el parámetro de incrustación
      let embedUrl = url;
      if (url.indexOf('?') === -1) {
        embedUrl += '?embed=true&hideCookieBanner=true&hideEventTypeDetails=false&hideGdprBanner=true&primaryColor=ff0099';
      } else if (url.indexOf('embed=') === -1) {
        embedUrl += '&embed=true&hideCookieBanner=true&hideEventTypeDetails=false&hideGdprBanner=true&primaryColor=ff0099';
      }
      
      // Crear el iframe
      container.innerHTML = `
        <iframe 
          src="${embedUrl}" 
          width="100%" 
          height="600" 
          frameborder="0" 
          title="Selecciona una fecha y hora para tu cita"
          style="min-height: 600px; width: 100%; border: none;"
        ></iframe>
      `;
      
      // Añadir evento para manejar errores de carga del iframe
      const iframe = container.querySelector('iframe');
      if (iframe) {
        iframe.onerror = function() {
          showError('No se pudo cargar el calendario. Por favor, intenta de nuevo más tarde.');
        };
      }
    }, 500);
  }
  
  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Función para seleccionar un servicio desde otras partes del sitio
function selectCalendlyService(serviceId) {
  const button = document.querySelector(`.calendly-service-button[data-service="${serviceId}"]`);
  if (button) {
    button.click();
    
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    return true;
  }
  return false;
}

// Configurar enlaces de reserva
(function() {
  function setupLinks() {
    const links = document.querySelectorAll('.service-booking-link');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const serviceId = this.getAttribute('data-service');
        if (serviceId) {
          if (!selectCalendlyService(serviceId)) {
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
              bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      });
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLinks);
  } else {
    setupLinks();
  }
})();
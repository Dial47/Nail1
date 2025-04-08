// Integración mejorada con Calendly - Versión 2.0
(function() {
  // Cargar el script oficial de Calendly primero, antes de cualquier inicialización
  function loadCalendlyScript() {
    return new Promise((resolve, reject) => {
      // Verificar si el script ya está cargado
      if (typeof Calendly !== 'undefined') {
        console.log('Calendly ya está cargado');
        return resolve();
      }
      
      // Verificar si el script ya está en el DOM pero aún no ha cargado
      const existingScript = document.querySelector('script[src*="assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        console.log('Script de Calendly ya está en el DOM, esperando a que cargue');
        existingScript.addEventListener('load', () => {
          console.log('Script de Calendly cargado desde elemento existente');
          resolve();
        });
        existingScript.addEventListener('error', (e) => {
          console.error('Error al cargar el script de Calendly:', e);
          reject(new Error('Error al cargar el script de Calendly'));
        });
        return;
      }
      
      // Crear y añadir el script
      console.log('Añadiendo script de Calendly al DOM');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      
      script.addEventListener('load', () => {
        console.log('Script de Calendly cargado correctamente');
        resolve();
      });
      
      script.addEventListener('error', (e) => {
        console.error('Error al cargar el script de Calendly:', e);
        reject(new Error('Error al cargar el script de Calendly'));
      });
      
      document.head.appendChild(script);
    });
  }
  
  // Inicializar Calendly una vez que el script esté cargado
  function initializeCalendly() {
    console.log('Inicializando Calendly');
    const calendlyContainer = document.getElementById('calendly-container');
    const serviceButtons = document.querySelectorAll('.calendly-service-button');
    
    if (!calendlyContainer) {
      console.error('No se encontró el contenedor de Calendly');
      return;
    }
    
    // Función para mostrar un mensaje de carga
    function showLoading() {
      calendlyContainer.innerHTML = `
        <div class="calendly-loading">
          <i class="fas fa-spinner fa-spin"></i> Cargando calendario...
        </div>
      `;
    }
    
    // Función para mostrar un mensaje de error
    function showError(message) {
      calendlyContainer.innerHTML = `
        <div class="calendly-error">
          <p>${message || 'Hubo un problema al cargar el calendario. Por favor, intenta de nuevo más tarde o contáctanos directamente.'}</p>
          <button class="retry-button">Intentar de nuevo</button>
        </div>
      `;
      
      // Añadir evento al botón de reintentar
      const retryButton = calendlyContainer.querySelector('.retry-button');
      if (retryButton) {
        retryButton.addEventListener('click', () => {
          if (serviceButtons.length > 0) {
            serviceButtons[0].click();
          } else {
            loadCalendlyForUrl(defaultCalendlyUrl);
          }
        });
      }
    }
    
    // URL por defecto
    const defaultCalendlyUrl = "https://calendly.com/angelnails326/30min";
    
    // Función para cargar Calendly con una URL específica
    function loadCalendlyForUrl(url) {
      if (!url) {
        console.error('URL de Calendly no proporcionada');
        showError('URL de calendario no válida');
        return;
      }
      
      console.log('Cargando Calendly para URL:', url);
      showLoading();
      
      // Esperar un momento para asegurarse de que el DOM esté listo
      setTimeout(() => {
        try {
          if (typeof Calendly === 'undefined') {
            console.error('Calendly no está definido');
            showError('No se pudo cargar el calendario. Por favor, recarga la página.');
            return;
          }
          
          // Limpiar el contenedor
          calendlyContainer.innerHTML = '';
          
          // Inicializar el widget
          console.log('Inicializando widget de Calendly con URL:', url);
          Calendly.initInlineWidget({
            url: url,
            parentElement: calendlyContainer,
            prefill: {},
            utm: {}
          });
          
          console.log('Widget de Calendly inicializado correctamente');
        } catch (error) {
          console.error('Error al inicializar Calendly:', error);
          showError('Error al inicializar el calendario: ' + error.message);
        }
      }, 500);
    }
    
    // Configurar los botones de servicio
    if (serviceButtons.length > 0) {
      console.log(`Configurando ${serviceButtons.length} botones de servicio`);
      
      serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Remover clase activa de todos los botones
          serviceButtons.forEach(btn => btn.classList.remove('active'));
          
          // Añadir clase activa al botón seleccionado
          this.classList.add('active');
          
          // Obtener la URL de Calendly del botón
          const calendlyUrl = this.getAttribute('data-url');
          
          if (calendlyUrl) {
            loadCalendlyForUrl(calendlyUrl);
          } else {
            console.error('Botón sin URL de Calendly');
            showError('Este servicio no tiene un calendario configurado');
          }
        });
      });
      
      // Activar el primer botón por defecto
      console.log('Activando el primer botón por defecto');
      setTimeout(() => {
        serviceButtons[0].click();
      }, 1000);
    } else {
      console.warn('No se encontraron botones de servicio, usando URL por defecto');
      loadCalendlyForUrl(defaultCalendlyUrl);
    }
  }
  
  // Añadir estilos para Calendly
  function addCalendlyStyles() {
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
    console.log('Estilos de Calendly añadidos');
  }
  
  // Inicializar todo cuando el DOM esté listo
  function init() {
    console.log('Inicializando integración de Calendly');
    
    // Añadir estilos primero
    addCalendlyStyles();
    
    // Cargar el script de Calendly y luego inicializar
    loadCalendlyScript()
      .then(() => {
        console.log('Script de Calendly cargado, inicializando...');
        // Esperar un momento para asegurarse de que Calendly esté completamente inicializado
        setTimeout(initializeCalendly, 500);
      })
      .catch(error => {
        console.error('Error al cargar Calendly:', error);
        const calendlyContainer = document.getElementById('calendly-container');
        if (calendlyContainer) {
          calendlyContainer.innerHTML = `
            <div class="calendly-error">
              <p>No se pudo cargar el calendario. Por favor, recarga la página o contáctanos directamente.</p>
              <button class="retry-button" onclick="window.location.reload()">Recargar página</button>
            </div>
          `;
        }
      });
  }
  
  // Esperar a que el DOM esté completamente cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // El DOM ya está cargado
    init();
  }
})();

// Función para manejar la selección de servicios desde otras partes del sitio
function selectCalendlyService(serviceId) {
  // Buscar el botón correspondiente al servicio
  const serviceButton = document.querySelector(`.calendly-service-button[data-service="${serviceId}"]`);
  
  if (serviceButton) {
    // Simular clic en el botón
    serviceButton.click();
    
    // Desplazarse hasta la sección de reservas
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    return true;
  }
  
  return false;
}

// Conectar los enlaces de reserva en las tarjetas de servicio con Calendly
(function() {
  function setupServiceLinks() {
    const serviceBookingLinks = document.querySelectorAll('.service-booking-link');
    
    serviceBookingLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const serviceId = this.getAttribute('data-service');
        if (serviceId) {
          // Intentar seleccionar el servicio en Calendly
          if (!selectCalendlyService(serviceId)) {
            // Si no se encuentra el servicio, simplemente desplazarse a la sección de reservas
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
              bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      });
    });
  }
  
  // Configurar los enlaces cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupServiceLinks);
  } else {
    setupServiceLinks();
  }
})();
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de Calendly
    const calendlyContainer = document.getElementById('calendly-container');
    const serviceButtons = document.querySelectorAll('.calendly-service-button');
    const serviceBookingLinks = document.querySelectorAll('.service-booking-link');
    
    // URL base de Calendly (reemplaza 'tu-usuario' con tu nombre de usuario de Calendly)
    const calendlyUser = 'badiego47'; // Cambia esto por tu nombre de usuario de Calendly
    
    // Altura del widget de Calendly
    const calendlyHeight = '650px';
    
    // Esperar a que Calendly se cargue completamente
    function waitForCalendly(callback) {
        if (typeof Calendly !== 'undefined') {
            callback();
        } else {
            setTimeout(function() {
                waitForCalendly(callback);
            }, 100);
        }
    }
    
    // Función para cargar el widget de Calendly con una URL específica
    function loadCalendlyWidget(url) {
        // Mostrar un mensaje de carga
        calendlyContainer.innerHTML = '<div class="calendly-placeholder"><img src="https://placehold.co/600x400/ff3385/ffffff?text=Cargando..." alt="Cargando..." class="placeholder-image"><p>Cargando calendario, por favor espera...</p></div>';
        
        // Configurar el widget de Calendly
        calendlyContainer.style.minHeight = calendlyHeight;
        
        // Cargar el widget de Calendly cuando esté disponible
        waitForCalendly(function() {
            try {
                window.Calendly.initInlineWidget({
                    url: url,
                    parentElement: calendlyContainer,
                    prefill: {},
                    utm: {}
                });
            } catch (error) {
                console.error('Error al inicializar Calendly:', error);
                calendlyContainer.innerHTML = '<div class="calendly-placeholder"><img src="https://placehold.co/600x400/ff3385/ffffff?text=Error" alt="Error" class="placeholder-image"><p>Hubo un problema al cargar el calendario. Por favor, intenta de nuevo más tarde.</p></div>';
            }
        });
    }
    
    // Cargar el widget de Calendly por defecto (vista general)
    function loadDefaultCalendly() {
        loadCalendlyWidget(`https://calendly.com/${calendlyUser}`);
    }
    
    // Añadir event listeners a los botones de servicio
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            serviceButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase activa al botón seleccionado
            this.classList.add('active');
            
            // Añadir efecto de pulsación
            this.classList.add('glow');
            setTimeout(() => {
                this.classList.remove('glow');
            }, 1000);
            
            // Cargar el widget de Calendly con la URL del servicio seleccionado
            loadCalendlyWidget(this.dataset.url);
        });
    });
    
    // Añadir event listeners a los enlaces de reserva en las tarjetas de servicio
    serviceBookingLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el servicio seleccionado
            const service = this.dataset.service;
            
            // Encontrar el botón correspondiente
            const targetButton = Array.from(serviceButtons).find(
                button => button.dataset.url.includes(service)
            );
            
            // Si se encuentra el botón, simular un clic en él
            if (targetButton) {
                // Desplazarse a la sección de reservas
                document.querySelector('#booking').scrollIntoView({ 
                    behavior: 'smooth' 
                });
                
                // Pequeña pausa para asegurar que el desplazamiento ha terminado
                setTimeout(() => {
                    targetButton.click();
                }, 800);
            } else {
                // Si no se encuentra el botón, cargar el widget por defecto
                loadDefaultCalendly();
            }
        });
    });
    
    // Inicializar Calendly cuando el script esté cargado
    const calendlyScript = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
    
    if (calendlyScript) {
        // Si el script ya está en la página, esperar a que se cargue
        if (calendlyScript.getAttribute('async') !== null) {
            calendlyScript.onload = function() {
                // Pequeña pausa para asegurar que Calendly esté completamente cargado
                setTimeout(loadDefaultCalendly, 500);
            };
        } else {
            // Pequeña pausa para asegurar que Calendly esté completamente cargado
            setTimeout(loadDefaultCalendly, 500);
        }
    } else {
        // Si el script no está en la página, añadirlo
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = function() {
            // Pequeña pausa para asegurar que Calendly esté completamente cargado
            setTimeout(loadDefaultCalendly, 500);
        };
        document.head.appendChild(script);
    }
    
    // Seleccionar el primer botón por defecto después de un breve retraso
    setTimeout(() => {
        if (serviceButtons.length > 0) {
            serviceButtons[0].click();
        }
    }, 1000);
});
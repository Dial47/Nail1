document.addEventListener('DOMContentLoaded', function() {
    // Configuración de Calendly
    const calendlyContainer = document.getElementById('calendly-container');
    const serviceButtons = document.querySelectorAll('.calendly-service-button');
    const serviceBookingLinks = document.querySelectorAll('.service-booking-link');
    
    // URL base de Calendly (reemplaza 'tu-usuario' con tu nombre de usuario de Calendly)
    const calendlyUser = 'badiego47'; // Cambia esto por tu nombre de usuario de Calendly
    
    // Altura del widget de Calendly
    const calendlyHeight = '650px';
    
    // Función para cargar el widget de Calendly con una URL específica
    function loadCalendlyWidget(url) {
        // Limpiar el contenedor
        calendlyContainer.innerHTML = '';
        
        // Configurar el widget de Calendly
        calendlyContainer.style.minHeight = calendlyHeight;
        
        // Cargar el widget de Calendly
        Calendly.initInlineWidget({
            url: url,
            parentElement: calendlyContainer,
            prefill: {},
            utm: {}
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
    
    // Cargar el widget por defecto al cargar la página
    loadDefaultCalendly();
});
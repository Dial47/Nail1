document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Cargar la API de Google
    if (window.calendarIntegration) {
        window.calendarIntegration.loadGoogleAPI();
    }

    // Mobile Menu
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const closeMenuButton = document.querySelector('.close-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuBackdrop = document.querySelector('.mobile-menu-backdrop');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link, .mobile-cta-button');

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileMenuButton.addEventListener('click', openMobileMenu);
    // Corregido: eliminada la línea duplicada que abría el menú al hacer clic en el botón de cerrar
    closeMenuButton.addEventListener('click', closeMobileMenu);
    mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Hero Carousel
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselIndicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        carouselIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        carouselSlides[index].classList.add('active');
        carouselIndicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= carouselSlides.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }

    function prevSlide() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = carouselSlides.length - 1;
        }
        showSlide(newIndex);
    }

    function startCarouselInterval() {
        carouselInterval = setInterval(nextSlide, 5000);
    }

    function resetCarouselInterval() {
        clearInterval(carouselInterval);
        startCarouselInterval();
    }

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetCarouselInterval();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetCarouselInterval();
    });

    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetCarouselInterval();
        });
    });

    startCarouselInterval();

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialIndicators = document.querySelectorAll('.testimonial-indicators .indicator');
    const testimonialPrevButton = document.querySelector('.testimonial-button.prev');
    const testimonialNextButton = document.querySelector('.testimonial-button.next');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        testimonialIndicators[index].classList.add('active');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonialSlides.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }

    function prevTestimonial() {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) {
            newIndex = testimonialSlides.length - 1;
        }
        showTestimonial(newIndex);
    }

    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, 7000);
    }

    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }

    testimonialPrevButton.addEventListener('click', () => {
        prevTestimonial();
        resetTestimonialInterval();
    });

    testimonialNextButton.addEventListener('click', () => {
        nextTestimonial();
        resetTestimonialInterval();
    });

    testimonialIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonial(index);
            resetTestimonialInterval();
        });
    });

    startTestimonialInterval();

    // Booking Form
    const bookingForm = document.getElementById('booking-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = bookingForm.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const spinner = submitButton.querySelector('.spinner');

    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const notes = document.getElementById('notes').value;
        
        if (!name || !email || !phone || !service || !date || !time) {
            formStatus.textContent = 'Por favor completa todos los campos requeridos.';
            formStatus.classList.add('error');
            formStatus.classList.remove('success', 'hidden');
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.textContent = 'Procesando...';
        spinner.classList.remove('hidden');
        formStatus.textContent = 'Procesando tu reserva...';
        formStatus.classList.remove('error', 'hidden');
        formStatus.classList.add('success');
        
        // Preparar datos para enviar
        const bookingData = {
            name,
            email,
            phone,
            service,
            date,
            time,
            notes
        };
        
        console.log('Datos de reserva:', bookingData);
        
        try {
            // Intentar crear el evento en Google Calendar
            if (window.calendarIntegration) {
                try {
                    const calendarEvent = await window.calendarIntegration.createCalendarEvent(bookingData);
                    console.log('Evento creado en Google Calendar:', calendarEvent);
                    
                    // Respuesta de éxito
                    formStatus.textContent = '¡Tu cita ha sido reservada con éxito! Se ha añadido a tu Google Calendar y hemos enviado un correo de confirmación.';
                    formStatus.classList.add('success');
                    formStatus.classList.remove('error', 'hidden');
                    
                    // Reset form
                    bookingForm.reset();
                } catch (error) {
                    console.error('Error al crear evento en Google Calendar:', error);
                    
                    // Mostrar mensaje de error específico de Google Calendar
                    formStatus.textContent = 'Tu cita ha sido registrada, pero hubo un problema al añadirla a Google Calendar. Por favor, contacta con nosotros para confirmar.';
                    formStatus.classList.add('warning');
                    formStatus.classList.remove('error', 'success', 'hidden');
                }
            } else {
                // Fallback si la integración con Google Calendar no está disponible
                // Simular envío al backend (en una aplicación real, esto enviaría los datos a un servidor)
                setTimeout(() => {
                    // Respuesta de éxito simulada
                    formStatus.textContent = '¡Tu cita ha sido reservada con éxito! Hemos enviado un correo de confirmación.';
                    formStatus.classList.add('success');
                    formStatus.classList.remove('error', 'hidden');
                    
                    // Reset form
                    bookingForm.reset();
                }, 2000);
            }
        } catch (error) {
            console.error('Error general al procesar la reserva:', error);
            formStatus.textContent = 'Ha ocurrido un error al procesar tu reserva. Por favor, inténtalo de nuevo o contáctanos directamente.';
            formStatus.classList.add('error');
            formStatus.classList.remove('success', 'hidden');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            buttonText.textContent = 'Reservar Cita';
            spinner.classList.add('hidden');
        }
    });

    // Scroll Animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const serviceCards = document.querySelectorAll('.service-card-animate');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('active');
            }
        });
        
        serviceCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardPosition < windowHeight - 100) {
                setTimeout(() => {
                    card.classList.add('active');
                }, 150 * index);
            }
        });
    }
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Manejar URLs con parámetros como #booking?service=manicura-regular
            const cleanTargetId = targetId.split('?')[0];
            const targetElement = document.querySelector(cleanTargetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
                
                // Si hay un parámetro de servicio, seleccionarlo en el formulario
                if (targetId.includes('?service=') && cleanTargetId === '#booking') {
                    const serviceParam = targetId.split('?service=')[1];
                    const serviceSelect = document.getElementById('service');
                    
                    if (serviceSelect) {
                        for (let i = 0; i < serviceSelect.options.length; i++) {
                            if (serviceSelect.options[i].value === serviceParam) {
                                serviceSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                }
            }
        });
    });
    
    // Inicializar animaciones al cargar la página
    document.querySelector('.hero-content').classList.add('animate-fade-in');
});
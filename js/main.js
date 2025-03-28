document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

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

  if (prevButton && nextButton) {
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
  }

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

  if (testimonialPrevButton && testimonialNextButton) {
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
  }

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
          if (this.classList.contains('service-booking-link')) {
              // No prevenir el comportamiento predeterminado para los enlaces de reserva de servicio
              // ya que se manejan en calendly-integration.js
              return;
          }
          
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
          }
      });
  });
  
  // Inicializar animaciones al cargar la página
  document.querySelector('.hero-content').classList.add('animate-fade-in');
  
  // Añadir fallbacks para imágenes
  document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function() {
          if (!this.hasAttribute('data-error-handled')) {
              this.setAttribute('data-error-handled', 'true');
              
              // Determinar el tipo de imagen y establecer un placeholder adecuado
              const width = this.width || 300;
              const height = this.height || 200;
              const alt = this.alt || 'Imagen';
              
              this.src = `https://placehold.co/${width}x${height}/ff3385/ffffff?text=${encodeURIComponent(alt)}`;
          }
      });
  });
});
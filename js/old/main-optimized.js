/**
 * AngelNails - Main JavaScript File
 * Contiene las funcionalidades principales del sitio
 */

document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
      setTimeout(() => {
          preloader.classList.add('hidden');
          setTimeout(() => {
              preloader.style.display = 'none';
          }, 500);
      }, 1500);
  }

  // Actualizar año actual en el footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
  }

  // Navbar scroll effect
  const navbar = document.getElementById('main-navbar');
  if (navbar) {
      window.addEventListener('scroll', function() {
          if (window.scrollY > 50) {
              navbar.classList.add('scrolled');
          } else {
              navbar.classList.remove('scrolled');
          }
      });
  }

  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const closeMenuButton = document.querySelector('.close-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuBackdrop = document.querySelector('.mobile-menu-backdrop');

  if (mobileMenuButton && closeMenuButton && mobileMenu && mobileMenuBackdrop) {
      mobileMenuButton.addEventListener('click', function() {
          mobileMenu.classList.add('active');
          mobileMenuBackdrop.classList.add('active');
          document.body.style.overflow = 'hidden';
      });

      closeMenuButton.addEventListener('click', closeMobileMenu);
      mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

      // Mobile menu links
      const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
      mobileMenuLinks.forEach(link => {
          link.addEventListener('click', closeMobileMenu);
      });
  }

  function closeMobileMenu() {
      mobileMenu.classList.remove('active');
      mobileMenuBackdrop.classList.remove('active');
      document.body.style.overflow = '';
  }

  // Carousel functionality
  initCarousel();

  // Video sound toggle
  const videoSoundToggle = document.querySelector('.video-sound-toggle');
  const backgroundVideo = document.getElementById('background-video');
  
  if (videoSoundToggle && backgroundVideo) {
      videoSoundToggle.addEventListener('click', function() {
          if (backgroundVideo.muted) {
              backgroundVideo.muted = false;
              videoSoundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
          } else {
              backgroundVideo.muted = true;
              videoSoundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
          }
      });
  }

  // Testimonial slider
  initTestimonialSlider();

  // Gallery filter
  initGalleryFilter();

  // Scroll to top button
  initScrollToTop();

  // Animate on scroll
  initAnimateOnScroll();

  // Lazy loading images
  initLazyLoading();

  // Form validation
  initFormValidation();

  // Countdown timer
  initCountdownTimer();
});

/**
* Inicializa el carrusel de imágenes
*/
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevButton = carousel.querySelector('.carousel-button.prev');
  const nextButton = carousel.querySelector('.carousel-button.next');
  const indicators = carousel.querySelectorAll('.carousel-indicators .indicator');
  
  let currentSlide = 0;
  let slideInterval;

  // Función para mostrar un slide específico
  function showSlide(index) {
      // Ocultar todos los slides
      slides.forEach(slide => {
          slide.classList.remove('active');
      });
      
      // Desactivar todos los indicadores
      indicators.forEach(indicator => {
          indicator.classList.remove('active');
      });
      
      // Mostrar el slide actual
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
      
      // Actualizar el índice actual
      currentSlide = index;
  }

  // Función para ir al siguiente slide
  function nextSlide() {
      let nextIndex = currentSlide + 1;
      if (nextIndex >= slides.length) {
          nextIndex = 0;
      }
      showSlide(nextIndex);
  }

  // Función para ir al slide anterior
  function prevSlide() {
      let prevIndex = currentSlide - 1;
      if (prevIndex < 0) {
          prevIndex = slides.length - 1;
      }
      showSlide(prevIndex);
  }

  // Event listeners para los botones
  if (prevButton) {
      prevButton.addEventListener('click', function() {
          clearInterval(slideInterval);
          prevSlide();
          startSlideInterval();
      });
  }
  
  if (nextButton) {
      nextButton.addEventListener('click', function() {
          clearInterval(slideInterval);
          nextSlide();
          startSlideInterval();
      });
  }

  // Event listeners para los indicadores
  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
          clearInterval(slideInterval);
          showSlide(index);
          startSlideInterval();
      });
  });

  // Iniciar el intervalo de cambio automático
  function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 5000);
  }

  // Mostrar el primer slide y comenzar el intervalo
  showSlide(0);
  startSlideInterval();

  // Pausar el carrusel al hacer hover
  carousel.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
  });

  carousel.addEventListener('mouseleave', function() {
      startSlideInterval();
  });
}

/**
* Inicializa el slider de testimonios
*/
function initTestimonialSlider() {
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (!testimonialSlider) return;

  const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
  const prevButton = testimonialSlider.querySelector('.testimonial-button.prev');
  const nextButton = testimonialSlider.querySelector('.testimonial-button.next');
  const indicators = testimonialSlider.querySelectorAll('.testimonial-indicators .indicator');
  
  let currentSlide = 0;
  let slideInterval;

  // Función para mostrar un testimonio específico
  function showSlide(index) {
      // Ocultar todos los testimonios
      slides.forEach(slide => {
          slide.classList.remove('active');
      });
      
      // Desactivar todos los indicadores
      indicators.forEach(indicator => {
          indicator.classList.remove('active');
      });
      
      // Mostrar el testimonio actual
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
      
      // Actualizar el índice actual
      currentSlide = index;
  }

  // Función para ir al siguiente testimonio
  function nextSlide() {
      let nextIndex = currentSlide + 1;
      if (nextIndex >= slides.length) {
          nextIndex = 0;
      }
      showSlide(nextIndex);
  }

  // Función para ir al testimonio anterior
  function prevSlide() {
      let prevIndex = currentSlide - 1;
      if (prevIndex < 0) {
          prevIndex = slides.length - 1;
      }
      showSlide(prevIndex);
  }

  // Event listeners para los botones
  if (prevButton) {
      prevButton.addEventListener('click', function() {
          clearInterval(slideInterval);
          prevSlide();
          startSlideInterval();
      });
  }
  
  if (nextButton) {
      nextButton.addEventListener('click', function() {
          clearInterval(slideInterval);
          nextSlide();
          startSlideInterval();
      });
  }

  // Event listeners para los indicadores
  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
          clearInterval(slideInterval);
          showSlide(index);
          startSlideInterval();
      });
  });

  // Iniciar el intervalo de cambio automático
  function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 7000);
  }

  // Mostrar el primer testimonio y comenzar el intervalo
  showSlide(0);
  startSlideInterval();
}

/**
* Inicializa el filtro de la galería
*/
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (!filterButtons.length || !galleryItems.length) return;

  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remover clase active de todos los botones
          filterButtons.forEach(btn => {
              btn.classList.remove('active');
          });
          
          // Añadir clase active al botón clickeado
          this.classList.add('active');
          
          const filter = this.getAttribute('data-filter');
          
          // Filtrar los elementos de la galería
          galleryItems.forEach(item => {
              if (filter === 'all' || item.getAttribute('data-category') === filter) {
                  item.classList.remove('hidden');
                  setTimeout(() => {
                      item.classList.remove('fade');
                  }, 10);
              } else {
                  item.classList.add('fade');
                  setTimeout(() => {
                      item.classList.add('hidden');
                  }, 300);
              }
          });
      });
  });
}

/**
* Inicializa el botón de scroll to top
*/
function initScrollToTop() {
  const scrollToTopButton = document.getElementById('scroll-to-top');
  
  if (!scrollToTopButton) return;

  // Mostrar/ocultar el botón según el scroll
  window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
          scrollToTopButton.classList.add('visible');
      } else {
          scrollToTopButton.classList.remove('visible');
      }
  });

  // Scroll to top al hacer click
  scrollToTopButton.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
}

/**
* Inicializa las animaciones al hacer scroll
*/
function initAnimateOnScroll() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (!animatedElements.length) return;

  function checkIfInView() {
      const windowHeight = window.innerHeight;
      const windowTopPosition = window.scrollY;
      const windowBottomPosition = windowTopPosition + windowHeight;

      animatedElements.forEach(element => {
          const elementHeight = element.offsetHeight;
          const elementTopPosition = element.offsetTop;
          const elementBottomPosition = elementTopPosition + elementHeight;

          // Verificar si el elemento está en el viewport
          if (
              (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) ||
              (elementTopPosition <= windowBottomPosition && elementBottomPosition >= windowTopPosition)
          ) {
              element.classList.add('visible');
          }
      });
  }

  // Verificar al cargar la página
  window.addEventListener('load', checkIfInView);
  
  // Verificar al hacer scroll
  window.addEventListener('scroll', checkIfInView);
}

/**
* Inicializa la carga perezosa de imágenes
*/
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy-image');
  
  if (!lazyImages.length) return;

  function loadImage(image) {
      const src = image.getAttribute('data-src');
      if (!src) return;
      
      image.src = src;
      image.addEventListener('load', function() {
          image.classList.add('loaded');
      });
  }

  function checkLazyImages() {
      const windowHeight = window.innerHeight;
      const windowTopPosition = window.scrollY;
      const windowBottomPosition = windowTopPosition + windowHeight;

      lazyImages.forEach(image => {
          const imageTopPosition = image.offsetTop;
          
          // Cargar la imagen si está cerca del viewport
          if (imageTopPosition <= windowBottomPosition + 200) {
              loadImage(image);
          }
      });
  }

  // Verificar al cargar la página
  window.addEventListener('load', checkLazyImages);
  
  // Verificar al hacer scroll
  window.addEventListener('scroll', checkLazyImages);
}

/**
* Inicializa la validación del formulario de contacto
*/
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Validar campos
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
          alert('Por favor, completa todos los campos obligatorios.');
          return;
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          alert('Por favor, introduce un email válido.');
          return;
      }
      
      // Simulación de envío (aquí iría el código para enviar el formulario)
      alert('¡Gracias por tu mensaje! Te responderemos lo antes posible.');
      contactForm.reset();
  });
}

/**
* Inicializa el contador de tiempo para la oferta especial
*/
function initCountdownTimer() {
  const daysElement = document.getElementById('countdown-days');
  const hoursElement = document.getElementById('countdown-hours');
  const minutesElement = document.getElementById('countdown-minutes');
  const secondsElement = document.getElementById('countdown-seconds');
  
  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;

  // Fecha objetivo (7 días a partir de ahora)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  function updateCountdown() {
      const currentDate = new Date();
      const difference = targetDate - currentDate;
      
      if (difference <= 0) {
          // La oferta ha expirado, reiniciar el contador
          targetDate.setDate(currentDate.getDate() + 7);
          return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      daysElement.textContent = days.toString().padStart(2, '0');
      hoursElement.textContent = hours.toString().padStart(2, '0');
      minutesElement.textContent = minutes.toString().padStart(2, '0');
      secondsElement.textContent = seconds.toString().padStart(2, '0');
  }

  // Actualizar cada segundo
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
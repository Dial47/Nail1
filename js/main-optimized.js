// Archivo JavaScript optimizado para AngelNails
document.addEventListener("DOMContentLoaded", () => {
  // Funciones principales
  initNavbar();
  initMobileMenu();
  initCarousel();
  initVideoBackground();
  initTestimonials();
  initScrollAnimations();
  initLazyLoading();
  initParticleEffects();
  
  // Establecer año actual en el footer
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});

// Inicializar la barra de navegación
function initNavbar() {
  const navbar = document.getElementById("main-navbar");
  
  // Efecto de reducción al hacer scroll
  function handleScroll() {
    if (window.scrollY > 100) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  }
  
  // Ejecutar una vez al cargar
  handleScroll();
  
  // Añadir evento de scroll
  window.addEventListener("scroll", handleScroll);
  
  // Marcar enlace activo en la navegación
  highlightActiveNavLink();
}

// Marcar el enlace activo en la navegación
function highlightActiveNavLink() {
  const currentLocation = window.location.pathname;
  const menuLinks = document.querySelectorAll(".menu-link");

  menuLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (
      linkPath === currentLocation ||
      (currentLocation === "/" && linkPath === "/index.html") ||
      (linkPath !== "/index.html" && currentLocation.includes(linkPath))
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Inicializar menú móvil
function initMobileMenu() {
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const closeMenuButton = document.querySelector(".close-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link, .mobile-cta-button");
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
  const sections = document.querySelectorAll("section");

  // Abrir menú móvil
  function openMobileMenu() {
    mobileMenu?.classList.add("active");
    mobileMenuBackdrop?.classList.add("active");
    document.body.style.overflow = "hidden";

    // Añadir animación de entrada a los elementos del menú
    const menuItems = document.querySelectorAll(".mobile-menu-link");
    menuItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(20px)";
      setTimeout(
        () => {
          item.style.transition = "all 0.3s ease";
          item.style.opacity = "1";
          item.style.transform = "translateX(0)";
        },
        100 + index * 50,
      );
    });
  }

  // Cerrar menú móvil
  function closeMobileMenu() {
    mobileMenu?.classList.remove("active");
    mobileMenuBackdrop?.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Eventos para abrir/cerrar menú
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", openMobileMenu);
  }

  if (closeMenuButton) {
    closeMenuButton.addEventListener("click", closeMobileMenu);
  }

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener("click", closeMobileMenu);
  }

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
  
  // Activar el elemento de navegación correspondiente al hacer scroll
  window.addEventListener("scroll", function() {
    let current = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute("id");
      }
    });
    
    mobileNavItems.forEach(item => {
      item.classList.remove("active");
      const href = item.getAttribute("href");
      if (href && href.includes(current)) {
        item.classList.add("active");
      }
    });
  });
  
  // Navegación suave al hacer clic en los elementos
  mobileNavItems.forEach(item => {
    item.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      
      // Si es un enlace interno, prevenir comportamiento predeterminado
      if (href.startsWith("#")) {
        e.preventDefault();
        
        // Añadir efecto de clic
        mobileNavItems.forEach(navItem => {
          navItem.classList.remove("clicked");
        });
        this.classList.add("clicked");
        
        // Después de un tiempo, quitar la clase clicked
        setTimeout(() => {
          this.classList.remove("clicked");
        }, 800);
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth"
          });
        }
        
        // Activar el elemento de navegación
        mobileNavItems.forEach(navItem => {
          navItem.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });
  
  // Añadir efectos dinámicos a los iconos
  setTimeout(() => {
    // Efecto de brillo aleatorio para el icono activo
    const activeIcon = document.querySelector(".mobile-nav-item.active .mobile-nav-icon");
    if (activeIcon) {
      setInterval(() => {
        activeIcon.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.8)";
        setTimeout(() => {
          activeIcon.style.textShadow = "none";
        }, 300);
      }, 3000);
    }
    
    // Añadir efecto de rotación suave al icono de galería
    const galleryIcon = document.querySelector(".mobile-nav-item[href='/galeria.html'] .mobile-nav-icon");
    if (galleryIcon) {
      galleryIcon.addEventListener("mouseover", () => {
        galleryIcon.style.transition = "transform 0.5s ease";
        galleryIcon.style.transform = "rotate(30deg)";
      });
      
      galleryIcon.addEventListener("mouseout", () => {
        galleryIcon.style.transform = "rotate(0)";
      });
    }
  }, 1000);
}

// Inicializar carrusel
function initCarousel() {
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const carouselIndicators = document.querySelectorAll(".carousel-indicators .indicator");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");
  const carousel = document.querySelector(".carousel");
  const heroContent = document.querySelector(".hero-content");

  if (carouselSlides.length === 0 || !carousel) return;

  let currentSlide = 0;
  let isAnimating = false;
  let autoplayInterval;
  let isMobileView = window.innerWidth <= 768;

  // Mostrar el primer slide y activar el contenido del hero
  carouselSlides[0].classList.add("active");
  if (carouselIndicators.length > 0) {
    carouselIndicators[0].classList.add("active");
  }
  if (heroContent) {
    heroContent.classList.add("animate-fade-in");
  }

  // Configurar vista móvil o escritorio
  function setupCarouselView() {
    isMobileView = window.innerWidth <= 768;

    if (isMobileView && window.innerWidth > 480) {
      // Vista de 2 imágenes para tablets
      setupMobileView(2);
    } else if (isMobileView) {
      // Vista de 1 imagen para móviles pequeños
      setupMobileView(1);
    } else {
      // Vista normal para escritorio
      setupDesktopView();
    }
  }

  // Configurar vista móvil
  function setupMobileView(slidesPerView) {
    // Detener autoplay
    stopAutoplay();

    // Añadir clase para vista móvil
    carousel.classList.add("carousel-mobile-view");

    // Resetear estilos y clases
    carouselSlides.forEach((slide) => {
      slide.classList.remove("active");
      slide.style.opacity = "1";
      slide.style.position = "relative";
      slide.style.width = slidesPerView === 2 ? "50%" : "100%";
      slide.style.flex = slidesPerView === 2 ? "0 0 50%" : "0 0 100%";
    });

    // Centrar la imagen seleccionada
    if (currentSlide > 0) {
      const slidesContainer = carousel.querySelector(".carousel-slides");
      if (slidesContainer) {
        slidesContainer.scrollTo({
          left: carouselSlides[currentSlide].offsetLeft,
          behavior: "smooth",
        });
      }
    }

    // Ocultar indicadores en vista móvil
    const indicators = carousel.querySelector(".carousel-indicators");
    if (indicators) {
      indicators.style.display = "none";
    }
  }

  // Configurar vista de escritorio
  function setupDesktopView() {
    // Quitar clase de vista móvil
    carousel.classList.remove("carousel-mobile-view");

    // Resetear estilos y clases
    carouselSlides.forEach((slide, index) => {
      slide.style.position = "absolute";
      slide.style.width = "100%";
      slide.style.flex = "";

      if (index === currentSlide) {
        slide.classList.add("active");
        slide.style.opacity = "1";
      } else {
        slide.classList.remove("active");
        slide.style.opacity = "0";
      }
    });

    // Mostrar indicadores en vista de escritorio
    const indicators = carousel.querySelector(".carousel-indicators");
    if (indicators) {
      indicators.style.display = "flex";
    }

    // Reiniciar autoplay
    startAutoplay();
  }

  // Función para mostrar un slide específico (solo en vista de escritorio)
  function showSlide(index) {
    if (isAnimating || isMobileView) return;
    isAnimating = true;

    // Ocultar slide actual
    carouselSlides[currentSlide].classList.remove("active");
    if (carouselIndicators.length > 0) {
      carouselIndicators[currentSlide].classList.remove("active");
    }

    // Mostrar nuevo slide
    currentSlide = index;
    carouselSlides[currentSlide].classList.add("active");
    if (carouselIndicators.length > 0) {
      carouselIndicators[currentSlide].classList.add("active");
    }

    // Permitir nueva animación después de un tiempo
    setTimeout(() => {
      isAnimating = false;
    }, 1000);
  }

  // Función para ir al siguiente slide
  function nextSlide() {
    if (isMobileView) {
      // En vista móvil, desplazar horizontalmente
      const slidesContainer = carousel.querySelector(".carousel-slides");
      if (slidesContainer) {
        const slideWidth = carouselSlides[0].offsetWidth;
        slidesContainer.scrollBy({
          left: slideWidth,
          behavior: "smooth",
        });
      }
    } else {
      // En vista de escritorio, cambiar slide
      let newIndex = currentSlide + 1;
      if (newIndex >= carouselSlides.length) {
        newIndex = 0;
      }
      showSlide(newIndex);
    }
  }

  // Función para ir al slide anterior
  function prevSlide() {
    if (isMobileView) {
      // En vista móvil, desplazar horizontalmente
      const slidesContainer = carousel.querySelector(".carousel-slides");
      if (slidesContainer) {
        const slideWidth = carouselSlides[0].offsetWidth;
        slidesContainer.scrollBy({
          left: -slideWidth,
          behavior: "smooth",
        });
      }
    } else {
      // En vista de escritorio, cambiar slide
      let newIndex = currentSlide - 1;
      if (newIndex < 0) {
        newIndex = carouselSlides.length - 1;
      }
      showSlide(newIndex);
    }
  }

  // Iniciar autoplay (solo en vista de escritorio)
  function startAutoplay() {
    if (!isMobileView) {
      autoplayInterval = setInterval(nextSlide, 5000);
    }
  }

  // Detener autoplay
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Reiniciar autoplay
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Configurar controles
  function setupControls() {
    // Configurar botones de navegación
    if (prevButton && nextButton) {
      prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        prevSlide();
        resetAutoplay();
      });

      nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        nextSlide();
        resetAutoplay();
      });
    }

    // Configurar indicadores
    carouselIndicators.forEach((indicator, index) => {
      indicator.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentSlide !== index && !isMobileView) {
          showSlide(index);
          resetAutoplay();
        }
      });
    });

    // Pausar autoplay al hacer hover en el carrusel
    if (carousel) {
      carousel.addEventListener("mouseenter", stopAutoplay);
      carousel.addEventListener("mouseleave", startAutoplay);
    }

    // Configurar eventos de scroll para vista móvil
    const slidesContainer = carousel.querySelector(".carousel-slides");
    if (slidesContainer) {
      slidesContainer.addEventListener("scroll", () => {
        if (isMobileView) {
          // Actualizar el slide actual basado en la posición de scroll
          const scrollLeft = slidesContainer.scrollLeft;
          const slideWidth = carouselSlides[0].offsetWidth;
          const newIndex = Math.round(scrollLeft / slideWidth);

          if (newIndex !== currentSlide && newIndex < carouselSlides.length) {
            currentSlide = newIndex;

            // Actualizar indicadores si están visibles
            if (carouselIndicators.length > 0) {
              carouselIndicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                  indicator.classList.add("active");
                } else {
                  indicator.classList.remove("active");
                }
              });
            }
          }
        }
      });
    }
  }

  // Configurar eventos táctiles
  function setupTouchEvents() {
    if (!carousel) return;
    
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    carousel.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true },
    );

    function handleSwipe() {
      const swipeThreshold = 50;

      if (touchEndX < touchStartX - swipeThreshold) {
        // Deslizar a la izquierda (siguiente)
        nextSlide();
        resetAutoplay();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Deslizar a la derecha (anterior)
        prevSlide();
        resetAutoplay();
      }
    }
  }

  // Optimizar imágenes para diferentes tamaños de pantalla
  function optimizeImages() {
    carouselSlides.forEach((slide) => {
      const img = slide.querySelector(".carousel-image");
      if (img) {
        // Asegurar que la imagen cubra todo el espacio sin líneas blancas
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";

        // Centrar la imagen para diferentes tamaños de pantalla
        img.style.objectPosition = "center center";
      }
    });
  }

  // Inicializar
  setupCarouselView();
  setupControls();
  setupTouchEvents();
  optimizeImages();
  startAutoplay();

  // Actualizar vista cuando cambia el tamaño de la ventana
  window.addEventListener("resize", () => {
    setupCarouselView();
    optimizeImages();
  });
  
  // Prevenir animaciones durante el redimensionamiento
  let resizeTimer;
  window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");
    }, 400);
  });
}

// Inicializar video de fondo
function initVideoBackground() {
  const backgroundVideo = document.getElementById("background-video");
  const soundToggle = document.querySelector(".video-sound-toggle");
  const videoSlide = document.querySelector(".video-background-slide");
  
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
      soundToggle.setAttribute("aria-label", "Desactivar sonido");
      isMuted = false;
    } else {
      // Silenciar
      backgroundVideo.muted = true;
      soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
      soundToggle.setAttribute("aria-label", "Activar sonido");
      isMuted = true;
    }
  }
  
  // Evento para alternar el sonido al hacer clic en el botón
  soundToggle.addEventListener("click", function(e) {
    e.preventDefault();
    toggleSound();
  });
  
  // Detectar si el video puede reproducirse automáticamente
  function checkAutoplaySupport() {
    // Crear un video de prueba
    const testVideo = document.createElement("video");
    testVideo.muted = true;
    testVideo.playsInline = true;
    testVideo.autoplay = true;
    
    // Intentar reproducir el video
    const playPromise = testVideo.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay está soportado
          console.log("Autoplay soportado");
        })
        .catch(error => {
          // Autoplay no está soportado
          console.log("Autoplay no soportado:", error);
          document.body.classList.add("no-autoplay");
          
          // Mostrar un botón de reproducción manual
          const playButton = document.createElement("button");
          playButton.className = "video-play-manual";
          playButton.innerHTML = '<i class="fas fa-play"></i> Ver Video';
          playButton.setAttribute("aria-label", "Reproducir video");
          
          // Añadir el botón al slide
          if (videoSlide) {
            videoSlide.appendChild(playButton);
            
            // Evento para reproducir el video manualmente
            playButton.addEventListener("click", function() {
              backgroundVideo.play();
              playButton.style.display = "none";
            });
          }
        });
    }
  }
  
  // Verificar soporte de autoplay
  checkAutoplaySupport();
  
  // Manejar la visibilidad del video cuando cambia el slide
  function handleVideoVisibility() {
    const carouselIndicators = document.querySelectorAll(".carousel-indicators button");
    const carouselButtons = document.querySelectorAll(".carousel-button");
    
    // Función para pausar el video cuando no está visible
    function pauseVideoIfNotVisible() {
      // Verificar si el slide del video está activo
      const isVideoSlideActive = videoSlide.classList.contains("active");
      
      if (isVideoSlideActive) {
        // Si el slide está activo, reproducir el video
        backgroundVideo.play().catch(error => {
          console.log("Error al reproducir el video:", error);
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
        indicator.addEventListener("click", function() {
          // Esperar a que cambie el slide
          setTimeout(pauseVideoIfNotVisible, 500);
        });
      });
    }
    
    // Añadir eventos a los botones de navegación
    if (carouselButtons) {
      carouselButtons.forEach(button => {
        button.addEventListener("click", function() {
          // Esperar a que cambie el slide
          setTimeout(pauseVideoIfNotVisible, 500);
        });
      });
    }
  }
  
  // Iniciar manejo de visibilidad
  handleVideoVisibility();
  
  // Optimizaciones para dispositivos móviles
  function optimizeForMobile() {
    // Verificar si es un dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // En dispositivos móviles, usar una resolución más baja para el video
      backgroundVideo.setAttribute("playbackQuality", "small");
    }
  }
  
  // Aplicar optimizaciones para móviles
  optimizeForMobile();
  
  // Precargar el video cuando el carrusel se carga
  backgroundVideo.load();
  
  // Reiniciar el video cuando termina
  backgroundVideo.addEventListener("ended", function() {
    // Reiniciar desde el principio
    backgroundVideo.currentTime = 0;
    backgroundVideo.play().catch(error => {
      console.log("Error al reiniciar el video:", error);
    });
  });
  
  // Manejar errores de reproducción
  backgroundVideo.addEventListener("error", function(e) {
    console.error("Error en la reproducción del video:", e);
    
    // Mostrar imagen de fallback
    document.body.classList.add("no-autoplay");
  });
}

// Inicializar testimonios
function initTestimonials() {
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const testimonialIndicators = document.querySelectorAll(".testimonial-indicators .indicator");
  const prevButton = document.querySelector(".testimonial-button.prev");
  const nextButton = document.querySelector(".testimonial-button.next");
  
  if (testimonialSlides.length === 0) return;
  
  let currentSlide = 0;
  let isAnimating = false;
  let autoplayInterval;
  
  // Mostrar un slide específico
  function showSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    
    // Ocultar slide actual
    testimonialSlides[currentSlide].classList.remove("active");
    if (testimonialIndicators.length > 0) {
      testimonialIndicators[currentSlide].classList.remove("active");
    }
    
    // Mostrar nuevo slide
    currentSlide = index;
    testimonialSlides[currentSlide].classList.add("active");
    if (testimonialIndicators.length > 0) {
      testimonialIndicators[currentSlide].classList.add("active");
    }
    
    // Permitir nueva animación después de un tiempo
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
  
  // Función para ir al siguiente slide
  function nextSlide() {
    let newIndex = currentSlide + 1;
    if (newIndex >= testimonialSlides.length) {
      newIndex = 0;
    }
    showSlide(newIndex);
  }
  
  // Función para ir al slide anterior
  function prevSlide() {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
      newIndex = testimonialSlides.length - 1;
    }
    showSlide(newIndex);
  }
  
  // Iniciar autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 6000);
  }
  
  // Detener autoplay
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  // Reiniciar autoplay
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  // Configurar controles
  if (prevButton && nextButton) {
    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      prevSlide();
      resetAutoplay();
    });
    
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      nextSlide();
      resetAutoplay();
    });
  }
  
  // Configurar indicadores
  testimonialIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentSlide !== index) {
        showSlide(index);
        resetAutoplay();
      }
    });
  });
  
  // Iniciar autoplay
  startAutoplay();
}

// Inicializar animaciones de scroll
function initScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");
  
  function animateOnScroll() {
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add("active");
      }
    });
  }
  
  // Ejecutar una vez al cargar
  animateOnScroll();
  
  // Ejecutar al hacer scroll
  window.addEventListener("scroll", animateOnScroll);
  
  // Inicializar scroll suave para enlaces de anclaje
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.classList.contains("service-booking-link")) {
        // No prevenir el comportamiento predeterminado para los enlaces de reserva de servicio
        return;
      }
      
      const targetId = this.getAttribute("href");
      
      // No aplicar a enlaces de navegación móvil (ya tienen su propio manejo)
      if (this.classList.contains("mobile-nav-item")) {
        return;
      }
      
      // Manejar URLs con parámetros como #booking?service=manicura-regular
      const cleanTargetId = targetId.split("?")[0];
      const targetElement = document.querySelector(cleanTargetId);
      
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Ajustar para la altura de la navbar
          behavior: "smooth",
        });
      }
    });
  });
}

// Inicializar carga perezosa de imágenes
function initLazyLoading() {
  // Fallbacks para imágenes
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      if (!this.hasAttribute("data-error-handled")) {
        this.setAttribute("data-error-handled", "true");
        
        // Determinar el tipo de imagen y establecer un placeholder adecuado
        const width = this.width || 300;
        const height = this.height || 200;
        const alt = this.alt || "Imagen";
        
        this.src = `https://placehold.co/${width}x${height}/e6007e/ffffff?text=${encodeURIComponent(alt)}`;
      }
    });
  });
  
  // Carga perezosa de imágenes
  const lazyImages = document.querySelectorAll(".lazy-image");
  
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("lazy-loaded");
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.classList.add("lazy-loaded");
    });
  }
}

// Inicializar efectos de partículas
function initParticleEffects() {
  // Secciones donde queremos añadir partículas
  const sections = [
    { selector: ".hero-section", particleCount: 15, type: "sparkle" },
    { selector: ".cta-section", particleCount: 25, type: "bubble" },
  ];
  
  sections.forEach((section) => {
    const container = document.querySelector(section.selector);
    if (container) {
      createParticles(container, section.particleCount, section.type);
    }
  });
  
  // Crear partículas para un contenedor específico
  function createParticles(container, count, type) {
    // Verificar si el dispositivo es de gama baja (para reducir partículas)
    const isLowEndDevice = window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4;
    
    // Reducir el número de partículas en dispositivos de gama baja
    const adjustedCount = isLowEndDevice ? Math.floor(count / 2) : count;
    
    for (let i = 0; i < adjustedCount; i++) {
      const particle = document.createElement("div");
      particle.className = `particle particle-${type}`;
      
      // Estilos aleatorios para cada partícula
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Tamaño basado en el tipo
      let size;
      switch (type) {
        case "sparkle":
          size = Math.random() * 5 + 2;
          break;
        case "bubble":
          size = Math.random() * 15 + 10;
          break;
        default:
          size = Math.random() * 10 + 5;
      }
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Animación personalizada
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(particle);
    }
  }
  
  // Añadir efecto de humo/gas a la sección CTA
  const ctaSection = document.querySelector(".cta-section");
  if (ctaSection) {
    // Verificar si el dispositivo es de gama baja
    const isLowEndDevice = window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4;
    
    // No añadir efectos de humo en dispositivos de gama baja
    if (!isLowEndDevice) {
      const smokeContainer = document.createElement("div");
      smokeContainer.className = "smoke-container";
      ctaSection.prepend(smokeContainer);
      
      // Crear elementos de humo
      for (let i = 0; i < 5; i++) {
        const smoke = document.createElement("div");
        smoke.className = "smoke";
        
        // Posición aleatoria
        smoke.style.left = `${Math.random() * 100}%`;
        
        // Animación personalizada
        smoke.style.animationDuration = `${Math.random() * 10 + 15}s`;
        smoke.style.animationDelay = `${Math.random() * 10}s`;
        
        smokeContainer.appendChild(smoke);
      }
    }
  }
}
// Funcionalidad optimizada para el carrusel
document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
});

function initCarousel() {
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const carouselIndicators = document.querySelectorAll(".carousel-indicators .indicator");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");
  const carousel = document.querySelector(".carousel");

  if (carouselSlides.length === 0 || !carousel) return;

  let currentSlide = 0;
  let isAnimating = false;
  let autoplayInterval;
  let isMobileView = window.innerWidth <= 768;

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

  // Actualizar vista cuando cambia el tamaño de la ventana
  window.addEventListener("resize", () => {
    setupCarouselView();
    optimizeImages();
  });
}
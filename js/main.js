document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Mobile Menu
  initMobileMenu();

  // Scroll Animations
  initScrollAnimations();

  // Smooth scrolling for anchor links
  initSmoothScrolling();

  // Inicializar animaciones al cargar la página
  document.querySelector(".hero-content")?.classList.add("animate-fade-in");

  // Añadir fallbacks para imágenes
  initImageFallbacks();

  // Marcar el enlace activo en la navegación
  highlightActiveNavLink();

  // Efecto de reducción de la navbar al hacer scroll
  initNavbarScrollEffect();

  // Prevenir animaciones durante el redimensionamiento
  initResizeAnimationStopper();
});

// Mejorar la funcionalidad del menú móvil
function initMobileMenu() {
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const closeMenuButton = document.querySelector(".close-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link, .mobile-cta-button");

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

  function closeMobileMenu() {
    mobileMenu?.classList.remove("active");
    mobileMenuBackdrop?.classList.remove("active");
    document.body.style.overflow = "";
  }

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
}

function initScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");
  const serviceCards = document.querySelectorAll(".service-card-animate");

  function animateOnScroll() {
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("active");
      }
    });

    serviceCards.forEach((card, index) => {
      const cardPosition = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (cardPosition < windowHeight - 100) {
        setTimeout(() => {
          card.classList.add("active");
        }, 150 * index);
      }
    });
  }

  // Run once on load
  animateOnScroll();

  // Run on scroll
  window.addEventListener("scroll", animateOnScroll);
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.classList.contains("service-booking-link")) {
        // No prevenir el comportamiento predeterminado para los enlaces de reserva de servicio
        return;
      }

      e.preventDefault();

      const targetId = this.getAttribute("href");

      // Manejar URLs con parámetros como #booking?service=manicura-regular
      const cleanTargetId = targetId.split("?")[0];
      const targetElement = document.querySelector(cleanTargetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for navbar height
          behavior: "smooth",
        });
      }
    });
  });
}

function initImageFallbacks() {
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
}

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

function initNavbarScrollEffect() {
  const navbar = document.getElementById("main-navbar");

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
}

function initResizeAnimationStopper() {
  let resizeTimer;
  window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");
    }, 400);
  });
}
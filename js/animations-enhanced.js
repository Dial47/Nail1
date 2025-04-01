// Animaciones mejoradas para AngelNails
document.addEventListener("DOMContentLoaded", () => {
  // Aplicar animaciones a elementos específicos
  applyAnimations();

  // Inicializar efectos de parallax
  initParallax();

  // Inicializar efectos de hover
  initHoverEffects();

  // Inicializar animaciones de texto
  initTextAnimations();

  // Inicializar efectos de scroll
  initScrollEffects();

  // Añadir efectos de brillo
  addShimmerEffects();

  // Añadir animaciones de entrada
  addEntranceAnimations();
  
  // Restaurar animaciones para secciones específicas
  restoreSpecificAnimations();
});

// Restaurar animaciones para secciones específicas
function restoreSpecificAnimations() {
  // Animación para "Clientes Satisfechos"
  animateTestimonials();
  
  // Animación para "Te regalamos un brillo glaseado"
  animateCtaSection();
}

// Animación para la sección de testimonios
function animateTestimonials() {
  const testimonialsTitle = document.querySelector('#testimonials .section-title');
  const testimonialsDescription = document.querySelector('#testimonials .section-description');
  const testimonialSlider = document.querySelector('.testimonial-slider');
  
  if (testimonialsTitle) {
    // Añadir efecto de typing para el título
    const text = testimonialsTitle.textContent;
    testimonialsTitle.innerHTML = '';
    testimonialsTitle.style.opacity = '1';
    
    let i = 0;
    const speed = 50; // velocidad de escritura
    
    function typeWriter() {
      if (i < text.length) {
        testimonialsTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        // Cuando termine de escribir, añadir un efecto de brillo
        testimonialsTitle.classList.add('shimmer-animation');
      }
    }
    
    // Iniciar la animación cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(typeWriter, 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(testimonialsTitle);
  }
  
  if (testimonialsDescription) {
    // Añadir efecto de fade-in para la descripción
    testimonialsDescription.style.opacity = '0';
    testimonialsDescription.style.transform = 'translateY(20px)';
    testimonialsDescription.style.transition = 'opacity 1s ease, transform 1s ease';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            testimonialsDescription.style.opacity = '1';
            testimonialsDescription.style.transform = 'translateY(0)';
          }, 800);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(testimonialsDescription);
  }
  
  if (testimonialSlider) {
    // Añadir efecto de entrada para el slider
    testimonialSlider.style.opacity = '0';
    testimonialSlider.style.transform = 'scale(0.95)';
    testimonialSlider.style.transition = 'opacity 1s ease, transform 1s ease';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            testimonialSlider.style.opacity = '1';
            testimonialSlider.style.transform = 'scale(1)';
          }, 1200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(testimonialSlider);
  }
  
  // Añadir animación para las tarjetas de testimonios
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 1500 + index * 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(card);
  });
}

// Animación para la sección CTA
function animateCtaSection() {
  const ctaTitle = document.querySelector('.cta-section .cta-title');
  const ctaDescription = document.querySelector('.cta-section .cta-description');
  const ctaButton = document.querySelector('.cta-section .cta-button');
  
  if (ctaTitle) {
    // Efecto de entrada con rebote para el título
    ctaTitle.style.opacity = '0';
    ctaTitle.style.transform = 'translateY(-30px)';
    ctaTitle.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            ctaTitle.style.opacity = '1';
            ctaTitle.style.transform = 'translateY(0)';
            
            // Añadir efecto de pulsación después de la entrada
            setTimeout(() => {
              ctaTitle.classList.add('pulse-animation');
            }, 1000);
          }, 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(ctaTitle);
  }
  
  if (ctaDescription) {
    // Efecto de fade-in para la descripción
    ctaDescription.style.opacity = '0';
    ctaDescription.style.transform = 'translateY(20px)';
    ctaDescription.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            ctaDescription.style.opacity = '1';
            ctaDescription.style.transform = 'translateY(0)';
          }, 600);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(ctaDescription);
  }
  
  if (ctaButton) {
    // Efecto de entrada con rebote para el botón
    ctaButton.style.opacity = '0';
    ctaButton.style.transform = 'scale(0.8)';
    ctaButton.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            ctaButton.style.opacity = '1';
            ctaButton.style.transform = 'scale(1)';
            
            // Añadir efecto de brillo después de la entrada
            setTimeout(() => {
              ctaButton.classList.add('shimmer-animation');
            }, 1000);
          }, 900);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(ctaButton);
  }
  
  // Añadir efecto de fondo animado
  const ctaSection = document.querySelector('.cta-section');
  if (ctaSection) {
    // Crear elementos decorativos para el fondo
    for (let i = 0; i < 5; i++) {
      const circle = document.createElement('div');
      circle.className = 'decorative-circle';
      circle.style.position = 'absolute';
      circle.style.borderRadius = '50%';
      circle.style.background = 'rgba(255, 255, 255, 0.1)';
      circle.style.width = `${Math.random() * 200 + 50}px`;
      circle.style.height = circle.style.width;
      circle.style.top = `${Math.random() * 100}%`;
      circle.style.left = `${Math.random() * 100}%`;
      circle.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite`;
      circle.style.animationDelay = `${Math.random() * 5}s`;
      circle.style.opacity = '0';
      circle.style.transition = 'opacity 1s ease';
      
      ctaSection.appendChild(circle);
      
      // Mostrar los círculos cuando la sección sea visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              circle.style.opacity = '0.2';
            }, 1200 + i * 200);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(ctaSection);
    }
  }
}

// Optimizar animaciones para mejor rendimiento
function optimizeAnimations() {
  // Detectar capacidades del dispositivo
  const isLowEndDevice = window.navigator.hardwareConcurrency < 4 || 
                         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isLowEndDevice) {
    // Reducir la complejidad de las animaciones en dispositivos de gama baja
    document.body.classList.add('reduce-animations');
    
    // Añadir estilos para reducir animaciones
    const style = document.createElement('style');
    style.textContent = `
      .reduce-animations * {
        transition-duration: 0.3s !important;
        animation-duration: 0.3s !important;
      }
      
      .reduce-animations .parallax-effect {
        transform: none !important;
      }
      
      .reduce-animations .shimmer-animation {
        background: none !important;
        animation: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// Inicializar optimizaciones
optimizeAnimations();
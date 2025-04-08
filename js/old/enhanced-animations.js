/**
 * AngelNails - Enhanced Animations JavaScript File
 * Contiene animaciones avanzadas y efectos adicionales
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar efectos de parallax
    initParallaxEffects();
    
    // Inicializar efectos de texto
    initTextEffects();
    
    // Inicializar efectos de imágenes
    initImageEffects();
    
    // Inicializar efectos de hover en la galería
    initGalleryHoverEffects();
    
    // Inicializar lightbox para la galería
    initGalleryLightbox();
});

/**
 * Inicializa efectos de parallax
 */
function initParallaxEffects() {
    // Parallax en el hero section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            // Parallax para el contenido del hero
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            }
            
            // Parallax para el overlay del carousel
            const carouselOverlays = heroSection.querySelectorAll('.carousel-overlay');
            carouselOverlays.forEach(overlay => {
                overlay.style.opacity = 0.6 + (scrollPosition * 0.001);
            });
        });
    }
    
    // Parallax en la sección CTA
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
        window.addEventListener('scroll', function() {
            const rect = ctaSection.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isInView) {
                const scrollFactor = (window.innerHeight - rect.top) / window.innerHeight;
                
                // Mover los círculos decorativos
                const circles = ctaSection.querySelectorAll('.decorative-circle');
                circles.forEach((circle, index) => {
                    const direction = index % 2 === 0 ? 1 : -1;
                    const speed = (index + 1) * 0.1;
                    circle.style.transform = `translate(${direction * scrollFactor * 50 * speed}px, ${scrollFactor * 30 * speed}px)`;
                });
            }
        });
    }
}

/**
 * Inicializa efectos de texto
 */
function initTextEffects() {
    // Efecto de typing para el título del hero
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        const highlight = heroTitle.querySelector('.hero-highlight');
        
        if (highlight) {
            // Añadir efecto de brillo al texto destacado
            setInterval(() => {
                highlight.classList.add('animate-shimmer');
                
                setTimeout(() => {
                    highlight.classList.remove('animate-shimmer');
                }, 2000);
            }, 5000);
        }
    }
    
    // Efecto de resaltado en los títulos de sección al hacer scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    
    if (sectionTitles.length) {
        window.addEventListener('scroll', function() {
            sectionTitles.forEach(title => {
                const rect = title.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
                
                if (isInView) {
                    title.classList.add('highlight-animation');
                }
            });
        });
    }
}

/**
 * Inicializa efectos de imágenes
 */
function initImageEffects() {
    // Efecto de zoom suave en imágenes de la galería
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    if (galleryImages.length) {
        galleryImages.forEach(image => {
            image.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.transition = 'transform 0.5s ease';
            });
            
            image.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Efecto de revelación para imágenes al hacer scroll
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if (lazyImages.length) {
        const revealImage = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.add('reveal-animation');
                        observer.unobserve(img);
                    }
                }
            });
        };
        
        const imageObserver = new IntersectionObserver(revealImage, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px 100px 0px'
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
}

/**
 * Inicializa efectos de hover en la galería
 */
function initGalleryHoverEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryItems.length) return;
    
    galleryItems.forEach(item => {
        const overlay = item.querySelector('.gallery-overlay');
        const title = item.querySelector('.gallery-title');
        const category = item.querySelector('.gallery-category');
        
        item.addEventListener('mouseenter', function() {
            if (overlay) overlay.style.opacity = '1';
            
            if (title) {
                title.style.transform = 'translateY(0)';
                title.style.opacity = '1';
            }
            
            if (category) {
                category.style.transform = 'translateY(0)';
                category.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (overlay) overlay.style.opacity = '0';
            
            if (title) {
                title.style.transform = 'translateY(20px)';
                title.style.opacity = '0';
            }
            
            if (category) {
                category.style.transform = 'translateY(20px)';
                category.style.opacity = '0';
            }
        });
    });
}

/**
 * Inicializa el lightbox para la galería
 */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryItems.length) return;
    
    // Crear el lightbox si no existe
    let lightbox = document.querySelector('.lightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        
        const lightboxContent = document.createElement('div');
        lightboxContent.classList.add('lightbox-content');
        
        const lightboxImage = document.createElement('img');
        lightboxImage.classList.add('lightbox-image');
        
        const lightboxCaption = document.createElement('div');
        lightboxCaption.classList.add('lightbox-caption');
        
        const lightboxClose = document.createElement('button');
        lightboxClose.classList.add('lightbox-close');
        lightboxClose.innerHTML = '<i class="fas fa-times"></i>';
        
        lightboxContent.appendChild(lightboxImage);
        lightboxContent.appendChild(lightboxCaption);
        lightbox.appendChild(lightboxContent);
        lightbox.appendChild(lightboxClose);
        
        document.body.appendChild(lightbox);
    }
    
    // Elementos del lightbox
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // Abrir lightbox al hacer click en un elemento de la galería
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const image = item.querySelector('.gallery-image');
            const title = item.querySelector('.gallery-title');
            const category = item.querySelector('.gallery-category');
            
            if (image && lightboxImage) {
                // Usar la imagen original, no la versión lazy-load
                const imageSrc = image.getAttribute('data-src') || image.src;
                lightboxImage.src = imageSrc;
                
                // Mostrar título y categoría
                let captionText = '';
                if (title) captionText += title.textContent;
                if (category) captionText += ' - ' + category.textContent;
                
                lightboxCaption.textContent = captionText;
                
                // Mostrar lightbox
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Cerrar lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Cerrar lightbox al hacer click fuera de la imagen
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Cerrar lightbox con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        
        // Limpiar la imagen después de la transición
        setTimeout(() => {
            if (lightboxImage) lightboxImage.src = '';
        }, 300);
    }
}
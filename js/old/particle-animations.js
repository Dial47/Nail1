/**
 * Particle Animations
 * Handles visual particle effects with performance optimizations
 */
const ParticleEffects = (function() {
  // Configuration
  const config = {
    glitter: {
      maxParticles: 50,      // Maximum particles on screen
      mobileMaxParticles: 20, // Maximum particles on mobile
      creationInterval: 300,  // ms between random particles
      duration: 3000,         // Particle lifetime in ms
      size: { min: 2, max: 8 } // Size range
    },
    bottles: {
      images: [
        'images/nail-polish-1.png',
        'images/nail-polish-2.png',
        'images/nail-polish-3.png'
      ],
      fallbackImages: [
        'images/gallery-1.jpg',
        'images/gallery-2.jpg',
        'images/gallery-3.jpg'
      ]
    }
  };
  
  // State
  let glitterContainer = null;
  let activeParticles = 0;
  let isInitialized = false;
  let isMobile = false;
  let randomGlitterInterval = null;
  
  // Initialize the module
  function init() {
    if (isInitialized) return;
    
    // Check for mobile device
    isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Initialize glitter particles
    initGlitterParticles();
    
    // Initialize floating bottles
    initFloatingBottles();
    
    isInitialized = true;
    console.log('Particle effects initialized');
  }
  
  // Initialize glitter particles
  function initGlitterParticles() {
    glitterContainer = document.querySelector('.glitter-container');
    
    if (!glitterContainer) {
      console.warn('Glitter container not found');
      return;
    }
    
    // For touch devices, create random particles
    if (isMobile) {
      // Use fewer particles on mobile
      randomGlitterInterval = setInterval(() => {
        if (activeParticles < config.glitter.mobileMaxParticles) {
          createRandomGlitter();
        }
      }, config.glitter.creationInterval);
      
      return;
    }
    
    // For desktop, follow cursor
    document.addEventListener('mousemove', function(e) {
      // Create particles occasionally to avoid overloading
      if (Math.random() > 0.7 && activeParticles < config.glitter.maxParticles) {
        createGlitterParticle(e.clientX, e.clientY);
      }
    });
    
    // Create burst of particles on click
    document.addEventListener('click', function(e) {
      // Create particles in a circular pattern
      for (let i = 0; i < 10 && activeParticles < config.glitter.maxParticles; i++) {
        setTimeout(() => {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 30;
          const x = e.clientX + Math.cos(angle) * distance;
          const y = e.clientY + Math.sin(angle) * distance;
          
          createGlitterParticle(x, y);
        }, i * 50);
      }
    });
  }
  
  // Create a glitter particle at specified position
  function createGlitterParticle(x, y) {
    if (!glitterContainer) return;
    
    activeParticles++;
    
    const particle = document.createElement('div');
    particle.classList.add('glitter-particle');
    
    // Random size within range
    const size = Math.random() * 
      (config.glitter.size.max - config.glitter.size.min) + 
      config.glitter.size.min;
      
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Position
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Random color (pink/purple hues)
    const hue = Math.random() * 60 + 300; // 300-360 (pinks and purples)
    const saturation = Math.random() * 30 + 70; // 70-100%
    const lightness = Math.random() * 20 + 70; // 70-90%
    particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // Add to container
    glitterContainer.appendChild(particle);
    
    // Remove after animation completes
    setTimeout(() => {
      if (particle.parentNode === glitterContainer) {
        glitterContainer.removeChild(particle);
        activeParticles--;
      }
    }, config.glitter.duration);
  }
  
  // Create random glitter particles
  function createRandomGlitter() {
    if (!glitterContainer) return;
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    createGlitterParticle(x, y);
  }
  
  // Initialize floating nail polish bottles
  function initFloatingBottles() {
    const bottles = document.querySelectorAll('.floating-bottle');
    
    if (!bottles.length) {
      console.warn('Floating bottles not found');
      return;
    }
    
    // Set up each bottle
    bottles.forEach((bottle, index) => {
      // Check if bottle has background image
      if (!bottle.style.backgroundImage || bottle.style.backgroundImage === 'none') {
        // Try to use nail polish bottle image
        const bottleImage = config.bottles.images[index % config.bottles.images.length];
        
        // Create image element to check if the image exists
        const img = new Image();
        img.onload = function() {
          // Image exists, use it
          bottle.style.backgroundImage = `url(${bottleImage})`;
          bottle.style.backgroundSize = 'contain';
          bottle.style.backgroundRepeat = 'no-repeat';
          bottle.style.backgroundPosition = 'center';
        };
        
        img.onerror = function() {
          // Image doesn't exist, use fallback
          const fallbackImage = config.bottles.fallbackImages[index % config.bottles.fallbackImages.length];
          bottle.style.backgroundImage = `url(${fallbackImage})`;
          bottle.style.backgroundSize = 'cover';
          bottle.style.borderRadius = '50%';
          bottle.style.width = '40px';
          bottle.style.height = '40px';
        };
        
        img.src = bottleImage;
      }
      
      // Set random initial position
      const startX = Math.random() * 80 + 10; // 10-90%
      const startY = Math.random() * 80 + 10; // 10-90%
      
      bottle.style.left = `${startX}%`;
      bottle.style.top = `${startY}%`;
      
      // Start animation
      animateBottle(bottle);
    });
  }
  
  // Animate a bottle with random movement
  function animateBottle(bottle) {
    // Random duration between 10-20s
    const duration = Math.random() * 10 + 10;
    
    // New random position
    const newX = Math.random() * 80 + 10; // 10-90%
    const newY = Math.random() * 80 + 10; // 10-90%
    
    // Apply animation
    bottle.style.transition = `left ${duration}s ease-in-out, top ${duration}s ease-in-out`;
    bottle.style.left = `${newX}%`;
    bottle.style.top = `${newY}%`;
    
    // Continue animating
    const timeoutId = setTimeout(() => {
      // Check if bottle still exists in DOM
      if (document.body.contains(bottle)) {
        animateBottle(bottle);
      }
    }, duration * 1000);
    
    // Store timeout ID for cleanup
    bottle.dataset.timeoutId = timeoutId;
  }
  
  // Clean up resources
  function cleanup() {
    // Clear interval for random glitter
    if (randomGlitterInterval) {
      clearInterval(randomGlitterInterval);
      randomGlitterInterval = null;
    }
    
    // Clear bottle animation timeouts
    document.querySelectorAll('.floating-bottle').forEach(bottle => {
      if (bottle.dataset.timeoutId) {
        clearTimeout(parseInt(bottle.dataset.timeoutId));
      }
    });
    
    // Remove all particles
    if (glitterContainer) {
      while (glitterContainer.firstChild) {
        glitterContainer.removeChild(glitterContainer.firstChild);
      }
      activeParticles = 0;
    }
    
    isInitialized = false;
  }
  
  // Pause animations (for background tabs, etc.)
  function pause() {
    cleanup();
  }
  
  // Resume animations
  function resume() {
    if (!isInitialized) {
      init();
    }
  }
  
  // Public API
  return {
    init: init,
    cleanup: cleanup,
    pause: pause,
    resume: resume
  };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', ParticleEffects.init);

// Pause animations when page is not visible to save resources
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    ParticleEffects.pause();
  } else {
    ParticleEffects.resume();
  }
});
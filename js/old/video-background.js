/**
 * Video Background Handler
 * Manages the background video functionality with optimized performance
 */
const VideoBackgroundManager = (function() {
  // Cache DOM elements
  let backgroundVideo = null;
  let soundToggle = null;
  let videoSlide = null;
  let isMuted = true;
  let isInitialized = false;
  
  // Initialize the module
  function init() {
    if (isInitialized) return;
    
    // Get DOM references once
    backgroundVideo = document.getElementById('background-video');
    soundToggle = document.querySelector('.video-sound-toggle');
    videoSlide = document.querySelector('.video-background-slide');
    
    // Exit if required elements don't exist
    if (!backgroundVideo || !soundToggle) {
      console.warn('Video background elements not found');
      return;
    }
    
    // Set up event listeners
    soundToggle.addEventListener('click', handleSoundToggle);
    
    // Check autoplay support
    checkAutoplaySupport();
    
    // Handle video visibility based on slide changes
    handleVideoVisibility();
    
    // Optimize for mobile
    optimizeForMobile();
    
    // Set up video event handlers
    setupVideoEvents();
    
    isInitialized = true;
    console.log('Video background initialized');
  }
  
  // Toggle sound on/off
  function handleSoundToggle(e) {
    e.preventDefault();
    
    if (!backgroundVideo) return;
    
    isMuted = !isMuted;
    backgroundVideo.muted = isMuted;
    
    // Update UI
    soundToggle.innerHTML = isMuted ? 
      '<i class="fas fa-volume-mute"></i>' : 
      '<i class="fas fa-volume-up"></i>';
    
    soundToggle.setAttribute('aria-label', 
      isMuted ? 'Activar sonido' : 'Desactivar sonido');
  }
  
  // Check if autoplay is supported
  function checkAutoplaySupport() {
    if (!videoSlide) return;
    
    const testVideo = document.createElement('video');
    testVideo.muted = true;
    testVideo.playsInline = true;
    testVideo.autoplay = true;
    
    const playPromise = testVideo.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Autoplay supported');
        })
        .catch(error => {
          console.log('Autoplay not supported:', error);
          document.body.classList.add('no-autoplay');
          
          // Create manual play button
          createPlayButton();
        });
    }
  }
  
  // Create manual play button when autoplay is not supported
  function createPlayButton() {
    if (!videoSlide) return;
    
    const playButton = document.createElement('button');
    playButton.className = 'video-play-manual';
    playButton.innerHTML = '<i class="fas fa-play"></i> Ver Video';
    playButton.setAttribute('aria-label', 'Reproducir video');
    
    videoSlide.appendChild(playButton);
    
    // Add event listener
    playButton.addEventListener('click', function() {
      if (backgroundVideo) {
        backgroundVideo.play()
          .then(() => {
            playButton.style.display = 'none';
          })
          .catch(error => {
            console.error('Error playing video:', error);
          });
      }
    });
  }
  
  // Handle video visibility based on active slide
  function handleVideoVisibility() {
    if (!videoSlide || !backgroundVideo) return;
    
    const carouselIndicators = document.querySelectorAll('.carousel-indicators button');
    const carouselButtons = document.querySelectorAll('.carousel-button');
    
    // Function to check if video slide is active and play/pause accordingly
    function pauseVideoIfNotVisible() {
      const isVideoSlideActive = videoSlide.classList.contains('active');
      
      if (isVideoSlideActive) {
        backgroundVideo.play().catch(error => {
          console.warn('Error playing video:', error);
        });
      } else {
        backgroundVideo.pause();
      }
    }
    
    // Initial check
    setTimeout(pauseVideoIfNotVisible, 500);
    
    // Add event listeners to carousel controls
    if (carouselIndicators && carouselIndicators.length) {
      carouselIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
          setTimeout(pauseVideoIfNotVisible, 500);
        });
      });
    }
    
    if (carouselButtons && carouselButtons.length) {
      carouselButtons.forEach(button => {
        button.addEventListener('click', () => {
          setTimeout(pauseVideoIfNotVisible, 500);
        });
      });
    }
    
    // Use MutationObserver to detect class changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          pauseVideoIfNotVisible();
        }
      });
    });
    
    // Configure and start the observer
    observer.observe(videoSlide, { attributes: true });
  }
  
  // Optimize video for mobile devices
  function optimizeForMobile() {
    if (!backgroundVideo) return;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Use a lower resolution video source for mobile
      const currentSrc = backgroundVideo.querySelector('source')?.src;
      
      // Only replace if not already using mobile version
      if (currentSrc && !currentSrc.includes('-mobile')) {
        const mobileSource = document.createElement('source');
        const mobileSrc = currentSrc.replace('.mp4', '-mobile.mp4');
        mobileSource.src = mobileSrc;
        mobileSource.type = 'video/mp4';
        
        // Add mobile source as first child for priority
        backgroundVideo.insertBefore(mobileSource, backgroundVideo.firstChild);
      }
      
      // Set lower playback quality
      backgroundVideo.setAttribute('playbackQuality', 'small');
      
      // Reduce resolution for better performance
      if (backgroundVideo.videoWidth > 720) {
        backgroundVideo.style.maxWidth = '720px';
      }
    }
  }
  
  // Set up video event handlers
  function setupVideoEvents() {
    if (!backgroundVideo) return;
    
    // Preload video
    backgroundVideo.load();
    
    // Loop video when it ends
    backgroundVideo.addEventListener('ended', function() {
      backgroundVideo.currentTime = 0;
      backgroundVideo.play().catch(error => {
        console.warn('Error restarting video:', error);
      });
    });
    
    // Handle playback errors
    backgroundVideo.addEventListener('error', function(e) {
      console.error('Video playback error:', e);
      document.body.classList.add('no-autoplay');
      
      // Show fallback image
      const videoContainer = backgroundVideo.parentElement;
      if (videoContainer) {
        const fallbackImg = document.createElement('img');
        fallbackImg.src = 'images/video-poster.jpg';
        fallbackImg.alt = 'Video fallback image';
        fallbackImg.className = 'video-fallback';
        videoContainer.appendChild(fallbackImg);
      }
    });
  }
  
  // Update existing carousel for video background
  function updateCarouselForVideo() {
    // Get original carousel init function
    const originalInitCarousel = window.initCarousel || function() {};
    
    // Override with enhanced version
    window.initCarousel = function() {
      // Call original function
      originalInitCarousel();
      
      // Add video-specific logic
      if (backgroundVideo && videoSlide) {
        if (videoSlide.classList.contains('active')) {
          backgroundVideo.play().catch(error => {
            console.warn('Error playing video in carousel:', error);
          });
        }
      }
    };
    
    // Update if already initialized
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      window.initCarousel();
    }
  }
  
  // Public API
  return {
    init: init,
    toggleSound: handleSoundToggle,
    updateCarousel: updateCarouselForVideo
  };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', VideoBackgroundManager.init);
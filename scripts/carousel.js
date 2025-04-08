/**
 * AngelNails - Carousel JavaScript
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
  // Hero Carousel
  initCarousel('.carousel', '.carousel-slide', '.carousel-button.prev', '.carousel-button.next', '.carousel-indicators .indicator');
  
  // Function to initialize a carousel
  function initCarousel(carouselSelector, slideSelector, prevButtonSelector, nextButtonSelector, indicatorSelector) {
      const carousel = document.querySelector(carouselSelector);
      if (!carousel) return;
      
      const slides = carousel.querySelectorAll(slideSelector);
      const prevButton = carousel.querySelector(prevButtonSelector);
      const nextButton = carousel.querySelector(nextButtonSelector);
      const indicators = carousel.querySelectorAll(indicatorSelector);
      
      if (!slides.length) return;
      
      let currentSlide = 0;
      let isAnimating = false;
      let autoplayInterval;
      
      // Function to show a specific slide
      function showSlide(index) {
          if (isAnimating) return;
          isAnimating = true;
          
          // Hide current slide
          slides[currentSlide].classList.remove('active');
          if (indicators.length) indicators[currentSlide].classList.remove('active');
          
          // Show new slide
          currentSlide = index;
          slides[currentSlide].classList.add('active');
          if (indicators.length) indicators[currentSlide].classList.add('active');
          
          // Reset animation flag after transition
          setTimeout(() => {
              isAnimating = false;
          }, 1000); // Match this with your CSS transition time
      }
      
      // Function to show next slide
      function nextSlide() {
          let nextIndex = currentSlide + 1;
          if (nextIndex >= slides.length) {
              nextIndex = 0;
          }
          showSlide(nextIndex);
      }
      
      // Function to show previous slide
      function prevSlide() {
          let prevIndex = currentSlide - 1;
          if (prevIndex < 0) {
              prevIndex = slides.length - 1;
          }
          showSlide(prevIndex);
      }
      
      // Set up event listeners for controls
      if (prevButton) {
          prevButton.addEventListener('click', function() {
              clearInterval(autoplayInterval);
              prevSlide();
              startAutoplay();
          });
      }
      
      if (nextButton) {
          nextButton.addEventListener('click', function() {
              clearInterval(autoplayInterval);
              nextSlide();
              startAutoplay();
          });
      }
      
      // Set up event listeners for indicators
      if (indicators.length) {
          indicators.forEach((indicator, index) => {
              indicator.addEventListener('click', function() {
                  clearInterval(autoplayInterval);
                  showSlide(index);
                  startAutoplay();
              });
          });
      }
      
      // Start autoplay
      function startAutoplay() {
          autoplayInterval = setInterval(nextSlide, 5000);
      }
      
      // Initialize carousel
      showSlide(0);
      startAutoplay();
      
      // Pause autoplay on hover
      carousel.addEventListener('mouseenter', function() {
          clearInterval(autoplayInterval);
      });
      
      carousel.addEventListener('mouseleave', function() {
          startAutoplay();
      });
      
      // Touch support for mobile
      let touchStartX = 0;
      let touchEndX = 0;
      
      carousel.addEventListener('touchstart', function(e) {
          touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      carousel.addEventListener('touchend', function(e) {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
      }, { passive: true });
      
      function handleSwipe() {
          const swipeThreshold = 50;
          if (touchEndX < touchStartX - swipeThreshold) {
              // Swipe left, go to next slide
              clearInterval(autoplayInterval);
              nextSlide();
              startAutoplay();
          } else if (touchEndX > touchStartX + swipeThreshold) {
              // Swipe right, go to previous slide
              clearInterval(autoplayInterval);
              prevSlide();
              startAutoplay();
          }
      }
  }
});


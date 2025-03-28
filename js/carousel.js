// Carousel functionality for the hero section

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!slides.length) return;
    
    let currentIndex = 0;
    let interval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide and dot
        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        // Update current index
        currentIndex = index;
    }
    
    // Function to show the next slide
    function nextSlide() {
        let newIndex = currentIndex + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }
    
    // Function to show the previous slide
    function prevSlide() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1;
        }
        showSlide(newIndex);
    }
    
    // Set up event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
    }
    
    // Set up event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Function to start the automatic slideshow
    function startInterval() {
        interval = setInterval(nextSlide, 5000);
    }
    
    // Function to reset the interval
    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }
    
    // Initialize the carousel
    showSlide(0);
    startInterval();
});
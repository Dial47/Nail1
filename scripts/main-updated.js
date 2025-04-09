document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Import preloader and header scripts
  //loadScript("scripts/preloader.js")
  //loadScript("scripts/header.js")

  // Preloader Simplificado
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden")

      // Eliminar completamente el preloader después de la transición
      setTimeout(() => {
        preloader.remove()
      }, 800)
    }, 2500)
  }

  // Header Simplificado
  const header = document.querySelector(".site-header")

  // Cambiar estilo del header al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile Menu Toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const closeMenuButton = document.querySelector(".close-menu-button")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop")

  if (mobileMenuButton && closeMenuButton && mobileMenu && mobileMenuBackdrop) {
    mobileMenuButton.addEventListener("click", toggleMobileMenu)
    closeMenuButton.addEventListener("click", toggleMobileMenu)
    mobileMenuBackdrop.addEventListener("click", toggleMobileMenu)

    function toggleMobileMenu() {
      mobileMenu.classList.toggle("active")
      mobileMenuBackdrop.classList.toggle("active")

      if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    }

    // Close mobile menu on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 991 && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active")
        mobileMenuBackdrop.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Hero Carousel
  const carouselSlides = document.querySelectorAll(".carousel-slide")
  const carouselIndicators = document.querySelectorAll(".carousel-indicators .indicator")
  const prevButton = document.querySelector(".carousel-button.prev")
  const nextButton = document.querySelector(".carousel-button.next")
  let currentSlide = 0
  let isAnimating = false
  let autoplayInterval

  function showSlide(index) {
    if (isAnimating) return
    isAnimating = true

    // Hide current slide
    carouselSlides[currentSlide].classList.remove("active")
    carouselIndicators[currentSlide].classList.remove("active")

    // Show new slide
    currentSlide = index
    carouselSlides[currentSlide].classList.add("active")
    carouselIndicators[currentSlide].classList.add("active")

    // Reset animation flag after transition
    setTimeout(() => {
      isAnimating = false
    }, 1500)
  }

  function nextSlide() {
    let nextIndex = currentSlide + 1
    if (nextIndex >= carouselSlides.length) {
      nextIndex = 0
    }
    showSlide(nextIndex)
  }

  function prevSlide() {
    let prevIndex = currentSlide - 1
    if (prevIndex < 0) {
      prevIndex = carouselSlides.length - 1
    }
    showSlide(prevIndex)
  }

  // Initialize carousel
  if (carouselSlides.length > 0 && carouselIndicators.length > 0) {
    // Set up click events for indicators
    carouselIndicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        clearInterval(autoplayInterval)
        showSlide(index)
        startAutoplay()
      })
    })

    // Set up click events for prev/next buttons
    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => {
        clearInterval(autoplayInterval)
        prevSlide()
        startAutoplay()
      })

      nextButton.addEventListener("click", () => {
        clearInterval(autoplayInterval)
        nextSlide()
        startAutoplay()
      })
    }

    // Start autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 8000)
    }

    startAutoplay()

    // Pause autoplay on hover
    const carousel = document.querySelector(".carousel")
    if (carousel) {
      carousel.addEventListener("mouseenter", () => {
        clearInterval(autoplayInterval)
      })

      carousel.addEventListener("mouseleave", () => {
        startAutoplay()
      })
    }

    // Handle swipe for mobile
    let touchStartX = 0
    let touchEndX = 0

    if (carousel) {
      carousel.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX
      })

      carousel.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX
        handleSwipe()
      })
    }

    function handleSwipe() {
      const swipeThreshold = 50
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left, go to next slide
        clearInterval(autoplayInterval)
        nextSlide()
        startAutoplay()
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right, go to previous slide
        clearInterval(autoplayInterval)
        prevSlide()
        startAutoplay()
      }
    }
  }

  // Testimonials Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialDots = document.querySelectorAll(".testimonial-dot")
  const testimonialPrevButton = document.querySelector(".testimonial-button.prev")
  const testimonialNextButton = document.querySelector(".testimonial-button.next")
  let currentTestimonial = 0
  let isTestimonialAnimating = false
  let testimonialAutoplayInterval

  function showTestimonial(index) {
    if (isTestimonialAnimating) return
    isTestimonialAnimating = true

    // Hide current testimonial
    testimonialSlides[currentTestimonial].classList.remove("active")
    testimonialDots[currentTestimonial].classList.remove("active")

    // Show new testimonial
    currentTestimonial = index
    testimonialSlides[currentTestimonial].classList.add("active")
    testimonialDots[currentTestimonial].classList.add("active")

    // Reset animation flag after transition
    setTimeout(() => {
      isTestimonialAnimating = false
    }, 500)
  }

  function nextTestimonial() {
    let nextIndex = currentTestimonial + 1
    if (nextIndex >= testimonialSlides.length) {
      nextIndex = 0
    }
    showTestimonial(nextIndex)
  }

  function prevTestimonial() {
    let prevIndex = currentTestimonial - 1
    if (prevIndex < 0) {
      prevIndex = testimonialSlides.length - 1
    }
    showTestimonial(prevIndex)
  }

  // Initialize testimonials slider
  if (testimonialSlides.length > 0 && testimonialDots.length > 0) {
    // Set up click events for dots
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(testimonialAutoplayInterval)
        showTestimonial(index)
        startTestimonialAutoplay()
      })
    })

    // Set up click events for prev/next buttons
    if (testimonialPrevButton && testimonialNextButton) {
      testimonialPrevButton.addEventListener("click", () => {
        clearInterval(testimonialAutoplayInterval)
        prevTestimonial()
        startTestimonialAutoplay()
      })

      testimonialNextButton.addEventListener("click", () => {
        clearInterval(testimonialAutoplayInterval)
        nextTestimonial()
        startTestimonialAutoplay()
      })
    }

    // Start autoplay
    function startTestimonialAutoplay() {
      testimonialAutoplayInterval = setInterval(nextTestimonial, 5000)
    }

    startTestimonialAutoplay()

    // Pause autoplay on hover
    const testimonialSlider = document.querySelector(".testimonials-slider")
    if (testimonialSlider) {
      testimonialSlider.addEventListener("mouseenter", () => {
        clearInterval(testimonialAutoplayInterval)
      })

      testimonialSlider.addEventListener("mouseleave", () => {
        startTestimonialAutoplay()
      })
    }
  }

  // Gallery Filter
  const filterButtons = document.querySelectorAll(".filter-button")
  const galleryItems = document.querySelectorAll(".gallery-item")

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        button.classList.add("active")

        // Get filter value
        const filterValue = button.getAttribute("data-filter")

        // Filter gallery items
        galleryItems.forEach((item) => {
          if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "translateY(0) scale(1)"
            }, 50)
          } else {
            item.style.opacity = "0"
            item.style.transform = "translateY(20px) scale(0.9)"
            setTimeout(() => {
              item.style.display = "none"
            }, 300)
          }
        })
      })
    })
  }

  // Scroll to Top Button
  const scrollToTopButton = document.querySelector(".scroll-to-top")
  if (scrollToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add("active")
      } else {
        scrollToTopButton.classList.remove("active")
      }
    })

    scrollToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Reveal Sections on Scroll
  const sections = document.querySelectorAll(".section-hidden")
  const animateElements = document.querySelectorAll(".animate-on-scroll")

  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0 &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right >= 0
    )
  }

  function revealOnScroll() {
    sections.forEach((section) => {
      if (isInViewport(section)) {
        section.classList.add("section-revealed")
      }
    })

    animateElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("animated")
      }
    })
  }

  window.addEventListener("scroll", revealOnScroll)
  window.addEventListener("load", revealOnScroll)
  window.addEventListener("resize", revealOnScroll)

  // Create Hero Particles  revealOnScroll);
  window.addEventListener("resize", revealOnScroll)

  // Create Hero Particles
  const heroParticles = document.querySelector(".hero-particles")
  if (heroParticles) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div")
      particle.classList.add("hero-particle")

      // Random size between 5px and 20px
      const size = Math.random() * 15 + 5
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      particle.style.top = `${Math.random() * 100}%`
      particle.style.left = `${Math.random() * 100}%`

      // Random animation duration and delay
      const duration = Math.random() * 10 + 10
      const delay = Math.random() * 5
      particle.style.animationDuration = `${duration}s`
      particle.style.animationDelay = `${delay}s`

      heroParticles.appendChild(particle)
    }
  }

  // Create Bubbles for Hero and Contact Section
  const bubbleContainers = document.querySelectorAll(".bubbles")
  if (bubbleContainers.length > 0) {
    bubbleContainers.forEach((container) => {
      for (let i = 0; i < 10; i++) {
        const bubble = document.createElement("div")
        bubble.classList.add("bubble")

        // Random size
        const size = [40, 20, 50, 80, 35, 45, 25, 80, 15, 50][i]
        bubble.style.width = `${size}px`
        bubble.style.height = `${size}px`

        // Random position
        bubble.style.left = `${[10, 20, 35, 50, 55, 65, 75, 80, 70, 85][i]}%`

        // Random animation duration and delay
        bubble.style.animation = `rise ${[12, 8, 10, 14, 9, 11, 10, 15, 8, 13][i]}s infinite ease-in ${[0, 1, 2, 0, 1, 3, 2, 2, 1, 4][i]}s`

        container.appendChild(bubble)
      }
    })
  }

  // Glitter Effect
  const glitterContainer = document.querySelector(".glitter-container")
  if (glitterContainer) {
    // Create glitter particles on mouse move
    document.addEventListener("mousemove", (e) => {
      createGlitterParticle(e.clientX, e.clientY)
    })

    // Create glitter particles on touch move
    document.addEventListener("touchmove", (e) => {
      createGlitterParticle(e.touches[0].clientX, e.touches[0].clientY)
    })

    // Function to create a glitter particle
    function createGlitterParticle(x, y) {
      // Limit the rate of particle creation
      if (Math.random() > 0.3) return

      const particle = document.createElement("div")
      particle.classList.add("glitter-particle")

      // Random size between 3px and 8px
      const size = Math.random() * 5 + 3
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Position at mouse/touch position with slight random offset
      const offsetX = (Math.random() - 0.5) * 20
      const offsetY = (Math.random() - 0.5) * 20
      particle.style.left = `${x + offsetX}px`
      particle.style.top = `${y + offsetY}px`

      // Random color from our theme
      const colors = ["#ff3e9d", "#a742ff", "#4158ff", "#ffde59"]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      particle.style.backgroundColor = randomColor

      // Add to container
      glitterContainer.appendChild(particle)

      // Remove after animation completes
      setTimeout(() => {
        particle.remove()
      }, 3000)
    }

    // Create random particles periodically
    setInterval(() => {
      if (Math.random() > 0.7) {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        createGlitterParticle(x, y)
      }
    }, 200)
  }

  // Add sparkle effect to gallery items
  const galleryImageContainers = document.querySelectorAll(".gallery-image-container")
  galleryImageContainers.forEach((container) => {
    container.addEventListener("mouseenter", () => {
      addSparkleEffect(container)
    })
  })

  function addSparkleEffect(element) {
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement("div")
      sparkle.classList.add("gallery-sparkle")

      // Random position
      const posX = Math.random() * 100
      const posY = Math.random() * 100

      sparkle.style.left = `${posX}%`
      sparkle.style.top = `${posY}%`

      // Random size
      const size = Math.random() * 10 + 5
      sparkle.style.width = `${size}px`
      sparkle.style.height = `${size}px`

      // Random animation duration
      sparkle.style.animationDuration = `${Math.random() * 1 + 0.5}s`

      element.appendChild(sparkle)

      // Remove after animation
      setTimeout(() => {
        sparkle.remove()
      }, 1500)
    }
  }

  // Magnetic Button Effect
  const magneticButtons = document.querySelectorAll(".magnetic-button")
  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      if (window.innerWidth <= 991) return

      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const moveX = (x - centerX) / 5
      const moveY = (y - centerY) / 5

      button.style.transform = `translate(${moveX}px, ${moveY}px)`
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = ""
    })
  })

  // Initialize all animations and effects
  revealOnScroll()
})

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Preloader
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden")
    }, 1500)
  }

  // Mobile Menu Toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const closeMenuButton = document.querySelector(".close-menu-button")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop")

  if (mobileMenuButton && closeMenuButton && mobileMenu && mobileMenuBackdrop) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.add("active")
      mobileMenuBackdrop.classList.add("active")
      document.body.style.overflow = "hidden"
    })

    closeMenuButton.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      mobileMenuBackdrop.classList.remove("active")
      document.body.style.overflow = ""
    })

    mobileMenuBackdrop.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      mobileMenuBackdrop.classList.remove("active")
      document.body.style.overflow = ""
    })

    // Close mobile menu on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 991 && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active")
        mobileMenuBackdrop.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Hero Particles
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

  // Hero Carousel - Enhanced
  initCarousel(
    ".carousel",
    ".carousel-slide",
    ".carousel-button.prev",
    ".carousel-button.next",
    ".carousel-indicators .indicator",
  )

  // Function to initialize a carousel
  function initCarousel(carouselSelector, slideSelector, prevButtonSelector, nextButtonSelector, indicatorSelector) {
    const carousel = document.querySelector(carouselSelector)
    if (!carousel) return

    const slides = carousel.querySelectorAll(slideSelector)
    const prevButton = carousel.querySelector(prevButtonSelector)
    const nextButton = carousel.querySelector(nextButtonSelector)
    const indicators = carousel.querySelectorAll(indicatorSelector)

    if (!slides.length) return

    let currentSlide = 0
    let isAnimating = false
    let autoplayInterval

    // Function to show a specific slide
    function showSlide(index) {
      if (isAnimating) return
      isAnimating = true

      // Hide current slide
      slides[currentSlide].classList.remove("active")
      if (indicators.length) indicators[currentSlide].classList.remove("active")

      // Show new slide
      currentSlide = index
      slides[currentSlide].classList.add("active")

      if (indicators.length) indicators[currentSlide].classList.add("active")

      // Reset animation flag after transition
      setTimeout(() => {
        isAnimating = false
      }, 1000) // Match this with your CSS transition time
    }

    // Function to show next slide
    function nextSlide() {
      let nextIndex = currentSlide + 1
      if (nextIndex >= slides.length) {
        nextIndex = 0
      }
      showSlide(nextIndex)
    }

    // Function to show previous slide
    function prevSlide() {
      let prevIndex = currentSlide - 1
      if (prevIndex < 0) {
        prevIndex = slides.length - 1
      }
      showSlide(prevIndex)
    }

    // Set up event listeners for controls
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        clearInterval(autoplayInterval)
        prevSlide()
        startAutoplay()
      })
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        clearInterval(autoplayInterval)
        nextSlide()
        startAutoplay()
      })
    }

    // Set up event listeners for indicators
    if (indicators.length) {
      indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
          clearInterval(autoplayInterval)
          showSlide(index)
          startAutoplay()
        })
      })
    }

    // Start autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 6000)
    }

    // Initialize carousel
    showSlide(0)
    startAutoplay()

    // Pause autoplay on hover
    carousel.addEventListener("mouseenter", () => {
      clearInterval(autoplayInterval)
    })

    carousel.addEventListener("mouseleave", () => {
      startAutoplay()
    })

    // Touch support for mobile
    let touchStartX = 0
    let touchEndX = 0

    carousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      { passive: true },
    )

    carousel.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      { passive: true },
    )

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

  // Gallery Filter - Enhanced with animations
  initGalleryFilter()

  function initGalleryFilter() {
    const filterButtons = document.querySelectorAll(".filter-button")
    const galleryItems = document.querySelectorAll(".gallery-item")

    if (!filterButtons.length || !galleryItems.length) return

    // Add initial animation to gallery items
    galleryItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`
      item.classList.add("gallery-item-animated")
    })

    // Event listeners for filter buttons
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        // Get filter value
        const filterValue = this.getAttribute("data-filter")

        // Filter items with animation
        galleryItems.forEach((item, index) => {
          // Reset animation delay for staggered effect
          item.style.transitionDelay = `${index * 0.05}s`

          if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1) translateY(0)"
            }, 50)
          } else {
            item.style.opacity = "0"
            item.style.transform = "scale(0.8) translateY(20px)"
            setTimeout(() => {
              item.style.display = "none"
            }, 300)
          }
        })
      })
    })

    // Add hover effect for gallery items
    galleryItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        // Add sparkle effect on hover
        addSparkleEffect(this)
      })
    })

    function addSparkleEffect(element) {
      for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement("div")
        sparkle.classList.add("gallery-sparkle")

        // Random position around the element
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

        // Remove sparkle after animation
        setTimeout(() => {
          sparkle.remove()
        }, 1500)
      }
    }
  }

  // Testimonials Slider - Enhanced
  initTestimonialsSlider()

  function initTestimonialsSlider() {
    const slides = document.querySelectorAll(".testimonial-slide")
    const dots = document.querySelectorAll(".testimonial-dot")
    const prevButton = document.querySelector(".testimonial-button.prev")
    const nextButton = document.querySelector(".testimonial-button.next")

    if (!slides.length) return

    let currentSlide = 0
    let isAnimating = false
    let autoplayInterval

    // Function to show slide
    function showSlide(index) {
      if (isAnimating) return
      isAnimating = true

      // Hide all slides
      slides.forEach((slide) => {
        slide.classList.remove("active")
      })

      // Remove active from all dots
      if (dots.length) {
        dots.forEach((dot) => dot.classList.remove("active"))
      }

      // Show current slide
      slides[index].classList.add("active")

      // Activate current dot
      if (dots.length) {
        dots[index].classList.add("active")
      }

      // Update current index
      currentSlide = index

      // Reset animation flag after transition
      setTimeout(() => {
        isAnimating = false
      }, 500)
    }

    // Event listeners for dots
    if (dots.length) {
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          clearInterval(autoplayInterval)
          showSlide(index)
          startAutoplay()
        })
      })
    }

    // Event listeners for prev/next buttons
    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => {
        clearInterval(autoplayInterval)
        let index = currentSlide - 1
        if (index < 0) index = slides.length - 1
        showSlide(index)
        startAutoplay()
      })

      nextButton.addEventListener("click", () => {
        clearInterval(autoplayInterval)
        let index = currentSlide + 1
        if (index >= slides.length) index = 0
        showSlide(index)
        startAutoplay()
      })
    }

    // Start autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        let index = currentSlide + 1
        if (index >= slides.length) index = 0
        showSlide(index)
      }, 5000)
    }

    // Initialize slider
    showSlide(0)
    startAutoplay()

    // Pause autoplay on hover
    const testimonialSlider = document.querySelector(".testimonials-slider")
    if (testimonialSlider) {
      testimonialSlider.addEventListener("mouseenter", () => {
        clearInterval(autoplayInterval)
      })

      testimonialSlider.addEventListener("mouseleave", () => {
        startAutoplay()
      })
    }
  }

  // Glitter particles
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

  // Reveal animations for sections
  const sections = document.querySelectorAll("section.section-hidden")

  const revealSection = (entries, observer) => {
    const [entry] = entries

    if (!entry.isIntersecting) return

    entry.target.classList.add("section-revealed")
    observer.unobserve(entry.target)
  }

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  })

  sections.forEach((section) => {
    sectionObserver.observe(section)
  })

  // Animate on scroll elements
  const animateElements = document.querySelectorAll(".animate-on-scroll")

  function checkIfInView() {
    const windowHeight = window.innerHeight
    const windowTopPosition = window.scrollY
    const windowBottomPosition = windowTopPosition + windowHeight

    animateElements.forEach((element) => {
      const elementHeight = element.offsetHeight
      const elementTopPosition = element.getBoundingClientRect().top + windowTopPosition
      const elementBottomPosition = elementTopPosition + elementHeight

      if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
        element.classList.add("animated")
      }
    })
  }

  // Check elements on load, scroll and resize
  window.addEventListener("scroll", checkIfInView)
  window.addEventListener("resize", checkIfInView)
  window.addEventListener("load", checkIfInView)

  // Initial check
  checkIfInView()

  // Magnetic buttons effect
  const magneticButtons = document.querySelectorAll(".magnetic-button")

  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", function (e) {
      if (window.innerWidth <= 991) return

      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const moveX = (x - centerX) / 5
      const moveY = (y - centerY) / 5

      this.style.transform = `translate(${moveX}px, ${moveY}px)`
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })

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

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (!targetElement) return

      const headerOffset = 100
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    })
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.padding = "0.5rem 0"
        navbar.style.background = "rgba(255, 255, 255, 0.95)"
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)"
      } else {
        navbar.style.padding = "0.75rem 0"
        navbar.style.background = "var(--color-navbar-bg)"
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)"
      }
    })
  }

  // Gallery masonry layout effect
  const galleryGrid = document.querySelector(".gallery-grid")
  if (galleryGrid) {
    // Add random heights to gallery items for masonry effect
    const galleryItems = galleryGrid.querySelectorAll(".gallery-item")
    galleryItems.forEach((item) => {
      // Random aspect ratio between 0.8 and 1.2
      const aspectRatio = 0.8 + Math.random() * 0.4
      item.style.aspectRatio = aspectRatio.toString()
    })
  }

  // Add 3D tilt effect to service cards
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      if (window.innerWidth <= 991) return

      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const tiltX = (y - centerY) / 10
      const tiltY = (centerX - x) / 10

      this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-15px)`
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })

  // Add floating animation to social icons in header
  const socialIcons = document.querySelectorAll(".social-top-link")
  socialIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`
    icon.classList.add("animate-float-medium")
  })
})


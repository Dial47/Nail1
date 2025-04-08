/**
 * AngelNails - Contact Form JavaScript
 * Version: 1.0
 */

document.addEventListener("DOMContentLoaded", () => {
  // Contact Form Validation and Submission
  initContactForm();
  
  // FAQ Accordion
  initFaqAccordion();
  
  // Animate Contact Cards on Scroll
  initContactCardAnimations();
});

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");
  
  if (!contactForm || !formSuccess) return;
  
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Validate form
    if (validateForm()) {
      // Simulate form submission
      simulateFormSubmission();
    }
  });
  
  function validateForm() {
    let isValid = true;
    const requiredFields = contactForm.querySelectorAll("[required]");
    
    // Reset previous error messages
    const errorMessages = contactForm.querySelectorAll(".error-message");
    errorMessages.forEach(message => message.remove());
    
    // Check each required field
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        showError(field, "Este campo es obligatorio");
      } else if (field.type === "email" && !isValidEmail(field.value)) {
        isValid = false;
        showError(field, "Por favor, introduce un email válido");
      }
    });
    
    return isValid;
  }
  
  function showError(field, message) {
    // Remove any existing error message
    const existingError = field.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
    
    // Create and append error message
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    
    // Add error styles to field
    field.classList.add("error");
    
    // Insert error message after the field
    field.parentElement.appendChild(errorElement);
    
    // Remove error when field is focused
    field.addEventListener("focus", function() {
      this.classList.remove("error");
      const error = this.parentElement.querySelector(".error-message");
      if (error) {
        error.remove();
      }
    }, { once: true });
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function simulateFormSubmission() {
    // Show loading state
    const submitButton = contactForm.querySelector("button[type='submit']");
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
      // Hide form and show success message
      contactForm.style.display = "none";
      formSuccess.style.display = "block";
      
      // Reset form for future submissions
      contactForm.reset();
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
      
      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 2000);
  }
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  
  if (!faqItems.length) return;
  
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    
    // Set initial height for animation
    answer.style.height = "0px";
    
    question.addEventListener("click", function() {
      // Toggle active class
      const isActive = item.classList.contains("active");
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer").style.height = "0px";
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
        answer.style.height = "0px";
      } else {
        item.classList.add("active");
        answer.style.height = answer.scrollHeight + "px";
      }
    });
  });
}

// Contact Card Animations
function initContactCardAnimations() {
  const contactCards = document.querySelectorAll(".contact-card");
  
  if (!contactCards.length) return;
  
  // Add hover effects
  contactCards.forEach(card => {
    card.addEventListener("mouseenter", function() {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 20px 40px rgba(255, 62, 157, 0.15)";
      
      // Animate icon
      const icon = this.querySelector(".contact-icon");
      if (icon) {
        icon.style.transform = "rotate(10deg) scale(1.1)";
      }
    });
    
    card.addEventListener("mouseleave", function() {
      this.style.transform = "";
      this.style.boxShadow = "";
      
      // Reset icon
      const icon = this.querySelector(".contact-icon");
      if (icon) {
        icon.style.transform = "";
      }
    });
  });
  
  // Animate cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  contactCards.forEach(card => {
    observer.observe(card);
  });
}

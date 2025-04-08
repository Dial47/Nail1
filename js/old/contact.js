// Contact page functionality

document.addEventListener("DOMContentLoaded", () => {
  // Contact form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // In a real application, you would send this data to a server
      console.log("Contact form submitted:", { name, email, subject, message })

      // Show success message
      alert("¡Mensaje enviado con éxito! Te responderemos lo antes posible.")

      // Reset form
      contactForm.reset()
    })
  }

  // Add Google Maps (in a real implementation)
  const mapPlaceholder = document.querySelector(".map-placeholder")

  if (mapPlaceholder) {
    // In a real implementation, you would initialize Google Maps here
    // For now, we'll just add a placeholder image
    mapPlaceholder.innerHTML = `
            <img src="/placeholder.svg?height=300&width=600" alt="Mapa de ubicación" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
            <p style="text-align: center; margin-top: 10px;">Calle Principal 123, Ciudad</p>
        `
  }

  // WhatsApp button
  const whatsappButton = document.querySelector(".btn-whatsapp")

  if (whatsappButton) {
    whatsappButton.addEventListener("click", (e) => {
      // You can customize the WhatsApp message here
      const message = encodeURIComponent("Hola, me gustaría obtener más información sobre sus servicios.")
      const url = `https://wa.me/123456789?text=${message}`

      // Open WhatsApp in a new tab
      window.open(url, "_blank")
    })
  }

  // Scroll animation
  const animateElements = document.querySelectorAll(".animate-on-scroll")

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight * 0.9) {
        element.classList.add("active")
      }
    })
  }

  // Check elements on load
  checkScroll()

  // Check elements on scroll
  window.addEventListener("scroll", checkScroll)
})


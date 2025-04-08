/**
 * AngelNails - Calendly Integration JavaScript
 * Version: 1.0
 */

;(() => {
  // Configuración
  const DEFAULT_URL = "https://calendly.com/angelnails326/30min"
  const CONTAINER_ID = "calendly-container"

  // Función principal de inicialización
  function init() {
    console.log("Inicializando integración de Calendly")

    // Configurar botones
    setupButtons()

    // Mostrar mensaje de carga inicial
    showLoading()

    // Cargar el primer calendario después de un breve retraso
    setTimeout(() => {
      const firstButton = document.querySelector(".calendly-service-button")
      if (firstButton) {
        firstButton.click()
      } else {
        embedCalendly(DEFAULT_URL)
      }
    }, 1000)
  }

  // Función para configurar los botones
  function setupButtons() {
    const buttons = document.querySelectorAll(".calendly-service-button")

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remover clase activa de todos los botones
        buttons.forEach((btn) => btn.classList.remove("active"))

        // Añadir clase activa al botón seleccionado
        this.classList.add("active")

        // Obtener la URL de Calendly
        const url = this.getAttribute("data-url")

        if (url) {
          embedCalendly(url)
        } else {
          showError("Este servicio no tiene un calendario configurado")
        }
      })
    })
  }

  // Función para mostrar mensaje de carga
  function showLoading() {
    const container = document.getElementById(CONTAINER_ID)
    if (container) {
      container.innerHTML = `
        <div class="calendly-loading">
          <i class="fas fa-spinner fa-spin"></i>
          <p>Cargando calendario...</p>
        </div>
      `
    }
  }

  // Función para mostrar mensaje de error
  function showError(message) {
    const container = document.getElementById(CONTAINER_ID)
    if (container) {
      container.innerHTML = `
        <div class="calendly-error">
          <p>${message || "Hubo un problema al cargar el calendario. Por favor, intenta de nuevo más tarde o contáctanos directamente."}</p>
          <button class="retry-button" onclick="window.location.reload()">Intentar de nuevo</button>
        </div>
      `
    }
  }

  // Función para incrustar Calendly usando un iframe directamente
  function embedCalendly(url) {
    if (!url) {
      showError("URL de calendario no válida")
      return
    }

    console.log("Incrustando Calendly con URL:", url)
    showLoading()

    const container = document.getElementById(CONTAINER_ID)
    if (!container) {
      console.error("No se encontró el contenedor de Calendly")
      return
    }

    // Crear un iframe directamente en lugar de usar el widget de Calendly
    setTimeout(() => {
      // Asegurarse de que la URL tenga el parámetro de incrustación
      let embedUrl = url
      if (url.indexOf("?") === -1) {
        embedUrl +=
          "?embed=true&hideCookieBanner=true&hideEventTypeDetails=false&hideGdprBanner=true&primaryColor=ff3e9d"
      } else if (url.indexOf("embed=") === -1) {
        embedUrl +=
          "&embed=true&hideCookieBanner=true&hideEventTypeDetails=false&hideGdprBanner=true&primaryColor=ff3e9d"
      }

      // Crear el iframe
      container.innerHTML = `
        <iframe 
          src="${embedUrl}" 
          width="100%" 
          height="630" 
          frameborder="0" 
          title="Selecciona una fecha y hora para tu cita"
          style="min-height: 630px; width: 100%; border: none;"
        ></iframe>
      `

      // Añadir evento para manejar errores de carga del iframe
      const iframe = container.querySelector("iframe")
      if (iframe) {
        iframe.onerror = () => {
          showError("No se pudo cargar el calendario. Por favor, intenta de nuevo más tarde.")
        }
      }
    }, 500)
  }

  // Iniciar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }
})()

// Función para seleccionar un servicio desde otras partes del sitio
function selectCalendlyService(serviceId) {
  const button = document.querySelector(`.calendly-service-button[data-service="${serviceId}"]`)
  if (button) {
    button.click()

    const bookingSection = document.getElementById("booking")
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" })
    }

    return true
  }
  return false
}
// Configurar enlaces de reserva
;(() => {
  function setupLinks() {
    const links = document.querySelectorAll(".service-booking-link")
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        const serviceId = this.getAttribute("data-service")
        if (serviceId) {
          if (!selectCalendlyService(serviceId)) {
            const bookingSection = document.getElementById("booking")
            if (bookingSection) {
              bookingSection.scrollIntoView({ behavior: "smooth" })
            }
          }
        }
      })
    })
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupLinks)
  } else {
    setupLinks()
  }
})()

// Info Cards Animation
function initInfoCards() {
  const infoCards = document.querySelectorAll(".info-card")

  if (!infoCards.length) return

  infoCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
      this.style.boxShadow = "0 20px 40px rgba(255, 62, 157, 0.15)"

      // Animate icon
      const icon = this.querySelector(".info-icon")
      if (icon) {
        icon.style.transform = "rotate(10deg) scale(1.1)"
      }
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.boxShadow = ""

      // Reset icon
      const icon = this.querySelector(".info-icon")
      if (icon) {
        icon.style.transform = ""
      }
    })
  })
}

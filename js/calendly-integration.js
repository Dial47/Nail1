document.addEventListener("DOMContentLoaded", () => {
  // Configuración de Calendly
  const calendlyContainer = document.getElementById("calendly-container")
  const serviceButtons = document.querySelectorAll(".calendly-service-button")
  const serviceBookingLinks = document.querySelectorAll(".service-booking-link")

  // URL base de Calendly
  const calendlyUser = "badiego47"

  // Estado para rastrear intentos de carga
  let loadAttempts = 0
  const maxLoadAttempts = 3

  // Función para cargar el script de Calendly
  function loadCalendlyScript(callback) {
    // Eliminar script anterior si existe
    const oldScript = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')
    if (oldScript) {
      oldScript.remove()
    }

    // Crear nuevo script
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    script.onload = () => {
      // Pequeña pausa para asegurar que Calendly esté completamente cargado
      setTimeout(() => {
        if (typeof Calendly !== "undefined") {
          callback()
        } else {
          retryLoading(callback)
        }
      }, 300)
    }

    // Manejar error de carga
    script.onerror = () => {
      retryLoading(callback)
    }

    document.head.appendChild(script)
  }

  // Función para reintentar la carga
  function retryLoading(callback) {
    loadAttempts++
    if (loadAttempts < maxLoadAttempts) {
      setTimeout(() => {
        loadCalendlyScript(callback)
      }, 1000)
    } else {
      showError()
    }
  }

  // Mostrar mensaje de error
  function showError() {
    calendlyContainer.innerHTML = `
      <div class="calendly-placeholder">
        <p>No se pudo cargar el calendario. Por favor, intenta de nuevo.</p>
        <button id="retry-calendly" class="cta-button">Reintentar</button>
      </div>
    `

    document.getElementById("retry-calendly").addEventListener("click", () => {
      loadAttempts = 0
      initCalendly()
    })
  }

  // Función para cargar el widget de Calendly con una URL específica
  function loadCalendlyWidget(url) {
    if (!calendlyContainer) return

    // Ajustar altura del widget según el tamaño de la pantalla
    const setCalendlyHeight = () => {
      const viewportHeight = window.innerHeight
      const containerWidth = calendlyContainer.offsetWidth
      let height

      if (window.innerWidth <= 480) {
        height = viewportHeight * 0.7 // 70% de la altura en móviles pequeños
      } else if (window.innerWidth <= 768) {
        height = viewportHeight * 0.8 // 80% de la altura en tablets
      } else {
        height = 700 // Altura predeterminada para escritorio
      }

      // Asegurar una altura mínima
      height = Math.max(height, 400)

      calendlyContainer.style.height = `${height}px`
      calendlyContainer.style.minHeight = `${height}px`
    }

    // Establecer altura inicial
    setCalendlyHeight()

    // Actualizar altura al cambiar el tamaño de la ventana
    window.addEventListener("resize", setCalendlyHeight)

    try {
      if (typeof Calendly !== "undefined" && Calendly.initInlineWidget) {
        // Limpiar el contenedor antes de inicializar el widget
        while (calendlyContainer.firstChild) {
          calendlyContainer.removeChild(calendlyContainer.firstChild)
        }

        Calendly.initInlineWidget({
          url: url,
          parentElement: calendlyContainer,
          prefill: {},
          utm: {},
        })

        // Añadir clase para indicar que se ha cargado
        calendlyContainer.classList.add("loaded")

        // Resetear contador de intentos
        loadAttempts = 0

        // Añadir clase para estilos responsive
        calendlyContainer.classList.add("calendly-responsive")
      } else {
        retryLoading(() => {
          loadCalendlyWidget(url)
        })
      }
    } catch (error) {
      console.error("Error al inicializar Calendly:", error)
      retryLoading(() => {
        loadCalendlyWidget(url)
      })
    }
  }

  // Cargar el widget de Calendly por defecto (vista general)
  function loadDefaultCalendly() {
    loadCalendlyWidget(`https://calendly.com/${calendlyUser}`)
  }

  // Inicializar Calendly
  function initCalendly() {
    if (typeof Calendly !== "undefined") {
      // Si Calendly ya está cargado, cargar el widget por defecto
      if (serviceButtons.length > 0) {
        serviceButtons[0].click()
      } else {
        loadDefaultCalendly()
      }
    } else {
      // Si Calendly no está cargado, cargar el script
      loadCalendlyScript(() => {
        if (serviceButtons.length > 0) {
          serviceButtons[0].click()
        } else {
          loadDefaultCalendly()
        }
      })
    }
  }

  // Añadir event listeners a los botones de servicio
  serviceButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover clase activa de todos los botones
      serviceButtons.forEach((btn) => {
        btn.classList.remove("active")
        btn.classList.remove("glow")
      })

      // Añadir clase activa al botón seleccionado
      this.classList.add("active")

      // Añadir efecto de pulsación
      this.classList.add("glow")
      setTimeout(() => {
        this.classList.remove("glow")
      }, 1000)

      // Cargar el widget de Calendly con la URL del servicio seleccionado
      loadCalendlyWidget(this.dataset.url)
    })
  })

  // Añadir event listeners a los enlaces de reserva en las tarjetas de servicio
  serviceBookingLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Obtener el servicio seleccionado
      const service = this.dataset.service

      // Encontrar el botón correspondiente
      const targetButton = Array.from(serviceButtons).find((button) => button.dataset.url.includes(service))

      // Si se encuentra el botón, simular un clic en él
      if (targetButton) {
        // Desplazarse a la sección de reservas
        document.querySelector("#booking").scrollIntoView({
          behavior: "smooth",
        })

        // Pequeña pausa para asegurar que el desplazamiento ha terminado
        setTimeout(() => {
          targetButton.click()
        }, 800)
      } else {
        // Si no se encuentra el botón, cargar el widget por defecto
        loadDefaultCalendly()
      }
    })
  })

  // Añadir efectos de hover a los botones de servicio
  serviceButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "translateY(-3px)"
        this.style.boxShadow = "0 7px 14px rgba(255, 51, 133, 0.2)"
      }
    })

    button.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = ""
        this.style.boxShadow = ""
      }
    })
  })

  // Inicializar Calendly cuando el DOM esté cargado
  if (calendlyContainer) {
    // Iniciar con un mensaje de carga en el contenedor
    calendlyContainer.innerHTML = `
      <div class="calendly-placeholder">
        <p>Cargando calendario, por favor espera...</p>
        <div class="loading-spinner"></div>
      </div>
    `

    // Inicializar después de un breve retraso
    setTimeout(initCalendly, 500)
  }
})


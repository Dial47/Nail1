/**
 * AngelNails - Video Player JavaScript
 * Version: 1.0
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar el reproductor de video
  initVideoPlayer()
})

function initVideoPlayer() {
  const videoButtons = document.querySelectorAll(".video-play-button")
  const videoModal = document.getElementById("video-modal")
  const videoContainer = document.getElementById("video-container")
  const closeButton = document.querySelector(".video-modal-close")

  if (!videoButtons.length || !videoModal || !videoContainer) {
    console.error("No se encontraron elementos necesarios para el reproductor de video")
    return
  }

  console.log("Inicializando reproductor de video con", videoButtons.length, "botones")

  // Videos de demostración (en un entorno real, estos vendrían de una base de datos)
  const videoSources = {
    "video-1": {
      title: "Tutorial de Uñas Acrílicas",
      src: "img/gallery/VID-20250317-WA0004.mp4", // Video de ejemplo
      type: "video/mp4",
      poster: "img/gallery/g002.webp",
    },
    "video-2": {
      title: "Diseño de Nail Art Floral",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Video de ejemplo
      type: "video/mp4",
      poster: "img/gallery/g003.webp",
    },
    "video-3": {
      title: "Efecto Espejo en Gel",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Video de ejemplo
      type: "video/mp4",
      poster: "img/gallery/g004.webp",
    },
  }

  // Abrir modal de video cuando se hace clic en el botón de reproducción
  videoButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      const videoId = this.getAttribute("data-video-id")
      console.log("Abriendo video:", videoId)

      if (videoSources[videoId]) {
        const videoData = videoSources[videoId]

        // Crear elemento de video
        const videoElement = document.createElement("video")
        videoElement.className = "video-player"
        videoElement.controls = true
        videoElement.autoplay = true
        videoElement.poster = videoData.poster
        videoElement.style.width = "100%"
        videoElement.style.height = "100%"
        videoElement.style.position = "absolute"
        videoElement.style.top = "0"
        videoElement.style.left = "0"
        videoElement.style.objectFit = "contain"
        videoElement.style.backgroundColor = "#000"

        // Crear source para el video
        const sourceElement = document.createElement("source")
        sourceElement.src = videoData.src
        sourceElement.type = videoData.type

        // Mensaje de fallback
        videoElement.innerHTML = "Tu navegador no soporta la reproducción de videos."

        // Añadir source al video
        videoElement.appendChild(sourceElement)

        // Limpiar contenedor y añadir el video
        videoContainer.innerHTML = ""
        videoContainer.appendChild(videoElement)

        // Mostrar modal
        videoModal.style.display = "flex"
        document.body.style.overflow = "hidden"

        // Animar apertura del modal
        setTimeout(() => {
          videoModal.style.opacity = "1"
        }, 10)
      } else {
        console.error("Video no encontrado:", videoId)

        // Mostrar mensaje de error
        videoContainer.innerHTML = `
          <div class="video-error">
            <i class="fas fa-exclamation-circle"></i>
            <p>Lo sentimos, el video no está disponible en este momento.</p>
          </div>
        `

        // Mostrar modal
        videoModal.style.display = "flex"
        document.body.style.overflow = "hidden"

        // Animar apertura del modal
        setTimeout(() => {
          videoModal.style.opacity = "1"
        }, 10)
      }
    })
  })

  // Cerrar modal de video
  if (closeButton) {
    closeButton.addEventListener("click", closeVideoModal)
  }

  // Cerrar modal al hacer clic fuera del contenido
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      closeVideoModal()
    }
  })

  // Cerrar modal con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal.style.display === "flex") {
      closeVideoModal()
    }
  })

  function closeVideoModal() {
    console.log("Cerrando modal de video")

    // Detener reproducción de video si existe
    const videoElement = videoContainer.querySelector("video")
    if (videoElement) {
      videoElement.pause()
    }

    // Animar cierre del modal
    videoModal.style.opacity = "0"

    // Ocultar modal después de la animación
    setTimeout(() => {
      videoModal.style.display = "none"
      videoContainer.innerHTML = ""
      document.body.style.overflow = ""
    }, 300)
  }
}

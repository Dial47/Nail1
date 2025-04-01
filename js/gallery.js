// Funcionalidad mejorada para la galería
document.addEventListener("DOMContentLoaded", () => {
  initGallery()
})

function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item")
  if (galleryItems.length === 0) return

  // Crear elementos para la vista expandida
  createGalleryViewElements()

  // Inicializar cada elemento de la galería
  galleryItems.forEach((item, index) => {
    item.setAttribute("data-index", index)

    // Cargar imágenes con efecto suave
    const img = item.querySelector(".gallery-image")
    if (img) {
      img.classList.add("blur-load")

      // Cuando la imagen se carga completamente
      if (img.complete) {
        handleImageLoaded(img, item)
      } else {
        img.addEventListener("load", () => {
          handleImageLoaded(img, item)
        })
      }
    }

    // Añadir efecto de hover con inclinación 3D más suave
    item.addEventListener("mousemove", handleItemHover)
    item.addEventListener("mouseleave", resetItemTransform)

    // Abrir vista expandida al hacer clic
    item.addEventListener("click", expandGalleryItem)
  })
}

function handleImageLoaded(img, item) {
  // Añadir clases para transiciones suaves
  setTimeout(() => {
    img.classList.add("loaded")
    item.classList.add("loaded")
  }, 100)
}

function createGalleryViewElements() {
  // Crear backdrop
  const backdrop = document.createElement("div")
  backdrop.className = "gallery-backdrop"
  document.body.appendChild(backdrop)

  // Crear botón de cierre
  const closeButton = document.createElement("button")
  closeButton.className = "gallery-close-button"
  closeButton.innerHTML = '<i class="fas fa-times"></i>'
  closeButton.addEventListener("click", closeExpandedView)
  document.body.appendChild(closeButton)

  // Crear botones de navegación
  const prevButton = document.createElement("button")
  prevButton.className = "gallery-nav-button prev"
  prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>'
  prevButton.addEventListener("click", () => navigateGallery("prev"))
  document.body.appendChild(prevButton)

  const nextButton = document.createElement("button")
  nextButton.className = "gallery-nav-button next"
  nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>'
  nextButton.addEventListener("click", () => navigateGallery("next"))
  document.body.appendChild(nextButton)

  // Cerrar al hacer clic en el backdrop
  backdrop.addEventListener("click", closeExpandedView)
}

function handleItemHover(e) {
  const item = e.currentTarget
  const rect = item.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const deltaX = (x - centerX) / centerX
  const deltaY = (y - centerY) / centerY

  // Efecto 3D más sutil
  item.style.transform = `perspective(1000px) rotateX(${deltaY * -2}deg) rotateY(${deltaX * 2}deg) scale3d(1.01, 1.01, 1.01)`
  item.style.transition = "transform 0.5s ease-out" // Transición más lenta
}

function resetItemTransform(e) {
  const item = e.currentTarget
  item.style.transform = ""
  item.style.transition = "transform 0.8s ease-out" // Transición más lenta para volver
}

function expandGalleryItem(e) {
  const item = e.currentTarget
  const index = Number.parseInt(item.getAttribute("data-index"))

  // Activar backdrop y botones con transición suave
  document.querySelector(".gallery-backdrop").classList.add("active")

  // Pequeña pausa para que la transición sea más suave
  setTimeout(() => {
    document.querySelector(".gallery-close-button").classList.add("active")
    document.querySelector(".gallery-nav-button.prev").classList.add("active")
    document.querySelector(".gallery-nav-button.next").classList.add("active")
  }, 300)

  // Guardar el índice actual en el backdrop para la navegación
  document.querySelector(".gallery-backdrop").setAttribute("data-current-index", index)

  // Expandir el elemento con transición suave
  item.classList.add("expanded")

  // Deshabilitar scroll
  document.body.style.overflow = "hidden"

  // Añadir botón de cierre dentro del elemento expandido si no existe
  if (!item.querySelector(".item-close-button")) {
    const itemCloseButton = document.createElement("button")
    itemCloseButton.className = "item-close-button"
    itemCloseButton.innerHTML = '<i class="fas fa-times"></i>'
    itemCloseButton.style.position = "absolute"
    itemCloseButton.style.top = "20px"
    itemCloseButton.style.right = "20px"
    itemCloseButton.style.zIndex = "1201"
    itemCloseButton.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
    itemCloseButton.style.color = "white"
    itemCloseButton.style.border = "none"
    itemCloseButton.style.borderRadius = "50%"
    itemCloseButton.style.width = "40px"
    itemCloseButton.style.height = "40px"
    itemCloseButton.style.cursor = "pointer"
    itemCloseButton.style.transition = "all 0.5s ease" // Transición más lenta
    itemCloseButton.addEventListener("click", (e) => {
      e.stopPropagation()
      closeExpandedView()
    })
    item.appendChild(itemCloseButton)
  }
}

function closeExpandedView() {
  // Desactivar botones primero para una transición escalonada
  document.querySelector(".gallery-close-button").classList.remove("active")
  document.querySelector(".gallery-nav-button.prev").classList.remove("active")
  document.querySelector(".gallery-nav-button.next").classList.remove("active")

  // Pequeña pausa antes de cerrar el backdrop
  setTimeout(() => {
    document.querySelector(".gallery-backdrop").classList.remove("active")
  }, 200)

  // Cerrar el elemento expandido
  const expandedItem = document.querySelector(".gallery-item.expanded")
  if (expandedItem) {
    expandedItem.classList.remove("expanded")

    // Eliminar el botón de cierre interno si existe
    const itemCloseButton = expandedItem.querySelector(".item-close-button")
    if (itemCloseButton) {
      expandedItem.removeChild(itemCloseButton)
    }
  }

  // Habilitar scroll después de una pequeña pausa
  setTimeout(() => {
    document.body.style.overflow = ""
  }, 300)
}

function navigateGallery(direction) {
  const backdrop = document.querySelector(".gallery-backdrop")
  const currentIndex = Number.parseInt(backdrop.getAttribute("data-current-index"))
  const galleryItems = document.querySelectorAll(".gallery-item")

  // Cerrar el elemento actual con transición suave
  const expandedItem = document.querySelector(".gallery-item.expanded")
  if (expandedItem) {
    expandedItem.style.opacity = "0"
    expandedItem.style.transition = "opacity 0.3s ease"

    setTimeout(() => {
      expandedItem.classList.remove("expanded")
      expandedItem.style.opacity = ""
      expandedItem.style.transition = ""

      // Eliminar el botón de cierre interno si existe
      const itemCloseButton = expandedItem.querySelector(".item-close-button")
      if (itemCloseButton) {
        expandedItem.removeChild(itemCloseButton)
      }

      // Calcular el nuevo índice
      let newIndex
      if (direction === "next") {
        newIndex = (currentIndex + 1) % galleryItems.length
      } else {
        newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
      }

      // Actualizar el índice actual
      backdrop.setAttribute("data-current-index", newIndex)

      // Expandir el nuevo elemento con una pequeña pausa
      const newItem = galleryItems[newIndex]
      newItem.style.opacity = "0"
      newItem.classList.add("expanded")

      setTimeout(() => {
        newItem.style.opacity = "1"
        newItem.style.transition = "opacity 0.5s ease"

        // Añadir botón de cierre dentro del elemento expandido
        if (!newItem.querySelector(".item-close-button")) {
          const itemCloseButton = document.createElement("button")
          itemCloseButton.className = "item-close-button"
          itemCloseButton.innerHTML = '<i class="fas fa-times"></i>'
          itemCloseButton.style.position = "absolute"
          itemCloseButton.style.top = "20px"
          itemCloseButton.style.right = "20px"
          itemCloseButton.style.zIndex = "1201"
          itemCloseButton.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
          itemCloseButton.style.color = "white"
          itemCloseButton.style.border = "none"
          itemCloseButton.style.borderRadius = "50%"
          itemCloseButton.style.width = "40px"
          itemCloseButton.style.height = "40px"
          itemCloseButton.style.cursor = "pointer"
          itemCloseButton.style.transition = "all 0.5s ease"
          itemCloseButton.addEventListener("click", (e) => {
            e.stopPropagation()
            closeExpandedView()
          })
          newItem.appendChild(itemCloseButton)
        }
      }, 100)
    }, 300)
  }
}

// Añadir soporte para teclas de navegación
document.addEventListener("keydown", (e) => {
  if (document.querySelector(".gallery-item.expanded")) {
    if (e.key === "Escape") {
      closeExpandedView()
    } else if (e.key === "ArrowRight") {
      navigateGallery("next")
    } else if (e.key === "ArrowLeft") {
      navigateGallery("prev")
    }
  }
})

// Estabilizar la galería al cargar
window.addEventListener("load", () => {
  // Asegurar que todas las imágenes tengan el mismo tamaño
  const galleryItems = document.querySelectorAll(".gallery-item")
  galleryItems.forEach((item) => {
    item.classList.add("loaded")
  })
})

// Prevenir desorden en la galería durante el redimensionamiento
let resizeTimer
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer)
  document.body.classList.add("resize-animation-stopper")

  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper")
  }, 400)
})


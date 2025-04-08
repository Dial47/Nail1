/**
 * AngelNails - Nail Color Picker JavaScript File
 * Contiene la funcionalidad del selector de colores de uñas
 */

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar el selector de colores
    initColorPicker()
  })
  
  /**
   * Inicializa el selector de colores de uñas
   */
  function initColorPicker() {
    const colorSwatches = document.querySelectorAll(".color-swatch")
    const nails = document.querySelectorAll(".nail")
    const colorNameDisplay = document.querySelector(".color-name-display")
  
    if (!colorSwatches.length || !nails.length) return
  
    // Marcar el color inicial como activo
    const defaultColor = "#ec4899"
    const defaultName = "Rosa Intenso"
    const defaultSwatch = document.querySelector(`.color-swatch[data-color="${defaultColor}"]`)
  
    if (defaultSwatch) {
      defaultSwatch.classList.add("active")
      if (colorNameDisplay) {
        colorNameDisplay.textContent = `${defaultColor} - ${defaultName}`
      }
    }
  
    // Aplicar color al hacer click en una muestra
    colorSwatches.forEach((swatch) => {
      swatch.addEventListener("click", function () {
        // Obtener el color y nombre seleccionados
        const color = this.getAttribute("data-color")
        const colorName = this.getAttribute("data-name")
  
        // Quitar la clase active de todas las muestras
        colorSwatches.forEach((s) => s.classList.remove("active"))
  
        // Añadir la clase active a la muestra seleccionada
        this.classList.add("active")
  
        // Actualizar el nombre del color
        if (colorNameDisplay) {
          colorNameDisplay.textContent = `${color} - ${colorName}`
  
          // Animar el cambio de texto
          colorNameDisplay.style.transform = "translateY(-10px)"
          colorNameDisplay.style.opacity = "0"
  
          setTimeout(() => {
            colorNameDisplay.style.transition = "none"
            colorNameDisplay.style.transform = "translateY(10px)"
  
            setTimeout(() => {
              colorNameDisplay.style.transition = "all 0.3s ease"
              colorNameDisplay.style.transform = "translateY(0)"
              colorNameDisplay.style.opacity = "1"
            }, 50)
          }, 300)
        }
  
        // Aplicar el color a todas las uñas con una pequeña animación
        nails.forEach((nail, index) => {
          // Retrasar la aplicación del color para crear un efecto en cascada
          setTimeout(() => {
            // Guardar el color anterior para la transición
            const oldColor = nail.style.backgroundColor
  
            // Aplicar el nuevo color
            nail.style.backgroundColor = color
  
            // Añadir un efecto de brillo
            nail.classList.add("color-change-animation")
  
            // Quitar la clase de animación después de completarse
            setTimeout(() => {
              nail.classList.remove("color-change-animation")
            }, 500)
          }, index * 150)
        })
      })
    })
  
    // Añadir efecto de hover a las muestras de color
    colorSwatches.forEach((swatch) => {
      swatch.addEventListener("mouseenter", function () {
        if (!this.classList.contains("active")) {
          this.style.transform = "scale(1.15)"
          this.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)"
        }
      })
  
      swatch.addEventListener("mouseleave", function () {
        if (!this.classList.contains("active")) {
          this.style.transform = "scale(1)"
          this.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)"
        }
      })
    })
  
    // Añadir efecto de brillo a las uñas
    nails.forEach((nail) => {
      // Crear el efecto de brillo
      const shine = document.createElement("div")
      shine.classList.add("nail-shine")
      nail.appendChild(shine)
  
      // Animar el brillo al hacer hover
      nail.addEventListener("mouseenter", () => {
        shine.style.opacity = "1"
        shine.style.transform = "translateX(100%)"
      })
  
      nail.addEventListener("mouseleave", () => {
        shine.style.opacity = "0"
        shine.style.transform = "translateX(-100%)"
  
        // Resetear para la próxima animación
        setTimeout(() => {
          shine.style.transition = "none"
          shine.style.transform = "translateX(-100%)"
  
          setTimeout(() => {
            shine.style.transition = "transform 0.5s ease, opacity 0.5s ease"
          }, 50)
        }, 500)
      })
  
      // Añadir efecto de clic en las uñas
      nail.addEventListener("click", function () {
        // Encontrar el color activo
        const activeSwatch = document.querySelector(".color-swatch.active")
        if (activeSwatch) {
          const color = activeSwatch.getAttribute("data-color")
  
          // Aplicar un efecto de pulsación
          this.style.transform = "scale(1.2)"
          this.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.8)"
  
          setTimeout(() => {
            this.style.transform = ""
            this.style.boxShadow = ""
          }, 300)
        }
      })
    })
  
    // Añadir estilos CSS para el efecto de brillo
    const style = document.createElement("style")
    style.textContent = `
         .nail {
             position: absolute;
             overflow: hidden;
             cursor: pointer;
         }
         
         .nail-shine {
             position: absolute;
             top: 0;
             left: 0;
             width: 100%;
             height: 100%;
             background: linear-gradient(90deg, 
                 rgba(255,255,255,0) 0%, 
                 rgba(255,255,255,0.5) 50%, 
                 rgba(255,255,255,0) 100%);
             opacity: 0;
             transform: translateX(-100%);
             transition: transform 0.5s ease, opacity 0.5s ease;
         }
         
         .color-change-animation {
             animation: colorPulse 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
         }
     `
  
    document.head.appendChild(style)
  
    // Asegurarse de que la imagen de la mano esté cargada
    const handModel = document.querySelector(".hand-model")
    const handImage = document.querySelector(".hand-image")
  
    if (handModel && handImage) {
      // Verificar si la imagen está cargada
      if (!handImage.complete) {
        handImage.onload = () => {
          console.log("Imagen de mano cargada correctamente")
          positionNails()
        }
  
        handImage.onerror = () => {
          console.error("Error al cargar la imagen de mano")
          createFallbackHandImage()
        }
      } else {
        positionNails()
      }
    }
  
    // Posicionar las uñas correctamente según la imagen
    function positionNails() {
      const nails = document.querySelectorAll(".nail")
      if (!nails.length) return
  
      // Ajustar posición de las uñas según la imagen cargada
      // Estos valores pueden necesitar ajustes según la imagen específica
      const positions = [
        { top: "10%", left: "15%", rotate: "-15deg" },
        { top: "5%", left: "32%", rotate: "-5deg" },
        { top: "3%", left: "50%", rotate: "0deg" },
        { top: "5%", left: "68%", rotate: "5deg" },
        { top: "10%", left: "85%", rotate: "15deg" },
      ]
  
      nails.forEach((nail, index) => {
        if (positions[index]) {
          nail.style.top = positions[index].top
          nail.style.left = positions[index].left
          nail.style.transform = `rotate(${positions[index].rotate})`
        }
      })
    }
  
    // Crear una imagen de mano de respaldo si la carga falla
    function createFallbackHandImage() {
      const handImage = document.querySelector(".hand-image")
      if (!handImage) return
  
      const canvas = document.createElement("canvas")
      canvas.width = 300
      canvas.height = 400
      const ctx = canvas.getContext("2d")
  
      // Dibujar una silueta básica de mano
      ctx.fillStyle = "#f8f9fa"
      ctx.beginPath()
      ctx.moveTo(150, 350)
      ctx.bezierCurveTo(100, 300, 50, 250, 60, 80)
      ctx.bezierCurveTo(70, 50, 90, 30, 110, 50)
      ctx.bezierCurveTo(120, 20, 140, 10, 160, 30)
      ctx.bezierCurveTo(180, 0, 200, 10, 210, 40)
      ctx.bezierCurveTo(230, 20, 250, 30, 240, 70)
      ctx.bezierCurveTo(260, 100, 250, 150, 230, 200)
      ctx.bezierCurveTo(210, 250, 180, 300, 150, 350)
      ctx.fill()
  
      // Usar la imagen generada
      handImage.src = canvas.toDataURL()
  
      // Posicionar las uñas después de crear la imagen
      setTimeout(positionNails, 100)
    }
  }
  
  
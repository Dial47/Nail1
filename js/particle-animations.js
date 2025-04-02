// Animaciones con partículas para AngelNails
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar partículas en secciones específicas
  initParticles()

  // Añadir comentarios flotantes
  initFloatingComments()

  // Mejorar efectos visuales
  enhanceVisualEffects()
})

// Inicializar partículas en secciones específicas
function initParticles() {
  // Secciones donde queremos añadir partículas
  const sections = [
    { selector: ".hero-section", particleCount: 30, type: "sparkle" },
    { selector: ".cta-section", particleCount: 50, type: "bubble" },
    { selector: ".testimonials-section", particleCount: 20, type: "dust" },
  ]

  sections.forEach((section) => {
    const container = document.querySelector(section.selector)
    if (container) {
      container.style.position = "relative"
      container.style.overflow = "hidden"
      createParticles(container, section.particleCount, section.type)
    }
  })

  // Añadir estilos para partículas
  const style = document.createElement("style")
  style.textContent = `
    .particle {
      position: absolute;
      pointer-events: none;
      z-index: 1;
    }
    
    .particle-sparkle {
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
      animation: float-sparkle 10s infinite linear;
    }
    
    .particle-bubble {
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1));
      border-radius: 50%;
      animation: float-bubble 15s infinite ease-in;
    }
    
    .particle-dust {
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      animation: float-dust 20s infinite linear;
    }
    
    @keyframes float-sparkle {
      0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(20px) rotate(360deg);
        opacity: 0;
      }
    }
    
    @keyframes float-bubble {
      0% {
        transform: translateY(100vh) translateX(0) scale(1);
        opacity: 0;
      }
      10% {
        opacity: 0.7;
      }
      90% {
        opacity: 0.7;
      }
      100% {
        transform: translateY(-20vh) translateX(20px) scale(0.5);
        opacity: 0;
      }
    }
    
    @keyframes float-dust {
      0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.5;
      }
      90% {
        opacity: 0.5;
      }
      100% {
        transform: translateY(-50vh) translateX(50px) rotate(180deg);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
}

// Crear partículas para un contenedor específico
function createParticles(container, count, type) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div")
    particle.className = `particle particle-${type}`

    // Estilos aleatorios para cada partícula
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`

    // Tamaño basado en el tipo
    let size
    switch (type) {
      case "sparkle":
        size = Math.random() * 5 + 2
        break
      case "bubble":
        size = Math.random() * 15 + 10
        break
      case "dust":
        size = Math.random() * 3 + 1
        break
      default:
        size = Math.random() * 10 + 5
    }

    particle.style.width = `${size}px`
    particle.style.height = `${size}px`

    // Animación personalizada
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`
    particle.style.animationDelay = `${Math.random() * 5}s`

    container.appendChild(particle)
  }
}

// Inicializar comentarios flotantes
function initFloatingComments() {
  // Comentarios inspiradores para mostrar
  const comments = [
    "¡Uñas perfectas!",
    "Diseños exclusivos",
    "Brillo que enamora",
    "Estilo único",
    "Arte en tus manos",
    "Belleza duradera",
    "Calidad premium",
    "Tendencias 2025",
    "Colores vibrantes",
    "Técnica profesional",
  ]

  // Secciones donde queremos añadir comentarios
  const sections = [
    { selector: ".hero-section", count: 3 },
    { selector: ".gallery-section", count: 5 },
  ]

  sections.forEach((section) => {
    const container = document.querySelector(section.selector)
    if (container) {
      container.style.position = "relative"
      container.style.overflow = "hidden"

      // Crear comentarios flotantes
      for (let i = 0; i < section.count; i++) {
        const commentIndex = Math.floor(Math.random() * comments.length)
        createFloatingComment(container, comments[commentIndex])
      }
    }
  })

  // Añadir estilos para comentarios flotantes
  const style = document.createElement("style")
  style.textContent = `
    .floating-comment {
      position: absolute;
      background: linear-gradient(45deg, rgba(255, 0, 153, 0.7), rgba(157, 78, 221, 0.7));
      color: white;
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: bold;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      pointer-events: none;
      z-index: 10;
      opacity: 0;
      animation: float-comment 8s ease-in-out forwards;
    }
    
    @keyframes float-comment {
      0% {
        transform: translateY(20px) scale(0.8);
        opacity: 0;
      }
      10% {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
      80% {
        transform: translateY(-10px) scale(1);
        opacity: 1;
      }
      100% {
        transform: translateY(-30px) scale(0.8);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
}

// Crear un comentario flotante
function createFloatingComment(container, text) {
  const comment = document.createElement("div")
  comment.className = "floating-comment"
  comment.textContent = text

  // Posición aleatoria
  comment.style.left = `${Math.random() * 70 + 15}%`
  comment.style.top = `${Math.random() * 70 + 15}%`

  // Animación personalizada
  comment.style.animationDuration = `${Math.random() * 4 + 6}s`
  comment.style.animationDelay = `${Math.random() * 10}s`

  container.appendChild(comment)

  // Eliminar después de la animación
  setTimeout(
    () => {
      comment.remove()
      // Crear un nuevo comentario para reemplazar
      createFloatingComment(container, text)
    },
    (Number.parseFloat(comment.style.animationDuration) + Number.parseFloat(comment.style.animationDelay)) * 1000,
  )
}

// Mejorar efectos visuales
function enhanceVisualEffects() {
  // Añadir efecto de gas/humo en el fondo de secciones específicas
  const ctaSection = document.querySelector(".cta-section")
  if (ctaSection) {
    createSmokeEffect(ctaSection)
  }

  // Añadir estilos para el efecto de humo
  const style = document.createElement("style")
  style.textContent = `
    .smoke-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 0;
    }
    
    .smoke {
      position: absolute;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
      border-radius: 50%;
      filter: blur(20px);
      opacity: 0;
      animation: smoke-animation 15s infinite ease-out;
    }
    
    @keyframes smoke-animation {
      0% {
        transform: translateY(100%) scale(0.5);
        opacity: 0;
      }
      20% {
        opacity: 0.4;
      }
      80% {
        opacity: 0.4;
      }
      100% {
        transform: translateY(-100%) scale(2);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
}

// Crear efecto de humo/gas
function createSmokeEffect(container) {
  const smokeContainer = document.createElement("div")
  smokeContainer.className = "smoke-container"
  container.prepend(smokeContainer)

  // Crear elementos de humo
  for (let i = 0; i < 10; i++) {
    const smoke = document.createElement("div")
    smoke.className = "smoke"

    // Posición aleatoria
    smoke.style.left = `${Math.random() * 100}%`

    // Animación personalizada
    smoke.style.animationDuration = `${Math.random() * 10 + 15}s`
    smoke.style.animationDelay = `${Math.random() * 10}s`

    smokeContainer.appendChild(smoke)
  }

  // Regenerar humo continuamente
  setInterval(() => {
    const smoke = document.createElement("div")
    smoke.className = "smoke"

    // Posición aleatoria
    smoke.style.left = `${Math.random() * 100}%`

    // Animación personalizada
    smoke.style.animationDuration = `${Math.random() * 10 + 15}s`

    smokeContainer.appendChild(smoke)

    // Eliminar después de la animación
    setTimeout(() => {
      smoke.remove()
    }, Number.parseFloat(smoke.style.animationDuration) * 1000)
  }, 3000)
}


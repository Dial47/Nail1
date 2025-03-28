// Booking functionality for the reservations page

document.addEventListener("DOMContentLoaded", () => {
    // Calendar functionality
    const calendarContainer = document.getElementById("bookingCalendar")
    const currentMonthElement = document.getElementById("currentMonth")
    const prevMonthBtn = document.getElementById("prevMonth")
    const nextMonthBtn = document.getElementById("nextMonth")
    const selectedDateElement = document.getElementById("selectedDate")
    const timeSlotsGrid = document.getElementById("timeSlotsGrid")
  
    if (!calendarContainer) return
  
    const currentDate = new Date()
    let selectedDate = null
  
    // Available time slots
    const availableTimeSlots = [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
      "6:00 PM",
    ]
  
    // Simulated booked time slots (in a real application, this would come from a database)
    const bookedTimeSlots = {
      // Format: 'YYYY-MM-DD': ['10:00 AM', '2:00 PM']
    }
  
    // Function to generate the calendar
    function generateCalendar(year, month) {
      // Clear the calendar
      calendarContainer.innerHTML = ""
  
      // Update the month display
      const monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ]
      currentMonthElement.textContent = `${monthNames[month]} ${year}`
  
      // Create table structure
      const table = document.createElement("table")
  
      // Create header row with day names
      const headerRow = document.createElement("tr")
      const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
  
      dayNames.forEach((day) => {
        const th = document.createElement("th")
        th.textContent = day
        headerRow.appendChild(th)
      })
  
      table.appendChild(headerRow)
  
      // Get the first day of the month and the number of days in the month
      const firstDay = new Date(year, month, 1).getDay()
      const daysInMonth = new Date(year, month + 1, 0).getDate()
  
      // Create the calendar days
      let date = 1
      for (let i = 0; i < 6; i++) {
        // Break if we've already added all days
        if (date > daysInMonth) break
  
        const row = document.createElement("tr")
  
        for (let j = 0; j < 7; j++) {
          const cell = document.createElement("td")
  
          // Add empty cells for days before the first day of the month
          if (i === 0 && j < firstDay) {
            row.appendChild(cell)
            continue
          }
  
          // Break if we've added all days in the month
          if (date > daysInMonth) {
            row.appendChild(cell)
            continue
          }
  
          // Add the date to the cell
          cell.textContent = date
  
          // Check if this date is in the past
          const cellDate = new Date(year, month, date)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
  
          if (cellDate < today) {
            cell.classList.add("disabled")
          } else {
            // Add click event to select the date
            cell.addEventListener("click", () => {
              // Remove selected class from all cells
              document.querySelectorAll("#bookingCalendar td").forEach((td) => {
                td.classList.remove("selected")
              })
  
              // Add selected class to this cell
              cell.classList.add("selected")
  
              // Update selected date
              selectedDate = new Date(year, month, Number.parseInt(cell.textContent))
  
              // Update the date display
              const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
              selectedDateElement.textContent = selectedDate.toLocaleDateString("es-ES", options)
  
              // Update the time slots
              updateTimeSlots()
  
              // Update the date input in the form
              const dateInput = document.getElementById("date")
              if (dateInput) {
                const formattedDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`
                dateInput.value = formattedDate
              }
            })
          }
  
          row.appendChild(cell)
          date++
        }
  
        table.appendChild(row)
      }
  
      calendarContainer.appendChild(table)
    }
  
    // Function to update the time slots based on the selected date
    function updateTimeSlots() {
      if (!selectedDate || !timeSlotsGrid) return
  
      // Clear the time slots
      timeSlotsGrid.innerHTML = ""
  
      // Format the date for the booked time slots lookup
      const dateString = selectedDate.toISOString().split("T")[0]
  
      // Get the booked time slots for this date
      const booked = bookedTimeSlots[dateString] || []
  
      // Create the time slots
      availableTimeSlots.forEach((time) => {
        const timeSlot = document.createElement("div")
        timeSlot.classList.add("time-slot")
        timeSlot.textContent = time
  
        // Check if this time slot is booked
        if (booked.includes(time)) {
          timeSlot.classList.add("booked")
        } else {
          // Add click event to select the time
          timeSlot.addEventListener("click", () => {
            // Remove selected class from all time slots
            document.querySelectorAll(".time-slot").forEach((slot) => {
              slot.classList.remove("selected")
            })
  
            // Add selected class to this time slot
            timeSlot.classList.add("selected")
  
            // Update the time input in the form
            const timeInput = document.getElementById("time")
            if (timeInput) {
              // Convert to 24-hour format for the form
              let hour = Number.parseInt(time.split(":")[0])
              const isPM = time.includes("PM")
  
              if (isPM && hour !== 12) {
                hour += 12
              } else if (!isPM && hour === 12) {
                hour = 0
              }
  
              const formattedTime = `${hour}:00`
  
              // Find the option with this value
              const option = Array.from(timeInput.options).find((opt) => opt.value === formattedTime)
              if (option) {
                timeInput.value = formattedTime
              }
            }
          })
        }
  
        timeSlotsGrid.appendChild(timeSlot)
      })
    }
  
    // Initialize the calendar
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
  
    // Set up event listeners for month navigation
    if (prevMonthBtn) {
      prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1)
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
      })
    }
  
    if (nextMonthBtn) {
      nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1)
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
      })
    }
  
    // Simulate some booked time slots
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
  
    const todayString = today.toISOString().split("T")[0]
    const tomorrowString = tomorrow.toISOString().split("T")[0]
  
    bookedTimeSlots[todayString] = ["10:00 AM", "1:00 PM", "4:00 PM"]
    bookedTimeSlots[tomorrowString] = ["9:00 AM", "11:00 AM", "3:00 PM"]
  
    // Form submission
    const bookingForm = document.getElementById("bookingForm")
    if (bookingForm) {
      bookingForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form data
        const name = document.getElementById("name").value
        const phone = document.getElementById("phone").value
        const email = document.getElementById("email").value
        const date = document.getElementById("date").value
        const time = document.getElementById("time").value
        const service = document.getElementById("service").value
        const notes = document.getElementById("notes").value
  
        // In a real application, you would send this data to a server
        console.log("Booking submitted:", { name, phone, email, date, time, service, notes })
  
        // Show success message
        alert("¡Reserva realizada con éxito! Te contactaremos pronto para confirmar tu cita.")
  
        // Reset form
        bookingForm.reset()
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
  
  
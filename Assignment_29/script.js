function setDate() {
    const now = new Date()
  
    // Get seconds, minutes, and hours
    const seconds = now.getSeconds()
    const minutes = now.getMinutes()
    const hours = now.getHours() % 12 // Convert to 12-hour format
  
    // Calculate rotation degrees
    const secondsDegrees = (seconds / 60) * 360
    const minutesDegrees = ((minutes + seconds / 60) / 60) * 360
    const hoursDegrees = ((hours + minutes / 60) / 12) * 360
  
    // Apply rotations to hands
    document.querySelector(".second-hand").style.transform = `rotate(${secondsDegrees}deg)`
    document.querySelector(".minute-hand").style.transform = `rotate(${minutesDegrees}deg)`
    document.querySelector(".hour-hand").style.transform = `rotate(${hoursDegrees}deg)`
  
    // Update digital time for debugging
    const digitalTime = document.querySelector(".digital-time")
    digitalTime.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
  
  // Run the function every second
  setInterval(setDate, 1000)
  
  // Run once on page load to set initial positions
  setDate()
  
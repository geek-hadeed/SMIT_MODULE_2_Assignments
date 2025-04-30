const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
    const suffix = this.dataset.sizing || '';

    // Update the CSS variable
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

    // Find and update the corresponding display element
    const displayElement = document.getElementById(`${this.name}-value`);
    if (displayElement) {
        displayElement.textContent = this.value + suffix;
    }
}

// Add event listeners
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

// Initialize display values on page load
inputs.forEach(input => handleUpdate.call(input));
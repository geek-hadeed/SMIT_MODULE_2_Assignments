document.addEventListener('DOMContentLoaded', function () {
    // Set the date for Eid ul Fitr 2025 (April 1, 2025)
    const eidDate = new Date('April 1, 2025 00:00:00').getTime();

    // Elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const eidMessageEl = document.getElementById('eid-message');
    const countdownBoxes = document.querySelectorAll('.countdown-box');

    // Update countdown every second
    const countdown = setInterval(function () {
        // Get current date and time
        const now = new Date().getTime();

        // Find the distance between now and Eid
        const distance = eidDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Add leading zeros if needed
        const formatNumber = (num) => num < 10 ? `0${num}` : num;

        // Display the result
        daysEl.textContent = formatNumber(days);
        hoursEl.textContent = formatNumber(hours);
        minutesEl.textContent = formatNumber(minutes);
        secondsEl.textContent = formatNumber(seconds);

        // Add pulse animation to seconds
        secondsEl.classList.add('pulse');
        setTimeout(() => {
            secondsEl.classList.remove('pulse');
        }, 500);

        // If the countdown is over, show Eid message
        if (distance < 0) {
            clearInterval(countdown);

            // Hide countdown boxes
            countdownBoxes.forEach(box => {
                box.style.display = 'none';
            });

            // Show Eid message
            eidMessageEl.classList.remove('hidden');

            // Set all countdown values to 00
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
        }
    }, 1000);

    // Add some visual effects
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            starsContainer.appendChild(star);
        }
    }


    function addPulseEffect() {
        countdownBoxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add('pulse-animation');
                setTimeout(() => {
                    box.classList.remove('pulse-animation');
                }, 1000);
            }, index * 200);
        });
    }

    setInterval(addPulseEffect, 10000);
    
    setTimeout(addPulseEffect, 1000);
});


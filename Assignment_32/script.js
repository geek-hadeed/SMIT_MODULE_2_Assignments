document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Function to activate an item
    function activateItem(item) {
        galleryItems.forEach(el => {
            el.classList.remove('active');
        });
        item.classList.add('active');

        // Ensure the active item is visible by scrolling to it if needed
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Mouse events for desktop
    galleryItems.forEach(item => {
        // Hover activation for desktop
        item.addEventListener('mouseenter', function () {
            if (window.innerWidth > 768) { // Only use hover on larger screens
                activateItem(this);
            }
        });

        // Click activation (useful for mobile and also as a fallback)
        item.addEventListener('click', function () {
            activateItem(this);
        });

        // Touch events for mobile
        item.addEventListener('touchstart', function (e) {
            touchStartY = e.changedTouches[0].screenY;
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        item.addEventListener('touchend', function (e) {
            touchEndY = e.changedTouches[0].screenY;
            touchEndX = e.changedTouches[0].screenX;

            // Calculate distance
            const distanceY = Math.abs(touchEndY - touchStartY);
            const distanceX = Math.abs(touchEndX - touchStartX);

            // If it's a tap (not a scroll) - less than 10px movement
            if (distanceY < 10 && distanceX < 10) {
                activateItem(this);
            }
        }, { passive: true });
    });

    // Set the first item as active by default
    if (galleryItems.length > 0 && !document.querySelector('.gallery-item.active')) {
        galleryItems[0].classList.add('active');
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        const activeItem = document.querySelector('.gallery-item.active');
        if (!activeItem) return;

        const currentIndex = Array.from(galleryItems).indexOf(activeItem);
        let newIndex;

        // Left arrow or up arrow
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            activateItem(galleryItems[newIndex]);
        }
        // Right arrow or down arrow
        else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            newIndex = (currentIndex + 1) % galleryItems.length;
            activateItem(galleryItems[newIndex]);
        }
    });

    // Auto-rotate items every 5 seconds if no interaction
    let autoRotateInterval;
    let userInteracted = false;

    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            if (!userInteracted) {
                const activeItem = document.querySelector('.gallery-item.active');
                const currentIndex = Array.from(galleryItems).indexOf(activeItem);
                const nextIndex = (currentIndex + 1) % galleryItems.length;
                activateItem(galleryItems[nextIndex]);
            }
        }, 5000);
    }

    // Start auto-rotation
    startAutoRotate();

    // Reset auto-rotation on user interaction
    document.querySelector('.gallery').addEventListener('mouseenter', () => {
        userInteracted = true;
        clearInterval(autoRotateInterval);
    });

    document.querySelector('.gallery').addEventListener('mouseleave', () => {
        userInteracted = false;
        startAutoRotate();
    });

    // Also handle touch interaction
    document.querySelector('.gallery').addEventListener('touchstart', () => {
        userInteracted = true;
        clearInterval(autoRotateInterval);
    }, { passive: true });

    // Resume auto-rotation after 10 seconds of inactivity
    let inactivityTimer;
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            userInteracted = false;
            startAutoRotate();
        }, 10000);
    }

    ['mousemove', 'click', 'touchstart', 'keydown'].forEach(eventType => {
        document.addEventListener(eventType, resetInactivityTimer, { passive: true });
    });

    resetInactivityTimer();

    // Add swipe navigation for mobile
    let galleryElement = document.querySelector('.gallery');

    galleryElement.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    galleryElement.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const activeItem = document.querySelector('.gallery-item.active');
        if (!activeItem) return;

        const currentIndex = Array.from(galleryItems).indexOf(activeItem);
        const swipeThreshold = 50; // Minimum distance to register as a swipe
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) >= swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - go to previous
                const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                activateItem(galleryItems[prevIndex]);
            } else {
                // Swipe left - go to next
                const nextIndex = (currentIndex + 1) % galleryItems.length;
                activateItem(galleryItems[nextIndex]);
            }
        }
    }
});
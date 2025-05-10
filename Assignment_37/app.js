document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('video');
    const playPauseBtn = document.getElementById('play-pause');
    const bigPlayBtn = document.getElementById('big-play-button');
    const volumeBtn = document.getElementById('volume');
    const fullscreenBtn = document.getElementById('fullscreen');
    const progress = document.getElementById('progress');
    const progressBar = document.querySelector('.progress-bar');
    const volumeProgress = document.getElementById('volume-progress');
    const volumeSlider = document.querySelector('.volume-slider');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const progressHoverTime = document.getElementById('progress-hover-time');
    const speedBtn = document.getElementById('speed');
    const pipBtn = document.getElementById('pip');
    const skipForwardBtn = document.getElementById('skip-forward');
    const skipBackwardBtn = document.getElementById('skip-backward');
    const shortcutsInfo = document.getElementById('shortcuts-info');

    // Initial setup
    let isFullscreen = false;
    let isMuted = false;
    let mouseDownOnProgress = false;
    let mouseDownOnVolume = false;
    let controlsTimeout;
    let lastActivity = Date.now();
    const speedLevels = [0.5, 0.75, 1, 1.25, 1.5, 2];
    let currentSpeedIndex = 2; // Default 1x
    
    // Set initial volume
    video.volume = 1;
    updateVolumeProgress();

    // Format time function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Update progress bar
    function updateProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progress.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(video.currentTime);
    }

    // Update volume progress
    function updateVolumeProgress() {
        volumeProgress.style.width = `${video.volume * 100}%`;
    }

    // Play/Pause video
    function togglePlay() {
        if (video.paused) {
            video.play();
            videoContainer.classList.add('playing');
        } else {
            video.pause();
            videoContainer.classList.remove('playing');
        }
        videoContainer.classList.toggle('paused', video.paused);
        resetControlsTimeout();
    }

    // Toggle mute
    function toggleMute() {
        video.muted = !video.muted;
        videoContainer.classList.toggle('muted', video.muted);
        resetControlsTimeout();
    }

    // Toggle fullscreen
    function toggleFullscreen() {
        if (!isFullscreen) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        resetControlsTimeout();
    }

    // Toggle Picture-in-Picture
    function togglePIP() {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
            video.requestPictureInPicture();
        }
        resetControlsTimeout();
    }

    // Change playback speed
    function changeSpeed() {
        currentSpeedIndex = (currentSpeedIndex + 1) % speedLevels.length;
        const newSpeed = speedLevels[currentSpeedIndex];
        video.playbackRate = newSpeed;
        speedBtn.textContent = `${newSpeed}x`;
        resetControlsTimeout();
    }

    // Skip forward/backward
    function skipTime(seconds) {
        video.currentTime += seconds;
        resetControlsTimeout();
        
        // Show visual feedback
        const skipIndicator = document.createElement('div');
        skipIndicator.className = 'skip-indicator';
        skipIndicator.textContent = seconds > 0 ? `+${seconds}s` : `${seconds}s`;
        skipIndicator.style.position = 'absolute';
        skipIndicator.style.top = '50%';
        skipIndicator.style.left = seconds > 0 ? '60%' : '40%';
        skipIndicator.style.transform = 'translate(-50%, -50%)';
        skipIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        skipIndicator.style.color = 'white';
        skipIndicator.style.padding = '10px 15px';
        skipIndicator.style.borderRadius = '5px';
        skipIndicator.style.fontSize = '16px';
        skipIndicator.style.fontWeight = 'bold';
        skipIndicator.style.opacity = '0';
        skipIndicator.style.transition = 'opacity 0.3s ease';
        
        videoContainer.appendChild(skipIndicator);
        
        // Animate the indicator
        setTimeout(() => {
            skipIndicator.style.opacity = '1';
        }, 0);
        
        setTimeout(() => {
            skipIndicator.style.opacity = '0';
            setTimeout(() => {
                skipIndicator.remove();
            }, 300);
        }, 800);
    }

    // Toggle shortcuts info
    function toggleShortcutsInfo() {
        shortcutsInfo.classList.toggle('visible');
        resetControlsTimeout();
    }

    // Set progress bar position based on mouse click
    function setProgress(e) {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
        resetControlsTimeout();
    }

    // Set volume based on mouse click
    function setVolume(e) {
        const rect = volumeSlider.getBoundingClientRect();
        let pos = (e.clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));
        video.volume = pos;
        updateVolumeProgress();
        
        if (pos === 0) {
            videoContainer.classList.add('muted');
            video.muted = true;
        } else {
            videoContainer.classList.remove('muted');
            video.muted = false;
        }
        
        resetControlsTimeout();
    }

    // Show hover time on progress bar
    function showHoverTime(e) {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const time = pos * video.duration;
        
        progressHoverTime.textContent = formatTime(time);
        progressHoverTime.style.left = `${e.clientX - rect.left}px`;
        progressHoverTime.style.display = 'block';
        
        resetControlsTimeout();
    }

    // Auto-hide controls after inactivity
    function resetControlsTimeout() {
        lastActivity = Date.now();
        videoContainer.classList.add('controls-visible');
        
        clearTimeout(controlsTimeout);
        
        if (!video.paused) {
            controlsTimeout = setTimeout(() => {
                videoContainer.classList.remove('controls-visible');
            }, 3000);
        }
    }

    // Track user activity
    function trackActivity() {
        resetControlsTimeout();
    }

    // Event listeners
    playPauseBtn.addEventListener('click', togglePlay);
    bigPlayBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    
    volumeBtn.addEventListener('click', toggleMute);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    pipBtn.addEventListener('click', togglePIP);
    speedBtn.addEventListener('click', changeSpeed);
    
    skipForwardBtn.addEventListener('click', () => skipTime(5));
    skipBackwardBtn.addEventListener('click', () => skipTime(-5));
    
    video.addEventListener('timeupdate', updateProgress);
    
    video.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(video.duration);
    });
    
    video.addEventListener('ended', () => {
        videoContainer.classList.remove('playing');
        videoContainer.classList.add('paused');
    });
    
    // Progress bar events
    progressBar.addEventListener('click', setProgress);
    
    progressBar.addEventListener('mousedown', () => {
        mouseDownOnProgress = true;
    });
    
    document.addEventListener('mouseup', () => {
        mouseDownOnProgress = false;
        mouseDownOnVolume = false;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (mouseDownOnProgress) {
            setProgress(e);
        }
        if (mouseDownOnVolume) {
            setVolume(e);
        }
        trackActivity();
    });
    
    // Volume slider events
    volumeSlider.addEventListener('click', setVolume);
    
    volumeSlider.addEventListener('mousedown', (e) => {
        mouseDownOnVolume = true;
        setVolume(e);
    });
    
    // Progress hover time
    progressBar.addEventListener('mousemove', showHoverTime);
    progressBar.addEventListener('mouseout', () => {
        progressHoverTime.style.display = 'none';
    });
    
    // Fullscreen change event
    document.addEventListener('fullscreenchange', () => {
        isFullscreen = !!document.fullscreenElement;
        videoContainer.classList.toggle('fullscreen', isFullscreen);
    });
    
    document.addEventListener('webkitfullscreenchange', () => {
        isFullscreen = !!document.webkitFullscreenElement;
        videoContainer.classList.toggle('fullscreen', isFullscreen);
    });
    
    // Track user activity
    videoContainer.addEventListener('mousemove', trackActivity);
    videoContainer.addEventListener('touchstart', trackActivity);
    videoContainer.addEventListener('click', trackActivity);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            togglePlay();
            e.preventDefault();
        } else if (e.code === 'KeyM') {
            toggleMute();
        } else if (e.code === 'KeyF') {
            toggleFullscreen();
        } else if (e.code === 'KeyP') {
            togglePIP();
        } else if (e.code === 'KeyS') {
            changeSpeed();
        } else if (e.code === 'ArrowRight') {
            skipTime(5);
        } else if (e.code === 'ArrowLeft') {
            skipTime(-5);
        } else if (e.code === 'ArrowUp') {
            video.volume = Math.min(1, video.volume + 0.1);
            updateVolumeProgress();
            videoContainer.classList.remove('muted');
            video.muted = false;
        } else if (e.code === 'ArrowDown') {
            video.volume = Math.max(0, video.volume - 0.1);
            updateVolumeProgress();
            if (video.volume === 0) {
                videoContainer.classList.add('muted');
                video.muted = true;
            }
        } else if (e.code === 'Slash' && e.shiftKey) {
            // Question mark key (Shift + /)
            toggleShortcutsInfo();
        }
    });

    // Close shortcuts info when clicked
    shortcutsInfo.addEventListener('click', () => {
        shortcutsInfo.classList.remove('visible');
    });

    // Add ripple effect on buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Initialize controls visibility
    resetControlsTimeout();
});
document.addEventListener('DOMContentLoaded', () => {
  const konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a"
  ];
  let currentPosition = 0;

  const keys = document.querySelectorAll('.key');
  const mobileKeys = document.querySelectorAll('.mobile-key');
  const messageEl = document.getElementById('message');
  const progressBar = document.getElementById('progress-bar');
  const resetBtn = document.getElementById('reset-btn');
  const hintBtn = document.getElementById('hint-btn');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal');

  function updateProgress() {
    const progress = (currentPosition / konamiCode.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  function flashKey(index, status) {
    if (keys[index]) {
      keys[index].classList.remove('active', 'wrong');
      void keys[index].offsetWidth; // force reflow
      keys[index].classList.add(status);
    }
  }

  function resetSequence() {
    currentPosition = 0;
    messageEl.textContent = '';
    progressBar.style.width = '0';
    keys.forEach(key => key.classList.remove('active', 'wrong'));
  }

  function handleInput(key) {
    if (key === konamiCode[currentPosition]) {
      flashKey(currentPosition, 'active');
      currentPosition++;
      updateProgress();
      if (currentPosition === konamiCode.length) {
        messageEl.textContent = 'Code Entered Successfully!';
        successModal.style.display = 'flex';
      }
    } else {
      flashKey(currentPosition, 'wrong');
      messageEl.textContent = 'Wrong key! Try again.';
      currentPosition = 0;
      updateProgress();
      keys.forEach(key => key.classList.remove('active'));
    }
  }

  // Keyboard input
  document.addEventListener('keydown', (e) => {
    handleInput(e.key);
  });

  // Mobile input
  mobileKeys.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      handleInput(key);
    });
  });

  // Reset button
  resetBtn.addEventListener('click', resetSequence);

  // Hint button
  hintBtn.addEventListener('click', () => {
    messageEl.textContent = 'Hint: ↑ ↑ ↓ ↓ ← → ← → B A';
  });

  // Close modal
  closeModalBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
    resetSequence();
  });
});

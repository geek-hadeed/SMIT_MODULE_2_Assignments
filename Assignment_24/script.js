let points = 0;
let timeLeft = 15;
let timerInterval;
let isGameRunning = false;
let highScore = localStorage.getItem('highScore') || 0;

const scoreDisplay = document.getElementById('score');
const clickBtn = document.getElementById('click-btn');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const finalScoreDisplay = document.getElementById('final-score');
const highScoreDisplay = document.getElementById('high-score');

highScoreDisplay.textContent = 'High Score: ' + highScore;

function startGame() {
    points = 0;
    timeLeft = 15;
    isGameRunning = true;
    scoreDisplay.textContent = 'Points: 0';
    timerDisplay.textContent = 'Time: 15s';
    finalScoreDisplay.style.display = 'none';
    finalScoreDisplay.classList.remove('new-high-score');

    clickBtn.disabled = false;
    startBtn.disabled = true;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = 'Time: ' + timeLeft + 's';

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    isGameRunning = false;
    clickBtn.disabled = true;
    startBtn.disabled = false;

    if (points > highScore) {
        highScore = points;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = 'High Score: ' + highScore;
        finalScoreDisplay.textContent = 'NEW HIGH SCORE: ' + points + '!';
        finalScoreDisplay.classList.add('new-high-score');
    } else {
        finalScoreDisplay.textContent = 'Final Score: ' + points;
    }
    finalScoreDisplay.style.display = 'block';
}

clickBtn.addEventListener('click', () => {
    if (isGameRunning) {
        points++;
        scoreDisplay.textContent = 'Points: ' + points;
    }
});

function resetHighScore() {
    highScore = 0;
    localStorage.setItem('highScore', 0);
    highScoreDisplay.textContent = 'High Score: 0';
}

startBtn.addEventListener('click', startGame);
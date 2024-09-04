let countdownInterval;

function startCountdown(duration) {
    clearInterval(countdownInterval);
    let timeLeft = duration;

    // Immediately update the countdown display
    updateCountdownDisplay(timeLeft);

    countdownInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').textContent = "00:00:00";
            showCelebration();
            setTimeout(restartCountdown, 3000);  // Restart after 3 seconds
        } else {
            updateCountdownDisplay(timeLeft);
        }
    }, 1000);
}

function updateCountdownDisplay(timeLeft) {
    const hours = Math.floor((timeLeft / (60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 60) % 60);
    const seconds = Math.floor(timeLeft % 60);
    document.getElementById('countdown').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function showCelebration() {
    const celebration = document.getElementById('celebration');
    celebration.classList.add('visible');
}

function hideCelebration() {
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('visible');
}

function restartCountdown() {
    hideCelebration();
    document.getElementById('startButton').disabled = false;
}

document.getElementById('startButton').addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    const duration = hours * 3600 + minutes * 60 + seconds;

    if (duration > 0) {
        startCountdown(duration);
        document.getElementById('startButton').disabled = true;
    }
});

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeToggleButton = document.getElementById('mode-toggle');
const statusText = document.getElementById('status-text');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

let timerId = null;
let timeLeft = WORK_TIME;
let isWorkTime = true;

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(updateTimer, 1000);
        startButton.textContent = 'Pause';
        document.querySelector('.timer').classList.add('running');
        document.querySelector('.timer').classList.remove('paused');
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
        document.querySelector('.timer').classList.remove('running');
        document.querySelector('.timer').classList.add('paused');
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay(timeLeft);
    } else {
        clearInterval(timerId);
        timerId = null;
        // Handle timer completion
    }
}

function updateDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    
    // Update the timer display
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(remainingSeconds).padStart(2, '0');
    
    // Update the document title
    document.title = `${timeString} - Pomodoro Timer`;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    updateDisplay(timeLeft);
    startButton.textContent = 'Start';
    statusText.textContent = isWorkTime ? 'Time to focus!' : 'Take a break!';
    modeToggleButton.textContent = isWorkTime ? 'Rest Mode' : 'Work Mode';
    modeToggleButton.className = isWorkTime ? 'work-mode' : 'rest-mode';
    document.querySelector('.timer').classList.remove('running', 'paused');
}

function toggleMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    updateDisplay(timeLeft);
    modeToggleButton.textContent = isWorkTime ? 'Rest Mode' : 'Work Mode';
    modeToggleButton.className = isWorkTime ? 'work-mode' : 'rest-mode';
    statusText.textContent = isWorkTime ? 'Time to focus!' : 'Take a break!';
    
    // Reset the timer state
    clearInterval(timerId);
    timerId = null;
    startButton.textContent = 'Start';
    document.querySelector('.timer').classList.remove('running', 'paused');
}

startButton.addEventListener('click', startTimer);

resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', toggleMode);

// Initialize display
updateDisplay(WORK_TIME);
modeToggleButton.textContent = 'Rest Mode';
modeToggleButton.className = 'work-mode'; 
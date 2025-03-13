const words = [
    "hello", "world", "javascript", "developer", "coding", "react", "python", "html", "css", "linux",
    "github", "frontend", "backend", "typescript", "bootstrap", "express", "node", "api", "database", "server",
    "function", "variable", "constant", "algorithm", "binary", "boolean", "integer", "float", "array", "object"
];

let currentWord = "";
let charIndex = 0;
let totalCharsTyped = 0;
let correctChars = 0;
let totalWordsTyped = 0;
let isTestRunning = false;
let soundEnabled = true;
let timerDuration = 60;
let timeLeft = timerDuration;
let timer;
let startTime;

function loadWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById("word-display").innerHTML = currentWord
        .split("")
        .map((char) => `<span class="letter">${char}</span>`)
        .join("");
    document.getElementById("input-box").innerText = "";
    charIndex = 0;
}

function startTimer() {
    if (isTestRunning) return;
    isTestRunning = true;
    startTime = Date.now();
    timer = setInterval(() => {
        timeLeft = timerDuration - Math.floor((Date.now() - startTime) / 1000);
        document.querySelector(".timer-clock").innerText = formatTime(timeLeft);
        updateWPM();
        if (timeLeft <= 0) {
            clearInterval(timer);
            endTest();
        }
    }, 1000);
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}

function updateWPM() {
    let wpmElement = document.getElementById("wpm-count");
    if (!wpmElement || !isTestRunning) return;
    
    let timeElapsed = (Date.now() - startTime) / 60000;
    let wpm = timeElapsed > 0 ? Math.round((totalWordsTyped / timeElapsed)) : 0;
    console.log(wpm);
    
    wpmElement.innerText = wpm;
}

function playErrorSound() {
    if (!soundEnabled) return;
    let sound = document.getElementById("error-sound");
    if (sound.paused) {
        sound.currentTime = 0.1;
        sound.play();
    }
}

function endTest() {
    document.getElementById("input-box").setAttribute("contenteditable", "false");
    updateWPM();

    let accuracy = totalCharsTyped > 0 ? Math.round((correctChars / totalCharsTyped) * 100) : 0;
    let finalWPM = parseInt(document.getElementById("wpm-count")?.innerText) || 0;

    let resultDiv = document.createElement("div");
    resultDiv.classList.add("results");
    resultDiv.innerHTML = `
        <h2>Test Completed</h2>
        <p>WPM: <strong>${finalWPM}</strong></p>
        <p>Accuracy: <strong>${accuracy}%</strong></p>
        <button onclick="restartTest()">Restart</button>
    `;

    document.getElementById("results-container").appendChild(resultDiv);
}

document.getElementById("input-box").addEventListener("input", function (e) {
    if (!isTestRunning) startTimer();
    let inputText = e.target.innerText.trim();
    let letters = document.querySelectorAll(".letter");
    totalCharsTyped = inputText.length;
    correctChars = 0;
    
    for (let i = 0; i < letters.length; i++) {
        if (!inputText[i]) {
            letters[i].classList.remove("correct", "wrong");
        } else if (inputText[i] === currentWord[i]) {
            letters[i].classList.add("correct");
            letters[i].classList.remove("wrong");
            correctChars++;
        } else {
            letters[i].classList.add("wrong");
            letters[i].classList.remove("correct");
            playErrorSound();
        }
    }

    if (inputText === currentWord) {
        totalWordsTyped++;
        loadWord();
    }

    updateWPM();
});

function restartTest() {
    clearInterval(timer);
    timeLeft = timerDuration;
    totalCharsTyped = 0;
    correctChars = 0;
    totalWordsTyped = 0;
    isTestRunning = false;
    document.querySelector(".timer-clock").innerText = formatTime(timeLeft);
    document.getElementById("input-box").setAttribute("contenteditable", "true");
    document.querySelector(".results")?.remove();
    loadWord();
}

function setTimer(duration) {
    timerDuration = duration;
    timeLeft = timerDuration;
    document.querySelector(".timer-clock").innerText = formatTime(timeLeft);
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    document.querySelector(".volume span").innerText = soundEnabled ? "volume_up" : "volume_mute";
}

loadWord();



document.querySelector("nav button").addEventListener("click", (event) => {
    event.preventDefault();

    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "../homePage/index.html";
    }, 300);

})
function toggleSound() {
    soundEnabled = !soundEnabled;
    document.querySelector(".volume span").innerText = soundEnabled ? "volume_up" : "volume_mute";
}
function restartTest() {
    clearInterval(timer);
    timeLeft = timerDuration;
    totalCharsTyped = 0;
    correctChars = 0;
    totalWordsTyped = 0;
    isTestRunning = false;
    document.querySelector(".timer-clock").innerText = formatTime(timeLeft);
    document.getElementById("input-box").setAttribute("contenteditable", "true");
    document.querySelector(".results")?.remove();
    loadWord();
}
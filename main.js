const wordArray = [
  "spiderman",
  "ironman",
  "captain america",
  "hulk",
  "scarlet witch",
  "doctor strange",
  "black panther",
  "vision",
  "falcon",
  "winter soldier",
];

const beginButton = document.getElementById("begin-button");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const congratulationsScreen = document.getElementById("congratulations-screen");
const word = document.getElementById("word");
const backButton = document.getElementById("back-button");
const inputElement = document.getElementById("input-field");
const timerElement = document.getElementById("timer");

beginButton.style.fontFamily = "'Lato', sans-serif";

let timerInterval;
let currentWordIndex = 0;

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "block";
}

// Ensure that the congratulations screen is hidden at the start
hideElement(congratulationsScreen);

function showCongratulationsScreen(timeTaken) {
  hideElement(gameScreen);
  showElement(congratulationsScreen);

  const congratulationsMessage = document.getElementById("congratulations-message");
  congratulationsMessage.innerHTML = `
    Congratulations! Your time was: ${timeTaken} seconds!
    <br><br><i>Click "Play Again" to start a new game!</i>
  `;
}

function backToStartScreen() {
  clearInterval(timerInterval);
  hideElement(gameScreen);
  inputElement.value = "";
  currentWordIndex = 0;
  showElement(inputElement);
  showElement(startScreen);
}

function playAgain() {
  hideElement(congratulationsScreen);
  word.innerHTML = "";
  inputElement.value = "";
  showElement(inputElement);
  hideElement(backButton);
  currentWordIndex = 0;
  startGame();
  backToStartScreen(); // Call the backToStartScreen function to show the start screen
}

function tryAgain() {
	hideElement(congratulationsScreen);
	backToStartScreen();
  }

const playAgainButton = document.getElementById("play-again-button");
playAgainButton.addEventListener("click", playAgain);
backButton.addEventListener("click", tryAgain);

beginButton.addEventListener("click", () => {
  hideElement(startScreen);
  showElement(gameScreen);
  startGame();
});

function startGame() {
  const difficultyValue = parseInt(document.getElementById("game-difficulty").value, 10);
  const wordsToShow = difficultyValue;

  function updateTimerDisplay(timeLeft) {
    timerElement.innerHTML = `Time left: ${timeLeft} seconds`;
  }

  function updateTimer() {
    const endTime = startTime + 20000;
    const currentTime = new Date().getTime();
    const timeLeft = Math.max(0, Math.ceil((endTime - currentTime) / 1000));
    updateTimerDisplay(timeLeft);

    if (timeLeft === 0) {
      showElement(backButton);
      word.innerHTML = `
        GAME OVER! You ran out of time.
        <br><br><i>Refresh the browser or click "Try Again" to return to the home screen!<i>
      `;
      hideElement(inputElement);
      clearInterval(timerInterval);
    }
  }

  function keyUpHandler(e) {
    const inputWord = inputElement.value.toLowerCase().trim();
    const currentWord = wordArray[currentWordIndex].toLowerCase();

    if (inputWord === currentWord) {
      currentWordIndex++;

      if (currentWordIndex >= wordsToShow) {
        showElement(backButton);
        showCongratulationsScreen(20 - parseInt(timerElement.textContent.split(" ")[2]));
        hideElement(inputElement);
        clearInterval(timerInterval);
      } else {
        word.innerHTML = `Word: ${wordArray[currentWordIndex]}`;
        inputElement.value = "";
        hideElement(backButton);
      }
    }
  }

  hideElement(backButton);
  word.innerHTML = `Word: ${wordArray[currentWordIndex]}`;
  inputElement.addEventListener("keyup", keyUpHandler, false);
  inputElement.focus();

  const startTime = new Date().getTime();
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}
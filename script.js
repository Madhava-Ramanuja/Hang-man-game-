// script.js
const words = [
  { word: "javascript", hint: "A programming language used for web development." },
  { word: "hangman", hint: "A classic word-guessing game." },
  { word: "developer", hint: "A person who writes and debugs code." },
  { word: "challenge", hint: "A task that tests someone's abilities." },
  { word: "programming", hint: "The process of writing computer software." },
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;

const hangmanArt = [
  `
  +---+
  |   |
      |
      |
      |
      |
  =========
  `,
  `
  +---+
  |   |
  O   |
      |
      |
      |
  =========
  `,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
  =========
  `,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
  =========
  `,
  `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
  =========
  `,
  `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
  =========
  `,
  `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
  =========
  `,
];

const hintElement = document.getElementById("hint");
const wordDisplay = document.getElementById("word-display");
const hangmanArtElement = document.getElementById("hangman-art");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-button");

function initializeGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  incorrectGuesses = 0;
  hintElement.textContent = `Hint: ${selectedWord.hint}`;
  updateWordDisplay();
  updateHangmanArt();
  generateKeyboard();
  message.textContent = "";
}

function updateWordDisplay() {
  wordDisplay.textContent = selectedWord.word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function updateHangmanArt() {
  hangmanArtElement.textContent = hangmanArt[incorrectGuesses];
}

function generateKeyboard() {
  keyboard.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i).toLowerCase();
    const button = document.createElement("button");
    button.textContent = letter;
    button.classList.add("key");
    button.addEventListener("click", () => handleGuess(letter));
    keyboard.appendChild(button);
  }
}

function handleGuess(letter) {
  if (guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);
  if (!selectedWord.word.includes(letter)) {
    incorrectGuesses++;
  }

  updateWordDisplay();
  updateHangmanArt();
  checkGameStatus();
}

function checkGameStatus() {
  if (incorrectGuesses >= maxIncorrectGuesses) {
    message.textContent = `Game Over! The word was "${selectedWord.word}".`;
    disableKeyboard();
  } else if (!wordDisplay.textContent.includes("_")) {
    message.textContent = "Congratulations! You won!";
    disableKeyboard();
  }
}

function disableKeyboard() {
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => (key.disabled = true));
}

resetButton.addEventListener("click", initializeGame);

// Initialize the game on page load
initializeGame();

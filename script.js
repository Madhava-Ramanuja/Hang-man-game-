const words = ["javascript", "hangman", "developer", "challenge", "programming"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 7; // Updated to match the new hangmanArt length

const hangmanArt = [
  `
      ____
     |    |
     |    
     |    
     |    
     |    
  =========
  `,
  `
      ____
     |    |
     |    O
     |    
     |    
     |    
  =========
  `,
  `
      ____
     |    |
     |    O
     |    |
     |    
     |    
  =========
  `,
  `
      ____
     |    |
     |    O
     |   /|
     |    
     |    
  =========
  `,
  `
      ____
     |    |
     |    O
     |   /|\\
     |    
     |    
  =========
  `,
  `
      ____
     |    |
     |    O
     |   /|\\
     |   / 
     |    
  =========
  `,
  `
      ____
     |    |
     |    O
     |   /|\\
     |   / \\
     |    
  =========
  `,
  `
      ____
     |    |
     |    O
     |   /|\\
     |   / \\
     |  🔑  
  =========
  `,
];

const wordDisplay = document.getElementById("word-display");
const hangmanArtElement = document.getElementById("hangman-art");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-button");

function initializeGame() {
  guessedLetters = [];
  incorrectGuesses = 0;
  selectedWord = words[Math.floor(Math.random() * words.length)];
  updateWordDisplay();
  updateHangmanArt();
  generateKeyboard();
  message.textContent = "";
}

function updateWordDisplay() {
  wordDisplay.textContent = selectedWord
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
  if (!selectedWord.includes(letter)) {
    incorrectGuesses++;
  }

  updateWordDisplay();
  updateHangmanArt();
  checkGameStatus();
}

function checkGameStatus() {
  if (incorrectGuesses >= maxIncorrectGuesses) {
    message.textContent = `Game Over! The word was "${selectedWord}".`;
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

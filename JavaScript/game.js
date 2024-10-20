import words from "./words.js";
import {
  INPUT_FIELD,
  SUBMIT_BUTTON,
  RESULT_TEXT,
  HANGMAN_IMAGE,
} from "./constants.js";

let wordContainer = document.getElementById("wordContainer");
let word =
  window.innerWidth < 768
    ? words.filter((w) => w.length <= 14)[
        Math.floor(Math.random() * words.filter((w) => w.length <= 10).length)
      ]
    : words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let chances = 8;

function createWordContainer() {
  wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";
  for (const LETTER of word) {
    const LETTER_SPAN = document.createElement("span");
    if (/[a-zA-Z]/.test(LETTER)) {
      LETTER_SPAN.textContent = "_";
      LETTER_SPAN.dataset.original = LETTER;
    } else {
      LETTER_SPAN.textContent = LETTER;
    }
    wordContainer.appendChild(LETTER_SPAN);
  }
}

function checkGuess(letter) {
  if (guessedLetters.includes(letter)) {
    RESULT_TEXT.textContent = `You already guessed ${letter.toUpperCase()}!`;
    RESULT_TEXT.style.color = "black";
    RESULT_TEXT.style.fontSize = "1.5rem";
  } else {
    guessedLetters.push(letter);
    if (word.includes(letter)) {
      const WORD_SPANS = wordContainer.children;
      for (const SPAN of WORD_SPANS) {
        if (SPAN.dataset.original === letter) {
          SPAN.textContent = letter;
        }
      }
      RESULT_TEXT.textContent = `${letter.toUpperCase()} is correct!`;
      RESULT_TEXT.style.color = "green";
      RESULT_TEXT.style.fontSize = "1.5rem";
      checkWin();
    } else {
      chances--;
      updateHangmanImage();
      RESULT_TEXT.textContent = `${letter.toUpperCase()} is wrong. ${chances} chances left!`;
      RESULT_TEXT.style.color = "maroon";
      if (chances === 0) {
        gameOver();
      }
    }
  }
}

function updateWordContainer(LETTER) {
  const WORD_SPANS = wordContainer.children;
  for (const SPAN of WORD_SPANS) {
    if (SPAN.dataset.original === LETTER) {
      SPAN.textContent = LETTER;
    }
  }
}

function checkWin() {
  const WORD_SPANS = wordContainer.children;
  let win = true;
  for (const SPAN of WORD_SPANS) {
    if (SPAN.textContent === "_") {
      win = false;
      break;
    }
  }
  if (win) {
    HANGMAN_IMAGE.src = "./Images/HangmanWin.png";
    RESULT_TEXT.textContent = "Congratulations! You won!";
    RESULT_TEXT.style.color = "lime";
    RESULT_TEXT.style.fontSize = "1.5rem";
    SUBMIT_BUTTON.disabled = true;
  }
}

function gameOver() {
  RESULT_TEXT.textContent = `Game Over! The word was ${word}.`;
  SUBMIT_BUTTON.disabled = true;
  wordContainer.innerHTML = "";
  let gameOverMessage = document.createElement("p");
  gameOverMessage.textContent = "You've been hanged!";
  wordContainer.appendChild(gameOverMessage);
  RESULT_TEXT.style.color = "red";
  RESULT_TEXT.style.fontSize = "1.5rem";
}

function updateHangmanImage() {
  HANGMAN_IMAGE.src = `./Images/Hangman${8 - chances}.png`;
}

function restartGame() {
  word =
    window.innerWidth < 480
      ? words.filter((w) => w.length <= 10)[
          Math.floor(Math.random() * words.filter((w) => w.length <= 10).length)
        ]
      : words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  createWordContainer();
  RESULT_TEXT.textContent = "";
  SUBMIT_BUTTON.disabled = false;
  chances = 8;
  HANGMAN_IMAGE.src = "./Images/Hangman.png";
  INPUT_FIELD.value = "";
  RESULT_TEXT.textContent = "Coder Hangman Game";
  RESULT_TEXT.style.color = "black";
  RESULT_TEXT.style.textShadow = "none";
  RESULT_TEXT.style.fontSize = "1.5rem";
}

export {
  createWordContainer,
  checkGuess,
  updateWordContainer,
  checkWin,
  gameOver,
  updateHangmanImage,
  restartGame,
};

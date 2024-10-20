import {
  RESTART_BUTTON,
  KEYBOARD_KEYS,
  INPUT_FIELD,
  RESULT_TEXT,
} from "./constants.js";
import { checkGuess, restartGame } from "./game.js";

function addKeyboardKeyListeners() {
  KEYBOARD_KEYS.forEach(addKeyboardKeyListener);
}

function addKeyboardKeyListener(key) {
  if (key.id === "submitButton") {
    key.addEventListener("click", () => {
      const LETTER = INPUT_FIELD.value.toLowerCase().trim();
      if (LETTER.length === 1 && LETTER.match(/[a-z]/i)) {
        checkGuess(LETTER);
        INPUT_FIELD.value = "";
      } else {
        RESULT_TEXT.textContent =
          "Invalid input! Please enter a single letter.";
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        key.click();
      }
    });
  } else if (key.id !== "restart") {
    key.addEventListener("click", () => {
      const LETTER = key.textContent.toUpperCase();
      INPUT_FIELD.value = LETTER;
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === key.textContent.toLowerCase()) {
        key.click();
      }
    });
  }
}

function addRestartButtonListener() {
  RESTART_BUTTON.addEventListener("click", restartGame);
}

function addBackspaceKeyListener() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
      restartGame();
    }
  });
}

export {
  addKeyboardKeyListeners,
  addRestartButtonListener,
  addBackspaceKeyListener,
};

import { createWordContainer } from "./game.js";
import {
  addKeyboardKeyListeners,
  addBackspaceKeyListener,
  addRestartButtonListener,
} from "./keyboard.js";

createWordContainer();
addKeyboardKeyListeners();
addBackspaceKeyListener();
addRestartButtonListener();

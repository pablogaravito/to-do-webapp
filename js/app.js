import { initializeNameInput, initializeTodoForm, displayTodos } from './ui.js';

window.addEventListener('load', () => {
    initializeNameInput();
    initializeTodoForm();
    displayTodos();
});
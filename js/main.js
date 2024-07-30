import { Todo, readTodos, saveTodos, sortTodos } from './todoManager.js';
import { readUsername, saveUsername } from './userManager.js';
import { showAlert } from './alertManager.js';
import { createTodoElement } from './domManager.js';

let todos = [];

function displayTodos() {
  const todosList = document.querySelector('#todos-list');
  todosList.innerHTML = '';
  
  const fragment = document.createDocumentFragment();
  todos.forEach(todo => {
    const todoElement = createTodoElement(
      todo,
      () => {
        todo.toggleDone();
        updateTodos();
      },
      () => {
        const input = todoElement.querySelector('input');
        enableEditing(input, () => {
          todo.content = input.value;
          updateTodos();
        });
      },
      () => {
        todos = todos.filter(t => t !== todo);
        updateTodos();
      }
    );
    fragment.appendChild(todoElement);
  });
  todosList.appendChild(fragment);
}

function enableEditing(input, saveCallback) {
  input.removeAttribute('readonly');
  input.classList.remove('noselect');
  input.focus();

  const saveChanges = () => {
    input.setAttribute('readonly', true);
    input.classList.add('noselect');
    saveCallback();
  };

  input.addEventListener('blur', saveChanges, { once: true });
  input.addEventListener('keyup', e => {
    if (e.key === "Enter") saveChanges();
  }, { once: true });
}

function updateTodos() {
  sortTodos(todos);
  saveTodos(todos);
  displayTodos();
}

function initApp() {
  todos = readTodos();
  const nameInput = document.querySelector('#name');
  const newTodoForm = document.querySelector('#new-todo-form');
  
  nameInput.value = readUsername();
  nameInput.addEventListener('change', e => {
    saveUsername(e.target.value);
  });

  newTodoForm.addEventListener('submit', e => {
    e.preventDefault();
    const { content, category } = e.target.elements;

    if (!content.value || !category.value) {
      showAlert();
      return;
    }

    todos.push(new Todo(content.value, category.value));
    updateTodos();
    
    e.target.reset();
    const categoryElement = document.querySelector(`#category${category.value.charAt(0).toUpperCase() + category.value.slice(1)}`);
    if (categoryElement) {
      categoryElement.checked = true;
    }
  });

  displayTodos();
}

window.addEventListener('load', initApp);
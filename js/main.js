import { Todo, readTodos, saveTodos, sortTodos } from './todoManager.js';
import { readUsername, saveUsername } from './userManager.js';
import { showAlert } from './alertManager.js';
import { createTodoElement } from './domManager.js';

let todos = [];

function displayTodos() {
  const todosList = document.querySelector('#todos-list');
  todosList.innerHTML = '';

  todos.forEach(todo => {
    const todoElement = createTodoElement(
      todo,
      () => {
        todo.toggleDone();
        sortTodos(todos);
        saveTodos(todos);
        displayTodos();
      },
      () => {
        const input = todoElement.querySelector('input');
        input.removeAttribute('readonly');
        input.classList.remove('noselect');
        input.focus();

        const saveChanges = () => {
          input.classList.add('noselect');
          todo.content = input.value;
          sortTodos(todos);
          saveTodos(todos);
          displayTodos();
        };

        input.addEventListener('blur', saveChanges);
        input.addEventListener('keyup', e => {
          if (e.key === "Enter") saveChanges();
        });
      },
      () => {
        todos = todos.filter(t => t !== todo);
        saveTodos(todos);
        displayTodos();
      }
    );
    todosList.appendChild(todoElement);
  });
}

window.addEventListener('load', () => {
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

    const todo = new Todo(content.value, category.value);
    todos.push(todo);
    sortTodos(todos);
    saveTodos(todos);
    
    e.target.reset();
    
    const categoryElement = document.querySelector(`#category${category.value.charAt(0).toUpperCase() + category.value.slice(1)}`);
    if (categoryElement) {
        categoryElement.checked = true;
    }
    
    displayTodos();
  });

  displayTodos();
});
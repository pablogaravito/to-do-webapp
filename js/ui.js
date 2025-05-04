import { addTodo, updateTodo, deleteTodo, getTodos } from './todos.js';
import { readUsername, saveUsername } from './storage.js';

const alertContainer = document.querySelector('.alert-container');

export function showAlert() {
    alertContainer.classList.remove('hidden');
    setTimeout(hideAlert, 1500);
}

function hideAlert() {
    alertContainer.classList.add('hidden');
}

export function initializeNameInput() {
    const nameInput = document.querySelector('#name');
    nameInput.value = readUsername();
    nameInput.addEventListener('change', e => {
        saveUsername(nameInput.value);
    });
}

export function initializeTodoForm() {
    const newTodoForm = document.querySelector('#new-todo-form');
    
    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = e.target;
        
        if (!form.elements.content.value || !form.elements.category.value) {
            showAlert();
            return;
        }
        
        addTodo(form.elements.content.value, form.elements.category.value);
        form.reset();
        
        // reset radio selection
        const categoryValue = form.elements.category.value;
        if (categoryValue) {
            const radioId = `category${categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1)}`;
            const radioElement = document.querySelector(`#${radioId}`);
            if (radioElement) {
                radioElement.checked = true;
            }
        }       
        displayTodos();
    });
}

export function displayTodos() {
    const todosList = document.querySelector('#todos-list');
    todosList.innerHTML = '';
    
    getTodos().forEach(todo => {
        const todoElement = createTodoElement(todo);
        todosList.appendChild(todoElement);
    });
}

function createTodoElement(todo) {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');
    
    // create checkmark section
    const checkDiv = document.createElement('div');
    checkDiv.classList.add('custom-check', todo.category);
    const checkIcon = document.createElement('i');
    checkIcon.classList.add('las', 'la-check');
    const bubbleSpan = document.createElement('span');
    bubbleSpan.classList.add('bubble');
    checkDiv.appendChild(bubbleSpan);
    checkDiv.appendChild(checkIcon);
    
    // create content section
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('todo-item');
    const contentInput = document.createElement('input');
    contentInput.type = 'text';
    contentInput.classList.add('noselect');
    contentInput.value = todo.content;
    contentInput.readOnly = true;
    contentDiv.appendChild(contentInput);
    
    // create actions section
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');
    const editBtn = createActionButton('edit', 'res/edit.svg', 'editar');
    const deleteBtn = createActionButton('delete', 'res/trash.svg', 'borrar');
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    
    // assemble the todo element
    todoContainer.appendChild(checkDiv);
    todoContainer.appendChild(contentDiv);
    todoContainer.appendChild(actionsDiv);
    
    // set done state if needed
    if (todo.done) {
        contentDiv.classList.add('done');
        checkDiv.classList.add('custom-checked');
    }
    
    // event listeners
    setupTodoEventListeners(todoContainer, todo, checkDiv, contentInput, editBtn, deleteBtn);
    
    return todoContainer;
}

function createActionButton(className, iconSrc, altText) {
    const button = document.createElement('button');
    button.classList.add(className, 'main-button');
    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.alt = altText;
    button.appendChild(icon);
    return button;
}

function setupTodoEventListeners(container, todo, checkDiv, contentInput, editBtn, deleteBtn) {
    // toggle done state
    checkDiv.addEventListener('click', () => {
        updateTodo(todo, { done: !todo.done });
        displayTodos();
    });
    
    // edit todo
    editBtn.addEventListener('click', () => {
        contentInput.readOnly = false;
        contentInput.classList.remove('noselect');
        contentInput.focus();
    });
    
    // save edited todo
    contentInput.addEventListener('blur', () => saveTodoEdit(todo, contentInput));
    contentInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') saveTodoEdit(todo, contentInput);
    });
    
    // delete todo
    deleteBtn.addEventListener('click', () => {
        deleteTodo(todo);
        displayTodos();
    });
}

function saveTodoEdit(todo, input) {
    input.classList.add('noselect');
    input.readOnly = true;
    updateTodo(todo, { content: input.value });
    displayTodos();
}
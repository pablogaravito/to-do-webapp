window.addEventListener('load', () => {

    todos = readTodos();
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = readUsername();

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        saveUsername(nameInput.value);
    });

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        if (!e.target.elements.content.value) return;
        if (!e.target.elements.category.value) return;

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);
        sortTodos();
        saveTodos();
        e.target.reset();
        displayTodos();
    });
    displayTodos();
});

function displayTodos() {
    const todosList = document.querySelector('#todos-list');

    todosList.innerHTML = '';

    sortTodos();

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;

        span.classList.add('bubble');

        span.classList.add(todo.category);

        content.classList.add('todo-content');
        actions.classList.add('actions');

        editBtn.classList.add('edit');
        deleteBtn.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly/>`;
        editBtn.innerText = 'Editar';
        deleteBtn.innerText = 'Borrar';

        label.appendChild(input);
        label.appendChild(span);
        //label.appendChild(content);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todosList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            sortTodos();
            saveTodos();

            todoItem.classList.toggle('done');
            displayTodos();
        });

        editBtn.addEventListener('click', () => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                todo.content = e.target.value;
                saveTodos();
                displayTodos();
            });         
        });

        deleteBtn.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            saveTodos();
            displayTodos();
        });
    });
}

function readUsername() {
    return localStorage.getItem('username') || '';
}

function readTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

function saveUsername(value) {
    localStorage.setItem('username', value);
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function sortTodos() {
    todos.sort((a,b) => b.createdAt - a.createdAt);
    todos.sort((a, b) => a.done - b.done);
}


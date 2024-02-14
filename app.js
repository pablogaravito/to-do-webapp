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

        if ((!e.target.elements.content.value) || (!e.target.elements.category.value)) {
            showAlert();
            return;
        }
        
        let categoryValue = e.target.elements.category.value;

        const todo = {
            content: e.target.elements.content.value,
            category: categoryValue,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);
        sortTodos();
        saveTodos();
        e.target.reset();
        if (categoryValue == 'work') {
            document.querySelector('#categoryWork').checked = true;
        } else {
            document.querySelector('#categoryPersonal').checked = true;
        }
        displayTodos();
    });
    displayTodos();
});

function displayTodos() {
    const todosList = document.querySelector('#todos-list');

    todosList.innerHTML = ''; 

    todos.forEach(todo => {
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo-container');
        const todoCustomCheck = document.createElement('div');
        todoCustomCheck.classList.add('custom-check');
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        const content = document.createElement('div');
        content.classList.add('todo-content');
        const checkI = document.createElement('i');
        checkI.classList.add('las');
        checkI.classList.add('la-check');
        const actions = document.createElement('div');
        actions.classList.add('actions');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        const span = document.createElement('span');
        span.classList.add('bubble');
        todoCustomCheck.classList.add(todo.category);

        todoCustomCheck.appendChild(span);
        todoCustomCheck.appendChild(checkI);
        
        content.innerHTML = `<input class="noselect" type="text" value="${todo.content}" readonly/>`;
        editBtn.innerHTML = '<img src="res/edit.svg" alt="editar">';
        deleteBtn.innerHTML = '<img src="res/trash.svg" alt="borrar">';
        editBtn.classList.add('edit');
        editBtn.classList.add('main-button');
        deleteBtn.classList.add('delete');
        deleteBtn.classList.add('main-button');
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        todoItem.appendChild(content);
        todoContainer.appendChild(todoCustomCheck);
        todoContainer.appendChild(todoItem);
        todoContainer.appendChild(actions);

        if (todo.done) {
            todoItem.classList.add('done');
            todoCustomCheck.classList.add('custom-checked');
        }

        todosList.appendChild(todoContainer);

        todoCustomCheck.addEventListener('click', function() {
            todo.done = !todo.done;
            sortTodos();
            saveTodos();            
            displayTodos();
        });

        editBtn.addEventListener('click', () => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.classList.remove('noselect');
            input.focus();

            input.addEventListener('blur', e => {
                input.classList.add('noselect');
                todo.content = e.target.value;
                sortTodos();
                saveTodos();
                displayTodos();
            });       
            
            input.addEventListener('keyup', e => {
                if (e.key === "Enter") {
                    input.classList.add('noselect');
                    todo.content = e.target.value;
                    sortTodos();
                    saveTodos();
                    displayTodos();
                }
            });
        });

        deleteBtn.addEventListener('click', () => {
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

function showAlert() {
    const alertContainer = document.querySelector('.alert-container');
    alertContainer.classList.remove('hidden');
    setTimeout(hideAlert, 1500);
}

function hideAlert() {
    const alertContainer = document.querySelector('.alert-container');
    alertContainer.classList.add('hidden');
}

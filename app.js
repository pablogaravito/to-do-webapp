const addBtn = document.querySelector('#add-btn');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addBtn.addEventListener('click', add);

function add() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        return;
    }
    const task = {text: taskText};
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    const newTaskText = prompt('Edita la tarea: ', tasks[index].text);

    if (newTaskText) {
        tasks[index].text = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <hr>
            <button class="edit-button" onclick="editTask(${index})">Editar</button>
            <button class="delete-button" onclick="deleteTask(${index})">Borrar</button>
        `;
        taskList.appendChild(li);
    });
};

displayTasks();
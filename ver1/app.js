const addBtn = document.querySelector('#add-btn');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

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

function checkTask(index) {
    const li = taskList.index(index);
    li.text = 'lol';
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <hr>
            <input type="image" class="img-button check-button" src="res/check.png" onclick="checkTask(${index})" />
            <input type="image" class="img-button edit-button" src="res/edit.png" onclick="editTask(${index})" />
            <input type="image" class="img-button delete-button" src="res/remove.png" onclick="deleteTask(${index})" /> 
        `;
        taskList.appendChild(li);
    });
};

displayTasks();
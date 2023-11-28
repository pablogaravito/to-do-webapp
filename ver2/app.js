const inputBox = document.querySelector('#input-box');
const taskList = document.querySelector('#task-list');

const addBtn = document.querySelector('add-btn');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addBtn.addEventListener('click', addTask);

const addTask = () => {
    const taskText = inputBox.value.trim();
    if (!taskText) return;

    const task = {text: taskText};
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    inputBox.value = '';
    displayTasks();
}

const displayTasks = () => {
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
}


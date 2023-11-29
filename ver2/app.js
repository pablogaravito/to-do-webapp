class Task {
    constructor(text, done) {
        this.text = text;
        this.done = done;
    }

    get isDone() {
        return this.done;
    }

    set isDone(value) {
        this.done = value;
    }
}

const inputBox = document.querySelector('#input-box');
const taskList = document.querySelector('#task-list');

const addBtn = document.querySelector('#add-btn');
const tasks = readTasks();

addBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = inputBox.value.trim();
    if (!taskText) return;

    const task = new Task(taskText, false);
    tasks.push(task);
    saveTasks();
    inputBox.value = '';
    displayTasks();
}

function checkTask(index) {
    let done = tasks[index].isDone;
    tasks[index].done = !done;
    saveTasks();
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";
    console.log(tasks);
    
    tasks.sort((a, b) => a.isDone - b.isDone);
    tasks.forEach((task, index) => {
        console.log(task);
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span onclick="checkTask(${index})">${task.text}</span>
            
            <span class="deleteSpan" onclick="deleteTask(${index})">\u00d7</span>
        `;
        console.log(task.isDone);
        if (task.isDone) {
            li.classList.add('checked');
        } else {
            li.classList.remove('checked');
        }

        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function readTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('todo')) || [];
    const tasks = [];
    savedTasks.forEach((task, index) => {
        tasks.push(Object.assign(new Task(), task));
    });
    return tasks;
}

function saveTasks() {
    localStorage.setItem('todo', JSON.stringify(tasks));
}

displayTasks();


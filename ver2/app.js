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

const testTask = new Task('hello', false);
console.log(testTask.isDone);
testTask.done = true;
console.log(testTask.isDone);


const inputBox = document.querySelector('#input-box');
const taskList = document.querySelector('#task-list');

const addBtn = document.querySelector('#add-btn');
const tasks = JSON.parse(localStorage.getItem('todo')) || [];

addBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = inputBox.value.trim();
    if (!taskText) return;

    const task = new Task(taskText, false);
    tasks.push(task);
    localStorage.setItem('todo', JSON.stringify(tasks));
    inputBox.value = '';
    displayTasks();
}

function checkTask(index) {
    let done = tasks[index].isDone;
    tasks[index].done = !done;
    done = tasks[index].isDone;
    displayTasks();
}

const displayTasks = () => {
    taskList.innerHTML = "";
    
    tasks.sort((a, b) => a.isDone - b.isDone);
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span onclick="checkTask(${index})">${task.text}</span>
            
            <span class="deleteSpan" onclick="deleteTask(${index})">\u00d7</span>
        `;
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
    localStorage.setItem('todo', JSON.stringify(tasks));
    displayTasks();
}

displayTasks();


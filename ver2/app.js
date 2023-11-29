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
// const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const tasks = [];

addBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = inputBox.value.trim();
    if (!taskText) return;

    const task = new Task(taskText, false);
    tasks.push(task);
    //localStorage.setItem('tasks', JSON.stringify(tasks));
    inputBox.value = '';
    displayTasks();
}

function checkTask(index) {
    let done = tasks[index].done;
    tasks[index].done = !done;
}

const displayTasks = () => {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span onclick="checkTask(${index})>${task.text}</span>
            
            <span class="deleteSpan" onclick="deleteTask(${index})">\u00d7</span>
        `;
        if (task.isDone) {
            
        }
        // li.innerHTML = task.text;
        // let span = document.createElement('span');
        // span.innerText = '\u00d7';
        // li.appendChild(span);
        taskList.appendChild(li);
    });
}

taskList.addEventListener('click', function(e){
    console.log('jue');
    if (e.target.tagName.toUpperCase() === 'LI') {
        e.target.classList.toggle('checked');
    }
});

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// const task = new Task('hello', false); 

// console.log(task);

// task.done = true;

// console.log(task);

// displayTasks();


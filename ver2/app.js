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
    let done = tasks[index].isDone;
    // console.log('current status', done);
    tasks[index].done = !done;
    done = tasks[index].isDone;
    // console.log('new current status', done);
    displayTasks();
}

const displayTasks = () => {
    taskList.innerHTML = "";
    // console.log(tasks);
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        // console.log(task);
        li.innerHTML = `
            <span onclick="checkTask(${index})">${task.text}</span>
            
            <span class="deleteSpan" onclick="deleteTask(${index})">\u00d7</span>
        `;
        if (task.isDone) {
            // console.log('done done');
            li.classList.add('checked');
        } else {
            li.classList.remove('checked');
            // console.log('not done man');
        }
        // li.innerHTML = task.text;
        // let span = document.createElement('span');
        // span.innerText = '\u00d7';
        // li.appendChild(span);
        taskList.appendChild(li);
    });
}

// taskList.addEventListener('click', function(e){
//     //console.log('jue');
//     if (e.target.tagName.toUpperCase() === 'LI') {
//         e.target.classList.toggle('checked');
//     }
// });

function deleteTask(index) {
    tasks.splice(index, 1);
    // localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}


displayTasks();


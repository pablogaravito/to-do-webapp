import { readTodos, saveTodos } from './storage.js';

let todos = readTodos();

export function getTodos() {
    return [...todos];
}

export function addTodo(content, category) {
    const todo = {
        content,
        category,
        done: false,
        createdAt: new Date().getTime()
    };
    todos.push(todo);
    sortTodos();
    saveTodos(todos);
    return todo;
}

export function updateTodo(todo, updates) {
    Object.assign(todo, updates);
    sortTodos();
    saveTodos(todos);
}

export function deleteTodo(todoToDelete) {
    todos = todos.filter(todo => todo !== todoToDelete);
    saveTodos(todos);
}

export function sortTodos() {
    todos.sort((a, b) => b.createdAt - a.createdAt);
    todos.sort((a, b) => a.done - b.done);
}
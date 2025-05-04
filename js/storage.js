export function readUsername() {
    return localStorage.getItem('username') || '';
}

export function saveUsername(value) {
    localStorage.setItem('username', value);
}

export function readTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}   
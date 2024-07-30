export class Todo {
  constructor(content, category) {
    this.content = content;
    this.category = category;
    this.done = false;
    this.createdAt = Date.now();
  }

  toggleDone() {
    this.done = !this.done;
  }
}

const STORAGE_KEY_TODOS = 'todos';

export function readTodos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_TODOS) || '[]');
}

export function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(todos));
}

export function sortTodos(todos) {
  return todos.sort((a, b) => b.createdAt - a.createdAt)
               .sort((a, b) => a.done - b.done);
}
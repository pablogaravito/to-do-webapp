export class Todo {
  constructor(content, category) {
    this.content = content;
    this.category = category;
    this.done = false;
    this.createdAt = new Date().getTime();
  }

  toggleDone() {
    this.done = !this.done;
  }
}

const STORAGE_KEY_TODOS = 'todos';

export function readTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_TODOS)) || [];
  } catch (error) {
    console.error('Error reading todos:', error);
    return [];
  }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos:', error);
  }
}

export function sortTodos(todos) {
  return todos.sort((a, b) => b.createdAt - a.createdAt)
               .sort((a, b) => a.done - b.done);
}
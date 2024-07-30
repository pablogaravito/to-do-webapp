export function createTodoElement(todo, onToggle, onEdit, onDelete) {
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo-container');

  const todoCustomCheck = document.createElement('div');
  todoCustomCheck.classList.add('custom-check', todo.category);
  
  const span = document.createElement('span');
  span.classList.add('bubble');
  
  const checkI = document.createElement('i');
  checkI.classList.add('las', 'la-check');
  
  todoCustomCheck.appendChild(span);
  todoCustomCheck.appendChild(checkI);

  const todoItem = document.createElement('div');
  todoItem.classList.add('todo-item');
  
  const content = document.createElement('div');
  content.classList.add('todo-content');
  content.innerHTML = `<input class="noselect" type="text" value="${todo.content}" readonly/>`;

  const actions = document.createElement('div');
  actions.classList.add('actions');
  
  const editBtn = document.createElement('button');
  editBtn.innerHTML = '<img src="res/edit.svg" alt="editar">';
  editBtn.classList.add('edit', 'main-button');
  
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<img src="res/trash.svg" alt="borrar">';
  deleteBtn.classList.add('delete', 'main-button');

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  todoItem.appendChild(content);
  todoContainer.appendChild(todoCustomCheck);
  todoContainer.appendChild(todoItem);
  todoContainer.appendChild(actions);

  if (todo.done) {
    todoItem.classList.add('done');
    todoCustomCheck.classList.add('custom-checked');
  }

  todoCustomCheck.addEventListener('click', onToggle);
  editBtn.addEventListener('click', onEdit);
  deleteBtn.addEventListener('click', onDelete);

  return todoContainer;
}
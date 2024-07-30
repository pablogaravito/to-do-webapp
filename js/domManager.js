export function createTodoElement(todo, onToggle, onEdit, onDelete) {
  const todoContainer = document.createElement('div');
  todoContainer.className = `todo-container ${todo.done ? 'done' : ''}`;

  todoContainer.innerHTML = `
    <div class="custom-check ${todo.category} ${todo.done ? 'custom-checked' : ''}">
      <span class="bubble"></span>
      <i class="las la-check"></i>
    </div>
    <div class="todo-item">
      <div class="todo-content">
        <input class="noselect" type="text" value="${todo.content}" readonly/>
      </div>
    </div>
    <div class="actions">
      <button class="edit main-button"><img src="res/edit.svg" alt="editar"></button>
      <button class="delete main-button"><img src="res/trash.svg" alt="borrar"></button>
    </div>
  `;

  const todoCustomCheck = todoContainer.querySelector('.custom-check');
  const editBtn = todoContainer.querySelector('.edit');
  const deleteBtn = todoContainer.querySelector('.delete');

  todoCustomCheck.addEventListener('click', onToggle);
  editBtn.addEventListener('click', onEdit);
  deleteBtn.addEventListener('click', onDelete);

  return todoContainer;
}
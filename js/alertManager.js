export function showAlert() {
  const alertContainer = document.querySelector('.alert-container');
  alertContainer.classList.remove('hidden');
  setTimeout(hideAlert, 1500);
}

function hideAlert() {
  const alertContainer = document.querySelector('.alert-container');
  alertContainer.classList.add('hidden');
}
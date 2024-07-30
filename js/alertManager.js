let timeoutId;

export function showAlert() {
  const alertContainer = document.querySelector('.alert-container');
  alertContainer.classList.remove('hidden');
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => alertContainer.classList.add('hidden'), 1500);
}
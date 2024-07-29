const STORAGE_KEY_USERNAME = 'username';

export function readUsername() {
  return localStorage.getItem(STORAGE_KEY_USERNAME) || '';
}

export function saveUsername(value) {
  localStorage.setItem(STORAGE_KEY_USERNAME, value);
}
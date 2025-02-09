// storage.js
export function saveGameProgress(progress) {
  if (progress) {
    localStorage.setItem('simonGameProgress', JSON.stringify(progress));
  } else {
    localStorage.removeItem('simonGameProgress');
  }
}

export function loadGameProgress() {
  const progress = localStorage.getItem('simonGameProgress');
  return progress ? JSON.parse(progress) : null;
}

document.getElementById('easy-btn').addEventListener('click', () => {
  localStorage.setItem('difficulty', 'easy');
  window.location.href = 'quiz.html';  // Redirect to the quiz page
});

document.getElementById('medium-btn').addEventListener('click', () => {
  localStorage.setItem('difficulty', 'medium');
  window.location.href = 'quiz.html';  // Redirect to the quiz page
});

document.getElementById('hard-btn').addEventListener('click', () => {
  localStorage.setItem('difficulty', 'hard');
  window.location.href = 'quiz.html';  // Redirect to the quiz page
});

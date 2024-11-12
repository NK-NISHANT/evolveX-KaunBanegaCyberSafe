let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
const questionText = document.querySelector('.question-text');
const options = document.querySelectorAll('.option');
const timerDisplay = document.querySelector('#time-remaining');
const timerBar = document.querySelector('#timer-bar');
const explanationContainer = document.querySelector('.explanation-container');
const explanationText = document.querySelector('.explanation-text');
const nextQuestionBtn = document.querySelector('.next-question-btn');
const goToMenuBtn = document.querySelector('.go-to-menu-btn');

const difficulty = localStorage.getItem('difficulty');

// Fetch questions from the JSON file
fetch('questions.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load questions.');
    }
    return response.json();
  })
  .then(data => {
    questions = data[difficulty];
    loadQuestion();
  })
  .catch(error => {
    console.error("Error loading questions:", error);
    alert("Failed to load questions. Please try again.");
  });

function loadQuestion() {
  timeLeft = 30;
  clearInterval(timer);
  startTimer();

  const question = questions[currentQuestion];
  questionText.textContent = question.question;

  options.forEach((option, index) => {
    option.textContent = question.options[index];
    option.classList.remove('correct', 'incorrect');
    option.disabled = false;
    option.addEventListener('click', () => checkAnswer(index));
  });

  explanationContainer.style.display = 'none';
  nextQuestionBtn.style.display = 'none';
  goToMenuBtn.style.display = 'none';
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `${timeLeft}s`;
    const progress = (timeLeft / 30) * 100;
    timerBar.style.width = `${progress}%`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      markAsIncorrect();
    }
  }, 1000);
}

function checkAnswer(selectedIndex) {
  const question = questions[currentQuestion];
  const isCorrect = selectedIndex === question.answer;

  options.forEach(option => option.disabled = true);
  clearInterval(timer); // Stop the timer when an answer is selected

  if (isCorrect) {
    score++;
    options[selectedIndex].classList.add('correct');
  } else {
    options[selectedIndex].classList.add('incorrect');
    // Highlight the correct answer in green
    options[question.answer].classList.add('correct');
  }

  showExplanation();
}

function markAsIncorrect() {
  options.forEach(option => option.disabled = true);
  options[questions[currentQuestion].answer].classList.add('incorrect');
  showExplanation();
}

function showExplanation() {
  const question = questions[currentQuestion];
  explanationText.textContent = question.explanation;
  explanationContainer.style.display = 'block';
  nextQuestionBtn.style.display = 'inline-block';

  // If it's the last question, show "Go to Menu" button instead of "Next Question"
  if (currentQuestion === questions.length - 1) {
    nextQuestionBtn.style.display = 'none';
    goToMenuBtn.style.display = 'inline-block';
  }
}

nextQuestionBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    // Quiz ends here
  }
});

function goToMenu() {
  // Redirect to the menu or main page
  window.location.href = "menu.html";  // Replace with your actual menu page link
}

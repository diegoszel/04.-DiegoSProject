let score = 0;
let totalQuestions = 0;
let currentQuestion = null;

// Load history from localStorage on page load
window.onload = () => {
  loadHistory();
};

function startQuiz() {
  score = 0;
  totalQuestions = 0;
  document.getElementById("result").textContent = "";
  document.querySelector("#history tbody").innerHTML = "";
  nextQuestion();
}

// On click of the clear history button, reset the game - clearHistory() function

function clearHistory() {
  localStorage.removeItem("quizHistory");
  document.querySelector("#history tbody").innerHTML = "";
  score = 0;
  totalQuestions = 0;
}

// On operator or difficulty change, generate a new question
document.getElementById("operator").addEventListener("change", nextQuestion);
document.getElementById("difficulty").addEventListener("change", nextQuestion);

function nextQuestion() {
  const difficulty = parseInt(document.getElementById("difficulty").value);
  const operator = document.getElementById("operator").value;
  const num1 = Math.floor(Math.random() * difficulty) + 1;
  const num2 = Math.floor(Math.random() * difficulty) + 1;

  currentQuestion = {
    num1,
    num2,
    operator,
    answer: calculateAnswer(num1, num2, operator),
  };

  document.getElementById(
    "question"
  ).textContent = `${num1} ${operator} ${num2}`;
  document.getElementById("answer").value = "";
}

function calculateAnswer(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return parseFloat((num1 / num2).toFixed(2));
  }
}

function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById("answer").value);
  if (isNaN(userAnswer)) {
    alert("Please enter a valid number.");
    return;
  }

  totalQuestions++;
  const isCorrect = userAnswer === currentQuestion.answer;
  if (isCorrect) {
    score++;
  }

  updateHistory(
    currentQuestion.num1,
    currentQuestion.num2,
    currentQuestion.operator,
    userAnswer,
    currentQuestion.answer,
    isCorrect
  );

  if (totalQuestions < 10) {
    nextQuestion();
  } else {
    document.getElementById(
      "result"
    ).textContent = `You got ${score} out of 10 questions correct!`;
    document.getElementById("question").textContent = "Game Over!";
  }
}

function updateHistory(
  num1,
  num2,
  operator,
  userAnswer,
  correctAnswer,
  isCorrect
) {
  const row = document.createElement("tr");
  row.innerHTML = `
          <td>${num1} ${operator} ${num2}</td>
          <td>${userAnswer}</td>
          <td>${correctAnswer}</td>
          <td>${isCorrect ? "✔️" : "❌"}</td>
        `;
  document.querySelector("#history tbody").appendChild(row);

  // Save to localStorage
  saveToLocalStorage(
    num1,
    num2,
    operator,
    userAnswer,
    correctAnswer,
    isCorrect
  );
}

function saveToLocalStorage(
  num1,
  num2,
  operator,
  userAnswer,
  correctAnswer,
  isCorrect
) {
  const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  history.push({ num1, num2, operator, userAnswer, correctAnswer, isCorrect });
  localStorage.setItem("quizHistory", JSON.stringify(history));
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  const tbody = document.querySelector("#history tbody");
  history.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${entry.num1} ${entry.operator} ${entry.num2}</td>
            <td>${entry.userAnswer}</td>
            <td>${entry.correctAnswer}</td>
            <td>${entry.isCorrect ? "✔️" : "❌"}</td>
          `;
    tbody.appendChild(row);
  });
}

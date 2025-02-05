const display = document.getElementById("display");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");

let shouldClearDisplay = false;

// Append numbers & operators to display
function appendToDisplay(value) {
  if (shouldClearDisplay) {
    display.value = "";
    shouldClearDisplay = false;
  }
  display.value += value;
}

// Clear display
function clearDisplay() {
  display.value = "";
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Evaluate the result
function calculateResult() {
  try {
    let expression = display.value;
    let result = eval(expression);
    display.value = result;

    // Store history
    saveToHistory(expression, result);
    shouldClearDisplay = true;
  } catch {
    display.value = "Error";
  }
}

// Save calculation to history
function saveToHistory(expression, result) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.push({ expression, result });

  // Keep only last 10 records
  if (history.length > 10) history.shift();

  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
}

// Load history on page load
function renderHistory() {
  historyList.innerHTML = "";
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

  history.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.expression} = ${item.result}`;
    historyList.appendChild(li);
  });
}

// Clear history
clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem("calcHistory");
  renderHistory();
});

// Keyboard Support
document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (!isNaN(key) || "+-*/.%".includes(key)) {
    appendToDisplay(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

// Load history when the page loads
renderHistory();

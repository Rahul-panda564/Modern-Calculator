const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      currentInput = '';
    } else if (value === '√') {
       currentInput += 'Math.sqrt(';
    } else if (value === '^') {
       currentInput += '**';
    } else if (value === '⌫') {
      currentInput = currentInput.slice(0, -1);
    } else if (value === '=') {
      try {
        const result = eval(currentInput).toString();
        addToHistory(currentInput + ' = ' + result);
        currentInput = result;
      } catch (err) {
        currentInput = 'Error';
      }
    } else {
      currentInput += value;
    }

    display.value = currentInput;

    
  });
});
// Dark mode toggle
const toggleTheme = document.getElementById('toggle-theme');
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    currentInput += key;
  } else if (key === 'Enter') {
    try {
      currentInput = eval(currentInput).toString();
    } catch {
      currentInput = 'Error';
    }
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
  } else if (key === 'Escape') {
    currentInput = '';
  }
  display.value = currentInput;
});

function addToHistory(entry) {
  const historyList = document.getElementById('history-list');
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.prepend(li);
}
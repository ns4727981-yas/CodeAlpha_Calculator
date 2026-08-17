const display = document.getElementById('display');
let memory = 0;

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function safeEval(expression) {
  if (!expression.trim()) return '';
  const result = Function(`'use strict'; return (${expression})`)();
  if (!isFinite(result)) throw new Error('Invalid calculation');
  return result;
}

function calculate() {
  try {
    display.value = safeEval(display.value);
  } catch {
    display.value = 'Error';
    setTimeout(clearDisplay, 1500);
  }
}

function calculateSquareRoot() {
  try {
    const val = safeEval(display.value);
    if (val < 0) throw new Error();
    display.value = Math.sqrt(val);
  } catch {
    display.value = 'Error';
    setTimeout(clearDisplay, 1500);
  }
}

function calculatePercentage() {
  try {
    const val = safeEval(display.value);
    display.value = val / 100;
  } catch {
    display.value = 'Error';
    setTimeout(clearDisplay, 1500);
  }
}


function memoryClear() {
  memory = 0;
}

function memoryRecall() {
  display.value = memory.toString();
}

function memoryAdd() {
  try {
    memory += Number(safeEval(display.value));
  } catch {
    display.value = 'Error';
    setTimeout(clearDisplay, 1500);
  }
}

function memorySubtract() {
  try {
    memory -= Number(safeEval(display.value));
  } catch {
    display.value = 'Error';
    setTimeout(clearDisplay, 1500);
  }
}


document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (/^[0-9]$/.test(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key === 'Escape') {
    clearDisplay();
  }
});
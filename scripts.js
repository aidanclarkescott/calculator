//Variables and References
let displayValue = "";
let previousCalculation = "";
const historyBar = document.querySelector(".history-bar");
const historyBarContent = document.querySelector("#history-bar-content");
const mainBar = document.querySelector(".main-bar");
const clearBtn = document.querySelector(".clear");
const plusMinusBtn = document.querySelector(".plus-minus");
const backspaceBtn = document.querySelector(".backspace");
const divideBtn = document.querySelector(".divide-btn");
const multiplyBtn = document.querySelector(".multiply-btn");
const subtractBtn = document.querySelector(".subtract-btn");
const addBtn = document.querySelector(".add-btn");
const dotBtn = document.querySelector(".dot-btn");
const equalsBtn = document.querySelector(".equals-btn");
const num0 = document.querySelector(".num-0");
const num1 = document.querySelector(".num-1");
const num2 = document.querySelector(".num-2");
const num3 = document.querySelector(".num-3");
const num4 = document.querySelector(".num-4");
const num5 = document.querySelector(".num-5");
const num6 = document.querySelector(".num-6");
const num7 = document.querySelector(".num-7");
const num8 = document.querySelector(".num-8");
const num9 = document.querySelector(".num-9");

const numberBtns = document.querySelectorAll("#number");
const operatorBtns = document.querySelectorAll("#operator");
const specialOpBtns = document.querySelectorAll(".special-op");

const calculator = {
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

// Functions
function add(one, two) {
  return one + two;
}

function subtract(one, two) {
  return one - two;
}

function multiply(one, two) {
  return one * two;
}

function divide(one, two) {
  return one / two;
}

function operate(operator, one, two) {
  if (operator == "+") {
    return add(one, two);
  } else if (operator == "−") {
    return subtract(one, two);
  } else if (operator == "×") {
    return multiply(one, two);
  } else if (operator == "÷") {
    return divide(one, two);
  } else if (operator == "=") {
    return two;
  }
}

function updateMainBar() {
  mainBar.textContent = displayValue;
}

function updateHistoryBar() {
  historyBarContent.textContent = previousCalculation;
}

function updateDisplayValue(op) {
  if (displayValue.length < 24) {
    displayValue = `${op}`;
    updateMainBar();
  }
}

function inputDigit(digit) {
  if (calculator.waitingForSecondOperand === true) {
    displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else if (displayValue.length < 24) {
    displayValue += digit;
  }
  updateMainBar();
}

function handleOperator(nextOperator) {
  const { firstOperand, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    previousCalculation = `${calculator.firstOperand} ${calculator.operator} `;
    updateHistoryBar();
    return;
  }

  if (firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result =
      Math.round(operate(String(operator), currentValue, inputValue) * 100) /
      100;
    calculator.firstOperand = result;
    if (nextOperator == "=") {
      previousCalculation += `${inputValue} =`;
      calculator.waitingForSecondOperand = false;
      calculator.operator = null;
      displayValue = String(result);
      updateHistoryBar();
      updateMainBar();
      return;
    }
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  previousCalculation = `${calculator.firstOperand} ${calculator.operator} `;
  updateHistoryBar();
}

function clickAnimation(element, target) {
  element.addEventListener("mousedown", (e) => {
    element.classList.add("no-hover");
    element.classList.add(target);
  });
  element.addEventListener("mouseup", (e) => {
    element.classList.remove("no-hover");
    element.classList.remove(target);
  });
  element.addEventListener("mouseout", (e) => {
    element.classList.remove("no-hover");
    element.classList.remove(target);
  });
}

// Event Listeners
Array.from(numberBtns).forEach((element) => {
  element.addEventListener("click", (e) => {
    inputDigit(e.target.innerHTML);
  });
  clickAnimation(element, "numbers-mouse-down");
});

Array.from(operatorBtns).forEach((element) => {
  element.addEventListener("click", (e) => {
    handleOperator(e.target.innerHTML);
    if (!(e.target.innerHTML == "=")) {
      updateDisplayValue(`${e.target.innerHTML}`);
    }
    updateMainBar();
  });
  clickAnimation(element, "operations-mouse-down");
});

dotBtn.addEventListener("click", (e) => {
  if (!displayValue.includes(".")) {
    inputDigit(".");
  }
});

clickAnimation(dotBtn, "numbers-mouse-down");

plusMinusBtn.addEventListener("click", (e) => {
  if (!(displayValue.charAt(0) == "-")) {
    displayValue = "-" + displayValue;
  } else {
    displayValue = displayValue.substring(1);
  }
  updateMainBar();
});

backspaceBtn.addEventListener("click", (e) => {
  displayValue = displayValue.substring(0, displayValue.length - 1);
  updateMainBar();
});

clearBtn.addEventListener("click", (e) => {
  displayValue = "";
  previousCalculation = "";
  historyBarContent.textContent = "";
  calculator.waitingForSecondOperand = false;
  calculator.firstOperand = null;
  calculator.operator = null;
  updateMainBar();
  updateHistoryBar();
});

Array.from(specialOpBtns).forEach((element) => {
  clickAnimation(element, "special-op-mouse-down");
});

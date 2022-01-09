const operationScreen = document.querySelector('#operation');
const numberScreen = document.querySelector('#number');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('#decimal');
const equalsButton = document.querySelector('#equals');
const deleteButton = document.querySelector('#delete');
const clearButton = document.querySelector('#clear');

let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let resetNumberScreen = false;
let canEvaluate = false;

numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', () => appendNumber(numberButton.textContent));
});

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => setOperator(operatorButton.textContent));
});

decimalButton.addEventListener('click', appendDecimal);

equalsButton.addEventListener('click', evaluate);

deleteButton.addEventListener('click', deleteNumber);

clearButton.addEventListener('click', clear);

function clear() {
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    numberScreen.textContent = '0';
    operationScreen.textContent = '';
    canEvaluate = false;
    resetNumberScreen = false;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            if (b === 0) {
                numberScreen.textContent = 'ERROR';
                alert('Cannot divide by zero.');
                clear();
                return '0';
            } else {
                return a / b;
            }
    }
}

function roundResult(n) {
    return Math.round(n * 1000) / 1000
}

function appendNumber(n) {
    if (resetNumberScreen) {
        numberScreen.textContent = '';
        canEvaluate = true;
        resetNumberScreen = false;
    }
    if (numberScreen.textContent === '0') {
        if (n === '0') {
            return;
        } else {
            numberScreen.textContent = '';
        }
    }
    numberScreen.textContent += n;
}

function setOperator(operator) {
    if (canEvaluate) {
        evaluate();
    }
    firstOperand = numberScreen.textContent;
    currentOperator = operator;
    operationScreen.textContent = `${firstOperand} ${currentOperator}`;
    canEvaluate = false;
    resetNumberScreen = true;
}

function appendDecimal() {
    let n = numberScreen.textContent;
    if (n.charAt(n.length - 1) !== '.') {
        if (resetNumberScreen) {
            numberScreen.textContent = '0';
            resetNumberScreen = false;
            canEvaluate = true;
        }
        numberScreen.textContent += '.';
    }
}

function evaluate() {
    if (canEvaluate) {
        secondOperand = numberScreen.textContent;
        operationScreen.textContent += ` ${secondOperand} =`;
        numberScreen.textContent = roundResult(operate(currentOperator, firstOperand, secondOperand));
        canEvaluate = false;
    }
}

function deleteNumber() {
    if (numberScreen.textContent.length > 1) {
        numberScreen.textContent = numberScreen.textContent.slice(0, -1);
    } else {
        numberScreen.textContent = '0';
    }
}
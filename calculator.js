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

window.addEventListener('keydown', keyboardInput);

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
    firstOperand = '';
    secondOperand = '';
    currentOperator = '';
    numberScreen.textContent = '0';
    operationScreen.textContent = '';
    canEvaluate = false;
    resetNumberScreen = false;
}

function error(s) {
    numberScreen.textContent = 'ERROR';
    alert(s);
    clear();
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return a + b;
        case '−':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            if (b === 0) {
                error('Cannot divide by zero.');
                return '0';
            } else {
                return a / b;
            }
    }
}

function roundNumber(n) {
    return Math.round(n * 100000000) / 100000000; // Round to eight decimals
}

function appendNumber(n) {
    if (resetNumberScreen) {
        numberScreen.textContent = '';
        canEvaluate = true;
        resetNumberScreen = false;
    }
    if (numberScreen.textContent.length < 8) {
        if (numberScreen.textContent === '0') {
            if (n === '0') {
                return;
            } else {
                numberScreen.textContent = '';
            }
        }
        numberScreen.textContent += n;
    }
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
        const answer = roundNumber(operate(currentOperator, firstOperand, secondOperand));
        if (answer.toString().length > 8) {
            error('Result too long.');
        } else {
            numberScreen.textContent = answer;
            canEvaluate = false;
        }
    }
}

function deleteNumber() {
    if (numberScreen.textContent.length > 1) {
        numberScreen.textContent = numberScreen.textContent.slice(0, -1);
    } else {
        numberScreen.textContent = '0';
    }
}

function convertOperator(operator) {
    switch (operator) {
        case '+':
            return '+';
        case '-':
            return '−';
        case '*':
            return '×';
        case '/':
            return '÷';
    }
}

function keyboardInput(e) {
    let val = e.key;
    if (val >= 0 && val <= 9) appendNumber(val);
    else if (val === '.') appendDecimal();
    else if (val === '=' || val === 'Enter') evaluate();
    else if (val === 'Backspace') deleteNumber();
    else if (val === 'Escape') clear();
    else if (val === '+' || val === '-' || val === '*' || val === '/') setOperator(convertOperator(val));
}
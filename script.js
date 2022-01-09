const operation = document.querySelector('#operation');
const currentNumber = document.querySelector('#current-number');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');
const decimalButton = document.querySelector('#decimal');

let number = '';
let operator = '';
let newNumber = false;
let canEquals = false;

function operate(op, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            return a / b;
    }
}

// Numbers
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (newNumber) {
            currentNumber.textContent = '';
            newNumber = false;
            canEquals = true;
        }
        if (currentNumber.textContent === '0') {
            if (button.textContent === '0') {
                return;
            } else {
                currentNumber.textContent = '';
            }
        }
        currentNumber.textContent += button.textContent;
    });
});

// Operators
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operation.textContent !== '' && canEquals) {
            operation.textContent += currentNumber.textContent + '=';
            currentNumber.textContent = operate(operator, number, currentNumber.textContent);
            canEquals = false;
        }
        operator = button.textContent;
        number = currentNumber.textContent;
        operation.textContent = currentNumber.textContent + button.textContent;
        newNumber = true;
    });
});

// Decimal
decimalButton.addEventListener('click', () => {
    let n = currentNumber.textContent;
    if (n.charAt(n.length - 1) !== '.') {
        if (newNumber) {
            currentNumber.textContent = '0';
            newNumber = false;
            canEquals = true;
        }
        currentNumber.textContent += '.';
    }
});

// Equals
equalsButton.addEventListener('click', () => {
    if (canEquals) {
        operation.textContent += currentNumber.textContent + '=';
        currentNumber.textContent = operate(operator, number, currentNumber.textContent);
        canEquals = false;
    }
});

// Clear
clearButton.addEventListener('click', () => {
    operation.textContent = '';
    currentNumber.textContent = '0';
});

// Delete
deleteButton.addEventListener('click', () => {
    if (currentNumber.textContent.length !== 1) {
        currentNumber.textContent = currentNumber.textContent.slice(0, -1);
    } else {
        currentNumber.textContent = '0';
    }
});
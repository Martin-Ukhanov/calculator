function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mult(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

function operate(op, a, b) {
    switch (op) {
        case 'add':
            return add(a, b);
        case 'sub':
            return sub(a, b);
        case 'mult':
            return mult(a, b);
        case 'div':
            return div(a, b);
    }
}
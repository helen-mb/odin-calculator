const display = document.getElementById('display');
const numKeys = document.querySelectorAll('button.num');
const operators = document.querySelectorAll('button.operator');
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const divideBtn = document.getElementById('divideBtn');
const equalsBtn = document.getElementById('equalsBtn');
const clearBtn = document.getElementById('clearBtn');

let runningTotal = null;

//The basic math operations between two numbers:
const add = function (a, b) {
    return a + b;
}

const subtract = function (a, b) {
    return (a - b);
}

const multiply = function (a, b) {
    return a * b;
}

const divide = function (a, b) {
    return a / b;
}

const operate = function (operator, a, b) {
    return operator(a, b);
}

//Printing the numbers to the display on click
numKeys.forEach((numKey) => numKey.addEventListener('click', e => display.value += e.target.value));

//FIXME:
//Populating operate function with the click of an operator button
operators.forEach((operator) => operator.addEventListener('click', e => operate(e.target.value, [display.value, null])));
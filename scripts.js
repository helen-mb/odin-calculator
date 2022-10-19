const display = document.getElementById('display');
const numKeys = document.querySelectorAll('button.num');
const opKeys = document.querySelectorAll('button.operator');
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const divideBtn = document.getElementById('divideBtn');
const equalsBtn = document.getElementById('equalsBtn');
const clearBtn = document.getElementById('clearBtn');

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
numKeys.forEach((numBtn) => numBtn.addEventListener('click', e => display.value += e.target.value));

//TODO: refresh the display value only after operator is clicked
//Prepping the operate function with the click of an operator button
let runningTotal = null; // presently unused
let operandA = null;
let opName = null;
const hold = (e) => {
    operandA = display.value;
    opName = e.target.value;
    display.value = null;
    console.log(operandA, opName, display.value);
}
opKeys.forEach((opBtn) => opBtn.addEventListener('click', hold));
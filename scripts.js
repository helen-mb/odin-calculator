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

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return (a - b);
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

//NOTE: opName is not recognized as a function type, only a string, hence why using it as a keyword for a callback function did not work?
let runningTotal = null; 
function operate(opName, a, b) {
    if (opName === 'add') {runningTotal = add(+a, +b)}
    else if (opName === 'subtract') {runningTotal = subtract(a, b)}
    else if (opName === 'multiply') {runningTotal = multiply(a, b)}
    else if (opName === 'divide') {runningTotal = divide(a, b)}
    display.value = null;
    console.log(runningTotal);
    return runningTotal;
}

//Printing the numbers to the display on click
numKeys.forEach((numBtn) => numBtn.addEventListener('click', e => display.value += e.target.value));

//TODO: refresh the display value only after operator is clicked
//Prepping the operate function with the click of an operator button
let storedValue = null;
let opName = null;
const hold = (e) => {
    storedValue = display.value;
    opName = e.target.value;
    display.value = null; // presently clears the display screen entirely
}
opKeys.forEach((opBtn) => opBtn.addEventListener('click', hold));

//Running the operate function with the click of the equals button
equalsBtn.addEventListener('click', () => operate(opName, storedValue, display.value));
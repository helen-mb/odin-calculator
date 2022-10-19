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

let runningTotal = null; 
let storedValue = null;
let opName = null;
let displayRefresh = false;

//A function that concatenates the selected number values into the display screen
function updateDisplay(e) {
    if (displayRefresh) {
        display.value = null;
        displayRefresh = false;
    }
    display.value += e.target.value;
}
//Prepping the operate function with the click of an operator button
const hold = (e) => {
    storedValue = display.value;
    opName = e.target.value;
    displayRefresh = true;
}
//NOTE: opName is not recognized as a function type, only a string, hence why using it as a keyword for a callback function did not work?
function operate(opName, a, b) {
    if (opName === 'add') {runningTotal = add(+a, +b)}
    else if (opName === 'subtract') {runningTotal = subtract(a, b)}
    else if (opName === 'multiply') {runningTotal = multiply(a, b)}
    else if (opName === 'divide') {runningTotal = divide(a, b)}
    display.value = runningTotal;
    storedValue = null;
    displayRefresh = true;
    console.log(runningTotal);
    return runningTotal;
}

//Adding event listeners onto the buttons to run the relevant functions
numKeys.forEach((numBtn) => numBtn.addEventListener('click', updateDisplay));
opKeys.forEach((opBtn) => opBtn.addEventListener('click', hold));
equalsBtn.addEventListener('click', () => operate(opName, storedValue, display.value));
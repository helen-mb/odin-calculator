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

//The variables used within the button functions
let runningTotal = null; 
let activeValue = null;
let opName = null;
let displayRefresh = false;
let clearAll = false;

//A function that concatenates the selected number values into the display screen
function updateDisplay(e) {
    if (displayRefresh) {
        display.value = null;
        displayRefresh = false;
    }
    runningTotal ? activeValue = true : activeValue = false;
    clearAll = false;
    display.value += e.target.value;
}
//Prepping the operate function with the click of an operator button
function hold (e) {
    if(runningTotal === null) {
        runningTotal = display.value;
    } else if(activeValue){
        operate(opName, runningTotal, display.value);
    }
    displayRefresh = true;
    opName = e.target.value;
}
//A function to clear the display, and (optionally) the stored values
function clear () {
    if(clearAll) {
        activeValue = false;
        runningTotal = null;
        clearAll = false;
    }
    display.value = null;
    clearAll = true;
}
//FIXME: opName is not recognized as a function type, only a string, hence why using it as a keyword for a callback function did not work?
function operate(opName, a, b) {
    if (opName === 'add') {runningTotal = add(+a, +b)}
    else if (opName === 'subtract') {runningTotal = subtract(a, b)}
    else if (opName === 'multiply') {runningTotal = multiply(a, b)}
    else if (opName === 'divide') {runningTotal = divide(a, b)}
    display.value = runningTotal;
    activeValue = false;
    displayRefresh = true;
    return runningTotal;
}

//Adding event listeners onto the buttons to run the relevant functions
numKeys.forEach((numBtn) => numBtn.addEventListener('click', updateDisplay));
opKeys.forEach((opBtn) => opBtn.addEventListener('click', hold));
equalsBtn.addEventListener('click', () => operate(opName, runningTotal, display.value));
clearBtn.addEventListener('click', clear);
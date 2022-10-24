const display = document.getElementById('display');
const numKeys = document.querySelectorAll('button.num');
const opKeys = document.querySelectorAll('button.operator');
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const divideBtn = document.getElementById('divideBtn');
const equalsBtn = document.getElementById('equalsBtn');
const clearBtn = document.getElementById('clearBtn');
const decimalBtn = document.getElementById('decimalBtn');
const invertBtn = document.getElementById('invertBtn');
const deleteBtn = document.getElementById('deleteBtn');
const percentBtn = document.getElementById('percentBtn');
const memRecall = document.getElementById('memRecall');
const memClear = document.getElementById('memClear');
const memAdd = document.getElementById('memAdd');
const memSub = document.getElementById('memSub');

//The variables used within the button functions
let runningTotal = null; 
let memoryValue = 0;
let activeValue = null;
let opName = null;
let displayRefresh = false;
let clearAll = false;

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
    if(b == 0) {
        return 'NOPE'
    } else {
        return a / b;
    }
}

//Functions for the memory buttons
function addToMemory () {
    memoryValue += +display.value;
    displayRefresh = true;
}

function subtractFromMemory () {
    memoryValue -= +display.value;
    displayRefresh = true;
}

function clearMemory () {
    memoryValue = 0
    displayRefresh = true;
}

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
        operate(e, opName, runningTotal, display.value);
    }
    decimalBtn.addEventListener('click', updateDisplay, {once: true});
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

//opName is not recognized as a function type, only a string, hence why using it as a keyword for a callback function did not work?
//A function to complete the equation based on selected operator, display value, and running total. Accessed by equals and opBtns
function operate(e, operator, a, b) {
    if (operator === 'add') {runningTotal = add(+a, +b)}
    else if (operator === 'subtract') {runningTotal = subtract(a, b)}
    else if (operator === 'multiply') {runningTotal = multiply(a, b)}
    else if (operator === 'divide') {runningTotal = divide(a, b)}
    display.value = runningTotal;
    activeValue = false;
    displayRefresh = true;
    if(e.target.value === 'equals') {
        decimalBtn.addEventListener('click', updateDisplay, {once: true});
        opBtn = null;
        runningTotal = null;
    }
    return runningTotal;
}

//Adding event listeners onto the buttons to run the relevant functions
numKeys.forEach((numBtn) => numBtn.addEventListener('click', updateDisplay));
opKeys.forEach((opBtn) => opBtn.addEventListener('click', hold));
equalsBtn.addEventListener('click', (e) => operate(e, opName, runningTotal, display.value));
clearBtn.addEventListener('click', clear);
decimalBtn.addEventListener('click', updateDisplay, {once: true})
invertBtn.addEventListener('click', () => display.value *= -1);
deleteBtn.addEventListener('click', () => display.value = display.value.slice(0, -1));
percentBtn.addEventListener('click', () => display.value /= 100);
memAdd.addEventListener('click', addToMemory);
memSub.addEventListener('click', subtractFromMemory);
memRecall.addEventListener('click', () => display.value = memoryValue);
memClear.addEventListener('click', clearMemory);

//TODO: Add keyboard support
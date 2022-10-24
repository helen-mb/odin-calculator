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

let runningTotal = null; //Keeps track of the total result
let memoryValue = 0; //Keeps track of the value stored in memory
let opName = null; //Stores the name of the pending operation until the operation is performed
let activeValue = false; //When true, allows operator buttons to perform the pending operation
let displayRefresh = false; //When true, allows the next number button to clear the screen before concatenating
let readyToClear = false; //When true, allows the clear button to clear all stored values

//The basic math operations that can be performed between two numbers:
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

//Functions for the memory buttons:
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

//Concatenates the number button values in the display screen, and toggles displayRefresh as needed
function updateDisplay(e) {
    if (displayRefresh) {
        display.value = null;
        displayRefresh = false;
    }
    runningTotal ? activeValue = true : activeValue = false;
    readyToClear = false;
    display.value += e.target.value;
}

//Accessed by the opBtn's:
//Prepares the operate function and runs the pending operation as needed. Resets the decimal button.
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

//Accessed by C/CA button:
//Clears the display, and (when readyToClear is true) resets all stored values;
function clear () {
    if(readyToClear) {
        runningTotal = null;
        memoryValue = 0;
        opName = null;
        activeValue = false;
        readyToClear = false;
    }
    display.value = null;
    readyToClear = true;
}

//Accessed by equals and opBtns:
//Performs the pending operation given the opName, runningTotal and display.value. Resets the decimal button.
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

//Event listeners for the buttons to run the relevant functions
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
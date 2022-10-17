const sum = function (...numbers) {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
};

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
    return operator(a,b);
}
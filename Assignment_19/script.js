function calculate(value) {
    const display = document.getElementById('display');
    display.value += value;
    
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById('display');
        expression = display.value;
    display.value = eval(expression);
}
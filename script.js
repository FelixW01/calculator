const userInput = document.querySelectorAll('[data-selection]');
const displayEl = document.getElementById('display-p')
let display = '0';
let num1 = ''
let num2 = ''
let operator = '';

// Initial display as 0
displayEl.textContent = display;

// Puts an event listener on each userInput
userInput.forEach(userInput => {
    userInput.addEventListener('click', e => {
       let clickedBtn =  userInput.dataset.selection
        calculateInput(clickedBtn)
    })
})

function calculateInput(clickedBtn) {
    
    let operators = ['%', "+", "-", "*", "/"];
    
    // If the user clicks AC, reset the variables
    if (clickedBtn === 'AC') {
        display = '0';
        num1 = '';
        num2 = '';
        operator = '';
    } 
    
    // If display is 0, clickedBtn is not an operator or a =, change display to clickedBtn
    else if (display === '0' && !operators.includes(clickedBtn) && clickedBtn !== '=') {
        display = clickedBtn;
    } 
    
    // If clickedBtn is an operator, assign operator to clickedBtn and display.
    else if (operators.includes(clickedBtn)) {
        // Make sure num1 is not empty when operator is hit 
        if(num1 === '') {
            num1 = display
        }
        // If clicked button is included in operators array, assign operator
        operator = clickedBtn
        // Adds operator into display
        display += ` ${clickedBtn} `
    } 
    
    // 
    else if (clickedBtn === '=') {
        if(num1 !== '' && operator !== '' && display !=='') {
            // Get num2 by splitting the display by the operator
            num2 = display.split(operator)[1].trim();
            calculateResult();
        }
    }
    
    else {
        display += clickedBtn;
    }
    
    displayEl.textContent = display
}

function calculateResult() {
    let result;
    // Parse num1, num2 into a float from a string to properly calculate the math
    let parsedNum1 = parseFloat(num1)
    let parsedNum2 = parseFloat(num2)

    switch(operator) {
        case '+':
        result = parsedNum1 + parsedNum2;
        break;
        case '-':
        result = parsedNum1 - parsedNum2;
        break;
        case '*':
        result = parsedNum1 * parsedNum2;
        break;
        case '/':
        // Division by 0
        if (parsedNum2 === 0) {
        result = 'Error'
        } else {
        result = parsedNum1 / parsedNum2;
        }
        break;
        case '%':
            // This triggers if there is no num2, the user clicks = right after num1 and %
            if (num2 === '') {
                result = parsedNum1 / 100
            } else {
            // Gets num2 percentage of num1
                result = parsedNum1 * (parsedNum2 / 100);
            }
        break;
    }

    // Get the result back to string to display
    display = result.toString();
    num1 = result;
    num2 = '';
    operator = ''
}
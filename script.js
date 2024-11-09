const userInput = document.querySelectorAll('[data-selection]');
const displayEl = document.getElementById('display-p')
let display = '0';
let num1 = ''
let num2 = ''
let operator = '';
let operators = ['%', '+', '-', '*', '/'];
let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '%', '+', '-', '*', '/', '=']

// Initial display as 0
displayEl.textContent = display;

// Puts an event listener on each userInput
userInput.forEach(userInput => {
    userInput.addEventListener('click', e => {
       let clickedBtn =  userInput.dataset.selection
        calculateInput(clickedBtn)
    }) 
})

// Event listener on dom to listen on user key input
document.addEventListener('keydown', e => {
    if (keys.includes(e.key)) {
        let clickedBtn = e.key
        e.stopPropagation()
        console.log(e)
        calculateInput(clickedBtn)
    }
})

function calculateInput(clickedBtn) {
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
    
    // This conditional stops the user from clicking 2 operators in a row, stopping them from breaking the app
    else if (operators.includes(clickedBtn) && operator !== '' && !display.split(operator)[1].trim()) {
        return;
    }

    // Stops the user from clicking = after only having one number and one operator
    else if (clickedBtn === '=' && (num1 === '' || operator === '' || !display.split(operator)[1].trim())) {
        return;
    }

    // If clickedBtn is an operator, assign operator to clickedBtn and display.
    else if (operators.includes(clickedBtn)) {
        // Make sure num1 is not empty when operator is hit 
        if(num1 === '') {
            num1 = display
        }
        // Complete the calculation when the user have 2 numbers and an operator on display and proceeds to click another operator
        if (operator !== '') {
            num2 = display.split(operator)[1].trim();
            calculateResult();
            display = num1;
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
        // Division by 0 returns Error
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
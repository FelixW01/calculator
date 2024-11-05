const userInput = document.querySelectorAll('[data-selection]');
const displayEl = document.getElementById('display-p')

userInput.forEach(userInput => {
    userInput.addEventListener('click', e => {
       let clickedBtn =  userInput.dataset.selection
        calculateInput(clickedBtn)
    })
})

function calculateInput(clickedBtn) {
    let num1 = 0
    let num2 = 0
    let display = 0;
    let operators = ['(', ')', '%', '=', "+", "-", "x"];
    
    if (operators.includes(clickedBtn)) {
        display += `${clickedBtn}`
        console.log(clickedBtn)
    } else if (clickedBtn == 'AC') {
        display = 0
    } else {
        num1 = clickedBtn
        display = num1 
        console.log(typeof(num1), '<<<<<< Num1')
        console.log(typeof(clickedBtn), '<<<<<< clickedBtn')
    }
    displayEl.textContent = display
}
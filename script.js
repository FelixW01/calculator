const userInput = document.querySelectorAll('[data-selection]');

userInput.forEach(userInput => {
    userInput.addEventListener('click', e => {
       let clickedBtn =  userInput.dataset.selection
        calculateInput(clickedBtn)
    })
})

function calculateInput(clickedBtn) {

}
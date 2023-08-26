/* This is called cashing the dom. Cashing means storing sth. for
    future use. Here werestoring these things in variables. It´s quicker, but efficiencier
    by doing getElement() we´re doing the process every single time instead of just storing it in a variable.
    It´s like putting all the books on the table when you want to study instead of standing up every time you need one.
*/

let = userScore=0;
let = computerScore=0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
// gets the p tag inside the result div
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

main();

//addEventListener: When you click on the object, the function happens.
function main(){
    rock_div.addEventListener('click', function() {
        game("r");
    })

    paper_div.addEventListener('click', function() {
        game("p");
    })

    scissors_div.addEventListener('click', function() {
        game("s");
    })
}

//what happens when you cick on each picture
function game(userChoice){
    let computerChoice = getComputerChoice();
    
    //comparison instead of an if statement we use a switch statement
    switch (userChoice+ computerChoice){
        case 'rs':
        case 'pr':
        case 'sp':
            win(userChoice, computerChoice);
            break;
        case 'rp':
        case 'ps':
        case 'sr':
            lose(userChoice, computerChoice);
            break;
        case 'rr':
        case 'pp':
        case 'ss':
            tie(userChoice, computerChoice);
            break;
    }
}

//Gets the random computer Choice
function getComputerChoice(){
    const choices = ['r', 'p', 's'];
    //To get numbers between 0 and a number you need to multiply the Math.rondom() by the number you want.
    const randomNumber = (Math.floor(Math.random()*3));
    //returns the value that is stored in the position randomNumber.
    return choices[randomNumber];
}

// these three function do whatever happens in each case
function win(userChoice, computerChoice){
   
    // as it is a string wou can use string methods to change the fontsize and make it subordinate o la palabra que se use
   const smallUserWord = 'user'.fontsize(3).sub();
   const smallCompWord = 'comp'.fontsize(3).sub();
   const userChoice_div = document.getElementById(userChoice);

    userScore++;
    userScore_span.innerHTML = userScore + ' ';
    result_p.innerHTML = `${convertToWords(userChoice)}${smallUserWord} beats ${convertToWords(computerChoice)}${smallCompWord}. You win :)`;   
    
    //green-glow to whichever div the user clicked on.
    //classList gives the classes the div has and .add helps you get the one you want in this case green-glow. We do not need a period as we know it is a class
    userChoice_div.classList.add('green-glow');
   
    //setTimeout needs two arguments: the function you want to perform and the time it waits until it performs the function
    //new in the 6th version you can get rid of function() {blablabla} and just leave 
    // () => blablabla (in case of only one line)
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 300);
}

function lose(userChoice, computerChoice){
    const smallUserWord = 'user'.fontsize(3).sub();
    const smallCompWord = 'comp'.fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    
    computerScore++;
    computerScore_span.innerHTML = ' ' + computerScore;
    result_p.innerHTML = `${convertToWords(userChoice)}${smallUserWord} loses to ${convertToWords(computerChoice)}${smallCompWord}. You lost :(`;   

    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 300);
}

function tie(userChoice, computerChoice){
    const smallUserWord = 'user'.fontsize(3).sub();
    const smallCompWord = 'comp'.fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    
    
    result_p.innerHTML = `${convertToWords(userChoice)}${smallUserWord} equals ${convertToWords(computerChoice)}${smallCompWord}. It's a tie :/`;   
 
    userChoice_div.classList.add('grey-glow');
    
    setTimeout(() => userChoice_div.classList.remove('grey-glow'), 300);
}

//Function to convert p, s, or r to the actual word
function convertToWords(letter){
    if(letter == 'r'){
        return 'Rock';
    }
    else if(letter == 'p'){
        return 'Paper';
    }
    else if(letter == 's'){
        return 'Scissors';
    }
}

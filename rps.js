let POINTERS = {
    PLAYER_WIN: 1,
    DRAW: 0,
    COMPUTER_WIN: -1
};
let firstGame = true;
const button = document.querySelector("button");
const aName = document.querySelector("a");

function getComputerChoice() {
    const i = Math.floor(Math.random() * 3);
    if (i == 0) {
        return 'Rock';
    } else if (i == 1) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}

function playRound(playerSelection, computerSelection) {
    pS = playerSelection.toLowerCase();
    cS = computerSelection.toLowerCase();

    if (pS == cS) {
        console.log(`Yikes! We have a draw! You both chose: ${pS}!`);
        return POINTERS.DRAW;
    } else {
        if ((pS == "rock" && cS == "scissors") || (pS == "paper" && cS == "rock") || (pS == "scissors" && cS == "paper")) {
            console.log(`You did it! ${pS} beats ${cS}!`);    
            return POINTERS.PLAYER_WIN;
        } else {
            console.log(`Dang, unlucky! ${cS} beats ${pS}!`);
            return POINTERS.COMPUTER_WIN;
        }
    }
}

function game() {
    // Best of 5 Games
    let pScore = 0;
    let cScore = 0;
    let firstRound = firstGame;
    let pName = firstGame ? "Player" : aName.text

    while (!(pScore == 3 || cScore == 3)) {
        let choice;
        if (firstRound) {
            firstRound = false;
            if (confirm("Welcome to Rock, Paper, Scissors. Would you like to enter your name?")) {
                pName = prompt("Great, enter your name please.");
                aName.textContent = pName;
            }
            choice = prompt(`Welcome ${pName}. Please enter your choice (rock, paper or scissors).`);
        } else {
            let preamble;
            if (pScore > cScore)
                preamble = `Well done ${pName}!`;
            else if (pScore < cScore)
                preamble = `Unlucky ${pName}.`;
            else
                preamble = "It's anyone's game!"
            choice = prompt(`${preamble} The Score: ${pScore} vs ${cScore}; ${pName} vs Computer;. Please enter your next choice (rock, paper or scissors).`);
        }
        
        if (choice == null)
            return;
        
        let success = false;
        let replay = false;
        while (!success) {
            if (replay) {
                let newChoice = prompt(`You and the computer drew by both choosing ${choice}. Please choose again (rock, paper or scissors).`);
                choice = newChoice;
            } 
            if (choice.toLowerCase() == "rock" || choice.toLowerCase() == "paper" || choice.toLowerCase() == "scissors") {
                let score = playRound(choice, getComputerChoice());
                if (score == 0) {
                    replay = true;
                    success = false;
                } else if (score > 0) {
                    pScore += 1;
                    success = true;
                } else {
                    cScore += 1;
                    success = true;
                }
            } else {
                let newChoice = prompt(`Sorry, you need to enter one of the following: rock, paper or scissors.`);
                choice = newChoice
            }
        }
    }

    if (cScore > pScore) {
        console.log("Unlucky, seems like the computer has won. Better luck next time");
    } else {
        console.log("Well done! You beat the computer! I bet your mum's proud.");
    }

    if (firstGame) {
        firstGame = false;
        button.textContent = "Replay?"
    }
}

button.addEventListener('click', game);
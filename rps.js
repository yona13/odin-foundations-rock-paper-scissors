let POINTERS = {
    PLAYER_WIN: 1,
    DRAW: 0,
    COMPUTER_WIN: -1
};

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
            console.log(`You Won! ${pS} beats ${cS}!`);    
            return POINTERS.PLAYER_WIN;
        } else {
            console.log(`Dang, You Lost! ${cS} beats ${pS}!`);
            return POINTERS.COMPUTER_WIN;
        }
    }
}

for (var i = 1; i <= 20; i ++) {
    console.log(`Round ${i}:`);
    playRound(getComputerChoice(), getComputerChoice());
}
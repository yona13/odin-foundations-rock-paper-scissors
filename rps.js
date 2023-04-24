/** Rock, Paper, Scissors Script */

/* Functions */

/* Information Button Clicked Function */
function infoClicked(event) {
    window.alert(`Welcome ${playerName}, to Rock, Paper, Scissors. Can you beat the computer, first to 5?`);
}

/* Name Change Listener Function */
function nameChange(event) {
    if (event.target.id == "playerName") {
        playerName = event.target.value;
    } else {
        computerName = event.target.value;
    }
}

/* Control Click Listener Function */
function controlClick(event) {
    const button = document.querySelector(`#${event.target.innerHTML.toLowerCase()}`);
    if (!button) return;
    
    playerChoice = button.textContent;
    console.log(`${playerName} has chosen to play ${playerChoice.toLowerCase()}. Match beginning!`);
    game();
}

/* Update Icons Function */
function updateIcons(pChoice, cChoice, result) {
    domIcons.forEach(icon => {
        icon.className = icons[options.indexOf(icon.id == "p-choice" ? pChoice : cChoice)];
        if (result > 0)
            message.textContent = `Well done! You beat ${computerName}!`;
        else if (!result)
            message.textContent = `Draw! You and ${computerName} chose ${pChoice}.`;
        else
            message.textContent = `Unlucky, ${computerName} beat you.`;
    });
}

/* Learn Function */
function learn(pC) {
    // Reset Immediate frequency every 10 rounds
    if (count > 9) {
        count = 0;
        variables.rock.immediate = 0;
        variables.paper.immediate = 0;
        variables.scissor.immediate = 0;
    }

    // Update variables
    if (pC == "rock") {
        variables.rock.frequency += 1;
        variables.rock.immediate += 1
    } else if (pC == "paper") {
        variables.paper.frequency += 1;
        variables.paper.immediate += 1;
    } else {
        variables.scissor.frequency += 1;
        variables.scissor.immediate += 1;
    }

    console.log(`Learned Variables: ${variables}`)

    count += 1;
}

/* Random Choice Function */
function getRandomChoice() {
    const i = Math.floor(Math.random() * 3);
    if (i == 0) {
        return 'Rock';
    } else if (i == 1) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}

/* Computer Choice Function */
function getComputerChoice() {
    // First game
    if (variables.rock.frequency == 0 && variables.paper.frequency == 0 && variables.scissor.frequency == 0) {
        return getRandomChoice();
    }

    return getRandomChoice(); // TODO: Replace with learning solutions
};

/* Play Round Function */
function playRound() {
    let pC = playerChoice.toLowerCase();
    let cC = getComputerChoice().toLowerCase();
    learn(pC);

    if (pC == cC) { 
        // Case 0: Both choices are the same, i.e. Draw
        console.log(`Draw! ${playerName} & ${computerName} both chose ${pC}!`);
        updateIcons(pC, cC, POINTERS.DRAW);
        return POINTERS.DRAW;
    } else if ((pC == "rock" && cC == "scissors") || (pC == "paper" && cC == "rock") || (pC == "scissors" && cC == "paper")) {
        // Case 1: Player wins
        console.log(`${playerName} has beat ${computerName} with ${pC} beating ${cC}!`);
        updateIcons(pC, cC, POINTERS.PLAYER_WIN);
        return POINTERS.PLAYER_WIN;
    } else {
        // Case 2: Computer wins
        console.log(`${computerName} has beat ${playerName} with ${cC} beating ${pC}!`);
        updateIcons(pC, cC, POINTERS.COMPUTER_WIN);
        return POINTERS.COMPUTER_WIN;
    }
}

/* Game Function */
function game() {
    let result = playRound();
    console.log(`Result: ${result};`);

    if (Math.abs(result) > 0) {
        // Update Score
        if (score.player < 5 && score.computer < 5) {
            if (result > 0) {
                score.player += 1;
                const pScore = document.querySelector("#p-score");
                pScore.textContent = score.player;
            } else {
                score.computer += 1;
                const cScore = document.querySelector("#c-score");
                cScore.textContent = score.computer;
            }
        }
    }
}

/* Variables */

// DOM Variables
const domIcons = document.querySelectorAll("i");
const buttons = document.querySelectorAll(".control");
const inputs = document.querySelectorAll("input");
const info = document.querySelector("#info");
const message = document.querySelector(".message");

// Icon Variables
const options = ["rock", "paper", "scissors"];
const icons = ["fa-solid fa-hand-back-fist", "fa-solid fa-hand", "fa-solid fa-hand-scissors"];

// Game Variables
let playerName = "Player";
let computerName = "Computer";
let playerChoice = "";
let score = {
    player: 0,
    computer: 0
};
const POINTERS = {
    PLAYER_WIN: 1,
    DRAW: 0,
    COMPUTER_WIN: -1
};

// Learning Variables
let count = 0;
let variables = {
    rock: {frequency: 0, immediate: 0},
    paper: {frequency: 0, immediate: 0},
    scissor: {frequency: 0, immediate: 0}
};

// Adding Event listeners
inputs.forEach(player => player.addEventListener('input', nameChange));
buttons.forEach(control => control.addEventListener('click', controlClick));
info.addEventListener('click', infoClicked);

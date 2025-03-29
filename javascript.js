// choices
const rock = document.querySelector("#btn-rock");
const paper = document.querySelector("#btn-paper");
const scissors = document.querySelector("#btn-scissors");

// rounds, scores, result and choices elements
let computerChoiceDisplay = document.querySelector(".computer-choice");
let roundResult = document.querySelector(".round-result");
let roundsSelector = document.querySelector("#rounds");
let humanScoreDisplay = document.querySelector(".human-score");
let computerScoreDisplay = document.querySelector(".computer-score");
let buttonChoices = document.querySelector(".buttons");
let restartGame = document.querySelector(".restart-game");
let finalResultDisplay = document.querySelector(".final-result-display");

// variables to keep track of state
let humanScore = 0;
let computerScore = 0;
let winningScore = parseInt(roundsSelector.value, 10);
let finalResult = "";
let humanChoice = "";

rock.addEventListener("click", (event) => {
	humanChoice = event.currentTarget.getAttribute("value");
	playRound(humanChoice, getComputerChoice());
});

paper.addEventListener("click", (event) => {
	humanChoice = event.currentTarget.getAttribute("value");
	playRound(humanChoice, getComputerChoice());
});

scissors.addEventListener("click", (event) => {
	humanChoice = event.currentTarget.getAttribute("value");
	playRound(humanChoice, getComputerChoice());
});

// randomly get the compute choice
function getComputerChoice() {
	const possibleChoices = ["rock", "paper", "scissors"];

	// randomizing between the numbers 0 to 2 and then accessing one of the possible choices
	let choice = possibleChoices[Math.floor(Math.random() * 3)];
	console.log("getComputerChoice: " + choice);

	return choice;
}

// get and set the human choice
function setHumanChoice(event) {
	humanChoice = event.currentTarget.getAttribute("value");

	return humanChoice;
}

function playRound(humanChoice, computerChoice) {
	let roundResultMessage = "";

	// round logic - could possibly be simplified with a rules object
	if (humanChoice === computerChoice) {
		roundResultMessage = `Draw! ${humanChoice} versus ${computerChoice}!`;
		console.log(roundResultMessage);
	} else if (humanChoice === "rock" && computerChoice === "scissors") {
		humanScore++;
		roundResultMessage = `You win! ${humanChoice} beats scissors!`;
		console.log(roundResultMessage);
	} else if (humanChoice === "rock" && computerChoice === "paper") {
		computerScore++;
		roundResultMessage = `You lose! ${humanChoice} loses to paper!`;
		console.log(roundResultMessage);
	} else if (humanChoice === "scissors" && computerChoice === "rock") {
		computerScore++;
		roundResultMessage = `You lose! ${humanChoice} loses to rock!`;
		console.log(roundResultMessage);
	} else if (humanChoice === "scissors" && computerChoice === "paper") {
		humanScore++;
		roundResultMessage = `You win! ${humanChoice} beats paper!`;
		console.log(roundResultMessage);
	} else if (humanChoice === "paper" && computerChoice === "rock") {
		humanScore++;
		roundResultMessage = `You win! ${humanChoice} beats rock!`;
		console.log(roundResultMessage);
	} else if (humanChoice === "paper" && computerChoice === "scissors") {
		computerScore++;
		roundResultMessage = `You lose! ${humanChoice} loses to scissors!`;
		console.log(roundResultMessage);
	}

	// set results in ui
	roundResult.textContent = roundResultMessage;
	computerChoiceDisplay.textContent = computerChoice;
	humanScoreDisplay.textContent = humanScore;
	computerScoreDisplay.textContent = computerScore;

	// check final result
	checkFinalResult();
}

// update final result based on winner
function checkFinalResult() {
	if (winningScore <= humanScore || winningScore <= computerScore) {
		if (humanScore > computerScore) {
			finalResult = "Final result of the game: You win!";
		} else if (humanScore < computerScore) {
			finalResult = "Final result of the game: You lose!";
		}

		finalResultDisplay.textContent = finalResult;

		// Disable buttons after a winner has been declared
		rock.disabled = true;
		paper.disabled = true;
		scissors.disabled = true;
	}
}

// Make player choose how many round wins are needed in total
roundsSelector.addEventListener("input", (event) => {
	// parse the string value to int
	let rounds = parseInt(event.target.value, 10);

	// check input field value
	// if the input field is empty string, we cant parse, in that case we set the rounds to 3
	if (isNaN(rounds) == true) {
		rounds = 3;
	} else if (rounds < 3) {
		rounds = 3;
	} else if (rounds > 7) {
		rounds = 7;
	}

	// set the corrected value in the input
	event.target.value = rounds;
	winningScore = rounds;
});

function clearState() {
	humanScore = 0;
	computerScore = 0;
	winningScore = roundsSelector.value;
	finalResult = "";
	humanChoice = "";

	computerChoiceDisplay.textContent = "You first";
	roundResult.textContent = "Make your move!";
	humanScoreDisplay.textContent = humanScore;
	computerScoreDisplay.textContent = computerScore;
	finalResultDisplay.textContent = "Game not finished...";

	// Enable buttons again
	rock.disabled = false;
	paper.disabled = false;
	scissors.disabled = false;
}

restartGame.addEventListener("click", clearState);

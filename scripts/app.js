let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");
let secretWord = document.getElementById("secretWord");
let wrongGuesses = document.getElementById("wrongGuesses");
let hangMan = document.getElementById("hangMan");
let userInput = document.getElementById("userInput");

let randomWord = "";
let wrongGuess = "";
let displayedWord = [];
let guesses = 0;
let maxGuesses = 5;

startBtn.addEventListener('click', function (e) {
    ApiCall();
});

restartBtn.addEventListener('click', function (e) {
    ResetGame();
});

function ResetGame() {
    randomWord = "";
    wrongGuess = "";
    guesses = 0;
    wrongGuesses.textContent = "Wrong Guesses";
    secretWord.textContent = "[Secret Word]";
    hangMan.textContent = "Hangman / Guesses Left";
    userInput.readOnly = true;
    userInput.value = "";
}

function ApiCall() {
    fetch('https://random-word-api.herokuapp.com/word').then(response =>
        response.json()
    ).then(data =>
        StartGame(data[0])
    )
}

function StartGame(word) {
    randomWord = word;

    for (let i = 0; i < word.length; i++) {
        displayedWord[i] = "_";
    }

    UpdateGameState();
    userInput.readOnly = false;
}

function UpdateGameState() {
    secretWord.textContent = displayedWord.join(" ");
    hangMan.textContent = `Guesses left ${guesses} / ${maxGuesses}`;
}

userInput.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        let guess = userInput.value.toLowerCase();

        if (randomWord.includes(guess)) {
            for (let i = 0; i < randomWord.length; i++) {
                if (randomWord[i] === guess) {
                    displayedWord[i] = guess;
                }
            }
        }
        else {
            wrongGuess += guess;
            wrongGuesses.textContent = wrongGuess;
            guesses++;
        }
    }
    UpdateGameState();
    userInput.value = "";
    GameEnd();

});

function GameEnd() {
    if (guesses === maxGuesses) {
        alert("YOU LOST LOSER!");
        ResetGame();
    } else if (displayedWord.join("") === randomWord) {
        alert("YOU WON!!!!" + ` You've guessed the word ${randomWord}`);
        ResetGame();
    }
}


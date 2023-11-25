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

startBtn.addEventListener('click', function(e){
    ApiCall();
});

restartBtn.addEventListener('click', function(e){
    ResetGame();
})

function ResetGame(){

}

function ApiCall(){
    fetch('https://random-word-api.herokuapp.com/word').then((response) => {
        return response.json();
    }).then((data) => {
        StartGame(data[0]);
    })
}

function StartGame(word) {
    randomWord = word;

    for(let i = 0; i < word.Length(); i++){
        displayedWord[i] = "_";
    }

    UpdateGameState();
    userInput.readOnly = false;
}

function UpdateGameState() {
    displayedWord.join(" ");
    hangMan.textContent = `Guesses left ${guessses} / ${maxGuesses}`;
}


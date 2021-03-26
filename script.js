console.log("linked");
var wordElement = document.querySelector("#word");
var startButton = document.querySelector("#start-game");
var timeLeftSpan = document.querySelector("#time-left");
var winSpan = document.querySelector("#wins");
var lossSpan = document.querySelector("#losses");
var clearButton = document.querySelector("#clear");
var timeHeader = document.querySelector("#time-head");
var winSection = document.querySelector("#win-section");
var lossSection = document.querySelector("#loss-section");


var wins = localStorage.getItem("wins") || 0;

var losses = localStorage.getItem('losses') || 0;

winSpan.textContent = wins;
lossSpan.textContent = losses;
//1. Play HangMan Game
//generate random word to guess
var wordsArray = ["manatee", "cat", "salmon"]
var chosenWord = ""
var guessedLetters = [];
var timeLeft = 10;
var timer;
var isGameRunning = false;
timeHeader.style.display = "none";
lossSection.style.display = "none";
winSection.style.display = "none";


//2. Countdown Timer
function startTimer() {
    clearInterval(timer);
    // give user 10 seconds to play
    timeLeft = 10;
    // display countdown on screen 
    timeHeader.style.display = "block";
    lossSection.style.display = "none";
    winSection.style.display = "none";
    timeLeftSpan.textContent = timeLeft;
    console.log('time function')
    timer = setInterval(function () {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        // if time runs out, loss
        if (timeLeft < 1) {
            isGameRunning = false;
            clearInterval(timer);
            console.log("lost!");
            losses++;
            lossSpan.textContent = losses;
            startButton.style.display = "block";
            localStorage.setItem('losses', losses);
            timeHeader.style.display = "none";
            lossSection.style.display = "block";
        }
        console.log(timeLeft);
    }, 1000)
}

function startGame() {
    isGameRunning = true;
    startButton.style.display = "none";
    guessedLetters = [];
    var randomInt = Math.floor(Math.random() * wordsArray.length)
    chosenWord = wordsArray[randomInt].split("")
    for (let i = 0; i < chosenWord.length; i++) {
        guessedLetters.push("_");
    }
    wordElement.textContent = guessedLetters.join(" ");
    startTimer();
}

//create blank for each character in word





// track keystrokes
document.addEventListener("keyup", function (event) {
    if (isGameRunning) {

        var isInWord = chosenWord.includes(event.key);
        if (isInWord) {
            for (var i = 0; i < chosenWord.length; i++) {
                //if key is in word, update display
                if (event.key === chosenWord[i]) {
                    guessedLetters[i] = event.key;

                }
            }
        }
        // if all letters are shown, game is won
        console.log(chosenWord.join(""), guessedLetters.join(""));
        wordElement.textContent = guessedLetters.join(" ");
        if (chosenWord.join("") === guessedLetters.join("")) {
            console.log("winner")
            clearInterval(timer);
            wins++;
            winSpan.textContent = wins;
            localStorage.setItem("wins", wins);
            startButton.style.display = "block";
            isGameRunning = false
            timeHeader.style.display = "none";
            winSection.style.display = "block";
        }
    }
})

startButton.addEventListener("click", startGame)

clearButton.addEventListener("click", function () {
    localStorage.setItem("wins", 0);
    localStorage.setItem("losses", 0);
    wins = 0;
    losses = 0;
    winSpan.textContent = wins;
    lossSpan.textContent = losses;
})

// startGame();



//3. Save wins/losses
    // after game, update tracking variable for wins/losses
    //save to localstorage
    //update display

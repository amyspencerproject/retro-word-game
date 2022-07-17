const lettersGuessed = document.querySelector(".guessed-letters"); //unordered list of letters user has guessed
const guessButton = document.querySelector(".guess"); //button for submitting letter guesses
const letterInput = document.querySelector(".letter"); //text input for a letter
const wordInProgress = document.querySelector(".word-in-progress");
const remainingSpan = document.querySelector(".remaining span" ); //paragraph text with remaining guesses left
const playerMessage = document.querySelector(".message"); //message to player after guess
const playAgainButton = document.querySelector(".play-again"); //Play again button hidden until end of game

//static word while building game
const word = "magnolia";

//Function to display ● place-holders for each letter of word in play
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        // console.log(letter);
        placeholderLetters.push("●");
        //console.log(placeholderLetters);
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);


//Callback function for user clicking Guess button
document.addEventListener("click", function(e) {
    e.preventDefault(); //stop screen from refreshing if user clicks twice
    const guessedLetter = letterInput.value; //capture letter guessed by user
    // console.log(guessedLetter);
    letterInput.value = ""; //clear letter from screen
});

//Function to validate user's guessed letter

const validateLetterInput = function(guessedLetter) {
    const acceptedLetter = /[a-zA-Z]/   ;
    if (guessedLetter.length === 0) {
        playerMessage.innerText="Please enter a single letter as a guess";
    } elseif (guessedLetter.length > 1 ) {
        playerMessage.innerText = "Only enter a single letter as a guess";
    } elseif (!guessedLetter.match(acceptedLetter)) {
        playerMessage.innerText = "Guess on a single letter from A to Z";
    } else {
        playerMessage.innerText = "Guess accepted!"
    }
};

// Not sure if the input from the form should be validated before being saved into the guessedLetter variable
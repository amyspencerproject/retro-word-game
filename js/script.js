const lettersGuessedList = document.querySelector(".guessed-letters"); //unordered list of letters user has guessed
const guessButton = document.querySelector(".guess"); //button for submitting letter guesses
const letterInput = document.querySelector(".letter"); //text input for a letter
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining")
const remainingSpan = document.querySelector(".remaining span" ); //paragraph text with remaining guesses left
const playerMessage = document.querySelector(".message"); //message to player after guess
const playAgainButton = document.querySelector(".play-again"); //Play again button hidden until end of game

//array that collects all the guessed letters
let guessedLetters = [];
// console.log(guessedLetters);

//Remaining guesses counter
let remainingGuesses = 8;

const getCocktail = async function () {
    const response = await fetch(
       "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    
    console.log(data.drinks[0].strDrink);
    cocktail = data.drinks[0].strDrink;
    placeholder(cocktail);
};

getCocktail();

//Function to display ● place-holders for each letter of word in play
const placeholder = function (cocktail) {
    const placeholderLetters = [];
    for (const letter of cocktail) {
        if (letter == " ") {
            placeholderLetters.push(" ");
        } else placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

//Callback function for user clicking Guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault(); //stop screen from refreshing if user clicks twice
    playerMessage.innerText = ""; //clear previous player message
    const guess = letterInput.value; //capture letter guessed by user
    // console.log(guess);
    letterInput.value = ""; //clear letter from screen
    goodGuess = validateInput(guess);
    //after validation guess can move to being capitalized, checked against array, and stored if okay
    if (goodGuess) {
        makeGuess(guess);
    }
});

// Input validator of user's guess. The arugument input is just a placehoder variable.
// Validation takes place in the event handler.
const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/; //Regular expression
    const acceptedNumber = /^[0-9]+$/;
    // const acceptedSymbol = /!/ /$/ /-/; 
    if (input.length === 0) {
        playerMessage.innerText="Please enter a single letter, number, or symbol as a guess";
    } else if (input.length > 1 ) {
        playerMessage.innerText = "Only enter a single letter, number, or symbol as a guess";
    } else if (!input.match(acceptedLetter)) {
        playerMessage.innerText = "Guess a single letter from A to Z";
    } else if (!input.match(acceptedNumber)) {
        playerMessage.innerText = "Only enter a single letter, number, or symbol as a guess";
    } else if (!input.match(acceptedSymbol)) {
        playerMessage.innerText = "Only enter a single letter, number, or symbol as a guess";
    } else {
        return input
    }
};

// function that changes guess to uppercase and compares to guessedLetters array
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    // console.log(guess);
    if (guessedLetters.includes(guess)) {
        playerMessage.innerText = "Silly you already guessed that letter";
    }
    else {
        guessedLetters.push(guess);
        displayGuess();
        countGuesses(guess);
        updateProgress(guessedLetters);
    }
};

// function that displays the guessed letters
const displayGuess = function () {
    //clear items in list
    lettersGuessedList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        lettersGuessedList.append(li);
    }
};

const updateProgress = function (guessedLetters) {
    const wordUpper = cocktail.toUpperCase(); //make word all uppercase to match guesses
    const wordArray = wordUpper.split(""); //get word string into an array form
    //compare guessed letters to wordArray 
    const revealWord = [];
    for (const letter of wordArray){
        if (letter == " ") {
            revealWord.push(" ");
        } else if (guessedLetters.includes(letter)) {
            revealWord.push(letter);
        } else {
            revealWord.push("●")
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkWin();
};

//counldn't decide between guess or goodguess but this can be run only if guess is a good guess just like makeGuess()
const countGuesses = function (guess) {
    guess = guess.toUpperCase();
    wordUpper = cocktail.toUpperCase();
    if (!wordUpper.includes(guess)) {
        playerMessage.innerText = `Sorry this cocktail does not contain ${guess}. Try again!`;
        remainingGuesses -= 1;
    } else {
        playerMessage.innerText = `Good guess! This cocktail contains ${guess}`;
    }

    if (remainingGuesses === 0 ) {
        playerMessage.innerHTML = `<p class="highlight" > Game over! The cocktail was ${word}</p>`;
        remainingSpan.innerText = "0 guesses";
        startOver();
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }  
};

const checkWin = function () {
    if (cocktail.toUpperCase() === wordInProgress.innerText) {
        playerMessage.classList.add("win");
        playerMessage.innerHTML = `<p class="highlight" >Cheers! You have correctly guessed the cocktail.</p>`;
        startOver();
    }
};

const startOver = function () {
    //hide guess button, remaining guesses text, guessed letters list
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    lettersGuessedList.classList.add("hide");

    //show the play again button
    playAgainButton.classList.remove("hide");
};

//event handler for user clicking Play Again button
playAgainButton.addEventListener("click", function() {
    playerMessage.classList.remove("win");
    playerMessage.innerText = "";

    guessedLetters = [];
    lettersGuessedList.innerHTML = "";

    remainingGuesses = 8;
    remainingSpan.innerHTML = `${remainingGuesses} guesses`;
    
    //get new word
    getCocktail();

//show guess button, remaining guesses text, guessed letters list
    guessButton.classList.remove("hide");
    remaining.classList.remove("hide");
    lettersGuessedList.classList.remove("hide");

//hide the play again button
    playAgainButton.classList.add("hide");

});

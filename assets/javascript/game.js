// object to hold objects of bands to pick 

let wordGuessGame = {
    wordsToPick: {
        nirvana: {
            picture: "#",
            song: "Lithium", 
            preview "",
        },

        soundgarden: {
            picture: "#",
            song: "On Crooked Steps",
            preview "",
        },

        pearljam: {
            picture: "#",
            song: "Spin the Black Circle",
            preview "",
        },

        mudhoney: {
            picture: "#",
            song: "Blinding Sun",
            preview "",
        },

        hole: {
            picture: "#",
            song: "Samantha",
            preview "",
        },

        candlebox: {
            picture: "#",
            song: "Far Behind",
            preview "",
        },

        bush: {
            picture: "#",
            song: "Glycerine",
            preview "",
        },

        pixies: {
            picture: "#",
            song: "Debaser",
            preview "",
        },

        audioslave: {
            picture: "#",
            song: "Cochise",
            preview "",
        },

        toadies: {
            picture: "#",
            song: "Tyler",
            preview "",
        }
    },

    // variables
    wordInPlay = null,
    lettersOfTheWord: [],
    matchedLetters: [],
    guessedLetters: [],
    guessesLeft: 0,
    totalGuesses: 0,
    letterGuessed: null,
    wins: 0,

    // functions
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // sets up the game when page firstloads
    setupGame: function() {
        // choose random word
        let objKeys = Object.keys(this.wordsToPick);
        this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

        // split the chosen word into individual letters and start building the word
        this.lettersOfTheWord = this.wordInPlay.split("");
        this.rebuildWorldView();
        this.processUpdateTotalGuesses();
    },

    // runs whenver the user guesses a letter 
    updatePage: function(letter) {
        // if the user has no guesses left, restart the game
        if(this.guessesLeft === 0) {
            this.restartGame();
        } else {
            // else handle incorrect and correct guesses and rebuild the view of the world
            this.updateGuesses(letter);
            this.updateMatchedLetters(letter);
            this.rebuildWorldView();
            
            // if user wins, restart the game
            if(this.updateWins() === true) {
                this.restartGame();
            }
        }
    },

    // handles what happens when the user makes an incorrect guess that hasn't been guessed yet
    updateGuesses: function(letter) {
        // if letter is not in guessedLetters array and not in lettersOfTheWord array
        // add the letter to the guessed Letters array
        // decrease guesses by one 
        // update guesses remaining and guesses letters on the page 
        if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
            this.guessedLetters.push(letter);
            this.guessesLeft--;
            document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
            document.querySelector("#guessed-letters").innerHTML = this.guessedLetters.join(", ");
        }   
    },

    // sets initial guesses the user gets, the longer the word, the more guesses the user gets
    processUpdateTotalGuesses: function() {
        this.totalGuesses = this.lettersOfTheWord.length + 5;
        this.guessesLeft = this.totalGuesses;
        document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
    },

    // handles what happens if the user makes a successful guess
    updateMatchedLetters: function(letter) {
        // loop through the letters of the "solution"
        for (let i = 0; i < this.lettersOfTheWord.length; i++) {
            if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
                // if the guessed letter is in the solution and we haven't guessed it already, push newly guessed letter into the matchedLetters array
                this.matchedLetters.push(letter);
            }
        }
    },

    // builds the display of the word that is currently being guessed 
    rebuildWorldView: function() {
        let wordView = "";

        // if the current letter of the chosen word has been guessed, display the letter else display "_"
        for (let i = 0; i < this.lettersOfTheWord.length; i++) {
            if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
                worldView += this.lettersOfTheWord[i];
            } else {
                wordView += "&nbsp;_&nbsp;";
            }
        }
        
        // update the page with the new string we built
        document.querySelector("#current-word").innerHTML = wordView;
    },

    // restart the game by resetting all the variables 
    restartGame: function() {
        document.querySelector("#guessed-letters").innerHTML = "";
        this.wordInPlay = null;
        this.lettersOfTheWord = [];
        this.matchedLetters = [];
        this.guessedLetters = [];
        this.guessesLeft = 0;
        this.totalGuesses = 0;
        this.letterGuessed = null;
        this.setupGame();
        this.rebuildWorldView();
    },

    // checks to see if the user has won 
    updateWins: function() {
        let win;

        // if user hasn't correctly guessed a letter in the word yet, win is set to false, else it is set to true
        if (this.matchedLetters.length === 0) {
            win = false;
        } else {
            win = true;
        }

        // if letter appears in the lettersOfTheWord array, but not in the matchedLetters array, set win to false
        // sets the game so that the user won't will if they haven't guessed all the letters yet
        for (let i = 0; i < this.lettersOfTheWord.length; i++) {
            if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
                win = false;
            }
        }

        // if win is true
        if (win) {
            // increment wins, update wins on the page, and update song title and band on page 
            this.wins = this.wins +1;
            document.querySelector("#wins").innerHTML = this.wins;
            document.querySelector("#music").innerHTML = this.wordsToPick[this.wordInPlay].song + " By " + this.wordInPlay;

            // update image of the band on the page 
            document.querySelector("#bandDiv").innerHTML = 
            "<img class='band-image' src='../images/" + 
            this.wordsToPick[this.wordsInPlay].picture + "' alt='" + 
            this.wordsToPick[this.wordInPlay].song + "'>";

            // play an audio track of artist
            let audio = new Audio(this.wordsToPick[this.wordInPlay].preview);
            audio.play();

            // return true which triggers the restart of our game in the updatePage function 
            return true;
        }

        // if win is flase return false to the updatePage function and the game continues
        return false;
    }
 
};   

// initialize game when page loads
wordGuessGame.setupGame();

// onkeyup event
document.onkeyup = function (event) {
    // make captured key lowercase
    wordGuessGame.letterGuessed = String.fromCharCode(event.which).toLowerCase();
    // pass guessed letter into updatePage function to run the game logic
    wordGuessGame.updatePage(wordGuessGame.letterGuessed);
};
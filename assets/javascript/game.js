// object to hold objects of bands to pick 

var wordGuessGame = {
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
        var objKeys = Object.keys(this.wordsToPick);
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

    // sets initial guesses the user gets
    // 

}   
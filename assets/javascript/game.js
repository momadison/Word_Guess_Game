//=================DINOSAUR WORD GAME OBJECT===================
   //ARRAY OF DINO WORDS
var dinosaur = {
    dinoWords: [
    "allosaurus", "ankylosaurus", "brachiosaurus", "bravoceratops", 
    "deinodon", "diplodocus", "fruitadens", "hadrosaurus", 
    "iguanodon", "nyasasaurus", "raptorex", "sinosauropteryx", 
    "spinosaurus", "talarurus", "triceratops", "tyrannosaurus", 
    "uteodon", "velociraptor",  "yutyrannus"
    ],
    //ARRAY OF DINO PICTURES
    dinoPics: [
    "assets/images/allosaurus.jpg", "assets/images/ankylosaurus.jpg", "assets/images/brachiosaurus.jpg", "assets/images/bravoceratops.jpg", 
    "assets/images/deinodon.jpg", "assets/images/diplodocus.jpg", "assets/images/fruitadens.jpg", "assets/images/hadrosaurus.jpg", 
    "assets/images/iguanodon.jpg", "assets/images/nyasasaurus.jpg", "assets/images/raptorex.jpg", "assets/images/sinosauropteryx.jpg", 
    "assets/images/spinosaurus.jpg", "assets/images/talarurus.jpg", "assets/images/triceratops.jpg", "assets/images/tyrannosaurus.jpg", 
    "assets/images/uteodon.jpg", "assets/images/velociraptor.jpg",  "assets/images/yutyrannus.jpg"
    ],
    //ARRAY OF DINO DESCRIPTIONS
    dinoInfo: [
    "The apex predator of late Jurassic North America.", "This dinosaur was the Cretaceous equivalent of a Sherman Tank.",
    "This dinosaur was a giant, gentle, long-necked plant eater", "This ceratopsian was recently discovered in Texas",
    "Also known as the terrible tooth.", "Thin at one end, much thicker in the middle, and thin again at the far end.",
    "One of the tiniest dinosaurs ever to live in North America", "The official state dinosaur of New Jersey",
    "The second dinosaur in history ever to receive a name", "Could this be the earliest dinosaur in the fossil record",
    "A pint sized precursor of T. Rex", "This hunter preyed on its fellow dino-birds",
    "This dinosaur was distinguished by the sail like structure on it's back", "This ankylosaur was discovered in the Gobi Desert",
    "The famous, three horned plant eating dinosaur", "The once and always king of the dinosaurs",
    "It was once classified as a species of Camptosaurus", "This dinosaur was vicious but a lot smaller than you thought",
    "The largest feathered tyrannosaur yet identified"
    ],
    
    //PICK RANDOM DINO ALONG WITH CORRESPONDING PICTURE AND INFO
    pickDino: function() {
        //pick random dino
        var dinoPick = [this.dinoWords[Math.floor(Math.random() * this.dinoWords.length)]];
        //find index of random dino
        var thisIndex = this.dinoWords.indexOf(dinoPick[0]);
        //get dino image reference and add it to the array
        dinoPick.push(this.dinoPics[thisIndex]);
        //get dino description and add it to the array
        dinoPick.push(this.dinoInfo[thisIndex]);
        //return array
        return dinoPick;  
    },

    //CREATE ARRAY FOR GAMEBOARD
    dinoBoard: function(dino) {
        var letterCount = dino.length;
        var gameBoard = [];
        for (i=0;i<letterCount;i++) {
            gameBoard.push("____ ");
        }
        return gameBoard;
    },

    //SET THE STAGE
    setStage: function() {
        //get random dino array
        var dinoArray = this.pickDino();
        //assign variable for word, set the gameboard, and push the dino word into the array for future reference
        var dinoWord = dinoArray[0];
        var gameBoard = this.dinoBoard(dinoWord);
        gameBoard.forEach(function report(gamePiece) {
            document.getElementById("guessBoard").innerHTML += gamePiece + " ";
        })
        gameBoard.push(dinoWord);
        //assign variable for image and set
        var dinoImage = dinoArray[1];
        document.getElementById("dinoPic").innerHTML = "<img src='" + dinoImage + "' class = 'card-img-top' />";
        //assign variable for description and set
        var dinoDescription = dinoArray[2];
        document.getElementById("dinoDes").innerHTML = dinoDescription;
        //return the array with the 
        return gameBoard;
    }

};

//=============SET VARIABLES===========================
//set the stage and grab gameboard array
var gameBoard = dinosaur.setStage();
//pop out the dino word from the array and assign variable
var dinoWord = gameBoard.pop();
//set variable for guesses left
var guessLeft = 10;
//set variable array to store correct guess
var correctGuess = [];
//set variable array to store incorrect guess
var wrongGuess = [];
//bite audio
var biteAudio = new Audio('assets/sounds/bite.wav');
//correct audio
var correctAudio = new Audio('assets/sounds/correct.wav');
//array of exceptable input
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
//variable for wins
var wins = "0";
//variable for losses
var deaths = "0";

//=========FUNCTION TO RESET AND UPDATE GAMEBOARD===================
function resetGameBoard(gameBoard, correctGuess, wrongGuess) {
    //reset gameboard
    document.getElementById("guessBoard").innerHTML = "";
    document.getElementById("correctGuess").innerHTML = "";
    document.getElementById("wrongGuess").innerHTML = "";
    //update gameboard
    gameBoard.forEach(function update(gamePiece) {
        document.getElementById("guessBoard").innerHTML += gamePiece + " ";
    })
    wrongGuess.forEach(function refresh(wrongPiece) {
        document.getElementById("wrongGuess").innerHTML += wrongPiece + ", ";
    })
    correctGuess.forEach(function updateAgain(correctPiece) {
        document.getElementById("correctGuess").innerHTML += correctPiece + ", ";
    })
    
}

//==============EVENT LISTENER===========================
document.onkeyup = function(event) {
    //variable for event key
    letterPressed = event.key.toLowerCase();
    //variable for wrong guess trigger
    var wGuess = true;
    var uWin = 0;

    //if the letter has not been pressed and is indeed a letter
if (alphabet.indexOf(letterPressed.toLowerCase()) != -1) {
    if ((correctGuess.indexOf(letterPressed) === -1 ) && (wrongGuess.indexOf(letterPressed) === -1)) {
       
            //see if the letter pressed matches inside the word
            for (i=0;i<dinoWord.length;i++) {
                if (dinoWord[i] === letterPressed) {
                    wGuess = false;
                    gameBoard[i] = letterPressed;
                    if (correctGuess.indexOf(letterPressed) === -1) {
                        correctGuess.push(letterPressed);
                        correctAudio.play();
                    }
                }   
            }

        //update the wrong guess array, play the bite sound, subtract guesses left, change picture
        if (wGuess === true) {
            wrongGuess.push(letterPressed);
            guessLeft--;
            document.getElementById("guessLeft").innerHTML = guessLeft;
            biteAudio.play();
            document.getElementById("dummy").innerHTML = "<img src='assets/images/dummy" + guessLeft +".jpg' class='card-img-top' />";
        }
        
        //checks to see if the game is won
        gameBoard.forEach(function is(letter) {
            if (alphabet.indexOf(letter) != -1) {
                uWin++;
            }
        })

        //if the game is won alert the user, update wins, and reset the board
        if (uWin === dinoWord.length) {
            alert("You know your dinosaurs!");
            guessLeft = 10;
            correctGuess = [];
            wrongGuess = [];
            gameBoard = dinosaur.setStage();
            dinoWord = gameBoard.pop();
            wins++;
            resetGameBoard(gameBoard, correctGuess, wrongGuess);
            document.getElementById("guessLeft").innerHTML = guessLeft;
            document.getElementById("dummy").innerHTML = "<img src='assets/images/dummy10.jpg' class='card-img-top' />";
            document.getElementById("wins").innerHTML = wins;
        }

        //if the game is lost alert the user, update losses, and reset the board
        if (guessLeft < 1) {
            alert("Your Dummy was eaten by the " + dinoWord);
            guessLeft = 10;
            correctGuess = [];
            wrongGuess = [];
            gameBoard = dinosaur.setStage();
            dinoWord = gameBoard.pop();
            deaths++;
            resetGameBoard(gameBoard, correctGuess, wrongGuess);
            document.getElementById("guessLeft").innerHTML = guessLeft;
            document.getElementById("dummy").innerHTML = "<img src='assets/images/dummy10.jpg' class='card-img-top' />";
            document.getElementById("losses").innerHTML = deaths;
        }
        else {
        //refresh the board stats if there is not a win or a loss
        resetGameBoard(gameBoard, correctGuess, wrongGuess);
        }
        }
}
}


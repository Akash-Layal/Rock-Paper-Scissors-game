//preloader animation 
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('loading-finished');
    }, 1000);
})

// main game funcction
const game = () => {

    // Global Variables
    let playerCounter = 0;
    let computerCounter = 0;
    // For Checking win to update title & Score;
    let wins;

    //Let's start Match 
    const startGame = () => {
        const startButton = document.querySelector('.start-game-btn');
        const mainScreen = startButton.parentElement;
        const gameScreen = mainScreen.nextElementSibling;
        startButton.addEventListener('click', () => {
            // Start game Fade effect
            mainScreen.classList.toggle('fadeout');
            gameScreen.classList.toggle('fadein');
        });
    };

    //Play Match Function
    const playGame = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');

        // Computer Options
        const computerOptions = ["rock", "paper", "scissors"];

        //Animation Reset for images
        const hands = [playerHand, computerHand]
        hands.forEach(hand => {
            hand.addEventListener('animationend', function () {
                this.style.animation = '';
            })
        });


        //Preventing Multi Clicks on selection
        function disableButton(btn) {
            btn.disabled = true;
        }
        function enableButton(btn) {
            btn.disabled = false;
            btn.enabled = true;
        }


        const optionfunc = () => {
            options.forEach(button => {
                //eventlistner for player option 
                button.addEventListener('click', function () {


                    playerHand.src = './assets/rock.png';
                    computerHand.src = './assets/rock.png';
                    // Random Generated computer options
                    const computerNumber = parseInt(Math.random() * 3);
                    // Computer Choice
                    const computerChoice = computerOptions[computerNumber];
                    // player Choice
                    const playerChoice = this.classList[0];
                    //Disabled button after-click
                    disableButton(button);

                    //Update Images
                    setTimeout(() => {
                        playerHand.src = `./assets/${playerChoice}.png`;
                        computerHand.src = `./assets/${computerChoice}.png`;
                        compareHands(playerChoice, computerChoice);
                        updateScore(wins);
                        //Enabled button after transition-end
                        enableButton(button);
                    }, 2000);

                    playerHand.style.animation = "shakePlayer 2s ease";
                    computerHand.style.animation = "shakeComputer 2s ease";
                    setTimeout(() => {
                        resetGame();
                    }, 2500);


                });
            });

        };


        optionfunc();

    }//playGame function ends here


    //Compare Hands Function
    const compareHands = (player, computer) => {

        //Checking For Tie
        if (player === computer) {
            wins = null;
            updateTitle(wins);
            return
        }

        //Checking for Rock
        else if (player === 'rock') {
            if (computer === 'paper') {
                wins = false;
                updateTitle(wins);
            }
            else {
                wins = true;
                updateTitle(wins);
            }
        }

        //Checking for Paper
        else if (player === "paper") {
            if (computer === "scissors") {
                wins = false;
                updateTitle(wins);
            }
            else {
                wins = true;
                updateTitle(wins);
            }
        }

        //Checking for Scissors
        else if (player === "scissors") {
            if (computer === "rock") {
                wins = false;
                updateTitle(wins);
            }
            else {
                wins = true;
                updateTitle(wins);
            }
        }
    };

    // updating Title
    const updateTitle = (wins, winner = document.querySelector('.choose-option h2')) => {
        const defaultContainer = document.querySelector('.default-para');
        const winTag = document.querySelector('.winner h2');

        defaultContainer.classList.add('fadein');

        if (wins === true) {
            winner.textContent = 'Player wins';
            winTag.textContent = "Woo hoo !!!";
        }
        else if (wins === false) {
            winner.textContent = 'Computer wins';
            winTag.textContent = "Oppss !!!";
        }
        else if (wins === null) {
            winner.textContent = "It's a Draw";
            winTag.textContent = "Both have Bad luck";
        }


    };


    // Updating Scores 
    const updateScore = (wins) => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        //For updating Score-board
        if (wins === true) {
            playerCounter++;
        }
        else if (wins === false) {
            computerCounter++;
        }
        //For printing scores
        playerScore.textContent = playerCounter;
        computerScore.textContent = computerCounter;
    };

    //popup animation
    const resetGame = function () {
        if (playerCounter < computerCounter && computerCounter > 1) {
            if (computerCounter === 3) {
                alert(`Computer Won with ${computerCounter - playerCounter} points restarting game...`)
                setTimeout(() => {
                    location.reload();

                }, 200);
            }
        }
        else if (computerCounter < playerCounter && playerCounter > 1) {
            if (playerCounter === 3) {
                alert(`Player Won with ${playerCounter - computerCounter} points restarting game...`)

                setTimeout(() => {
                    location.reload();
                }, 200)

            }
        }

    }
    // Calling inner Functions
    startGame();
    playGame();
} //game functin ends here

//game Function call
game();

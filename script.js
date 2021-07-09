'use strict';

//DEFAULT SETTINGS
document.querySelector('#score--0').innerHTML = 0;
document.querySelector('#score--1').innerHTML = 0;
document.querySelector('#current--0').innerHTML = 0;
document.querySelector('#current--1').innerHTML = 0;
document.querySelector('.dice').style.display = 'none';

const images = ['./dice-1.png', './dice-2.png', './dice-3.png', './dice-4.png', './dice-5.png', './dice-6.png'];

let playGame = true;
let activePlayer = 0;

let player = document.querySelector(`.player--${activePlayer}`);
let playerScore = document.querySelector(`#score--${activePlayer}`);
let currentScore = document.querySelector(`#current--${activePlayer}`);

let roll = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');
let dice = document.querySelector('.dice');

let randomImg = randomizer();

const newGame = document.querySelector('.btn--new');


function randomizer() {
    return Math.floor(Math.random() * images.length - 1) + 1
}


function rollDice() {
    if (playGame) {
        if (dice.style.display === 'none') {
            dice.style.display = ''
        }

        dice.src = images[randomImg];

        if (randomImg + 1 === 1) {
            penalty();
        } else {
            changeCurrentScores();
        }

        randomImg = randomizer();
        holdScores();
    }

}


function holdScores() {
    hold.addEventListener('click', storeValue);
}
/* Need to modidy *DRY  */
function storeValue() {
    playerScore = document.querySelector(`#score--${activePlayer}`)
    playerScore.innerHTML = Number(playerScore.innerHTML) + Number(currentScore.innerHTML);
    if (playerScore.innerHTML >= 100) {
        playerWins()
    } else {
        if (activePlayer === 0) {
            player.classList.remove("player--active");
            activePlayer = 1;
            //NEED TO MODIFY THIS LINE
            player = document.querySelector(`.player--${activePlayer}`)
            player.classList.add("player--active");

        } else {
            player.classList.remove("player--active");
            activePlayer = 0;
            player = document.querySelector(`.player--${activePlayer}`)
            player.classList.add("player--active");
        }
    }

    currentScore.innerHTML = 0;
}


function changeCurrentScores() {
    currentScore = document.querySelector(`#current--${activePlayer}`)
    currentScore.innerHTML = Number(currentScore.innerHTML) + Number(randomImg) + 1
}


function penalty() {

    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

    currentScore.innerHTML = 0;
    player.classList.remove("player--active");
    player = document.querySelector(`.player--${activePlayer}`);
    playerScore = document.querySelector(`#score--${activePlayer}`);
    currentScore = document.querySelector(`#current--${activePlayer}`);
    player.classList.add("player--active")
}


function startGame() {
    playGame = true;
    roll.addEventListener('click', rollDice);
    startNewGame();
}


function playerWins() {
    player.classList.add('player--winner');
    playGame = false;
}


function startNewGame() {
    newGame.addEventListener('click', resetPlayerScores)
}


function resetPlayerScores() {
    document.querySelector('#score--0').innerHTML = 0;
    document.querySelector('#score--1').innerHTML = 0;
    document.querySelector('#current--0').innerHTML = 0;
    document.querySelector('#current--1').innerHTML = 0;

    player.classList.remove('player--winner');
    activePlayer = 0;
    dice.style.display = 'none';
    startGame();
}

startGame();
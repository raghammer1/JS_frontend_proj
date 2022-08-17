'use strict';

// this code below can get player names
let player1 = String(prompt('prompt - Please enter your name'));
console.log(player1);
let player2 = String(prompt('prompt - Please enter your name'));
console.log(player2);
// if player gave no name then a default name is assigned
if (player1 === '' || player1 === 'NULL' || player1 === null) {
  player1 = 'player 1';
}
if (player2 === '' || player2 === 'NULL' || player2 === null) {
  player2 = 'player 2';
}
document.querySelector('#name--1').textContent = player2;
// To display name on the game
document.querySelector('#name--0').textContent = player1;

// resets the games settings
const newGame = function () {
  score0 = 0;
  score1 = 0;
  document.querySelector('#current--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  selectedPlayer = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  // checks if the hidden property has to be reassigned
  if (
    document.querySelector('.player--1').classList.contains('player--active')
  ) {
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
  }
  // new names to be taken
  player1 = String(prompt('prompt - Please enter your name'));
  console.log(player1);
  player2 = String(prompt('prompt - Please enter your name'));
  console.log(player2);
  // if player gave no name then a default name is assigned
  if (player1 === '' || player1 === null) {
    player1 = 'player 1';
  }
  if (player2 === '' || player2 === null) {
    player2 = 'player 2';
  }

  document.querySelector('#name--0').textContent = player1;
  document.querySelector('#name--1').textContent = player2;
  diceEL.classList.add('hidden');
};

const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');

score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

// checks which player is currently playing
let selectedPlayer = 0;

let score0 = Number(score0EL.textContent);
let score1 = Number(score1EL.textContent);

btnRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;

  // removes the hidden property of the dice
  diceEL.classList.remove('hidden');

  // displays the random dice
  diceEL.src = `dice-${dice}.png`;

  // if player 0 and dice is not on one then add to the current tally
  if (dice !== 1 && selectedPlayer === 0) {
    score0 = score0 + dice;
    document.querySelector('#current--0').textContent = score0;
  }
  // if player 1 and dice is not on one then add to the current tally
  else if (dice !== 1 && selectedPlayer === 1) {
    score1 = score1 + dice;
    document.querySelector('#current--1').textContent = score1;
  }
  // if dice is at 1 then change player and change current to 0 and not score added to current player tally
  else if (dice === 1 && selectedPlayer === 0) {
    if (Number(score0EL.textContent) >= 100) {
      alert(`Congrats ${player1} wins`);
      newGame();
    }
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
    document.querySelector('#current--0').textContent = 0;
    score0 = 0;
    selectedPlayer = 1;
  }
  // if dice is at 1 then change player and change current to 0 and not score added to current player tally
  else if (dice === 1 && selectedPlayer === 1) {
    if (Number(score1EL.textContent) >= 100) {
      alert(`Congrats ${player2} wins`);
      newGame();
    }
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('#current--1').textContent = 0;
    score1 = 0;
    selectedPlayer = 0;
  }
});

btnHold.addEventListener('click', function () {
  // if hold is pressed then current gets added to player score and if score >= 100 then curent player wins else next player moves

  if (selectedPlayer === 0) {
    // checks if atleast one move was made by the player
    if (document.querySelector('#current--0').textContent === '0') {
      alert(`${player1} please make atleast one move`);
      return;
    }
    score0EL.textContent = Number(score0EL.textContent) + score0;
    document.querySelector('#current--0').textContent = 0;
    selectedPlayer = 1;
    score0 = 0;
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
    if (Number(score0EL.textContent) >= 100) {
      alert(`Congrats ${player1} wins`);
      newGame();
    }
  } else {
    if (document.querySelector('#current--1').textContent === '0') {
      alert(`${player2} please make atleast one move`);
      return;
    }
    score1EL.textContent = Number(score1EL.textContent) + score1;
    document.querySelector('#current--1').textContent = 0;
    selectedPlayer = 0;
    score1 = 0;
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    if (Number(score1EL.textContent) >= 100) {
      alert(`Congrats ${player2} wins`);
      newGame();
    }
  }
});

// when newGame clicked this starts a new game
btnNew.addEventListener('click', newGame);

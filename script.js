'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

init();

// Roll dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    // Check for rolled 1
    if (diceRoll !== 1) {
      // add dice roll to current score
      currentScore += diceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if players score >=100
    if (scores[activePlayer] >= 10) {
      // Finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

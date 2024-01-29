var scores, roundScore, activePlayer, gamePlaying, winScore;

init();

// Show and hide the rules to the dice game
document.querySelector('.btn-rules').addEventListener('click', function () {
  var rule = document.getElementById('rules');
  if (rule.style.display === 'none') {
    rule.style.display = 'block';
  } else {
    rule.style.display = 'none';
  }
});

document.querySelector('.bxs-x-circle').addEventListener('click', function () {
  document.getElementById('rules').style.display = 'none';
});

//callback function is a function not called by the user but by another function
//function that we passed into another function as an argument, no need for () in ('click', btn)
//can also write anonymous function inside the event listener itself.
document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // RNG and Display result
    var dice = diceDisplay('dice');
    var dice1 = diceDisplay('dice1');

    // Update score
    if (dice === 6 && dice1 === 6) {
      //Set global score to 0 if both two sixes
      scores[activePlayer] = 0;

      //Update the UI and go to next player
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    } else if (dice !== 1 && dice1 !== 1) {
      //Add current score and update UI
      roundScore += dice + dice1;

      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    //Check if winner
    //Get winning score from players
    //falsy values are COERCED to false
    var winScore = document.getElementById('high-score').value;

    if (scores[activePlayer] >= winScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';

      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice1').style.display = 'none';

      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function diceDisplay(name) {
  //Get RNG
  var dice = Math.floor(Math.random() * 6) + 1;

  //Update display
  var diceDOM = document.querySelector('.' + name);
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';
  return dice;
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  winScore = 100;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice1').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  setTimeout(function () {
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
  }, 500);
}

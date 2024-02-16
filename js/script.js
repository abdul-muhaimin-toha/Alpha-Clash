const sectionWelcomeElement = document.getElementById('game-welcome');
const sectionActiveElement = document.getElementById('game-active');
const sectionScoreElement = document.getElementById('game-score');
const desireAlphabetUiElement = document.getElementById('desire-alphabet');

const allKeyElements = document.getElementsByTagName('kbd');

const gameStartBtnElements = document.querySelectorAll('.start-btn');

let isPlaying = false;
let currentLife = 5;
let currentScore = 0;

function randomAlphabetGenerator() {
  const alphabetString = 'qwertyuiopasdfghjklzxcvbnm';
  const alphabetArr = alphabetString.split('');
  const randomNumber = Math.floor(Math.random() * 26);
  const randomAlphabet = alphabetArr[randomNumber];
  return randomAlphabet;
}

function ChangingUi(randomAlPhabet) {
  const desireAlphabet = randomAlPhabet;
  desireAlphabetUiElement.innerText = desireAlphabet;
  for (const key of allKeyElements) {
    key.classList.remove('bg-orange-400');
  }
  document.getElementById(desireAlphabet).classList.add('bg-orange-400');
}

function changeScoreAndLife() {
  document.getElementById('life').innerText = currentLife;
  document.getElementById('score').innerText = currentScore;
}

for (const gameStartBtnElement of gameStartBtnElements) {
  gameStartBtnElement.addEventListener('click', function () {
    if (!isPlaying) {
      sectionWelcomeElement.classList.add('hidden');
      sectionScoreElement.classList.add('hidden');
      sectionActiveElement.classList.remove('hidden');
      isPlaying = true;
      const randomAlphabet = randomAlphabetGenerator();
      ChangingUi(randomAlphabet);
      currentLife = 5;
      currentScore = 0;
      changeScoreAndLife();
    }
  });
}

document.addEventListener('keyup', function (event) {
  if (event.key === 'Enter' && !isPlaying) {
    sectionWelcomeElement.classList.add('hidden');
    sectionScoreElement.classList.add('hidden');
    sectionActiveElement.classList.remove('hidden');
    isPlaying = true;
    const randomAlphabet = randomAlphabetGenerator();
    ChangingUi(randomAlphabet);
    currentLife = 5;
    currentScore = 0;
    changeScoreAndLife();
  }
});

document.addEventListener('keyup', function (event) {
  const currentAlphabet = desireAlphabetUiElement.innerText.toLowerCase();
  if (isPlaying && event.key === 'Escape') {
    isPlaying = false;
    sectionWelcomeElement.classList.add('hidden');
    sectionActiveElement.classList.add('hidden');
    sectionScoreElement.classList.remove('hidden');
    sectionScoreElement.querySelector('#final-score').innerText = currentScore;
  }

  if (isPlaying && event.key === currentAlphabet) {
    const randomAlphabet = randomAlphabetGenerator();
    currentScore += 1;
    ChangingUi(randomAlphabet);
    changeScoreAndLife();
  }
  if (isPlaying && event.key !== currentAlphabet && event.key !== 'Enter') {
    currentLife -= 1;
    changeScoreAndLife();
  }

  if (currentLife < 1 && event.key !== currentAlphabet) {
    isPlaying = false;
    sectionWelcomeElement.classList.add('hidden');
    sectionActiveElement.classList.add('hidden');
    sectionScoreElement.classList.remove('hidden');
    sectionScoreElement.querySelector('#final-score').innerText = currentScore;
  }
});

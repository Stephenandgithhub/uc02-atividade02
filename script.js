//declare variables

const cards = document.querySelectorAll(".card"); //(Using queryselector insetad of elementtid to get all class card)
const flips = document.getElementById("flips");
const timerShow = document.getElementById("time");
const startButton = document.getElementById("start");
let count = 0;
let hasFlipped = false;
let lockBoard = false; //(one card flip at a time - thank you ai)
let firstCard, secondCard;
let matchedCards = 0;
const totalCards = cards.length / 2;
let timer;
let seconds = 0;
let gameStart = false;

//apply timer

function startTimer() {
  timer = setInterval(statsTimer, 1000);
}
function statsTimer() {
  seconds++;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerShow.textContent = `TImer ${minutes}:${secs} secs`;
}

//apply if statements (equal = stays; else bye)

function flipCard() {
  this.classList.toggle("flipped");
  count++;
  flips.textContent = "Flips " + count;

  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlipped = false;

  checkForMatch();
}

function checkForMatch() {
  const cardMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (cardMatch) {
    disableCards();
    matchedCards++;

    if (matchedCards === totalCards) {
      clearInterval(timer);
      alert("You won! 😊💐");
      reset();
      //print("You won! 😊💐"); -> do not use print THIS ISNT C LANGUAGE!
    }
    return;
  } else {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
  }
}
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

//win; rest game
function reset() {
  count = 0;
  matchedCards = 0;
  flips.textContent = "Flips " + count;
  seconds = 0;
  timerShow.textContent = "Timer 0:00 sec";
}

//apply flip action to cards -> nightmare (SPENT 30 MINS FIGURING - I FORGOT TO ADD CARDS FOR EACH 🤧)

cards.forEach((card) => {
  card.classList.remove("flipped");
  card.addEventListener("click", flipCard);
});

//apply shuffling

shuffleCards();
gameStart = false;

function shuffleCards() {
  cards.forEach((card) => {
    card.style.order = Math.floor(Math.random() * cards.length);
  });
}

//starting timer; reset game
startButton.addEventListener("click", function () {
  if (timer) return;

  reset();
  gameStart = true;
  startTimer();
});

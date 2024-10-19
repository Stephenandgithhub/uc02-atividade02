//declare variables

const cards = document.querySelectorAll(".card"); //(Using queryselector insetad of elementtid to get all class card)
const flips = document.getElementById("flips");
const timerShow = document.getElementById("time");
const startButton = document.getElementById("start");
let count = 0;
let hasFlipped = false;
let lockBoard = false; //(self explanatory - thank you ai)
let gameStart = false;
let firstCard, secondCard;
let matchedCards = 0;
const totalCards = cards.length / 2;
let timer;
let seconds = 0;

//function for cardeventlistener -> tired

function eventCardListeners() {
  cards.forEach((card) => {
    card.removeEventListener("click", flipCard);
    card.addEventListener("click", flipCard);
  });
}

//apply timer

function startTimer() {
  timer = setInterval(statsTimer, 1000);
}
function statsTimer() {
  seconds++;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerShow.textContent = `Timer ${String(minutes).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")} secs`;
}

//apply if statements (equal = stays; else bye)

function flipCard() {
  //block if 'start' or lockboard = unpressed

  if (!gameStart || lockBoard) {
    if (!gameStart) {
        alert("Please start the game first!😊");
    }
    return;
  }

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
  lockBoard = true;
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
  else {
    lockBoard = false;
  }
} else {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        lockBoard = false;
    }, 1000)
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
  timerShow.textContent = "Timer 00:00 sec";
  lockBoard = false;
  gameStart = false;

  eventCardListeners();

  //apply flip action to cards -> nightmare (SPENT 30 MINS FIGURING - I FORGOT TO ADD CARDS FOR EACH 🤧)

  cards.forEach((card) => {
    card.classList.remove("flipped");
  });

  //apply shuffling

  shuffleCards();
}

function shuffleCards() {
  cards.forEach((card) => {
    card.style.order = Math.floor(Math.random() * cards.length);
  });
}

//starting timer; reset game
startButton.addEventListener("click", function () {
  if (gameStart) {
    alert("The game is already in progress!⏳");
    return;
  }
  reset();
  gameStart = true;
  startTimer();
});

eventCardListeners();

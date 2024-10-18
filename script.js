//declare variables

const cards = document.querySelectorAll(".card"); //(Using queryselector insetad of elementtid to get all class card)
const flips = document.getElementById("flips");
let count = 0;
let hasFlipped = false;
let lockBoard = false; //(one card flip at a time - thank you ai)
let firstCard, secondCard;
let matchedCards = 0;
const totalCards = cards.length / 2;

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
      alert("You won! 😊💐");
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

//apply flip action to cards -> nightmare (SPENT 30 MINS FIGURING - I FORGOT TO ADD CARDS FOR EACH 🤧)

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

// values = ['K', 'K', 'K', 'K', 'K', 'K', 'A', 'A', 'A', 'A', 'A', 'A', 'A']
values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
suits = ['♥', '♦', '♠', '♣']
deck = [];

class Card {
 constructor(suit, value) {
  this.suit = suit;
  this.value = value;
 }
 get color() {
  return this.suit === '♠' || this.suit === '♣' ? 'black' : 'red';
 }
 getHTML() {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  const cardDiv = document.createElement('div');
  cardDiv.innerText = this.suit;
  cardDiv.classList.add("player-card", this.color);
  cardDiv.dataset.value = `${this.value} ${this.suit}`;
  cardContainer.appendChild(cardDiv)
  return cardContainer;
 }
 getValue() {
  return this.value
 }
}
function createDeck() {
 for (let i = 0; i < suits.length; i++) {
  for (let j = 0; j < values.length; j++) {
   const card = new Card(suits[i], values[j])
   deck.push(card)
  }
 }
}


function shuffle(min, max) {
 for (let i = 0; i < 1000; i++) {
  let j = Math.floor(Math.random() * (max - min) + min);

  deck.push(deck[j])
  deck.splice(j, 1)
 }
}
createDeck()
shuffle(0, 51)
console.log(deck);
const CARD_VALUE_MAP = {
 "2": 2,
 "3": 3,
 "4": 4,
 "5": 5,
 "6": 6,
 "7": 7,
 "8": 8,
 "9": 9,
 "10": 10,
 "J": 10,
 "Q": 10,
 "K": 10,
 "A": 11
}
let cardsRemaining = deck.length
let total = 0;
let pcTotal = 0;
let pcTotalHiden = 0;

let aceChecker = [];
const playerSlot = document.querySelector('.player-slot');
const dealerSlot = document.querySelector('.pc-slot')
let deckLength = document.querySelector('.deck-length')
const playerTotal = document.querySelector('.total')

const btn = document.querySelector('.btn');
const deal = document.querySelector('.btn-deal')
const stayBtn = document.querySelector('.btn-stay');
const nextHandBtn = document.querySelector('.btn-next-hand')
// loading page
window.addEventListener('DOMContentLoaded', () => {
 btn.setAttribute('disabled', 'disabled')
 stayBtn.setAttribute('disabled', 'disabled')
 nextHandBtn.setAttribute('disabled', 'disabled')
})

// hit btn///////
btn.addEventListener('click', () => {

 let cardValue = deck[1].getValue()
 aceChecker.push(cardValue)
 console.log(aceChecker);
 playerSlot.appendChild(deck[1].getHTML())

 total += CARD_VALUE_MAP[deck[1].getValue()]

 // getPlayerCard()
 deck.splice(1, 1)
 cardsRemaining--;
 if ((aceChecker.indexOf('A') !== -1) && total > 21) {
  total = total - 10
  aceChecker.splice(aceChecker.indexOf('A'), 1)

 } else {
  total = total;
 }

 if (total === 21) {
  playerTotal.textContent = `${total}, nice you have 21 you win`;
  dealerTotal.textContent = `${pcTotal}`;
  btn.setAttribute('disabled', 'disabled')
  stayBtn.setAttribute('disabled', 'disabled')
  nextHandBtn.removeAttribute('disabled')
  getPlayerCard()
  cardsRemaining--
  deckLength.textContent = cardsRemaining;
  return
 } else if (total > 21) {
  btn.setAttribute('disabled', 'disabled')
  stayBtn.setAttribute('disabled', 'disabled')
  nextHandBtn.removeAttribute('disabled')
  getPlayerCard()
  cardsRemaining--
  deckLength.textContent = cardsRemaining;
  playerTotal.textContent = `${total} player bust`;
  dealerTotal.textContent = `${pcTotal} dealer wins`;
  return
 } else {
  total = total;
 }
 console.log(`aceChecker ${aceChecker}`);
 console.log(`deck fater hit ${deck}`)
 console.log(`cardsRemaining after hit ${cardsRemaining}`);
 deckLength.textContent = cardsRemaining;
 playerTotal.textContent = total;
})


const dealerTotal = document.querySelector('.dealer-total')

const unfliped = document.createElement('div')
let dealerAceChecker = []

// deal btn //////
deal.addEventListener('click', function () {
 deal.setAttribute('disabled', 'disabled')
 btn.removeAttribute('disabled')
 stayBtn.removeAttribute('disabled')

 aceChecker.push(deck[0].getValue())
 dealerAceChecker.push(deck[1].getValue())
 aceChecker.push(deck[2].getValue())
 dealerAceChecker.push(deck[3].getValue())
 playerSlot.appendChild(deck[0].getHTML())
 dealerSlot.appendChild(deck[1].getHTML())
 playerSlot.appendChild(deck[2].getHTML())
 // dealerSlot.appendChild(deck[3].getHTML())

 dealerSlot.appendChild(unfliped)
 unfliped.classList.add('unfliped-card')

 total += (CARD_VALUE_MAP[deck[0].getValue()] + CARD_VALUE_MAP[deck[2].getValue()])
 if ((aceChecker.indexOf('A') !== -1) && total > 21) {
  total = total - 10
  aceChecker.splice(aceChecker.indexOf('A'), 1)

 } else {
  total = total;
 }
 pcTotalHiden += (CARD_VALUE_MAP[deck[1].getValue()] + CARD_VALUE_MAP[deck[3].getValue()])
 pcTotal += (CARD_VALUE_MAP[deck[1].getValue()])

 getPlayerCard()
 cardsRemaining--
 getPlayerCard()
 cardsRemaining--
 getPlayerCard()
 cardsRemaining--
 // getPlayerCard()
 console.log(`deck after deal ${deck}`);
 console.log(`pcTotalHiden after deal ${pcTotalHiden}`);

 if (total === 21) {
  playerTotal.textContent = `${total} BlackJack you win`;
  dealerTotal.textContent = `${pcTotal}`;
  getPlayerCard()
  cardsRemaining--
  btn.setAttribute('disabled', 'disabled')
  stayBtn.setAttribute('disabled', 'disabled')
  nextHandBtn.removeAttribute('disabled')

  deckLength.textContent = cardsRemaining;
  return
 }
 if (pcTotalHiden === 21) {
  dealerSlot.removeChild(unfliped)
  dealerSlot.appendChild(deck[0].getHTML())
  getPlayerCard()
  cardsRemaining--
  dealerTotal.textContent = `${pcTotalHiden},blackJack dealer wins`;
  playerTotal.textContent = `${total}, you lost`;
  btn.setAttribute('disabled', 'disabled')
  stayBtn.setAttribute('disabled', 'disabled')
  nextHandBtn.removeAttribute('disabled')
  deckLength.textContent = cardsRemaining;
  return;
 }

 console.log(`cards remoaning after deal ${cardsRemaining}`);
 deckLength.textContent = cardsRemaining;
 dealerTotal.textContent = pcTotal;
 playerTotal.textContent = total;
})

// stay btn /////
stayBtn.addEventListener('click', function () {
 btn.setAttribute('disabled', 'disabled')

 stayBtn.setAttribute('disabled', 'disabled')
 nextHandBtn.removeAttribute('disabled')

 dealerSlot.removeChild(unfliped)
 dealerSlot.appendChild(deck[0].getHTML())
 pcTotal += CARD_VALUE_MAP[deck[0].getValue()]
 getPlayerCard()
 cardsRemaining--
 deckLength.textContent = cardsRemaining;
 if ((dealerAceChecker.indexOf('A') !== -1) && pcTotal > 21) {
  pcTotal = pcTotal - 10
  dealerAceChecker.splice(dealerAceChecker.indexOf('A'), 1)

 } else {
  pcTotal = pcTotal;
 }
 while (pcTotal < 17) {
  dealerAceChecker.push(deck[0].getValue())
  dealerSlot.appendChild(deck[0].getHTML())
  pcTotal += CARD_VALUE_MAP[deck[0].getValue()]
  getPlayerCard()
  cardsRemaining--
  if ((dealerAceChecker.indexOf('A') !== -1) && pcTotal > 21) {
   pcTotal = pcTotal - 10
   dealerAceChecker.splice(dealerAceChecker.indexOf('A'), 1)

  } else {
   pcTotal = pcTotal;
  }


  console.log(cardsRemaining);
  deckLength.textContent = cardsRemaining;

  if (pcTotal > 21) {
   dealerTotal.textContent = `${pcTotal} dealer bust`;
   playerTotal.textContent = `${total} you win`;
   return
  }
 }
 if (pcTotal > total) {
  dealerTotal.textContent = `${pcTotal} dealer wins`;
  playerTotal.textContent = `${total} you lost`;
 } else if (total > pcTotal) {
  dealerTotal.textContent = `${pcTotal} dealer lost`;
  playerTotal.textContent = `${total} you win`;
 } else {
  dealerTotal.textContent = `${pcTotal} push`;
  playerTotal.textContent = `${total} push`;
 }

 // dealerTotal.textContent = pcTotal;
})


function getPlayerCard() {
 deck.shift()
}

// play next hand btn /////
nextHandBtn.addEventListener('click', () => {
 if (cardsRemaining < 20) {
  deck = []
  aceChecker = []
  dealerAceChecker = []
  createDeck()
  shuffle(0, 51)
  cardsRemaining = 52
  playerSlot.innerHTML = '';
  dealerSlot.innerHTML = '';
  pcTotal = 0;
  total = 0;
  pcTotalHiden = 0
  console.log(pcTotalHiden);
  console.log(deck);
  deckLength.textContent = cardsRemaining;
  dealerTotal.textContent = pcTotal;
  playerTotal.textContent = total;
  btn.setAttribute('disabled', 'disabled')
  stayBtn.setAttribute('disabled', 'disabled')
  nextHandBtn.setAttribute('disabled', 'disabled')
  deal.removeAttribute('disabled')
 } else {
  playerSlot.innerHTML = '';
  dealerSlot.innerHTML = '';
  aceChecker = []
  dealerAceChecker = []
  pcTotal = 0;
  total = 0;
  pcTotalHiden = 0;
  console.log(pcTotalHiden);
  console.log(aceChecker, dealerAceChecker);
  deckLength.textContent = cardsRemaining;
  dealerTotal.textContent = pcTotal;
  playerTotal.textContent = total;
  btn.setAttribute('disabled', 'disabled')
  stayBtn.setAttribute('disabled', 'disabled')
  nextHandBtn.setAttribute('disabled', 'disabled')
  deal.removeAttribute('disabled')
 }
})

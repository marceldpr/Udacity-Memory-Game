
// Variáveis globais
const deck = document.querySelector('.deck');
let openCard = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;



/* Embaralha as cartas */

function shuffleDeck() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	const shuffledCards = shuffle(cardsToShuffle);
	for (card of shuffledCards) {
		deck.appendChild(card);
	}
}
shuffleDeck();


/* Arruma o Timer */

function startClock() {
	clockId = setInterval (() => {
		time++;
		displayTime();
	}, 1000);
}

function stopClock() {
	clearInterval(clockId);
}

function displayTime() {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	const clock = document.querySelector('.tempo');
	clock.innerHTML = time;
	if (seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;
	} else {
		clock.innerHTML = `${minutes}:${seconds}`;
	}
}

/* Arruma o click */

function isClickValid(clickTarget) {
	return (
		clickTarget.classList.contains('card') && 
		!clickTarget.classList.contains('match') &&
		openCard.length < 2 &&
		!openCard.includes(clickTarget));
 	} 


 deck.addEventListener('click', event => { 
 	const clickTarget = event.target; 
 	if (isClickValid(clickTarget)) {
 		if (clockOff) {
 			startClock();
 			clockOff = false;
 		}
 		toggleCard(clickTarget);
 		addToggleCard(clickTarget); 
 		if (openCard.length === 2) {
 			checkForMatch(clickTarget); 
 			addMove();
 			checkScore();
 		} 
 }
});


/* Adicionar movimentos */

function addMove() {
	moves++
	const movesText = document.querySelector('.moves');
	movesText.innerHTML = moves;
}



/* Vira as cartas */

 function toggleCard(clickTarget) {
 	clickTarget.classList.toggle('open');
 	clickTarget.classList.toggle('show');
 }

 function addToggleCard (clickTarget) {
 	openCard.push(clickTarget);

 }


/* Verifica se deu Match */

 function checkForMatch () {
 	if (openCard[0].firstElementChild.className === openCard[1].firstElementChild.className) {
 		matched++;
 		openCard[0].classList.toggle('match');
 		openCard[1].classList.toggle('match');

 		openCard = [];
 		
 	} else {
 	    setTimeout (() => {
 		toggleCard(openCard[0]);
 		toggleCard(openCard[1]);
 		openCard = [];
 	}, 1000);
 	}
	if (matched === 8) {
 			gameOver();
 		}

 }

/* Arruma o score */

function checkScore() {
	if (moves === 16 || moves === 24) {
		hideStar();
	}
}


function hideStar() {
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		if (star.style.display !== 'none') {
			star.style.display = 'none';
			break;
		}
	}
}



/* Chama o Modal */

function toggleModal() {
	const modal = document.querySelector('.modal__background');
	modal.classList.toggle('hide');
}

toggleModal();
toggleModal();

function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display != 'none') {
			starCount++;
		}
	}
	return starCount;
}

function writeModalStats() {
	const timeStat = document.querySelector('.modal__time');
	const clockTime = document.querySelector('.tempo').innerHTML;
	const movesStat = document.querySelector('.modal__moves');
	const starsStat = document.querySelector('.modal__stars');
	const stars = getStars();

	timeStat.innerHTML = `Time = ${clockTime}`;
	movesStat.innerHTML = `Moves = ${moves}`;
	starsStat.innerHTML = `Stars = ${stars}`;
}

document.querySelector('.modal__cancel').addEventListener('click', () => {
	toggleModal();
});
document.querySelector('.modal__replay').addEventListener('click', replayGame);

/* Arruma o replay e gameover */

function resetGame() {
	resetClockAndTime();
	resetMoves();
	resetStars();
	shuffleDeck();
	resetCards();
}

function resetClockAndTime() {
	stopClock();
	clockOff = true;
	time = 0;
	displayTime();
}

function resetMoves() {
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
	stars = 0;
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		star.style.display = 'inline';
	}
}

document.querySelector('.restart').addEventListener('click', resetGame);

function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal();
}

function replayGame() {
	resetGame();
	toggleModal();
}

function resetCards() {
	const cards = document.querySelectorAll('.deck li');
	for (let card of cards) {
		card.className = 'card';
		openCard = [];
	}
}



/*----------------------------> Starter code <--------------------------------*/


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

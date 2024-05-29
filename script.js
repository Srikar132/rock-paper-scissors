
const ruleBtn = document.querySelector('.rules-btn');
const rulesDisplay = document.querySelector('.rule-main');
const ruleCloser = document.querySelector('.rule-closer');

ruleBtn.addEventListener("click", () => {
    rulesDisplay.classList.toggle('show-rules');
    click2();
});

ruleCloser.addEventListener("click", () => {
    rulesDisplay.classList.toggle('show-rules');
    click2();
});


const CHOICES  = [
    {
        name : 'rock',
        beats : 'scissors'
    },
    {
        name:'paper',
        beats : 'rock'
    },
    {
        name : 'scissors',
        beats : 'paper'
    }
];

const choiceBtns = document.querySelectorAll('.choice-btn');
const gameDiv = document.querySelector('.game');
const resultDiv = document.querySelector('.result');
const resultDivs = document.querySelectorAll('.result-result');

const showWinner = document.querySelector('.result .show-winner');
const resultText = document.querySelector('.result .result-text');

const playAgainBtn = document.querySelector('.play-again');
const scoreNumber = document.querySelector('.score .score_number');
let score = 0 ;

choiceBtns.forEach( (button) => {
    button.addEventListener('click', () => {
        clickSound();
        setTimeout(() => {
            let choiceName = button.dataset.choice;
            let choice = CHOICES.find( choice => choice.name === choiceName);
            choose(choice);

        },300);
    });
});

function clickSound() {
    let audio = new Audio("./audios/mixkit-arcade-game-jump-coin-216.mp3");
    audio.play();
}



function choose(choice) {
    let aiChoice = aiChoose();
    displayResults([choice,aiChoice]);
    displayWinner([choice,aiChoice]);
}

function aiChoose() {
    let rand = Math.floor( Math.random() * CHOICES.length);
    return CHOICES[rand];
}


function displayResults(results) {
    resultDivs.forEach( (resultDiv , idx) => {
        setTimeout(()=>{
            resultDiv.innerHTML = `
            <div class="choice  ${results[idx].name}">
                <img src="./images/icon-${results[idx].name}.svg" alt="${results[idx].name}">
            </div>
            `;
        }, idx*1000);
    });

    gameDiv.classList.toggle('hidden');
    resultDiv.classList.toggle('hidden');
}



function displayWinner(results){
    setTimeout(() => {
        let userWins = isWinner(results);
        let aiWins = isWinner(results.reverse());

        if(userWins) {
            resultText.textContent = 'You Wins';
            resultDivs[0].classList.toggle('winner');
            collectPoints(1);
            winSound();
        }else if(aiWins) {
            resultText.textContent = 'You Lose';
            resultDivs[1].classList.toggle('winner');
            collectPoints(-1);
            loseSound();
        }else {
            resultText.textContent = 'Draw';
            drawSound();
        }

        showWinner.classList.toggle('hidden');
        resultDiv.classList.toggle('winner-toggle');

    },1500);
}

function drawSound() {
    let audio = new Audio("./audios/mixkit-arcade-retro-game-over-213.mp3");
    audio.play();
}

function winSound() {
    let audio = new Audio("./audios/mixkit-achievement-bell-600.mp3");
    audio.play();
}

function loseSound() {
    let audio = new Audio("./audios/mixkit-losing-drums-2023.mp3");
    audio.play();
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

function collectPoints(point) {
    score += point;
    scoreNumber.textContent = score;
}

playAgainBtn.addEventListener('click',() => {
    click2();
    resultDiv.classList.toggle('winner-toggle');
    resultDiv.classList.toggle('hidden');
    gameDiv.classList.toggle('hidden');
    showWinner.classList.toggle('hidden');
    resultText.textContent = '';

    resultDivs.forEach( resultDiv => {
        if(resultDiv.classList.contains('winner')) {
            resultDiv.classList.toggle('winner');
        }
        resultDiv.innerHTML = '';
    });


});

function click2() {
    let audio = new Audio('./audios/mixkit-cool-interface-click-tone-2568.mp3');
    audio.play();
;}


const startGame = document.querySelector('.start-button') ;
const introCard = document.querySelector('.intro');


startGame.addEventListener('click',() => {
    introCard.classList.toggle('hidden');
    gameStart();
});

function gameStart() {
    let audio = new Audio('./audios/game-start-6104.mp3');
    audio.play();
}
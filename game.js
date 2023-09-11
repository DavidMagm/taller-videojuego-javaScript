const canvas = document.querySelector('#game');
const game = canvas.getContext('2D');

window.addEventListener('load', setGameSize);
window.addEventListener('resize', setGameSize);

let canvaSize;
let elementSize;

function setGameSize() {
    if(window.innerHeight > window.innerWidth) {
        canvaSize = window.innerWidth * 0.8;
    } else {
        canvaSize = window.innerHeight * 0.8;
    }
    canvas.setAttribute('width',canvaSize);
    canvas.setAttribute('height',canvaSize);
    elementSize = (canvaSize / 10) -1;
    startGame()
}

function startGame() {
    game.font = `${elementSize}px Arial`;
    game.textAlign = "end";
    for(let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementSize * i, elementSize)
    }
}
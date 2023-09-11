const canvas = document.querySelector('#game');
const game = canvas.getContext('2D');

window.addEventListener('load', setGameSize);
window.addEventListener('resize', setGameSize);

let canvaSize;
let elementSize;

function setGameSize() {
    window.innerHeight > window.innerWidth 
    ? canvaSize = window.innerWidth * 0.8 
    : canvaSize = window.innerHeight * 0.8;
    canvas.setAttribute('width',canvaSize);
    canvas.setAttribute('height',canvaSize);
    elementSize = (canvaSize / 10) -1;
    startGame()
}

function startGame() {
    game.font = `${elementSize}px Arial`;
    game.textAlign = "end";

    const map = maps[0];
    const mapRow = map.trim().split('\n');
    const mapRowCol = mapRow.map(row => row.trim().split(''));

    mapRowCol.forEach((row, rowIndex) => {
        row.forEach((col,colIndex) => {
            const emoji = emojis[col];
            const posX = elementSize * (colIndex + 1);
            const posY = elementSize * (rowIndex + 1);
            game.fillText(emoji, posX, posY);
        })
    });

    // for(let row = 1; row < 10; row++) {
    //     for(let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCol[row - 1][col - 1]], elementSize * col, elementSize * row)
    //     }
    // }
}
const canvas = document.querySelector('#game');
const game = canvas.getContext('2D');
const up = document.querySelector('.up');
const left = document.querySelector('.left');
const rigth = document.querySelector('.rigth');
const down = document.querySelector('.down');

window.addEventListener('load', setGameSize);
window.addEventListener('resize', setGameSize);
window.addEventListener('keydown', keysBtn);
up.addEventListener('click')
left.addEventListener('click')
rigth.addEventListener('click')
down.addEventListener('click')

const playerPosition = {
    x : undefined,
    y: undefined
};
const giftPosition = {
    x: undefined,
    y: undefined
};

function keysBtn(event) {
    if(event.key == 'ArrowUp') moveUp();
    else if(event.key == 'ArrowLeft') moveLeft();
    else if(event.key == 'ArrowRight') moveRight();
    else if(event.key == 'ArrowDown') moveDown();
}



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
    game.clearRect(0,0,canvaSize,canvaSize);

    mapRowCol.forEach((row, rowIndex) => {
        row.forEach((col,colIndex) => {
            const emoji = emojis[col];
            const posX = elementSize * (colIndex + 1);
            const posY = elementSize * (rowIndex + 1);
            if(col == 'O') {
                if(!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                } else if(col == 'I') {
                    giftPosition.x = posX;
                    giftPosition.y = posY;
                } 
            }
            game.fillText(emoji, posX, posY);
        })
        movePlayer()
    });

    // for(let row = 1; row < 10; row++) {
    //     for(let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCol[row - 1][col - 1]], elementSize * col, elementSize * row)
    //     }
    // }
}

function moveUp() {
    if((playerPosition.y - elementSize) < elementSize) {
        console.log("out");
    } else {
        playerPosition.y -= elementSize;
        startGame()
    }
    
}
function moveLeft() {
    if((playerPosition.x - elementSize) < elementSize) {
        console.log("out");
    } else {
        playerPosition.x -= elementSize;
        startGame()
    }
}
function moveRight() {
    if((playerPosition.x + elementSize) > elementSize) {
        console.log("out");
    } else {
        playerPosition.x += elementSize;
        startGame()
    }
}
function moveDown() {
    if((playerPosition.y + elementSize) > elementSize) {
        console.log("out");
    } else {
        playerPosition.y += elementSize;
        startGame()
    }
}

function movePlayer() {
    const giftX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollition = giftX && giftY;
    if(giftCollition) {
        console.log("colocion");
    }
    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
}

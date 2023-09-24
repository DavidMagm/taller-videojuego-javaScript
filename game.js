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
let enemyPosition = [];
function keysBtn(event) {
    if(event.key == 'ArrowUp') moveUp();
    else if(event.key == 'ArrowLeft') moveLeft();
    else if(event.key == 'ArrowRight') moveRight();
    else if(event.key == 'ArrowDown') moveDown();
}



let canvaSize;
let elementSize;
let level;
let lives = 3;

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

    const map = maps[level];
    if(!map) {
        gameFinish();
        return
    }
    const mapRow = map.trim().split('\n');
    const mapRowCol = mapRow.map(row => row.trim().split(''));
    enemyPosition = [];
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
                } else if (col == 'X') {
                    enemyPosition.push({
                        x: posX,
                        y: posY
                    })
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
        console.log("subiste de nivel");
        levelWin();
    }

    const enemyCollition = enemyPosition.find(enemy => {
        const enemyX = enemy.x == playerPosition.x.toFixed(3);
        const enemyY = enemy.y == playerPosition.y.toFixed(3);
        return enemyX && enemyY;
    })
    if(enemyCollition) {
        console.log("colicion con un enemigo");
        levelFail();
    }
    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
}

function levelWin() {
    level++;
    startGame();
}
function levelFail() {
    lives--;
    if(lives <= 0) {
        level = 0;
        lives = 3;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}
function gameFinish() {
    console.log("terminaste el juego");
}
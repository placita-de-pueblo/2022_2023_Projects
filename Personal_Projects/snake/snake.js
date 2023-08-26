//board
var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context;


//snake head
var snakeX = blockSize*5;
var snakeY = blockSize*5;

var vX = 0;
var vY = 0;
var lastMovement;

var snakeBody = [];

//apple
var appleX;
var appleY;

var gameOver = false;
var puntos = 0;


window.onload = function(){
    board = document.getElementById("board");
    board.height = rows*blockSize;
    board.width = columns*blockSize;
    context = board.getContext("2d"); //se usa para poder pintar sobre el board, en 2d como si fuera un Koordinatensystem
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10);//every 100 miliseconds
}

function update(){
    if(gameOver){
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    
    context.fillStyle = "red";
    context.fillRect(appleX, appleY, blockSize, blockSize);

    if (snakeX == appleX && snakeY == appleY) {
        snakeBody.push([appleX, appleY]);
        puntos += 1;
        document.getElementById("puntos").innerHTML = "score: "+puntos; 
        placeFood();
    }

    //empiezas por la cola y cada segmento se mueve al que está delante suyo
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    //el segundo elemento se convierte en la cabeza al final
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }


    context.fillStyle = "lime";
    snakeX += vX*blockSize;
    snakeY += vY*blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game Over conditions
    if (snakeX < 0 || snakeX > columns*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        console.log("GameOver");
        gameOver = true;
        document.getElementById("normalPage").innerHTML="<p id='GameOver'>GAME OVER :(</p><p id='score'>score: "+puntos+"</p><div class='container'><div class='center'><button id='restart' onclick='newGame(); return false;'>Restart</button></div></div>";
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            console.log("Game'Over");
            gameOver = true;
            document.getElementById("normalPage").innerHTML="<p id='GameOver'>GAME OVER :(</p><p id='score'>score: "+puntos+"</p><div class='container'><div class='center'><button id='restart' onclick='newGame(); return false;'>Restart</button></div></div>";
        }
    }

    if(snakeBody>=390){
        gameOver = true;
        document.getElementById("normalPage").innerHTML="<p id='GameOver'>You win!!!</p><p id='score'>score: "+puntos+"</p><div class='container'><div class='center'><button id='restart' onclick='newGame(); return false;'>Restart</button></div></div>";
    }
}

function changeDirection(e){
    if(e.code == "ArrowUp" && lastMovement != "down"){
        vX = 0
        vY = -1;
        lastMovement = "up";
    }

    else if(e.code == "ArrowDown" && lastMovement != "up"){
        vX = 0;
        vY = 1;
        lastMovement = "down";
    }

    else if(e.code == "ArrowRight" && lastMovement != "left"){
        vX = 1;
        vY = 0;
        lastMovement = "right";
    }

    else if(e.code == "ArrowLeft" && lastMovement != "right"){
        vX = -1;
        vY = 0;
        lastMovement = "left";
    }
}


function newGame(){
    document.getElementById("normalPage").innerHTML="<canvas id='board'></canvas><p id ='puntos'>score: 0</p>";
    //newSnake
    snakeX = blockSize*5;
    snakeY = blockSize*5;
    vX = 0;
    vY = 0;
    lastMovement = "";
    snakeBody = [];
    puntos = 0;

    board = document.getElementById("board");
    board.height = rows*blockSize;
    board.width = columns*blockSize;
    context = board.getContext("2d"); //se usa para poder pintar sobre el board, en 2d como si fuera un Koordinatensystem
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    gameOver = false;
    update();
    console.log("Ready!");
}


//pplace food randomly
function placeFood(){
    appleX = Math.floor(Math.random()*columns)*blockSize;
    appleY = Math.floor(Math.random()*rows)*blockSize;
    for (let i = 0; i < snakeBody.length; i++) {
        appleX = Math.floor(Math.random()*columns)*blockSize;
        appleY = Math.floor(Math.random()*rows)*blockSize;
    }
}

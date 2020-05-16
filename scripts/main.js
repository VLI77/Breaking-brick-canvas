const canvas = document.querySelector(".myCanvas-js");
const context = canvas.getContext("2d");
const game = document.querySelector('.game-js')
let score = 0
let coeur=  0


/************GESTION BALL***********/


const ballRadius = 10;
let PosX = canvas.width / 2;
let PosY = canvas.height - 30;
let dirX = 9;
let dirY = -9;

function drawBall() {
    context.beginPath();
    context.arc(PosX, PosY, 10, 0, Math.PI*2);
    context.fillStyle = "red"
    context.fill();
    context.closePath();
    PosX += dirX;
    PosY += dirY;


}







/************GESTION BRICK************/


const brickRowCount = 4;
const brickColumnCount = 21;
const brickWidth = 25;
const brickHeight = 30;
const brickPadding = 20;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let column = 0; column < brickColumnCount; column++) {          
    bricks[column] = [];                                
    for (let row = 0; row < brickRowCount; row++) {
        bricks[column][row] = { PosX: 0, PosY: 0, status: 1 };  
    }
}

function keyDownHandler(_element) {
    if (_element.keyCode == 39) {
        rightPressed = true;
    }
    else if (_element.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(__element) {
    if (_element.keyCode == 39) {
        rightPressed = false;
    }
    else if (_element.keyCode == 37) {
        leftPressed = false;
    }
}






function drawBricks() {
    for (let column = 0; column < brickColumnCount; column++) {
        for (let row = 0; row < brickRowCount; row++) {
            if (bricks[column][row].status == 1) {
                let brickX = (column * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[column][row].PosX = brickX;
                bricks[column][row].PosY = brickY;
                context.beginPath();               
                context.rect(brickX, brickY,40, 20,);
                context.fillStyle = "black"
                context.fill();
                context.closePath();
            }
        }
    }
}








/**********GESTION PADDLE**********/


let paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false;


function drawPaddle() {
    context.beginPath();
    context.rect(paddleX,680,paddleWidth, 30);
    context.fillStyle = "black"
    context.fill()
    context.closePath();

}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(_element) {
    if (_element.key == "Right" || _element.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (_element.key == "Left" || _element.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(_element) {
    if (_element.key == "Right" || _element.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (_element.key == "Left" || _element.key == "ArrowLeft") {
        leftPressed = false;
    }
}



//******COLLISION BALL****//
function collisionDetection() {
    for (let column = 0; column < brickColumnCount; column++) {
        for (let row = 0; row < brickRowCount; row++) {
            let b = bricks[column][row];
            if (b.status == 1) {
                if (PosX > b.PosX && PosX < b.PosX + brickWidth && PosY > b.PosY && PosY < b.PosY + brickHeight) {
                    dirY = -dirY;
                    b.status = 0;
                    score++;
                    if(score>=10){
                        dirX=10;
                        dirY=-10;
                    }
                    if(score>=30){
                        dirX=13;
                        dirY=-13;
                    }
                  }
                }
            }

        }
    }





function drawScore() {
    context.font = "20px Arial";
    context.fillStyle = "#000000";
    context.fillText("Score: " + score, 30, 20);
    let life = document.querySelector(".life");
    let life2 = document.querySelector(".life2");
    let life3 = document.querySelector(".life3");
}



const draw = () =>{
    window.requestAnimationFrame(draw)
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    drawPaddle();
    collisionDetection();
    drawScore();

    if (PosX + dirX > canvas.width - ballRadius || PosX + dirX< ballRadius) {
        dirX = -dirX;
    }
    if (PosY + dirY > canvas.height && coeur == 0) {
        dirY = -dirY;
        score--;
        document.querySelector(".life").style.visibility = "hidden";
        coeur++;

    }
    else if (PosY + dirY > canvas.height && coeur == 1) {
        dirY = -dirY;
        score--;
        document.querySelector(".life2").style.visibility = "hidden";
        coeur++;


    }
    else if (PosY + dirY > canvas.height && coeur == 2) {
        dirY = -dirY;
        score--;
        document.querySelector(".life3").style.visibility = "hidden";
        window.location.reload();
    }


    if (PosY + dirY < ballRadius) {
        dirY = -dirY;
    }

    else if (PosY + dirY > canvas.height-15 - ballRadius) {
        if (PosX > paddleX && PosX < paddleX + paddleWidth) {
            dirY = -dirY;
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 15;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 15;
    }

   
}
    
draw()









'use strict';

/* canvas */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

/*변수 지정*/
/*공*/
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2; //setter 함수
let dy = -2;
let ballRadius = 10;

/*bar*/
let barWidth = 100;
let barHeigth = 10;
let barX;

/*벽돌*/
let brickRowCount = 4;
let brickColumnCount = 6;
let brickWidth = 110;
let brickHeight = 20;
let brickMargin = 15;
let brickOffsetTop = 30;
let brickOffsetLeft = 35;
let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}
/*마우스 이동 감지*/
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(0 < relativeX && relativeX < canvas.width) {
        barX = relativeX - barWidth/2 ;
    }
}

function drawBricks(){
    for(let c=0; c<brickColumnCount; c++){
        for(let r=0; r<brickRowCount; r++){
            let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(bricks[c][r].x,bricks[c][r].y,brickWidth,brickHeight);
            //color
            let bricks[c][r].num = Math.floor(Math.random()*3+1);
            if(bricks[c][r].num===1){
                ctx.fillStyle = "purple";
                ctx.globalAlpha = 0.3;
            }else if(bricks[c][r].num===2){
                ctx.fillStyle = "purple";
                ctx.globalAlpha = 0.6;
            }else{
                ctx.fillStyle = "purple";
                ctx.globalAlpha = 1;
            }
            ctx.fill();
            ctx.closePath();
        }
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBar() {
    ctx.beginPath();
    ctx.rect(barX,canvas.height-barHeigth,barWidth,barHeigth);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function barWallCollision(){ //충돌처리 & 공 튀기기
    if(x + dx - ballRadius < 0 || x + dx + ballRadius  > canvas.width){
        dx = -dx;
    } //x 좌표

    if(y + dy - ballRadius < 0){ //천장 충돌
        dy = -dy;
    }else if(y + dy + ballRadius > canvas.height){
        if(barX < x && x < barX + barWidth){
            dy = -dy;
        } //bar와 충돌처리
        else{
            alert("GAME OVER");
            window.location.reload();
            /*공다시그리기*/
            x = canvas.width/2;
            y = canvas.height-30;
            drawBall();
        }
    }
}

function brickCollision(){ //벽돌 충돌처리
    let b = bricks[c][r];
    bricks.forEach((c) => 
    c.forEach((r)=>
    {
    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
        dy = -dy;
        b.num -= 1;
    }
    }
));

}

function draw() { //main logic
    ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas 지우기
    drawBricks();
    drawBall();
    drawBar();

    
    x += dx;
    y += dy;
    
    barWallCollision();
}
setInterval(draw, 10);

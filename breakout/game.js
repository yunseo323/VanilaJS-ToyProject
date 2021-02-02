'use strict';
/* canvas */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

/*변수 지정*/
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

let ballRadius = 10;

let barWidth = 100;
let barHeigth = 10;
let barX;

/*마우스 이동 감지*/
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(0 < relativeX && relativeX < canvas.width) {
        barX = relativeX - barWidth/2 ;
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

function collisionDetect(){ //충돌처리 & 공 튀기기
    if(x + dx - ballRadius < 0 || x + dx + ballRadius  > canvas.width){
        dx = -dx;
    } //x 좌표

    if(y+dy-ballRadius<0){ //천장 충돌
        dy = -dy;
    }else if(y+dy+ballRadius>canvas.height){
        if(barX<x && x<barX+barWidth){
            dy = -dy;
        } //bar와 충돌처리
        else{
            alert("GAME OVER");
            window.location.reload();
        }
    }
}

function draw() { //main logic
    ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas 지우기
    drawBall();
    drawBar();

    
    x += dx;
    y += dy;

    collisionDetect();
    
    
    
}

setInterval(draw, 10);

'use strict';

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

/*변수 지정*/
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

let ballRadius = 10;

let barWidth = 100;
let barHeigth = 20;



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBar() {
    ctx.beginPath();
    ctx.rect(0,canvas.height-barHeigth,barWidth,barHeigth);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas 지우기
    drawBall();
    drawBar();

    x += dx;
    y += dy;

    /* 공 튀기기 */
    if(y + dy - ballRadius < 0 || y + dy + ballRadius > canvas.height){
        dy = -dy;
    }
    if(x + dx - ballRadius < 0 || x + dx + ballRadius  > canvas.width){
        dx = -dx;
    }
}

setInterval(draw, 10);

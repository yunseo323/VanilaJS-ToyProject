'use strict';
/* MDN 참고 */

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
/*점수, lives*/
let score = 0;
let brickScore = 0;
let lives = 3;


for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, num: 0};
        bricks[c][r].num = Math.floor(Math.random()*3)+1;
        brickScore += bricks[c][r].num * 10; //벽돌 점수
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

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score,8,20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }

function drawBricks(){
    
    for(let c=0; c<brickColumnCount; c++){
        for(let r=0; r<brickRowCount; r++){

            if(bricks[c][r].num>0){
            let brickX = (c*(brickWidth+brickMargin))+brickOffsetLeft;
            let brickY = (r*(brickHeight+brickMargin))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(bricks[c][r].x,bricks[c][r].y,brickWidth,brickHeight);
            
            //color
                if(bricks[c][r].num===1){
                    ctx.fillStyle = "purple";
                    ctx.globalAlpha = 0.3;
                }else if(bricks[c][r].num===2){
                    ctx.fillStyle = "purple";
                    ctx.globalAlpha = 0.6;
                }else if(bricks[c][r].num===3){
                    ctx.fillStyle = "purple";
                    ctx.globalAlpha = 1;
                }
                ctx.fill();
                ctx.closePath();
            
                }
            }
        }
        ctx.globalAlpha = 1; //투명도 원상복귀
        
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
    }else if(y + dy + ballRadius > canvas.height - barHeigth){
        if(barX < x && x < barX + barWidth){
            dy = -dy;
        } //bar와 충돌처리
        else{ //그 외의 충돌
            lives--;
            if(!lives){
                alert("Game Over");
                window.location.reload();
            }
            else{
                console.log("깎여!");
                x = canvas.width/2;
                y = canvas.height-30;
                //속도를 더 빠르게
                dx = 3;
                dy = -3;
                barX = (canvas.width-barWidth)/2;
            }
        }
    }
}

function brickCollision(){ //벽돌 충돌처리
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            
            if(b.num > 0 && b.x < x && x < b.x + brickWidth && b.y < y && y < b.y + brickHeight) {
                dy = -dy;
                // dx= -dx;
                b.num -= 1; //bricks[c][r].num 이라고 하면 에러남
                score += 10;
            }
        }
    }
    if(brickScore===score){
        alert("YOU WIN!");
        window.location.reload();
    }

}

function game() { //main logic
    ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas 지우기
    drawScore();
    brickCollision();
    drawBricks();
    drawBall();
    drawBar();
    drawLives();

    
    x += dx;
    y += dy;
    
    barWallCollision();
    requestAnimationFrame(game);
}

game();

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score,8,20);
}

function drawBricks(){
    
    brickCollision();
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
                }else{
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

export

window.addEventListener('keydown', (e) => {
    inputSystem.isKeyPressed[e.code] = true;
});
window.addEventListener('keyup', (e) => {
    inputSystem.isKeyPressed[e.code] = false;
});
document.addEventListener("mousemove", mouseMoveHandler, false);

class InputSystem{
    constructor() {
        this.isKeyPressed = [];
    }

    isKeyDown(keyCode){
        if( this.isKeyPressed[keyCode] === true ){
          return true;
        }
        else{
            return false;
        }
    }
    mouseMoveHandler(e) {
        let relativeX = e.clientX - canvas.offsetLeft;
        if(0 < relativeX && relativeX < canvas.width) {
            barX = relativeX - barWidth/2 ;
        }
    }
    
}

const inputSystem = new InputSystem();
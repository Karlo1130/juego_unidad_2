//player object
class Player {
    constructor(){
        this.direction = '';

        this.sprite = new Image();
        this.sprite.src = 'assets/player/punpun.png';
        
        this.height = this.sprite.height;
        this.width = this.sprite.width;
        
        this.xPosition = (canvasWidth / 2) - (this.width / 2);
        this.yPosition = canvasHeight-this.height;
        
        this.ySpeed = 7;
        this.xSpeed = 5;

        this.sprite.onload = () => {
            this.drawPlayer();
        };
    }

    drawPlayer(){
        ctx.drawImage(this.sprite, this.xPosition, this.yPosition, this.width, this.height)
    }

    //collision detection
    isColliding(enemy){
        if(this.xPosition < enemy.xPosition + enemy.width 
            && this.xPosition + this.width > enemy.xPosition 
            && this.yPosition < enemy.yPosition + enemy.height 
            && this.yPosition + this.height > enemy.yPosition){  
            return true;
        }
         
        return false;
    }
}
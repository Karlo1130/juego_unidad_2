class Bullet{
    constructor(xPosition, yPosition, direction){
        this.xPosition = xPosition;
        this.yPosition = yPosition;

        this.width = 15;
        this.height = 15;

        this.direction = direction;
        this.speed = 15;
        this.isDestroyed = false;
    }

    drawBullet(){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.xPosition, this.yPosition, this.width, this.height)
    }

    moveBullet(){
        switch(this.direction){
            case "left":
                this.xPosition -= this.speed
                break;
            case "up":
                this.yPosition -= this.speed
                break;
            case "right":
                this.xPosition += this.speed
                break;
            case "down":
                this.yPosition += this.speed
                break;
            default:
                this.xPosition -= this.speed
                break;
        }
    }

    destroyBullet(){
        this.isDestroyed = true;
    }

    isColliding(enemy){

        if(this.xPosition < enemy.xPosition + enemy.width 
            && this.xPosition + this.width > enemy.xPosition 
            && this.yPosition < enemy.yPosition + enemy.height 
            && this.yPosition + this.height > enemy.yPosition){  
            return true;
        }
    }
}
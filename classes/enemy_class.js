//car object
class Car {
    constructor(xPosition, yPosition, direction){

        this.direction = direction;

        this.xPosition = xPosition;
        this.yPosition = yPosition;

        this.sprite = new Image();
        this.sprite.src = 'assets/enemys/green_car.png';

        this.height = this.sprite.height;
        this.width = this.sprite.width;

        this.xSpeed = 2.5;

        this.isDestroyed = false;

        this.sprite.onload = () => {
            this.drawCar();
        };
    }

    drawCar(){
        if(this.direction == 'right'){
            ctx.drawImage(this.sprite, this.xPosition, this.yPosition, this.width, this.height);
        } else {
            ctx.translate(this.xPosition + this.width, this.yPosition);

            ctx.scale(-1, 1);

            ctx.drawImage(this.sprite, 0, 0);

            ctx.setTransform(1,0,0,1,0,0);
        }
    }

    moveCar(){
        if(this.direction == 'right'){
            this.xPosition += this.xSpeed;
        } else {
            this.xPosition -= this.xSpeed; 
        }
    }

    destroyCar(){
        this.isDestroyed = true;
    }
}

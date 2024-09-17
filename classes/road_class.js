//road class
class Road{
    constructor(number, yPosition, roadDirection){
        this.number = number;
        this.yPosition = yPosition;
        this.roadDirection = roadDirection;
        this.enemys = [];

        this.sprite = new Image();
        this.sprite.src = 'assets/roads/road.png';

        this.sprite.onload = () => {
            this.drawRoad();
        };
    }

    spawnEnemy(direction){
        if(direction == 'right'){
            this.enemys.push(new Enemy(-100, this.yPosition, 'right'))
        } else {
            this.enemys.push(new Enemy(canvasWidth, this.yPosition, 'left'))
        }
    }

    drawEnemys(){
        this.enemys.forEach(enemy => {
            enemy.drawEnemy();
        });
    }

    drawRoad(){
        ctx.drawImage(this.sprite, 0, this.yPosition)
    }
}
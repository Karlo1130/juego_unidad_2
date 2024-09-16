//road class
class Road{
    constructor(number, yPosition, roadDirection){
        this.number = number;
        this.yPosition = yPosition;
        this.roadDirection = roadDirection;
        this.enemys = [];
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
}
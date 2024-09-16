
function drawLevel3() {
    
    punpun.drawPlayer();

    roads.forEach(road => {
        road.drawEnemys();
    });
  
}

function updateLevel3(){

    roads.forEach(road => {

        let roadNumber = road.number;
        
        road.enemys.forEach(enemy => {
            enemy.moveEnemy();

            if(punpun.isColliding(enemy)){
                //console.log('ta chocando');
            }

            if((enemy.xPosition <= -101 && enemy.direction == 'left') 
                || (enemy.xPosition >= canvasWidth + 1 && enemy.direction == 'right')){
                enemy.destroyEnemy();
                let carIndex = road.enemys.findIndex(car => car.isDestroyed == true);
                road.enemys.splice(carIndex, 1)
            }

        });

        newEnemyWhenRandomTime(roads[roadNumber-1]);

    });

    if (punpun.yPosition <= 70) {
        punpun.xPosition = (canvasWidth / 2) - (punpun.width / 2);
        punpun.yPosition = canvasHeight-punpun.height;

        roads = [];

        isLevelThreePassed = true;
        console.log('ganaste el tercer nivel');
    }
}
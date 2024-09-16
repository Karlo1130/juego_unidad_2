var roads = [];

roads.push(new Road(1, 100, 'right'));
roads.push(new Road(2, 200, 'left'));
roads.push(new Road(3, 400, 'right'));
roads.push(new Road(4, 600, 'right'));
roads.push(new Road(5, 700, 'left'));

roads[0].spawnEnemy(roads[0].roadDirection)
roads[1].spawnEnemy(roads[1].roadDirection)
roads[2].spawnEnemy(roads[2].roadDirection)
roads[3].spawnEnemy(roads[3].roadDirection)
roads[4].spawnEnemy(roads[4].roadDirection)

function drawLevel1() {
    
    punpun.drawPlayer();

    roads.forEach(road => {
        road.drawEnemys();
    });
  
}

function updateLevel1(){

    roads.forEach(road => {

        let roadNumber = road.number;
        
        road.enemys.forEach(enemy => {
            enemy.moveEnemy();

            if(punpun.isColliding(enemy)){
                console.log('ta chocando');
            }

            if((enemy.xPosition <= -101 && enemy.direction == 'left') 
                || (enemy.xPosition >= canvasWidth + 1 && enemy.direction == 'right')){
                enemy.destroyEnemy();
                let carIndex = road.enemys.findIndex(car => car.isDestroyed == true);
                road.enemys.splice(carIndex, 1)
            }

        });

    switch(roadNumber){
        case 1:
            newEnemyWhenDestroy(roads[roadNumber-1]);
            break;
        case 2:
            newEnemyWhenSpace(roads[roadNumber-1]);
            break;
        case 3:
            newEnemyWhenTime(roads[roadNumber-1], 3);
            break;
        case 4:
            newEnemyWhenRandomTime(roads[roadNumber-1]);
            break;
        case 5:
            newEnemyWhenSpace(roads[roadNumber-1]);
            break;
        default:
            newEnemyWhenTime(roads[roadNumber-1], 3);
    }

    });

    if (punpun.yPosition <= 70) {
        isLevelOnePassed = true;
        console.log('ganaste el primer nivel');
    }
}
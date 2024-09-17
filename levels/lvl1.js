
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
    //goal line
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < canvasWidth / 10; j++) {
            
            if ((j % 2 == 0 && i % 2 == 0) || (j % 2 == 1 && i % 2 == 1)){
                ctx.fillStyle = 'white';
                ctx.fillRect(j * 35, 0 + (35 * i), 35, 35)
            } else {
                ctx.fillStyle = 'black';
                ctx.fillRect(j * 35, 0 + (35 * i), 35, 35)
            }
        }
    }

    ctx.fillStyle = 'red';
    
    roads.forEach(road => {
        road.drawRoad();
        road.drawEnemys();
    });

    punpun.drawPlayer();

  
}

function updateLevel1(){

    roads.forEach(road => {

        let roadNumber = road.number;
        
        road.enemys.forEach(enemy => {
            enemy.moveEnemy();

            if(punpun.isColliding(enemy)){
                if(!punpun.isDead){
                    deathSound.play();
                }
                bgMusic.pause();
                punpun.isDead = true;
                bullets = [];
            }

            bullets.forEach(bullet => {
                if(bullet.isColliding(enemy)){
                    enemy.destroyEnemy();
                    let carIndex = road.enemys.findIndex(car => car.isDestroyed == true);
                    road.enemys.splice(carIndex, 1)
                }
            })

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

    if (punpun.yPosition <= 35) {        

        punpun.xPosition = (canvasWidth / 2) - (punpun.width / 2);
        punpun.yPosition = canvasHeight-punpun.height;
        
        roads = []
        bullets = []

        roads.push(new Road(1, 100, 'right'));
        roads.push(new Road(2, 200, 'left'));
        roads.push(new Road(3, 400, 'right'));
        roads.push(new Road(4, 500, 'left'));
        roads.push(new Road(5, 600, 'right'));
        roads.push(new Road(6, 700, 'left'));

        roads[0].spawnEnemy(roads[0].roadDirection)
        roads[1].spawnEnemy(roads[1].roadDirection)
        roads[2].spawnEnemy(roads[2].roadDirection)
        roads[3].spawnEnemy(roads[3].roadDirection)
        roads[4].spawnEnemy(roads[4].roadDirection)

        seconds = 0;
        
        isLevelOnePassed = true;
    }
}
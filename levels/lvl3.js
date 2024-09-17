
function drawLevel3() {
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

        newEnemyWhenRandomTime(roads[roadNumber-1]);

    });

    if (punpun.yPosition <= 35) {
        punpun.xPosition = (canvasWidth / 2) - (punpun.width / 2);
        punpun.yPosition = canvasHeight-punpun.height;

        roads = [];
        bullets = [];

        punpun.isDead = true;

        isLevelThreePassed = true;
        console.log('ganaste el tercer nivel');
    }
}
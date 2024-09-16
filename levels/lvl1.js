var roads = [];

roads.push(new Road(1, 100, 'right'));
roads.push(new Road(2, 200, 'left'));
roads.push(new Road(3, 400, 'right'));
roads.push(new Road(4, 600, 'right'));
roads.push(new Road(5, 700, 'left'));

roads[0].spawnCar(roads[0].roadDirection)
roads[1].spawnCar(roads[1].roadDirection)
roads[2].spawnCar(roads[2].roadDirection)
roads[3].spawnCar(roads[3].roadDirection)
roads[4].spawnCar(roads[4].roadDirection)

function drawLevel1() {
    
    punpun.drawPlayer();

    roads.forEach(road => {
        road.drawCars();
    });
    
    // cars.forEach(car => {
    //     car.drawCar();
    // });
}

function updateLevel1(){

    roads.forEach(road => {

        let roadNumber = road.number;
        
        road.cars.forEach(car => {
            car.moveCar();

            if(punpun.isColliding(car)){
                console.log('ta chocando');
            }

            if((car.xPosition <= -101 && car.direction == 'left') 
                || (car.xPosition >= canvasWidth + 1 && car.direction == 'right')){
                car.destroyCar();
                let carIndex = road.cars.findIndex(car => car.isDestroyed == true);
                road.cars.splice(carIndex, 1)
                console.log('car #' + carIndex + ' of road #' + roadNumber + ' has being destroy');
            }

        });

    switch(roadNumber){
        case 1:
            newCarWhenDestroy(roads[roadNumber-1]);
            break;
        case 2:
            newCarWhenSpace(roads[roadNumber-1]);
            break;
        case 3:
            newCarWhenTime(roads[roadNumber-1], 3);
            break;
        case 4:
            newCarWhenRandomTime(roads[roadNumber-1]);
            break;
        case 5:
            newCarWhenSpace(roads[roadNumber-1]);
            break;
        default:
            newCarWhenTime(roads[roadNumber-1], 3);
    }

    });
    // cars.forEach(car => {
    //     //moves cars
    //     car.moveCar();

    //     //colliding detection for each
    //     if(punpun.isColliding(car)){
    //         console.log('ta chocando');
    //     }
        
    //     //splice car from the array when no longen on canvas
    //     if((car.xPosition <= -101 && car.direction == 'left') 
    //         || (car.xPosition >= canvasWidth + 1 && car.direction == 'right')){
    //         car.destroyCar();
    //         let carIndex = cars.findIndex(car => car.isDestroyed == true);
    //         cars.splice(carIndex, 1)
    //         console.log('car #' + carIndex + ' has being destroy');
    //     }

    //     //car behavior depends on road number 
    //     switch(car.road){
    //         case 1:
    //             newCarWhenDestroy(car);
    //             break;
    //         case 2:
    //             newCarWhenSpace(car);
    //             break;
    //         case 3:
    //             newCarWhenTime(car, 3);
    //             break;
    //         case 4:
    //             newCarWhenTime(car, 2);
    //             break;
    //         case 5:
    //             newCarWhenSpace(car);
    //             break;
    //         default:
    //             newCarWhenTime(car, 3);
    //     }
    // });

    if (punpun.yPosition <= 70) {
        isLevelOnePassed = true;
        console.log('ganaste el primer nivel');
    }
}
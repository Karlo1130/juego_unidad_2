const canvas = document.getElementById('canvas');
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const ctx = canvas.getContext('2d');

//background image
const bgImage = new Image();
bgImage.src = 'assets/bg/mono.jfif'

//seconds variable
var seconds = 0;

//is in pause variable
var isPaused = false;

//updates per seconds
var UPS = 0;

var isLevelOnePassed = false;
var isLevelTwoPassed = false;
var isLevelThreePassed = false;

var punpun = new Player();

//create a new car in the same road when a car has beign destroy
function newCarWhenDestroy(road){
    if(road.cars.length == 0){
        if(road.roadDirection == 'right'){
            road.cars.push(new Car(-100, road.yPosition, 'right'));
        } else {
            road.cars.push(new Car(canvasWidth, road.yPosition, 'left'));
        }
        console.log('new car created 3');
    }
}

//push a new car in the same road when a car is in the middle
function newCarWhenSpace(road) {

    road.cars.forEach(car => {
        if(car.xPosition == canvasWidth/2){
            if(car.direction == 'right'){
                road.cars.push(new Car(-100, road.yPosition, 'right'));
            } else {
                road.cars.push(new Car(canvasWidth, road.yPosition, 'left'));
            }
            console.log('new car created 1');
        }
    });
}


//push a new car in the same road every n sec
function newCarWhenTime(road, time) {
    if(seconds % time == 0 && UPS == 30 && seconds >= time){
        if(road.roadDirection == 'right'){
            road.cars.push(new Car(-100, road.yPosition, 'right'));
        } else {
            road.cars.push(new Car(canvasWidth, road.yPosition, 'left'));
        }
        console.log('new car created 2');
    }
}


//push a new car in the same road in between 2 and 5 sec
function newCarWhenRandomTime(road) {

    let randomTime = getRandomInt(3, 5)

    if(seconds % randomTime == 0 && UPS == 30 && seconds >= randomTime){
        if(road.roadDirection == 'right'){
            road.cars.push(new Car(-100, road.yPosition, 'right'));
        } else {
            road.cars.push(new Car(canvasWidth, road.yPosition, 'left'));
        }
        console.log(randomTime);
        
        console.log('new car created 4');
    }
}


//get a coord where a car can spawn
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

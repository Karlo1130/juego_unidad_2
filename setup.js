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

var startGame = false;

var punpun = new Player();

var lastPlayerDirection = '';
var bullets = [];

var roads = [];

//create a new enemy in the same road when a car has beign destroy
function newEnemyWhenDestroy(road){
    if(road.enemys.length == 0){
        if(road.roadDirection == 'right'){
            road.enemys.push(new Enemy(-100, road.yPosition, 'right'));
        } else {
            road.enemys.push(new Enemy(canvasWidth, road.yPosition, 'left'));
        }
    }
}

//push a new enemy in the same road when a car is in the middle
function newEnemyWhenSpace(road) {
    road.enemys.forEach(enemy => {
        if(enemy.xPosition == canvasWidth/2){
            if(enemy.direction == 'right'){
                road.enemys.push(new Enemy(-100, road.yPosition, 'right'));
            } else {
                road.enemys.push(new Enemy(canvasWidth, road.yPosition, 'left'));
            }
        }
    });
}


//push a new enemy in the same road every n sec
function newEnemyWhenTime(road, time) {
    if(seconds % time == 0 && UPS == 30 && seconds >= time){
        if(road.roadDirection == 'right'){
            road.enemys.push(new Enemy(-100, road.yPosition, 'right'));
        } else {
            road.enemys.push(new Enemy(canvasWidth, road.yPosition, 'left'));
        }
    }
}

//push a new enemy in the same road in between 2 and 5 sec
function newEnemyWhenRandomTime(road) {

    let randomTime = getRandomInt(3, 5)

    if(seconds % randomTime == 0 && UPS == 30 && seconds >= randomTime){
        if(road.roadDirection == 'right'){
            road.enemys.push(new Enemy(-100, road.yPosition, 'right'));
        } else {
            road.enemys.push(new Enemy(canvasWidth, road.yPosition, 'left'));
        }
    }
}

//get a coord where a enenmy can spawn
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function restartGame(){
    startGame = false;

    isLevelOnePassed = false;
    isLevelTwoPassed = false;
    isLevelThreePassed = false;

    seconds = 0;
    UPS = 0;
    isPaused = false;

    roads = [];
    bullets = [];
    lastPlayerDirection = '';

    punpun = new Player();

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

}
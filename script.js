const canvas = document.getElementById('canvas');
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const ctx = canvas.getContext('2d');

//coords where cars can spawn
const roadSpawnCoords = [];
for (let i = 70; i <= 700; i+=70) {
    roadSpawnCoords.push(i)
}

//background image
const bgImage = new Image();
bgImage.src = 'assets/bg/mono.jfif'

//seconds variable
var seconds = 0;

//is in pause variable
var isPaused = false;

//updates per seconds
var UPS = 0;

var newCarFlag = false;

//is every level passed? you won!!
var isLevelOnePassed = false;
var isLevelTwoPassed = false;
var isLevelThreePassed = false;

//player object
class Player {
    constructor(){
        this.direction = '';

        this.sprite = new Image();
        this.sprite.src = 'assets/player/punpun.png';
        
        this.height = this.sprite.height;
        this.width = this.sprite.width;
        
        this.xPosition = (canvasWidth / 2) - (this.width / 2);
        this.yPosition = canvasHeight-this.height;
        
        this.ySpeed = 7;
        this.xSpeed = 5;

        this.sprite.onload = () => {
            this.drawPlayer();
        };
    }

    drawPlayer(){
        ctx.drawImage(this.sprite, this.xPosition, this.yPosition, this.width, this.height)
    }

    //collision detection
    isColliding(enemy){
        if(this.xPosition < enemy.xPosition + enemy.width 
            && this.xPosition + this.width > enemy.xPosition 
            && this.yPosition < enemy.yPosition + enemy.height 
            && this.yPosition + this.height > enemy.yPosition){  
            return true;
        }
         
        return false;
    }
}

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

//seconds counter
// window.setInterval(function(){
//     seconds++;
// }, 1000);

//player creation
var punpun = new Player();
 
var cars = [];
var isFlipped = false;
// roadSpawnCoords.forEach(roadSpawnCoord => {
//     if(!isFlipped){
//         cars.push(new Car(-100, roadSpawnCoord, 'right'));
//         isFlipped = !isFlipped;
//     } else {
//         cars.push(new Car(canvasWidth, roadSpawnCoord, 'left'));
//         isFlipped = !isFlipped;
//     }
// });

var newCar = new Car(-100, 100, 'right')

//keydown listener
document.addEventListener("keydown", function(e){

    if(punpun.direction == ''){

        switch(e.key){
            case 'a':
                punpun.direction = "left";
                break;
            case 'w':
                punpun.direction = "up";
                break;
            case 'd':
                punpun.direction = "right";
                break;
            case 's':
                punpun.direction = "down";
                break;
            case ' ':
                isPaused = !isPaused;
                break;
        }
    }
})

//keyup listener (movement stop)
document.addEventListener("keyup", function(e){

    if(punpun.direction == 'left' && e.key == 'a'
        || punpun.direction == 'up' && e.key == 'w'
        || punpun.direction == 'right' && e.key == 'd'
        || punpun.direction == 'down' && e.key == 's')
        punpun.direction = "";
})

//recursive draw function
function draw(){

    //bg redraw
    ctx.fillStyle = 'burlywood';
    //ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight);

    punpun.drawPlayer();

    cars.forEach(car => {
        car.drawCar();
    });

    newCar.drawCar();

    ctx.font = '70px Arial'
    ctx.fillText(seconds, 550, 70)

    update();
    requestAnimationFrame(draw);
}

//update function
function update(){

    //is in pause
    if(!isPaused){

        //seconds calculator
        UPS++;
        if(UPS == 60){
            seconds++;
            UPS = 0;
        }

        //position update
        switch(punpun.direction){
            case "left":
                punpun.xPosition -= punpun.xSpeed
                 if(punpun.xPosition < 0)
                    punpun.xPosition += punpun.xSpeed;
                break;
            case "up":
                punpun.yPosition -= punpun.ySpeed
                 if(punpun.yPosition < 0)
                    punpun.yPosition += punpun.ySpeed;
                break;
            case "right":
                punpun.xPosition += punpun.xSpeed
                if(punpun.xPosition > canvasWidth - punpun.width) 
                    punpun.xPosition -= punpun.xSpeed;
                break;
            case "down":
                punpun.yPosition += punpun.ySpeed
                if(punpun.yPosition > canvasHeight - punpun.height)
                    punpun.yPosition -= punpun.ySpeed;
                break;
        }

        newCar.moveCar();
        if (punpun.isColliding(newCar)) {
            console.log('ta chocando');
            
        }

        //newCarWhenSpace(newCar);
        new newCarWhenRandomTime(newCar);

        cars.forEach(car => {
            car.moveCar();
            
            if(punpun.isColliding(car)){
                console.log('ta chocando');
            }
            
            if(car.xPosition <= -101 || car.xPosition >= canvasWidth + 1){
                car.destroyCar();
                let carIndex = cars.findIndex(car => car.isDestroyed == true);
                cars.splice(carIndex, 1)
                console.log('car #' + carIndex + ' has being destroy');
            }

            //newCarWhenDestroy(car);
            //newCarWhenSpace(car);
        });
    }

    if (punpun.yPosition <= 70) {
        isLevelOnePassed = true;
        console.log('ganaste el primer nivel');
    }
    
}

//create a new car in the same road when a car has beign destroy
function newCarWhenDestroy(car){
    if(car.isDestroyed){
        if(car.direction == 'right'){
            cars.push(new Car(-100, car.yPosition, 'right'));
        } else {
            cars.push(new Car(canvasWidth, car.yPosition, 'left'));
        }
        console.log('new car created');
    }
}

//push a new car in the same road when a car is in the middle
function newCarWhenSpace(car) {
    if(car.xPosition == canvasWidth/2){
        if(car.direction == 'right'){
            cars.push(new Car(-100, car.yPosition, 'right'));
        } else {
            cars.push(new Car(canvasWidth, car.yPosition, 'left'));
        }
        console.log('new car created');
    }
}


//push a new car in the same road every 3 sec
function newCarWhenTime(car) {
    if(seconds % 3 == 0 && UPS == 30 && seconds >= 3){
        if(car.direction == 'right'){
            cars.push(new Car(-100, car.yPosition, 'right'));
        } else {
            cars.push(new Car(canvasWidth, car.yPosition, 'left'));
        }
        console.log('new car created');
    }
}

//push a new car in the same road in between 2 and 5 sec
function newCarWhenRandomTime(car) {

    let randomTime = getRandomInt(2, 6)

    console.log(randomTime);
    

    if(seconds % randomTime == 0 && UPS == 30 && seconds >= randomTime){
        if(car.direction == 'right'){
            cars.push(new Car(-100, car.yPosition, 'right'));
        } else {
            cars.push(new Car(canvasWidth, car.yPosition, 'left'));
        }
        console.log('new car created');
    }
}


//get a coord where a car can spawn
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

requestAnimationFrame(draw);
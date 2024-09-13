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

//player object
class Player {
    constructor(){
        this.direction = '';

        this.xPosition = 0;
        this.yPosition = 0;

        this.sprite = new Image();
        this.sprite.src = 'assets/player/punpun.png';

        this.height = this.sprite.height;
        this.width = this.sprite.width;

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
}

//player creation
var punpun = new Player();

var cars = [];
var isFlipped = false;
roadSpawnCoords.forEach(roadSpawnCoord => {
    if(!isFlipped){
        cars.push(new Car(-100, roadSpawnCoord, 'right'));
        isFlipped = !isFlipped;
    } else {
        cars.push(new Car(canvasWidth, roadSpawnCoord, 'left'));
        isFlipped = !isFlipped;
    }
});

//seconds counter
window.setInterval(function(){
    seconds++;
}, 1000);

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

    ctx.font = '70px Arial'
    ctx.fillText(seconds, 550, 70)

    update();
    requestAnimationFrame(draw);
}

//update function
function update(){

    //is in pause
    if(!isPaused){

        //position update
        switch(punpun.direction){
            case "left":
                punpun.xPosition -= punpun.xSpeed
                // if(player.xPosition <= 0)
                //     player.xPosition += 500
                break;
            case "up":
                punpun.yPosition -= punpun.ySpeed
                // if(player.yPosition <= 0)
                //     player.yPosition += 500
                break;
            case direction = "right":
                punpun.xPosition += punpun.xSpeed
                // if(player.xPosition >= 500)
                    // player.xPosition -= 500
                break;
            case direction = "down":
                punpun.yPosition += punpun.ySpeed
                // if(player.yPosition >= 500)
                    // player.yPosition -= 500
                break;
        }
    }
    
    cars.forEach(car => {
        car.moveCar();

        if(punpun.isColliding(car))
            console.log('ta chocando');
    });
}

//get a coord where a car can spawn
function getRandomRoadCoord(){
    let randomNumber = Math.floor(Math.random() * 10);
    return roadSpawnCoords[randomNumber];
}

requestAnimationFrame(draw);
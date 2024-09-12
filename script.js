const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

//player object
class Player {
    constructor(){
        this.direction = '';

        this.xPosition = 0;
        this.yPosition = 0;

        this.sprite = new Image();
        this.sprite.src = 'assets/player/punpun.png';

        this.height = 70;
        this.width = 50;

        this.ySpeed = 7;
        this.xSpeed = 5;

        this.sprite.onload = () => {
            this.drawPlayer();
        };
    }

    drawPlayer(){
        ctx.drawImage(this.sprite, this.xPosition, this.yPosition, this.width, this.height)
    }
}

//player creation
var punpun = new Player();

//is in pause variable
var isPaused = false;

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
    ctx.fillRect(0, 0, 700, 870);

    punpun.drawPlayer();

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
}

requestAnimationFrame(draw);
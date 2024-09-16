
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
    
    if(!isLevelOnePassed){
        drawLevel1();
    }
    
    if (isLevelOnePassed && !isLevelTwoPassed){
        drawLevel2();
    }
    
    if (isLevelTwoPassed && !isLevelThreePassed){
        drawLevel3();
    }
    
    if (isLevelThreePassed){
        
    }

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

        if(!isLevelOnePassed){
            updateLevel1();
        }
        
        if (isLevelOnePassed && !isLevelTwoPassed){
            updateLevel2();
        }
        
        if (isLevelTwoPassed && !isLevelThreePassed){
            updateLevel3();
        }

    }

}

requestAnimationFrame(draw);
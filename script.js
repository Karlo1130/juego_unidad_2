
//keydown listener
document.addEventListener("keydown", function(e){

    if(startGame && !punpun.isDead){

        if(punpun.direction == ''){
    
            switch(e.key){
                case 'a':
                case 'A':
                    punpun.direction = "left";
                    lastPlayerDirection = punpun.direction;
                    break;
                case 'w':
                case 'W':
                    punpun.direction = "up";
                    lastPlayerDirection = punpun.direction;
                    break;
                case 'd':
                case 'D':
                    punpun.direction = "right";
                    lastPlayerDirection = punpun.direction;
                    break;
                case 's':
                case 'S':
                    punpun.direction = "down";
                    lastPlayerDirection = punpun.direction;
                    break;
            }
        }
    
        switch(e.key){
            case ' ':
                bullets.push(new Bullet(punpun.xPosition + (punpun.width / 2), punpun.yPosition + (punpun.height / 2), lastPlayerDirection))
                break;
            case 'Escape':
                isPaused = !isPaused;
                break;
        }
    }

    if (e.key == 'r' || e.key == 'R'){
        restartGame();
    }

})

//keyup listener (movement stop)
document.addEventListener("keyup", function(e){

    if(punpun.direction == 'left' && e.key == 'a'
        || punpun.direction == 'up' && e.key == 'w'
        || punpun.direction == 'right' && e.key == 'd'
        || punpun.direction == 'down' && e.key == 's'){
            punpun.direction = "";
        };

    if(punpun.direction == 'left' && e.key == 'A'
        || punpun.direction == 'up' && e.key == 'W'
        || punpun.direction == 'right' && e.key == 'D'
        || punpun.direction == 'down' && e.key == 'S'){
            punpun.direction = "";
        };
});

//recursive draw function
function draw(){

    //bg redraw
    ctx.fillStyle = 'burlywood';
    //ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight);
    
    ctx.font = '35px Arial'

    if(!isLevelOnePassed && startGame){
        drawLevel1();
        ctx.fillText('NIVEL 1', 35, 30)
    }
    
    if (isLevelOnePassed && !isLevelTwoPassed){
        drawLevel2();
        ctx.fillText('NIVEL 2', 35, 30)
    }
    
    if (isLevelTwoPassed && !isLevelThreePassed){
        drawLevel3();
        ctx.fillText('NIVEL 3', 35, 30)
    }

    if(punpun.isDead && !isLevelThreePassed){
        drawDeathScreen();
    }

    if(isLevelThreePassed){
        drawWinScreen();
    }
    
    if(!startGame){
        drawStartScreen();
    }

    bullets.forEach(bullet => {
        bullet.drawBullet();
    })

    if (isLevelThreePassed){
        
    } else if (startGame && !punpun.isDead){
        ctx.fillStyle = 'red';
        ctx.font = '35px Arial'
        ctx.fillText(seconds, 630, 30)
    }

    update();
    requestAnimationFrame(draw);
}

//update function
function update(){

    if(seconds == 3 && !startGame){
        seconds = 0;
        startGame = true;
    }

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

        bullets.forEach(bullet => {
            bullet.moveBullet();
            
            if(bullet.xPosition < 0){
                bullet.destroyBullet();
                let bulletIndex = bullets.findIndex(bullet => bullet.isDestroyed == true);
                bullets.splice(bulletIndex, 1)
            }

            if(bullet.yPosition < 0){
                bullet.destroyBullet();
                let bulletIndex = bullets.findIndex(bullet => bullet.isDestroyed == true);
                bullets.splice(bulletIndex, 1)
            }

            if(bullet.xPosition > canvasWidth - bullet.width){
                bullet.destroyBullet();
                let bulletIndex = bullets.findIndex(bullet => bullet.isDestroyed == true);
                bullets.splice(bulletIndex, 1)
            } 

            if(bullet.yPosition > canvasHeight - bullet.height){
                bullet.destroyBullet();
                let bulletIndex = bullets.findIndex(bullet => bullet.isDestroyed == true);
                bullets.splice(bulletIndex, 1)
            }

        });

        if (isLevelThreePassed){
        
        }

    }

}

requestAnimationFrame(draw);
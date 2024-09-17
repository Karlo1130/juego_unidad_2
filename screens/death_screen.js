var deathScreenImg = new Image();
deathScreenImg.src = "assets/bg/death_image.png";

function drawDeathScreen(){
    ctx.drawImage(deathScreenImg, 0, 0, deathScreenImg.width, deathScreenImg.height);

    ctx.fillStyle = "red";
    ctx.font = '60px Times New Roman';
    ctx.fillText('YOU DIED', 200, 100);

    ctx.font = '45px Times New Roman';

    ctx.fillText('you will never know the answer', 70, 160);

    ctx.fillText('Unless...', 20, 300);

    ctx.font = '30px Times New Roman';
    ctx.fillText('you press `r` to restart', 20, 340);

}
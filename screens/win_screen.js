var winScreenImg = new Image();
winScreenImg.src = "assets/bg/win_image.png";

function drawWinScreen(){
    ctx.drawImage(winScreenImg, 0, 0, winScreenImg.width, winScreenImg.height);

    ctx.fillStyle = "yellow";
    ctx.font = '60px Times New Roman';
    ctx.fillText('YOU WIN!!', 200, 100);

    ctx.font = '45px Times New Roman';

    ctx.fillText('now you will know the aswer', 70, 160);

    ctx.fillText('the answer was...', 10, 300);

    ctx.font = '28px Times New Roman';
    ctx.fillText('TO CROSS THE ROAD', 10, 340);

    ctx.fillText('if you want to replay', 20, 780);
    ctx.fillText('you have to press `r`', 20, 810);
}
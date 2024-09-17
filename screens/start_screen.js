var startScreenImg = new Image();
startScreenImg.src = "assets/bg/start_image.png";

function drawStartScreen(){
    ctx.drawImage(startScreenImg, 0, 0, startScreenImg.width, startScreenImg.height);

    ctx.fillStyle = "white";
    ctx.font = '60px Times New Roman';
    ctx.fillText('WHY PP WANTED TO', 50, 100);
    ctx.fillText('CROSS THE ROAD?', 70, 160);

    ctx.font = '40px Times New Roman';
    ctx.fillText('THE GAME starts', 20, 300);

    switch(seconds){
        case 0:
            ctx.fillText('in 3', 135, 340);
            break;
        case 1:
            ctx.fillText('in 2', 135, 340);
            break;
        case 2:
            ctx.fillText('in 1', 135, 340);
            break;
    }

}
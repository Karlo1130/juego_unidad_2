//road class
class Road{
    constructor(number, yPosition, roadDirection){
        this.number = number;
        this.yPosition = yPosition;
        this.roadDirection = roadDirection;
        this.cars = [];
    }

    spawnCar(direction){
        if(direction == 'right'){
            this.cars.push(new Car(-100, this.yPosition, 'right'))
        } else {
            this.cars.push(new Car(canvasWidth, this.yPosition, 'left'))
        }
    }

    drawCars(){
        this.cars.forEach(car => {
            car.drawCar();
        });
    }
}
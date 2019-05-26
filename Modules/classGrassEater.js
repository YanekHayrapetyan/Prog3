
let LivingCreature = require("./ClassSuper")
let random = require("./random.js");
module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 5;
        this.remember = 0
      
    }
    //vorpes method

    move() {
        super.move(0, 0, 1);
    }
    eat() {
        super.eat(1, grassArr, 2)
    }
    mul() {
        if(this.energy >= 15 ){
        let newCell = random(super.chooseCell(0, 0, 1));

        if ( newCell) {

            matrix[newCell[1]][newCell[0]] = 2;
            let newGrassEater = new GrassEater(newCell[0], newCell[1], 2);
            grassEaterArr.push(newGrassEater);
            this.energy = 5;
        }
      
    }
    }
    die() {
        if (this.energy <= 0) {
          
            for ( let i in grassEaterArr) {
                if (grassEaterArr[i].y ==this.y && grassEaterArr[i].x== this.x) {
                      matrix[this.y][this.x] = 0
                    grassEaterArr.splice(i, 1);
                }
            }


        }

    }
}





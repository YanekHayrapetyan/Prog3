
var LivingCreature =require("./ClassSuper.js")
var random = require("./random.js");
module.exports =class Grass extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index);
        this.multiply = 0;
        this.remember =0

    }
    mul() {
        this.multiply++;
        if (this.multiply >=5){
        var newCell = random(super.chooseCell(0,0,1));
 this.multiply = 0;
        if (newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], 1);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
           
        }
    }
    }
}


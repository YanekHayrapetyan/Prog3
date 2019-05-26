
var LivingCreature =require("./ClassSuper.js")
var random = require("./random.js");

/////////////////////Beast//////////////////
module.exports =class Beast extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 15;
        this.remember =0
    }

   
    move() {
      super.move(0,0,2)
    }
    eat() {
        super.eat(2,grassEaterArr,3)
    }
    mul() {
        if (this.energy >= 30/wmul ){
            console.log(wmul)
        var newCell = random(super.chooseCell(0,0,1));
        if ( newCell) {
            var newBeast = new Beast(newCell[0], newCell[1], 3);
            BeastArr.push(newBeast);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy =15;
        }
    }
    }
        die() {
            if (this.energy <= 0) {
                for (let i in BeastArr){
                    if (BeastArr[i].x==this.x && BeastArr[i].y==this.y){
                matrix[this.y][this.x] = 0
                BeastArr.splice(i, 1);
                    }
            }
            }
    
        }
    

}










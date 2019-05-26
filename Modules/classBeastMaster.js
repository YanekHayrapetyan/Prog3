//////////////////////// BeastMaster /////////////////////

var LivingCreature =require("./ClassSuper.js")
var Beast=require("./classBeast.js")
var GrassEater=require("./classGrassEater.js")
var random = require("./random.js");

module.exports =class BeastMaster extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 30
        this.pets = 0
        this.t=0

    }
    getpets() {
        var newCell = random(super.chooseCell(3,3,1))
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 0;
         for (var i in BeastArr) {
                if (newX == BeastArr[i].x && newY == BeastArr[i].y) {
                    BeastArr.splice(i, 1);
                   
                }
            }
            var newgret = new GrassEater(newX, newY, 2)
            grassEaterArr.push(newgret)
            matrix[newY][newX] = 2;
            this.pets += 1
        }
    }

    move() {
        super.move(0, 1,3)
    }
    die() {
        if (this.energy <= 0) {
            for (let i in HunterArr){
                if (HunterArr[i].x==this.x && HunterArr[i].y==this.y){
             matrix[this.y][this.x] = this.remember
              BeastMasterArr.splice(i, 1); 
                }
          var newCell = super.chooseCell(2,2,1)
            if (newCell) {
                for (var j in newCell){
    
                var newX = newCell[j][0];
                var newY = newCell[j][1];
                matrix[newY][newX] = 3;
                for (var k in grassEaterArr) {
                    if (newX == grassEaterArr[k].x && newY == grassEaterArr[k].y) {
                        grassEaterArr.splice(k, 1);
                  
                    }
                }
                var newbeast = new Beast(newX, newY, 3)
                BeastArr.push(newbeast)
                this.pets = 0
            }
        }

    }
}       
        }
        }
           
         
           



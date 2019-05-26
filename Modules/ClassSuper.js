
let random = require("./random.js");

module.exports =class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.remember
    }
    getNewCoordinates(count) {
        let arr = []
        this.directions = []
        for (let i = -count; i <= count; i++) {
            for (let j = -count; j <= count; j++) {
                if (j != 0 || i != 0) {
                    arr = [];
                    arr[0] = this.x +i;
                    arr[1] = this.y +j;
                    this.directions.push(arr);
                }
            }
        }
    }
    chooseCell(ch1,ch2,size) {
        this.getNewCoordinates(size)
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch1 || matrix[y][x] == ch2  ) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move(chr1,chr2,size){
        let newCell = random(this.chooseCell(chr1,chr2,size)); 
        if (newCell) {
           
            matrix[this.y][this.x] = this.remember;
                  let newX = newCell[0];
                  let newY = newCell[1];
                  this.remember=matrix[newCell[1]][newCell[0]]
                  matrix[newY][newX] = this.index;
                  this.y = newY;
                  this.x = newX;
                  this.energy--;
              }
}

eat(cell,arr,en) {
    let newCell = random(this.chooseCell(cell,cell,1));
    if (newCell) {
        let newX = newCell[0];
        let newY = newCell[1];
        matrix[this.y][this.x] = this.remember;
       matrix[newY][newX] = this.index;
        for (let i in arr) {
            if (newX == arr[i].x && newY == arr[i].y) {
                arr.splice(i, 1);
              
            }
        }
        this.y = newY;
        this.x = newX;
        this.energy += en;
    }

}

}

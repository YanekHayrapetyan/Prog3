
var random = require("./random.js");
module.exports=class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    //yntruma shrjaka 8 vandakner
    chooseCell() {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 0) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    // bazmanuma azat vandakneri himan vra
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell());

        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
          gb++
          statistics.born.grass++
            this.multiply = 0;

        }
    }
}




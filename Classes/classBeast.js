

/////////////////////Beast//////////////////




class Beast {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 15;
        
    }
    getNewCoordinates() {
      
        var arr=[]
        this.directions=[]
        for (var i=-2;i<=2;i++){
            for (var j=-2;j<=2;j++){
                
                if (j!=0 || i!=0){  
                    arr = [];   
                  arr[0]=this.x+i
                  arr[1]=this.y+j
                  this.directions.push(arr)
                      }
           
      }    
    }
    }
    chooseCell(character) {


        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length  && y >= 0 && y < matrix.length ) {
               
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
              
                }
            }

        }
        return found;
    }



    move() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy--;
        }
        else if(!newCell || this.energy<=0){
            matrix[this.y][this.x] = 0
            for (var i in BeastArr){
         if (this.x == BeastArr[i].x && this.y == BeastArr[i].y){

                BeastArr.splice(i, 1);
                break
            }
        }
        }

    }
    eat() {


        var newCell = random(this.chooseCell(2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 3;
        }

    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 20 && newCell) {
            var newBeast = new Beast(newCell[0], newCell[1], this.index);
            BeastArr.push(newBeast);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 10;
        }
    }

}










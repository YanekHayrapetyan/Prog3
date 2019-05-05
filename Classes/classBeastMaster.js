//////////////////////// BeastMaster /////////////////////
class BeastMaster {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 25;
        this.remember
this.pets=0

    }
    getNewCoordinates(count) {
        
    
        var arr=[]
        this.directions=[]
        ///Ավտոմատ տրված շրջակայքով կոորդինատները որոշող ֆունկցիա///
        for (var i=-count;i<=count;i++){
            for (var j=-count;j<=count;j++){
                if (j!=0 || i!=0){  
                    arr = [];   
                  arr[0]=this.x+i
                  arr[1]=this.y+j
                  this.directions.push(arr)
                      }
        }
    
    }
    ///////////////////////////////////////////////////////////////
}
getpets(){
    var newCell=random(this.chooseCell(3))
if (newCell){
    var newX = newCell[0];
    var newY = newCell[1];

    
    matrix[newY][newX] =0;

    for (var i in BeastArr) {
        if (newX == BeastArr[i].x && newY == BeastArr[i].y) {
            BeastArr.splice(i, 1);
            break;
        }
    }
 var newgret=new GrassEater(newX,newY,2)
grassEaterArr.push(newgret)
matrix[newY][newX] =2;

    this.pets+=1

}
}
    chooseCell(character1,character2) {


        this.getNewCoordinates(3);
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length  && y >= 0 && y < matrix.length ) {
                
                if (matrix[y][x] == character1 || matrix[y][x] == character2 ) {
                    found.push(this.directions[i]);
                  
                }
            }

        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0,1));
       

        if (newCell) {
      matrix[this.y][this.x] = this.remember;
            var newX = newCell[0];
            var newY = newCell[1];
            this.remember=matrix[newCell[1]][newCell[0]]
            
         
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy--;
        }
        else {
            this.die()
        }

    }
    eat() {


        var newCell = random(this.chooseCell(2,2));

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
  
    die(i) {
        if (this.energy <= 0  ) {
            matrix[this.y][this.x] = this.remember
           BeastMasterArr.splice(i, 1);
           var newCell=random(this.chooseCell(2,2))

if (newCell){
    
    var newX = newCell[0];
    var newY = newCell[1];
    matrix[newY][newX] =3;
    for (var i in grassEaterArr) {
        if (newX == grassEaterArr[i].x && newY ==grassEaterArr[i].y) {
            grassEaterArr.splice(i, 1);
            break;
        }
    }
 var newbeast=new Beast(newX,newY,3)
BeastArr.push(newbeast)


    this.pets=0
        }
    }

}

}

var random = require("./random.js");
var Beast=require("./classBeast.js")
module.exports=class Hunter{
   
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 15;
        this.remember
this.killed=0
this.reload=0

    }
    getNewCoordinates(count) {
        var arr=[]
        this.directions=[]
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
}
chooseCell(character1,character2,size) {


    this.getNewCoordinates(size);
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
move(){
    var newCell = random(this.chooseCell(0,1,3));
   

    if (newCell) {
        matrix[this.y][this.x] = this.remember;
        var newX = newCell[0];
        var newY = newCell[1];
       this.remember=matrix[newCell[1]][newCell[0]]
        matrix[newY][newX] = 5;
        this.y = newY;
        this.x = newX;
        this.energy--;
    }
    
        this.leave();

    
 

}
leave(){
    
    for (var i in HunterArr){
        if (HunterArr[i].killed>=10 && this.energy>0){
        if (HunterArr[i].x==this.x && HunterArr.y==this.y){
            matrix[this.y][this.x]=this.remember;
            HunterArr.splice(i,1);
            statistics.dead.hunter++
        }
    }
}
}
kill(){
if (this.reload==0){
    var newCell = random(this.chooseCell(2,3,4)); 
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = this.remember;
           

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    statistics.dead.grasseater++
                    statistics.killed.hunter++
                    break;
                }
            }
            for(var i in BeastArr){
                if (newX==BeastArr[i].x && newY==BeastArr[i].y){
                    BeastArr.splice(i,1);
                    statistics.killed.hunter++
                    statistics.dead.beast++
                    break;

                }
            }
            this.y = newY;
            this.x = newX;
        
           this.killed+=1
           
        } 
       this.reload=3
    }
       
    this.reload-=1
  
    }
    die(i) {
        if (this.energy <= 0  ) {
            matrix[this.y][this.x] = 0
           HunterArr.splice(i, 1);
           statistics.dead.hunter++
           var newCell=this.chooseCell(1,0,1)

if (newCell){
    for (var i in newCell){
    var newX = newCell[i][0];
    var newY = newCell[i][1];     
     for (var i in grassArr) {
        if (newX == grassArr[i].x && newY ==grassArr[i].y) {
            grassArr.splice(i, 1);
            statistics.dead.grass++
            statistics.killed.hunter++
            break;
         }    
        }
        matrix[newY][newX] =0;
var newbeast=new Beast(newX,newY,3)
BeastArr.push(newbeast)
statistics.born.beast++
matrix[newY][newX] =3;
   
    
   
   } 
  } 
 }

}

}


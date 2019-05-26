class Grass {
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
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    // bazmanuma azat vandakneri himan vra
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));

        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}


class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
    }
    //vorpes method
    getNewCoordinates() {
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

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    //qayluma
    move() {

        //yntruma vandak
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


    }
    eat() {


        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;

        }
    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
        }
    }
    die(i) {
        if (this.energy == 0) {
            matrix[this.y][this.x] = 0
            grassEaterArr.splice(i, 1);

        }

    }
}


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


/////////////////////////HUNTER/////////////////////////
class Hunter{
   
        constructor(x, y, index) {
            this.x = x;
            this.y = y;
            this.index = index;
            this.energy = 30;
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
            if (HunterArr[i].killed>=5 && this.energy>0){
            if (HunterArr[i].x==this.x && HunterArr.y==this.y){
                matrix[this.y][this.x]=this.remember;
                HunterArr.splice(i,1);
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
                        break;
                    }
                }
                for(var i in BeastArr){
                    if (newX==BeastArr[i].x && newY==BeastArr[i].y){
                        BeastArr.splice(i,1);
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
               var newCell=this.chooseCell(1,0,1)

    if (newCell){
        for (var i in newCell){
        var newX = newCell[i][0];
        var newY = newCell[i][1];     
         for (var i in grassArr) {
            if (newX == grassArr[i].x && newY ==grassArr[i].y) {
                grassArr.splice(i, 1);
                break;
             }    
            }
            matrix[newY][newX] =0;
    var newbeast=new Beast(newX,newY,3)
    BeastArr.push(newbeast)
    matrix[newY][newX] =3;
       
        
       
       } 
      } 
     }
 
    }
    
}



//////////////////////DESTROYER/////////////////////


class Destroyer{
   
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy =20;
this.points=0
this.timer=30;
this.away=false
 
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
chooseCell(size) {


this.getNewCoordinates(size);
var found = [];
for (var i in this.directions) {
    var x = this.directions[i][0];
    var y = this.directions[i][1];
    if (x >= 0 && x < matrix[0].length  && y >= 0 && y < matrix.length && matrix[y][x]<=9  ) {
    
       
            found.push(this.directions[i]);
     
        
    }

}
return found;
}
move(){
var newCell = random(this.chooseCell(2));
       

        if (newCell && matrix[newCell[1]][newCell[0]]<=9) {
     
            var newX = newCell[0];
            var newY = newCell[1];
   matrix[newY][newX] = 0;
              
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY ==grassArr[i].y) {
                        grassArr.splice(i, 1);
                        this.points-=1;
                        break;
                 }
                }
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        this.points+=4;
                        break;
                    }
                }
                for(var i in BeastArr){
                    if (newX==BeastArr[i].x && newY==BeastArr[i].y){
                        BeastArr.splice(i,1)
                        this.points+=6;
                    break;
                    }
                }
                for(var i in BeastMasterArr){
                    if (newX==BeastMasterArr[i].x && newY==BeastMasterArr[i].y){
                        BeastMasterArr.splice(i,1)
                        this.points+=16;
                    break;
                    }
                }
                for(var i in HunterArr){
                    if (newX==HunterArr[i].x && newY==HunterArr[i].y){
                        HunterArr.splice(i,1);
                        this.points+=20;
                        break;
                    }
                }
              }
  
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.destroy();
            this.energy--;
        
            this.return();

    }

return(){
    if (this.energy<=0){
        matrix[this.y][this.x]=0
        CastleArr[0].points=this.points
        DestroyerArr.splice(0,1)
       
        
    }
}

destroy(){
    var newCell = this.chooseCell(3);


    if (newCell) {
    for (var i in newCell){

        var newX = newCell[i][0];
        var newY = newCell[i][1];
      
        matrix[newY][newX] = 0;
     
       
        for (var i in grassArr) {
            if (newX == grassArr[i].x && newY ==grassArr[i].y) {
                grassArr.splice(i, 1);
                this.points-=1;
                break;
         }
        }
        for (var i in grassEaterArr) {
            if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                this.points+=4;
                break;
            }
        }
        for(var i in BeastArr){
            if (newX==BeastArr[i].x && newY==BeastArr[i].y){
                BeastArr.splice(i,1)
                this.points+=6;
            break;
            }
        }
        for(var i in BeastMasterArr){
            if (newX==BeastMasterArr[i].x && newY==BeastMasterArr[i].y){
                BeastMasterArr.splice(i,1)
                this.points+=16;
            break;
            }
        }
        for(var i in HunterArr){
            if (newX==HunterArr[i].x && newY==HunterArr[i].y){
                HunterArr.splice(i,1);
                this.points+=20;
                break;
            }
        }
      }
}
}
}



//////////////CASTLE/////////////


class Castle{
    constructor(x,y,index)
{
        this.x = x;
        this.y = y;
        this.g=0
        this.index = index;
this.points=0
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
chooseCell(size) {


this.getNewCoordinates(size);
var found = [];
for (var i in this.directions) {
    var x = this.directions[i][0];
    var y = this.directions[i][1];
    if (x >= 0 && x < matrix[0].length  && y >= 0 && y < matrix.length  ) {
        
            found.push(this.directions[i]);
    
        
    }

}
return found;
}
grow(){
    
    if(this.points>=50){
this.g+=Math.floor((this.points/50))
        var newCell = this.chooseCell(this.g);


        if (newCell) {
        for (var i in newCell){
    
            var newX = newCell[i][0];
            var newY = newCell[i][1];
          
            
         
           
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY ==grassArr[i].y) {
                     
                    grassArr.splice(i, 1);
                   matrix[newY][newX]=0  
                    break;
             }
            }
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    matrix[newY][newX]=0 
                    
                    break;
                }
            }
            for(var i in BeastArr){
                if (newX==BeastArr[i].x && newY==BeastArr[i].y){
                    BeastArr.splice(i,1)
                    matrix[newY][newX]=0 
                break;
                }
            }
            for(var i in BeastMasterArr){
                if (newX==BeastMasterArr[i].x && newY==BeastMasterArr[i].y){
                    BeastMasterArr.splice(i,1)
                    matrix[newY][newX]=0 
                break;
                }
            }
            for(var i in HunterArr){
                if (newX==HunterArr[i].x && newY==HunterArr[i].y){
                    HunterArr.splice(i,1);
                    matrix[newY][newX]=0 
                    break;
                }
            }
            matrix[newY][newX] = 10;
          }
    }
    this.points=0
    } 
    else if(this.points<=-50 && this.g>=0) {

        this.points=0
        var newCell = this.chooseCell(this.g);


        if (newCell) {
        for (var i in newCell){
    
            var newX = newCell[i][0];
            var newY = newCell[i][1];
          
            matrix[newY][newX] = 0;

    } 
    }
    this.g-=1
    var newCell = this.chooseCell(this.g);


        if (newCell) {
        for (var i in newCell){
    
            var newX = newCell[i][0];
            var newY = newCell[i][1];
          
            matrix[newY][newX] = 10;

    } 
    }

}

}
}



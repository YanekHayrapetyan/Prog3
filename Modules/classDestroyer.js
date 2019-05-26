
//////////////////////DESTROYER/////////////////////

let random = require("./random.js");

module.exports=class Destroyer{

    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy =10;
    this.points=0
    this.timer=30;
    this.away=false
    
    }
    getNewCoordinates(count) {
    let arr=[]
    this.directions=[]
    for (let i=-count;i<=count;i++){
        for (let j=-count;j<=count;j++){
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
    let found = [];
    for (let i in this.directions) {
    let x = this.directions[i][0];
    let y = this.directions[i][1];
    if (x >= 0 && x < matrix[0].length  && y >= 0 && y < matrix.length && matrix[y][x]<=9  ) {
    
       
            found.push(this.directions[i]);
     
        
    }
    
    }
    return found;
    }
    move(){
        let newCell
        if (weatheris == "Աշուն" || weatheris == "Ձմեռ"){
            newCell = random(this.chooseCell(1));
        }

           else if (weatheris == "Գարուն" || weatheris == "Ամառ")
           {
            newCell = random(this.chooseCell(2));
               }
       
    
        if (newCell && matrix[newCell[1]][newCell[0]]<=9) {
     
            let newX = newCell[0];
            let newY = newCell[1];
    matrix[newY][newX] = 0;
              
                for (let i in grassArr) {
                    if (newX == grassArr[i].x && newY ==grassArr[i].y) {
                        grassArr.splice(i, 1);
                        this.points-=1;
                  
                 }
                }
                for (let i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        this.points+=4;
                        
                    }
                }
                for(let i in BeastArr){
                    if (newX==BeastArr[i].x && newY==BeastArr[i].y){
                        BeastArr.splice(i,1)
                        this.points+=6;
                   
                    }
                }
                for(let i in BeastMasterArr){
                    if (newX==BeastMasterArr[i].x && newY==BeastMasterArr[i].y){
                        BeastMasterArr.splice(i,1)
                        this.points+=16;
                   
                    }
                }
                for(let i in HunterArr){
                    if (newX==HunterArr[i].x && newY==HunterArr[i].y){
                        HunterArr.splice(i,1);
                        this.points+=20;
                       
                    }
                }
            
    
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.destroy();
            this.return()
            this.energy--;
              
          }
          
    
    }
    
    return(){
    if (this.energy<=0){
        matrix[this.y][this.x]=0
        CastleArr[0].points=this.points
        DestroyerArr.splice(0,1)
       
        
    }
    }
    
    destroy(){
    let newCell

        if (weatheris == "Աշուն" || weatheris == "Ձմեռ"){
     newCell = this.chooseCell(2);}
    else if (weatheris == "Գարուն" || weatheris == "Ամառ")
    {
     newCell = this.chooseCell(3);
        }
    if (newCell) {
    for (let i in newCell){
    
        let newX = newCell[i][0];
        let newY = newCell[i][1];
      
       
     
       
        for (let i in grassArr) {
            if (newX == grassArr[i].x && newY ==grassArr[i].y) {
                grassArr.splice(i, 1);
                this.points-=1;
              
         }
        }
        for (let i in grassEaterArr) {
            if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                this.points+=4;
              
            }
        }
        for(let i in BeastArr){
            if (newX==BeastArr[i].x && newY==BeastArr[i].y){
                BeastArr.splice(i,1)
                this.points+=6;
           
            }
        }
        for(let i in BeastMasterArr){
            if (newX==BeastMasterArr[i].x && newY==BeastMasterArr[i].y){
                BeastMasterArr.splice(i,1)
                this.points+=16;
            break;
            }
        }
        for(let i in HunterArr){
            if (newX==HunterArr[i].x && newY==HunterArr[i].y){
                HunterArr.splice(i,1);
                this.points+=20;
                break;
            }
        }
        matrix[newY][newX] = 0;
      }
    }
    
    }
     
    }
    




var matrix = [];
var n =29
// stex zangvacnery verjum Arr barov
var grassArr = [];
var grassEaterArr = [];
var BeastArr=[];
var BeastMasterArr=[];
var HunterArr=[];
var DestroyerArr=[];
var CastleArr=[];
var end=false
var side = 20;
var timer=30
var chance=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,3,4,5]
let castle;
function setup() {
    castle = loadImage('img/Castle.png');
    grassImg = loadImage('img/grass.png')
beastImg=loadImage('img/Beast.png')
grassEaterImg=loadImage('img/grasseater.png')
hunterImg=loadImage('img/hunter.png')
beastmasterImg=loadImage('img/beastmaster.png')
destroyerImg=loadImage('img/destroyer.png')
    frameRate(8);
    
    createCanvas(n* side, n * side);
    background('#000');
//random matrix
    for (var y = 0; y < n; y++) {
        matrix[y]=[]
        for (var x = 0; x < n; x++) {
           matrix[y][x]=chance[Math.floor(random(chance.length))]
        }
    }
/////////////////////CASTLE///////////////
var a=Math.floor(n/2)
var b=Math.floor(n/2)
    matrix[b][a]=10
 var newcastle= new Castle(a,b,10);
CastleArr.push(newcastle);
/////////////////////////////////////////

    matrix[Math.floor(random(n))][Math.floor(random(n))]=6
    console.log(matrix)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x,y,2);
                grassEaterArr.push(et);
                
            }
            else if (matrix[y][x]==3){
                var beast=new Beast(x,y,3);
                BeastArr.push(beast);
            }
            else if (matrix[y][x]==4){
                var beastmaster=new BeastMaster(x,y,4);
                BeastMasterArr.push(beastmaster);
            }
            else if (matrix[y][x]==5){
                var hunter=new Hunter(x,y,5);
               HunterArr.push(hunter);
            }   
            else if (matrix[y][x]==6){
                var newdestroyer=new Destroyer(x,y,6);
               DestroyerArr.push(newdestroyer);
               
        
    
            }   
        

        }
    }
 
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill(150,200,0);
                rect(x * side, y * side, side, side);
                // image(grassImg,x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 2) {
                fill("orange");
                rect(x * side, y * side, side, side);
                image(grassEaterImg,x * side, y * side, side, side)
            }

            else if (matrix[y][x]==3){
                fill("red");
                rect(x * side, y * side, side, side);
                image(beastImg,x * side, y * side, side, side)
            }
            else if (matrix[y][x]==4){
                fill(100,50,130);
                rect(x * side, y * side, side, side);
                image(beastmasterImg,x * side, y * side, side, side)
            }
            else if (matrix[y][x]==5){
                fill("White");
                rect(x * side, y * side, side, side);
                image(hunterImg,x * side, y * side, side, side)
            }
            else if (matrix[y][x]==10){
                fill("darkcyan");
                rect(x * side, y * side, side, side);
                image(castle,x * side, y * side, side, side)
            }
           
            else if (matrix[y][x]==6){
                fill(20,20,20);
                rect(x * side, y * side, side, side);
                image(destroyerImg,x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 0) {
                fill(50,50,50);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x]==undefined){
                matrix[y][x]=0
            }
        }
    }

    
    for (var i in grassArr) {
        grassArr[i].mul();
    }
     for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die(i);
        HunterAppear();
    }
    for (var i in BeastArr) {
          BeastArr[i].move();
        BeastArr[i].eat();
        BeastArr[i].mul();
      
        BeastArr[i].die(i);
        BeastMasterAppear();
    }
    for (var i in BeastMasterArr) {
       

        BeastMasterArr[i].move();
        BeastMasterArr[i].getpets();
        BeastMasterArr[i].die(i);

    }
    for(var i in HunterArr){
        HunterArr[i].move();
        HunterArr[i].kill();
        HunterArr[i].die(i);
    }
 
    for(var i in DestroyerArr){
        
        DestroyerArr[i].move();
     
    }
    if (end==true){
    textSize(n*2);
   fill(255,100,100);
    text("The End!",n*side/10,n*side/2)
    }

  
        
        CastleArr[0].grow();

    
if (DestroyerArr.length==0 && end==false){
timer-=1;
if (timer==0){
   timer=30;
    var x= Math.floor(random(n));
   var y=Math.floor(random(n));
   while(matrix[y][x]>=10 ){
       x=Math.floor(random(n));
       y=Math.floor(random(n));
   }
   
   var newdestroyer=new Destroyer(x,y,6);
   DestroyerArr.push(newdestroyer);
   matrix[y][x]=6;
}
}
 if (grassEaterArr.length==0 && HunterArr.length==0 && BeastArr.length==0 && BeastMasterArr.length==0){
        end=true  ;
    }

}



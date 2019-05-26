

let n = 15
gb=0
matrix = [];
grassArr = [];
grassEaterArr = [];
BeastArr = [];
BeastMasterArr = [];
HunterArr = [];
DestroyerArr = [];
CastleArr = [];
weatheris = "Ձմեռ"
wmul = 0.5
clear=false
let timer = 30
let chance = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,00,0,0,0,0,0,0,0,0,0,
              1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
              2,2,2,2,2,3,3,3]


              statistics = {
                born:{
                    grass:0,
                    grasseater:0,
                    beast:0,
                    beastmaster:0,
                    hunter:0,
                    destroyer:0,
                    castle:0,
                },
                dead:{
                    grass:0,
                    grasseater:0,
                    beast:0,
                    beastmaster:0,
                    hunter:0,
                    destroyer:0,
                    castle:0,
                },
            
                points:{
                   
                    destroyer:0,
                    castle:0,
                },
                stage:{
                    castle:0,
                },
                killed:{
                   
                    grasseater:0,
                    beast:0,
                    beastmaster:0,
                    hunter:0,
                    destroyer:0,
                    castle:0,
                }
                };

let random = require('./Classes/random.js');
let Grass = require("./Classes/classGrass.js")
let GrassEater = require("./Classes/classGrassEater.js")
let Beast = require("./Classes/classBeast.js")
let BeastMaster = require("./Classes/classBeastMaster.js")
let Hunter = require("./Classes/classHunter.js")
let Castle = require("./Classes/classCastle.js")
let Destroyer = require("./Classes/classDestroyer.js")
////////////////MATRIX///////////////////
for (let y = 0; y < n; y++) {
    matrix[y] = []
    for (let x = 0; x < n; x++) {
        matrix[y][x] = chance[Math.floor(random(chance.length - 1))]
    }
}
console.log(matrix)
//! SERVER STUFF  --  START
let fs = require("fs")
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

/////////////////////CASTLE///////////////
let a = Math.floor(n / 2)
let b = Math.floor(n / 2)
matrix[b][a] = 10
let newcastle = new Castle(a, b, 10);
CastleArr.push(newcastle);
statistics.born.castle++
/////////////////////////////////////////

///////////////////CREATING OBJECTS/////////////////
createObjects();

function createObjects() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1 && grassArr.length<=n*n) {
                let gr = new Grass(x, y, 1);
                grassArr.push(gr);
                statistics.born.grass++
            }
            else if (matrix[y][x] == 2 && grassEaterArr.length<=n*n/3) {
                let et = new GrassEater(x, y, 2);
                statistics.born.grasseater++
                grassEaterArr.push(et);

            }
       
            else if (matrix[y][x] == 3 && BeastArr.length<=n*n/3) {
                let beast = new Beast(x, y, 3);
                BeastArr.push(beast);
                statistics.born.beast++
            }
        
            // else if (matrix[y][x] == 4) {
            //     let beastmaster = new BeastMaster(x, y, 4);
            //     BeastMasterArr.push(beastmaster);
            // }
            // else if (matrix[y][x] == 5) {
            //     let hunter = new Hunter(x, y, 5);
            //     HunterArr.push(hunter);
            // }

            else if (matrix[y][x] == undefined) {
                matrix[y][x] = 0
            }



        }
    }
}
///////////////////////////////////////////////////////
let season = 0
weather = ["Ձմեռ", "Գարուն", "Ամառ", "Աշուն"];
function chweather() {
    season++
    if (season <= 20) {
        weatheris = "Ձմեռ"
    }
    else if (season <= 40) {
        weatheris = "Գարուն"
    }
    else if (season <= 60) {
        weatheris = "Ամառ"
    }

    else if (season <= 80) {
        weatheris = "Աշուն"
  }
    else {
        season = 0
    }
}
createObjects()

function game() {
    io.sockets.emit('statistics',statistics);
    chweather();
    createObjects()

    let sendData = {
        matrix: matrix,
        weather: weatheris
    }
    io.sockets.emit("data", sendData);
 
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();
        HunterAppear();
    }
    if(BeastArr){
    for (var i in BeastArr) {
        
        BeastArr[i].eat()
        BeastArr[i].mul();
        
        BeastArr[i].move();
      
        
     
        BeastMasterAppear();
    }
    }
    for (let i in BeastMasterArr) {


        BeastMasterArr[i].move();
        BeastMasterArr[i].getpets();
        BeastMasterArr[i].die(i);

    }
    for (let i in HunterArr) {
        HunterArr[i].move();
        HunterArr[i].kill();
        HunterArr[i].die(i);
    }

if (DestroyerArr.length!=0){
        DestroyerArr[0].move();
    
    }

    CastleArr[0].grow();



    if (DestroyerArr.length == 0 && clear==false) {
        timer -= 1;
        if (timer == 0) {
            timer = 30;
            let x = Math.floor(random(n));
            let y = Math.floor(random(n));
            while (matrix[y][x] ==10) {
                x = Math.floor(random(n));
                y = Math.floor(random(n));
            }
            let newdestroyer = new Destroyer(x, y, 6);
            DestroyerArr.push(newdestroyer);
            matrix[y][x] = 6;
            statistics.born.destroyer++
        }

    }
    io.sockets.emit("Stats",statistics)
    writeStats()

}


setInterval(game, 500)


function writeStats() {
    statistics.ArrLens = [grassArr.length,grassEaterArr.length, BeastArr.length,BeastMasterArr.length,
                          HunterArr.length,DestroyerArr.length,CastleArr.length]
         
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {

    })
}

io.on("connection",function(socket){
socket.on("kill",function(){
statistics.dead.beast+=BeastArr.length
statistics.dead.grass+=grassArr.length
statistics.dead.grasseater+=grassEaterArr.length
statistics.dead.hunter+=HunterArr.length
statistics.dead.beastmaster+=BeastMasterArr.length
statistics.dead.destroyer+=DestroyerArr.length

            grassArr=[]
            grassEaterArr=[]
            BeastArr=[]
            BeastMasterArr=[]
            HunterArr=[]
            DestroyerArr=[]
            CastleArr[0].g=0
            
clear=true
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            
            matrix[y][x] = 0
        
        }
    }
    matrix[a][b]=10
})



    socket.on("pushGrasses",function(){
        let x=Math.floor(random(n))
        let y=Math.floor(random(n))
                while(matrix[y][x]!=0){
                     x=Math.floor(random(n))
                     y=Math.floor(random(n))
                     
                }
                matrix[y][x] = 1
                statistics.born.grass++
        



    })




socket.on("pushGrassEaters",function(){
        let x=Math.floor(random(n))
        let y=Math.floor(random(n))
                while(matrix[y][x]>1){
                     x=Math.floor(random(n))
                     y=Math.floor(random(n))
                     
                }
                matrix[y][x] = 2
            clear=false
            statistics.born.grasseater++



    })
    socket.on("pushBeasts",function(){
        let x=Math.floor(random(n))
        let y=Math.floor(random(n))
                while(matrix[y][x]>2){
                     x=Math.floor(random(n))
                     y=Math.floor(random(n))
                     
                }
                matrix[y][x] = 3
            clear=false
        
            statistics.born.beast++


    })
});






function BeastMasterAppear() {
    if (BeastMasterArr.length < 5 && BeastArr.length >= 5) {
        let x = BeastArr[0].x;
        let y = BeastArr[0].y;
        if (matrix[y][x]!=10){
        BeastArr.shift();
        matrix[y][x] = 0;
        statistics.dead.beast++
        statistics.killed.beastmaster++
        matrix[y][x] = 4;
        let newbeastmaster = new BeastMaster(x, y, 4);
        newbeastmaster.remember = 0
        BeastMasterArr.push(newbeastmaster);
        statistics.born.beastmaster++
    }
}

}
function HunterAppear() {
    if (HunterArr.length < 5 && grassEaterArr.length >= 5) {
        
        let x = grassEaterArr[0].x;
        let y = grassEaterArr[0].y;
        if (matrix[y][x]!=10){
        grassEaterArr.shift();
        matrix[y][x] = 0;

        matrix[y][x] = 5;
        statistics.killed.beast++
statistics.dead.grasseater++
        let newhunter = new Hunter(x, y, 5);
        newhunter.remember = 0
        HunterArr.push(newhunter);
        statistics.born.hunter++
       }
    }
}


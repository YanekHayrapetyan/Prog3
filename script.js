
let socket = io();
let n = 15
let side = 30;
matrix = []
socket.on("data", drawCreatures);


socket.on('Stats', function (statistics) {
    let table = document.getElementById('table_statistics');
    for (let j = 1; j <= 7; j++) {
        table.rows[1].cells[j].innerHTML = statistics.ArrLens[j - 1]

    }
    table.rows[2].cells[1].innerHTML = statistics.dead.grass
    table.rows[2].cells[2].innerHTML = statistics.dead.grasseater
    table.rows[2].cells[3].innerHTML = statistics.dead.beast
    table.rows[2].cells[4].innerHTML = statistics.dead.beastmaster
    table.rows[2].cells[5].innerHTML = statistics.dead.hunter
    table.rows[2].cells[6].innerHTML = statistics.dead.destroyer
    table.rows[2].cells[7].innerHTML = statistics.dead.castle



    table.rows[3].cells[1].innerHTML = statistics.born.grass
    table.rows[3].cells[2].innerHTML = statistics.born.grasseater
    table.rows[3].cells[3].innerHTML = statistics.born.beast
    table.rows[3].cells[4].innerHTML = statistics.born.beastmaster
    table.rows[3].cells[5].innerHTML = statistics.born.hunter
    table.rows[3].cells[6].innerHTML = statistics.born.destroyer


    table.rows[4].cells[1].innerHTML = statistics.killed.grass
    table.rows[4].cells[2].innerHTML = statistics.killed.grasseater
    table.rows[4].cells[3].innerHTML = statistics.killed.beast
    table.rows[4].cells[4].innerHTML = statistics.killed.beastmaster
    table.rows[4].cells[5].innerHTML = statistics.killed.hunter
    table.rows[4].cells[6].innerHTML = statistics.killed.destroyer
    table.rows[4].cells[7].innerHTML = statistics.killed.castle

    table.rows[5].cells[6].innerHTML = statistics.points.destroyer
    table.rows[5].cells[7].innerHTML = statistics.points.castle
    

    table.rows[6].cells[7].innerHTML = statistics.stage.castle
})

function killAll() {
    socket.emit("kill");
}

function pushGrasses() {
    socket.emit('pushGrasses')
}
function pushGrassEaters() {
    socket.emit('pushGrassEaters')
}
function pushGrassEaters() {
    socket.emit('pushGrassEaters')
}
function pushBeasts() {
    socket.emit('pushBeasts')
}
function setup() {


    //////////////////////IMAGES//////////////////
    // castle = loadImage('img/Castle.png');
    // beastImg = loadImage('img/Beast.png')
    // grassEaterImg = loadImage('img/grasseater.png')
    // hunterImg = loadImage('img/hunter.png')
    // beastmasterImg = loadImage('img/beastmaster.png')
    // destroyerImg = loadImage('img/destroyer.png')
    ///////////////////////////////////////////////
    createCanvas(n * side, n * side)
    //! clearing background by setting it to new grey color
    background('#acacac');
}

function drawCreatures(data) {
    matrix = data.matrix
    season = data.weather
    var weatherP = document.getElementById("weather")
    weatherP.innerHTML =season
    console.log(data.weather)
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if (season == "Գարուն") {
                    grcol="RGB(0, 200, 0)";
                    fill(grcol)
                }
                else if (season == "Ամառ") {
                    grcol="RGB(0, 155, 0)";

                    fill(grcol)
                }

                else if (season == "Աշուն") {
                    grcol="RGB(100, 25, 0)";
                    fill(grcol)

                }
                else if (season == "Ձմեռ") {
                    grcol="RGB(200, 200, 240)"
                    fill(grcol)
                }
         fill(grcol)
            }

            else if (matrix[y][x] == 2) {
                if (season == "Գարուն") {
                   gretcol= "RGB(255, 200, 0)";
                   fill(gretcol)
                }
                else if (season == "Ամառ") {
                    gretcol= "RGB(255, 155, 0)"
          
                }

                else if (season == "Աշուն") {
                    gretcol=("orange");
                    
                }
                else if (season == "Ձմեռ") {
                    gretcol= "RGB(255, 100, 0)"
                  
                }
                fill(gretcol)
          
                // image(grassEaterImg, x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 3) {
                if (season == "Գարուն") {
                    bcolor="RGB(255, 0, 0)";

                }
                else if (season == "Ամառ") {
                    
                    bcolor="RGB(200, 20, 0)"
                }

                else if (season == "Աշուն") {
                   
                    bcolor="RGB(200, 45, 0)"
                }
                else if (season == "Ձմեռ") {
                 
                    bcolor="RGB(255, 10, 10)"
                }
                fill(bcolor)
                
                // image(beastImg, x * side, y * side, side, side)
            }

            else if (matrix[y][x] == 4) {
                fill(100, 50, 130);
              
                // image(beastmasterImg, x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 5) {

                if (season == "Գարուն") {
                    hcolor="RGB(200, 255, 200)"
                  

                }
                else if (season == "Ամառ") {
                   
                    hcolor="RGB(150, 255, 150)"
                }

                else if (season == "Աշուն") {
                 
                    hcolor="RGB(255, 255, 150)"
                }
                else if (season == "Ձմեռ") {
                    
                    hcolor="RGB(235, 255, 255)"
                }
                fill(hcolor)
               
                // image(hunterImg, x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 10) {

                if (season == "Գարուն") {
                    ccolor="RGB(0, 175, 175)";

                }
                else if (season == "Ամառ") {
                    ccolor="RGB(10, 150, 150)";
                 
                }

                else if (season == "Աշուն") {
                    ccolor="RGB(20, 100, 100)";
                 
                }
                else if (season == "Ձմեռ") {
                    ccolor="RGB(0, 200, 255)";
                   
                }
                fill(ccolor)
                
                // image(castle, x * side, y * side, side, side)
            }

            else if (matrix[y][x] == 6) {
                fill(0, 0, 0);
            
                // image(destroyerImg, x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 0) {
                fill(50, 50, 50);

            }
            rect(x * side, y * side, side, side);
        }
    }


}





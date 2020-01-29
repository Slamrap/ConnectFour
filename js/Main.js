var start_btn = document.getElementById("start_btn");
var startMenu_div = document.getElementsByClassName("startMenu")[0];
var game_div = document.getElementsByClassName("game")[0];
var endMenu_div = document.getElementsByClassName("endMenu")[0];
var restart_btn = document.getElementById("restart_btn");


window.addEventListener("resize", setDimensions);

window.onload = function(event) {
    startMenu_div.style.display = "flex";
    settings.style.display = "none";
    game_div.style.display = "none";
}

start_btn.onclick = function() {
    game_div.style.display = "block";
    settings.style.display = "none";
    startMenu_div.style.display = "none";
    newGame();
}

restart_btn.onclick = function() {
    location.reload();
}



// game loop
var time_delta, init_time;
//requestAnimationFrame(loop);

// canvas dimensions
var height, width, margin;

var arrows = [];
var board = [];

// game variables
var TURN = "PLAYER";
var PLAY_FIRST = "PLAYER";
var DEPTH = 4;

var GAME_OVER = false;

//piece animation
var endPercent = 101;
var curPerc = 0;
//let speed = 10;

function loop(time_now) {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    // update game loop
    gameTime(time_now);

    if(board.length == 0){
        createBoard();
        if(PLAY_FIRST != "PLAYER"){
            changeTurn();
        }
        drawTurn();
    }


    drawBoard();
    drawHeader();


    // update
    //goComputer(time_delta);

    // draw
    //drawBackground();
    //drawGrid();  board.draw();
    //drawText();

    // call the next frame
    requestAnimationFrame(loop);
}

function gameTime(time_now){
    // initialise init_time (singleton)
    if (!init_time) {
        init_time = time_now;
    }

    // calculate the time difference
    time_delta = (time_now - init_time) / 1000; // seconds
    init_time = time_now;
}

function setDimensions() {
    // height = window.innerHeight  - window.innerHeight/4;
    height = window.innerHeight * 0.75;
    width = window.innerWidth;
    canvas.height = height;
    canvas.width = width;
    margin = MARGIN * Math.min(height, width);

    //canvas background color
    ctx.fillStyle = COLOR_BACKGROUND;
    ctx.fillRect(0, 0, width, height);

    // body background color
    document.body.style.backgroundColor = COLOR_BACKGROUND;
    //document.body.style.backgroundColor = "green";
    if(board.length != 0)
        updateBoardDimentions();
}

function newGame(){
    arrows = [];
    board = [];
    setDimensions();
    requestAnimationFrame(loop);
}

// function newGame(e){
//     var code = e.keyCode;
//     var spacebar = 32;
//     if(code == spacebar){
//         setDimensions();
//         //createBoard();
//         //drawBoard();
//         requestAnimationFrame(loop);
//     }
// }

function changeTurn(){
    if(TURN == "PLAYER"){
        TURN = "PC";
        movePC(PLAY_FIRST);
    }
    else{
        TURN = "PLAYER";
    }
    drawTurn();
}
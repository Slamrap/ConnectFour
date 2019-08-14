// ----  Event Listeners  ----
//canvas.addEventListener("click", click);
//canvas.addEventListener("mousemove", highlightCol);
window.addEventListener("resize", setDimensions);
//window.addEventListener('keydown', newGame);

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
    }

    drawBoard();
    drawHeader();
    // drawTurn();

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
    height = window.innerHeight;
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
}

function newGame(){
    arrows = [];
    board = [];
    hideDiv("startMenu");
    setDimensions();
    showDiv("game", "flex");
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
}


function hideDiv(divName){
    var selected_div = document.getElementsByClassName(divName);
    selected_div[0].style.display = "none";
}

function showDiv(divName, displayMode){
    var selected_div = document.getElementsByClassName(divName);
    selected_div[0].style.display = displayMode;
}

function openSettings(){
    hideDiv("startMenu");
    showDiv("settings", "flex");
}

function closeSettings(){
    hideDiv("settings");
    showDiv("startMenu", "flex");
}
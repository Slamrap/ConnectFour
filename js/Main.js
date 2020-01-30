var start_btn = document.getElementById("start_btn");
var startMenu_div = document.getElementsByClassName("startMenu")[0];
var game_div = document.getElementsByClassName("game")[0];
var endMenu_div = document.getElementsByClassName("endMenu")[0];
var restart_btn = document.getElementById("restart_btn");

// canvas variables
var height, width, margin;
var arrows = [];
var board = [];
var resize = false;

// game variables
var TURN = "";
var GAME_OVER = false;

// Settings
var GAME_MODE = "";
var DEPTH = 0;
var PLAY_FIRST = "";
var ALGORITHM = "";

//piece animation
var endPercent = 101;
var curPerc = 0;

window.addEventListener("resize", setDimensions);

window.onload = function(event) {
    startMenu_div.style.display = "flex";
    settings.style.display = "none";
    game_div.style.display = "none";
    defaultSettings();
    console.log(GAME_MODE);
    console.log(DEPTH);
    console.log(PLAY_FIRST);
    console.log(ALGORITHM);
    console.log(TURN);
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

function gameLoop(){
    if(board.length == 0){
        createBoard();
        if(PLAY_FIRST != "PLAYER"){
            changeTurn();
        }
        drawTurn();
    }
    else if(board.length != 0 && resize){
        updateBoardDimentions();
        resize = false;
    }
    drawBoard();
    drawHeader();
    requestAnimationFrame(gameLoop);
}

function setDimensions() {
    resize = true;
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
    if(board.length != 0)
        updateDimentions();
}

function newGame(){
    arrows = [];
    board = [];
    setDimensions();
    requestAnimationFrame(gameLoop);
}

function updateDimentions(){
    setDimensions();
    requestAnimationFrame(gameLoop);
}

function changeTurn(){
    if(GAME_MODE === "PLAYER_VS_AI"){
        if(TURN == "PLAYER"){
            TURN = "PC";
            movePC(PLAY_FIRST);
        }
        else{
            TURN = "PLAYER";
        }
        drawTurn();
    }
    else{
        if(TURN == "PLAYER1"){
            TURN = "PLAYER2";
        }
        else{
            TURN = "PLAYER1";
        }
        drawTurn();
    }
    
}
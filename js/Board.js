var gameDiv = document.getElementsByClassName("gameBoard");
var canvas = document.createElement("canvas");
gameDiv[0].appendChild(canvas);
var ctx = canvas.getContext("2d");

var animationActive = false;

// ----  Event Listeners  ----
canvas.addEventListener("click", boardClick);
canvas.addEventListener("mousemove", highlightCol);

function gridDimensions(){
    var dimensions = [];
    var add_rows = 1; // for displaying the arrows

    let cell_width, marginX, marginY;
    // portrait
    if ((width - margin * 2) * (GRID_ROWS + add_rows) / GRID_COLS < height - margin * 2) {
        cell_width = (width - margin * 2) / GRID_COLS;
        marginX = margin;
        marginY = (height - cell_width * (GRID_ROWS + add_rows)) / 2;
    }
    // landscape
    else {
        cell_width = (height - margin * 2) / (GRID_ROWS + add_rows);
        marginX = (width - cell_width * GRID_COLS) / 2;
        marginY = margin;
    }
    dimensions[0] = cell_width;
    dimensions[1] = marginX;
    dimensions[2] = marginY;
    return dimensions;
}

function updateBoardDimentions(){
    let dimensions = gridDimensions();
    let cell_width = dimensions[0];
    let marginX = dimensions[1];
    let marginY = dimensions[2];

    // update arrows cell sizes
    for(let i = 0; i < GRID_COLS; i++){
        let new_x = marginX + i * cell_width;
        let new_y = marginY;
        arrows[i].x = new_x;
        arrows[i].y = new_y;
        arrows[i].width = cell_width;
        arrows[i].height = cell_width;
    }

    marginY = marginY + arrows[0].height;
    // update cell sizes
    for (let i = 0; i < GRID_ROWS; i++) {
        for (let j = 0; j < GRID_COLS; j++) {
            let new_x = marginX + j * cell_width;
            let new_y = marginY + i * cell_width;
            board[i][j].x = new_x;
            board[i][j].y = new_y;
            board[i][j].width = cell_width;
            board[i][j].height = cell_width;
        }
    }
}

function createBoard(){
    let dimensions = gridDimensions();
    let cell_width = dimensions[0];
    let marginX = dimensions[1];
    let marginY = dimensions[2];

    // populate arrow
    for(let i = 0; i < GRID_COLS; i++){
        let x = marginX + i * cell_width;
        let y = marginY;
        arrows[i] = new Cell(x, y, i, 0, cell_width, cell_width);
        arrows[i].owner = "ARROW";
    }

    marginY = marginY + arrows[0].height;
    // populate board
    for (let i = 0; i < GRID_ROWS; i++) {
        board[i] = [];
        for (let j = 0; j < GRID_COLS; j++) {
            let x = marginX + j * cell_width;
            let y = marginY + i * cell_width;
            board[i][j] = new Cell(x, y, i, j, cell_width, cell_width);
        }
    }
}

function drawTurn(){
    var turnLabel = document.getElementById("turnLabel");
    turnLabel.textContent = TURN;
}

function drawHeader(){
    let cell = board[0][0];
    let frame_width = cell.width * GRID_COLS;
    let frame_height = cell.height * GRID_ROWS;

    // draw arrows header box
    ctx.fillStyle = COLOR_BACKGROUND;
    ctx.fillRect(arrows[0].x, arrows[0].y, frame_width, arrows[0].height);

    // draw triangle
    for (let arrow of arrows) {
        arrow.draw(ctx);
    }
}

function drawBoard(){
    let cell = board[0][0];
    let frame_width = cell.width * GRID_COLS;
    let frame_height = cell.height * GRID_ROWS;

    // draw board frame
    ctx.fillStyle = COLOR_FRAME;
    ctx.fillRect(cell.x, cell.y, frame_width, frame_height);

    // draw each cell
    for (let row of board) {
        for (let cell of row) {
            cell.draw(ctx);
        }
    }
}

function highlightCol(ev){
    if(!animationActive){
        for (let row of board) {
            for (let cell of row) {
                if(cell.contains(ev.clientX, ev.clientY, arrows[0].y, board[GRID_ROWS-1][GRID_ROWS-1].y + 3*cell.height)){
                    arrows[cell.col].focus = true;
                }
                else{
                    arrows[cell.col].focus = false;
                }
            }
        }
    }
}

function getFocusColumn(x, y){
    for (let row of board) {
        for (let cell of row) {
            if(cell.contains(x, y, arrows[0].y, board[GRID_ROWS-1][GRID_ROWS-1].y + 3*cell.height)){
                return cell.col;
            }
        }
    }
}

function boardClick(ev){
    let column = getFocusColumn(ev.clientX, ev.clientY);
    if(column != null){
        dropPiece(column);
    }
}

function dropPiece(column){
    if(!animationActive){
        for (let i = GRID_ROWS -1; i >= 0; i--) {
            if(board[i][column].owner == null){  
                console.log("turn: " + TURN + " : " + " row: " + i + " col: " + column);
                let cell = board[i][column];
                let x = board[0][cell.col].x + cell.width / 2;
                let y = board[0][cell.col].y + cell.height / 2;
                let r = cell.width * GRID_CIRCLE / 2;
                animationActive = true;
                dropAnimation(cell, x, y, r);
                break;
            }
        } 
    }
}

function dropAnimation(cell, x, y, r){
    let speed = cell.height / 8;
    arrows[cell.col].focus = true;

    drawBoard();
    drawHeader();

    ctx.globalCompositeOperation='destination-over';
    let offset = cell.width/4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);

    var grdRadial = ctx.createRadialGradient(x, y, r, x - offset, y - offset, r - offset);
    if(TURN == "PLAYER" || TURN == "PLAYER1"){
        // dark color
        grdRadial.addColorStop(0, COLOR_PLAYER);
        // light color
        grdRadial.addColorStop(1, COLOR_PLAYER_2);
    }
    else{
        // dark color
        grdRadial.addColorStop(0, COLOR_PC);
        // light color
        grdRadial.addColorStop(1, COLOR_PC_2);
    }
    ctx.fillStyle = grdRadial;
    ctx.fill();
    ctx.closePath();
    ctx.globalCompositeOperation='source-over';

    if(y + cell.height <= cell.y + cell.height + (cell.height / 2)){
        requestAnimationFrame(function () {
            dropAnimation(cell, x, y+speed, r)
        });
    }   
    else{    // animation is over
        cell.owner = TURN;
        cell.drawPiece(ctx);
        gameStatus(board, TURN);
        arrows[cell.col].focus = false;
        animationActive = false;
        if(!GAME_OVER)
            changeTurn();
    }
}

function movePC(PLAY_FIRST){
    //console.log(board);
    let n = new Node(board, "PC", PLAY_FIRST);

    let bestMove = 0;
    if(ALGORITHM === "MINIMAX"){
        bestMove = minimax(n, DEPTH, TURN);
        console.log("minimax-played");
    }
    else{
        bestMove = alpha_beta(n, DEPTH, TURN, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        console.log("alpha_beta-played");
    }
    console.log("best move: " +  bestMove);
    dropPiece(bestMove);
}

function copyBoard(board){
    temp = [];
    for(let i = 0; i < GRID_ROWS; i++){
        temp[i] = [];
        for(let j = 0; j < GRID_COLS; j++){
            let cell = board[i][j];
            let auxCell = new Cell(cell.x, cell.y, cell.row, cell.col, cell.width, cell.height);
            temp[i][j] = Object.assign(auxCell, cell);
        }
    }
    return temp;
}

function gameStatus(status, player){
    if(isGameOver(status, player)) {
        let result = utility(status, player);
        who_Won(result, player);
        GAME_OVER = true;
    }
    else if(checkDraw(status)){
        who_Won(DRAW, player);
        GAME_OVER = true;
    }
}

function who_Won(result, player){
    var endMenu_div = document.getElementsByClassName("endMenu")[0];
    var winner = document.getElementById("Who_Won");
    
    switch (player){
        case "PLAYER":
            if(result == DRAW){
                winner.textContent = "It's a Draw";
                endMenu_div.style.display = "flex";
            }
            else if(result == X_WIN){
                winner.textContent = "PLAYER WON!";
                endMenu_div.style.display = "flex";
            }
            else{
                winner.textContent = "PC WON!";
                endMenu_div.style.display = "flex";
            }
            break;

        case "PC":
            if(result == DRAW){
                winner.textContent = "It's a Draw";
                endMenu_div.style.display = "flex";
            }
            else if(result == O_WIN){
                winner.textContent = "PC WON!";
                endMenu_div.style.display = "flex";
            }
            else{
                winner.textContent = "PLAYER WON!";
                endMenu_div.style.display = "flex";
            }
            break;
        case "PLAYER1":
            if(result == DRAW){
                winner.textContent = "It's a Draw";
                endMenu_div.style.display = "flex";
            }
            else if(result == O_WIN){
                winner.textContent = "PLAYER2 WON!";
                endMenu_div.style.display = "flex";
            }
            else{
                winner.textContent = "PLAYER1 WON!";
                endMenu_div.style.display = "flex";
            }
            break;
        case "PLAYER2":
            if(result == DRAW){
                winner.textContent = "It's a Draw";
                endMenu_div.style.display = "flex";
            }
            else if(result == O_WIN){
                winner.textContent = "PLAYER2 WON!";
                endMenu_div.style.display = "flex";
            }
            else{
                winner.textContent = "PLAYER1 WON!";
                endMenu_div.style.display = "flex";
            }
            break;
    }
}

function checkDraw(state){
    let count = 0;
    for(let i = 0; i < GRID_ROWS; i++){
        for(let j = 0; j < GRID_COLS; j++){
            if(state[i][j].owner != null)
                count++;
        }
    }
    if(count == FULL_BOARD)
        return true;
    else
        return false;
}

function isGameOver(state, player){
    let result = utility(state, player);
    if(result == X_WIN || result == O_WIN)
        return true;
    else
        return false;
}

function utility(state, player){
    if(checkDraw(state))
        return 0;
    else {
        let evalRows = checkRows(state);
        let evalCols = checkCols(state);
        let evalDiagonalRight = checkDiagonalRight(state);
        let evalDiagonalLeft = checkDiagonalLeft(state);

        if(evalRows == X_WIN || evalCols == X_WIN || evalDiagonalRight == X_WIN || evalDiagonalLeft == X_WIN)
            return X_WIN;
        else if(evalRows == O_WIN || evalCols == O_WIN || evalDiagonalRight == O_WIN || evalDiagonalLeft == O_WIN)
            return O_WIN;
        else{
            if(player == "PLAYER" || player == "PLAYER1") //player Bonus of +16 for 'X', -16 for 'O'
                return evalRows + evalCols + evalDiagonalLeft + evalDiagonalRight + 16;
            else
                return evalRows + evalCols + evalDiagonalLeft + evalDiagonalRight - 16;
        }
    }
}

function evalValue(countX, countO){
    if(countX == 1 && countO == 0)
        return 1;
    else if(countX == 2 && countO == 0)
        return 10;
    else if(countX == 3 && countO == 0)
        return 50;
    else if(countX == 0 && countO == 1)
        return -1;
    else if(countX == 0 && countO == 2)
        return -10;
    else if(countX == 0 && countO == 3)
        return -50;
    else
        return 0;
}

function checkRows(state){
    let countX = 0;
    let countO = 0;
    let sum = 0;

    for(let i = 0; i < GRID_ROWS; i++){
        for(let j = 0; j < GRID_COLS - 3; j++){
            for(let k = j; k < j + 4; k++){
                if(state[i][k].owner == "PLAYER" || state[i][k].owner == "PLAYER1")
                    countX++;
                else if(state[i][k].owner == "PC" || state[i][k].owner == "PLAYER2")
                    countO++;
            }
            if(countX == 4)
                return 512;
            else if(countO == 4)
                return -512;

            sum += evalValue(countX, countO);

            countX = 0;
            countO = 0;
        }
    }
    return sum;
}

function checkCols(state){
    let countX = 0;
    let countO = 0;
    let sum = 0;
    
    for(let j = 0; j < GRID_COLS; j++){
        for(let i = 0; i < GRID_ROWS - 3; i++){
            for(let k = i; k < i + 4; k++){
                if(state[k][j].owner == "PLAYER" || state[k][j].owner == "PLAYER1")
                    countX++;
                else if(state[k][j].owner == "PC" || state[k][j].owner == "PLAYER2")
                    countO++;
            }
            if(countX == 4)
                return 512;
            else if(countO == 4)
                return -512;

            sum += evalValue(countX, countO);

            countX = 0;
            countO = 0;
        }
    }
    return sum;
}

function checkDiagonalRight(state){
    let countX = 0;
    let countO = 0;
    let sum = 0;

    for(let i = 3; i < GRID_ROWS; i++){
        let auxIndex = i;
        for(let j = 0; j < GRID_COLS - 3; j++){
            for(let k = j; k < j + 4; k++){
                if(state[auxIndex][k].owner == "PLAYER" || state[auxIndex][k].owner == "PLAYER1")
                    countX++;
                else if(state[auxIndex][k].owner == "PC" || state[auxIndex][k].owner == "PLAYER2")
                    countO++;

                auxIndex--;
            }
            auxIndex = i;

            if(countX == 4)
                return 512;
            else if(countO == 4)
                return -512;

            sum += evalValue(countX, countO);

            countX = 0;
            countO = 0;
        }
    }
    return sum;
}

function checkDiagonalLeft(state){
    let countX = 0;
    let countO = 0;
    let sum = 0;

    for(let i = 3; i < GRID_ROWS; i++){
        let auxIndex = i;
        for(let j = GRID_COLS - 1; j > GRID_COLS - 5; j--){
            for(let k = j; k > j - 4; k--){
                if(state[auxIndex][k].owner == "PLAYER" || state[auxIndex][k].owner == "PLAYER1")
                    countX++;
                else if(state[auxIndex][k].owner == "PC" || state[auxIndex][k].owner == "PLAYER2")
                    countO++;

                auxIndex--;
            }
            auxIndex = i;

            if(countX == 4)
                return 512;
            else if(countO == 4)
                return -512;

            sum += evalValue(countX, countO);

            countX = 0;
            countO = 0;
        }
    }
    return sum;
}
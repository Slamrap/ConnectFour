class Node {
    constructor(state, player, firstPlayer){
        this.state = state;
        this.player = player;
        this.firstPlayer = firstPlayer;
        this.column = null;
    }

    getSuccessors(player){
        let children = [];
        var column;
        for(let j = 0; j < GRID_COLS; j++){
            let tmp_board = copyBoard(this.state);
            for (let i = GRID_ROWS -1; i >= 0; i--) {
                let cell = tmp_board[i][j];
                if(cell.owner == null){  
                    cell.owner = player;
                    column = j;  
                    break;
                }
            } 
            let n = new Node(tmp_board, player, this.firstPlayer);
            n.setColumn(column);
            children.push(n);
        }
        return children;
    }

    getState() {
        return this.state;
    }

    getPlayer(){
        return this.player;
    }

    getFirstPlayer(){
        return this.firstPlayer;
    }

    getColumn(){
        return this.column;
    }

    setColumn(column){
        this.column = column;
    }
}

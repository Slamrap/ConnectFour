var initialNode;


function minimax(node, depth, player){
    initialNode = node;

    var value = Number.MAX_SAFE_INTEGER;
    var bestMove = 0;

    let children = node.getSuccessors("PC");
    for(var child of children){
        var v = maxFunction_MiniMax(child, depth - 1, "PC");
        if(v <= value){
            value = v;
            bestMove = child.getColumn();
        }
    }

    //this.initialNode.setNumTotalNodes(nTotalNodes);
    return bestMove;
}

function minFunction_MiniMax(node, depth, player){
    if(depth == 0 || isGameOver(node.getState(), player) || checkDraw(node.getState()))
        return utility(node.getState(), player);

    var v  = Number.MAX_SAFE_INTEGER;

    let children = node.getSuccessors("PC");
    for(var child of children) {
        v = Math.min(v, maxFunction_MiniMax(child, depth - 1, "PC"));
    }
    return v;
}

function maxFunction_MiniMax(node, depth, player){
    if(depth == 0 || isGameOver(node.getState(), player) || checkDraw(node.getState()))
        return utility(node.getState(), player);

    var v  = Number.MIN_SAFE_INTEGER;

    let children = node.getSuccessors("PLAYER");
    for(var child of children) {
        v = Math.max(v, minFunction_MiniMax(child, depth - 1, "PLAYER"));
    }
    return v;
}
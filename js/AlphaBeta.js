// var initialNode;
// let nTotalNodes = 0;

// function alpha_beta(node, depth, player, alpha, beta){
//     initialNode = node;

//     var value = Number.MAX_SAFE_INTEGER;
//     var bestMove = 0;
//     var v;

//     let children = node.getSuccessors("PC");
//     for(var child of children){
//         v = minFunction_AlphaBeta(child, depth - 1, "PC", alpha, beta);
//         if(v <= value){
//             value = v;
//             bestMove = child.getColumn();

//             if(value >= beta)
//                 break;
//         }
//     }

//     //this.initialNode.setNumTotalNodes(nTotalNodes);
//     return bestMove;
// }

// function minFunction_AlphaBeta(node, depth, player, alpha, beta){
//     if(depth == 0 || isGameOver(node.getState(), player) || checkDraw(node.getState()))
//         return utility(node.getState(), player);

//     var v  = Number.MAX_SAFE_INTEGER;

//     let children = node.getSuccessors("PLAYER");
//     for(var child of children) {
//         v = Math.min(v, minFunction_AlphaBeta(child, depth - 1, "PLAYER", alpha, beta));
//         if (v <= alpha)
//             return v;
//         beta = Math.min(beta, v);
//     }
//     return v;
// }

// function maxFunction_AlphaBeta(node, depth, player, alpha, beta){
//     if(depth == 0 || isGameOver(node.getState(), player) || checkDraw(node.getState()))
//         return utility(node.getState(), player);

//     var v  = Number.MIN_SAFE_INTEGER;

//     let children = node.getSuccessors("PC");
//     for(var child of children) {
//         v = Math.max(v, maxFunction_AlphaBeta(child, depth - 1, "PC", alpha, beta));
//         if (v >= beta)
//             return v;
//         alpha = Math.max(alpha, v);
//     }
//     return v;
// }








var initialNode;


function alpha_beta(node, depth, player, alpha, beta){
    initialNode = node;

    var value = Number.MAX_SAFE_INTEGER;
    var bestMove = 0;
    var v;

    let children = node.getSuccessors("PC");
    for(var child of children){
        v = maxFunction_AlphaBeta(child, depth - 1, "PC", alpha, beta);
        if(v <= value){
            value = v;
            bestMove = child.getColumn();

            if(value >= beta)
                break;
        }
    }

    //this.initialNode.setNumTotalNodes(nTotalNodes);
    return bestMove;
}

function minFunction_AlphaBeta(node, depth, player, alpha, beta){
    if(depth == 0 || isGameOver(node.getState(), player) || checkDraw(node.getState()))
        return utility(node.getState(), player);

    var v  = Number.MAX_SAFE_INTEGER;

    let children = node.getSuccessors("PC");
    for(var child of children) {
        v = Math.min(v, maxFunction_AlphaBeta(child, depth - 1, "PC", alpha, beta));
        if (v <= alpha)
            return v;
        beta = Math.min(beta, v);
    }
    return v;
}

function maxFunction_AlphaBeta(node, depth, player, alpha, beta){
    if(depth == 0 || isGameOver(node.getState(), player) || checkDraw(node.getState()))
        return utility(node.getState(), player);

    var v  = Number.MIN_SAFE_INTEGER;

    let children = node.getSuccessors("PLAYER");
    for(var child of children) {
        v = Math.max(v, minFunction_AlphaBeta(child, depth - 1, "PLAYER", alpha, beta));
        if (v >= beta)
            return v;
        alpha = Math.max(alpha, v);
    }
    return v;
}
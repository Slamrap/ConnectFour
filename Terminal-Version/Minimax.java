/**
 * Class that contains the MINIMAX Algorithm
 */
public class Minimax implements Constants{

    private Node initialNode;
    public int nTotalNodes = 0;

    Minimax(){}

    /**
     * Minimax algorithm
     *
     * @param node current node of the current game board
     * @param depth chosen by the user at the start
     * @param player current player
     * @return the best column for player to play
     */
    public int min_max(Node node, int depth, int player){
        this.initialNode = node;

        int value = Integer.MAX_VALUE;
        int bestMove = 0;

        for(Node child : node.getSuccessors(PC)){
            nTotalNodes++;
            int v = minFunction_MinMax(child, depth - 1, player);
            if(v <= value){
                value = v;
                bestMove = child.getColumn();
            }
        }

        this.initialNode.setNumTotalNodes(nTotalNodes);

        return bestMove;
    }

    /**
     * Auxiliar function of the minimax algorithm, that minimizes the player
     *
     * @param node current node of the current game board
     * @param depth chosen by the user at the start
     * @param player current player
     * @return the node's best utility value
     */
    private int minFunction_MinMax(Node node, int depth, int player){
        if(depth == 0 || node.getState().isGameOver(player) || node.getState().checkDraw())
            return node.getState().utility(player);

        int v  = Integer.MAX_VALUE;

        for(Node child : node.getSuccessors(PLAYER1)) {
            nTotalNodes++;
            v = Math.min(v, maxFunction_MinMax(child, depth - 1, player));
        }

        return v;
    }

    /**
     * Auxiliar function of the minimax algorithm, that maximizes the player
     *
     * @param node current node of the current game board
     * @param depth chosen by the user at the start
     * @param player current player
     * @return the node's best utility value
     */
    private int maxFunction_MinMax(Node node, int depth, int player){
        if(depth == 0 || node.getState().isGameOver(player) || node.getState().checkDraw())
            return node.getState().utility(player);

        int v  = Integer.MIN_VALUE;

        for(Node child : node.getSuccessors(PC)) {
            nTotalNodes++;
            v = Math.max(v, minFunction_MinMax(child, depth - 1, player));
        }

        return v;
    }

}

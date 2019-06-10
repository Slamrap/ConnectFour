import java.util.*;

/**
 * Class that contains the ALPHA-BETA Algorithm
 */
public class AlphaBeta implements Constants{

    private Node initialNode;
    public int nTotalNodes = 0;

    AlphaBeta(){ }

    /**
     * Alpha-beta algorithm
     *
     * @param node current node of the current game board
     * @param depth chosen by the user at the start
     * @param player current player
     * @param alpha value
     * @param beta value
     * @return
     */
    public int alpha_beta(Node node, int depth, int player, int alpha, int beta){
        this.initialNode = node;

        int value = Integer.MAX_VALUE;
        int bestMove = 0;
        int v;

        ArrayList<Node> children = node.getSuccessors(PC);
        for(Node child : children){
            nTotalNodes++;
            v = minFunction_AlphaBeta(child, depth - 1, PC, alpha, beta);
            if(v <= value){
                value = v;
                bestMove = child.getColumn();

                if(value >= beta)
                    break;
            }
        }

        this.initialNode.setNumTotalNodes(nTotalNodes);

        return bestMove;
    }

    /**
     * Auxiliar function of the alpha-beta algorithm, that minimizes the player
     *
     * @param node current node of the current game board
     * @param depth chosen by the user at the start
     * @param player current player
     * @param alpha value
     * @param beta value
     * @return the best column for player to play
     */
    private int minFunction_AlphaBeta(Node node, int depth, int player, int alpha, int beta){
        if(depth == 0 || node.getState().isGameOver(player) || node.getState().checkDraw())
            return node.getState().utility(player);

        int v  = Integer.MAX_VALUE;

        ArrayList<Node> children = node.getSuccessors(PLAYER1);
        for(Node child : children) {
            nTotalNodes++;
            v = Math.min(v, minFunction_AlphaBeta(child, depth - 1, PLAYER1, alpha, beta));
            if (v <= alpha)
                return v;
            beta = Math.min(beta, v);
        }
        return v;
    }

    /**
     * Auxiliar function of the alpha-beta algorithm, that maximizes the player
     *
     * @param node current node of the current game board
     * @param depth chosen by the user at the start
     * @param player current player
     * @param alpha value
     * @param beta value
     * @return the best column for player to play
     */
    private int maxFunction_AlphaBeta(Node node, int depth, int player, int alpha, int beta){
        if(depth == 0 || node.getState().isGameOver(player) || node.getState().checkDraw())
            return node.getState().utility(player);

        int v  = Integer.MIN_VALUE;

        ArrayList<Node> children = node.getSuccessors(PC);
        for(Node child : children) {
            nTotalNodes++;
            v = Math.max(v, maxFunction_AlphaBeta(child, depth - 1, PC, alpha, beta));
            if (v >= beta)
                return v;
            alpha = Math.max(alpha, v);
        }
        return v;
    }

}

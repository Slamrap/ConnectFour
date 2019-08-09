import java.util.ArrayList;

/**
 * Class that represents a node used for the minimax and alpha-beta algorithms
 */
public class Node implements Constants{

    private Board state;
    private int player;
    private int column;
    private int firstPlayer;

    private int numTotalNodes = 0;

    /**
     * Constructor for the first node
     * @param state current game board
     * @param player current player
     * @param firstPlayer playFirstOption chosen by the user at the start
     */
    Node(Board state, int player, int firstPlayer){
        this.state = state;
        this.player = player;
        this.firstPlayer = firstPlayer;
    }

    /**
     * Constructor for all descendants nodes
     * @param state current game board
     * @param column that the current player have played
     * @param player current player
     * @param firstPLayer playFirstOption chosen by the user at the start
     */
    Node(Board state, int column, int player, int firstPLayer){
        this.state = state;
        this.player = player;
        this.column = column;
        this.firstPlayer = firstPLayer;
    }

    /**
     * This method creates all possible moves that a player can make
     *
     * @param player current player
     * @return list of nodes representing all possible moves for the current game board state
     */
    public ArrayList<Node> getSuccessors(int player){
        ArrayList<Node> children = new ArrayList<Node>();

        for(int i = 0; i < WIDTH; i++){
            Board tmp_board = new Board();
            tmp_board.copyBoard(this.state);

            tmp_board.dropPiece(i, player, true);

            Node n = new Node(tmp_board, i, player, this.firstPlayer);

            children.add(n);
        }

        return children;
    }

    /**
     * Calls the algorithm that the user has chosen at the start of the program,
     *
     * @param n initial node
     * @param depth chosen by the user at the start
     * @param algorithm chosen by the user at the start
     * @param player current player
     * @return the best column for player to play
     */
    public int findBestMove(Node n, int depth, int algorithm, int player){
        if(algorithm == 1) { //minimax
            Minimax m = new Minimax();
            return m.min_max(n, depth, player);
        }
        else{                //alpha-beta
            AlphaBeta a = new AlphaBeta();
            return a.alpha_beta(n, depth, player, Integer.MIN_VALUE, Integer.MAX_VALUE);
        }
    }

    /**
     * Used to get the node's game board
     *
     * @return game board object
     */
    public Board getState() {
        return this.state;
    }

    /**
     * Used to get the node's player
     *
     * @return node's player
     */
    public int getPlayer(){
        return this.player;
    }

    /**
     * Used to get the node's firstPlayer
     *
     * @return node's firstPlayer
     */
    public int getFirstPlayer(){
        return this.firstPlayer;
    }

    /**
     * Used to get the node's column
     *
     * @return node's column
     */
    public int getColumn(){
        return this.column;
    }

    /**
     * Used to get the node's numTotalNodes
     *
     * @return numTotalNodes
     */
    public int getNumTotalNodes(){
        return numTotalNodes;
    }

    /**
     * Used to set the node's column
     *
     * @param column
     */
    public void setColumn(int column){
        this.column = column;
    }

    /**
     * Used to set the node's numTotalNodes
     *
     * @param value to atribute to numTotalNodes
     */
    public void setNumTotalNodes(int value) { this.numTotalNodes = value;}

}

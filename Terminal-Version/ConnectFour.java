import java.util.*;

public class ConnectFour implements Constants{

    private static boolean GAME_OVER = false;

    private static int numTotalNodes = 0;

    /**
     * This method prints the game winner based on the result of the game
     *
     * @param result of the utility function for the final state of the game board
     * @param player who as won
     * @param board current game board
     */
    public static void who_Won(int result, int player, Board board){
        System.out.println("===============Game Over===============");
        System.out.println();

        board.printBoard();

        switch (player){
            case PLAYER1:
                if(result == DRAW)
                    System.out.println("It's a Draw");
                else if(result == X_WIN)
                    System.out.println("Player1 Won!");
                else
                    System.out.println("Player2 Won!");
                break;

            case PLAYER2:
                if(result == DRAW)
                    System.out.println("It's a Draw");
                else if(result == O_WIN)
                    System.out.println("Player2 Won!");
                else
                    System.out.println("Player1 Won!");
                break;
            case PC:
                if(result == DRAW)
                    System.out.println("It's a Draw");
                else if(result == O_WIN)
                    System.out.println("PC Won!");
                else
                    System.out.println("Player1 Won!");
                break;
        }
    }

    /**
     * This method represents a play by the Player1 or Player2
     *
     * @param stdin for user input
     * @param player turn of the current player
     * @param board current game board
     * @param playFirstOption chosen by the user at the start
     */
    public static void playerTurn(Scanner stdin, int player, Board board, int playFirstOption){
        if(player == PLAYER1)
            System.out.println("==============Player1 Turn=============");
        else
            System.out.println("==============Player2 Turn=============");
        System.out.println();

        board.printBoard();
        System.out.println();
        System.out.println("Press ? for the best move");
        System.out.print("Choose a column: ");
        String column = stdin.next();
        System.out.println();

        int col;

        if(column.equals("?")) {
            System.out.printf("Chosing best move...");
            System.out.println();

            Node n = new Node(board, PC, playFirstOption);

            col = n.findBestMove(n, MEDIUM_DIFFICULTY, ALPHA_BETA, PC);

            System.out.println("Best column to play is: " + col);
            System.out.println();

            System.out.print("Choose a column: ");
            column = stdin.next();
            System.out.println();

            col = Integer.parseInt(column);

            board.dropPiece(col, player, false);

            if(board.isGameOver(player)) {
                System.out.println("=======================================");
                System.out.println();
                System.out.println();

                int result = board.utility(player);
                who_Won(result, player, board);
                GAME_OVER = true;
            }
            else if(board.checkDraw()){
                System.out.println("=======================================");
                System.out.println();
                System.out.println();

                who_Won(DRAW, player, board);
                GAME_OVER = true;
            }
        }
        else{
            col = Integer.parseInt(column);

            board.dropPiece(col, player, false);

            if(board.isGameOver(player)) {
                System.out.println("=======================================");
                System.out.println();
                System.out.println();

                int result = board.utility(player);
                who_Won(result, player, board);
                GAME_OVER = true;
            }
            else if(board.checkDraw()){
                System.out.println("=======================================");
                System.out.println();
                System.out.println();

                who_Won(DRAW, player, board);
                GAME_OVER = true;
            }

        }

        System.out.println("=======================================");
        System.out.println();
        System.out.println();
    }

    /**
     * This method represents a play by the PC
     *
     * @param board current game board
     * @param algorithm chosen by the user at the start
     * @param difficulty chosen by the user at the start
     * @param playFirstOption chosen by the user at the start
     */
    public static void pcTurn(Board board,  int algorithm, int difficulty, int playFirstOption){
        System.out.println("================PC Turn================");

        Node n = new Node(board, PC, playFirstOption);
        int bestMove = 0;

        long startTime = System.nanoTime();

        bestMove = n.findBestMove(n, difficulty, algorithm, PC);

        board.dropPiece(bestMove, PC, true);
        board.printBoard();

        long estimatedTime = System.nanoTime() - startTime;
        double timeInSeconds = (double) estimatedTime / 1000000000.0;

        System.out.println("PC chose column: " + bestMove);

        System.out.printf("Movement took: %.4f seconds\n", timeInSeconds);

        numTotalNodes += n.getNumTotalNodes();
        System.out.println("Nº nodes generated: " + numTotalNodes);
        System.out.println();

        if(board.isGameOver(PC) || board.isGameOver(PLAYER1)) {
            System.out.println("=======================================");
            System.out.println();
            System.out.println();

            int result = board.utility(PC);
            who_Won(result, PC, board);
            GAME_OVER = true;
        }
        else if(board.checkDraw()){
            System.out.println("=======================================");
            System.out.println();
            System.out.println();

            who_Won(DRAW, PC, board);
            GAME_OVER = true;
        }
        System.out.println("=======================================");
        System.out.println();
        System.out.println();
    }

    /**
     * This method starts the Player vs Player mode
     *
     * @param stdin for user input
     * @param initialBoard empty board
     * @param playFirstOption who plays first
     */
    public static void player_VS_player(Scanner stdin, Board initialBoard, int playFirstOption){
        boolean player1Turn = false;

        if(playFirstOption == 1)
            player1Turn = true;

        System.out.println("Player1 is 'X' and Player2 is 'O'");
        System.out.println();

        while(true){
            if(player1Turn){
                playerTurn(stdin, PLAYER1, initialBoard, playFirstOption);
                if(GAME_OVER)
                    break;
                player1Turn = false;
            }
            else{
                playerTurn(stdin, PLAYER2, initialBoard, playFirstOption);
                if(GAME_OVER)
                    break;
                player1Turn = true;
            }
        }

    }

    /**
     * This method starts the Player vs PC mode
     *
     * @param stdin for user input
     * @param initialBoard empty board
     * @param playFirstOption who plays first
     * @param algorithm which algorithm to use
     * @param difficulty which difficulty/depth to use
     */
    public static void player_VS_pc(Scanner stdin, Board initialBoard, int playFirstOption, int algorithm, int difficulty){
        boolean player1Turn = false;

        if(playFirstOption == 1)
            player1Turn = true;

        System.out.println("Player1 is 'X' and PC is 'O'");
        System.out.println();

        while(true){
            if(player1Turn){
                playerTurn(stdin, PLAYER1, initialBoard, playFirstOption);
                if(GAME_OVER)
                    break;
                player1Turn = false;
            }
            else{
                pcTurn(initialBoard, algorithm, difficulty, playFirstOption);
                if(GAME_OVER)
                    break;
                player1Turn = true;
            }
        }
    }

    /**
     * Menu for choosing which difficulty the user wants to face
     *
     * <br>Easy - Depth 4<br/>
     * Medium - Depth 6
     * <br>Hard - Depth 8<br/>
     *
     * @param stdin for user input
     * @return option - chosen by user
     */
    public static int difficultyMenu(Scanner stdin){
        System.out.println("+-----------------------+");
        System.out.println("|                       |");
        System.out.println("|       Difficulty      |");
        System.out.println("|                       |");
        System.out.println("+-----------------------+");
        System.out.println("|  1. Easy (Depth: 4)   |");
        System.out.println("+-----------------------+");
        System.out.println("|  2. Medium (Depth: 6) |");
        System.out.println("+-----------------------+");
        System.out.println("|  3. Hard (Depth: 8)   |");
        System.out.println("+-----------------------+");

        System.out.print("Select one of the options above [1-3]: ");

        int option = stdin.nextInt();

        if(option == 1)
            option = 4;
        else if(option == 2)
            option = 6;
        else if(option == 3)
            option = 8;

        System.out.println();
        System.out.println();

        return option;
    }

    /**
     * Menu for choosing who plays first
     *
     * <br>In Player vs Player:<br/>
     * Option 1 - Player1
     * <br>Option 2 - Player2<br/>
     *
     * <br>In Player vs PC:<br/>
     * Option 1 - Player1
     * <br>Option 2 - PC<br/>
     *
     * @param stdin for user input
     * @return option - chosen by user
     */
    public static int playsFirstMenu(Scanner stdin, int mode){
        if (mode == 1) {
            System.out.println("+---------------------+");
            System.out.println("|                     |");
            System.out.println("|   Who plays first   |");
            System.out.println("|                     |");
            System.out.println("+---------------------+");
            System.out.println("|     1. Player1      |");
            System.out.println("+---------------------+");
            System.out.println("|     2. Player2      |");
            System.out.println("+---------------------+");

            System.out.print("Select one of the options above [1-2]: ");

            int option = stdin.nextInt();

            System.out.println();
            System.out.println();

            return option;
        }
        else {
            System.out.println("+---------------------+");
            System.out.println("|                     |");
            System.out.println("|   Who plays first   |");
            System.out.println("|                     |");
            System.out.println("+---------------------+");
            System.out.println("|     1. Player1      |");
            System.out.println("+---------------------+");
            System.out.println("|     2. PC           |");
            System.out.println("+---------------------+");

            System.out.print("Select one of the options above [1-2]: ");

            int option = stdin.nextInt();

            System.out.println();
            System.out.println();

            if(option == 2)
                option = PC;

            return option;
        }

    }

    /**
     * Menu for choosing which game mode to use
     *
     * <br>Option 1 - Player vs Player<br/>
     * Option 2 - Player vs PC
     *
     * @param stdin for user input
     * @return option - chosen by user
     */
    public static int gameModesMenu(Scanner stdin){
        System.out.println("+-------------------------+");
        System.out.println("|                         |");
        System.out.println("|        Game Modes       |");
        System.out.println("|                         |");
        System.out.println("+-------------------------+");
        System.out.println("|   1. Player vs Player   |");
        System.out.println("+-------------------------+");
        System.out.println("|   2. Player vs PC       |");
        System.out.println("+-------------------------+");

        System.out.print("Select one of the options above [1-2]: ");

        int option = stdin.nextInt();

        System.out.println();
        System.out.println();

        return option;
    }

    /**
     * Menu for choosing which algorithm to use
     *
     * <br>Option 1 - Minimax<br/>
     * Option 2 - Alpha-Beta
     *
     * @param stdin for user input
     * @return option - chosen by user
     */
    public static int algorithmsMenu(Scanner stdin){
        System.out.println("+---------------------+");
        System.out.println("|                     |");
        System.out.println("|      Algorithms     |");
        System.out.println("|                     |");
        System.out.println("+---------------------+");
        System.out.println("|     1. Minimax      |");
        System.out.println("+---------------------+");
        System.out.println("|     2. Alpha-Beta   |");
        System.out.println("+---------------------+");

        System.out.print("Select one of the options above [1-2]: ");

        int option = stdin.nextInt();

        System.out.println();
        System.out.println();

        return option;

    }

    /**
     * Menu for dealing with user input
     */
    public static void menu(){
        System.out.println("+-------------------------------------+");
        System.out.println("|                                     |");
        System.out.println("|       Welcome to Connect Four       |");
        System.out.println("|                                     |");
        System.out.println("+-------------------------------------+");
        System.out.println();


        Scanner stdin = new Scanner(System.in);

        int gameModeOption = gameModesMenu(stdin);
        int algorithmsOption;
        int playFirstOption;
        int difficultyOption;

        Board initialBoard = new Board();

        switch (gameModeOption){
            case 1:    //player vs player
                playFirstOption = playsFirstMenu(stdin, gameModeOption);

                player_VS_player(stdin, initialBoard, playFirstOption);
                break;

            case 2:   //player vs pc
                algorithmsOption = algorithmsMenu(stdin);
                difficultyOption = difficultyMenu(stdin);
                playFirstOption = playsFirstMenu(stdin, gameModeOption);

                player_VS_pc(stdin, initialBoard, playFirstOption, algorithmsOption, difficultyOption);
                break;

            default:
                System.out.println("Please select one of the options above");
        }
    }

    /**
     * Main method - starts the game
     * @param args
     */
    public static void main(String[] args) {

        menu();

    }
}

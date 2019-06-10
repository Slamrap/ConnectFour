/**
 * Class that represents the game board
 */
public class Board implements Constants{

    private char[][] gameBoard;

    /**
     * class constructor
     */
    Board(){
        this.gameBoard = new char[HEIGHT][WIDTH];

        initializeBoard();
    }

    /**
     * Initialize the game board with only one space in each position
     */
    private void initializeBoard(){
        for(int i = 0; i < HEIGHT; i++){
            for(int j = 0; j < WIDTH; j++){
                this.gameBoard[i][j] = ' ';
            }
        }
    }

    /**
     * Gets the matrix containing the game board
     * @return matrix of the game board
     */
    public char[][] getGameBoard(){
        return this.gameBoard;
    }

    /**
     * Checks if a move is valid or not
     *
     * @param column in which we want to play
     * @param player current player's turn
     * @param AI True - if player is PC | False if player is Player1 or Player2
     * @return True/False if move is valid or not respectively
     */
    public boolean isValidMove(int column, int player, boolean AI){
        if(!AI) {
            if ((column < 0 || column > HEIGHT) && player != PC) {
                System.out.println("Invalid column!, Please choose a number between 0 and 6");
                return false;
            } else if (this.gameBoard[0][column] != ' ' && player != PC) {
                System.out.println("Column " + column + " is full!");
                return false;
            } else
                return true;
        }
        else{
            if ((column < 0 || column > HEIGHT) && player != PC)
                return false;
            else if (this.gameBoard[0][column] != ' ' && player != PC)
                return false;
            else
                return true;
        }
    }

    /**
     * Plays the piece in the game board if the move is valid
     *
     * @param column in which we want to play
     * @param player current player's turn
     * @param AI True - if player is PC | False if player is Player1 or Player2
     */
    public void dropPiece(int column, int player, boolean AI){
        if(isValidMove(column, player, AI)){
            for(int i = HEIGHT - 1; i >= 0; i--) {
                if (this.gameBoard[i][column] == ' ') {
                    if(player == PLAYER1) {
                        this.gameBoard[i][column] = 'X';
                        break;
                    }
                    else{
                        this.gameBoard[i][column] = 'O';
                        break;
                    }

                }
            }
        }
    }

    /**
     * Prints the matrix of the game board
     */
    public void printBoard(){
        System.out.println("  0   1   2   3   4   5   6");
        System.out.println(" ___________________________");
        for(int i = 0; i < HEIGHT; i++){
            System.out.print("| ");

            for(int j = 0; j < WIDTH; j++){
                System.out.print(this.gameBoard[i][j] + " | ");
            }

            System.out.println();
            if(i < HEIGHT - 1)
                System.out.println("|---+---+---+---+---+---+---|");

        }
        System.out.println(" ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾");
    }

    /**
     * Copies the matrix of board to the current object's matrix
     * @param board that we want to get the copy
     */
    public void copyBoard(Board board){
        for(int i = 0; i < HEIGHT; i++){
            for(int j = 0; j < WIDTH; j++){
                this.gameBoard[i][j] = board.gameBoard[i][j];
            }
        }
    }

    /**
     * Checks if the current game board is a draw
     * @return true/false if the current game board is a draw or not
     */
    public boolean checkDraw(){
        int count = 0;
        for(int i = 0; i < HEIGHT; i++){
            for(int j = 0; j < WIDTH; j++){
                if(this.gameBoard[i][j] != ' ')
                    count++;
            }
        }

        if(count == FULL_BOARD)
            return true;
        else
            return false;
    }

    /**
     * Checks if the game is over, by checking the result of the utility function
     * @param player current player
     * @return true/false if the game is over or not
     */
    public boolean isGameOver(int player){
        int result = utility(player);
        if(result == X_WIN || result == O_WIN)
            return true;
        else
            return false;
    }

    /**
     * Utility function that evaluates the game board points
     * @param player
     * @return 0 if it's a draw, 512 if player1 won, -512 if player2 or PC won,
     * or sum of the evaluation functions
     * for rows, cols, diagonal right and diagonal left
     */
    public int utility(int player){
        if(checkDraw())
            return 0;
        else {
            int evalRows = checkRows(player);
            int evalCols = checkCols(player);
            int evalDiagonalRight = checkDiagonalRight(player);
            int evalDiagonalLeft = checkDiagonalLeft(player);

            if(evalRows == X_WIN || evalCols == X_WIN || evalDiagonalRight == X_WIN || evalDiagonalLeft == X_WIN)
                return X_WIN;
            else if(evalRows == O_WIN || evalCols == O_WIN || evalDiagonalRight == O_WIN || evalDiagonalLeft == O_WIN)
                return O_WIN;
            else{
                if(player == PLAYER1) //player Bonus of +16 for 'X', -16 for 'O'
                    return evalRows + evalCols + evalDiagonalLeft + evalDiagonalRight + 16;
                else
                    return evalRows + evalCols + evalDiagonalLeft + evalDiagonalRight - 16;
            }
        }
    }

    /**
     * This method is used for evaluate the game board, giving it
     * a value, based on the number of 'X' and 'O'
     *
     * @param countX number of 'X' in the game board for rows, cols and diagonals
     * @param countO number of 'O' in the game board for rows, cols and diagonals
     * @return the points based on the number of 'X' and 'O'
     */
    private int evalValue(int countX, int countO){
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

    /**
     * Counts the number of 'X' and 'O' in a row on the game board
     * and returns the sum based on the evaluateValue method.
     * @param player current player
     * @return sum of the evaluateValue for which row in the game board
     */
    private int checkRows(int player){
        int countX = 0;
        int countO = 0;
        int sum = 0;

        for(int i = 0; i < HEIGHT; i++){
            for(int j = 0; j < WIDTH - 3; j++){
                for(int k = j; k < j + 4; k++){
                    if(this.gameBoard[i][k] == 'X')
                        countX++;
                    else if(this.gameBoard[i][k] == 'O')
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

    /**
     * Counts the number of 'X' and 'O' in a col on the game board
     * and returns the sum based on the evaluateValue method.
     * @param player current player
     * @return sum of the evaluateValue for which col in the game board
     */
    private int checkCols(int player){
        int countX = 0;
        int countO = 0;
        int sum = 0;

        for(int j = 0; j < WIDTH; j++){
            for(int i = 0; i < HEIGHT - 3; i++){
                for(int k = i; k < i + 4; k++){
                    if(this.gameBoard[k][j] == 'X')
                        countX++;
                    else if(this.gameBoard[k][j] == 'O')
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

    /**
     * Counts the number of 'X' and 'O' in a right diagonal on the game board
     * and returns the sum based on the evaluateValue method.
     * @param player current player
     * @return sum of the evaluateValue for which right diagonal in the game board
     */
    private int checkDiagonalRight(int player){
        int countX = 0;
        int countO = 0;
        int sum = 0;

        for(int i = 3; i < HEIGHT; i++){
            int auxIndex = i;
            for(int j = 0; j < WIDTH - 3; j++){
                for(int k = j; k < j + 4; k++){
                    if(this.gameBoard[auxIndex][k] == 'X')
                        countX++;
                    else if(this.gameBoard[auxIndex][k] == 'O')
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

    /**
     * Counts the number of 'X' and 'O' in a left diagonal on the game board
     * and returns the sum based on the evaluateValue method.
     * @param player current player
     * @return sum of the evaluateValue for which left diagonal in the game board
     */
    private int checkDiagonalLeft(int player){
        int countX = 0;
        int countO = 0;
        int sum = 0;

        for(int i = 3; i < HEIGHT; i++){
            int auxIndex = i;
            for(int j = WIDTH -1; j > WIDTH - 5; j--){
                for(int k = j; k > j - 4; k--){
                    if(this.gameBoard[auxIndex][k] == 'X')
                        countX++;
                    else if(this.gameBoard[auxIndex][k] == 'O')
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

}

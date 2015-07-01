/**
 * two main playing strategies: player vs player and player vs computer
 * Both implementing play method, which is called in game object
 * as a reaction on player choice
 */

/**
 * Player vs player strategy. is easy, everything is triggered by player choice
 */
var TwoHumansStrategy = function(){
    var currentPlayerIndex = 0;
    var players = [new HumanPlayer('X'), new HumanPlayer('O')];

    /**
     * Main method of every strategy
     * checks if player can play, catches Exceptions and urn them
     * to result
     * @param board
     * @param index
     * @returns {*[]}
     */
    this.play = function(board, index){
        var player = players[currentPlayerIndex], gameOver = false;
        try {
            player.play(board, index);
            currentPlayerIndex = (currentPlayerIndex + 1) % 2;
        } catch (exc) {
            gameOver = exc.status;
        }
        return [{"gameOver": gameOver, "iconSet": {'index': index, 'icon': player.icon}}];
    };
};
/**
 * player vs computer strategy
 * Player has always first move, after player choice computer choice is generated
 */
var AIvsHumanStrategy = function(){
    var humanPlayer = new HumanPlayer("X");
    var aiPlayer = new AIPlayer("O");

    this.play = function(board, index){
        var result = [], gameOver = false, gameOver2 = false;
        try {
            humanPlayer.play(board, index);
        } catch (exc) {
            gameOver = exc.status;
        }
        result.push({"gameOver": gameOver, "iconSet": {'index': index, 'icon': humanPlayer.icon}})
        try {
            aiPlayer.play(board);
        } catch (exc) {
            gameOver2 = exc.status;
        }
        result.push({"gameOver": gameOver2, "iconSet": {'index': aiPlayer.getLastIndex(), 'icon': aiPlayer.icon}});
        return result;
    };
};

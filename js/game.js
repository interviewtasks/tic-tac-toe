/**
 * main game functionality
 */
/**
 * game object
 */
var Game = function(){
    var turns = 0, player1 = new HumanPlayer(), player2, activePlayer = player1,
        gameArray = Array.apply(null, {length: 9}).map(function(){ return 0;}),
        gameStrategy, view = new View(), x = "X", o = "O";

    /**
     * This method is used as a callback for user choice - playing
     * with other human player or with computer
     * @param e - event
     */
    this.setup = function(e){
        e.preventDefault();
        e.stopPropagation();
        var player2Type = e.target.attributes[0].value;
        if (player2Type === "1") { gameStrategy = new AIvsHumanStrategy(); }
        else { gameStrategy = new TwoHumansStrategy(); }
        d.getElementById('game-setup').className = 'hidden';
        d.getElementById('game-board').className = '';
    };

    /**
     * Method play is used in player choice handler as a notifier for subscriber
     * It uses set strategy and called view render method, when gets result of strategy work
     * @param index
     */
    this.play = function(index){
        var result = gameStrategy.play(gameArray, index);
        view.renderGame(result);
    };
};

var game = new Game();

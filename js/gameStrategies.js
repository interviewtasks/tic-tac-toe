var TwoHumansStrategy = function(){
    var currentPlayerIndex = 0;
    var players = [new HumanPlayer('X'), new HumanPlayer('O')];

    this.play = function(board, index){
        var player = players[currentPlayerIndex], gameOver = false;
        try {
            player.play(board, index);
            currentPlayerIndex = (currentPlayerIndex + 1) % 2;
        } catch (exc) {
            console.log(exc);
            gameOver = exc.status;
        }
        return [{"gameOver": gameOver, "iconSet": {'index': index, 'icon': player.icon}}];
    };
};

var AIvsHumanStrategy = function(){
    var humanPlayer = new HumanPlayer("X");
    var aiPlayer = new AIPlayer("O");

    this.play = function(board, index){
        var result = [], gameOver = false, gameOver2 = false;
        try {
            humanPlayer.play(board, index);
        } catch (exc) {
            console.log(exc);
            gameOver = exc.status;
        }
        result.push({"gameOver": gameOver, "iconSet": {'index': index, 'icon': humanPlayer.icon}})
        try {
            aiPlayer.play(board);
        } catch (exc) {
            console.log(exc);
            gameOver2 = exc.status;
        }
        result.push({"gameOver": gameOver2, "iconSet": {'index': aiPlayer.getLastIndex(), 'icon': aiPlayer.icon}});
        return result;
    };
};

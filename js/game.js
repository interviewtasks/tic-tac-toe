var d = document;
var x = "X", o = "O", clickArray = [], clicks = 0;

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

var View = function(){
    var boardTiles = d.querySelectorAll('[data-order]');
    this.renderGame = function(lastChanges) {
        var max = lastChanges.length;
        for (var i = 0; i < max; i++) {
            var playerChoice = lastChanges[i];
            boardTiles[playerChoice.iconSet.index].innerHTML = playerChoice.iconSet.icon;
            if (playerChoice.gameOver) {
                showGameOver(playerChoice.gameOver);
                return;
            }
        }
    };

    var showGameOver = function(status){
        var div = d.getElementById('game-over');
        div.className="";
        var text = "Game over!!!";
        if (status.length) {
            text += " The winner is " + status + "!!";
        }
        div.children[0].innerHTML = text;
    };
};

var Game = function(){
    var turns = 0, player1 = new HumanPlayer(), player2, activePlayer = player1,
        gameArray = Array.apply(null, {length: 9}).map(function(){ return 0;}),
        gameStrategy, view = new View();

    this.setup = function(e){
        e.preventDefault();
        e.stopPropagation();
        var player2Type = e.target.attributes[0].value;
        if (player2Type === "1") { gameStrategy = new AIvsHumanStrategy(); }
        else { gameStrategy = new TwoHumansStrategy(); }
        d.getElementById('game-setup').className = 'hidden';
        d.getElementById('game-board').className = '';
    };

    var check = function(board){
        var winList = [
            [0, 4, 8],
            [2, 4, 6],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        var ctx = [];
        winList.some(function(el){
            if (board[el[0]] &&
                board[el[0]] === board[el[1]] &&
                board[el[1]] === board[el[2]]) {
                ctx.push(board[el[0]]);
                return true;
            }
        }, ctx);
        return ctx[0];
    };
    this.play = function(index){
        var result = gameStrategy.play(gameArray, index);
        view.renderGame(result);
    };
    this.turn = function(targetElement) {
        var index = targetElement.attributes[0].value * 1;
        if (!gameArray[index]) {
            turns++;
            var text = x;
            if (turns % 2 == 0) { text = o; }
            targetElement.innerHTML = text;
            gameArray[index] = text;
            activePlayer.play(index);
            if (turns > 4) { checkGameStatus(); }
        }
    };
    var checkGameStatus = function(){
        var winner = check(gameArray);
        if (winner) { over(winner); }
        if (turns === 9) { over(); }
    };
};

var game = new Game();

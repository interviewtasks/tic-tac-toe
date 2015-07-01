var d = document;

var Game = function(){
    var turns = 0, player1 = new HumanPlayer(), player2, activePlayer = player1,
        gameArray = Array.apply(null, {length: 9}).map(function(){ return 0;}),
        gameStrategy, view = new View(), x = "X", o = "O";;

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

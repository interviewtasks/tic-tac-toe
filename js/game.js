var d = document;
var x = "X", o = "O", clickArray = [], clicks = 0;

var Game = function(){
    var turns = 0, player1 = new HumanPlayer(), player2, activePlayer = player1,
        gameArray = [];

    this.setup = function(e){
        e.preventDefault();
        e.stopPropagation();
        var player2Type = e.target.attributes[0].value;
        if (player2Type === "1") { player2 = new AIPlayer(); }
        else { player2 = new HumanPlayer(); }
        d.getElementById('game-setup').className = 'hidden';
        d.getElementById('game-board').className = '';
    };

    var over = function(winner) {
        var div = d.getElementById('game-over');
        div.className="";
        var text = "Game over!!!";
        if (winner) {
            text = "Game over!!! The winner is " + winner;
        }
        div.children[0].innerHTML = text;
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

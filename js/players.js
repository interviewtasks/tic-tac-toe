var TTTException = function(msg, status){
    this.status = status;
    this.message = msg;
};

var Player = function(){
    this.history = [];
};
Player.prototype.addHistoryElement = function(index){
    this.history.push(index);
};
Player.prototype.doPlay = function(){};
Player.prototype.checkIfWon = function(board){
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
    var that = this;
    winList.some(function(el){
        //console.log(board[el[0]] === this.icon, board[el[0]] === board[el[1]], board[el[1]] === board[el[2]]);
        //console.log(board, el);
        console.log(board[el[0]] == that.icon, board[el[0]], that.icon);
        if (board[el[0]] == that.icon &&
            board[el[0]] == board[el[1]] &&
            board[el[1]] == board[el[2]]) {
            ctx.push(board[el[0]]);
            return true;
        }
    }, ctx);
    console.log(ctx);
    return ctx[0];
};
Player.prototype.getLastIndex = function(){
    return this.history[this.history.length - 1];
};
Player.prototype.play = function(board, index) {
    index = this.doPlay(board, index);
    board[index] = this.icon;
    this.addHistoryElement(index);
    if (this.history.length >=3 && this.checkIfWon(board)) {
        throw new TTTException(this.icon + " won!!", this.icon);
    }
    if (board.indexOf(0) < 0) { // if there is still space on the board
        throw new TTTException("No free space!", true);
    }
    return index;
};

var HumanPlayer = function(icon){
    this.icon = icon;
};
HumanPlayer.prototype = new Player();
HumanPlayer.prototype.doPlay = function(board, index){
    return index;
};

var AIPlayer = function(icon){
    this.icon = icon;
};
AIPlayer.prototype = new Player();
AIPlayer.prototype.findEmptySlots = function(board){
    var ctx = [];
    board.forEach(function(el, index){
        if (!el) ctx.push(index);
    }, ctx);
    return ctx;
};
AIPlayer.prototype.doPlay = function(board, index){
    return this.findEmptySlots(board)[0];
};

var PlayerTurnEventHandler = function(subscriber){
    var subscribers = [];
    this.clickHandler = function(e){
        e.preventDefault();
        e.stopPropagation();
        if (!e.target.innerHTML) {
            subscriber(e.target.attributes[0].value * 1);
        }
    };
};

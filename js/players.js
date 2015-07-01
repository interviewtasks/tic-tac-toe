/**
 * In this file are structures responsible for Player functionality
 */

/**
 * Taking document to local variable makes using it faster
 * @type {HTMLDocument}
 */
var d = document;

/**
 * My own, simple, Exception object
 * @param msg - Human readable text
 * @param status - Computer readable value
 */
var TTTException = function(msg, status){
    this.status = status;
    this.message = msg;
};

/**
 * Main object for Player functionality
 */
var Player = function(){
    this.history = [];
};

/**
 * Every player has a history, which is an array.
 * This method adds last Player choice in the end of that array
 * @param index
 */
Player.prototype.addHistoryElement = function(index){
    this.history.push(index);
};
/**
 * This method should be implemented in every Object which inherits from Player,
 * as every player has its own way of playing
 */
Player.prototype.doPlay = function(){};
/**
 * This method checks if there is any pattern of win
 * !!! The winList should be generated, but I haven't enough time (sorry) !!!
 * @param board - array which is a representation of game board
 * @returns char || undefined
 */
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
        if (board[el[0]] == that.icon &&
            board[el[0]] == board[el[1]] &&
            board[el[1]] == board[el[2]]) {
            this.push(board[el[0]]);
            return true;
        }
    }, ctx);
    return ctx[0];
};
/**
 * It is a helper method. Gets last index added to history
 * @returns integer
 */
Player.prototype.getLastIndex = function(){
    return this.history[this.history.length - 1];
};
/**
 * Main method in that object. Checks edge cases
 * @param board - represents game board
 * @param index - index of chosen by user tile
 * @returns Exception || integer
 */
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

/**
 * One of specific types of player. Human player gets information about
 * player move from View
 * @param icon - char "X" or "O"
 */
var HumanPlayer = function(icon){
    this.icon = icon;
};
/**
 * Inherits from Player
 * @type {Player}
 */
HumanPlayer.prototype = new Player();
HumanPlayer.prototype.doPlay = function(board, index){
    return index;
};
/**
 * Computer player (called as AI :D )
 * @param icon - char "X" or "O"
 */
var AIPlayer = function(icon){
    this.icon = icon;
};
/**
 * Inherits from Player
 * @type {Player}
 */
AIPlayer.prototype = new Player();
/**
 * Helper method which finds empty tiles on game board
 * @param board - game board
 * @returns {Array}
 */
AIPlayer.prototype.findEmptySlots = function(board){
    var ctx = [];
    board.forEach(function(el, index){
        if (!el) this.push(index);
    }, ctx);
    return ctx;
};
/**
 * Own way of doPlay. This is a very easy case. If any free slot was found, use first from the list.
 * To make it more unpredictable I could use random free slot.
 * Already started coding real strategy, but time unexpected finished :P
 * @param board - game board
 * @returns integer which would be assign to index
 */
AIPlayer.prototype.doPlay = function(board){
    return this.findEmptySlots(board)[0];
};

/**
 * Handler object, used to hold player choice (onclick event on board)
 * @param subscriber game object method, which awaits for call if player makes a choice
 */
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

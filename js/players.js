var Player = function(){
    this.history = [];
};
Player.prototype.addHistoryElement = function(index){
    this.history.push(index);
};

var HumanPlayer = function(){};
HumanPlayer.prototype = new Player();
HumanPlayer.prototype.play = function(index){ this.addHistoryElement(index); };

var AIPlayer = function(){};
AIPlayer.prototype = new Player();
AIPlayer.prototype.play = function(){};

var PlayerTurnEventHandler = function(subscriber){
    var subscribers = [];
    this.clickHandler = function(e){
        e.preventDefault();
        e.stopPropagation();

        subscriber(e.target);
    };
};

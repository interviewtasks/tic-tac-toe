
var addNewEventListener = function(element, eventName, foo){
    if (element.addEventListener) {
        element.addEventListener(eventName, function(e){ foo(e); }, false);
    } else if (element.attachEvent)  {
        element.attachEvent('on' + eventName, function(e){ foo(e); });
    }
};

var HumanPlayer = function(){
    var aiPlayer;
    if (arguments[0] instanceof AIPlayer) {
        aiPlayer = arguments[0];
    }
    var doPlay = function(){

    };
    this.play = function(){
        doPlay();
        if (aiPlayer) { aiPlayer.play(); }
    };
};

var AIPlayer = function(){
    this.play = function(){};
};

var player1 = new HumanPlayer(), player2;
var d = document;
var x = "X", o = "O", clickArray = [], clicks = 0;

var gameSetUp = function(e){
    e.preventDefault();
    e.stopPropagation();
    var player2Type = e.target.attributes[0].value * 1;
    if (player2Type === 1) { player2 = new AIPlayer(); }
    else { player2 = new HumanPlayer(); }
    d.getElementById('game-setup').className = 'hidden';
    d.getElementById('game-board').className = '';
};

var gameOver = function(winner) {
    var div = d.getElementById('game-over');
    div.className="";
    var text = "Game over!!!";
    if (winner) {
        text = "Game over!!! The winner is " + winner;
    }
    div.children[0].innerHTML = text;
};
var checkClickArray = function(){
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
        console.log(el, (clickArray[el[0]] === clickArray[el[1]]));
        console.log(clickArray[el[0]],clickArray[el[1]],clickArray[el[2]]);
        if (clickArray[el[0]] === clickArray[el[1]] && clickArray[el[1]] === clickArray[el[2]]) {
            ctx.push(clickArray[el[0]]);
            return true;
        }
    }, ctx);
    return ctx;
};
var foo = function(e){
    clicks ++;
    e.preventDefault();
    e.stopPropagation();
    var cell = e.target;
    var index = cell.attributes[0].value * 1 - 1;
    var text = x;
    if (clicks %2 == 0) { text = o; }
    if (!cell.innerHTML) {
        cell.innerHTML = text;
        clickArray[index] = text;
    } else {
        clicks --;
    }
    console.log(clickArray);
    if (clicks > 4) {
        var tmp = checkClickArray();
        console.log(tmp);
        if (tmp[0]) { gameOver(tmp[0]); }
        if (clicks === 9) { gameOver(); }

    }
};
addNewEventListener(d.getElementsByTagName('ul')[0], 'click', gameSetUp);
addNewEventListener(d.getElementById('game-board'), 'click', foo);

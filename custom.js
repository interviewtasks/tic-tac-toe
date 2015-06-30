
var addNewEventListener = function(element, eventName, foo){
    if (element.addEventListener) {
        element.addEventListener(eventName, function(e){ foo(e); }, false);
    } else if (element.attachEvent)  {
        element.attachEvent('on' + eventName, function(e){ foo(e); });
    }
};

var d = document;
var x = "X";
var o = "O";
var clickCounter = 0;
var element = d.getElementById('game-board');
var gameOver = function() {
    var div = d.getElementById('game-over');
    div.className="";
};
var foo = function(e){
    clickCounter++;
    e.preventDefault();
    e.stopPropagation();
    var cell = e.target;
    var text = x;
    if (clickCounter %2 == 0) { text = o; }
    cell.innerHTML = text;
    if (clickCounter === 9) { gameOver(); }
};
addNewEventListener(element, 'click', foo);

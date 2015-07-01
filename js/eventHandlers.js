var addNewEventListener = function(element, eventName, foo){
    if (element.addEventListener) {
        element.addEventListener(eventName, function(e){ foo(e); }, false);
    } else if (element.attachEvent)  {
        element.attachEvent('on' + eventName, function(e){ foo(e); });
    }
};

var playerHandler = new PlayerTurnEventHandler(game.play);

addNewEventListener(d.getElementsByTagName('ul')[0], 'click', game.setup);
addNewEventListener(d.getElementById('game-board'), 'click', playerHandler.clickHandler);
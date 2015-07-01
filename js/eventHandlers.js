/**
 * Main function for creating events listeners
 * @param element HTMLElement
 * @param eventName string
 * @param foo Function
 */

var addNewEventListener = function(element, eventName, foo){
    if (element.addEventListener) {
        element.addEventListener(eventName, function(e){ foo(e); }, false);
    } else if (element.attachEvent)  {
        element.attachEvent('on' + eventName, function(e){ foo(e); });
    }
};

/**
 * creating PlayerTurnEventHandler instance, which is needed only here
 * to set player choice event callback function
 */
var playerHandler = new PlayerTurnEventHandler(game.play);

/**
 * Game setup event
 */
addNewEventListener(d.getElementsByTagName('ul')[0], 'click', game.setup);
/**
 * Player choice event
 */
addNewEventListener(d.getElementById('game-board'), 'click', playerHandler.clickHandler);
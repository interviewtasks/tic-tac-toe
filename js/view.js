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

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Game(numPlayers, canvasWidth, canvasHeight) {
    this.numPlayers = numPlayers;
    this.width = canvasWidth;
    this.height = canvasHeight;    
    this.CurrentPlayer = null;
    this.LongestRoad = null;
    this.LargestArmy = null;
    this.Players = [];
    console.log("new game", canvasWidth, canvasHeight);
    this.Board = new Board(canvasWidth, canvasHeight);
    this.initPlayers();
};

Game.prototype.initPlayers = function() {
    for(var i = 0; i < this.numPlayers; i++) {
        this.Players.push(new Player(i));
    }
};

Game.prototype.drawHUD = function(ctx) {
    for(var i = 0; i < this.numPlayers; i++) {
        this.Players[i].drawBanner(ctx, this.width, this.height);
    }
};

/*
 * draws the board
 * @param  ctx
 * @returns {undefined}
 */
Game.prototype.drawAll = function(gameCtx, hudCtx) {
    this.Board.draw(gameCtx);
    this.drawHUD(hudCtx);
};

/*
 *  resizes the board and gathers appropriate points
 */
Game.prototype.sizeBoard = function(width, height) {
    this.width = width;
    this.height = height;
    this.Board.sizeBoard(this.width, this.height);
};

Game.prototype.gameStarted = function() {
    gameHasStarted = true;
    hideRandomizeMenu();
};

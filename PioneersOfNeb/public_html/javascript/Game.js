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

Game.prototype.rollDice = function() {
    var die1 = 0;
    var die2 = 0;
    
    die1 = Math.floor(Math.random()*6) + 1;
    die2 = Math.floor(Math.random()*6) + 1;
};

Game.prototype.initPlayers = function() {
    for(var i = 0; i < this.numPlayers; i++) {
        this.Players.push(new Player(i));
    }
};

Game.prototype.drawHUD = function() {
    for(var i = 0; i < this.numPlayers; i++) {
        Players[i].setHUD(this.width, this.height);
    }
};

/*
 * draws the board
 * @param  ctx
 * @returns {undefined}
 */
Game.prototype.drawAll = function(ctx) {
    this.Board.draw(ctx);
    this.drawHUD();
};

/*
 *  resizes the board and gathers appropriate points
 */
Game.prototype.sizeBoard = function(width, height) {
    this.width = width;
    this.height = height;
    this.Board.sizeBoard(this.width, this.height);
};
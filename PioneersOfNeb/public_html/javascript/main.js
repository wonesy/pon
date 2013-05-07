
// File: main.js
// Author: Tommy Pantano
// Updated: 02/22/2012

//var globalGameBoard = null;
var globalGame = null;
var gameCanvasElement = null;
var gameCanvasContext = null;

window.onload = function() {
    console.log("on load");
    gameCanvasElement = document.getElementById("gameCanvas");
    gameCanvasContext = gameCanvasElement.getContext('2d');
    
    gameCanvasElement.setAttribute("width", gameCanvasElement.parentNode.offsetWidth);
    gameCanvasElement.setAttribute("height", gameCanvasElement.parentNode.offsetHeight);
    
    //globalGameBoard = new Board(gameCanvasElement.width, gameCanvasElement.height);
    //globalGameBoard.draw(gameCanvasContext);
    
    globalGame = new Game(4, gameCanvasElement.width, gameCanvasElement.height);
    globalGame.drawAll(gameCanvasContext);
    createKineticLayer();
    createRandomizeMenu();
};

window.onresize = function() {
    console.log("on resize");
    gameCanvasElement = document.getElementById("gameCanvas");
    gameCanvasContext = gameCanvasElement.getContext('2d');
    
    gameCanvasElement.setAttribute("width", gameCanvasElement.parentNode.offsetWidth);
    gameCanvasElement.setAttribute("height", gameCanvasElement.parentNode.offsetHeight);
    
    globalGame.sizeBoard(gameCanvasElement.width, gameCanvasElement.height);
    globalGame.drawAll(gameCanvasContext);
};

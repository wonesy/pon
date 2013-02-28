
// File: main.js
// Author: Tommy Pantano
// Updated: 02/22/2012

var globalGameBoard = null;

window.onload = function() {
    console.log("on load");
    var gameCanvasElement = document.getElementById("gameCanvas");
    var gameCanvasContext = gameCanvasElement.getContext('2d');
    
    gameCanvasElement.setAttribute("width", gameCanvasElement.parentNode.offsetWidth);
    gameCanvasElement.setAttribute("height", gameCanvasElement.parentNode.offsetHeight);
    
    globalGameBoard = new Board(gameCanvasElement.width, gameCanvasElement.height);
    globalGameBoard.draw(gameCanvasContext);
};

window.onresize = function() {
    console.log("on resize");
    var gameCanvasElement = document.getElementById("gameCanvas");
    var gameCanvasContext = gameCanvasElement.getContext('2d');
    
    gameCanvasElement.setAttribute("width", gameCanvasElement.parentNode.offsetWidth);
    gameCanvasElement.setAttribute("height", gameCanvasElement.parentNode.offsetHeight);
    
    globalGameBoard.sizeBoard(gameCanvasElement.width, gameCanvasElement.height);
    globalGameBoard.draw(gameCanvasContext);
};
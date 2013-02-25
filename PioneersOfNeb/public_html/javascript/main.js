
// File: main.js
// Author: Tommy Pantano
// Updated: 02/22/2012

window.onload = function() {
    console.log("on load");
    var gameCanvasElement = document.getElementById("gameCanvas");
    var gameCanvasContext = gameCanvasElement.getContext('2d');

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var canvasWidth = windowWidth * 0.98;
    var canvasHeight = windowHeight * 0.98;
    gameCanvasElement.style.position = "fixed";
    gameCanvasElement.setAttribute("width", canvasWidth);
    gameCanvasElement.setAttribute("height", canvasHeight);
    gameCanvasElement.style.top = (windowHeight - canvasHeight) / 2 + "px";
    gameCanvasElement.style.left = (windowWidth - canvasWidth) / 2 + "px";
    
    globalGameBoard = new Board(canvasWidth, canvasHeight);
    globalGameBoard.draw(gameCanvasContext);
};

window.onresize = function() {
    console.log("on resize");
    var gameCanvasElement = document.getElementById("gameCanvas");
    var gameCanvasContext = gameCanvasElement.getContext('2d');

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var canvasWidth = windowWidth * 0.98;
    var canvasHeight = windowHeight * 0.98;
    gameCanvasElement.style.position = "fixed";
    gameCanvasElement.setAttribute("width", canvasWidth);
    gameCanvasElement.setAttribute("height", canvasHeight);
    gameCanvasElement.style.top = (windowHeight - canvasHeight) / 2 + "px";
    gameCanvasElement.style.left = (windowWidth - canvasWidth) / 2 + "px";
    
    globalGameBoard.sizeBoard(canvasWidth, canvasHeight);
    globalGameBoard.draw(gameCanvasContext);
};
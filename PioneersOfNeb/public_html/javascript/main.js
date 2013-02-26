
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
    /*var windowWidth = document.getElementById("canvas_container").offsetWidth;
    var windowHeight = document.getElementById("canvas_container").offsetHeight;

    var canvasWidth = windowWidth * 0.98;
    var canvasHeight = windowHeight * 0.98;
    gameCanvasElement.style.position = "fixed";
    gameCanvasElement.setAttribute("width", canvasWidth);
    gameCanvasElement.setAttribute("height", canvasHeight);
    gameCanvasElement.style.top = (windowHeight - canvasHeight) / 2 + "px";
    gameCanvasElement.style.left = (windowWidth - canvasWidth) / 2 + "px";*/
    
    globalGameBoard = new Board(gameCanvasElement.width, gameCanvasElement.height);
    globalGameBoard.draw(gameCanvasContext);
};

window.onresize = function() {
    console.log("on resize");
    var gameCanvasElement = document.getElementById("gameCanvas");
    var gameCanvasContext = gameCanvasElement.getContext('2d');
    
    gameCanvasElement.setAttribute("width", gameCanvasElement.parentNode.offsetWidth);
    gameCanvasElement.setAttribute("height", gameCanvasElement.parentNode.offsetHeight);

    /*var windowWidth = document.getElementById("canvas_container").offsetWidth;
    var windowHeight = document.getElementById("canvas_container").offsetHeight;

    var canvasWidth = windowWidth * 0.98;
    var canvasHeight = windowHeight * 0.98;
    gameCanvasElement.style.position = "fixed";
    gameCanvasElement.setAttribute("width", canvasWidth);
    gameCanvasElement.setAttribute("height", canvasHeight);
    gameCanvasElement.style.top = (windowHeight - canvasHeight) / 2 + "px";
    gameCanvasElement.style.left = (windowWidth - canvasWidth + document.getElementById("chat_container").offsetWidth) / 2 + "px";
    */
    globalGameBoard.sizeBoard(gameCanvasElement.width, gameCanvasElement.height);
    globalGameBoard.draw(gameCanvasContext);
};
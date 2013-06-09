
// File: main.js
// Author: Tommy Pantano
// Updated: 02/22/2012

//var globalGameBoard = null;
var globalGame = null;
var conn = null;
var gameHasStarted = false;
var gameCanvasElement = null;
var gameCanvasContext = null;
var hudCanvasElement = null;
var hudCanvasContext = null;
var menuCanvasElement = null;
var menuCanvasContext = null;

window.onload = function() {
    console.log("on load");
    gameCanvasElement = document.getElementById("gameCanvas");
    gameCanvasContext = gameCanvasElement.getContext('2d');
    gameCanvasElement.setAttribute("width", gameCanvasElement.parentNode.offsetWidth);
    gameCanvasElement.setAttribute("height", gameCanvasElement.parentNode.offsetHeight);
    
    hudCanvasElement = document.getElementById("hudCanvas");
    hudCanvasContext = hudCanvasElement.getContext('2d');
    hudCanvasElement.setAttribute("width", hudCanvasElement.parentNode.offsetWidth);
    hudCanvasElement.setAttribute("height", hudCanvasElement.parentNode.offsetHeight);
    
    menuCanvasElement = document.getElementById("menuCanvas");
    menuCanvasContext = menuCanvasElement.getContext('2d');
    menuCanvasElement.setAttribute("width", menuCanvasElement.parentNode.offsetWidth);
    menuCanvasElement.setAttribute("height", menuCanvasElement.parentNode.offsetHeight);
    
    // EVENT LISTENERS
    hudCanvasElement.addEventListener("click", hudOnClick, false);
    
    globalGame = new Game(4, gameCanvasElement.width, gameCanvasElement.height);
    globalGame.sizeBoard(gameCanvasElement.width, gameCanvasElement.height);
    //globalGame.drawAll(gameCanvasContext);
    if (!gameHasStarted) {
        resetButtons();
        showRandomizeMenu();
    }
};

window.onresize = function() {
    console.log("on resize");
    gameCanvasElement = document.getElementById("gameCanvas");
    gameCanvasContext = gameCanvasElement.getContext('2d');
    gameCanvasElement.setAttribute("width", gameCanvasElement.parentNode.offsetWidth);
    gameCanvasElement.setAttribute("height", gameCanvasElement.parentNode.offsetHeight);
    
    hudCanvasElement = document.getElementById("hudCanvas");
    hudCanvasContext = hudCanvasElement.getContext('2d');
    hudCanvasElement.setAttribute("width", hudCanvasElement.parentNode.offsetWidth);
    hudCanvasElement.setAttribute("height", hudCanvasElement.parentNode.offsetHeight);
    
    menuCanvasElement = document.getElementById("menuCanvas");
    menuCanvasContext = menuCanvasElement.getContext('2d');
    menuCanvasElement.setAttribute("width", menuCanvasElement.parentNode.offsetWidth);
    menuCanvasElement.setAttribute("height", menuCanvasElement.parentNode.offsetHeight);
    
    globalGame.sizeBoard(gameCanvasElement.width, gameCanvasElement.height);
    globalGame.drawAll(gameCanvasContext, hudCanvasContext);
    if (!gameHasStarted) {
        resetButtons();
        showRandomizeMenu();
    }
};

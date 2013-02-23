
// File: main.js
// Author: Tommy Pantano
// Updated: 02/22/2012


window.onload = window.onresize = function() {
    var gameCanvasElement = document.getElementById("hexCanvas");
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
    
    Hexagon.Static.ORIENTATION = Hexagon.Orientation.Rotated;
    drawBoardFrame(canvasWidth, canvasHeight);
    
};
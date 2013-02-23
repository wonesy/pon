/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function drawBoardFrame(w, h) {
    var canvasWidth = w;
    var canvasHeight = h;
    
    if (canvasWidth <= (2 / Math.sqrt(3)) * canvasHeight) {
        findHexWithWidthAndHeight(canvasWidth, canvasWidth * (2 / Math.sqrt(3)));
    }
    else {
        findHexWithWidthAndHeight(canvasHeight * (Math.sqrt(3) / 2), canvasHeight);
    }
    
    addHexToCanvasAndDraw((canvasWidth / 2) - (Hexagon.Static.WIDTH / 2),
                          (canvasHeight / 2) - (Hexagon.Static.HEIGHT / 2));
}
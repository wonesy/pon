/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function drawBoardFrame(w, h) {
    var canvasWidth = w;
    var canvasHeight = h;
    
    var sideLength = 0;
    var hexWidth = 0;
    var hexHeight = 0;
    
    if (canvasWidth <= (2 / Math.sqrt(3)) * canvasHeight) {
        hexWidth = canvasWidth;
        hexHeight = canvasWidth * (Math.sqrt(3) / 2);
        sideLength = getHexagonSideLengthFromWidthAndHeight(hexWidth, hexHeight);
    }
    else {
        hexWidth = canvasHeight * (2 / Math.sqrt(3));
        hexHeight = canvasHeight;
        sideLength = getHexagonSideLengthFromWidthAndHeight(hexWidth, hexHeight);
    }
    
    //Hexagon(x, y, width, height, sidelength, orientation)
    var boardHexagon = new Hexagon((canvasWidth / 2) - (hexWidth / 2),
                                   (canvasHeight / 2) - (hexHeight / 2),
                                   hexWidth,
                                   hexHeight,
                                   sideLength);
    
    addHexToCanvasAndDraw(boardHexagon);
}
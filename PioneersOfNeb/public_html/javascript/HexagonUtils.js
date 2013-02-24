/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function getHexagonSideLengthFromWidthAndHeight(w, h) {

    var width = w;
    var height = h;

    var y = height/2.0;

    //solve quadratic
    var a = -3.0;
    var b = (-2.0 * width);
    var c = (Math.pow(width, 2)) + (Math.pow(height, 2));

    var z = (-b - Math.sqrt(Math.pow(b,2)-(4.0*a*c)))/(2.0*a);

    var x = (width - z)/2.0;
    
    return z;
}

function addHexToCanvasAndDraw(hexagon)
{
    var canvas = document.getElementById("hexCanvas");
    var ctx = canvas.getContext('2d');
    
    hexagon.draw(ctx);
}
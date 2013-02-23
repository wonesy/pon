/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function drawBoardFrame(w, h)
{
    var maxWidth = w;
    var maxHeight = h;
    
    
}

function findHexWithSideLengthZAndRatio(sideLength)
{
	var z = sideLength;
	var r = 2 / Math.sqrt(3);
	
	//solve quadratic
	var r2 = Math.pow(r, 2);
	var a = (1 + r2)/r2;
	var b = z/r2;
	var c = ((1-4.0*r2)/(4.0*r2)) * (Math.pow(z, 2));
	
	var x = (-b + Math.sqrt(Math.pow(b,2)-(4.0*a*c)))/(2.0*a);
	
	var y = ((2.0 * x) + z)/(2.0 * r);

	var width = ((2.0*x)+z);
	var height = (2.0*y);
	
	Hexagon.Static.WIDTH = width;
	Hexagon.Static.HEIGHT = height;
	Hexagon.Static.SIDE = z;
        
        addHexToCanvasAndDraw(0,0);
}
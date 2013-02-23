

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

function findHexWithWidthAndHeight(w, h)
{
	var width = w;
	var height = h;

	var y = height/2.0;
	
	//solve quadratic
	var a = -3.0;
	var b = (-2.0 * width);
	var c = (Math.pow(width, 2)) + (Math.pow(height, 2));
	
	var z = (-b - Math.sqrt(Math.pow(b,2)-(4.0*a*c)))/(2.0*a);
	
	var x = (width - z)/2.0;
	
	Hexagon.Static.WIDTH = width;
	Hexagon.Static.HEIGHT = height;
	Hexagon.Static.SIDE = z;
}

function addHexToCanvasAndDraw(x, y)
{
    var hex = new Hexagon(1, x, y);


    var canvas = document.getElementById("hexCanvas");
    var ctx = canvas.getContext('2d');
    hex.draw(ctx);
}
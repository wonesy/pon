/**
 * A Point is simply x and y coordinates
 * @constructor
 */
Point = function(x, y) {
	this.X = x;
	this.Y = y;
};

/**
 * A Hexagon is a 6 sided polygon, our hexes don't have to be symmetrical, i.e. ratio of width to height could be 4 to 3
 * @constructor
 */
Hexagon = function(id, x, y) {
	this.Points = [];//Polygon Base
	var x1 = null;
	var y1 = null;
	if(Hexagon.Static.ORIENTATION == Hexagon.Orientation.Normal) {
		x1 = (Hexagon.Static.WIDTH - Hexagon.Static.SIDE)/2;
		y1 = (Hexagon.Static.HEIGHT / 2);
		this.Points.push(new Point(x1 + x, y));
		this.Points.push(new Point(x1 + Hexagon.Static.SIDE + x, y));
		this.Points.push(new Point(Hexagon.Static.WIDTH + x, y1 + y));
		this.Points.push(new Point(x1 + Hexagon.Static.SIDE + x, Hexagon.Static.HEIGHT + y));
		this.Points.push(new Point(x1 + x, Hexagon.Static.HEIGHT + y));
		this.Points.push(new Point(x, y1 + y));
	}
	else {
		x1 = (Hexagon.Static.WIDTH / 2);
		y1 = (Hexagon.Static.HEIGHT - Hexagon.Static.SIDE)/2;
		this.Points.push(new Point(x1 + x, y));
		this.Points.push(new Point(Hexagon.Static.WIDTH + x, y1 + y));
		this.Points.push(new Point(Hexagon.Static.WIDTH + x, y1 + Hexagon.Static.SIDE + y));
		this.Points.push(new Point(x1 + x, Hexagon.Static.HEIGHT + y));
		this.Points.push(new Point(x, y1 + Hexagon.Static.SIDE + y));
		this.Points.push(new Point(x, y1 + y));
	}
	
	this.Id = id;
	
	this.x = x;
	this.y = y;
	this.x1 = x1;
	this.y1 = y1;
	
	this.TopLeftPoint = new Point(this.x, this.y);
	this.BottomRightPoint = new Point(this.x + Hexagon.Static.WIDTH, this.y + Hexagon.Static.HEIGHT);
	this.MidPoint = new Point(this.x + (Hexagon.Static.WIDTH / 2), this.y + (Hexagon.Static.HEIGHT / 2));
	
	this.P1 = new Point(x + x1, y + y1);
	
	this.selected = false;
};

/**
 * draws this Hexagon to the canvas
 * @this {Hexagon}
 */
Hexagon.prototype.draw = function(ctx) {

	if(!this.selected)
		ctx.strokeStyle = "grey";
	else
		ctx.strokeStyle = "black";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(this.Points[0].X, this.Points[0].Y);
	for(var i = 1; i < this.Points.length; i++)
	{
		var p = this.Points[i];
		ctx.lineTo(p.X, p.Y);
	}
	ctx.closePath();
	ctx.stroke();
	
	if(this.Id)
	{
		//draw text for debugging
		ctx.fillStyle = "black"
		ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		//var textWidth = ctx.measureText(this.Planet.BoundingHex.Id);
		ctx.fillText(this.Id, this.MidPoint.X, this.MidPoint.Y);
	}
	
	if(this.PathCoOrdX !== null && this.PathCoOrdY !== null && typeof(this.PathCoOrdX) != "undefined" && typeof(this.PathCoOrdY) != "undefined")
	{
		//draw co-ordinates for debugging
		ctx.fillStyle = "black"
		ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		//var textWidth = ctx.measureText(this.Planet.BoundingHex.Id);
		ctx.fillText("("+this.PathCoOrdX+","+this.PathCoOrdY+")", this.MidPoint.X, this.MidPoint.Y + 10);
	}
};

Hexagon.Orientation = {
	Normal: 0,
	Rotated: 1
};

Hexagon.Static = {HEIGHT:91.14378277661477
					, WIDTH:91.14378277661477
					, SIDE:50.0
					, ORIENTATION:Hexagon.Orientation.Normal
					, DRAWSTATS: false};//hexagons will have 25 unit sides for now
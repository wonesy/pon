
/**
 * A Point is simply x and y coordinates
 * @constructor
 */
function Point(x, y) {
	this.X = x;
	this.Y = y;
};

/**
 * A Tile is a 6 sided polygon
 * @constructor
 * @param {number} x XCoordinate for top left.
 * @param {number} y YCoordinate for top left.
 * @param {number} width Width of tile.
 * @param {number} height Height of tile.
 * @param {number} sidelength Sidelength of tile.
 */
function Tile(x, y, width, height, sidelength) {
    this.Points = [];
    var x1 = null;
    var y1 = null;

    x1 = (width - sidelength)/2;
    y1 = (height / 2);
    this.Points.push(new Point(x1 + x, y));
    this.Points.push(new Point(x1 + sidelength + x, y));
    this.Points.push(new Point(width + x, y1 + y));
    this.Points.push(new Point(x1 + sidelength + x, height + y));
    this.Points.push(new Point(x1 + x, height + y));
    this.Points.push(new Point(x, y1 + y));

    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.width = width;
    this.height = height;
};

/**
 * draws this Hexagon to the canvas
 * @this {Hexagon}
 */
Tile.prototype.draw = function(ctx) {

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
    
    var image = new Image();
    image.src = "images/tile_sea.png";
    var tileWidth = this.width;
    var tileHeight = this.height;
    var tileX = this.x;
    var tileY = this.y;
    image.onload = function(){
        ctx.drawImage(image, tileX, tileY, tileWidth, tileHeight);
    };
};
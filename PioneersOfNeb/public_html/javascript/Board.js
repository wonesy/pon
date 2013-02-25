
/**
 * Board Object
 * @constructor
 */
function Board(canvasWidth, canvasHeight) {
    this.Tiles = [];
    
    var tileHeight = canvasHeight / 7;
    var tileWidth = tileHeight * (2 / Math.sqrt(3));
    var tileSide = getTileSideLengthFromWidthAndHeight(tileWidth, tileHeight);
    
    for (var i=0; i < 7; i++)
    { 
        // (x, y, width, height, sidelength, id)
        this.Tiles.push(new Tile(0, i * tileHeight, tileWidth, tileHeight, tileSide, i));
    }
};

/**
 * draws this Hexagon to the canvas
 * @this {Hexagon}
 */
Board.prototype.draw = function(ctx) {

    for (var i = 0; i < this.Tiles.length; i++) {
        this.Tiles[i].draw(ctx);
    }
//    ctx.strokeStyle = "black";
//    ctx.lineWidth = 1;
//    ctx.beginPath();
//    ctx.moveTo(this.Points[0].X, this.Points[0].Y);
//    for(var i = 1; i < this.Points.length; i++)
//    {
//            var p = this.Points[i];
//            ctx.lineTo(p.X, p.Y);
//    }
//    ctx.closePath();
//    ctx.stroke();
//    
//    var image = new Image();
//    image.src = "images/tile_sea.png";
//    var tileWidth = this.width;
//    var tileHeight = this.height;
//    var tileX = this.x;
//    var tileY = this.y;
//    image.onload = function(){
//        ctx.drawImage(image, tileX, tileY, tileWidth, tileHeight);
//    };
};
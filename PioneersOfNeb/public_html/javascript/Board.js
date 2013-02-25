
/**
 * Board Object
 * @constructor
 */
function Board(canvasWidth, canvasHeight) {
    
    this.Tiles = [];
    
    this.sizeBoard(canvasWidth,canvasHeight);
};

Board.prototype.sizeBoard = function(canvasWidth, canvasHeight) {
    var tileHeight = canvasHeight / 7;
    var tileWidth = tileHeight * (2 / Math.sqrt(3));
    var tileSide = getTileSideLengthFromWidthAndHeight(tileWidth, tileHeight);
    
    this.Tiles.length = 0;
    
    var startingPos = tileHeight * 1.5;
    for (var i=0; i < 4; i++)
    { 
        // (x, y, width, height, sidelength, id)
        this.Tiles.push(new Tile(0, startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
    }
    
    var startingPos = tileHeight;
    for (var i=0; i < 5; i++)
    { 
        // (x, y, width, height, sidelength, id)
        this.Tiles.push(new Tile(tileWidth - (0.5 * tileSide), startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
    }
    
    var startingPos = tileHeight * 0.5;
    for (var i=0; i < 6; i++)
    { 
        // (x, y, width, height, sidelength, id)
        this.Tiles.push(new Tile(tileWidth + tileSide, startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
    }
    
    var startingPos = 0;
    for (var i=0; i < 7; i++)
    { 
        // (x, y, width, height, sidelength, id)
        this.Tiles.push(new Tile((tileWidth * 2) + (0.5 * tileSide), startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
    }
    
    var startingPos = tileHeight * 0.5;
    for (var i=0; i < 6; i++)
    { 
        // (x, y, width, height, sidelength, id)
        this.Tiles.push(new Tile((tileWidth * 2) + (2 * tileSide), startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
    }
    
        
    var startingPos = tileHeight;
    for (var i=0; i < 5; i++)
    { 
        // (x, y, width, height, sidelength, id)
        this.Tiles.push(new Tile((tileWidth * 2) + (3.5 * tileSide), startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
    }
    
    var startingPos = tileHeight * 1.5;
    for (var i=0; i < 4; i++)
    { 
        // (x, y, width, height, sidelength, id)
        this.Tiles.push(new Tile((tileWidth * 3) + (3 * tileSide), startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
    }
}

/**
 * draws this Hexagon to the canvas
 * @this {Hexagon}
 */
Board.prototype.draw = function(ctx) {

    for (var i = 0; i < this.Tiles.length; i++) {
        this.Tiles[i].draw(ctx);
    }
};
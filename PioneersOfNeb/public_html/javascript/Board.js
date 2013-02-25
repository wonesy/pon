
/**
 * Board Object
 * @constructor
 */
function Board(canvasWidth, canvasHeight) {
    
    this.Tiles = [];
    
    for(var i = 0; i < 37; i++) {
        this.Tiles.push(new Tile(null,null,null,null,null,i));
    }
    
    this.sizeBoard(canvasWidth,canvasHeight);
};

Board.prototype.sizeBoard = function(canvasWidth, canvasHeight) {
    var tileHeight = canvasHeight / 7;  // total height of the board
    var tileWidth = tileHeight * (2 / Math.sqrt(3));
    var tileSide = getTileSideLengthFromWidthAndHeight(tileWidth, tileHeight);
    
    //this.Tiles.length = 0;
    
    var tileCount = 0;
    var startingPos = 0;    // 
    var columnXPos = (canvasWidth/2 - (2*tileWidth + 3/2*tileSide));     // column's X-coordinate position
    
    for (var col = 0; col < 7; col++) {
        // FIRST and SEVENTH (last) rows
        if (col == 0 || col == 6) {
            startingPos = tileHeight * 1.5;
            for (var i = tileCount; i < tileCount+4; i++) {
                // (x, y, width, height, sidelength, id)
                this.Tiles[i].resizePoints(columnXPos, startingPos + ((i-tileCount) * tileHeight), tileWidth, tileHeight, tileSide);
                //this.Tiles.push(new Tile(columnXPos, startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
            }
            tileCount += 4;
        }
        // SECOND and SIXTH rows
        else if (col == 1 || col == 5) {
            startingPos = tileHeight;
            for (var i = tileCount; i < tileCount+5; i++) { 
                // (x, y, width, height, sidelength, id)
                this.Tiles[i].resizePoints(columnXPos, startingPos + ((i-tileCount) * tileHeight), tileWidth, tileHeight, tileSide);
                //this.Tiles.push(new Tile(columnXPos, startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
            }
            tileCount += 5;
        }
        // THIRD and FIFTH rows
        else if (col == 2 || col == 4) {
            startingPos = tileHeight * 0.5;
            for (var i = tileCount; i < tileCount+6; i++) {
                // (x, y, width, height, sidelength, id)
                this.Tiles[i].resizePoints(columnXPos, startingPos + ((i-tileCount) * tileHeight), tileWidth, tileHeight, tileSide);
                //this.Tiles.push(new Tile(columnXPos, startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
            }
            tileCount += 6;
        }
        // FOURTH (middle) row
        else {
            startingPos = 0;
            for (var i = tileCount; i < tileCount+7; i++) {
                // (x, y, width, height, sidelength, id)
                this.Tiles[i].resizePoints(columnXPos, startingPos + ((i-tileCount) * tileHeight), tileWidth, tileHeight, tileSide);
                //this.Tiles.push(new Tile(columnXPos, startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
            }
            tileCount += 7;
        }
        
        columnXPos += (tileWidth - 0.5*tileSide);   // increase the x pos
    }
}

/**
 * draws this Hexagon to the canvas
 * @this {Hexagon}
 */
Board.prototype.draw = function(ctx) {

    for (var i = 0; i < 37; i++) {
        this.Tiles[i].draw(ctx);
    }
};

/**
 * Board Object
 * @constructor
 */
function Board(canvasWidth, canvasHeight) {
    
    this.Tiles = [];
    this.BoardVertices = [];
    
    for(var i = 0; i < 37; i++) {
        this.Tiles.push(new Tile(null,null,null,null,null,i));
    }
    
    for(var i = 0; i < 54; i++) {
        this.BoardVertices.push(new Vertex(i, null));
    }
    
    this.sizeBoard(canvasWidth,canvasHeight);
};

Board.prototype.sizeBoard = function(canvasWidth, canvasHeight) {
    var tileHeight = canvasHeight*0.95 / 7;  // total height of the board
    var tileWidth = tileHeight * (2 / Math.sqrt(3));
    var tileSide = getTileSideLengthFromWidthAndHeight(tileWidth, tileHeight);
        
    //this.Tiles.length = 0;
    
    var tileCount = 0;
    var topOfBoard = (canvasHeight - (7*tileHeight));
    var startingPos = 0;
    var columnXPos = (canvasWidth - (4*tileWidth + 3*tileSide))/2;
    
    for (var col = 0; col < 7; col++) {
        // FIRST and SEVENTH (last) rows
        if (col == 0 || col == 6) {
            startingPos = tileHeight * 1.5 + topOfBoard;
            for (var i = tileCount; i < tileCount+4; i++) {
                // (x, y, width, height, sidelength, id)
                this.Tiles[i].resizePoints(columnXPos, startingPos + ((i-tileCount) * tileHeight), tileWidth, tileHeight, tileSide);
                //this.Tiles.push(new Tile(columnXPos, startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
            }
            tileCount += 4;
        }
        // SECOND and SIXTH rows
        else if (col == 1 || col == 5) {
            startingPos = tileHeight + topOfBoard;
            for (var i = tileCount; i < tileCount+5; i++) { 
                // (x, y, width, height, sidelength, id)
                this.Tiles[i].resizePoints(columnXPos, startingPos + ((i-tileCount) * tileHeight), tileWidth, tileHeight, tileSide);
                //this.Tiles.push(new Tile(columnXPos, startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
            }
            tileCount += 5;
        }
        // THIRD and FIFTH rows
        else if (col == 2 || col == 4) {
            startingPos = tileHeight * 0.5 + topOfBoard;
            for (var i = tileCount; i < tileCount+6; i++) {
                // (x, y, width, height, sidelength, id)
                this.Tiles[i].resizePoints(columnXPos, startingPos + ((i-tileCount) * tileHeight), tileWidth, tileHeight, tileSide);
                //this.Tiles.push(new Tile(columnXPos, startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
            }
            tileCount += 6;
        }
        // FOURTH (middle) row
        else {
            startingPos = topOfBoard;
            for (var i = tileCount; i < tileCount+7; i++) {
                // (x, y, width, height, sidelength, id)
                this.Tiles[i].resizePoints(columnXPos, startingPos + ((i-tileCount) * tileHeight), tileWidth, tileHeight, tileSide);
                //this.Tiles.push(new Tile(columnXPos, startingPos + (i * tileHeight), tileWidth, tileHeight, tileSide, i));
            }
            tileCount += 7;
        }
        
        columnXPos += (tileWidth - 0.5*tileSide);   // increase the x pos
    }
};

/**
 * draws this Hexagon to the canvas
 * @this {Hexagon}
 */
Board.prototype.draw = function(ctx) {

    for (var i = 0; i < 37; i++) {
        this.Tiles[i].draw(ctx);
    }
};

Board.prototype.recalcClickable = function() {
    for (var i = 0; i < 54; i++) {
        this.BoardVertices[i].calculateClickable();
    }
};

Board.prototype.addVertices = function(Tile) {
    switch(Tile.Id) {
        // FIRST row of resource tiles
        case 5:
            this.BoardVertices[0] = Tile.Points[0];
            this.BoardVertices[1] = Tile.Points[1];
            this.BoardVertices[2] = Tile.Points[2];
            this.BoardVertices[3] = Tile.Points[3];
            this.BoardVertices[4] = Tile.Points[4];
            this.BoardVertices[5] = Tile.Points[5];
            break;
        case 6:
            break;
        case 7:
            break;
        // SECOND row of resource tiles
        case 10:
            break;
        case 11:
            break;
        case 12:
            break;
        case 13:
            break;
        // THIRD row of resource tiles
        case 16:
            break;
        case 17:
            break;
        case 18:
            break;
        case 19:
            break;
        case 20:
            break;
        // FOURTH row of resource tiles
        case 23:
            break;
        case 24:
            break;
        case 25:
            break;
        case 26:
            break;
        // FIFTH row of resource tiles
        case 29:
            break;
        case 30:
            break;
        case 31:
            break;
        //////////////////////////////////
        default:
            break;
    }
};

/**
 * Board Object
 * @constructor
 */
function Board(canvasWidth, canvasHeight) {
    Math.seedrandom();
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
    var tileHeight = canvasHeight / 7;  // total height of the board
    var tileWidth = tileHeight * (2 / Math.sqrt(3));
    var tileSide = getTileSideLengthFromWidthAndHeight(tileWidth, tileHeight);
    console.log("resizing");
    //this.Tiles.length = 0;
    
    var tileCount = 0;
    var topOfBoard = 0;//(canvasHeight - (7*tileHeight));
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
    
    for(var i = 0; i < 37; i++) {
        this.addVertex(this.Tiles[i]);
    }
};

/*
 * populates the tile information that the server sent
 * i.e. roll values and resource types
 */
Board.prototype.populateTileInfo = function(info) {
    for (var i = 0; i < 37; i++) {
        //console.log("RES: " + info[Res])
        switch (info[i]["Res"]) {
            case "0":  this.Tiles[i].ResourceType = RESOURCE.BRICK; break;
            case "1":  this.Tiles[i].ResourceType = RESOURCE.WOOD; break;
            case "2":  this.Tiles[i].ResourceType = RESOURCE.SHEEP; break;
            case "3":  this.Tiles[i].ResourceType = RESOURCE.WHEAT; break;
            case "4":  this.Tiles[i].ResourceType = RESOURCE.ORE; break;
            case "5":  this.Tiles[i].ResourceType = RESOURCE.DESERT; break;
            case "6":  this.Tiles[i].ResourceType = RESOURCE.SEA; break;
            case "7":  this.Tiles[i].ResourceType = RESOURCE.WH_PORT; break;
            case "8":  this.Tiles[i].ResourceType = RESOURCE.S_PORT; break;
            case "9":  this.Tiles[i].ResourceType = RESOURCE.B_PORT; break;
            case "10": this.Tiles[i].ResourceType = RESOURCE.O_PORT; break;
            case "11": this.Tiles[i].ResourceType = RESOURCE.WO_PORT; break;
            case "12": this.Tiles[i].ResourceType = RESOURCE.THREEPORT1; break;
            case "13": this.Tiles[i].ResourceType = RESOURCE.THREEPORT2; break;
            case "14": this.Tiles[i].ResourceType = RESOURCE.THREEPORT3; break;
            case "15": this.Tiles[i].ResourceType = RESOURCE.THREEPORT4; break;
        }
        
        //console.log("ROLL: " + info["Roll"])
        switch (info[i]["Roll"]) {
            case "2": this.Tiles[i].RollValue = ROLL.TWO; break;
            case "3": this.Tiles[i].RollValue = ROLL.THREE; break;
            case "4": this.Tiles[i].RollValue = ROLL.FOUR; break;
            case "5": this.Tiles[i].RollValue = ROLL.FIVE; break;
            case "6": this.Tiles[i].RollValue = ROLL.SIX; break;
            case "8": this.Tiles[i].RollValue = ROLL.EIGHT; break;
            case "9": this.Tiles[i].RollValue = ROLL.NINE; break;
            case "10": this.Tiles[i].RollValue = ROLL.TEN; break;
            case "11": this.Tiles[i].RollValue = ROLL.ELEVEN; break;
            case "12": this.Tiles[i].RollValue = ROLL.TWELVE; break;
            default: break; //ignore
        } 
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

Board.prototype.addVertex = function(Tile) {
    switch(Tile.Id) {
        // FIRST row of resource tiles
        case 5:
            this.BoardVertices[0].Point = Tile.Points[0];
            this.BoardVertices[1].Point = Tile.Points[1];
            this.BoardVertices[2].Point = Tile.Points[2];
            this.BoardVertices[3].Point = Tile.Points[3];
            this.BoardVertices[4].Point = Tile.Points[4];
            this.BoardVertices[5].Point = Tile.Points[5];
            break;
        case 6:
            this.BoardVertices[6].Point = Tile.Points[2];
            this.BoardVertices[7].Point = Tile.Points[3];
            this.BoardVertices[8].Point = Tile.Points[4];
            this.BoardVertices[9].Point = Tile.Points[5];
            break;
        case 7:
            this.BoardVertices[10].Point = Tile.Points[2];
            this.BoardVertices[11].Point = Tile.Points[3];
            this.BoardVertices[12].Point = Tile.Points[4];
            this.BoardVertices[13].Point = Tile.Points[5];
            break;
        // SECOND row of resource tiles
        case 10:
            this.BoardVertices[14].Point = Tile.Points[0];
            this.BoardVertices[15].Point = Tile.Points[1];
            this.BoardVertices[16].Point = Tile.Points[2];
            this.BoardVertices[17].Point = Tile.Points[3];
            break;
        case 11:
            this.BoardVertices[18].Point = Tile.Points[2];
            this.BoardVertices[19].Point = Tile.Points[3];
            break;
        case 12:
            this.BoardVertices[20].Point = Tile.Points[2];
            this.BoardVertices[21].Point = Tile.Points[3];
            break;
        case 13:
            this.BoardVertices[22].Point = Tile.Points[2];
            this.BoardVertices[23].Point = Tile.Points[3];
            this.BoardVertices[24].Point = Tile.Points[4];
            break;
        // THIRD row of resource tiles
        case 16:
            this.BoardVertices[25].Point = Tile.Points[0];
            this.BoardVertices[26].Point = Tile.Points[1];
            this.BoardVertices[27].Point = Tile.Points[2];
            this.BoardVertices[28].Point = Tile.Points[3];
            break;
        case 17:
            this.BoardVertices[29].Point = Tile.Points[2];
            this.BoardVertices[30].Point = Tile.Points[3];
            break;
        case 18:
            this.BoardVertices[31].Point = Tile.Points[2];
            this.BoardVertices[32].Point = Tile.Points[3];
            break;
        case 19:
            this.BoardVertices[33].Point = Tile.Points[2];
            this.BoardVertices[34].Point = Tile.Points[3];
            break;
        case 20:
            this.BoardVertices[35].Point = Tile.Points[2];
            this.BoardVertices[36].Point = Tile.Points[3];
            this.BoardVertices[37].Point = Tile.Points[4];
            break;
        // FOURTH row of resource tiles
        case 23:
            this.BoardVertices[38].Point = Tile.Points[1];
            this.BoardVertices[39].Point = Tile.Points[2];
            this.BoardVertices[40].Point = Tile.Points[3];
            break;
        case 24:
            this.BoardVertices[41].Point = Tile.Points[2];
            this.BoardVertices[42].Point = Tile.Points[3];
            break;
        case 25:
            this.BoardVertices[43].Point = Tile.Points[2];
            this.BoardVertices[44].Point = Tile.Points[3];
            break;
        case 26:
            this.BoardVertices[45].Point = Tile.Points[2];
            this.BoardVertices[46].Point = Tile.Points[3];
            break;
        // FIFTH row of resource tiles
        case 29:
            this.BoardVertices[47].Point = Tile.Points[1];
            this.BoardVertices[48].Point = Tile.Points[2];
            this.BoardVertices[49].Point = Tile.Points[3];
            break;
        case 30:
            this.BoardVertices[50].Point = Tile.Points[2];
            this.BoardVertices[51].Point = Tile.Points[3];
            break;
        case 31:
            this.BoardVertices[52].Point = Tile.Points[2];
            this.BoardVertices[53].Point = Tile.Points[3];
            break;
        //////////////////////////////////
        default:
            break;
    }
};

Board.prototype.drawHUD = function() {
    
}

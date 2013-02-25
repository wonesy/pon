var RESOURCE = {
     BRICK: {val: 0, imgPath: "images/tile_brick.png"},
      WOOD: {val: 1, imgPath: "images/tile_wood.png"},
     SHEEP: {val: 2, imgPath: "images/tile_sheep.png"},
     WHEAT: {val: 3, imgPath: "images/tile_wheat.png"},
       ORE: {val: 4, imgPath: "images/tile_ore.png"},
    DESERT: {val: 5, imgPath: "images/tile_desert_2.png"},
       SEA: {val: 6, imgPath: "images/tile_sea.png"}
};

// in the same order as the enum above... exluding SEA
var resourceCount = [ 3, 4, 4, 4, 3, 1];

// in this order -- 2,3,4,5,6,8,9,10,11,12
var rollValCount = [1,2,2,2,2,2,2,2, 2, 1];

/**
 * A Point is simply x and y coordinates
 * @constructor
 * @param {number} x x-coordinate
 * @param {number} y y-coordinate
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
 * @param {number} id tile ID number
 */
function Tile(x, y, width, height, sidelength, id) {
    this.Points = [];
    this.ResourceType = RESOURCE.WOOD;
    this.Id = id;
    this.RollValue = 0;
    
    this.x = x; 
    this.y = y; 
    this.width = width;
    this.height = height; 
    this.sidelength = sidelength;
    
    this.resizePoints(x, y, width, height, sidelength);
    this.defineResource();
};

Tile.prototype.defineResource = function() {
    var seaIDs = [0,1,2,3,4,8,9,14,15,21,22,27,28,32,33,34,35,36];
    
    // if it is a sea tile
    if (seaIDs.indexOf(this.Id) > -1) {
        this.ResourceType = RESOURCE.SEA;
    }
    else {
        var randomNumber = Math.floor(Math.random()*6);
        
        while (resourceCount[randomNumber] <= 0) {
            randomNumber = Math.floor(Math.random()*6);
        }
        
        if (randomNumber === 0)
            this.ResourceType = RESOURCE.BRICK;
        else if (randomNumber === 1)
            this.ResourceType = RESOURCE.WOOD;
        else if (randomNumber === 2)
            this.ResourceType = RESOURCE.SHEEP;
        else if (randomNumber === 3)
            this.ResourceType = RESOURCE.WHEAT;
        else if (randomNumber === 4)
            this.ResourceType = RESOURCE.ORE;
        else if (randomNumber === 5)
            this.ResourceType = RESOURCE.DESERT;
            
        resourceCount[randomNumber]--;
    }
};

Tile.prototype.assignRollValue = function() {
    
}

Tile.prototype.resizePoints = function(x, y, width, height, sidelength) {
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
    this.width = width;
    this.height = height; 
    this.sidelength = sidelength;
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
    image.src = this.ResourceType.imgPath;
    var tileWidth = this.width;
    var tileHeight = this.height;
    var tileX = this.x;
    var tileY = this.y;
    image.onload = function(){
        ctx.drawImage(image, tileX, tileY, tileWidth, tileHeight);
    };
};
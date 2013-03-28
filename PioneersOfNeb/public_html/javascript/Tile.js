var RESOURCE = {
     BRICK: {val: 0, imgPath: "images/tile_brick.png"},
      WOOD: {val: 1, imgPath: "images/tile_wood.png"},
     SHEEP: {val: 2, imgPath: "images/tile_sheep.png"},
     WHEAT: {val: 3, imgPath: "images/tile_wheat.png"},
       ORE: {val: 4, imgPath: "images/tile_ore.png"},
    DESERT: {val: 5, imgPath: "images/tile_desert.png"},
       SEA: {val: 6, imgPath: "images/tile_sea.png"},
   WH_PORT: {val: 7, imgPath: "images/wheat_port.png"},
    S_PORT: {val: 8, imgPath: "images/sheep_port.png"},
    B_PORT: {val: 9, imgPath: "images/brick_port.png"},
    O_PORT: {val: 10, imgPath: "images/ore_port.png"},
   WO_PORT: {val: 11, imgPath: "images/wood_port.png"},
THREEPORT1: {val: 12, imgPath: "images/3to1_port1.png"},
THREEPORT2: {val: 13, imgPath: "images/3to1_port2.png"},
THREEPORT3: {val: 14, imgPath: "images/3to1_port3.png"},
THREEPORT4: {val: 15, imgPath: "images/3to1_port4.png"}
};

var ROLL = {
       TWO: {val: 0, imgPath: "images/rollvalue_02.png"},
     THREE: {val: 1, imgPath: "images/rollvalue_03.png"},
      FOUR: {val: 2, imgPath: "images/rollvalue_04.png"},
      FIVE: {val: 3, imgPath: "images/rollvalue_05.png"},
       SIX: {val: 4, imgPath: "images/rollvalue_06.png"},
     EIGHT: {val: 5, imgPath: "images/rollvalue_08.png"},
      NINE: {val: 6, imgPath: "images/rollvalue_09.png"},
       TEN: {val: 7, imgPath: "images/rollvalue_10.png"},
    ELEVEN: {val: 8, imgPath: "images/rollvalue_11.png"},
    TWELVE: {val: 9, imgPath: "images/rollvalue_12.png"}
};

// in the same order as the enum above... exluding SEA
var resourceCount = [3, 4, 4, 4, 3, 1];

// in this order --   2, 3, 4, 5, 6, 8, 9,10,11,12
var rollValueCount = [1, 2, 2, 2, 2, 2, 2, 2, 2, 1];

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
    this.RollValue = ROLL.TWO;
    this.ResourceType = RESOURCE.WOOD;
    this.Id = id;
    this.Vertices = [];
    
    this.x = x; 
    this.y = y; 
    this.width = width;
    this.height = height; 
    this.sidelength = sidelength;
    
    this.defineResource();
    this.resizePoints(x, y, width, height, sidelength);
    
};

Tile.prototype.defineResource = function() {
    this.seaIDs = [1,3,4,14,15,27,28,34,36];
    this.portIDs = [0,2,8,9,21,22,32,33,35];
    
    // if it is a sea tile
    if (this.seaIDs.indexOf(this.Id) > -1) {
        this.ResourceType = RESOURCE.SEA;
    }
    else if (this.portIDs.indexOf(this.Id) > -1){
        if (this.Id === 0)
            this.ResourceType = RESOURCE.THREEPORT2;
        if (this.Id === 2)
            this.ResourceType = RESOURCE.O_PORT;
        if (this.Id === 8)
            this.ResourceType = RESOURCE.WH_PORT;
        if (this.Id === 9)
            this.ResourceType = RESOURCE.S_PORT;
        if (this.Id === 21)
            this.ResourceType = RESOURCE.THREEPORT4;
        if (this.Id === 22)
            this.ResourceType = RESOURCE.THREEPORT1;
        if (this.Id === 32)
            this.ResourceType = RESOURCE.WO_PORT;
        if (this.Id === 33)
            this.ResourceType = RESOURCE.THREEPORT3;
        if (this.Id === 35)
            this.ResourceType = RESOURCE.B_PORT;
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
        
        // Setup roll value if not desert
        if (randomNumber !== 5) {
            this.assignRollValue();
        }
    }
};

Tile.prototype.assignRollValue = function() {
    
        var randomNumber = Math.floor(Math.random()*10);
        
        while (rollValueCount[randomNumber] <= 0) {
            randomNumber = Math.floor(Math.random()*10);
        }
        
        if (randomNumber === 0)
            this.RollValue = ROLL.TWO;
        else if (randomNumber === 1)
            this.RollValue = ROLL.THREE;
        else if (randomNumber === 2)
            this.RollValue = ROLL.FOUR;
        else if (randomNumber === 3)
            this.RollValue = ROLL.FIVE;
        else if (randomNumber === 4)
            this.RollValue = ROLL.SIX;
        else if (randomNumber === 5)
            this.RollValue = ROLL.EIGHT;
        else if (randomNumber === 6)
            this.RollValue = ROLL.NINE;
        else if (randomNumber === 7)
            this.RollValue = ROLL.TEN;
        else if (randomNumber === 8)
            this.RollValue = ROLL.ELEVEN;
        else if (randomNumber === 9)
            this.RollValue = ROLL.TWELVE;
            
        rollValueCount[randomNumber]--;
};

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
 * @param {context} ctx Gameboard Canvas Context
 */
Tile.prototype.draw = function(ctx) {

    ctx.strokeStyle = "tan";
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
    
    var resourceImage = new Image();
    resourceImage.src = this.ResourceType.imgPath;
    var tileWidth = this.width;
    var tileHeight = this.height;
    var tileX = this.x;
    var tileY = this.y;
    
    var rollValueImage = new Image();
    if (!((this.seaIDs.indexOf(this.Id) > -1) || this.ResourceType === RESOURCE.DESERT || (this.portIDs.indexOf(this.Id)> -1))) {
        rollValueImage.src = this.RollValue.imgPath;
        var rollValueWidth = this.height / 2.5;
        var rollValueHeight = this.height / 2.5;
        var rollValueX = this.x + (this.height * ((1 / Math.sqrt(3)) - 0.2));
        var rollValueY = this.y + this.height * 0.3;
    }
    
    resourceImage.onload = function(){
        ctx.drawImage(resourceImage, tileX, tileY, tileWidth, tileHeight);
        
    };
    
    rollValueImage.onload = function(){
        ctx.drawImage(rollValueImage, rollValueX, rollValueY, rollValueWidth, rollValueHeight);
    };
};


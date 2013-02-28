/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var PLAYERBANNER = {
     ZERO: {val: 0, imgPath: "images/hud_player0.png"},
      ONE: {val: 1, imgPath: "images/hud_player1.png"},
      TWO: {val: 2, imgPath: "images/hud_player2.png"},
    THREE: {val: 3, imgPath: "images/hud_player3.png"}
};

function Player(id) {
    this.Id = id;
    this.Banner = null;
    // Resource Cards
    this.Wood = 0;
    this.Brick = 0;
    this.Ore = 0;
    this.Sheep = 0;
    this.Wheat = 0;
    // Dev Cards
    this.Knights = 0;
    this.Monopolies = 0;
    this.RoadCards = 0;
    this.YearOfPlenties = 0;
    this.KnightsPlayed = 0;
    // Game Info
    this.LongestRoad = 0;
    this.VictoryPoints = 0;
    
    this.setBanner();
};

Player.prototype.setBanner = function() {
    switch(this.Id) {
        case 0:
            this.Banner = PLAYERBANNER.ZERO;
            break;
        case 1:
            this.Banner = PLAYERBANNER.ONE;
            break;
        case 2:
            this.Banner = PLAYERBANNER.TWO;
            break;
        case 3:
            this.Banner = PLAYERBANNER.THREE;
            break;
    }
};

Player.prototype.setHUD = function(canvasWidth, canvasHeight) {
    // sets up the information within the HUD
    var HUDImage = new Image();
    HUDImage.src = this.Banner.imgPath;
    var tileWidth = this.width;
    var tileHeight = this.height;
    var tileX = this.x;
    var tileY = this.y
    
    HUDImage.onload = function() {
        ctx.drawImage(resourceImage, tileX, tileY, tileWidth, tileHeight);
    };
};
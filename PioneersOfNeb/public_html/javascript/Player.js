/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var PLAYERBANNER = {
     ZERO: {val: 0, imgPath: "images/banner_p0.png"},
      ONE: {val: 1, imgPath: "images/banner_p1.png"},
      TWO: {val: 2, imgPath: "images/banner_p2.png"},
    THREE: {val: 3, imgPath: "images/banner_p3.png"}
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

Player.prototype.drawBanner = function(ctx, canvasWidth, canvasHeight) {
    // sets up the information within the HUD
    var bannerImage = new Image();
    bannerImage.src = this.Banner.imgPath;
    
    var bannerXPos;
    var bannerYPos;
    var bannerWidth = 350;  // hard coded for testing only
    var bannerHeight = 200;
    console.log(this.Banner.imgPath);
    switch(this.Banner.val) {
        case 0:
            bannerXPos = 0;
            bannerYPos = 0;
            break;
        case 1:
            bannerXPos = canvasWidth-350;
            bannerYPos = 0;
            break;
        case 2:
            bannerXPos = canvasWidth-350;
            bannerYPos = canvasHeight-200;
            break;
        case 3:
            bannerXPos = 0;
            bannerYPos = canvasHeight-200;
            break;
    }
    
    bannerImage.onload = function() {
        ctx.drawImage(bannerImage, bannerXPos, bannerYPos, bannerWidth, bannerHeight);
    };
};
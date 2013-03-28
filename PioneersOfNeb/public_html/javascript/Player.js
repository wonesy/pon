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
    this.Name = "Player " + (id+1);
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
    var playerName = this.Name;
    
    var bannerImage = new Image();
    bannerImage.src = this.Banner.imgPath;
    
    var avatarImage = new Image();
    avatarImage.src = "images/tommy.jpg";
    
    var bannerXPos;
    var bannerYPos;
    var bannerWidth = 0.33*canvasWidth;
    var bannerHeight = 4/7*bannerWidth;
    
    var avatarXPos;
    var avatarYPos;
    var avatarSideLength = (1/8)*bannerWidth;
    var avatarBorder = (10/185)*bannerWidth;
    
    var nameXPos;
    var nameYPos;
    
    // getting the width (in pixels) of the player's name
    document.getElementById('alpha').innerHTML = playerName;
    var alpha = document.getElementById("alpha");
    var alphaHeight = (alpha.clientHeight+1);
    var alphaWidth = (alpha.clientWidth+1);
      
    switch(this.Banner.val) {
        case 0:
            bannerXPos = 0;
            bannerYPos = 0;
            avatarXPos = avatarBorder;
            avatarYPos = avatarBorder;
            nameXPos = 1.5*avatarBorder + avatarSideLength;
            nameYPos = avatarBorder + 0.5*avatarSideLength;
            break;
        case 1:
            bannerXPos = canvasWidth-bannerWidth;
            bannerYPos = 0;
            avatarXPos = canvasWidth - avatarBorder - avatarSideLength;
            avatarYPos = avatarBorder;
            nameXPos = canvasWidth - 1.5*avatarBorder - avatarSideLength - alphaWidth;
            nameYPos = avatarBorder + 0.5*avatarSideLength;
            break;
        case 2:
            bannerXPos = canvasWidth-bannerWidth;
            bannerYPos = canvasHeight-bannerHeight;
            avatarXPos = canvasWidth - avatarBorder - avatarSideLength;
            avatarYPos = canvasHeight - avatarBorder - avatarSideLength;
            nameXPos = canvasWidth - 1.5*avatarBorder - avatarSideLength - alphaWidth;
            nameYPos = canvasHeight - avatarBorder - alphaHeight;
            break;
        case 3:
            bannerXPos = 0;
            bannerYPos = canvasHeight-bannerHeight;
            avatarXPos = avatarBorder;
            avatarYPos = canvasHeight - avatarBorder - avatarSideLength;
            nameXPos = 1.5*avatarBorder + avatarSideLength;
            nameYPos = canvasHeight - avatarBorder - alphaHeight;
            break;
    }
    
    bannerImage.onload = avatarImage.onload = function() {
        ctx.drawImage(bannerImage, bannerXPos, bannerYPos, bannerWidth, bannerHeight);
        ctx.drawImage(avatarImage, avatarXPos, avatarYPos, avatarSideLength, avatarSideLength);
        ctx.font = "1.5em helvetica";
        ctx.textBaseline = "middle";
        ctx.fillText(playerName, nameXPos, nameYPos);
    };
};
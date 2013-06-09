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

function Player(id, canvasWidth, canvasHeight) {
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
    avatarImage.src = "images/berry.png";
    
    var starImage = new Image();
    starImage.src = "images/star.png";
    
    var resBagImage =  new Image();
    resBagImage.src = "images/pouch.png";
    
    var devCardImage =  new Image();
    devCardImage.src = "images/dev.png";
    
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
    
    var starImgXPos;
    var starImgYPos;
    var starImgSideLength = 0.5*avatarSideLength;
    
    var resBagXPos;
    var resBagYPos;
    
    var devCardImgXPos;
    var devCardImgYPos;
    
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
            starImgXPos = avatarXPos + starImgSideLength/2;
            starImgYPos = avatarYPos + avatarSideLength + avatarBorder/2;
            resBagXPos = avatarXPos + starImgSideLength/2;
            resBagYPos = avatarYPos + avatarSideLength + avatarBorder + starImgSideLength;
            devCardImgXPos = 0.25*bannerWidth;
            devCardImgYPos = avatarYPos + avatarSideLength + avatarBorder/2;
            break;
        case 1:
            bannerXPos = canvasWidth-bannerWidth;
            bannerYPos = 0;
            avatarXPos = canvasWidth - avatarBorder - avatarSideLength;
            avatarYPos = avatarBorder;
            nameXPos = canvasWidth - 1.5*avatarBorder - avatarSideLength - alphaWidth;
            nameYPos = avatarBorder + 0.5*avatarSideLength;
            starImgXPos = avatarXPos + starImgSideLength/2 - avatarBorder/2;
            starImgYPos = avatarYPos + avatarSideLength + avatarBorder/2;
            resBagXPos = avatarXPos + starImgSideLength/2 - avatarBorder/2;
            resBagYPos = avatarYPos + avatarSideLength + avatarBorder + starImgSideLength;
            devCardImgXPos = canvasWidth - 0.25*bannerWidth - starImgSideLength - avatarBorder/2;
            devCardImgYPos = avatarYPos + avatarSideLength + avatarBorder/2;
            break;
        case 2:
            bannerXPos = canvasWidth-bannerWidth;
            bannerYPos = canvasHeight-bannerHeight;
            avatarXPos = canvasWidth - avatarBorder - avatarSideLength;
            avatarYPos = canvasHeight - avatarBorder - avatarSideLength;
            nameXPos = canvasWidth - 1.5*avatarBorder - avatarSideLength - alphaWidth;
            nameYPos = avatarYPos + avatarSideLength/2;
            starImgXPos = avatarXPos + starImgSideLength/2 - avatarBorder/2;
            starImgYPos = avatarYPos - 2*starImgSideLength - avatarBorder;
            resBagXPos = avatarXPos + starImgSideLength/2 - avatarBorder/2;
            resBagYPos = avatarYPos - starImgSideLength - avatarBorder/2;
            devCardImgXPos = canvasWidth - 0.25*bannerWidth - starImgSideLength - avatarBorder/2;
            devCardImgYPos = avatarYPos - starImgSideLength - avatarBorder/2;
            break;
        case 3:
            bannerXPos = 0;
            bannerYPos = canvasHeight-bannerHeight;
            avatarXPos = avatarBorder;
            avatarYPos = canvasHeight - avatarBorder - avatarSideLength;
            nameXPos = 1.5*avatarBorder + avatarSideLength;
            nameYPos = avatarYPos + avatarSideLength/2;
            starImgXPos = avatarXPos + starImgSideLength/2;
            starImgYPos = avatarYPos - 2*starImgSideLength - avatarBorder;
            resBagXPos = avatarXPos + starImgSideLength/2;
            resBagYPos = avatarYPos - starImgSideLength - avatarBorder/2;
            devCardImgXPos = 0.25*bannerWidth;
            devCardImgYPos = avatarYPos - starImgSideLength - avatarBorder/2;
            break;
    }
    
    var victoryPoints = this.VictoryPoints;
    var numResources = this.Wood + this.Sheep + this.Brick + this.Ore + this.Wheat;
    var numDevCards = this.Knights + this.Monopolies + this.RoadCards + this.YearOfPlenties;
    
    bannerImage.onload = avatarImage.onload = function() {
        ctx.drawImage(bannerImage, bannerXPos, bannerYPos, bannerWidth, bannerHeight);
        ctx.drawImage(avatarImage, avatarXPos, avatarYPos, avatarSideLength, avatarSideLength);
        ctx.drawImage(starImage, starImgXPos, starImgYPos, starImgSideLength, starImgSideLength);
        ctx.drawImage(resBagImage, resBagXPos, resBagYPos, starImgSideLength, starImgSideLength);
        ctx.drawImage(devCardImage, devCardImgXPos, devCardImgYPos, starImgSideLength, starImgSideLength);
        ctx.font = "1.5em helvetica";
        ctx.textBaseline = "middle";
        
        // draw player names
        ctx.fillText(playerName, nameXPos, nameYPos);
        // draw information values
        ctx.font = "1em helvetica";
        ctx.fillText(victoryPoints, starImgXPos + starImgSideLength + 5, starImgYPos + starImgSideLength/2 );
        ctx.fillText(numResources, resBagXPos + starImgSideLength + 5, resBagYPos + starImgSideLength/2 );
        ctx.fillText(numDevCards, devCardImgXPos + starImgSideLength + 5, devCardImgYPos + starImgSideLength/2 );
    };
};

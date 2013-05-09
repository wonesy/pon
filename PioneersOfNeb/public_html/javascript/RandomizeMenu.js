var canClickButtons = false;

var randomizeMenu = {
    x: 0,
    y: 0, // represents bottom 
    width: 0,
    height: 0,
    borderWidth: 0
};
    
var randomizeButton = {
    x: 0,
    y: 0, // represents top
    width: 0,
    height: 0,
    borderWidth: 0,
    strokeStyle: 'black'
};
    
var readyToPlayButton = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    borderWidth: 0,
    strokeStyle: 'black'
};

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// Draws the background menu for re-randomization
function drawMenu(randomizeMenu, context) {
    context.beginPath();
    context.moveTo(randomizeMenu.x, randomizeMenu.y);
    context.lineTo(randomizeMenu.x - randomizeMenu.width, randomizeMenu.y);
    context.arc(randomizeMenu.x - randomizeMenu.width, hudCanvasElement.height/2, randomizeMenu.height/2, 0.5*Math.PI, 1.5*Math.PI);
    context.lineTo(randomizeMenu.x, hudCanvasElement.height/2-randomizeMenu.height/2);
    context.fillStyle = '#8ED6FF';
    context.fill();
    context.lineWidth = randomizeMenu.borderWidth;
    context.strokeStyle = 'black';
    context.stroke();
}

// draws the rectangular buttons
function drawRectangle(myRectangle, context) {
    context.beginPath();
    context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
    context.fillStyle = 'gray';
    context.fill();
    context.lineWidth = myRectangle.borderWidth;
    context.lineWidth = myRectangle.borderWidth;
    context.strokeStyle = myRectangle.strokeStyle;
    context.stroke();
}

function animate(randomizeMenu, canvas, context, startTime) {
    // update
    var time = (new Date()).getTime() - startTime;
    var run = true;

    var linearSpeed = 10;
    // pixels / second
    var newMenuX = randomizeMenu.x - (linearSpeed * time / 1000);
    var newRButtonX = randomizeButton.x - (linearSpeed * time / 1000);
    var newPlayButtonX = readyToPlayButton.x - (linearSpeed * time / 1000);

    if(newMenuX > canvas.width ) {
        randomizeMenu.x = newMenuX;
        randomizeButton.x = newRButtonX;
        readyToPlayButton.x = newPlayButtonX;
    } else {
        run = false;
        canClickButtons = true;
    }

    context.clearRect(0,0,canvas.width, canvas.height);

    drawMenu(randomizeMenu, context);
    drawRectangle(randomizeButton, context);
    drawRectangle(readyToPlayButton, context);

    // request new frame
    if (run === true) {
        requestAnimFrame(function() {
            animate(randomizeMenu, canvas, context, startTime);
        });
    }
}

function run_randomizeMenu() {
    canClickButtons = false;
    
    randomizeMenu = {
        x: hudCanvasElement.width + (0.15*hudCanvasElement.width) + 100,
        y: hudCanvasElement.height/2 + 100, // represents bottom 
        width: (0.15*hudCanvasElement.width),
        height: 200,
        borderWidth: 2
    };
    
    randomizeButton = {
        x: randomizeMenu.x-(randomizeMenu.width),
        y: randomizeMenu.y-160, // represents top
        width: (0.7*randomizeMenu.width),
        height: 40,
        borderWidth: 1,
        strokeStyle: 'black'
    };
    
    readyToPlayButton = {
        x: randomizeMenu.x-(randomizeMenu.width),
        y: randomizeMenu.y-80,
        width: (0.7*randomizeMenu.width),
        height: 40,
        borderWidth: 1,
        strokeStyle: 'black'
    };
    
    drawRectangle(randomizeMenu, hudCanvasContext);
    //var imgData = gameCanvasContext.getImageData(0,0,gameCanvasElement.width,gameCanvasElement.height);
    
    setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(randomizeMenu, hudCanvasElement, hudCanvasContext, startTime);
    }, 1000);
};

function resetRandomizeButton() {
    randomizeButton.strokeStyle = 'black';
    drawRectangle(randomizeButton, hudCanvasContext);
    canClickButtons = true;
};

function requestNewBoard() {
    conn.send(JSON.stringify({"MsgType":"data","Text":"{\"Player\":\"0\",\"Function\":\"makeNewBoard\",\"Params\":\"\"}"}));
};






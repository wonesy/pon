var canClickButtons = false;

// bidirectional globals
var forward = 1;
var backward = -2;

var randomizeMenu = {
    x: 0,
    y: 0, // represents bottom 
    width: 0,
    height: 0,
    borderWidth: 0
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
    context.arc(randomizeMenu.x - randomizeMenu.width, menuCanvasElement.height/2, randomizeMenu.height/2, 0.5*Math.PI, 1.5*Math.PI);
    context.lineTo(randomizeMenu.x, menuCanvasElement.height/2-randomizeMenu.height/2);
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

function animate(randomizeMenu, canvas, context, startTime, direction) {
    // update
    var time = (new Date()).getTime() - startTime;
    var run = true;

    var linearSpeed = 10*direction;
    // pixels / second
    var newMenuX = randomizeMenu.x - (linearSpeed * time / 1000);

    if((newMenuX > canvas.width && direction == forward)
        || (newMenuX < canvas.width + randomizeMenu.width + randomizeMenu.height && direction ==  backward)) {
        randomizeMenu.x = newMenuX;
    } else {
        run = false;
        canClickButtons = true;
    }

    context.clearRect(0,0,canvas.width, canvas.height);

    drawMenu(randomizeMenu, context);
    
    document.getElementById("rand_btn").style.top = randomizeMenu.y-160 + "px";
    document.getElementById("start_btn").style.top = randomizeMenu.y-80 + "px";
    document.getElementById("rand_btn").style.right = canvas.width-newMenuX+10 + "px";
    document.getElementById("start_btn").style.right = canvas.width-newMenuX+10 + "px";

    // request new frame
    if (run === true) {
        requestAnimFrame(function() {
            animate(randomizeMenu, canvas, context, startTime, direction);
        });
    }
}

function showRandomizeMenu() {
    canClickButtons = false;
    
    randomizeMenu = {
        x: menuCanvasElement.width + (0.15*menuCanvasElement.width) + 100,
        y: menuCanvasElement.height/2 + 100, // represents bottom 
        width: 100,
        height: 200,
        borderWidth: 2
    };
    
    setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(randomizeMenu, menuCanvasElement, menuCanvasContext, startTime, forward);
    }, 1000);
};

// hides the pre-game menu and begins the game
function hideRandomizeMenu() {
    setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(randomizeMenu, menuCanvasElement, menuCanvasContext, startTime, backward);
    }, 1000);
};

function resetButtons() {
    document.getElementById("rand_btn").style.right = "-150px";
    document.getElementById("start_btn").style.right = "-150px";
};

// sends a request to server to re-randomize board   
function requestNewBoard() {
    // MsgType: data,
    // Text:
    //      {Player: 0,
    //       Function: makeNewBoard,
    //       Params:}
    conn.send(JSON.stringify({"MsgType":"data","Text":"{\"Player\":\"0\",\"Function\":\"makeNewBoard\",\"Params\":\"\"}"}));
};

// sends a message to server to start game
function requestGameStart() {
    conn.send(JSON.stringify({"MsgType":"data","Text":"{\"Player\":\"0\",\"Function\":\"startGame\",\"Params\":\"\"}"}));
};






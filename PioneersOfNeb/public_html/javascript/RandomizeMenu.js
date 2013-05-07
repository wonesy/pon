window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

function drawRectangle(myRectangle, context) {
    context.beginPath();
    context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
    context.fillStyle = '#8ED6FF';
    context.fill();
    context.lineWidth = myRectangle.borderWidth;
    context.strokeStyle = 'black';
    context.stroke();
}

function animate(myRectangle, canvas, context, startTime) {
    // update
    var time = (new Date()).getTime() - startTime;

    var linearSpeed = 100;
    // pixels / second
    var newX = (linearSpeed * time / 1000)*-1;

    if(newX > myRectangle.width) {
        myRectangle.x = newX;
    }

    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRectangle(myRectangle, context);

    // request new frame
    requestAnimFrame(function() {
        animate(myRectangle, canvas, context, startTime);
    });
}

var myRectangle = {
    x: gameCanvasElement.width,
    y: (gameCanvasElement.height/2) - 25,
    width: 100,
    height: 50,
    borderWidth: 5
};

drawRectangle(myRectangle, gameCanvasContext);

// wait one second before starting animation
setTimeout(function() {
    var startTime = (new Date()).getTime();
    animate(myRectangle, gameCanvasElement, gameCanvasContext, startTime);
}, 1000);

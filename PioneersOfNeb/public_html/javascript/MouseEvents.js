// returns the x and y position of mouse clicks for a given canvas
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
};

// sets relMouseCoords as a method for a Canvas element
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

// mouse click handler
function hudOnClick(e) {
    var coords = hudCanvasElement.relMouseCoords(e);
    
    if (canClickButtons) {
        if (  coords.x < randomizeButton.x+randomizeButton.width 
           && coords.x > randomizeButton.x
           && coords.y > randomizeButton.y
           && coords.y < randomizeButton.y+randomizeButton.height) {
            console.log("randomize button!")
            canClickButtons = false;
            requestNewBoard();
        }
        else if (  coords.x < readyToPlayButton.x+readyToPlayButton.width 
           && coords.x > readyToPlayButton.x
           && coords.y > readyToPlayButton.y
           && coords.y < readyToPlayButton.y+readyToPlayButton.height) {
            console.log("play button!")
        }
    }
};

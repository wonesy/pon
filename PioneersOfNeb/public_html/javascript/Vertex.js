/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Vertex(id, Point) {
    this.Id = id;
    this.Point = Point;
    this.Clickables = [];   // range of pixels that, when clicked, belong to this vertex
    this.isSettled = 0;
    this.canBeSettled = 0;
};

Vertex.prototype.calculateClickable = function() {
    this.Clickables = [];
    this.Clickables.push( new Point(this.Point.X - 5, this.Point.Y - 5)); // upper left
    this.Clickables.push( new Point(this.Point.X - 5, this.Point.Y + 5)); // lower left
    this.Clickables.push( new Point(this.Point.X + 5, this.Point.Y - 5)); // upper right
    this.Clickables.push( new Point(this.Point.X + 5, this.Point.Y + 5)); // lower right
};

/*Vertex.prototype.draw = function(ctx, canvasWidth, canvasHeight) {
    ctx.strokeStyle = "red";
    var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    var index = (this.Point.X + this.Point.Y * canvasWidth) * 4;

    canvasData.data[index + 0] = 255;
    canvasData.data[index + 1] = 0;
    canvasData.data[index + 2] = 0;
    canvasData.data[index + 3] = 1;
    ctx.putImageData(canvasData, 0, 0);
    
    console.log("ID: " + this.Id + " @ (" + this.Point.X + ", " + this.Point.Y + ")");
};*/
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
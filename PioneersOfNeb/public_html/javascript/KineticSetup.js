var stage = null;
var layer = null;

function createKineticLayer() {
    stage = new Kinetic.Stage({
        container: 'canvas_container',
    });
    
    console.log("kinetic: ", gameCanvasElement.width, gameCanvasElement.height)
};

function createRandomizeMenu() {    
    layer = new Kinetic.Layer();
    
    console.log("kinetic")
    
    var blueRect = new Kinetic.Rect({
      x: 50,
      y: 75,
      width: 100,
      height: 50,
      fill: '#00D2FF',
      stroke: 'black',
      strokeWidth: 4
    });
    
    layer.add(blueRect);
    stage.add(layer);
};

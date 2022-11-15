import * as Fabric from 'fabric';

var canvas;
var coords = [];
var imageStrokes = [];
var strokePixels = [[], []];
var mousePressed = false;

const Quick = () => {
  canvas =
    window._canvas =
    canvas =
    window._canvas =
      new Fabric.fabric.Canvas('canvas');
  canvas.backgroundColor = '#ffffff';
  canvas.isDrawingMode = 1;
  canvas.freeDrawingBrush.color = 'black';
  canvas.freeDrawingBrush.width = 2;
  canvas.renderAll();

  canvas.on('mouse:up', function (e) {
    mousePressed = false;
    imageStrokes.push(strokePixels);
    strokePixels = [[], []];
  });
  canvas.on('mouse:down', function (e) {
    mousePressed = true;
  });
  canvas.on('mouse:move', function (e) {
    recordCoor(e);
  });
  function recordCoor(event) {
    var pointer = canvas.getPointer(event.e);
    var posX = pointer.x / 3;
    var posY = (pointer.y / 4.5) * 3;

    if (posX >= 0 && posY >= 0 && mousePressed) {
      coords.push(pointer);
      strokePixels[0].push(Math.floor(posX));
      strokePixels[1].push(Math.floor(posY));
    }
  }
};

export function clearCanvas() {
  canvas = null;
  coords = [];
  imageStrokes = [];
  strokePixels = [[], []];
  mousePressed = false;
}

export function submit() {
  let str = '[';
  for (let leng = 0; leng < imageStrokes.length; leng++) {
    str += '[[' + imageStrokes[leng][0] + '],[' + imageStrokes[leng][1] + ']]';
    if (leng < imageStrokes.length - 1) str += ',';
  }
  str += ']';
  setTimeout(clearCanvas, 0);
  return str;
}
export default Quick;

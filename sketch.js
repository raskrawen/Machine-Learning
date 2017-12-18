var learningRate=0.001;
var points = [[2,5],[1,1],[3,7]];
var a=1;
var b=0;
var y=0;
var x=0;
var aSlider; //slider 
var epochsOld=0;
var epochs=100;
var learningRateOld = 0;
var origoX = 50;
var origoY = 500;
var k=255;
var epoch=0;
var button1;
var buttonStart;
var id;

  
function setup() {
  createCanvas(400,550);
aSlider = createSlider(0,1000,100); // slider. Numbers from 0 to 1000, jump of 100.
  aSlider.position(50,50);
  bSlider = createSlider(0,100,10);
  bSlider.position(50,120);
button1 = createButton ("reset");
button1.position(200,10);
button1.mousePressed(reset);
buttonStart = createButton ("train");
buttonStart.position(200,50);
buttonStart.mousePressed(start);
  reset();
  }

function start() {
  train(epochs);
}

function reset() {
  clear();
  a=1;
  b=0;
  learningRate=0.01;
  epochs=100;
  writer();
  drawPoints(points,origoX, origoY);
  drawLine(a,b,origoX, origoY);
}

function drawPoints(points1,origoX, origoY) {
  var x1;
  var y1;
  fill(204, 101, 192, 127);
  stroke(127, 63, 120);
  for (var j=0; j<3; j++) {
    x1=map(points1[j][0],0,10,0,200);
    y1=map(points1[j][1],0,10,0,200);
    ellipse(x1+origoX, origoY-y1, 10, 10); 
  }
  noFill();
  stroke(0,0,0);
}


function drawLine(a,b,origoX, origoY) {
  // first point at x=0:
  k=k+5;
  var y = map(b,0,10,0,200,true);
  var pointsInLine = [[origoX,origoY-y]];
 //second point:
 if (a>=1) { 
  y=200; // correlates to y=10
  var x=(10-b)/a;
  x=map(x,0,10,0,200,true);
 }
 else {
  var x=200;
  y=a*10+b;
  y=map(y,0,10,0,200);
 }
  //draw line:
  var onePoint = [x+origoX,origoY-y];
  append(pointsInLine, onePoint);
  //fill(204, 101, 192, 127);
  stroke(0);
  line(pointsInLine[0][0],pointsInLine[0][1],pointsInLine[1][0],pointsInLine[1][1]);
 
}

function train(epochs) {
  epochs = aSlider.value();
  learningRate = bSlider.value()/1000;
  writer();
  epoch=0; 
  id= setInterval(oneTraining,1000);
}


function oneTraining() {
  epoch++;
  for (var j=0; j<3; j++) {
    y=a*points[j][0]+b;        
    error=points[j][1]-y;
    a=a+points[j][0]*error*learningRate;
    b=b+error*learningRate;
    }
  drawLine (a,b,origoX,origoY);
  if (epoch>=epochs) { //when number of epochs exceeds epochs target: stop
    clearInterval(id);
  }
}


function writer() {
  clearTextArea(); 
  noFill();
  rect(50,300,200,200); //coordinate system
  fill(0);
  drawPoints(points, origoX, origoY);
 // drawLine(a,b, origoX, origoY);
  textSize(20);
 text("Epochs",50,40);
 text("Learning rate",50,110);
   text("a: " + a, 50, 200);
text("b:" + b, 50, 220);
text("epoch: " + epoch, 50, 240);
text("learning rate:" + learningRate, 50, 260);

}

function clearTextArea() {
  fill(255); //white fill
    noStroke(); // no border
    rect(0,0,1000,290); //clears "Epochs"
    fill(0); //black fill return
    stroke(0); //black border return
}

function clearGraph() {
   fill(255); //white fill
    noStroke(); // no border
    rect(0,290,500,500); //clears graphing area
    fill(0); //black fill return
    stroke(0); //black border return
}

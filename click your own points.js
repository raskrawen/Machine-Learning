/*
For some reason, the script runs differently on certain (older?) browsers (Chrome).
*/

var learningRate=0.001;
var points = [[0,2],[2,5],[7,9]];
var a=1; // slope
var b=0; // intersection
var y=0;
var x=0;
var aSlider; //slider 
var epochsOld=0;
var epochs=10;  //start EPOCHS = number of iterations on the full dataset
var learningRateOld = 0;
var origoX = 50; //coordinate system origo X
var origoY = 500;  //coordinate system origo Y
var k=255;  // colour of dots
var epoch=0; //EPOCH number
var button1; //button for reset
var buttonStart; //button for train
var id; // delay function variable
var numberOfPoints = 0;

  
function setup() { // runs once
  createCanvas(600,600);
reset();
aSlider = createSlider(0,100,10); // slider. Numbers from 0 to 100, jumps of 10, EPOCHS.
  aSlider.position(50,50);
  bSlider = createSlider(0,100,10); //learning rate * 1000
  bSlider.position(50,120);
button1 = createButton ("reset");
button1.position(200,10);
button1.mousePressed(reset);
buttonStart = createButton ("train");
buttonStart.position(200,50);
buttonStart.mousePressed(start); //when "train" button is pressed run start function
  }

function mouseReleased() { //called every time mousebutton is released
if ((mouseX>50) && (mouseX<250) && (mouseY>300) && (mouseY<500)) {
   //is mouse clicked within graphing area?
  fill(204, 101, 192, 127); //purple fill
  stroke(127, 63, 120); //blackish  outline
  ellipse(mouseX, mouseY, 10, 10); //draw point
  
  //need to map points to 10x10 coordinate system
  var newX=map(mouseX,50,250,0,10);
  var newY=map(mouseY,500,300,0,10);
  
  saveAPoint(newX,newY); //save point in array
  numberOfPoints++; //increment nr o points counter
  }
//if (numberOfPoints == 3) { //print after three clicks
  //print(points);
//  stop = true;
//}  
}

function saveAPoint(x,y) {
  var onePoint = [];
  onePoint = [x,y];
  append (points,onePoint);
  console.log(points);
}


function start() {
  epochs = aSlider.value(); // read slider a.
  learningRate = bSlider.value()/1000; //read slider b.
  train(epochs,learningRate); //run train
}

function reset() {
  points = [[0,2],[2,5],[7,9]]; //usual three points
  numberOfPoints = 0; // number of extra points
  clear();
a=1; // reset slope
b=0; //reset intersection
//  learningRate=0.01;
//  epochs=10;
  writer(); // draw box 
  drawPoints(points,origoX, origoY); //draw points
  drawLine(a,b,origoX, origoY); //draw first line
  clearInterval(id); //stop delays
}

function drawPoints(points1,origoX, origoY) {
  var x1;
  var y1;
  fill(204, 101, 192, 127); //purple fill
  stroke(127, 63, 120);
  for (var j=0; j<3; j++) { // draw three points
    x1=map(points1[j][0],0,10,0,200);
    y1=map(points1[j][1],0,10,0,200);
    ellipse(x1+origoX, origoY-y1, 10, 10); 
  }
  fill(0); // black fill returns
  stroke(0,0,0);
}


function drawLine(a,b,origoX, origoY) {
  // first point at x=0:
  k=k+5; // not sure about the use of this
  var y = map(b,0,10,0,200,true); //true:= y cannot go outside boundaries
  var pointsInLine = [[origoX,origoY-y]];
 //second point:
 if (a>=1) { 
  y=200; // correlates to y=10
  var x=(10-b)/a;
  x=map(x,0,10,0,200,true); //true
 }
 else {
  var x=200; //x at max, x=10= 200 px
  y=a*10+b;
  y=map(y,0,10,0,200); //map y to pixels
 }
  //draw line:
  var onePoint = [x+origoX,origoY-y]; // point on line.
  append(pointsInLine, onePoint);
  //fill(204, 101, 192, 127);
  stroke(0);
  line(pointsInLine[0][0],pointsInLine[0][1],pointsInLine[1][0],pointsInLine[1][1]); // drawinf the line
}


function train(epochs,learningRate) {
    //epoch=0; 
  id= setInterval(oneTraining,500); //time between each EPOCH
}


function oneTraining() {
  epoch++;
  for (var j=0; j<3+numberOfPoints; j++) { //run for each dataset
    y=a*points[j][0]+b; //calculate guess Y-value from dataset       
    error=points[j][1]-y; //calculate real Y-value minus guess value
    a=a+points[j][0]*error*learningRate; //update slope with d(error)/d(a)* error * Learningrate
    b=b+error*learningRate; //update b with d(error)/d(b) * error * learningrate. d(error)/d(b)=0
    }
  drawLine (a,b,origoX,origoY);
  writer();
  if (epoch>=epochs) { //when number of epochs exceeds epochs target: stop
    clearInterval(id); //stop delays
    epoch=0; // reset epoch number
  }
}


function writer() {
  clearTextArea(); //function which clears text
  noFill(); //invisible fill
  rect(50,300,200,200); //coordinate system at 50, 300. Dimensions 200x200
  fill(0); //black fill
  drawPoints(points, origoX, origoY);
 // drawLine(a,b, origoX, origoY);
  textSize(20);
fill(0, 102, 153); // blue text
text("Epochs",50,40);
text("Learning rate",50,110);
text("a: " + a, 50, 200);
text("b:" + b, 50, 220);
text("epoch: " + epoch, 50, 240);
text("epochs: " + epochs, 50, 260);
text("learning rate:" + learningRate, 50, 280);
text("May not work properly in mobile browsers.", 50, 550);
}

function clearTextArea() {
  fill(255); //white fill
    noStroke(); // no border
    rect(0,0,1000,290); //clears "Epochs"
    rect(0,540,1000,600); // clears "May not work properly.." text
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

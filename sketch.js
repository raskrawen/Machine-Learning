var learningRate=0.001;
var epochs=100;
var points = [[0,0],[1,1],[3,7]];
var a=1;
var b=0;
var y=0;
var x=0;

function setup() {
  createCanvas(1000,1000);
  backgroundcolor
  for (var i=0; i<epochs; i++) { 
  for (var j=0; j<3; j++) {
    y=a*points[j][0]+b;        
    error=points[j][1]-y;
    a=a+points[j][0]*error*learningRate;
    b=b+error*learningRate;
  }
}
text(a, 200, 200);
text("b", 300, 300);
}

function draw() {
  rect(50,50,30,30);
}




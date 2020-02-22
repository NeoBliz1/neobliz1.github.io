var j = 0;
var c = 0;
var l = 50;//number of start drops
var xPositions = [200];
var yPositions = [0];
var xPositionsRock = [200];
var yPositionsRock = [-203];
var dropsObjArray = [];
let img; // Declare variable 'img'.

function setup() {   
  // canvas size (Integers only, please.)
  var canvas = createCanvas(400, 400);
    
  // Move the canvas so it’s inside our <div id="canvas-holder">.
  canvas.parent('canvasHolderSmall');
    
  // smooth edges
  smooth();
    
  // limit the number of frames per second
  frameRate(60);
  //creating color array
  
  colorMode(RGB);
  
	//loop is determining rain density
  while (j < l){
    j++;
    var newDropObj = { 
      xPositions: random(-228,158),   
      yPositions: random(-800,-200),
      color: color(random(255),random(255),random(255))
    }
    dropsObjArray.push (newDropObj);  
  }		
}

let cuteRock;
function preload() {
  cuteRock = loadImage('https://res.cloudinary.com/deah4rwon/image/upload/v1580977996/cuteRock_wfbb7c.png');
}

//loop add drop or rock
function mousePressed(event) {
  console.log(event);
  if ( event.button === 0){
    var newDropObj = { 
      xPositions: mouseX-241,   
      yPositions: mouseY-161,
      color: color(random(255),random(255),random(255))
    }
    dropsObjArray.push (newDropObj);      
  }
  else {
    xPositionsRock.push(mouseX);
    yPositionsRock.push(mouseY);
    console.log('clicked'); 
  }
  return false
}

function draw() {	
	
	//loop determining drop color  
  
  background(204, 247, 255);
       
  //loop rain engine
	for (var i = 0; i < dropsObjArray.length; i++) {
    noStroke();       
    var dropObj = dropsObjArray[i]; 
    fill(dropObj.color);    
    bezier(242+dropObj.xPositions, dropObj.yPositions+115, 233+dropObj.xPositions, dropObj.yPositions+138, dropObj.xPositions+250, dropObj.yPositions+146, dropObj.xPositions+241, dropObj.yPositions+114);                  
    dropObj.yPositions++;
    //restart rain engine
    if (dropObj.yPositions>400) {
    	dropObj.yPositions=random(-200,-130);
    }           
  }
  //loop rain of rock engine
  for (var q = 0; q < xPositionsRock.length; q++) {
  	//shape of drops
    image(cuteRock, xPositionsRock[q], yPositionsRock[q], 15, 30); 
    yPositionsRock[q] += 2;
    //restart rain engine
    if (yPositionsRock[q]>400) {
      yPositionsRock[q]=random(-200,-130);
    }           
  }
}

var createCodeSnippet = function () {
  var scriptText;
  $.get('https://res.cloudinary.com/deah4rwon/raw/upload/v1581477877/js/code_project3_xurmh5.txt', function (response) {
    scriptText = response;

    $('.snippetWrapper').html(scriptText);
  }); 
}
createCodeSnippet();
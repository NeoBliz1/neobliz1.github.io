/*This programm based on the project: Hoppy Bever Extreme
In this version has added next updates:
 - was change bever to the OhNoesGuy - done
 - was add sounds for OhNoesGuy hops - done
 - was add change gems to the gem - done
 - was add the screen of choose username  - done
 - was add level with holes in the ground - done
 - was add level include appearance enemies - done
 - was add change day and night - done
 - was add score screen - done
 - was add moving world acceleration*/

var dirtBlockUrl;
//check availability of the image's URLs

var externalUrls = {
  dirtBlockUrl : 'https://www.kasandbox.org/third_party/javascript-khansrc/live-editor/build/images/cute/DirtBlock.png'
}
var localUrls = {
  grassBlockUrl : '../../img/projects_Img/DirtBlock.png'
}

var checkImgUrl = function (varName, goto_url, errorUrl) {
  $.ajax({
    url:goto_url,
    type:'HEAD',
    error: function(){
      window[varName] = errorUrl;           
    },
    success: function(){
      window[varName] = goto_url;
    }
  });

}

//main game function
let gameSketch = function(p) {
  let dirtBlockImg;
  p.preload = function () {
    dirtBlockImg = p.loadImage(dirtBlockUrl);
  };
  p.setup = function() {    
    // canvas size
    var canvas = p.createCanvas(400, 400);
    // canvas.style.width = '100%', canvas.style.height = '100%';
  
    // Move the canvas so it’s inside our <div id='canvas-holder'>.
    canvas.parent('canvasHolderSmall');
      
    // smooth edges
    p.smooth();
      
    // limit the number of frames per second
    p.frameRate(60);
    //creating color array
    
    p.colorMode(p.RGB);    

    p.startConfig();
  };

  p.startConfig = function () {
    // when there is no predator, the fish swims forward
    // when a predator comes, an angry fish attacks a predator and eats it
    //prototypes
    var resetStartPos = 0;
    p.mouseX=-10;
    p.mouseY=-10;
    var redCol = 140;
    var greenCol = 140;
    var redColorArray = [];
    var greenColorArray = [];
    var dumbPredatorFishX = 500;
    //Prototypes
    //angry fish prototype
    {
      p.angryFishF = function() {
        this.mass = 20;
        this.G = 10.2;
        this.position = new PVector(0, 0);
        this.startPosition = new PVector(0, 0);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.dumbPredatorFishY = 0;
      };

      p.angryFishF.prototype.applyForce = function(force) {
        var f = PVector.div(force,this.mass);
        this.acceleration.add(f);
      };
      p.angryFishF.prototype.draw = function() {
        p.stroke(0);
        p.strokeWeight(2);
        p.fill(245, 5, 5);
        p.triangle(this.position.x+15, this.position.y,this.position.x-15, this.position.y-15,this.position.x-15, this.position.y+15);
        p.triangle(this.position.x-15, this.position.y,this.position.x-25, this.position.y-10,this.position.x-25, this.position.y+10);
        p.fill(0, 0, 0);
        p.quad(this.position.x-5, this.position.y-10,this.position.x-10, this.position.y-11,this.position.x-10, this.position.y+11, this.position.x-5, this.position.y+10);
        p.fill(240, 240, 240);
        p.ellipse(this.position.x, this.position.y-3, 5, 5);
      };
      p.angryFishF.prototype.calculateAttraction = function(mover) {
        // Calculate direction of force
        var force = PVector.sub(this.position, mover.position);
        // Distance between objects       
        var distance = force.mag();
        // Limiting the distance to eliminate "extreme"
        // results for very close or very far objects                            
        distance = constrain(distance, 5, 25);
        // Normalize vector                   
        force.normalize();
        // Calculate gravitional force magnitude  
        var strength = (this.G * this.mass * mover.mass) / (distance * distance);
        // Get force vector --> magnitude * direction
        force.mult(strength);
        return force;
      };
      var rx = 5;
      var ry = 5;
      var shyRadius=80;
      p.angryFishF.prototype.update = function() {
        if (dumbPredatorFishX < 400 && dumbPredatorFishX > 200){
          this.velocity.add(this.acceleration);
          this.position.add(this.velocity);
          this.velocity.limit(8.7);
          this.acceleration.mult(0);
        }
        else {
          var mouse = new PVector(this.startPosition.x+round(random(-rx,rx)), this.startPosition.y+round(random(-ry,ry)));
          var dir = PVector.sub(mouse, this.position);
          dir.normalize();
          dir.mult(0.046);
          this.acceleration = dir;
          this.velocity.add(this.acceleration);
          this.velocity.limit(1.0);
          this.position.add(this.velocity);
        }          
      };
    }
    //dumbPredator fish prototype
    {
      var DAF = 0;
      p.angryFishF.prototype.drawDumbPredator = function() {
         
        if (dumbPredatorFishX>200) {
          /*dumb shark*/
          //shark color
          var colorShark = p.color(86, 203, 232);
          //shark eye color
          var colorSharkEye = p.color(255, 255, 255);
          p.fill(colorShark);
          p.pushMatrix();
          //p.translate(this.dumbPredatorFishX,this.dumbPredatorFishY);
          p.translate(-280+this.position.x,-250+this.position.y);
          p.scale(1.35);
          p.stroke(0, 0, 0);
          //shark tail
          p.pushMatrix();
          p.translate(253,196);
          p.scale(0.25);
          p.strokeWeight(4);
          p.beginShape(); p.curveVertex(-60,-13);p.curveVertex(-41,5);p.curveVertex(-14,44);p.curveVertex(19,72);p.curveVertex(12,18);p.curveVertex(16,-3);p.curveVertex(35,-54);p.curveVertex(47,-86);p.curveVertex(-38,-40);p.curveVertex(-60,-13);p.curveVertex(-41,5);p.curveVertex(-14,44); p.endShape();
          p.popMatrix();
          p.strokeWeight(1);
          p.arc(210,189,40,50,-166,-78);
          p.nofill();
          p.arc(219,187,18,50,-166,-115);
          p.fill(colorShark);
          //top shark
          p.arc(200,200,100,50,-158,-31);
          //bot shark
          p.arc(200,182,100,50,-230,-203);
          p.arc(200,182,100,50,-326,-248);
          p.nostroke();
          p.arc(196,189,63,50,-212,-185);
          p.arc(190,179,100,50,-271,-259);
          p.arc(180,192,100,15,-282,-271);
          p.strokeWeight(1);
          //mouth
          p.line(168,201,185,196);
          p.line(181,205,185,196);
          //tooth
          p.stroke(122, 122, 122);
          p.fill(colorSharkEye);
          var ySharkTooth = 0;
          for (var i=0; i<3; i++){
            ySharkTooth -= 2;
            p.triangle(181+i,207+ySharkTooth,179+i,204+ySharkTooth,182+i,204+ySharkTooth);
          }
          for (var i=0; i<10; i+=2.9){
            ySharkTooth -= 0.9;
            p.triangle(173+i,210+ySharkTooth,169+i,208+ySharkTooth,172+i,207+ySharkTooth);
          }
          p.stroke(0, 0, 0);
          //eye
          p.ellipse(174,193,8,8);
          p.fill(0, 0, 0);
          p.ellipse(173,194,3,3);
          p.fill(colorShark);
          //bot fin
          p.arc(207,198,25,35,-250,-198);
          p.nofill();
          p.arc(215,213,22,35,-187,-134);
          p.fill(colorShark);
          p.nostroke();
          p.arc(222,192,39,35,-382,-348);
          p.popMatrix();
        }
        else {    
          //shark color
          var colorShark = p.color(255,255,255);
          //shark eye color
          var colorSharkEye = p.color(255, 255, 255);
          p.fill(colorShark);
          p.pushMatrix();    
          p.translate(-280+this.position.x,-250+this.position.y);
          p.scale(1.35);
          p.stroke(0, 0, 0);
          //shark tail
          p.pushMatrix();
          p.translate(253,196);
          p.scale(0.25);
          p.strokeWeight(4);
          p.beginShape(); p.curveVertex(-60,-13);p.curveVertex(-41,5);p.curveVertex(-14,44);p.curveVertex(19,72);p.curveVertex(12,18);p.curveVertex(16,-3);p.curveVertex(35,-54);p.curveVertex(47,-86);p.curveVertex(-38,-40);p.curveVertex(-60,-13);p.curveVertex(-41,5);p.curveVertex(-14,44); p.endShape();
          p.popMatrix();
          p.strokeWeight(1);    
          //top shark
          p.arc(196,200,92,50,-158,-91);
          //bot shark
          p.arc(196,182,93,50,-232,-203);
          p.arc(198,190,92,35,-259,-249);
          p.nofill();
          p.arc(180,187,34,50,-387,-308);
          p.nostroke();
          p.arc(196,189,63,50,-212,-185);
          p.arc(190,179,100,50,-271,-259);
          p.arc(180,192,100,15,-282,-271);
          p.fill(255, 255, 255);
          p.triangle(189,181,183,205,189,199);
          p.triangle(168,193,183,205,189,199);
          p.strokeWeight(1);
          //mouth
          p.line(168,201,185,196);
          p.line(181,205,185,196);
          //tooth
          p.stroke(122, 122, 122);
          p.fill(colorSharkEye);
          var ySharkTooth = 0;
          for (var i=0; i<3; i++){
            ySharkTooth -= 2;
            p.triangle(181+i,207+ySharkTooth,179+i,204+ySharkTooth,182+i,204+ySharkTooth);
          }
          for (var i=0; i<10; i+=2.9){
            ySharkTooth -= 0.9;
            p.triangle(173+i,210+ySharkTooth,169+i,208+ySharkTooth,172+i,207+ySharkTooth);
          }
          p.stroke(0, 0, 0);
          //eye
          p.ellipse(174,193,8,8);    
          p.fill(colorShark);    
          //skeleton
          p.nofill();
          p.arc(200,216,201,50,-91,-68);
          p.arc(200,213,201,50,-91,-67);
          var sharkSkeletonSize = 0;
          p.strokeWeight(1.5);
          for (var i=0; i<8; i+=1){
            p.arc(186+i*4.5,187,34,50,-387+sharkSkeletonSize,-308-sharkSkeletonSize);
            sharkSkeletonSize+=3.5;
          }
          p.popMatrix();
        }

        while (DAF<1){
          DAF++;
          this.position.x=round(random(500,800));
          this.position.y=round(random(50,350));
        }
        var speedShark = new PVector(1,0);
        this.position.sub(speedShark);
        dumbPredatorFishX=this.position.x;
        if (this.position.x<-80){
          DAF=0;
        }    
      };
    }
    //background gen prototype
    { 
      var backGrCol = function () {
      this.i = 0;};
      backGrCol.prototype.create = function() {
        while (this.i<410){
            redCol -= 0.30;
            greenCol -= 0.30;
            this.i++;
            redColorArray.push(redCol);
            greenColorArray.push(greenCol);        
        }
        // println(greenColorArray);
      };
      backGrCol.prototype.draw = function() {
        for (var j=0; j<redColorArray.length; j++){
            p.nostroke();
            p.fill(redColorArray[j], greenColorArray[j], 100);
            p.rect(0,j,400,10);
        }    
      };
    }
    //create background
    {
      var backGrColor = new backGrCol ();
      backGrColor.create ();
    }
    //background - ocean floor
    var speed=1.5; //speed moving ocen floor
    {   
      //bubbles draw function
      var max1=20;
      var min1=10;
      var bodyLength = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
      var bodyHeight = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
      var itemsQuantity = 30; // quantity of bubbles
      var oceanBubblesPosX = [];
      var oceanBubblesPosY = [];
      var bodySizeArray = [];
      var tx = 0;
      var ty = 9999;
      var xCoef = -331;
      var yCoef = -218;
      for (var i=0;i < itemsQuantity;i++){
          bodySizeArray.push(Math.floor(Math.random() * (max1 - min1 + 1)) + min1);
          var xStepSize = p.map(p.noise(tx),0,1,0,width*2.95);
          var yStepSize = p.map(p.noise(ty),0,1,0,height*2.95);
          oceanBubblesPosX.push(xStepSize);
          oceanBubblesPosY.push(yStepSize);
          tx += 0.58;
          ty += 0.26;
      }
      var bubblesDraw = function (){     
          for (var i=0;i < itemsQuantity;i++){
              p.nofill();
              p.stroke(0, 0, 0);
              p.ellipse(oceanBubblesPosX[i]-bodyLength/4+xCoef, oceanBubblesPosY[i]+yCoef, bodySizeArray[i]/1.5, bodySizeArray[i]/1.5);
              p.nostroke();
              p.fill(252, 252, 252);
              p.arc(oceanBubblesPosX[i]-bodyLength/3+xCoef, oceanBubblesPosY[i]+yCoef,bodySizeArray[i]/3, bodySizeArray[i]/3,111,260);
              oceanBubblesPosY[i]-=2.9;
              if (oceanBubblesPosY[i]<240){
                      oceanBubblesPosY[i]=round(random(600,700));
                  }
          }
          
      };
      
      //seaweed draw function
      {
          var seaweedXpos=113;
          var seaweedYpos=29;
          var seaweedXpos1=seaweedXpos;
          var seaweedYpos1=seaweedYpos;
          var oceanSeaweedX = [];
          for (var j=0;j<20;j++){
              oceanSeaweedX.push(round(random(j*30)));
          }
          var Seaweed = function () {
              for (var i=0;i<20;i++){
                  p.pushMatrix();
                  p.translate(oceanSeaweedX[i],190);
                  p.scale(0.36,0.5);
                      //seaweed1
                      {p.fill(25, 120, 1);
                          p.beginShape(); 
                              p.curveVertex(seaweedXpos+222,seaweedYpos+204);
                              p.curveVertex(seaweedXpos+227,seaweedYpos+221);
                              p.curveVertex(seaweedXpos+222,seaweedYpos+238);
                              p.curveVertex(seaweedXpos+235,seaweedYpos+245);
                              p.curveVertex(seaweedXpos+231,seaweedYpos+259);
                              p.curveVertex(seaweedXpos+221,seaweedYpos+273);
                              p.curveVertex(seaweedXpos+237,seaweedYpos+286);
                              p.curveVertex(seaweedXpos+221,seaweedYpos+299);
                              p.curveVertex(seaweedXpos+226,seaweedYpos+310);
                              p.curveVertex(seaweedXpos+228,seaweedYpos+325);
                              p.curveVertex(seaweedXpos+216,seaweedYpos+347);
                              p.curveVertex(seaweedXpos+204,seaweedYpos+343);
                              p.curveVertex(seaweedXpos+177,seaweedYpos+349);
                              p.curveVertex(seaweedXpos+176,seaweedYpos+316);
                              p.curveVertex(seaweedXpos+190,seaweedYpos+311);
                              p.curveVertex(seaweedXpos+181,seaweedYpos+293);
                              p.curveVertex(seaweedXpos+182,seaweedYpos+280);
                              p.curveVertex(seaweedXpos+200,seaweedYpos+274);
                              p.curveVertex(seaweedXpos+191,seaweedYpos+256);
                              p.curveVertex(seaweedXpos+202,seaweedYpos+239);
                              p.curveVertex(seaweedXpos+197,seaweedYpos+220);
                              p.curveVertex(seaweedXpos+205,seaweedYpos+206);
                              p.curveVertex(seaweedXpos+206,seaweedYpos+182);
                              p.curveVertex(seaweedXpos+222,seaweedYpos+204);
                              p.curveVertex(seaweedXpos+227,seaweedYpos+221);
                              p.curveVertex(seaweedXpos+222,seaweedYpos+238); 
                          p.endShape();}
                      //seaweed2
                      {
                          p.pushMatrix();
                          p.fill(133, 194, 2);
                          p.translate(269,-43);
                          p.scale(0.26,0.9);
                          rotate(20);
                          p.beginShape(); 
                              p.curveVertex(seaweedXpos1+222,seaweedYpos1+204);
                              p.curveVertex(seaweedXpos1+227,seaweedYpos1+221);
                              p.curveVertex(seaweedXpos1+222,seaweedYpos1+238);
                              p.curveVertex(seaweedXpos1+235,seaweedYpos1+245);
                              p.curveVertex(seaweedXpos1+231,seaweedYpos1+259);
                              p.curveVertex(seaweedXpos1+221,seaweedYpos1+273);
                              p.curveVertex(seaweedXpos1+237,seaweedYpos1+286);
                              p.curveVertex(seaweedXpos1+221,seaweedYpos1+299);
                              p.curveVertex(seaweedXpos1+226,seaweedYpos1+310);
                              p.curveVertex(seaweedXpos1+228,seaweedYpos1+325);
                              p.curveVertex(seaweedXpos1+216,seaweedYpos1+347);
                              p.curveVertex(seaweedXpos1+204,seaweedYpos1+343);
                              p.curveVertex(seaweedXpos1+177,seaweedYpos1+349);
                              p.curveVertex(seaweedXpos1+176,seaweedYpos1+316);
                              p.curveVertex(seaweedXpos1+190,seaweedYpos1+311);
                              p.curveVertex(seaweedXpos1+181,seaweedYpos1+293);
                              p.curveVertex(seaweedXpos1+182,seaweedYpos1+280);
                              p.curveVertex(seaweedXpos1+200,seaweedYpos1+274);
                              p.curveVertex(seaweedXpos1+191,seaweedYpos1+256);
                              p.curveVertex(seaweedXpos1+202,seaweedYpos1+239);
                              p.curveVertex(seaweedXpos1+197,seaweedYpos1+220);
                              p.curveVertex(seaweedXpos1+205,seaweedYpos1+206);
                              p.curveVertex(seaweedXpos1+206,seaweedYpos1+182);
                              p.curveVertex(seaweedXpos1+222,seaweedYpos1+204);
                              p.curveVertex(seaweedXpos1+227,seaweedYpos1+221);
                              p.curveVertex(seaweedXpos1+222,seaweedYpos1+238);
                          p.endShape();
                         p.popMatrix();
                          }
                  p.popMatrix();
                  oceanSeaweedX[i]-=speed;
                  if (oceanSeaweedX[i]<-140){
                      oceanSeaweedX[i]=400;
                  }
              }
      };   
      }
      //ocean floor draw function
      {
          var oceanFloorX = [];
          for (var j=0;j<20;j++){
              oceanFloorX.push(j*30);
          }
          
          var oceanFloorDraw = function () {
              bubblesDraw ();
              Seaweed();
              for (var i=0;i<oceanFloorX.length;i++){
                  p.image(dirtBlockImg,oceanFloorX[i],360,33,40);
                  oceanFloorX[i]-=speed;
                  if (oceanFloorX[i]<-40){
                      oceanFloorX[i]=400;
                  }
              }
          };
      }
    }
    //create angry fish array
    {
      var x=0;
      var y=0;
      var n=0;
      var angryFishNum = 10;
      var angryFishPos = [0];
      //create pos array
      for (var i=0; i<angryFishNum/2; i++){
          x++;
             for (var j=0; j<angryFishNum/2; j++){
                  y++;
                  n++;
                  angryFishPos[n] = new PVector(125+i*46,131+j*35);
                  
             }
      }
      angryFishPos.splice(25,1);
      angryFishPos.splice(24,1);
      angryFishPos.splice(22,1);
      angryFishPos.splice(21,1);
      angryFishPos.splice(20,1);
      angryFishPos.splice(16,1);
      angryFishPos.splice(10,1);
      angryFishPos.splice(6,1);
      angryFishPos.splice(5,1);
      angryFishPos.splice(4,1);
      angryFishPos.splice(2,1);
      angryFishPos.splice(1,1);
      angryFishPos.splice(0,1);
      //println(angryFishPos.length);

      //create angry fish
      var angryFish = [];

      for (var i=0; i<angryFishPos.length; i++){ 
        angryFish[i] = new angryFishF();
        angryFish[i].position.add(angryFishPos[i]);
        angryFish[i].startPosition.add(angryFish[i].position);
      }
    }
    //create dumbPredator fish
    var dumbPredator = new angryFishF();
  }; 

  //main programm
  p.draw = function() {
    background(255, 255, 255);
    backGrColor.draw ();
    oceanFloorDraw ();
    dumbPredator.drawDumbPredator();
    for (var i = 0; i < angryFish.length; i++) {
      var force = dumbPredator.calculateAttraction(angryFish[i]);
      angryFish[i].applyForce(force);
      angryFish[i].update(dumbPredator);
      angryFish[i].draw();
    }  
  };

  $('#canvasHolderSmall').contextmenu(function() {
    return false;
  }).css({
    'touch-action': 'manipulation',
    '-webkit-touch-callout': 'none', /* iOS Safari */
    '-webkit-user-select': 'none', /* Safari */
    ' -khtml-user-select': 'none', /* Konqueror HTML */
       '-moz-user-select': 'none', /* Old versions of Firefox */
        '-ms-user-select': 'none', /* Internet Explorer/Edge */
            'user-select': 'none' /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  });
};

//check availability of the code txt version URL
var checkTxtUrl = function () {
  var txt_url = 'https://res.cloudinary.com/deah4rwon/raw/upload/v1602429596/js/code_project5_y5z2m7.txt'; 
  $.ajax({
    url:txt_url,
    type:'HEAD',
    error: function(){
      $('.snippetWrapper').load('../../txt/code_project5.txt');
    },
    success: function(){
      $('.snippetWrapper').load('https://res.cloudinary.com/deah4rwon/raw/upload/v1602429596/js/code_project5_y5z2m7.txt');
    }
  });   
}



//****main_programm*****
checkTxtUrl();
var externalUrlsArray = Object.values(externalUrls);
var localUrlsArray = Object.values(localUrls);
var urlKeys = Object.keys(externalUrls);
for (var i = 0; i < urlKeys.length; i++) {
  checkImgUrl(urlKeys[i], externalUrlsArray[i], localUrlsArray[i]);    
}

//waiting until ajax is will complete, after that draw sketch is started
var ajaxComplete = 0;
$(document).ajaxComplete(function(){
  ajaxComplete++;  
  // console.log(ajaxComplete)
  if (ajaxComplete === 3){
    p5.disableFriendlyErrors = true; // disables FES
    let myp5 = new p5(gameSketch);
  }  
});





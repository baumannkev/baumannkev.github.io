let timer = 1000;
let nextChange = timer; //syncs the timer and change rate


var stage = 0;
// 0 = splash
// 1 = level 1
// win screen
// 2 = level 2
// 3 = level 3
let font, fontsize = 40;
let minDiameter = 30;
let maxDiameter = 60;
// for red, green, and blue color values
let r, g, b;
let xdirection = 1; // Left or Right
let ydirection = 1; // Top to Bottom


let fruits = []; // array of fruits
let numOfFruits = 30;



let bombs = [];
let easyButton;
let mediumButton;
let hardButton;
let startButton;

// text('Choose your difficulty', width/2, 510);
//   easyButton = createButton('Easy');
//   easyButton.position(width/2 + 200, 650);
//   mediumButton = createButton('Medium');
//   mediumButton.position(width/2 + 300, 650);
//   hardButton = createButton('Hard');
//   hardButton.position(width/2 + 400, 650);
	
// 	//text('CLICK THE SCREEN TO START', width/2, 590);
//   startButton = createButton('Click Here To Start');
//   startButton.position(width/2 + 280, 800);
//   //startButton.mousePressed(level1);
	

// Create a variable for button object
var color_button;
let entry1;
let radio1;

// A sound file object
let dingdong;
var music;
var bombAnim;
let bombSound;

let fruitImages = [];

//Counters
var totalTime; //totat time of program running
var splashTime; //amount of time on splashscreen only
var gameTime; //amount of time in game only
var timeLimit = 10; //how much time do you have to succeed?

let points = 0; //Number of points accumulated
let bombsHit = 0; //number of bombs clicked
let fruitsHit = 0; //number of fruits clicked

// Multimedia
var landscape;
function preload() {
  landscape = loadImage("Images/projects/Fruits Game/fruitsBack.png");
  music = loadSound("sounds/music.wav");
  winImage = loadImage("Images/banner.png");

  bombAnim = loadAnimation("Images/projects/Fruits Game/sprites/bomba/aliendropping0001.png", "Images/projects/Fruits Game/sprites/bomba/aliendropping0002.png", "Images/projects/Fruits Game/sprites/bomba/aliendropping0003.png",
    "Images/projects/Fruits Game/sprites/bomba/aliendropping0004.png", "Images/projects/Fruits Game/sprites/bomba/aliendropping0005.png", "Images/projects/Fruits Game/sprites/bomba/aliendropping0006.png",
    "Images/projects/Fruits Game/sprites/bomba/aliendropping0007.png", "Images/projects/Fruits Game/sprites/bomba/aliendropping0008.png", "Images/projects/Fruits Game/sprites/bomba/aliendropping0009.png");

  bombImage = loadImage("Images/projects/Fruits Game/sprites/bomb64.png");

  fruitImages[0] = loadImage("Images/projects/Fruits Game/sprites/red-apple.png");
  fruitImages[1] = loadImage("Images/projects/Fruits Game/sprites/red-cherry.png")
  fruitImages[2] = loadImage("Images/projects/Fruits Game/sprites/green-apple.png")
  fruitImages[3] = loadImage("Images/projects/Fruits Game/sprites/banana.png")
  fruitImages[4] = loadImage("Images/projects/Fruits Game/sprites/black-berry-light.png")
  fruitImages[5] = loadImage("Images/projects/Fruits Game/sprites/green-grape.png")
  fruitImages[6] = loadImage("Images/projects/Fruits Game/sprites/strawberry.png")
  fruitImages[7] = loadImage("Images/projects/Fruits Game/sprites/watermelon.png")
  fruitImages[8] = loadImage("Images/projects/Fruits Game/sprites/lemon.png")
  fruitImages[9] = loadImage("Images/projects/Fruits Game/sprites/orange.png")
  fruitImages[10] = loadImage("Images/projects/Fruits Game/sprites/peach.png")

}

// function change_amount_of_fruits_to_10() {
//   numOfFruits = 10;
//   setup();
// }

var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(1000, 800);
  centerCanvas();
  rectMode(CENTER);
	textAlign(CENTER);
  imageMode(CENTER);
  background(255, 0, 200);
  
  music.loop();
  noStroke();
  frameRate(60);
  ellipseMode(RADIUS);

  // Create the button
  // color_button = createButton("10 Bubbles");
  // // Position the button
  // color_button.position(200, 20);

  // color_button.mouseClicked(change_amount_of_fruits_to_10);

  textAlign(10, 10);
  r = random(255);
  g = random(255);
  b = random(255);
  // Set the starting position of the shape
  for (let i = 0; i < numOfFruits; i++) {
    var r = floor(random(0, fruitImages.length));
    fruits.push(new Fruit(fruitImages[r]));
    bombs.push(new Bomb(bombImage));
  }

  function windowResized() {
    centerCanvas();
  }

  // Load the sound file.
  // We have included both an MP3 and an OGG version.

  soundFormats('mp3', 'ogg', 'wav');
  dingdong = loadSound('sounds/coin.wav');
  bombSound = loadSound('sounds/bomb.mp3');
}

// function hideButtons() {
//   easyButton.hide();
//   mediumButton.hide();
//   hardButton.hide();
//   startButton.hide();
// }

function mousePressed() {
  // if (startButton.mousePressed()){
  //   hideButtons();
  //   stage = 1;
  // }
  // bombs[0].display();
  for (let i = 0; i < fruits.length; i++) {
    fruits[i].clicked();
  }

  for (let i = 0; i < bombs.length; i++) {
    bombs[i].clicked();
  }
}



function draw() {
  if(stage == 0){
		splash();
	}//close = 0

  if(stage == 1){
		level1();
	}//close = 1

  if (stage == 3){
    loseScreen();
  }

  if (stage == 4){
    winScreen();
  }

  if (fruits.length == 0){
    gameTime = gameTime;
    stage = 4;
  }
  

  if (mouseIsPressed == true && stage != 4){
		stage = 1;
	}//click starts game

  totalTime = millis(); //start timer

  // background(100, 0, 0);
  // fill(210, 100, 0);

  ///////////////////////////////////////////splash
function splash(){
	
	//timer stuff
	splashTime = totalTime;//begin splashscreen timer
	
	//appearance of game
	background(150, 230, 240); //sky blue
	image(landscape, width / 2, height/ 2, width, height);
	
	//title
	//textFont();
	fill(255);
	stroke(0);
	strokeWeight(4);
	textSize(30);
	text('Fruits Game', width/2, 120);
	textSize(30);
	text('BY: Kevin Baumann', width/2, 180);
	
	//instructions
	text('HOW TO PLAY:', width/2, 270);
	text('Click all the fruits on the screen!', width/2, 330);
	text('WATCH OUT FOR BOMBS', width/2, 380);
  text('EACH BOMB CLICKED IS - 10 POINTS', width/2, 420);
  
	text('OBTAIN ALL FRUITS AS FAST AS YOU CAN', width/2, 480);
  text('CLICK THE SCREEN TO START THE GAME', width/2, 630);
  
}//close splash

///////////////////////////////////////////level1
function level1(){
  clear();
  background(150, 230, 240); //sky blue
  //window frame
	noFill();
	stroke(0);
	strokeWeight(2);
	rect(width/2, height/2, width, height);

  //text(`${round(millis() / 1000)} seconds have gone by!`, 20, 100);
  //text('Points: ' + points, 100, 80);
  for (let i = 0; i < fruits.length; i++) {
    fruits[i].move();
    fruits[i].display();
    if (fruits[i].pressed == true) {
      fruits.splice(i, 1);
    }

    // if (millis() > nextChange) {
    // bombs[0].display();
    // nextChange = millis() + timer;
    // console.log(`time elapsed: ${round(millis() / 1000)}`);
    // }
  }

  for (let i = 0; i < bombs.length; i++) {
    bombs[i].display();

    if (bombs[i].pressed == true) {
      bombs.splice(i, 1);
    }
  }
  //scoreboard
	//textFont(marioFont);
	fill(255);
	stroke(0);
	strokeWeight(2);
	textSize(20);
	text('POINTS: ', 50, 50);
	text(points, 110, 50); 

  gameTime = int((totalTime-splashTime)/1000); //convert to seconds and integer
  text(gameTime, 700, 50); //display  timer
	
	//textFont(marioFont);
	fill(255);
	stroke(0);
	strokeWeight(2);
	textSize(30);
	text('TIME:', 600, 50);
}

function winScreen(){
	image(landscape, width/2, height/2, width, height);
	//textFont(marioFont);
	fill(255);
	stroke(0);
	strokeWeight(5);
	textSize(100);
	text('YOU WIN', width/2, 200);
  textSize(40);
  strokeWeight(2);
  text('Points:' + points, width/2, 370);
	text('Time: ' + gameTime + " seconds", width/2, 430);
  
	text('Number of fruits hit: ' + fruitsHit, width/2, 480);
	text('Number of bombs hit: ' + bombsHit, width/2, 530);

  text('Refresh to play again', width/2, 700);
  if (mouseIsPressed == true) {
    stage = 0;
  }

}//close you win function
// function loseScreen() {
//   image(landscape, width/2, height/2, width, height);
// 	//textFont(marioFont);
// 	fill(255);
// 	stroke(0);
// 	strokeWeight(10);
// 	textSize(200);
// 	text('YOU LOSE', width/2, height/2);
// }

  // var timeElapsed = millis() - lastPrint;
  // //console.log(timeElapsed);

  // if (timeElapsed > 3000) {
  //   i++;
  //   console.log(i);
  //   lastPrint = millis();
  // }

  // for (let i = 0; i < bombs.length; i++) {
  //   if (millis() > nextChange) {
  //     bombs[i].display();
  //     // nextChange = millis() + timer;
  //     // console.log(`time elapsed: ${round(millis() / 1000)}`);
  //   }
  // }

  // winScreen();
}

// class Object {
//   constructor(img){
//     this.x = random(width);
//     this.y = random(height);
//     this.diameter = 30;
//     this.img = img;
//     this.pressed = false;
//   }
// }

// Jitter class
class Fruit  {
  constructor(img) {
    strokeWeight(2);
    stroke(r, g, b);
    this.col = color(random(255), random(255), random(255));
    this.speed = random(1, 5);
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(minDiameter, maxDiameter);
    this.xspeed = this.speed;
    this.yspeed = this.speed;
    this.xdirection = random(-5, 5);
    this.ydirection = random(-5, 5);
    this.pressed = false;
    this.img = img;
  }

  clicked() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < (this.diameter)) {
      this.col = color(random(255), random(255), random(255));
      this.pressed = true;
      console.log("Fruits: ", fruits);
      dingdong.play();
      fruitsHit++;
      if (this.diameter < (minDiameter + 5)) {
        points += 10;
      } else if (15 <= this.diameter <= 30) { points += 5; }

      if (4.5 < this.speed <= 5) {
        points += 10;
      } else if (1 <= this.speed <= 4.5) { points += 5; }
    }
  }

  move() {
    // Update the position of the shape
    this.x += this.xdirection;
    this.y += this.ydirection;
    // Test to see if the shape exceeds the boundaries of the screen
    // If it does, reverse its direction by multiplying by -1
    if (this.x > width || this.x < this.diameter) {
      this.xdirection *= -1;
    }
    if (this.y > height || this.y < this.diameter) {
      this.ydirection *= -1;
    }
  }
  display() {
    fill(this.col);
    image(this.img, this.x, this.y, this.diameter, this.diameter);
    // ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

class Bomb {
  constructor(img) {
    this.x = random(width);
    this.y = random(height);
    this.diameter = 30;
    this.img = img;
    this.pressed = false;
  }

  display() {
    //fill(this.col);
    image(this.img, this.x, this.y, this.diameter, this.diameter);
    // ellipse(this.x, this.y, this.diameter, this.diameter);
  }

  clicked() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < (this.diameter)) {
      bombsHit++;
      points -= 10;
      this.col = color(random(255), random(255), random(255));
      this.pressed = true;
      console.log("Bombs: ", bombs);
      bombSound.play();
      //stage = 3;
    }
  }
}

////////////////////////////////////////////////////////////////////// winScreen
// function winScreen() {
//   if (fruits.length == 0) {
//     fill(255);
//     stroke(0);
//     strokeWeight(10);
//     textSize(50);
//     text("YOU WIN", width / 2, height / 2);


//     createSpan("What's your name? ", width / 2, height / 2); //label for entry1
//     // createInput([value], [type])
//     // type: "text" (default), "number",
//     // "date", "password", "email", etc.
//     entry1 = createInput();
//     //If text in the entry field changes, call
//     //the entryCallback function.
//     entry1.changed(entryCallback);
//   }
// }

// class Ball {
//   constructor(x, y, r) {
//     this.position = new p5.Vector(x, y);
//     this.velocity = p5.Vector.random2D();
//     this.velocity.mult(3);
//     this.r = r;
//     this.m = r * 0.1;
//   }
//   update() {
//     this.position.add(this.velocity);
//   }

//   checkBoundaryCollision() {
//     if (this.position.x > width - this.r) {
//       this.position.x = width - this.r;
//       this.velocity.x *= -1;
//     } else if (this.position.x < this.r) {
//       this.position.x = this.r;
//       this.velocity.x *= -1;
//     } else if (this.position.y > height - this.r) {
//       this.position.y = height - this.r;
//       this.velocity.y *= -1;
//     } else if (this.position.y < this.r) {
//       this.position.y = this.r;
//       this.velocity.y *= -1;
//     }
//   }

//   checkCollision(other) {
//     // Get distances between the balls components
//     let distanceVect = p5.Vector.sub(other.position, this.position);

//     // Calculate magnitude of the vector separating the balls
//     let distanceVectMag = distanceVect.mag();

//     // Minimum distance before they are touching
//     let minDistance = this.r + other.r;

//     if (distanceVectMag < minDistance) {
//       let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
//       let d = distanceVect.copy();
//       let correctionVector = d.normalize().mult(distanceCorrection);
//       other.position.add(correctionVector);
//       this.position.sub(correctionVector);

//       // get angle of distanceVect
//       let theta = distanceVect.heading();
//       // precalculate trig values
//       let sine = sin(theta);
//       let cosine = cos(theta);

//       /* bTemp will hold rotated ball this.positions. You 
//        just need to worry about bTemp[1] this.position*/
//       let bTemp = [new p5.Vector(), new p5.Vector()];

//       /* this ball's this.position is relative to the other
//        so you can use the vector between them (bVect) as the 
//        reference point in the rotation expressions.
//        bTemp[0].this.position.x and bTemp[0].this.position.y will initialize
//        automatically to 0.0, which is what you want
//        since b[1] will rotate around b[0] */
//       bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y;
//       bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x;

//       // rotate Temporary velocities
//       let vTemp = [new p5.Vector(), new p5.Vector()];

//       vTemp[0].x = cosine * this.velocity.x + sine * this.velocity.y;
//       vTemp[0].y = cosine * this.velocity.y - sine * this.velocity.x;
//       vTemp[1].x = cosine * other.velocity.x + sine * other.velocity.y;
//       vTemp[1].y = cosine * other.velocity.y - sine * other.velocity.x;

//       /* Now that velocities are rotated, you can use 1D
//        conservation of momentum equations to calculate 
//        the final this.velocity along the x-axis. */
//       let vFinal = [new p5.Vector(), new p5.Vector()];

//       // final rotated this.velocity for b[0]
//       vFinal[0].x =
//         ((this.m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) /
//         (this.m + other.m);
//       vFinal[0].y = vTemp[0].y;

//       // final rotated this.velocity for b[0]
//       vFinal[1].x =
//         ((other.m - this.m) * vTemp[1].x + 2 * this.m * vTemp[0].x) /
//         (this.m + other.m);
//       vFinal[1].y = vTemp[1].y;

//       // hack to avoid clumping
//       bTemp[0].x += vFinal[0].x;
//       bTemp[1].x += vFinal[1].x;

//       /* Rotate ball this.positions and velocities back
//        Reverse signs in trig expressions to rotate 
//        in the opposite direction */
//       // rotate balls
//       let bFinal = [new p5.Vector(), new p5.Vector()];

//       bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
//       bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
//       bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
//       bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

//       // update balls to screen this.position
//       other.position.x = this.position.x + bFinal[1].x;
//       other.position.y = this.position.y + bFinal[1].y;

//       this.position.add(bFinal[0]);

//       // update velocities
//       this.velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
//       this.velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
//       other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
//       other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
//     }
//   }

//   display() {
//     noStroke();
//     fill(204);
//     ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
//   }
// }
// let balls = [new Ball(100, 400, 20), new Ball(700, 400, 80), new Ball(200, 400, 20)];
// console.log(balls);
// function setup() {
//   createCanvas(710, 400);
// }

// function draw() {
//   background(51);
//   for (let i = 0; i < balls.length; i++) {
//     let b = balls[i];
//     b.update();
//     b.display();
//     b.checkBoundaryCollision();
//     balls[0].checkCollision(balls[1]);
//   }
// }

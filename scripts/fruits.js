let font, fontsize = 40;

// for red, green, and blue color values
let r, g, b;
let xdirection = 1; // Left or Right
let ydirection = 1; // Top to Bottom

let points = 0;
let fruits = []; // array of fruits
let numOfFruits = 50;

// Create a variable for button object
var color_button;

// A sound file object
let dingdong;
var music;

function preload() {
  music = loadSound("sounds/music.wav");
}

function mousePressed() {
  for (let i = 0; i < fruits.length; i++) {
    fruits[i].clicked();
  }
}

function change_amount_of_fruits_to_10() {
  numOfFruits = 10;
  setup();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
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
    fruits.push(new Fruit());
  }

  // Load the sound file.
  // We have included both an MP3 and an OGG version.

  soundFormats('mp3', 'ogg', 'wav');
  dingdong = loadSound('sounds/coin.wav');
  

}

function draw() {
  background(0, 0, 0);
  fill(255);
  text('Points: ' + points, 100, 80);

  for (let i = 0; i < fruits.length; i++) {
    fruits[i].move();
    fruits[i].display();

    if (fruits[i].pressed == true) {
      fruits.splice(i, 1);
    }
  }
}

// Jitter class
class Fruit {
  constructor() {
    strokeWeight(2);
    stroke(r, g, b);
    this.col = color(random(255), random(255), random(255));
    // fill(r, g, b, 200);

    this.speed = random(1,5);
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.xspeed = this.speed;
    this.yspeed = this.speed;
    this.xdirection = random(-5, 5);
    this.ydirection = random(-5, 5);
    this.pressed = false;
    this.lifespan = 255;
  }

  clicked() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < (this.diameter)) {
      this.col = color(random(255), random(255), random(255));
      this.pressed = true;
      dingdong.play();
      if (this.diameter < 15 ){
        points += 10;
      } else if (15 <= this.diameter <= 30 ){points += 5;}

      if (4.5 < this.speed <= 5){
        points += 10;
      } else if (1 <= this.speed <= 4.5){points += 5;}
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
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

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

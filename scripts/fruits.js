// Enhanced Fruits Game with Levels, Lives, Pause, Better UI, and Game History
let timer = 1000;
let nextChange = timer;

let stage = 0; // 0 = splash, 1 = game, 2 = win, 3 = lose
let font, fontsize = 40;
let minDiameter = 30;
let maxDiameter = 60;
let fruits = []; // array of fruits
let bombs = []; // array of bombs
let numOfFruits = 10; // default fruit count for level 1

// Levels, Lives, and Game State
let level = 1;
let lives = 3;
let isPaused = false;
let gameHistory = []; // To store the last 5 game results

// Multimedia
let fruitImages = [];
let bombImage, landscape, music, dingdong, bombSound;

// Game Variables
let points = 0;
let bombsHit = 0;
let fruitsHit = 0;
let totalTime = 0;
let splashTime = 0;
let gameTime = 0;

function preload() {
  landscape = loadImage("Images/projects/Fruits Game/fruitsBack.png");
  music = loadSound("sounds/music.wav");
  dingdong = loadSound("sounds/coin.wav");
  bombSound = loadSound("sounds/bomb.mp3");
  bombImage = loadImage("Images/projects/Fruits Game/sprites/bomb64.png");

  // Load fruit images
  for (let i = 0; i < 14; i++) {
    fruitImages[i] = loadImage(`Images/projects/Fruits Game/sprites/fruit${i + 1}.png`);
  }
}

function setup() {
  createCanvas(1080, 720);
  textAlign(CENTER);
  imageMode(CENTER);
  music.loop();
  initGameObjects();
}

function draw() {
  if (stage === 0) {
    splashScreen();
  } else if (stage === 1) {
    if (!isPaused) {
      gameScreen();
    } else {
      pauseScreen();
    }
  } else if (stage === 2) {
    winScreen();
  } else if (stage === 3) {
    loseScreen();
  }
}

function initGameObjects() {
  fruits = [];
  bombs = [];
  for (let i = 0; i < numOfFruits; i++) {
    let img = random(fruitImages);
    fruits.push(new Fruit(img));
  }
  for (let i = 0; i < numOfFruits / 2; i++) {
    bombs.push(new Bomb(bombImage));
  }
}

function splashScreen() {
  background(150, 230, 240);
  image(landscape, width / 2, height / 2, width, height);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(50);
  text("Fruits Game", width / 2, 120);

  textSize(30);
  text("HOW TO PLAY:", width / 2, 270);
  text("Click all the fruits to score points!", width / 2, 320);
  text("Avoid clicking bombs (-10 points).", width / 2, 370);
  text("Clear all fruits to win!", width / 2, 420);
  text("You have 3 lives. Don't lose them all!", width / 2, 470);

  textSize(25);
  text("Click anywhere to start.", width / 2, 550);

  displayGameHistory();

  if (mouseIsPressed) {
    stage = 1;
    splashTime = millis();
  }
}

function gameScreen() {
  background(150, 230, 240);
  totalTime = millis();

  for (let i = fruits.length - 1; i >= 0; i--) {
    fruits[i].move();
    fruits[i].display();
    if (fruits[i].pressed) {
      fruits.splice(i, 1);
      fruitsHit++;
      points += 10;
    }
  }

  for (let i = bombs.length - 1; i >= 0; i--) {
    bombs[i].display();
    if (bombs[i].pressed) {
      bombs.splice(i, 1);
      bombsHit++;
      points -= 10;
      lives--;
    }
  }

  displayScoreboard();

  if (lives <= 0) {
    saveGameResult(false);
    stage = 3;
  } else if (fruits.length === 0) {
    saveGameResult(true);
    nextLevel();
  }
}

function pauseScreen() {
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);
  fill(255);
  textSize(50);
  text("PAUSED", width / 2, height / 2);
  textSize(30);
  text("Press 'P' to Resume", width / 2, height / 2 + 50);
}

function winScreen() {
  background(0, 200, 0);
  fill(255);
  textSize(50);
  text("YOU WIN!", width / 2, height / 2 - 100);
  textSize(30);
  text(`Points: ${points}`, width / 2, height / 2);
  text(`Time: ${gameTime} seconds`, width / 2, height / 2 + 50);
  text("Click anywhere to return to the main menu.", width / 2, height / 2 + 100);

  if (mouseIsPressed) {
    resetGame();
  }
}

function loseScreen() {
  background(200, 0, 0);
  fill(255);
  textSize(50);
  text("GAME OVER", width / 2, height / 2 - 100);
  textSize(30);
  text(`Points: ${points}`, width / 2, height / 2);
  text("Click anywhere to return to the main menu.", width / 2, height / 2 + 50);

  if (mouseIsPressed) {
    resetGame();
  }
}

function displayScoreboard() {
  fill(255);
  textSize(20);
  text(`Points: ${points}`, 100, 50);
  text(`Lives: ${lives}`, 300, 50);
  text(`Level: ${level}`, 500, 50);
  text(`Fruits Left: ${fruits.length}`, 700, 50);
}

function displayGameHistory() {
  textSize(20);
  fill(255);
  text("Last 5 Games:", width / 2, height - 150);
  for (let i = 0; i < gameHistory.length; i++) {
    text(
      `${i + 1}. ${gameHistory[i].result} - Points: ${gameHistory[i].points}, Level: ${gameHistory[i].level}`,
      width / 2,
      height - 120 + i * 20
    );
  }
}

function saveGameResult(didWin) {
  const result = {
    result: didWin ? "Win" : "Loss",
    points,
    level
  };
  gameHistory.unshift(result);
  if (gameHistory.length > 5) gameHistory.pop();
}

function resetGame() {
  stage = 0;
  points = 0;
  lives = 3;
  level = 1;
  numOfFruits = 10;
  initGameObjects();
}

function mousePressed() {
  if (stage === 1 && !isPaused) {
    for (let fruit of fruits) {
      fruit.clicked();
    }
    for (let bomb of bombs) {
      bomb.clicked();
    }
  }
}

function keyPressed() {
  if (stage === 1) {
    if (key === 'P' || key === 'p') {
      isPaused = !isPaused;
    }
  }
}

function nextLevel() {
  level++;
  numOfFruits += 5;
  initGameObjects();
}

// Fruit Class
class Fruit {
  constructor(img) {
    this.img = img;
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(minDiameter, maxDiameter);
    this.xspeed = random(-3, 3);
    this.yspeed = random(-3, 3);
    this.pressed = false;
  }

  clicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.diameter / 2) {
      this.pressed = true;
      dingdong.play();
    }
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    if (this.x < 0 || this.x > width) this.xspeed *= -1;
    if (this.y < 0 || this.y > height) this.yspeed *= -1;
  }

  display() {
    image(this.img, this.x, this.y, this.diameter, this.diameter);
  }
}

// Bomb Class
class Bomb {
  constructor(img) {
    this.img = img;
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(minDiameter, maxDiameter);
    this.pressed = false;
  }

  clicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.diameter / 2) {
      this.pressed = true;
      bombSound.play();
    }
  }

  display() {
    image(this.img, this.x, this.y, this.diameter, this.diameter);
  }
}

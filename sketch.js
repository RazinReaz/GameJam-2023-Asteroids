
let ship;

function keyPressed() {
  if (keyCode == UP_ARROW) {
    ship.moveDirection = +1;
    // thrustSound.play();
  }
  if (keyCode == DOWN_ARROW)
    ship.moveDirection = -1;
  if (keyCode == RIGHT_ARROW)
    ship.turnDirection = +1;
  if (keyCode == LEFT_ARROW)
    ship.turnDirection = -1;
  if (keyCode == ' ')
    Laser_Limiter_Counter = 0;
}

function keyReleased() {
  if (keyCode == UP_ARROW || keyCode == DOWN_ARROW)
    ship.moveDirection = 0;
  if (keyCode == RIGHT_ARROW)
    ship.turnDirection = 0;
  if (keyCode == LEFT_ARROW)
    ship.turnDirection = 0;
  if (keyCode == ' ')
    Laser_Limiter_Counter = 0;
}


function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  createAsteroidGenerationAreas();

  ship = new Ship(SCREEN_CENTER_X, SCREEN_CENTER_Y, 50);

  for (let i = 0; i < ASTEROID_COUNT; i++) {
    let source = asteroid_generation_areas.random().getRandPos();
    let target = asteroid_target_region.getRandPos();
    asteroids.push(new Asteroid(source.x, source.y, target.x - source.x, target.y - source.y));
  }
}

function draw() {
  level = Math.floor(state / 100);
  switch (state) {
    case MENU:
      menu();
      break;
    case LEVEL_1_TEXT:
      level1Text();
      break;
    case LEVEL_1_GAME:
    case LEVEL_2_GAME:
    case LEVEL_3_GAME:
      game(level);
      break;
    case LEVEL_1_END:
      level1End();
      break;
    case LEVEL_2_TEXT:
      level2Text();
      break;
    case LEVEL_2_END:
      level2End();
      break;
    case LEVEL_3_TEXT:
      level3Text();
      break;
    case GAME_OVER:
      gameOver();
      break;
    case GAME_CLEARED:
      gameCleared();
      break;
  }
}

function preload() {
  menuFont = loadFont('Assets/fonts/upheavtt.ttf');
  storyFont = loadFont('Assets/fonts/Minecraft.ttf');
  laserSound = loadSound('Assets/sounds/laser.mp3');
  laserSound.setVolume(0.5);
  asteroidSound = loadSound('Assets/sounds/asteroid.wav');
  asteroidSound.setVolume(0.2);
  bgSound = loadSound('Assets/sounds/bg.mp3');
  bgSound.setVolume(0.05);
  gameOverSound = loadSound('Assets/sounds/gameover.mp3');
  gameOverSound.setVolume(0.5);
  levelClearedSound = loadSound('Assets/sounds/levelcleared.mp3');
  levelClearedSound.setVolume(0.5);
  decreaseHealthSound = loadSound('Assets/sounds/decreasehealth.mp3');
  decreaseHealthSound.setVolume(0.5);
}

function game(level) {
  background(51);

  // UI
  showProgressBar();
  showCurrentLevel(level);

  // SHIP
  ship.update();
  ship.render();


  // ASTEROIDS
  for (let asteroid of asteroids) {
    asteroid.update();
    resetAsteroidIfNeeded(asteroid);
    asteroid.render();
  }

  //ship collision invincibility on
  let collides = checkShipCollisionWithAsteroids(ship, asteroids);
  if(collides){
    ship.decreaseHealth();
  }

  // 32 is keycode of space
  if (keyIsDown(32)) {
    ship.shoot();
  }
  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].update();
    lasers[i].render();
    for (let j = asteroids.length - 1; j >= 0; j--) {
      if (lasers[i].hits(asteroids[j])) {
        handleLaserHitInteractionByLevel(asteroids[j]);
        let smallerAsteroids = asteroids[j].break();
        for (a of smallerAsteroids) {
          asteroids.push(a);
        }
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        break;
      }
    }
  }

  // STATE CHANGE
  checkPulse(ship, level);
  checkLevelEnd(level);

  // QUALITY OF LIFE
  level3Hints("No meteors here. What do I do now?", "What are those red things?", "What's that white box over there?");
  level3Codes(); //health, push progress bar
  
  constraintOfLasers(lasers);
  sizeConstraintOfAsteroids(asteroids);
  laserTimer();
  collisionTimer(ship);
}

function gameOver() {
  background(51);
  fill(255);
  textSize(50);
  textFont(menuFont);
  text("GAME OVER", SCREEN_CENTER_X, SCREEN_CENTER_Y-SCREEN_HEIGHT/10);
  textSize(20);
  textFont(storyFont);
  text(gameOverMessage, SCREEN_CENTER_X, SCREEN_CENTER_Y);
  textSize(15);
  textFont(menuFont);
  text("Is this the end? Click to restart.", SCREEN_CENTER_X, SCREEN_CENTER_Y + 0.95 * SCREEN_HEIGHT / 2);
}
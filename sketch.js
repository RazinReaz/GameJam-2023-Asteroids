
let ship;

function keyPressed() {
  if (keyCode == UP_ARROW)
    ship.moveDirection = +1;
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
  let level = state;
  // level 0 : menu

  switch (state) {
    case MENU:
      menu();
      break;
    case LEVEL_1_TEXT:
      level1Text();
      break;
    case LEVEL_1_START:
      level1Start();
      break;
    case LEVEL_1_GAME:
    case LEVEL_2_GAME:
    case LEVEL_3_GAME:
      level=Math.floor(state/100);
      game(level);
      break;
    case LEVEL_1_END:
      level1End();
      break;
    case LEVEL_2_TEXT:
      level2Text();
      break;
    case LEVEL_2_START:
      level2Start();
      break;
    case LEVEL_2_END:
      level2End();
      break;
    case LEVEL_3_TEXT:
      level3Text();
      break;
    case LEVEL_3_START:
      level3Start();
      break;
    case LEVEL_3_MID:
      level3Mid();
      break;
    case GAME_OVER:
      gameOver(level);
      break;
    case GAME_CLEARED:
      gameCleared();
      break;
  }
}

function preload() {
  menuFont = loadFont('Assets/fonts/upheavtt.ttf');
  storyFont = loadFont('Assets/fonts/Minecraft.ttf');
}

function game(level) {
  background(51);

  ship.update();
  ship.render();

  for (let asteroid of asteroids) {
    asteroid.update();
    resetAsteroidIfNeeded(asteroid);
    asteroid.render();
  }

  //ship collision color change
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

  showProgressBar();
  constraintOfLasers(lasers);
  sizeConstraintOfAsteroids(asteroids);
  laserTimer();
  collisionTimer(ship);
}

function gameOver(level) {
  let gameOverMessage;
  if (level == 1) {
    gameOverMessage = "You are a failure.";
  } else if (level == 2) {
    gameOverMessage = "You are a failure.";
  } else if (level == 3) {
    gameOverMessage = "You are a failure.";
  }
  background(51);
  fill(255);
  textSize(50);
  textFont(menuFont);
  text("GAME OVER", SCREEN_CENTER_X, SCREEN_CENTER_Y-SCREEN_HEIGHT/10);
  textSize(30);
  textFont(storyFont);
  text(gameOverMessage, SCREEN_CENTER_X, SCREEN_CENTER_Y);
  textSize(30);
  textFont(menuFont);
  text("Is this the end? Click to restart.", SCREEN_CENTER_X, SCREEN_CENTER_Y+SCREEN_HEIGHT/10);
  if (mouseIsPressed) {
    state = level*100; //+1;
  }
}
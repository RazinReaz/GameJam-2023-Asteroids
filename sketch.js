let asteroids = [];
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
}

function keyReleased() {
  if (keyCode == UP_ARROW || keyCode == DOWN_ARROW)
    ship.moveDirection = 0;
  if (keyCode == RIGHT_ARROW)
    ship.turnDirection = 0;
  if (keyCode == LEFT_ARROW)
    ship.turnDirection = 0;
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
  background(51);
  ship.update();
  ship.render();

  for (let asteroid of asteroids) {
    asteroid.update();
    resetAsteroidIfNeeded(asteroid);
    asteroid.render();
  }
  // 32 is keycode of space
  if(keyIsDown(32)){
    ship.shoot();
  }
  for (let i = lasers.length-1; i >= 0 ; i--) {
    lasers[i].update();
    lasers[i].render();
    for (let j = asteroids.length-1; j >= 0; j--) {
      if (lasers[i].hits(asteroids[j])){
        let smallerAsteroids = asteroids[j].break();
        for(a of smallerAsteroids){
          asteroids.push(a);
        }
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        break;
      }
    }
  }

  sizeConstraintOfLasers(lasers);
  sizeConstraintOfAsteroids(asteroids);
}


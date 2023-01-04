
let asteroids = [];

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  createAsteroidGenerationAreas();

  for (let i = 0; i < ASTEROID_COUNT; i++) {
    let source = asteroid_generation_areas.random().getRandPos();
    let target = asteroid_target_region.getRandPos();
    asteroids.push(new Asteroid(source.x, source.y, target.x - source.x, target.y - source.y, 60));
  }
}

function draw() {
  background(51);
  for(let asteroid of asteroids){
    asteroid.update();
    resetAsteroidIfNeeded(asteroid);
    asteroid.render();
  }
}


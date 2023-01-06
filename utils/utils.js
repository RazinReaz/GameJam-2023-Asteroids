function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}
function resetAsteroidIfNeeded(asteroid) {
    let d = dist(asteroid.position.x, asteroid.position.y, SCREEN_CENTER_X, SCREEN_CENTER_Y);
    if (d >= asteroid.resetDist) {
        let src = asteroid_generation_areas.random().getRandPos();
        let dest = asteroid_target_region.getRandPos();

        asteroid.position.x = src.x;
        asteroid.position.y = src.y;
        asteroid.velocity.x = dest.x - src.x;
        asteroid.velocity.y = dest.y - src.y;
        asteroid.velocity.setMag(AST_VEL_MAG_MIN, AST_VEL_MAG_MAX);
        asteroid.totalPoints = floor(random(AST_POINTS_MIN, AST_POINTS_MAX));
        asteroid.offsets = [];
        for (let i = 0; i < asteroid.totalPoints; i++) {
            asteroid.offsets.push(random(AST_OFFSET_MIN, AST_OFFSET_MAX));
        }
    }
}

function sizeConstraintOfLasers(lasers) {
    if (lasers.length > MAX_LASER_AMOUNT) {
        lasers.pop();
    }
}

function sizeConstraintOfAsteroids(asteroids) {
    if (asteroids.length < ASTEROID_COUNT) {
        let src = asteroid_generation_areas.random().getRandPos();
        let dest = asteroid_target_region.getRandPos();
        asteroids.push(new Asteroid(src.x, src.y, dest.x - src.x, dest.y - src.y));
    }
}


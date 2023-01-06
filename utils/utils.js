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
        let offsetSum = 0;
        for (let i = 0; i < asteroid.totalPoints; i++) {
            let o = random(AST_OFFSET_MIN, AST_OFFSET_MAX)
            asteroid.offsets.push(o);
            offsetSum += o;
        }
        asteroid.offsetAvg = offsetSum / asteroid.totalPoints;
    }
}

function constraintOfLasers(lasers) {
    for (let i = 0; i < lasers.length; i++) {
        let laser = lasers[i];
        if (laser.x < 0 || laser.x > SCREEN_WIDTH) {
            lasers.splice(i, 1);
            continue;
        }
        if (laser.y < 0 || laser.y > SCREEN_HEIGHT) {
            lasers.splice(i, 1);
            continue;
        }
    }
}

function sizeConstraintOfAsteroids(asteroids) {
    if (asteroids.length < ASTEROID_COUNT) {
        for (let i = 0; i < NEW_ASTEROID_COUNT; i++) {
            let src = asteroid_generation_areas.random().getRandPos();
            let dest = asteroid_target_region.getRandPos();
            asteroids.push(new Asteroid(src.x, src.y, dest.x - src.x, dest.y - src.y));
        }
    }
}

function checkShipCollisionWithAsteroids(ship, asteroids) {
    for (let asteroid of asteroids) {
        if (ship.hits(asteroid))
            return true;
    }
    return false;
}

function laserTimer() {
    if (Laser_Limiter_Counter != 0) {
        Laser_Limiter_Counter = (Laser_Limiter_Counter + 1) % LASER_LIMITER;
    }
}

function collisionTimer(ship) {
    renderShipInvincibilityIndicator(ship);
    if (Collision_timer_counter != 0) {
        Collision_timer_counter = (Collision_timer_counter + 1) % COLLISION_TIMER_LIMITER;
    }
}

function showPoints() {
    push();
    textSize(15);
    fill(255);
    text('Points : ' + points, SCREEN_WIDTH - 80, 20);
    pop();
}

function renderShipInvincibilityIndicator(ship) {
    if (Collision_timer_counter != 0) {
        ship.color = 'cyan';
    } else {
        ship.color = 255;
    }
}

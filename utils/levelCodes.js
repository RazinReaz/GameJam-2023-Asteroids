function handleLaserHitInteractionByLevel(asteroid) {
    // ekhane level by level interaction alada hobe
    if( level == 1 || level == 2)
        points += 10 / asteroid.sizeMultiplier;
}

function showProgressBar() {
    push();
    noFill();
    stroke(255);
    rect(PROGRESSBAR_X, PROGRESSBAR_Y, PROGRESSBAR_WIDTH, PROGRESSBAR_HEIGHT);

    // ! ekhane kahini hobe
    let w;
    if ( level == 1 )
        w = map(points, 0, TARGET_POINTS_LEVEL_1, 0, PROGRESSBAR_WIDTH);
    else if ( level == 2 )
        w = map(points, 0, TARGET_POINTS_LEVEL_2, 0, PROGRESSBAR_WIDTH);
    else if ( level == 3 )
        w = map(points, 0, TARGET_POINTS_LEVEL_3, 0, PROGRESSBAR_WIDTH);

    w = min(w, PROGRESSBAR_WIDTH);
    global_w = w;
    fill(186, 255, 112);
    noStroke();
    rect(PROGRESSBAR_X, PROGRESSBAR_Y, w, PROGRESSBAR_HEIGHT);
    pop();
}

function showCurrentLevel(level) {
    textFont(storyFont);
    textSize(SCREEN_WIDTH / 40);
    textAlign(CENTER);
    text('Level ' + level, SCREEN_CENTER_X, SCREEN_HEIGHT * 0.95);
}

function levelReset() {
    level = Math.floor(state / 100);
    ship.reset();
    lasers = [];
    asteroids = [];
    if (level != 3) {
        for (let i = 0; i < ASTEROID_COUNT; i++) {
            let source = asteroid_generation_areas.random().getRandPos();
            let target = asteroid_target_region.getRandPos();
            asteroids.push(new Asteroid(source.x, source.y, target.x - source.x, target.y - source.y));
        }
    }
    Collision_timer_counter = 0;
    Laser_Limiter_Counter = 0;
    points = 0;
    Level_3_hint_t = LEVEL_3_TAUNT_INIT;
    global_w = 0;

    Friction = FRICTION_INIT;
}


function level3Hints(taunt, hint1, hint2) {
    let amplitude = 20;
    if(level == 3) {
        Level_3_hint_t++;
        textFont(storyFont);
        textSize(SCREEN_WIDTH / 50);
        textAlign(CENTER);
        text(taunt, Level_3_hint_t, SCREEN_CENTER_Y + amplitude*sin(Level_3_hint_t*0.03));
        text(hint1, Level_3_hint_t + LEVEL_3_HINT1_OFFS, SCREEN_CENTER_Y + amplitude * sin((Level_3_hint_t + LEVEL_3_HINT1_OFFS)*0.03));
        text(hint2, Level_3_hint_t + LEVEL_3_HINT2_OFFS, SCREEN_CENTER_Y + amplitude * sin((Level_3_hint_t + LEVEL_3_HINT2_OFFS)*0.03));
    }
}

function level3Codes() {
    if(level == 3) {
        detectCollisionWithHearts();
        pushProgressBar();
    }
}

function detectCollisionWithHearts() {
    // ! HARD CODED
    let heart_x = 10;
    let heart_y = 20;
    let heart_w = ship.health*25-5;
    let heart_h = 15;

    for( let i = lasers.length-1; i >= 0; i--){
        if(lasers[i].inside(heart_x, heart_y, heart_w, heart_h)){
            ship.decreaseHealth();
            lasers.splice(i, 1);
        }
    }
}

function pushProgressBar() {
    if( ship.vx > 0) {
        if (ship.x > PROGRESSBAR_X + global_w && ship.x < PROGRESSBAR_X + global_w + 20 && ship.y>PROGRESSBAR_Y && ship.y < PROGRESSBAR_Y + PROGRESSBAR_HEIGHT) {
            ship.boostForce = SHIP_PUSH_BOOST_FORCE;
            Friction = FRICTION_PUSH;
            points = ship.x - PROGRESSBAR_X;
        } else {
            ship.boostForce = SHIP_NORMAL_BOOST_FORCE;
            Friction = FRICTION_INIT;
        }
    } else {
        ship.boostForce = SHIP_NORMAL_BOOST_FORCE;
        Friction = FRICTION_INIT;
    }
}




// ! ekhane aro change ashbe
function checkPulse(ship, level) {
    if (level == 1) {
        if (ship.health == 0) {
            state = GAME_OVER;
            gameOverMessage = 'Who would expect to survive after hitting ' + SHIP_INIT_HEALTH + ' asteroids?';
            gameOverSound.play();
        }
    } else if (level == 2) {
        if (points >= TARGET_POINTS_LEVEL_2) {
            state = GAME_OVER;
            gameOverMessage = 'But... wait... that was not supposed to happen!';
            gameOverSound.play();
        }
    } else if ( level == 3) {
        if (ship.health == 0) {
            state = GAME_OVER;
            gameOverMessage = 'I thought you were my friend';
            gameOverSound.play();
        }
    }
}


function checkLevelEnd(level) {
    if (level == 1) {
        if (points >= TARGET_POINTS_LEVEL_1) {
            state = LEVEL_1_END;
            levelClearedSound.play();
        }
    } else if (level == 2) {
        if (ship.health == 0) {
            state = LEVEL_2_END;
            levelClearedSound.play();
        }
    } else if (level == 3) {
        if(points >= TARGET_POINTS_LEVEL_3) {
            state = GAME_CLEARED;
            levelClearedSound.play();
        }
    }
}
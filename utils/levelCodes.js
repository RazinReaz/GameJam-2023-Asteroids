function handleLaserHitInteractionByLevel(asteroid) {
    // ekhane level by level interaction alada hobe
    points += 10 / asteroid.sizeMultiplier;
}

function showProgressBar() {
    push();
    noFill();
    stroke(255);
    rect(200, 20, PROGRESSBAR_WIDTH, PROGRESSBAR_HEIGHT);

    let w = map(points, 0, LEVEL_1_TARGET_POINTS, 0, PROGRESSBAR_WIDTH);
    w = min(w, PROGRESSBAR_WIDTH);
    fill(255);
    noStroke();
    rect(200, 20, w, PROGRESSBAR_HEIGHT);
    pop();
}
function menu() {  
  background(51);
  textFont(menuFont);
  textSize(SCREEN_WIDTH / 10);
  textAlign(CENTER);
  text('Asteroids', SCREEN_CENTER_X, SCREEN_CENTER_Y - SCREEN_HEIGHT / 10);
  textSize(SCREEN_WIDTH / 30);
  text('Click to start', SCREEN_CENTER_X, SCREEN_CENTER_Y + SCREEN_HEIGHT / 50);
  textSize(SCREEN_WIDTH / 40);
  text('How to play', SCREEN_CENTER_X, SCREEN_CENTER_Y + SCREEN_HEIGHT / 5);
  text('Use arrow keys to move and space to shoot', SCREEN_CENTER_X, SCREEN_CENTER_Y + 1.25 * SCREEN_HEIGHT / 5);
  fill(255);
}

function dialoguesTextFormatting(line1, line2, line3, line4) {
  background(51);
  textFont(storyFont);
  textSize(SCREEN_WIDTH / 40);
  textAlign(CENTER);
  text(line1, SCREEN_CENTER_X, SCREEN_CENTER_Y - SCREEN_HEIGHT / 10);
  text(line2, SCREEN_CENTER_X, SCREEN_CENTER_Y);
  text(line3, SCREEN_CENTER_X, SCREEN_CENTER_Y + SCREEN_HEIGHT / 10);
  textFont(menuFont);
  textSize(15);
  text(line4, SCREEN_CENTER_X, SCREEN_CENTER_Y + 0.95 * SCREEN_HEIGHT / 2);
}

function level1Text() {
  dialoguesTextFormatting('It has been years, decades actually, since I saw another human face.',
    'Floating, drifting into the unknown.',
    '',
    'click to continue');
}

function level1End() {
  dialoguesTextFormatting('LEVEL 1 PASSED\n\nThat is how it is, living out here. Surviving actually.',
    '\nYou never know what is gonna get you first, ',
    '\nchunks of space-rock, or your loneliness.',
    'click to continue');
}

function level2Text() {
  dialoguesTextFormatting('No, still nothing. No comms. I baffle myself at times, how do I still hope?',
    'Is there any end to this misery? Any end to this unending progress?', 
    '',
    'click to continue');
}

function level2End() {
  dialoguesTextFormatting('LEVEL 2 PASSED\n\nI don\'t know what just happened.',
  '\nAm I alive?',
  '\nYou can hear me?!?',
  'click to continue');
  
}

function level3Text() {
  dialoguesTextFormatting('So you mean to tell me,',
    'there is a way out? But wait...',
    'Who ARE you?',
    'click to continue');
}

function gameCleared() {
  dialoguesTextFormatting('GAME CLEARED\n\nThank you, whoever you are...',
    '\nI am finally free. I am finally home.',
    '\nTHANK YOU!',
    'click to go to main menu');
}





function mouseClicked() {
  if (state == MENU) {
    state = LEVEL_1_TEXT;
  } else if (state == LEVEL_1_TEXT) {
    state = LEVEL_1_GAME;
  } else if (state == LEVEL_1_END) {
    state = LEVEL_2_TEXT;
    levelReset();
  } else if (state == LEVEL_2_TEXT) {
    state = LEVEL_2_GAME;
  } else if (state == LEVEL_2_END) {
    state = LEVEL_3_TEXT;
    levelReset();
  } else if (state == LEVEL_3_TEXT) {
    state = LEVEL_3_GAME;
  } else if (state == GAME_CLEARED || state == GAME_OVER) {
    state = MENU; 
    levelReset();
  }
  if (!bgLoopOn) {
    bgSound.loop();
    console.log('bgSound.loop');
    bgLoopOn = true;
  }
}